'use client';
import { useRouter } from "next/navigation";
import React from "react";

const Cart = () => {
  const router = useRouter();
  return (
    <div className="font-sans max-w-4xl mx-auto py-4 h-screen">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-900">Carrito</h2>
          <hr className="border-white my-4" />

          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 items-center gap-4">
              <div className="sm:col-span-2 flex items-center gap-4">
                <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
                  <img
                    src="/hamburguesa1.png"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    Hamburguesa 1
                  </h3>
                  <h6 className="text-xs text-red-500 cursor-pointer mt-0.5">
                    Eliminar
                  </h6>

                  <div className="flex gap-4 mt-4">
                    <div>
                      <button
                        type="button"
                        className="flex items-center px-2.5 py-1.5 border border-white text-gray-900 text-xs outline-none bg-transparent rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 fill-current"
                          viewBox="0 0 124 124"
                        >
                          <path
                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            data-original="#000000"
                          ></path>
                        </svg>
                        <span className="mx-2.5">1</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 fill-current"
                          viewBox="0 0 42 42"
                        >
                          <path
                            d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <h4 className="text-lg font-bold text-gray-800">$20.00</h4>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 items-center gap-4">
              <div className="sm:col-span-2 flex items-center gap-4">
                <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
                  <img
                    src="/hamburguesa2.jpg"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    Hamburguesa 2
                  </h3>
                  <h6 className="text-xs text-red-600 cursor-pointer mt-0.5">
                    Eliminar
                  </h6>

                  <div className="flex gap-4 mt-4">
                    <div>
                      <button
                        type="button"
                        className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-900 text-xs outline-none bg-transparent rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 fill-current"
                          viewBox="0 0 124 124"
                        >
                          <path
                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            data-original="#000000"
                          ></path>
                        </svg>

                        <span className="mx-2.5">1</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 fill-current"
                          viewBox="0 0 42 42"
                        >
                          <path
                            d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <h4 className="text-lg font-bold text-gray-800">$120.00</h4>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 items-center gap-4">
              <div className="sm:col-span-2 flex items-center gap-4">
                <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
                  <img
                    src="/hamburguesa3.webp"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    Hamburguesa 3
                  </h3>
                  <h6 className="text-xs text-red-400 cursor-pointer mt-0.5">
                    Eliminar
                  </h6>

                  <div className="flex gap-4 mt-4">
                    1
                    <div>
                      <button
                        type="button"
                        className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 fill-current"
                          viewBox="0 0 124 124"
                        >
                          <path
                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            data-original="#000000"
                          ></path>
                        </svg>

                        <span className="mx-2.5">1</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 fill-current"
                          viewBox="0 0 42 42"
                        >
                          <path
                            d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <h4 className="text-lg font-bold text-gray-800">$50.00</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          {/* <div className="flex border border-blue-600 overflow-hidden rounded-md">
            <input
              type="email"
              placeholder="Promo code"
              className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
            />
            <button
              type="button"
              className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
            >
              Apply
            </button>
          </div> */}
          <h2 className="text-base font-bold text-gray-800">Resúmen de compra</h2>

          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Discount <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping <span className="ml-auto font-bold">$2.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span className="ml-auto">$52.00</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-900 hover:bg-gray-800 text-orange-400 rounded-md"
            >
              Ir a pagar
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
            >
              Continuar comprando{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
