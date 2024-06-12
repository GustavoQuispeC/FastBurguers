"use client";

import { useEffect, useState } from "react";
import Carrusel from "../../components/carrusel/Carrusel";
import GridProducts from "../../components/gridProducts/GridProducts";
import { getProducts } from "@/helpers/products.helper";
import { IProduct } from "@/interfaces/IProduct";
import { getProductsByCategory } from "@/helpers/categories.helper";
import MapWithDirections from "@/components/Maps/MapWithDirections";
import PlaceSearch from "@/components/Maps/PlaceSearch";

const Home = () => {
  const [promocionesProducts, setPromocionesProducts] = useState<IProduct[]>(
    []
  );
  const [menuHamburguesas, setMenuHamburguesas] = useState<IProduct[]>([]);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);

  const handlePlaceSelected = (
    location: { lat: number; lng: number },
    address: string
  ) => {
    setLocation(location);
    setAddress(address);
  };

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
    <div className="dark:bg-gray-800 my-10">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Encuentra Nuestro Restaurante
        </h1>
        <PlaceSearch onPlaceSelected={handlePlaceSelected} />
        {location && address && (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
            <p>Dirección: {address}</p>
            <p>Latitud: {location.lat}</p>
            <p>Longitud: {location.lng}</p>
          </div>
        )}
        {/* <MapWithDirections /> */}
      </div>

      <Carrusel />

      <h1 className="font-bold mt-10 ml-5 text-2xl">NUESTRAS PROMOCIONES</h1>
      <GridProducts products={promocionesProducts} />

      <h1 className="font-bold mt-10 ml-5 text-2xl">MENU DE HAMBURGUESAS</h1>
      <GridProducts products={menuHamburguesas} />
    </div>
  );
};

export default Home;
