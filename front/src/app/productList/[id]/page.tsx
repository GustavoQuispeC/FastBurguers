"use client";
import { getCategories } from "@/helpers/categories.helper";
import { IProducErrorProps, IProductProps } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
const apiURL = process.env.NEXT_PUBLIC_API_URL;
import { validateProductForm } from "@/utils/formProductValidation";

const ProductEdit = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const [dataProduct, setDataProduct] = useState<IProductProps>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imgUrl: "",
    discount: 0,
    categoryID: "",
  });

  const[errors, setErrors] = useState<IProducErrorProps>({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    discount: "",
    categoryID: "",
  });

  //! Obtener producto por ID
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await fetch(`${apiURL}/products/${params.id}`).then(
        (res) => res.json()
      );
      // Desestructurar solo los campos que deseas actualizar
      const { name, description, price, stock, imgUrl, discount, categoryID } =
        productData;
      // Establecer solo los campos especificados en dataProduct
      setDataProduct((prevState) => ({
        ...prevState,
        name,
        description,
        price,
        stock,
        imgUrl,
        discount,
        categoryID,
      }));
    };
    fetchProduct();
  }, [params.id]);

  //! Obtener categorias
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  //! Obtener token de usuario
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

  //! Actualizar campos del producto
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.preventDefault();
    setDataProduct({
      ...dataProduct,
      [e.target.name]: e.target.value,
    });
  };

  //! Actualizar imagen del producto
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setDataProduct({
        ...dataProduct,
        imgUrl: imageUrl,
      });
    }
  };

  console.log(dataProduct);

  //! Actualizar producto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
  
    // Mostrar alerta de carga mientras se procesa la solicitud
    Swal.fire({
      title: 'Actualizando producto...',
      text: 'Por favor espera.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    try {
      const formData = new FormData();
      formData.append("name", dataProduct.name);
      formData.append("description", dataProduct.description);
      formData.append("price", dataProduct.price.toString());
      formData.append("stock", dataProduct.stock.toString());
      formData.append("discount", dataProduct.discount.toString());
      formData.append("categoryID", dataProduct.categoryID);
      if (imageFile) {
        formData.append("file", imageFile);
      }
  
      const response = await fetch(`${apiURL}/products/${params.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
  
      const updatedProduct = await response.json();
      console.log("Product updated successfully:", updatedProduct);
  
      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'El producto ha sido actualizado con éxito.',
      }).then(() => {
        router.push("/dashboardAdmin");
      });
    } catch (error) {
      console.error("Error updating product:", error);
      
      // Mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ha ocurrido un error al actualizar el producto.',
      });
    }
  };

  //!Validar formulario
  useEffect(() => {
    const errors = validateProductForm(dataProduct);
    setErrors(errors);
  }, [dataProduct]);


  if (!dataProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-10">
      <form onSubmit={handleSubmit}>
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Actualizar
        </h5>
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="space-y-4 sm:col-span-2 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Producto
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={dataProduct.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-500 text-md">{errors.name}</p>}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripción
              </label>
              <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                  <textarea
                    id="description"
                    name="description"
                    rows={8}
                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Escribe la descripción del producto aquí"
                    required
                    value={dataProduct.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              {errors.description && <p className="text-red-500 text-md">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Imagen del producto
              </span>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="mt-4 flex justify-center">
                  <img 
                  src={dataProduct.imgUrl} 
                  alt={dataProduct.name} 
                  width={150} 
                  height={300}
                  />
                  
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IoCloudUploadOutline size={40} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click para subir imagen{" "}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG o GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {errors.imgUrl && <p className="text-red-500 text-md">{errors.imgUrl}</p>}
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Precio
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0.00"
                required
                value={dataProduct.price}
                onChange={handleChange}
              />
              {errors.price && <p className="text-red-500 text-md">{errors.price}</p>}  
            </div>
            <div>
              <label
                htmlFor="categoryID"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Categoría
              </label>
              <select
                id="categoryID"
                name="categoryID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={dataProduct.categoryID}
                onChange={handleChange}
              >
                <option value="">--Seleccione--</option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryID && <p className="text-red-500 text-md">{errors.categoryID}</p>}
            </div>
            <div>
              <label
                htmlFor="discount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descuento
              </label>
              <input
                type="number"
                name="discount"
                id="discount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0.00"
                required
                value={dataProduct.discount}
                onChange={handleChange}
              />
              {errors.discount && <p className="text-red-500 text-md">{errors.discount}</p>}
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0.00"
                required
                value={dataProduct.stock}
                onChange={handleChange}
              />
              {errors.stock && <p className="text-red-500 text-md">{errors.stock}</p>}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 sm:w-1/2">
          <button
            type="submit"
            className="text-orange-400 bg-gray-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Actualizar
          </button>
          <Link
            data-modal-toggle="createProductModal"
            type="button"
            className="w-full justify-center sm:w-auto text-orange-500 inline-flex items-center hover:bg-orange-500 bg-white  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            href="/dashboardAdmin"
          >
            <FaArrowLeft />
            &nbsp; Volver
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
