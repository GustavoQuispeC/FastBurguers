"use client";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaTruck } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { BiPackage } from "react-icons/bi";

const steps = [
  { name: "Pago Recibido", icon: <GiReceiveMoney size={24} /> },
  { name: "En Preparación", icon: <BiPackage size={24} /> },
  { name: "En Camino", icon: <FaTruck size={24} /> },
  { name: "Entregado", icon: <AiOutlineCheckCircle size={24} /> },
];

// Definimos la interfaz para el estado de la orden
interface OrderStatus {
  id: string;
  status: string;
  updatedAt: string;
}

// Mapeamos los estados a los índices
const statusToIndex: { [key: string]: number } = {
  "Pago Recibido": 0,
  "En Preparación": 1,
  "En Camino": 2,
  "Entregado": 3,
};

const Tracking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el estado de la orden
  const fetchOrderStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/order-status?orderId=123456`); // Cambia '123456' por el ID real de la orden
      const data: OrderStatus = await response.json();
      const stepIndex = statusToIndex[data.status] ?? 0;
      setCurrentStep(stepIndex);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener el estado de la orden');
      setLoading(false);
    }
  };

  // Usamos useEffect para hacer polling
  useEffect(() => {
    // Llamamos fetchOrderStatus cada 30 segundos
    fetchOrderStatus(); // Llamada inicial
    const intervalId = setInterval(fetchOrderStatus, 30000); // Intervalo en ms

    // Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="relative">
        {steps.map((step, index) => (
          <Transition
            key={index}
            show={currentStep === index}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform transition duration-[400ms]"
            leaveFrom="opacity-100 rotate-0 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center text-orange-400">
                  {step.icon}
                </div>
                <p className="mt-2 text-lg font-bold text-gray-700 dark:text-gray-300">
                  {step.name}
                </p>
              </div>
            </div>
          </Transition>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-1 h-2 mx-1 rounded-full ${
              index <= currentStep
                ? "bg-orange-400"
                : "bg-gray-200 dark:bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;