"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { userSession } from "@/types";
import { FcOk } from "react-icons/fc";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { IOrderList } from "@/interfaces/IOrder";
import { IRating } from "@/interfaces/IRating";
import { getRating } from "@/helpers/Reseñas.helper";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const Dashboard = () => {
  const [token, setToken] = useState<userSession>();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<IOrderList[]>([]);
  const [reviews, setReviews] = useState<IRating[]>([]);

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
      console.log(data.orders);
      return data.orders;
    } catch (error: any) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    if (userId) {
      listOrders(userId).then(setOrders);
      getRating().then(setReviews);
    }
  }, [userId]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const userReviews = reviews.filter((review) => review.user.id === userId);

  if (loading) {
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
          </ul>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 antialiased h-screen">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-gray-900">
              <div className="flex-1 flex items-center space-x-2">
                <h5>
                  <span className="text-orange-400">Datos de Usuario</span>
                </h5>
              </div>
            </div>
            <div className="p-4">
              <div className="bg-gray-50 dark:bg-gray-300 p-4 rounded shadow mb-4">
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
              <h2 className="text-lg font-semibold mb-2 dark:text-white">
                Historial de Ordenes
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        Fecha
                      </th>
                      <th scope="col" className="p-4">
                        Productos
                      </th>
                      <th scope="col" className="p-4">
                        Estado
                      </th>
                      <th scope="col" className="p-4">
                        Total pagado
                      </th>
                      <th scope="col" className="p-4">
                        Reseña
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => {
                        const orderReview = userReviews.find(
                          (review) => review.order.id === order.id
                        );
                        return (
                          <tr
                            key={index}
                            className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white  ">
                              {formatDate(order.date)}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {order.orderDetails.orderDetailsProducts.map(
                                (product, productIndex) => (
                                  <div
                                    key={productIndex}
                                    className="mb-2 text-start"
                                  >
                                    <img
                                      src={product.imgUrl}
                                      alt={product.name}
                                      className="w-10 h-10 inline-block mr-2 rounded-full"
                                    />
                                    <span>{product.products.name}</span>
                                  </div>
                                )
                              )}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {order.orderDetails.statushistory.map(
                                (status, statusIndex) => (
                                  <div
                                    key={statusIndex}
                                    className="flex items-center"
                                  >
                                    <FcOk className="mr-2" />
                                    <p>{status.status}</p>
                                  </div>
                                )
                              )}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              ${order.orderDetails.amount}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {orderReview ? (
                                <div>
                                  <div className="flex items-center mb-2">
                                    <p className="mr-2">
                                      Estrellas:{" "}
                                      {Array.from({
                                        length: orderReview.rating,
                                      }).map((_, starIndex) => (
                                        <span key={starIndex}>⭐</span>
                                      ))}
                                    </p>
                                  </div>
                                  <p className="text-start">
                                    Comentario: {orderReview.comment}
                                  </p>
                                </div>
                              ) : (
                                <p>No hay reseña.</p>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          No hay órdenes disponibles.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
