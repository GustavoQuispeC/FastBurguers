"use client";

import { IProductCart } from "@/interfaces/IProduct";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useState<IProductCart[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const initializedCartItems = cartItems.map((item: IProductCart) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCart(initializedCartItems);
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
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const calcularCompra = () => {
    let subtotal = 0;
    let descuento = 0;
    let totalWithDrink = 0; // Total incluyendo el precio de la bebida

    cart.forEach((item: any) => {
      subtotal += item.quantity * item.price;
      totalWithDrink +=
        item.quantity * (item.price + parseFloat(item.drinkPrice));
     
    });

    const total = totalWithDrink - totalWithDrink * descuento; // Aplicar descuento al total con la bebida
    return { subtotal, descuento, total };
  };

  const { subtotal, descuento, total } = calcularCompra();

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
        localStorage.setItem("cart", JSON.stringify(updatedCart));
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
                    - {item.name} + {item.drink} -(${item.price} + ${item.drinkPrice} )*{item.quantity}
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
                        ${(((item.price * item.quantity)*item.discount) + parseFloat(item.drinkPrice)).toFixed(2) }
                      </h4>
                      <h4 className="text-gray-500 line-through">
                        $
                        {(
                          item.price +
                          parseFloat(item.drinkPrice) * item.quantity
                        ).toFixed(2)}
                      </h4>
                    </div>
                  ) : (
                    <h4 className="text-lg font-bold text-gray-800">
                      ${total.toFixed(2)}
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
              <span className="ml-auto font-bold">${total.toFixed(2)}</span>
            </li>

            <li className="flex flex-wrap gap-4 text-sm">
              Descuento{" "}
              <span className="ml-auto font-bold">
                -{(descuento * 100).toFixed(0)}%
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Envío <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span className="ml-auto">${total.toFixed(2)}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
          <Link href="/checkout">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-900 hover:bg-gray-700 text-orange-400 rounded-md"
            >
            Ir a pagar
            </button>
            </Link>

            <button
              type="button"
              onClick={() => router.push("/home")}
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 hover:text-white hover:bg-orange-500 border border-gray-300 rounded-md"
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
