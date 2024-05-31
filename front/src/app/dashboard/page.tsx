"use client";
import React, { use, useEffect, useState } from "react";
//import { IOrder, userSession } from "@/types";
//import { redirect } from "next/navigation";
//import { getOrders } from "@/helpers/product.helpers";
import { IoHome } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";

//!Obtener datos de la sesion
const Dashboard = () => {
  //!Obtener datos de la sesion
  // const [token, setToken] = useState<userSession>();
  // useEffect(() => {
  //   if (typeof window !== "undefined" && window.localStorage) {
  //     const userToken = localStorage.getItem("userSession");
  //     setToken(JSON.parse(userToken!));
  //     !userToken && redirect("/");
  //   }
  // }, []);

  //!Obtener las ordenes
  // const [orders, setOrders] = useState<IOrder[]>();

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await getOrders(token?.token!);
  //       setOrders(response);
  //     } catch (error: any) {
  //       throw new Error(error);
  //     }
  //   }
  //   token && getData();
  // }, [token]);

  //!Formatear la fecha
  // function formatDate(dateString: string) {
  //   const date = new Date(dateString);
  //   return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  // }

  //!Obtener el total de la orden
  // const calcularOrder = (order: IOrder) => {
  //   let orderTotal: number = 0;
  //   order.products.forEach((product) => {
  //     orderTotal += product.price;
  //   });
  //   return orderTotal;
  // };

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
            <MdBorderColor /> &nbsp; Ordenes
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
        {/* <p>Nombre: {token?.userData.name}</p>
        <p>Email: {token?.userData.email}</p>
        <p>Telefono: {token?.userData.phone}</p>
        <p>Dirección: {token?.userData.address} </p> */}
      </div>
    </div>
    {/* Sección de datos de usuario y órdenes */}
    <div className="p-1 md:p-4 flex flex-col flex-1">
     
      
      {/* Sección de órdenes */}
      <div className="flex flex-col flex-1">
        <h2 className="text-lg font-semibold mb-2">
          Ordenes de compra realizadas
        </h2>
        {/* {orders?.length === 0 ? (
          <p className="flex flex-col">
            No tienes órdenes realizadas. &nbsp;
            <a
              className="text-sky-600 flex flex-row items-center underline hover:text-sky-700"
              href="/product"
            >
              Ir a la tienda
              <IoHome />
            </a>
          </p>
        ) : ( */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contenido de las órdenes */}
            {/* {orders?.map((order: IOrder) => (
              <div
                key={order.id}
                className="bg-teal-50 p-4 rounded shadow mb-4"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Orden: {order.id}
                </h3>
                <div className="flex flex-row">
                  <p className="mr-1">Fecha:</p>
                  <p className="text-green-600 font-semibold">
                    {formatDate(order.date)}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="mr-1">Total:</p>
                  <p className="text-green-600 font-semibold">
                    ${calcularOrder(order)}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="mr-1">Estado:</p>
                  <p className="text-green-600 font-semibold">{order.status}</p>
                </div>
                <p className="font-bold text-cyan-700 pt-2">
                  Detalle de compra:
                </p>
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {" - "}
                      {product.name} = ${product.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  </div>

  </div>
  
</div>
  );
};

export default Dashboard;
