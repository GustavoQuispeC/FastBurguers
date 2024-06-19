"use client";
import MapWithDirections from "@/components/Maps/MapWithDirections";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCheck, FaClipboardCheck } from "react-icons/fa";
import {
  FaBoxesPacking,
  FaHouseChimney,
  FaTruckArrowRight,
} from "react-icons/fa6";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

const steps = [
  {
    name: "Solicitud Recibida",
    icon: (
      <FaClipboardCheck className="text-blue-500 text-3xl sm:text-5xl mx-4 mb-3" />
    ),
  },
  {
    name: "En Preparación",
    icon: (
      <FaBoxesPacking className="text-yellow-500 text-3xl sm:text-5xl mx-4 mb-3" />
    ),
  },
  {
    name: "En Camino",
    icon: (
      <FaTruckArrowRight className="text-blue-500 text-3xl sm:text-5xl mx-4 mb-3" />
    ),
  },
  {
    name: "Entregado",
    icon: (
      <FaHouseChimney className="text-green-500 text-3xl sm:text-5xl mx-4 mb-3" />
    ),
  },
];

const statusToIndex: { [key: string]: number } = {
  solicitud_recibida: 0,
  en_preparacion: 1,
  en_camino: 2,
  entregado: 3,
};

const OrderStatus = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDate, setOrderDate] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const orderDataArray = JSON.parse(localStorage.getItem("Order") || "[]");
    console.log("Order data from local storage:", orderDataArray);

    if (orderDataArray) {
      const orderId = orderDataArray.id;
      const orderDate = orderDataArray.date;
      setOrderId(orderId);
      setOrderDate(orderDate);
      console.log("Order ID:", orderId);
      console.log("Order Date:", orderDate);

      if (orderId) {
        const userSession = JSON.parse(
          localStorage.getItem("userSession") || "{}"
        );
        const token = userSession.userData?.token;
        console.log("Token:", token);

        if (token) {
          const fetchOrderStatus = async () => {
            try {
              setLoading(true);
              const response = await fetch(
                `${apiURL}/status-histories/${orderId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const data: Array<any> = await response.json();
              console.log("Response data from server:", data);

              const stepIndex = data.length - 1;
              setCurrentStep(stepIndex);

              if (data[stepIndex].status === "entregado") {
                // Si es 'entregado', redirecciona a la página de rating
                router.push("/rating");
              }

              setLoading(false);
            } catch (err) {
              setError("Error al obtener el estado de la orden");
              setLoading(false);
            }
          };

          fetchOrderStatus();
          const intervalId = setInterval(fetchOrderStatus, 30000);

          return () => clearInterval(intervalId);
        } else {
          setError("Token no encontrado en el local storage");
          setLoading(false);
        }
      } else {
        setError("ID de orden no encontrado en el objeto de la orden");
        setLoading(false);
      }
    } else {
      setError("Datos de orden no encontrados en el local storage");
      setLoading(false);
    }
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center">{error}</p>;

  return (
    <>
      <div className="flex flex-col overflow-auto h-screen text-black my-5">
        <div className="container mx-auto px-4 py-5 h-full">
          <div className="card bg-gray-200 dark:bg-gray-700 shadow-lg border border-black rounded-lg py-3 px-5 my-5">
            <div className="flex flex-col sm:flex-row justify-between mx-5 pt-3 my-3">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-2xl sm:text-3xl text-orange-500 mb-3">
                  FastBurgers
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-0"></div>
              <div className="flex flex-col text-right text-xl">
                <p className="mb-0 font-bold text-monospace">
                  Expected Arrival
                  <span className="badge badge-primary border border-secondary text-orange-500 font-bold px-2 py-2 shadow ml-2">
                    {orderDate}
                  </span>
                </p>
                <p className="font-bold text-monospace pt-3 ml-5 sm:ml-0">
                  Tracking ID
                  <span className="badge badge-danger border border-secondary text-orange-500 font-bold mx-1 px-2 py-2 shadow">
                    {orderId}
                  </span>
                </p>
              </div>
            </div>
            <div className="container-fluid">
              <div className="flex flex-col sm:flex-row justify-around p-2 items-center">
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <button
                      className={`btn ${
                        index <= currentStep ? "bg-orange-500" : "bg-gray-400"
                      } text-white rounded-full mb-2 sm:mb-0`}
                      title={step.name}
                    >
                      <FaCheck />
                    </button>
                    {index < steps.length - 1 && (
                      <span
                        className={`flex-grow mx-1 h-1 sm:w-1/2 sm:h-1 rounded ${
                          index < currentStep ? "bg-orange-500" : "bg-gray-400"
                        }`}
                      ></span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-around my-3 py-4 mx-n2">
              {steps.map((step, index) => (
                <div
                  className="flex flex-col sm:flex-row items-center"
                  key={index}
                >
                  {step.icon}
                  <p className="text-black font-bold py-1 px-1 mx-n2 text-center sm:text-left">
                    {step.name.split(" ").map((word, idx) => (
                      <React.Fragment key={idx}>
                        {word}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
            <MapWithDirections />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
