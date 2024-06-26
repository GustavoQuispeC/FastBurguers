"use client";

import {
  deleteStorageBack,
  getStorageBack,
  postStorageBack,
} from "@/helpers/StorageBack.helper";
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
    const fetchCart = async () => {
      const userSession = JSON.parse(
        localStorage.getItem("userSession") || "{}"
      );
      const userId = userSession?.userData?.data?.userid;
      const token = userSession?.userData?.token;

      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

      if (cartItems.length === 0) {
        try {
          const fetchedCart = await getStorageBack(token, userId);
          const initializedCartItems = fetchedCart.map(
            (item: IProductCart) => ({
              ...item,
              quantity: item.quantity || 1,
            })
          );
          setCart(initializedCartItems);
          localStorage.setItem("cart", JSON.stringify(initializedCartItems));
        } catch (error) {
          console.error("Error fetching cart from backend:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo recuperar el carrito desde el servidor.",
            icon: "error",
          });
        }
      } else {
        const initializedCartItems = cartItems.map((item: IProductCart) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCart(initializedCartItems);
      }

      const userSessionExists = localStorage.getItem("userSession");
      setUserSession(!!userSessionExists);
    };

    if (typeof window !== "undefined" && window.localStorage) {
      fetchCart();
    }
  }, []);

  const handleIncrease = (id: number) => {
    const newCart: IProductCart[] = cart.map((item: IProductCart) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(newCart);
    actualizarCarritoBackend(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDecrease = (id: number) => {
    const newCart: IProductCart[] = cart.map((item: IProductCart) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(item.quantity - 1, 1) };
      }
      return item;
    });
    setCart(newCart);
    actualizarCarritoBackend(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const calcularSubtotal = () => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
  };

  const calcularDescuento = () => {
    return cart.reduce((acc, item) => {
      return acc + item.quantity * (item.price * (item.discount || 0));
    }, 0);
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const descuento = calcularDescuento();
    return subtotal - descuento;
  };

  const subtotal = calcularSubtotal();
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
        let updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        if (updatedCart.length === 0) {
          eliminarCarritoBackend();
        } else {
          actualizarCarritoBackend(updatedCart);
        }

        Swal.fire(
          "Eliminado",
          "El producto ha sido eliminado del carrito",
          "success"
        );
      }
    });
  };

  const eliminarCarritoBackend = async () => {
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const userId = userSession?.userData?.data?.userid;
    const token = userSession?.userData?.token;

    try {
      await deleteStorageBack(token, userId);
    } catch (error) {
      console.error("Error deleting cart in backend:", error);
      // Swal.fire({
      //   title: "Error",
      //   text: "No se pudo eliminar el carrito en el servidor.",
      //   icon: "error",
      // });
    }
  };

  const actualizarCarritoBackend = async (updatedCart: IProductCart[]) => {
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");
    const userId = userSession?.userData?.data?.userid;
    const token = userSession?.userData?.token;

    try {
      const promises = updatedCart.map((item) => {
        return postStorageBack(
          token,
          userId,
          item.id.toString(),
          item.quantity,
          item.size
        );
      });

      await Promise.all(promises);
    } catch (error) {
      console.error("Error updating cart in backend:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el carrito en el servidor.",
        icon: "error",
      });
    }
  };

  if (cart.length === 0) {
    return (
      <section className="text-gray-600 body-font min-h-screen flex flex-col justify-center items-center">
        <div className="container mx-auto flex px-5 py-24 mt-14 items-center justify-center flex-col ">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="/stop.svg"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Tu carrito está vacío
            </h1>
            <p className="mb-8 leading-relaxed">
              Parece que aún no has agregado nada a tu carrito. ¡Empieza a
              comprar ahora!
            </p>
            <div className="flex justify-center">
              <Link href="/home">
                <button className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg">
                  Empezar a comprar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="font-sans max-w-full mx-auto py-4 min-h-screen flex flex-col dark:bg-gray-600">
      <div className="grid md:grid-cols-3 gap-4 flex-grow">
        <div className="md:col-span-2 bg-white p-4 rounded-md dark:bg-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Carrito
          </h2>
          <hr className="border-white my-4" />

          <div className="space-y-4">
            {cart.map((item: any, index: number) => (
              <div
                key={item.id}
                className="grid sm:grid-cols-3 items-center gap-4"
              >
                <div className="sm:col-span-2 flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md ">
                    <img
                      src={item.imgUrl}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800 dark:text-white">
                      {item.name}
                      {item.size === "Grande" || item.size === "Clasica"
                        ? ` (${item.size})`
                        : ""}
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
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                        $
                        {(
                          item.price *
                          item.quantity *
                          (1 - item.discount)
                        ).toFixed(2)}
                      </h4>
                      <h4 className="text-gray-500 line-through">
                        ${(item.price * item.quantity).toFixed(2)}
                      </h4>
                    </div>
                  ) : (
                    <h4 className="text-lg font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
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
                  userSession && cart.length > 0
                    ? "bg-gray-900 hover:bg-gray-700 text-orange-400"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
                disabled={!userSession || cart.length === 0}
                title={
                  !userSession
                    ? "Necesita estar logueado para continuar con el pago"
                    : cart.length === 0
                    ? "El carrito está vacío"
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