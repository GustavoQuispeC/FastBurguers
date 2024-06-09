"use client";
import {
  UpdateCategory,
  addCategory,
  deleteCategory,
  getCategories,
} from "@/helpers/categories.helper";
import { ICategory } from "@/interfaces/ICategory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiAddLargeFill, RiDeleteBin6Fill } from "react-icons/ri";
import { Button, Modal } from "flowbite-react";
import Swal from "sweetalert2";
import { formCategoryValidation } from "@/utils/formCategoryValidation";
import Spinner from "../Spinner";



const CategoriesList = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const [dataCategory, setDataCategory] = useState<ICategory>({
    name: "",
  });

  const [errors, setErrors] = useState<ICategory>({
    name: "",
  })

  //! Obtener el token del usuario
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        console.log("userToken", parsedSession.userData.token);
        setToken(parsedSession.userData.token);
      }
    }
  }, [router]);

  //! Obtener todas las categorias
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      console.log("categories", categories);
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  //! Función para manejar los cambios en los inputs
  const handleChange = (e: any) => {
    e.preventDefault();
    setDataCategory({
      ...dataCategory,
      [e.target.name]: e.target.value,
    });
  };

  //! Función para manejar el envío del formulario de agregar

  const handleSubmitAdd = async (e: any) => {
    e.preventDefault();
    if (!token) {
      console.error("No token available, authorization denied");
      return;
    }
    try {
      const newCategory = await addCategory(dataCategory.name, token);
      console.log(newCategory);

      // Actualizar la lista de categorías después de agregar una nueva
      setCategories((prevCategories) => [...prevCategories, newCategory]);

      // Resetear el formulario
      setDataCategory({ name: "" });

      setOpenModalAdd(false);
    } catch (error: any) {
      console.error("Error adding category:", error.message);
    }
  };

  //! Función para manejar el envío del formulario de actualizar
  
  const handleSubmitUpdate = async (e: any) => {
    e.preventDefault();
    if (!token) {
      console.error("No token available, authorization denied");
      return;
    }
    try {
      if (currentCategoryId) {
        const updatedCategory = await UpdateCategory(
          dataCategory.name,
          currentCategoryId,
          token
        );

        // Actualizar la lista de categorías después de actualizar una categoría
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === currentCategoryId ? updatedCategory : category
          )
        );
        // Resetear el formulario
        setDataCategory({ name: "" });

        // Cerrar el modal
        setOpenModalUpdate(false);
        setCurrentCategoryId(null);
      }
    } catch (error: any) {
      console.error("Error updating category:", error);
    }
  };

  //! Función para eliminar una categoría
  const handleDeleteCategory = async (id: string) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      try {
        if (!token) {
          Swal.fire(
            "¡Error!",
            "Token no encontrado. Por favor, inicia sesión.",
            "error"
          );
          return;
        }
        await deleteCategory(id, token);

        // Actualizar la lista de categorías después de eliminar una categoría
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
        Swal.fire("¡Eliminado!", "La categoría ha sido eliminada", "success");
        console.log("Categoría eliminada:", id);
      } catch (error: any) {
        console.error("Error deleting category:", error);
        Swal.fire(
          "¡Error!",
          "Ha ocurrido un error al eliminar la categoría",
          "error"
        );
      }
    }
  };
   //!Validar formulario
   useEffect(() => {
    const errors = formCategoryValidation(dataCategory);
    setErrors(errors);
  }, [dataCategory]);

    //! Spinner de carga
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);


  if (categories.length === 0) {
    return (
      <div className="h-screen items- justify-center">
      {loading ? <Spinner /> : <p>Algo no esta bien.</p>}
    </div>
    )

  }
  

  return (
    <div>
      <section className="p-3 sm:p-5 antialiased h-screen dark:bg-gray-700">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-gray-900">
              <div className="flex-1 flex items-center space-x-2">
                <h5>
                  <span className="text-orange-400">Listado de Categorias</span>
                </h5>
              </div>
              <div className="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3"></div>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
              <div className="w-full md:w-1/2">{/*  */}</div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    type="button"
                    id="createProductButton"
                    data-modal-toggle="createProductModal"
                    className="flex items-center justify-center text-white bg-orange-500 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 hover:bg-white hover:text-orange-500 hover:border-orange-500 border"
                    onClick={() => setOpenModalAdd(true)}
                  >
                    <RiAddLargeFill />
                    Agregar categoria
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      Nombre
                    </th>
                    <th scope="col" className="p-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex justify-left items-center">
                          {category.name}
                        </div>
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            data-drawer-target="drawer-update-product"
                            data-drawer-show="drawer-update-product"
                            aria-controls="drawer-update-product"
                            className="py-2 px-3 flex items-center text-sm font-medium text-center text-orange-400 bg-gray-900 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={() => {
                              setCurrentCategoryId(category.id);
                              setDataCategory({ name: category.name });
                              setOpenModalUpdate(true);
                            }}
                          >
                            <MdEdit />
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(category.id)}
                            className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                          >
                            <RiDeleteBin6Fill />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/*Modal para agregar categorias*/}

      <Modal show={openModalAdd} onClose={() => setOpenModalAdd(false)}>
        <Modal.Header>Agregar Categoria</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e: any) => {
              handleSubmitAdd(e);
              setOpenModalAdd(false);
            }}
          >
            Guardar
          </Button>
          <Button color="gray" onClick={() => setOpenModalAdd(false)}>
            Volver
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Modal para editar categorias*/}
      <Modal show={openModalUpdate} onClose={() => setOpenModalUpdate(false)}>
        <Modal.Header>Editar Categoria</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={dataCategory.name}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={(e: any) => {
              handleSubmitUpdate(e);
              setOpenModalUpdate(false);
            }}
          >
            Guardar
          </Button>
          <Button color="gray" onClick={() => setOpenModalUpdate(false)}>
            Volver
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoriesList;
