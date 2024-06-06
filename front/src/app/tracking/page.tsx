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

const Tracking = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

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
