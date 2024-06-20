"use client";
import Swal from "sweetalert2";
import { IProduct } from "@/interfaces/IProduct";
import { useState, useEffect } from "react";
import { getProductsById } from "@/helpers/products.helper";
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import { LuSandwich } from "react-icons/lu";
import Link from "next/link";
import { postStorageBack } from "@/helpers/StorageBack.helper";

const DetalleProduct = ({ params }: { params: { productId: number } }) => {
  const router = useRouter();
  const [producto, setProducto] = useState<IProduct>();
  const [tamaño, setTamaño] = useState("Mediana");
  const [precioFinal, setPrecioFinal] = useState<number | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductsById(params.productId);
        setProducto(product);
        setPrecioFinal(product.price); // Set initial price
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.productId]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value;
    setTamaño(newSize);
    if (producto) {
      let newPrice = producto.price;
      if (newSize === "Grande") {
        newPrice = producto.price * 1.1; // Increase price by 10%
      } else if (newSize === "Clasica") {
        newPrice = producto.price * 0.9; // Decrease price by 10%
      }
      setPrecioFinal(newPrice);
    }
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price - price * discount).toFixed(2);
  };

  const getPrecioConDescuento = (): string | null => {
    if (producto && producto.discount && producto.discount > 0) {
      const precioDescuento = calculateDiscountedPrice(
        precioFinal || producto.price,
        producto.discount
      );
      return precioDescuento;
    }
    return null;
  };

  const handleBuyClickAgregar = async () => {
    const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = currentCart.find(
      (item: any) => item.id === params.productId
    );

    if (existingProduct) {
      Swal.fire({
        title: "¡Producto ya en el carrito!",
        text: "¿Seleccionar?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Ir al carrito",
        cancelButtonText: "Seguir comprando",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/cart");
        }
      });
    } else {
      const newProduct: any = {
        ...producto,
        size: tamaño,
        price: precioFinal, // Include the final price
      };

      currentCart.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(currentCart));

      // No realizar la solicitud al helper si el usuario no está autenticado
      if (userSession && userSession.userData) {
        const userId = userSession.userData.data.userid;
        const token = userSession.userData.token;

        try {
          await postStorageBack(
            token,
            userId,
            params.productId.toString(),
            1,
            tamaño
          );
          Swal.fire({
            title: "¡Éxito!",
            text: "Pedido enviado al carrito con éxito.",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error",
            text: `Error agregando producto al carrito: ${error.message}`,
            icon: "error",
          });
        }
      }

      router.push("/home");
    }
  };

  const renderStars = (averageRating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i}>{i < averageRating ? "★" : "☆"}</span>);
    }
    return stars;
  };

  return (
    <div className="font-sans my-10 dark:bg-gray-700">
      <div className="p-4 max-w-6xl max-md:max-w-xl mx-auto">
        <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-5/6 lg:sticky top-0 flex justify-center items-center">
            <img
              src={producto?.imgUrl}
              alt={producto?.name}
              className="w-3/4 h-3/4 rounded-xl object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl mt-6 max-sm:text-2xl font-bold text-orange-500">
              {producto?.name}
            </h2>
            {producto?.averageRating &&
              parseInt(producto.averageRating) > 0 && (
                <div className="text-yellow-500 mt-2 text-2xl">
                  {renderStars(Number(producto.averageRating))}
                </div>
              )}
            <div className="flex flex-wrap gap-4 mt-8">
              {producto?.discount && producto.discount > 0 ? (
                <>
                  <h3 className="text-gray-800 dark:text-white text-4xl max-sm:text-3xl font-bold">
                    ${getPrecioConDescuento()}
                  </h3>
                  <h3 className="text-gray-400 text-xl text-center mt-2  ">
                    <s>${(precioFinal || producto.price).toFixed(2)}</s>
                  </h3>
                </>
              ) : (
                <h3 className="text-gray-800 text-4xl max-sm:text-3xl font-bold dark:text-gray-300">
                  ${precioFinal?.toFixed(2) || producto?.price.toFixed(2)}
                </h3>
              )}
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-300">
                ELIGE EL TAMAÑO
              </h3>
              <div className="flex flex-wrap gap-4 mt-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value="Clasica"
                    className="hidden"
                    onChange={handleSizeChange}
                    checked={tamaño === "Clasica"}
                  />
                  <div
                    className={`w-16 h-11 border-2 font-bold text-xs text-gray-800  rounded-lg flex items-center justify-center shrink-0 ${
                      tamaño === "Clasica"
                        ? "bg-orange-500 border-gray-800"
                        : "hover:bg-orange-400 hover:text-white"
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

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleBuyClickAgregar}
                className="flex items-center justify-center px-8 py-4 bg-gray-900 hover:bg-gray-700 dark:bg-gray-200 text-orange-500 border border-gray-800 text-base rounded hover:dark:bg-gray-400"
              >
                <FaCartPlus size={20} />
                &nbsp; Agregar
              </button>

              <Link
                href="/home"
                type="button"
                className="flex items-center justify-center px-8 py-4 bg-transparent hover:bg-orange-500 hover:text-white text-gray-800 border border-gray-800 text-base rounded dark:text-white"
              >
                <LuSandwich size={20} />
                &nbsp; Ir a la tienda
              </Link>
            </div>

            <ul className="grid grid-cols-2 mt-10">
              <li className="text-gray-800 dark:text-gray-200 font-semibold text-base text-center py-3 border-b-2 px-4 cursor-pointer">
                Descripción
              </li>
            </ul>

            <ul className="space-y-3 list-disc pl-4 text-sm text-gray-800 dark:text-white mt-8">
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
