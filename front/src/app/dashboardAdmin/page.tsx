"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { userSession } from "@/types";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import ProductList from "@/components/ProductList/page";
import { GiSettingsKnobs } from "react-icons/gi";
import { HiChartBar, HiClipboardList } from "react-icons/hi";
import { TbCategoryPlus, TbLogout } from "react-icons/tb";
import { SiAzureartifacts } from "react-icons/si";
import PedidosList from "@/components/PedidosList/PedidosList";
import TopVentas from "@/components/TopVentas/TopVentas";
import UserRol from "@/components/UserRol/UserRol";
import { FaUsersCog } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { Spinner } from "flowbite-react/components/Spinner";
import SalasChat from "@/components/Chat/SalasChat";

const DashboardAdmin = () => {
  const [token, setToken] = useState<userSession>();
  const [view, setView] = useState<string>("modifyProducts");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");

      if (userToken) {
        const parsedToken = JSON.parse(userToken);

        try {
          const decodedToken = jwtDecode(parsedToken.userData.token) as {
            isAdmin: boolean;
            isSuperAdmin: boolean;
          };

          if (!decodedToken.isAdmin && !decodedToken.isSuperAdmin) {
            router.push("/home");
          } else {
            setToken(parsedToken);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          router.push("/home");
        }
      } else {
        router.push("/home");
      }
    }
  }, [router]);

  const [userSessionData, setUserSessionData] = useState<userSession | null>(
    null
  );

  const handleSignOut = () => {
    localStorage.removeItem("userSession");
    setUserSessionData(null);
    router.push("/home");
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("userSession");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-row min-h-screen dark:bg-gray-700">
      <div className="bg-gray-900 text-orange-400 w-36 md:w-52">
        <div className="p-1 md:p-4">
          <p className="text-xl text-white font-semibold mb-4 flex items-center">
            <GiSettingsKnobs /> &nbsp;Dashboard
          </p>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setView("modifyProducts")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <SiAzureartifacts /> &nbsp; Productos
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setView("pedidos")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <HiClipboardList /> &nbsp; Pedidos
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setView("categories")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <TbCategoryPlus /> &nbsp; Categorías
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setView("topVentas")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <HiChartBar /> &nbsp; Ventas
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setView("users")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <FaUsersCog /> &nbsp; Usuarios
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setView("chat")}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700 w-full text-left"
              >
                <BiChat /> &nbsp; Chat
              </button>
            </li>
            <li className="mb-2 text-yellow-300">
              <button
                onClick={handleSignOut}
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-red-700 w-full text-left"
              >
                <TbLogout className="text-white" /> &nbsp; Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="bg-gray-200 p-1 md:p-4 dark:bg-gray-500">
          <h2 className="text-lg font-semibold mb-2 dark:text-white">
            Bienvenido usuario Administrador
          </h2>
          <div className="bg-gray-50 p-4 rounded shadow dark:bg-gray-300">
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
          {view === "categories" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Modificar Categoría
              </h2>
              <CategoriesList />
            </div>
          )}
          {view === "topVentas" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Top Ventas</h2>
              <TopVentas />
            </div>
          )}
          {view === "users" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Usuarios</h2>
              <UserRol />
            </div>
          )}
          {view === "chat" && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Salas de Chat</h2>
              <SalasChat />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
