"use client";
import { getCategories } from "@/helpers/categories.helper";
import { UpdateProductProps } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { IoCloudUploadOutline } from "react-icons/io5";

const ProductEdit = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const [dataProduct, setDataProduct] = useState<UpdateProductProps>({
    
    name: "",
    description: "",
    price: 0,
    stock: 0,
    imgUrl: "",
    size: "",
    discount: 0,
    categoryID: "",
  });
  console.log(dataProduct)
  const [imageFile, setImageFile] = useState<File | null>(null);

  //!Obtener producto por ID
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`).then((res) => res.json());
      setDataProduct(productData);
      console.log(productData)
    };
    fetchProduct();
  }, [params.productId]);

  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const [token, setToken] = useState<string | null>(null);
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

  const handleChange = (e: any) => {
    e.preventDefault();
    setDataProduct({
      ...dataProduct,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("name", dataProduct.name);
      formData.append("description", dataProduct.description);
      formData.append("price", dataProduct.price.toString());
      formData.append("stock", dataProduct.stock.toString());
      formData.append("discount", dataProduct.discount.toString());
      formData.append("categoryID", dataProduct.categoryID);
      formData.append("size", dataProduct.size);

      if (imageFile) {
        formData.append("file", imageFile);
      }

      const response = await fetch(`http://localhost:3001/products/${params.productId}`, {
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
      router.push("/products"); // redirect after successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!dataProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-10">
    <form onSubmit={handleSubmit}>
      <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
        Actualizar
      </h5>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        <div className="space-y-4 sm:col-span-2 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descripción
            </label>
            <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-3 bg-white rounded-b-lg dark:bg-gray-800">
                <textarea
                  id="description"
                  rows={8}
                  className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write product description here"
                  required
                  value={dataProduct.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mb-4">
  <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen del producto</span>
  <div className="grid grid-cols-3 gap-4 mb-4">
    <div className="relative p-2 bg-gray-100 rounded-lg sm:w-36 sm:h-36 dark:bg-gray-700">
      <img src={dataProduct.imgUrl} alt={dataProduct.name} />
    </div>
  </div>
  <div className="flex items-center justify-center w-full">
    <label
      htmlFor="dropzone-file"
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <IoCloudUploadOutline />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click para subir imagen </span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>
      <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
    </label>
  </div>
</div>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Precio
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="0.00"
              required
              value={dataProduct.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Categoria
            </label>
            <select
              id="category"
              name="categoryID" // Add this line
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
          </div>

          <div>
            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descuento
            </label>
            <input
              type="number"
              name="discount" // Change this line
              id="discount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="0.00"
              required
              value={dataProduct.discount}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
          </div>


          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              tamaño
            </label>
            <input
              type="string"
              name="categoryID"
              id="categoryID"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="0.00"
              required
              value={dataProduct.size}
              onChange={handleChange}
            />
          </div>

          {/* <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              categoria
            </label>
            <input
              type="string"
              name="size"
              id="size"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="0.00"
              required
              value={1}
              
            />
          </div>
 */}




        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 sm:w-1/2">
        <button
          type="submit"
          className="text-orange-400 bg-gray-900 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Actualizar
        </button>
        <button
          type="button"
          className="text-red-600 inline-flex justify-center items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <RiDeleteBin6Fill />
          Eliminar
        </button>
      </div>
    </form>
  </div>
);
};

export default ProductEdit;
  