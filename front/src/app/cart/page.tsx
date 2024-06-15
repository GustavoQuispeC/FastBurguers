"use client";

import { IProductCart } from "@/interfaces/IProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useState<IProductCart[]>([]);
  const [userSession, setUserSession] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
      const userId = userSession?.userData?.data?.userid;

      if (userId) {
        try {
          const response = await fetch(`http://localhost:3001/storage/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userSession?.userData?.token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            const productRequests = data.map((item: any) =>
              fetch(`http://localhost:3001/products/${item.idProduct}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userSession?.userData?.token}`,
                },
              }).then((res) => res.json().then((productData) => ({
                ...productData,
                quantity: item.quantity,
              })))
            );

            const products = await Promise.all(productRequests);
            setCart(products);
          } else {
            throw new Error("Error fetching cart items");
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }

      const userSessionExists = localStorage.getItem("userSession");
      setUserSession(!!userSessionExists);
    };

    fetchCartItems();
  }, []);

  const handleIncrease = (id: string) => {
    const newCart: IProductCart[] = cart.map((item: IProductCart) => {
      if (item.id.toString() === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(newCart);
    updateCartInServer(newCart);
  };

  const handleDecrease = (id: string) => {
    const newCart: IProductCart[] = cart.map((item: IProductCart) => {
      if (item.id.toString() === id) {
        return { ...item, quantity: Math.max(item.quantity - 1, 1) };
      }
      return item;
    });
    setCart(newCart);
    updateCartInServer(newCart);
  };

  const updateCartInServer = async (updatedCart: IProductCart[]) => {
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const userId = userSession?.userData?.data?.userId;

    if (userId) {
      try {
        const response = await fetch("http://localhost:3001/storage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession?.userData?.token}`,
          },
          body: JSON.stringify({
            userId,
            products: updatedCart.map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Error updating cart in server");
        }
      } catch (error) {
        console.error("Error updating cart in server:", error);
      }
    }
  };

  const calcularSubtotal = () => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  };

  const calcularBebida = () => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity * (parseFloat(item.drinkPrice || "0") || 0);
    }, 0);
  };

  const calcularDescuento = () => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity * (item.price * (item.discount || 0));
    }, 0);
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const bebida = calcularBebida();
    const descuento = calcularDescuento();

    return subtotal - descuento + bebida;
  };

  const subtotal = calcularSubtotal();
  const bebida = calcularBebida();
  const descuento = calcularDescuento();
  const total = calcularTotal();

  const removeFromCart = (index: any) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto del carrito de compras",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        updateCartInServer(updatedCart);
        Swal.fire(
          "Eliminado",
          "El producto ha sido eliminado del carrito",
          "success"
        );
      }
    });
  };

  return (
    <div className="font-sans max-w-4xl mx-auto py-4 h-screen">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-900">Carrito</h2>
          <hr className="border-white my-4" />

          <div className="space-y-4">
            {cart.map((item: any, index: number) => (
              <div
                key={item.id}
                className="grid sm:grid-cols-3 items-center gap-4"
              >
                <div className="sm:col-span-2 flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
                    <img
                      src={item.imgUrl}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">
                      {item.name}
                      {item.drink ? ` + ${item.drink}` : ""}
                    </h3>
                    <h6
                      onClick={() => removeFromCart(index)}
                      className="text-xs text-red-500 cursor-pointer mt-0.5"
                    >
                      Eliminar
                    </h6>

                    <div className="flex gap-4 mt-4">
                      <div>
                        <button
                          className="text-white bg-gray-900 w-6 h-6 font-bold justify-center items-center rounded-md mx-2"
                          onClick={() => handleDecrease(item.id)}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="text-white bg-gray-900 w-6 h-6 font-bold justify-center items-center rounded-md mx-2"
                          onClick={() => handleIncrease(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  {item.discount && item.discount > 0 ? (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">
                        $
                        {(
                          item.price * item.quantity * (1 - item.discount) +
                          (parseFloat(item.drinkPrice) || 0)
                        ).toFixed(2)}
                      </h4>
                      <h4 className="text-gray-500 line-through">
                        $
                        {(
                          (item.price + (parseFloat(item.drinkPrice) || 0)) *
                          item.quantity
                        ).toFixed(2)}
                      </h4>
                    </div>
                  ) : (
                    <h4 className="text-lg font-bold text-gray-800">
                      $
                      {(
                        (item.price + (parseFloat(item.drinkPrice) || 0)) *
                        item.quantity
                      ).toFixed(2)}
                    </h4>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
          <h2 className="text-base font-bold text-gray-800">
            Resúmen de compra
          </h2>

          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-bold">${subtotal.toFixed(2)}</span>
            </li>
            {bebida > 0 && (
              <li className="flex flex-wrap gap-4 text-sm">
                Bebida{" "}
                <span className="ml-auto font-bold">${bebida.toFixed(2)}</span>
              </li>
            )}
            {descuento > 0 && (
              <li className="flex flex-wrap gap-4 text-sm">
                Descuento{" "}
                <span className="ml-auto font-bold">
                  -${descuento.toFixed(2)}
                </span>
              </li>
            )}
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span className="ml-auto">${total.toFixed(2)}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <Link href="/checkout">
              <button
                type="button"
                className={`text-sm px-4 py-2.5 w-full font-semibold tracking-wide rounded-md ${
                  userSession
                    ? "bg-gray-900 hover:bg-gray-700 text-orange-400"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
                disabled={!userSession}
                title={
                  !userSession
                    ? "Necesita estar logueado para continuar con el pago"
                    : ""
                }
              >
                Ir a pagar
              </button>
            </Link>

            <Link href="/home">
              <button
                type="button"
                onClick={() => router.push("/home")}
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 hover:text-white hover:bg-orange-500 border border-gray-300 rounded-md"
              >
                Continuar comprando
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;