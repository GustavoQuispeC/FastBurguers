"use client";
import Swal from "sweetalert2";
import { IProduct } from "@/interfaces/IProduct";
import { useState, useEffect } from "react";
import { getProductsById } from "@/helpers/products.helper";
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import { LuSandwich } from "react-icons/lu";
import Link from "next/link";

const DetalleProduct = ({ params }: { params: { productId: number } }) => {
  const router = useRouter();
  const [producto, setProducto] = useState<IProduct>();
  const [tamaño, setTamaño] = useState("Mediana");
  const [bebida, setBebida] = useState("Coca Cola");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductsById(params.productId);
        setProducto(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.productId]);
  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price - price * discount).toFixed(2);
  };

  const getPrecioConDescuento = (): string | null => {
    if (producto && producto.discount && producto.discount > 0) {
      const precioDescuento = calculateDiscountedPrice(
        producto.price,
        producto.discount
      );
      return precioDescuento;
    }
    return null;
  };

  //! seteamos el tamaño del producto
  const handleSizeChange = (e: any) => {
    setTamaño(e.target.value);
  };
  //! seteamos la bebida
  const handleDrinkChange = (e: any) => {
    setBebida(e.target.value);
  };
  const handleBuyClickAgregar = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = currentCart.find(
      (item: any) => item.id === params.productId
    );

    if (existingProduct) {
      Swal.fire({
        title: "¡Producto ya en el carrito!",
        text: "¿Seleccione?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Ir al carrito",
        cancelButtonText: "Seguir comprando",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar al usuario al carrito
          router.push("/cart");
        }
      });
    } else {
      // Agregar el producto al carrito si no existe
      currentCart.push({ ...producto, size: tamaño, drink: bebida });
      localStorage.setItem("cart", JSON.stringify(currentCart));
      router.push("/home");
      console.log(producto);
    }
  };

  return (
    <div className="font-sans my-10 h-screen dark:bg-gray-700">
      <div className="p-4 max-w-6xl max-md:max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-5/6 lg:sticky top-0 flex justify-center items-center  ">
            <img
              src={producto?.imgUrl}
              alt={producto?.name}
              className="w-3/4 h-3/4 rounded-xl object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl max-sm:text-2xl font-bold text-orange-500">
              {producto?.name}
            </h2>
            <div className="flex flex-wrap gap-4 mt-8">
              {producto?.discount && producto.discount > 0 ? (
                <>
                  <h3 className="text-gray-800 text-4xl max-sm:text-3xl font-bold">
                    ${getPrecioConDescuento()}
                  </h3>
                  <h3 className="text-gray-400 text-xl text-center mt-2">
                    <s>${producto.price.toFixed(2)}</s>
                  </h3>
                </>
              ) : (
                <h3 className="text-gray-800 text-4xl max-sm:text-3xl font-bold">
                  ${producto?.price.toFixed(2)}
                </h3>
              )}
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-800">
                ELIGE EL TAMAÑO
              </h3>
              <div className="flex flex-wrap gap-4 mt-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value="Clásica"
                    className="hidden"
                    onChange={handleSizeChange}
                    checked={tamaño === "Clásica"}
                  />
                  <div
                    className={`w-16 h-11 border-2 font-bold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0 ${
                      tamaño === "Clásica"
                        ? "bg-orange-400 border-gray-800"
                        : "hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    Clásica
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value="Mediana"
                    className="hidden"
                    onChange={handleSizeChange}
                    checked={tamaño === "Mediana"}
                  />
                  <div
                    className={`w-16 h-11 border-2 font-bold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0 ${
                      tamaño === "Mediana"
                        ? "bg-orange-400 border-gray-800"
                        : "hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    Mediana
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value="Grande"
                    className="hidden"
                    onChange={handleSizeChange}
                    checked={tamaño === "Grande"}
                  />
                  <div
                    className={`w-16 h-11 border-2 font-bold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0 ${
                      tamaño === "Grande"
                        ? "bg-orange-400 border-gray-800"
                        : "hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    Grande
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-900">AÑADIR BEBIDA</h3>
              <div className="flex flex-wrap gap-4 mt-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="drink"
                    value="Coca Cola"
                    className="hidden"
                    onChange={handleDrinkChange}
                    checked={bebida === "Coca Cola"}
                  />
                  <div
                    className={`w-16 h-11 border-2 font-bold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0 ${
                      bebida === "Coca Cola"
                        ? "bg-orange-400 border-gray-800"
                        : "hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    Coca Cola
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="drink"
                    value="Inka Kola"
                    className="hidden"
                    onChange={handleDrinkChange}
                    checked={bebida === "Inka Kola"}
                  />
                  <div
                    className={`w-16 h-11 border-2 font-bold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0 ${
                      bebida === "Inka Kola"
                        ? "bg-orange-400 border-gray-800"
                        : "hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    Inka Kola
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="drink"
                    value="Pepsi"
                    className="hidden"
                    onChange={handleDrinkChange}
                    checked={bebida === "Pepsi"}
                  />
                  <div
                    className={`w-16 h-11 border-2 font-bold text-xs text-gray-800 rounded-lg flex items-center justify-center shrink-0 ${
                      bebida === "Pepsi"
                        ? "bg-orange-400 border-gray-800"
                        : "hover:bg-orange-500 hover:text-white"
                    }`}
                  >
                    Pepsi
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleBuyClickAgregar}
                className="flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-700 text-orange-500 border border-gray-800 text-base rounded"
              >
                <FaCartPlus size={20} />
                &nbsp; Agregar
              </button>

              <Link
                href="/home"
                type="button"
                className="flex items-center justify-center px-8 py-4 bg-transparent hover:bg-orange-500 hover:text-white text-gray-800 border border-gray-800 text-base rounded"
              >
                <LuSandwich size={20} />
                &nbsp; Ir a la tienda
              </Link>
            </div>

            <ul className="grid grid-cols-2 mt-10">
              <li className="text-gray-800 font-semibold text-base text-center py-3 border-b-2 px-4 cursor-pointer">
                Descripción
              </li>
            </ul>

            <ul className="space-y-3 list-disc pl-4 text-sm text-gray-800 mt-8">
              <li>{producto?.description}</li>

              <li>¡Pídela ya con delivery!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProduct;
