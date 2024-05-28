"use client";

import { useState } from "react";
import products from "../../helpers/promociones";
import Image from "next/image";
import Link from "next/link";

const GridProducts = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, products.length - itemsPerPage)
    );
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button onClick={handlePrevClick} disabled={startIndex === 0}>
          <Image
            src="/flecha-izquierda.png"
            alt="flecha"
            height={20}
            width={20}
            className="hover:scale-110 transition-transform duration-200"
          />
        </button>
        <button
          onClick={handleNextClick}
          disabled={startIndex >= products.length - itemsPerPage}
          className="ml-3"
        >
          <Image
            src="/Flecha-derecha.png"
            alt="flecha"
            height={20}
            width={20}
            className="hover:scale-110 transition-transform duration-200"
          />
        </button>
      </div>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 justify-items-center">
        {products
          .slice(startIndex, startIndex + itemsPerPage)
          .map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center border border-gray-300 overflow-hidden rounded-lg relative"
            >
              {product.discount !== 0 && (
                <div className="bg-red-600 rounded-xl p-1 px-2 absolute left-10 top-5 z-10">
                  <p className="font-bold text-white">-{product.discount}%</p>
                </div>
              )}
              <Link href="#">
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="w-72 h-72 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                />
              </Link>
              <div className="p-4 text-center">
                <h2 className="font-bold text-lg mt-2">{product.name}</h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                {product.discount !== 0 ? (
                  <div className="text-2xl font-bold">
                    <span className="text-gray-500 line-through mr-2">
                      ${product.price.toFixed(2)}
                    </span>
                    <span>
                      $
                      {calculateDiscountedPrice(
                        product.price,
                        product.discount
                      )}
                    </span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                )}
                <button className="bg-orange-500 rounded-xl p-2 px-10 mt-2 text-white font-bold border-none">
                  <Link href={`/product/${product.id}`} key={product.id}>
                    Ver más
                  </Link>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GridProducts;
