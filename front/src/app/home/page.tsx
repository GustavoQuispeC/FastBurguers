"use client";

import { useEffect, useState } from "react";
import Carrusel from "../../components/carrusel/Carrusel";
import GridProducts from "../../components/gridProducts/GridProducts";
import { getProducts } from "@/helpers/products.helper";
import { IProduct } from "@/interfaces/IProduct";
import { getProductsByCategory } from "@/helpers/categories.helper";

const Home = () => {
  const [promocionesProducts, setPromocionesProducts] = useState<IProduct[]>(
    []
  );
  const [menuHamburguesas, setMenuHamburguesas] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();

        // Filtrar productos promocionales

        const promociones = products.filter((product) => product.discount > 0);

        setPromocionesProducts(promociones);

        const hamburguesas = await getProductsByCategory("Hamburguesas");

        setMenuHamburguesas(hamburguesas);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dark:bg-gray-700 my-10">
      <Carrusel />

      <h1 className="font-bold mt-10 ml-5 text-2xl dark: text-white">
        NUESTRAS PROMOCIONES
      </h1>
      <GridProducts products={promocionesProducts} />

      <h1 className="font-bold mt-10 ml-5 text-2xl dark:text-white">
        MENU DE HAMBURGUESAS
      </h1>
      <GridProducts products={menuHamburguesas} />
    </div>
  );
};

export default Home;
