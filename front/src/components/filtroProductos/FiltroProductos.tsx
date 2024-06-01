"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IProduct } from "@/interfaces/IProduct";
import { getProductsByCategory } from "@/helpers/categories.helper";

interface GridProductsProps {
  categoryId: number;
  minPrice: number;
  maxPrice: number;
}

const FiltroProductos: React.FC<GridProductsProps> = ({
  categoryId,
  minPrice,
  maxPrice,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryName = getCategoryName(categoryId);
        const fetchedProducts = await getProductsByCategory(categoryName);
        const filteredProducts = fetchedProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId, minPrice, maxPrice]);

  const getCategoryName = (categoryId: number): string => {
    switch (categoryId) {
      case 1:
        return "Hamburguesas";
      case 2:
        return "Sandwich de pollo";
      case 3:
        return "Papas y complementos";
      case 4:
        return "Bebidas";
      case 5:
        return "Postres";
      case 6:
        return "Ensaladas";
      default:
        return "";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-11/12 justify-items-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-4 text-center flex flex-col items-center justify-center"
        >
          <Link href={`/product/${product.id}`} key={product.id}>
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-72 h-72 object-cover rounded-t-lg"
            />
          </Link>
          <h2 className="font-bold text-lg mt-2">{product.name}</h2>
          <p className="text-gray-600 mt-1">{product.description}</p>
          <p className="text-gray-800 text-2xl font-bold mt-2">
            ${product.price}
          </p>
          <Link href={`/product/${product.id}`} key={product.name}>
            <button className="bg-orange-500 rounded-xl p-2 px-10 mt-2 text-white font-bold border-none">
              Ver más
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FiltroProductos;
