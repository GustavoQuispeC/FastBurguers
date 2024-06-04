"use client";

import PayPalButton from "@/components/PayPalButton/PayPalButton";
import { Label, TextInput } from "flowbite-react";

const Checkout = () => {
  return (
    <div className="font-[sans-serif] bg-white pt-6">
      <div className="max-lg:max-w-xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
            <div className="text-center max-lg:hidden">
              <h2 className="text-3xl font-extrabold text-[#333] inline-block border-b-4 border-[#333] pb-1">
                Verificar
              </h2>
            </div>
            <form className="lg:mt-12">
              <div>
                <h2 className="text-2xl font-extrabold text-[#333]">
                  Datos de envío
                </h2>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <TextInput
                    type="text"
                    placeholder="Nombre"
                    className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  />
                  <TextInput
                    type="email"
                    placeholder="correo"
                    className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  />
                  <TextInput
                    type="text"
                    placeholder="Dirección"
                    className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  />
                  <TextInput
                    type="text"
                    placeholder="Distrito"
                    className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                  />
                </div>
              </div>
              <div className="mt-12 pb-6">
                <h2 className="text-2xl font-extrabold text-gray-800">
                  Método de Pago
                </h2>
                <PayPalButton />
              </div>

              <div className="bg-gray-100 p-6 rounded-md">
                <h2 className="text-2xl font-extrabold text-gray-900">
                  Resumen del pedido
                </h2>

                <ul className="text-gray-800 mt-8 space-y-4">
                  <li className="flex flex-wrap gap-4 text-sm">
                    SubTotal <span className="ml-auto font-bold">$150.00</span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Envio <span className="ml-auto font-bold">$200.00</span>
                  </li>

                  <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                    Total a Pagar <span className="ml-auto">$750.00</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center py-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-gray-900 focus:ring-gray-700 border-gray-300 rounded"
                  defaultChecked={false}
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  Acepta los{" "}
                  <a
                    href="#"
                    className="text-orange-400 font-semibold hover:underline ml-1"
                  >
                    Términos y Condiciones.
                  </a>
                </label>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="button"
                  className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-[#333] rounded-md hover:bg-gray-200"
                >
                  Volver
                </button>
                <button
                  type="button"
                  className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-900 text-orange-400 rounded-md hover:bg-gray-700"
                >
                  Confirmar Pago
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0">
            <div className="relative h-full">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 className="text-2xl font-extrabold text-[#333]">
                  Mis Pedidos
                </h2>
                <div className="space-y-6 mt-10">
                  <div className="grid sm:grid-cols-2 items-start gap-6">
                    <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="/hamburguesa1.png"
                        className="w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base text-[#333]">Hamburguesa 1</h3>
                      <ul className="text-xs text-[#333] space-y-2 mt-2">
                        <li className="flex flex-wrap gap-4">
                          Tamaño <span className="ml-auto">clásica</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Cantidad <span className="ml-auto">2</span>
                        </li>
                        <li className="flex flex-wrap gap-4">
                          Total a pagar <span className="ml-auto">$40</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 items-start gap-6">
                    <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="/Hamburguesa2.jpg"
                        className="w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base text-[#333]">Hamburguesa 2</h3>
                      <ul className="text-xs text-[#333] space-y-2 mt-2">
                        <li>
                          Tamaño <span className="float-right">Mediana</span>
                        </li>
                        <li>
                          Cantidad <span className="float-right">3</span>
                        </li>
                        <li>
                          Total a pagar{" "}
                          <span className="float-right">$100</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 items-start gap-6">
                    <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                      <img
                        src="/hamburguesa3.webp"
                        className="w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base text-[#333]">Hamburguesa 3</h3>
                      <ul className="text-xs text-[#333] space-y-2 mt-2">
                        <li>
                          Tamaño <span className="float-right">Grande</span>
                        </li>
                        <li>
                          Quantity <span className="float-right">1</span>
                        </li>
                        <li>
                          Total Price <span className="float-right">$50</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-0 bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
                  Total <span className="ml-auto">$240.00</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
