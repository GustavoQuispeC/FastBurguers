"use client";

import { insertProduct } from "@/helpers/products.helper";
import { getCategories } from "@/helpers/categories.helper";
import {
  InsertProductProps,
  InsertErrorProductProps,
  IProduct,
} from "@/interfaces/IProduct";
import { insertProductValidation } from "@/utils/insertProductValidation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";

const InsertProduct = () => {
  const router = useRouter();

  //! Estado para guardar los datos del producto
  const [dataProduct, setDataProduct] = useState<InsertProductProps>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imgUrl: "",
    size: "",
    discount: 0,
    category: "",
  });

  //! Estado para guardar la imagen del producto
  const [imageFile, setImageFile] = useState<File | null>(null);

  //! Estado para guardar las categorías
  const [categories, setCategories] = useState<any[]>([]);

  //! Estado para guardar los errores
  const [errors, setErrors] = useState<InsertErrorProductProps>({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    size: "",
    discount: "",
    category: "",
  });

  //! useEffect para obtener las categorías
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  //! Función para manejar los cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    setDataProduct({
      ...dataProduct,
      [e.target.name]: e.target.value,
    });
  };

  //! Función para manejar los cambios en la imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setDataProduct({ ...dataProduct, imgUrl: URL.createObjectURL(file) });
    }
  };

  //! Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = insertProductValidation(dataProduct);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Aquí estamos preparando el objeto IProduct
      const product: IProduct = {
        ...dataProduct,
        imgUrl: imageFile ? URL.createObjectURL(imageFile) : dataProduct.imgUrl,
      };
      console.log(product);
      //! Llamamos a insertProduct con el objeto IProduct
      await insertProduct(product);
      router.push("/productList");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-10 dark:bg-gray-700">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Agregar nuevo producto
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                placeholder="Nombre del producto"
                value={dataProduct.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Categorias
              </label>
              <select
                id="category"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={dataProduct.category}
                onChange={handleChange}
              >
                <option value="">--Seleccione--</option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500">{errors.category}</span>
              )}
            </div>

            <div className="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="0.00"
                  value={dataProduct.price}
                  onChange={handleChange}
                />
                {errors.price && (
                  <span className="text-red-500">{errors.price}</span>
                )}
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
                  placeholder="0"
                  value={dataProduct.discount}
                  onChange={handleChange}
                />
                {errors.discount && (
                  <span className="text-red-500">{errors.discount}</span>
                )}
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
                  placeholder="0"
                  value={dataProduct.stock}
                  onChange={handleChange}
                />
                {errors.stock && (
                  <span className="text-red-500">{errors.stock}</span>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escriba la descripción del producto aquí..."
                value={dataProduct.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <span className="text-red-500">{errors.description}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Imagen del producto
            </span>
            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-18 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <IoCloudUploadOutline />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click para subir imagen
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or JPGE (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {dataProduct.imgUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={dataProduct.imgUrl}
                  alt="Imagen del producto"
                  className="max-w-44 h-auto"
                />
              </div>
            )}
          </div>

          <div className="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="w-full sm:w-auto justify-center text-orange-400 inline-flex bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Agregar producto
            </button>

            <Link
              data-modal-toggle="createProductModal"
              type="button"
              className="w-full justify-center sm:w-auto text-orange-500 inline-flex items-center hover:bg-orange-500 bg-white  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              href="/productList"
            >
              <FaArrowLeft />
              &nbsp; Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsertProduct;
