"use client";

import { useEffect, useState } from "react";
import PayPalButton from "@/components/PayPalButton/PayPalButton";
import { TextInput } from "flowbite-react";
import { IProductCart } from "@/interfaces/IProduct";
import { useRouter } from "next/navigation";
import PlaceSearch from "@/components/Maps/PlaceSearch";

const Checkout = () => {
  const router = useRouter();
  const [cart, setCart] = useState<IProductCart[]>([]);
  const [userSessionExists, setUserSessionExists] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);
  const [allFieldsCompleted, setAllFieldsCompleted] = useState(false);

  useEffect(() => {
    const cartData = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as IProductCart[];
    setCart(cartData);
  }, []);

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (!userSession) {
      router.push("/cart");
    } else {
      const userData = JSON.parse(userSession);
      setUser(userData.userData.data);
      setUserSessionExists(true);
    }
  }, []);

  useEffect(() => {
    const allFieldsFilled = Boolean(
      user.name && user.email && location && address
    );
    setAllFieldsCompleted(allFieldsFilled);
  }, [user, location, address]);

  useEffect(() => {
    if (location && address) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({ location, address })
      );
    }
  }, [location, address]);

  const calculateDiscountAmount = (price: number, discount: number) => {
    const validPrice = price || 0;
    const validDiscount = discount || 0;
    return validPrice * validDiscount;
  };

  const calcularTotalConDescuento = () => {
    return cart.reduce((acc, item) => {
      const validPrice = item.price || 0;
      const validDiscount = item.discount || 0;
      const validQuantity = item.quantity || 1;

      const discountedPrice = validPrice - validPrice * validDiscount;
      const itemTotal = discountedPrice * validQuantity;
      return acc + itemTotal;
    }, 0);
  };

  const totalConDescuento = calcularTotalConDescuento();
  const shippingCost = 0; // Costo de envío

  useEffect(() => {
    const totalAmount = (totalConDescuento + shippingCost).toFixed(2);
    localStorage.setItem("totalAmount", totalAmount);
  }, [totalConDescuento]);

  if (!userSessionExists) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePlaceSelected = (
    location: { lat: number; lng: number },
    address: string
  ) => {
    setLocation(location);
    setAddress(address);
    localStorage.setItem("userLocation", JSON.stringify({ location, address }));
  };

  return (
    <div className="font-[sans-serif] bg-white pt-6 dark:bg-gray-600">
      <div className="max-lg:max-w-xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
            <form className="lg:mt-12">
              <div>
                <h2 className="text-2xl font-extrabold text-[#333] dark:text-orange-400">
                  Datos de envío
                </h2>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <TextInput
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className=" text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    onChange={handleChange}
                    value={user.name}
                    required
                  />
                  <TextInput
                    type="email"
                    name="email"
                    placeholder="Correo"
                    className=" text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none"
                    onChange={handleChange}
                    value={user.email}
                    required
                  />

                  <div>
                    <PlaceSearch onPlaceSelected={handlePlaceSelected} />
                  </div>
                </div>
              </div>

              <div className="mt-12 pb-6">
                <h2 className="text-2xl font-extrabold text-gray-800 my-5 dark:text-orange-400">
                  Método de Pago
                </h2>
                <PayPalButton allFieldsCompleted={allFieldsCompleted} />
              </div>
            </form>
          </div>

          {/* Mis pedidos */}
          <div className="bg-gray-100 dark:bg-gray-700 lg:h-auto lg:sticky lg:top-0 lg:overflow-y-auto lg:col-span-1 md:col-span-2 rounded-xl">
            <div className="relative">
              <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] max-lg:mb-8">
                <h2 className="text-2xl font-extrabold text-[#333] dark:text-orange-400">
                  Mis Pedidos
                </h2>
                <div className="space-y-6 mt-10">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid sm:grid-cols-2 items-start gap-6"
                    >
                      <div className="max-w-[190px] shrink-0 rounded-md">
                        <img
                          src={item.imgUrl}
                          className="w-40 h-40 rounded-xl"
                          alt={item.name}
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <h3 className="text-base text-[#333] font-bold dark:text-white">
                          {item.name}
                        </h3>
                        <ul className="text-xs text-[#333] space-y-2 mt-2">
                          <li className="flex flex-wrap gap-4 dark:text-orange-400">
                            Tamaño{" "}
                            <span className="ml-auto dark:text-white">
                              {item.size}
                            </span>
                          </li>
                          <li className="flex flex-wrap gap-4 dark:text-orange-400">
                            Cantidad{" "}
                            <span className="ml-auto dark:text-white">
                              {item.quantity || 1}
                            </span>
                          </li>
                          <li className="flex flex-wrap gap-4 dark:text-orange-400">
                            Producto{" "}
                            <span className="ml-auto dark:text-white">
                              ${item.price.toFixed(2)}
                            </span>
                          </li>

                          {calculateDiscountAmount(item.price, item.discount) >
                            0 && (
                            <li className="flex flex-wrap gap-4 dark:text-orange-400">
                              Descuento{" "}
                              <span className="ml-auto dark:text-white">
                                -$
                                {calculateDiscountAmount(
                                  item.price,
                                  item.discount
                                ).toFixed(2)}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:absolute lg:bottom-0 w-full">
                <div className="bg-gray-200 lg:p-4 p-2">
                  <h4 className="text-base text-[#333] font-bold">
                    Envío: ${shippingCost.toFixed(2)}
                  </h4>
                </div>
                <div className="bg-gray-200 lg:p-4 p-2 lg:mt-0 mt-2">
                  <h4 className="text-base text-[#333] font-bold">
                    Total: ${(totalConDescuento + shippingCost).toFixed(2)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
