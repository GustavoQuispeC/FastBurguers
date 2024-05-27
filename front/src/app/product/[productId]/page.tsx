import React from "react";

const page = () => {
  return (
    <div className="font-sans h-screen">
      <div className="p-4 max-w-6xl max-md:max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full lg:sticky top-0 flex gap-3">
            <img
              src="/hamburguesa4.jpg"
              alt="Product"
              className="w-3/4 rounded-xl object-cover"
            />
            <div className="w-20 flex flex-col max-sm:mb-4 gap-3">
            </div>
          </div>

          <div>
            <h2 className="text-3xl max-sm:text-2xl font-bold text-blue-800">
              Hamburguesa Clásica a la Parrilla
            </h2>
            <div className="flex flex-wrap gap-4 mt-8">
              <h3 className="text-gray-800 text-4xl max-sm:text-3xl font-bold">
                $12
              </h3>
              <p className="text-gray-400 text-xl">
                <s>$16</s> <span className="text-sm ml-1">Oferta</span>
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-800">ELIGE EL TAMAÑO</h3>
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  type="button"
                  className="w-16 h-11 border-2 hover:border-gray-800 font-semibold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0"
                >
                  Clásica
                </button>
                <button
                  type="button"
                  className="w-16 h-11 border-2 hover:border-gray-800 border-gray-800 font-semibold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0"
                >
                  Mediana
                </button>
                <button
                  type="button"
                  className="w-16 h-11 border-2 hover:border-gray-800 font-semibold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0"
                >
                  Grande
                </button>
                
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-800">DESEA AÑADIR BEBIDA</h3>
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  type="button"
                  className="w-20 h-11 border-2 hover:border-gray-800 font-semibold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0"
                >
                  Coca Cola
                </button>
                <button
                  type="button"
                  className="w-20 h-11 border-2 hover:border-gray-800 border-gray-800 font-semibold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0"
                >
                  Inka Kola
                </button>
                <button
                  type="button"
                  className="w-20 h-11 border-2 hover:border-gray-800 font-semibold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0"
                >
                  Pepsi
                </button>
                
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white border border-gray-800 text-base rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 cursor-pointer fill-current inline mr-3"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                    data-original="#000000"
                  ></path>
                </svg>
                Agregar
              </button>

              <button
                type="button"
                className="flex items-center justify-center px-8 py-4 bg-transparent hover:bg-gray-50 text-gray-800 border border-gray-800 text-base rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 cursor-pointer fill-current inline mr-3"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  ></path>
                </svg>
                Favorito
              </button>
            </div>

            <ul className="grid grid-cols-2 mt-10">
              <li className="text-gray-800 font-semibold text-base text-center py-3 border-b-2 px-4 cursor-pointer">
                Descripción
              </li>
            </ul>

            <ul className="space-y-3 list-disc pl-4 text-sm text-gray-800 mt-8">
              <li>
                ¿Ya probaste la deliciosa hamburguesa a la parrilla clásica
                Bembos? Con su delicioso sabor ahumado y consistencia
                característica, este clásico Bembos lleva como ingredientes:
              </li>
              <li>Mayonesa.</li>
              <li>Tomate.</li>
              <li>Lechuga.</li>
              <li>¡Pídela ya con delivery!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
