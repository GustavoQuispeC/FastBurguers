"use client";

import { useEffect, useState } from "react";
import { GetPedidos } from "@/helpers/Pedidos.helper";
import { IOrderList } from "@/interfaces/IOrder";
import Spinner from "../Spinner";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    hoverBackgroundColor: string;
    hoverBorderColor: string;
  }[];
}

const TopVentas: React.FC = () => {
  const [pedidos, setPedidos] = useState<IOrderList[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    datasets: [
      {
        label: "Ventas de la semana",
        data: [],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  const fetchPedidos = async (token: string) => {
    try {
      const pedidos = await GetPedidos(token);
      setPedidos(pedidos);
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    if (!loading) {
      const sales = [0, 0, 0, 0, 0, 0, 0]; // Ventas para cada día de la semana
      pedidos.forEach((pedido) => {
        const date = new Date(pedido.date);
        const day = date.getDay();
        sales[day] += parseFloat(pedido.orderDetails.price);
      });

      setChartData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: sales,
          },
        ],
      }));
    }
  }, [loading, pedidos]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default TopVentas;
