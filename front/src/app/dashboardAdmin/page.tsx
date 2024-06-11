"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { userSession } from "@/types";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import ProductList from "@/components/ProductList/page";
import { GiSettingsKnobs } from "react-icons/gi";
import { RiFolderSettingsFill } from "react-icons/ri";
import { TbSettingsCog } from "react-icons/tb";
import PedidosList from "@/components/PedidosList/PedidosList";
import UserRol from "@/components/UserRol/UserRol";

const DashboardAdmin = () => {
  const [token, setToken] = useState<userSession>();
  const [view, setView] = useState<string>("pedidos"); // Estado para la vista actual, por defecto "pedidos"

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");

      setToken(JSON.parse(userToken!));
      !userToken && redirect("/");
    }
  }, []);

  return (
    <div className="flex flex-row min-h-screen dark:bg-gray-700">
      {/* Barra lateral */}
      <div className="bg-gray-900 text-orange-400 w-36 md:w-52">
        <div className="p-1 md:p-4">
          <p className="text-xl text-white font-semibold mb-4 flex items-center">
            <GiSettingsKnobs /> &nbsp;Dashboard
          </p>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setView("pedidos")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <RiFolderSettingsFill /> &nbsp; Pedidos
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
                onClick={() => setView("users")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <RiFolderSettingsFill /> &nbsp; Usuarios
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        {/* Barra de navegación */}
        <div className="bg-gray-200 p-1 md:p-4 dark:bg-gray-500 ">
          <h2 className="text-lg font-semibold mb-2 dark:text-white">
            Bienvenido usuario Administrador
          </h2>
          <div className="bg-gray-50 p-4 rounded shadow dark:bg-gray-300">
            {/* Aquí irían los datos del usuario */}
            <p>
              <b>Nombre:</b> {token?.userData.data.name}
            </p>
            <p>
              <b>Email:</b> {token?.userData.data.email}
            </p>
            <p>
              <b>Teléfono:</b> {token?.userData.data.phone}
            </p>
            <p>
              <b>Dirección:</b> {token?.userData.data.address}
            </p>
            <p>
              <b>País:</b> {token?.userData.data.country}
            </p>
            <p>
              <b>Ciudad:</b> {token?.userData.data.city}
            </p>
          </div>
        </div>
        <div className="p-1 md:p-4 flex flex-col flex-1">
          {view === "categories" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Modificar Categoría
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

          {view === "pedidos" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Pedidos</h2>
              <PedidosList />
            </div>
          )}
          {view === "users" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Usuarios</h2>
              <UserRol />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
