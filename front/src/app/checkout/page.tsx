"use client";

import { useEffect, useState } from "react";
import PayPalButton from "@/components/PayPalButton/PayPalButton";
import { TextInput } from "flowbite-react";
import { IProductCart } from "@/interfaces/IProduct";
import { createOrder } from "@/helpers/orders.helper";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [cart, setCart] = useState<IProductCart[]>([]);
  const [userToken, setUserToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]") as IProductCart[];
    setCart(cartData);

    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    setUserToken(userSession?.userData?.token || "");
  }, []);

  const calculateTotal = (price: number, drinkPrice: number, discount: number, quantity: number) => {
    const discountedPrice = price - price * discount;
    return (discountedPrice + drinkPrice) * quantity;
  };

  const totalAmount = cart.reduce((total, item) => {
    const drinkPrice = parseFloat(item.drinkPrice || "0");
    return total + calculateTotal(item.price, drinkPrice, item.discount, item.quantity || 1);
  }, 0);

  const handleSubmit = async () => {
    try {
      const order = {
        userId: userToken,
        products: cart.map(item => ({ id: String(item.id) })), 
      };

      const response = await createOrder(order, userToken);
      alert("Order created successfully");
      console.log('Order created successfully:', response);
      router.push("/home");
    } catch (error) {
      console.error('Error creating order:', error);
      alert("Error creating order");
    }
  };

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
                <h2 className="text-2xl font-extrabold text-[#333]">Datos de envío</h2>
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
                <h2 className="text-2xl font-extrabold text-gray-800">Método de Pago</h2>
                <PayPalButton />
              </div>

              <div className="bg-gray-100 p-6 rounded-md">
                <h2 className="text-2xl font-extrabold text-gray-900">Resumen del pedido</h2>

                <ul className="text-gray-800 mt-8 space-y-4">
                  <li className="flex flex-wrap gap-4 text-sm">
                    SubTotal{" "}
                    <span className="ml-auto font-bold">${totalAmount.toFixed(2)}</span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Envio <span className="ml-auto font-bold">$200.00</span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                    Total a Pagar{" "}
                    <span className="ml-auto">${(totalAmount + 200).toFixed(2)}</span>
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
                  <a href="#" className="text-orange-400 font-semibold hover:underline ml-1">
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
                  onClick={handleSubmit}
                >
                  Confirmar Pago
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0">
            <div className="relative h-full">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 className="text-2xl font-extrabold text-[#333]">Mis Pedidos</h2>
                <div className="space-y-6 mt-10">
                  {cart.map((item) => (
                    <div key={item.id} className="grid sm:grid-cols-2 items-start gap-6">
                      <div className="max-w-[190px] px-4 py-6 shrink-0 bg-gray-200 rounded-md">
                        <img src={item.imgUrl} className="w-40 h-40 rounded-xl" alt={item.name} />
                      </div>
                      <div>
                        <h3 className="text-base text-[#333] font-bold">{item.name}</h3>
                        <ul className="text-xs text-[#333] space-y-2 mt-2">
                          <li className="flex flex-wrap gap-4">
                            Tamaño <span className="ml-auto">{item.size}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Cantidad <span className="ml-auto">{item.quantity || 1}</span>
                          </li>
                          <li className="flex flex-wrap gap-4">
                            Total a pagar{" "}
                            <span className="ml-auto">
                              ${calculateTotal(item.price, parseFloat(item.drinkPrice || "0"), item.discount, item.quantity || 1).toFixed(2)}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute left-0 bottom-0 bg-gray-200 w-full p-4">
                <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
                  Total <span className="ml-auto">${totalAmount.toFixed(2)}</span>
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