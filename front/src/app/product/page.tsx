"use client";
import { useState } from "react";
import FiltroProductos from "../components/filtroProductos/FiltroProductos";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const getButtonClass = (categoryId: number) => {
    return `p-2 rounded-xl border-none shadow-md ${
      selectedCategory === categoryId
        ? " text-orange-400 shadow-lg"
        : "hover:text-orange-400"
    }`;
  };

  return (
    <>
      <ul className="flex gap-3 bg-slate-700 mt-10 p-3 justify-around font-bold text-white w-11/12 rounded-lg items-center m-auto">
        <li>
          <button
            onClick={() => handleCategoryClick(1)}
            className={getButtonClass(1)}
          >
            Hamburguesas
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick(2)}
            className={getButtonClass(2)}
          >
            Sandwich de pollo
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick(3)}
            className={getButtonClass(3)}
          >
            Papas y complementos
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick(4)}
            className={getButtonClass(4)}
          >
            Bebidas
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick(5)}
            className={getButtonClass(5)}
          >
            Postres
          </button>
        </li>
        <li>
          <button
            onClick={() => handleCategoryClick(6)}
            className={getButtonClass(6)}
          >
            Ensaladas
          </button>
        </li>
      </ul>

      <FiltroProductos categoryId={selectedCategory} />

    </>
  );
};

export default Product;
