"use client";
import { GetPedidos, ChangeStatus } from "@/helpers/Pedidos.helper";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { IOrderList } from "@/interfaces/IOrder";

const PedidosList = () => {
  const [pedidos, setPedidos] = useState<IOrderList[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async (token: string) => {
    const pedidos = await GetPedidos(token);
    const sortedPedidos = pedidos.sort((a: IOrderList, b: IOrderList) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setPedidos(sortedPedidos);
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        const token = parsedSession.userData.token;
        fetchPedidos(token);
      }
    }
  }, []);

  const handleStatusChange = async (
    pedidoId: string,
    currentStatus: string
  ) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        const token = parsedSession.userData.token;

        const statusOrder = [
          "solicitud_recibida",
          "en_preparacion",
          "en_camino",
          "entregado",
        ];

        const currentIndex = statusOrder.indexOf(currentStatus);

        if (currentIndex !== -1 && currentIndex < statusOrder.length - 1) {
          const newStatus = statusOrder[currentIndex + 1];
          await ChangeStatus(token, pedidoId, newStatus);
          fetchPedidos(token);
        } else {
          console.log("No se puede avanzar al siguiente estado.");
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No hay pedidos disponibles.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="p-3 sm:p-5 antialiased h-screen dark:bg-gray-700">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-gray-900">
              <div className="flex-1 flex items-center space-x-2">
                <h5>
                  <span className="text-orange-400">Listado de Pedidos</span>
                </h5>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      ID
                    </th>
                    <th scope="col" className="p-4">
                      Fecha
                    </th>
                    <th scope="col" className="p-4">
                      Hora
                    </th>
                    <th scope="col" className="p-4">
                      Precio Total
                    </th>
                    <th scope="col" className="p-4">
                      Productos
                    </th>
                    <th scope="col" className="p-4">
                      Estado
                    </th>
                    <th scope="col" className="p-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => {
                    const statushistory = pedido.orderDetails.statushistory;
                    const currentStatus =
                      statushistory[statushistory.length - 1]?.status;

                    const statusMapping: { [key: string]: string } = {
                      solicitud_recibida: "Pago Recibido",
                      en_preparacion: "En Preparación",
                      en_camino: "En Camino",
                      entregado: "Entregado",
                    };
                    const displayStatus =
                      statusMapping[currentStatus] || currentStatus;
                    const isDelivered = currentStatus === "entregado";

                    const fecha = new Date(pedido.date);
                    const fechaStr = fecha.toLocaleDateString();
                    const horaStr = fecha.toLocaleTimeString();

                    return (
                      <tr
                        key={pedido.id}
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {pedido.id}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {fechaStr}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {horaStr}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {pedido.orderDetails.amount}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {pedido.orderDetails.orderDetailsProducts.map(
                            (producto) => (
                              <div
                                key={producto.products.name}
                                className="mb-2"
                              >
                                <img
                                  src={producto.products.imgUrl}
                                  alt={producto.products.name}
                                  className="w-10 h-10 inline-block mr-2 rounded-full"
                                />
                                <span>{producto.products.name}</span>
                              </div>
                            )
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <span className="bg-blue-500 text-white px-2 py-1 rounded">
                            {displayStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <button
                            onClick={() =>
                              handleStatusChange(pedido.id, currentStatus)
                            }
                            className={`bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 ${
                              isDelivered ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isDelivered}
                          >
                            Cambiar Estado
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PedidosList;
