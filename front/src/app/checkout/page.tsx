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

                <div className="grid gap-4 sm:grid-cols-2 mt-8">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="w-5 h-5 cursor-pointer"
                      id="card"
                      defaultChecked={true}
                    />
                    <label
                      htmlFor="card"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="https://readymadeui.com/images/visa.webp"
                        className="w-12"
                        alt="card1"
                      />
                      <img
                        src="https://readymadeui.com/images/american-express.webp"
                        className="w-12"
                        alt="card2"
                      />
                      <img
                        src="https://readymadeui.com/images/master.webp"
                        className="w-12"
                        alt="card3"
                      />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="w-5 h-5 cursor-pointer"
                      id="paypal"
                    />
                    <label
                      htmlFor="paypal"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="https://readymadeui.com/images/paypal.webp"
                        className="w-20"
                        alt="paypalCard"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid gap-4 mt-8">
                  
                  <TextInput
                    id="nameCard"
                    type="text"
                    placeholder="name on card"
                    required
                  />
                  <div className="flex bg-white border-b-2 focus-within:border-gray-800 overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 ml-3"
                      viewBox="0 0 291.764 291.764"
                    >
                      <path
                        fill="#2394bc"
                        d="m119.259 100.23-14.643 91.122h23.405l14.634-91.122h-23.396zm70.598 37.118c-8.179-4.039-13.193-6.765-13.193-10.896.1-3.756 4.24-7.604 13.485-7.604 7.604-.191 13.193 1.596 17.433 3.374l2.124.948 3.182-19.065c-4.623-1.787-11.953-3.756-21.007-3.756-23.113 0-39.388 12.017-39.489 29.204-.191 12.683 11.652 19.721 20.515 23.943 9.054 4.331 12.136 7.139 12.136 10.987-.1 5.908-7.321 8.634-14.059 8.634-9.336 0-14.351-1.404-21.964-4.696l-3.082-1.404-3.273 19.813c5.498 2.444 15.609 4.595 26.104 4.705 24.563 0 40.546-11.835 40.747-30.152.08-10.048-6.165-17.744-19.659-24.035zm83.034-36.836h-18.108c-5.58 0-9.82 1.605-12.236 7.331l-34.766 83.509h24.563l6.765-18.08h27.481l3.51 18.153h21.664l-18.873-90.913zm-26.97 54.514c.474.046 9.428-29.514 9.428-29.514l7.13 29.514h-16.558zM85.059 100.23l-22.931 61.909-2.498-12.209c-4.24-14.087-17.533-29.395-32.368-36.999l20.998 78.33h24.764l36.799-91.021H85.059v-.01z"
                        data-original="#2394bc"
                      />
                      <path
                        fill="#efc75e"
                        d="M51.916 111.982c-1.787-6.948-7.486-11.634-15.226-11.734H.374L0 101.934c28.329 6.984 52.107 28.474 59.821 48.688l-7.905-38.64z"
                        data-original="#efc75e"
                      />
                    </svg>
                    <TextInput
                      type="number"
                      placeholder="Card Number"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <TextInput
                      type="number"
                      placeholder="EXP."
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"
                    />
                    <TextInput
                      type="number"
                      placeholder="CVV"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"
                    />
                  </div>
                </div>
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
