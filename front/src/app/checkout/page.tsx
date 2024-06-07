"use client";

import { useEffect, useState } from "react";
import PayPalButton from "@/components/PayPalButton/PayPalButton";
import { TextInput } from "flowbite-react";
import { IProductCart } from "@/interfaces/IProduct";

const Checkout = () => {
  const [cart, setCart] = useState<IProductCart[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as IProductCart[];
    setCart(cartData);
  }, []);

  const calculateDiscountAmount = (price: number, discount: number) => {
    const validPrice = price || 0;
    const validDiscount = discount || 0;
    return validPrice * validDiscount;
  };

  const calcularTotalConDescuento = () => {
    return cart.reduce((acc, item) => {
      const validPrice = item.price || 0;
      const validDrinkPrice = parseFloat(item.drinkPrice ?? "0") || 0;
      const validDiscount = item.discount || 0;
      const validQuantity = item.quantity || 1;

      const discountedPrice = validPrice - validPrice * validDiscount;
      const itemTotal = (discountedPrice + validDrinkPrice) * validQuantity;
      return acc + itemTotal;
    }, 0);
  };

  const totalConDescuento = calcularTotalConDescuento();
  const shippingCost = 20; // Costo de envío

  useEffect(() => {
    const totalAmount = (totalConDescuento + shippingCost).toFixed(2);
    localStorage.setItem("totalAmount", totalAmount);
  }, [totalConDescuento]);

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
                    placeholder="Correo"
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
                <h2 className="text-2xl font-extrabold text-gray-800 my-5">
                  Método de Pago
                </h2>
                <PayPalButton />
              </div>
            </form>
          </div>

          {/* Mis pedidos */}
          <div className="bg-gray-100 lg:h-auto lg:sticky lg:top-0 lg:overflow-y-auto lg:col-span-1 md:col-span-2">
            <div className="relative">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 className="text-2xl font-extrabold text-[#333]">
                  Mis Pedidos
                </h2>
                <div className="space-y-6 mt-10">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid sm:grid-cols-2 items-start gap-6"
                    >
                      <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                        <img
                          src={item.imgUrl}
                          className="w-40 h-40 rounded-xl"
                          alt={item.name}
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <h3 className="text-base text-[#333] font-bold">
                          {item.name}
                        </h3>
                        <ul className="text-xs text-[#333] space-y-2 mt-2">
                          <li className="flex flex-wrap gap-4">
                            Tamaño <span className="ml-auto">{item.size}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Cantidad{" "}
                            <span className="ml-auto">
                              {item.quantity || 1}
                            </span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Producto{" "}
                            <span className="ml-auto">
                              ${item.price.toFixed(2)}
                            </span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Bebida{" "}
                            <span className="ml-auto">
                              ${parseFloat(item.drinkPrice || "0").toFixed(2)}
                            </span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Descuento{" "}
                            <span className="ml-auto">
                              -$
                              {calculateDiscountAmount(
                                item.price,
                                item.discount
                              ).toFixed(2)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-200 p-4">
                <h4 className="text-base text-[#333] font-bold">
                  Envío: ${shippingCost.toFixed(2)}
                </h4>
              </div>
              <div className="bg-gray-200 p-4 mt-2">
                <h4 className="text-base text-[#333] font-bold">
                  Total: ${(totalConDescuento + shippingCost).toFixed(2)}
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
