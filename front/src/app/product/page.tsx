"use client";

import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import FiltroProductos from "../../components/filtroProductos/FiltroProductos";
import { useCategory } from "@/context/category.context";
import { getCategories } from "@/helpers/categories.helper";

const Product = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [categories, setCategories] = useState<any[]>([]);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [tempRange, setTempRange] = useState<[number, number]>([1, 20]);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("Hamburguesas");

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    setSelectedCategory(Number(categoryId));
    setSelectedCategoryName(categoryName);
  };

  const handleTempRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setTempRange(value as [number, number]);
    }
  };

  const getButtonClass = (categoryId: string) => {
    return `p-2 rounded-xl border-none shadow-md ${
      String(selectedCategory) === categoryId
        ? "text-orange-400 shadow-lg"
        : "hover:text-orange-400"
    }`;
  };

  const applyFilter = () => {
    setMinPrice(tempRange[0]);
    setMaxPrice(tempRange[1]);
    setFilterApplied(true);
  };

  const clearFilter = () => {
    setMinPrice(1);
    setMaxPrice(Infinity);
    setTempRange([1, 20]);
    setFilterApplied(false);
  };

  return (
    <div className=" py-5">
      <ul className="flex flex-wrap gap-3 bg-slate-700 mt-10 p-3 justify-around font-bold text-white w-11/12 rounded-lg items-center m-auto">
        {categories.map((category) => (
          <li key={category.id} className="w-full sm:w-auto text-center">
            <button
              onClick={() => handleCategoryClick(category.id, category.name)}
              className={getButtonClass(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 bg-slate-700 mt-5 p-3 justify-around font-bold text-white w-11/12 rounded-lg items-center m-auto mb-10">
        <div className="w-full sm:w-auto text-center">
          <label>Rango de Precios:</label>
          <Slider
            range
            min={1}
            max={20}
            defaultValue={[1, 20]}
            value={tempRange}
            onChange={handleTempRangeChange}
            className="w-10/12 m-auto"
          />
          <div>
            <span>Min: {tempRange[0]}</span> - <span>Max: {tempRange[1]}</span>
          </div>
        </div>
        <div>
          <button
            onClick={applyFilter}
            className="p-2 rounded-xl bg-orange-400 text-white"
          >
            Aplicar Filtro
          </button>
        </div>
        {filterApplied && (
          <div>
            <button
              onClick={clearFilter}
              className="p-2 rounded-xl bg-red-400 text-white"
            >
              Eliminar Filtro
            </button>
          </div>
        )}
      </div>

      <FiltroProductos
        categoryName={selectedCategoryName} // Pasar el nombre de la categoría aquí
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
};

export default Product;
