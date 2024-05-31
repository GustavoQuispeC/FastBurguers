"use client";

import { useEffect, useState } from "react";
import Carrusel from "../../components/carrusel/Carrusel";
import GridProducts from "../../components/gridProducts/GridProducts";
import { getProductsByCategory } from "@/helpers/categories.helper";

const Home = () => {
  const [promocionesProducts, setPromocionesProducts] = useState([]);
  const [menuHamburguesas, setMenuHamburguesas] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promociones = await getProductsByCategory("Promociones");
        const hamburguesas = await getProductsByCategory("Hamburguesas");

        setPromocionesProducts(promociones);
        setMenuHamburguesas(hamburguesas);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dark:bg-gray-800 my-10">
      <Carrusel />

      <h1 className="font-bold mt-10 ml-5">
        PROMOCIONES DE HAMBURGUESAS ONLINE
      </h1>
      <GridProducts products={promocionesProducts} />

      <h1 className="font-bold mt-10 ml-5">MENU DE HAMBURGUESAS</h1>
      <GridProducts products={menuHamburguesas} />
    </div>
  );
};

export default Home;
