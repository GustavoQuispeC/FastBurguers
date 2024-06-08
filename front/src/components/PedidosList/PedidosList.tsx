"use client";
import { GetPedidos } from "@/helpers/Pedidos.helper";
import { IPedido } from "@/interfaces/IPedido"; // Define la interfaz para los pedidos
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

const PedidosList = () => {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (typeof window !== "undefined" && window.localStorage) {
        const userSession = localStorage.getItem("userSession");
        if (userSession) {
          const parsedSession = JSON.parse(userSession);
          const token = parsedSession.userData.token;
          const pedidos = await GetPedidos(token);
          setPedidos(pedidos);
        }

        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (pedidos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        {loading ? <Spinner /> : <p>No hay pedidos disponibles.</p>}
      </div>
    );
  }

  return (
    <div>
      <section className="p-3 sm:p-5 antialiased h-screen dark:bg-gray-700">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12 ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-gray-900">
              <div className="flex-1 flex items-center space-x-2">
                <h5>
                  <span className="text-orange-400">Listado de Pedidos</span>
                </h5>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      ID
                    </th>
                    <th scope="col" className="p-4">
                      Fecha
                    </th>
                    <th scope="col" className="p-4">
                      Productos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr
                      key={pedido.id}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {pedido.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {new Date(pedido.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {pedido.products?.map((producto) => (
                          <div key={producto.id}>
                            {producto.name} - {producto.quantity}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
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
