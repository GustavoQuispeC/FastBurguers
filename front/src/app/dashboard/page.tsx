"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { userSession } from "@/types";
import { getOrders } from "@/helpers/orders.helper";
import { IOrderUser } from "@/interfaces/IOrder";

//!Obtener datos de la sesion
const Dashboard = () => {
  //!Obtener datos de la sesion
  const [token, setToken] = useState<userSession>();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("userSession");
      console.log(userToken);

      setToken(JSON.parse(userToken!));
      !userToken && redirect("/");
    }
  }, []);

  const userId = token?.userData.data.userid;

  //!Obtener las ordenes
  const [orders, setOrders] = useState<IOrderUser[]>([]);

  useEffect(() => {
    async function getDataOrder() {
      try {
        const response = await getOrders(userId!, token!.userData.token);
        // Asegurarse de que response sea un array antes de establecer el estado
        if (response?.orders && Array.isArray(response.orders)) {
          setOrders(response
         
          );
        } else {
          console.error(
            "Error: El response de getOrders no contiene órdenes válidas"
          );
        }
      } catch (error: any) {
        console.error(error);
      }
    }
    if (token) {
      getDataOrder();
    }
  }, [token, userId]);

  console.log(orders);

  //!Formatear la fecha
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  return (
    <div className="flex flex-row min-h-screen">
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
        <div className="bg-gray-200 p-1 md:p-4">
          <h2 className="text-lg font-semibold mb-2">Datos de Usuario</h2>
          <div className="bg-gray-50 p-4 rounded shadow">
            {/* Aquí irían los datos del usuario */}
            <p>
              <b>Nombre:</b> {token?.userData.data.name}
            </p>
            <p>
              <b>Email:</b> {token?.userData.data.email}
            </p>
            <p>
              <b>Teléfono: </b>
              {token?.userData.data.phone}
            </p>
            <p>
              <b>Dirección:</b> {token?.userData.data.address}
            </p>
            <p>
              <b>País:</b>
              {token?.userData.data.country}
            </p>
            <p>
              <b>Ciudad:</b>
              {token?.userData.data.city}
            </p>
          </div>
        </div>
        {/* Sección de datos de usuario y órdenes */}

        <div>
          {/* Contenido de las órdenes */}
          {orders?.map((order: IOrderUser) => (
            <div key={order.id} className="bg-teal-50 p-4 rounded shadow mb-4">
              <h2 className="text-sm font-semibold mb-2">Orden: {order.id}</h2>

              <h2 className="text-sm font-semibold mb-2">
                Orden: {}
              </h2>

              <div className="flex flex-col">
                {/* Iterar sobre las órdenes dentro de cada objeto order */}
                {order.orders?.map((details) => (
                  <div key={details.id}>
                    <div className="flex flex-row">
                      <p className="mr-1">Fecha: {formatDate(details.date)}</p>
                    </div>
                    {/* Detalle de compra */}
                    <p className="font-bold text-cyan-700 pt-2">
                      Detalle de compra:
                      {details.orderDetails.products?.map((product) => (
                        <div key={product.id} className="flex flex-row">
                          <p className="mr-1">
                            {product.name} x {product.imgUrl} - {product.price}
                          </p>
                        </div>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
