"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IProduct } from "@/interfaces/IProduct";
import { getProductsByCategory } from "@/helpers/categories.helper";
import Spinner from "../Spinner";

interface GridProductsProps {
  categoryName: string;
  minPrice: number;
  maxPrice: number;
}

const FiltroProductos: React.FC<GridProductsProps> = ({
  categoryName,
  minPrice,
  maxPrice,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
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
  }, [categoryName, minPrice, maxPrice]);

  const renderStars = (averageRating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i}>{i < averageRating ? "★" : "☆"}</span>);
    }
    return stars;
  };

  if (loading) {
    return <Spinner />;
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
          {product.averageRating && parseInt(product.averageRating) > 0 && (
            <div className="text-yellow-500 mt-2 text-xl">
              {renderStars(Number(product.averageRating))}
            </div>
          )}
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
