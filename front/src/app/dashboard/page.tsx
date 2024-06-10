"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { userSession } from "@/types";
import { FcCalendar, FcMoneyTransfer, FcOk } from "react-icons/fc";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { IOrderList } from "@/interfaces/IOrder";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

//!Obtener datos de la sesion
const Dashboard = () => {
  //!Obtener datos de la sesion
  const [token, setToken] = useState<userSession>();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrderList[]>([]);

  //!Obtener datos de la sesion
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");

      setToken(JSON.parse(userToken!));
      !userToken && redirect("/login");
    }
  }, []);

  const userId = token?.userData.data.userid;

  const listOrders = async (userId: string): Promise<IOrderList[]> => {
    try {
      const { data } = await axios.get(`${apiURL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token?.userData.token}`,
        },
      });
      return data.orders;
    } catch (error: any) {
      console.error(error);
      return [];
    }
  };

  //!Obtener las ordenes
  useEffect(() => {
    if (userId) {
      listOrders(userId).then(setOrders);
    }
  }, [userId]);
  console.log(orders);

  //!Formatear la fecha
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  //! Spinner de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // if (orders.length === 0) {
  //   return (
  //     <div className="h-screen items- justify-center">
  //       {loading ? <Spinner /> : <p>Algo no esta bien.</p>}
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-row min-h-screen dark:bg-gray-700">
      {/* Barra lateral */}
      <div className="bg-gray-900 text-orange-400 w-36 md:w-52">
        <div className="p-1 md:p-4">
          <h2 className="text-xl text-white font-semibold mb-4">Dashboard</h2>
          <ul>
            <li className="mb-2">
              <a
                href="/dashboard"
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-gray-700"
              >
                <MdBorderColor /> &nbsp; Órdenes
              </a>
            </li>
            <li className="mb-2">
              <Link
                href="/"
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700"
              >
                <IoHome /> &nbsp; Ir a la tienda
              </Link>
            </li>
            <li className="mb-2">
              <a
                href="/cart"
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700"
              >
                <FaCartPlus />
                &nbsp; Carrito
              </a>
            </li>
            <li className="mb-2">
              <Link
                href="/productList"
                className="flex flex-row items-center py-2 md:px-4 rounded hover:bg-teal-700"
              >
                <IoHome /> &nbsp; Modificar Productos
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        {/* Barra de navegación */}
        <div className="bg-gray-200 dark:bg-gray-500 p-1 md:p-4">
          <h2 className="text-lg font-semibold mb-2 dark:text-white">
            Datos de Usuario
          </h2>
          <div className="bg-gray-50 dark:bg-gray-300 p-4 rounded shadow">
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
        {/* Sección de datos de usuario y órdenes */}
        <div className="p-1 md:p-4">
          <h2 className="text-lg font-semibold mb-2 dark:text-white">
            Historial de Ordenes
          </h2>
          <div className="bg-gray-200 p-4 rounded shadow">
            {orders.length > 0 ? (
              <div>
                {orders.map((order, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-bold">Orden ID: {order.id}</h3>
                    <div className="flex items-center mb-2">
                      <FcCalendar className="mr-2" />
                      <p>Fecha: {formatDate(order.date)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Productos:</h4>
                      {order.orderDetails.products.map(
                        (product, productIndex) => (
                          <div className="flex items-center" key={productIndex}>
                            <p className="mr-2">-{product.name}</p>
                            <p>${product.price}</p>
                          </div>
                        )
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">Manejo de pedido:</h4>
                      {order.orderDetails.statushistory.map(
                        (status, statusIndex) => (
                          <div key={statusIndex} className="flex items-center">
                            <FcOk className="mr-2" />
                            <p>
                              {status.status}
                              {" - "}
                              {formatDate(status.timestamp)}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">Total pagado:</h4>
                      <div
                        className="flex items-center"
                        style={{ marginBottom: "0.5rem" }}
                      >
                        <FcMoneyTransfer className="mr-2" />
                        <p>${order.orderDetails.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay órdenes disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
