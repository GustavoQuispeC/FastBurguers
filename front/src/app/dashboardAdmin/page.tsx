"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { userSession } from "@/types";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import ProductList from "@/components/ProductList/page";
import { GiSettingsKnobs } from "react-icons/gi";
import { RiFolderSettingsFill } from "react-icons/ri";
import { TbSettingsCog } from "react-icons/tb";

const DashboardAdmin = () => {
  const [token, setToken] = useState<userSession>();
  const [view, setView] = useState<string>(""); // Estado para la vista actual

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      console.log(userToken);
      setToken(JSON.parse(userToken!));
      !userToken && redirect("/");
    }
  }, []);

  return (
    <div className="flex flex-row min-h-screen">
      {/* Barra lateral */}
      <div className="bg-gray-900 text-orange-400 w-36 md:w-52">
        <div className="p-1 md:p-4">
            
        <p className="text-xl text-white font-semibold mb-4 flex items-center">
        <GiSettingsKnobs /> &nbsp;Dashboard
          </p>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setView("categories")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <RiFolderSettingsFill /> &nbsp; Categorías
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setView("modifyProducts")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
               <TbSettingsCog /> &nbsp; Productos
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        {/* Barra de navegación */}
        <div className="bg-gray-200 p-1 md:p-4">
          <h2 className="text-lg font-semibold mb-2">
            Bienvenido usuario Administrador
          </h2>
          <div className="bg-gray-50 p-4 rounded shadow">
            {/* Aquí irían los datos del usuario */}
            <p>
              <b>Nombre:</b> {token?.userData.data.name}
            </p>
            <p>
              <b>Email:</b> {token?.userData.data.email}
            </p>
            <p>
              <b>Telefono: </b>
              {token?.userData.data.phone}
            </p>
            <p>
              <b>Dirección:</b> {token?.userData.data.address}{" "}
            </p>
            <p>
              <b>Pais:</b>
              {token?.userData.data.country}
            </p>
            <p>
              <b>Ciudad:</b>
              {token?.userData.data.city}
            </p>
          </div>
        </div>
        <div className="p-1 md:p-4 flex flex-col flex-1">
          {view === "categories" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Modificar categoria
              </h2>
              <CategoriesList />
            </div>
          )}
          {view === "modifyProducts" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Modificar Producto</h2>
              <ProductList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
