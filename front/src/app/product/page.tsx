"use client";

import { useState } from "react";
import FiltroProductos from "../../components/filtroProductos/FiltroProductos";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<string>("1");
  const [maxPrice, setMaxPrice] = useState<string>(String(Infinity));

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };

  const getButtonClass = (categoryId: number) => {
    return `p-2 rounded-xl border-none shadow-md ${
      selectedCategory === categoryId
        ? "text-orange-400 shadow-lg"
        : "hover:text-orange-400"
    }`;
  };

  const handleBlurMinPrice = () => {
    if (minPrice === "" || Number(minPrice) < 1) {
      setMinPrice("1");
    }
  };

  const handleBlurMaxPrice = () => {
    if (maxPrice === "" || Number(maxPrice) < 1) {
      setMaxPrice(String(Infinity));
    }
  };

  return (
    <>
      <ul className="flex flex-wrap gap-3 bg-slate-700 mt-10 p-3 justify-around font-bold text-white w-11/12 rounded-lg items-center m-auto">
        <li className="w-full sm:w-auto text-center">
          <button
            onClick={() => handleCategoryClick(1)}
            className={getButtonClass(1)}
          >
            Hamburguesas
          </button>
        </li>
        <li className="w-full sm:w-auto text-center">
          <button
            onClick={() => handleCategoryClick(2)}
            className={getButtonClass(2)}
          >
            Sandwich de pollo
          </button>
        </li>
        <li className="w-full sm:w-auto text-center">
          <button
            onClick={() => handleCategoryClick(3)}
            className={getButtonClass(3)}
          >
            Papas y complementos
          </button>
        </li>
        <li className="w-full sm:w-auto text-center">
          <button
            onClick={() => handleCategoryClick(4)}
            className={getButtonClass(4)}
          >
            Bebidas
          </button>
        </li>
        <li className="w-full sm:w-auto text-center">
          <button
            onClick={() => handleCategoryClick(5)}
            className={getButtonClass(5)}
          >
            Postres
          </button>
        </li>
        <li className="w-full sm:w-auto text-center">
          <button
            onClick={() => handleCategoryClick(6)}
            className={getButtonClass(6)}
          >
            Ensaladas
          </button>
        </li>
      </ul>

      <div className="flex flex-wrap gap-3 bg-slate-700 mt-5 p-3 justify-around font-bold text-white w-11/12 rounded-lg items-center m-auto">
        <div>
          <label>Precio Mínimo:</label>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            onBlur={handleBlurMinPrice}
            min={1}
            className="p-2 rounded-xl text-black"
          />
        </div>
        <div>
          <label>Precio Máximo:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            onBlur={handleBlurMaxPrice}
            min={1}
            className="p-2 rounded-xl text-black"
          />
        </div>
      </div>

      <FiltroProductos
        categoryId={selectedCategory}
        minPrice={Number(minPrice)}
        maxPrice={Number(maxPrice)}
      />
    </>
  );
};

export default Product;
