"use client";

import { useEffect, useState } from "react";
import { IOrderList } from "@/interfaces/IOrder";
import { getOrdersByID } from "@/helpers/orders.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { postRating } from "@/helpers/Reseñas.helper";

const Rating: React.FC = () => {
  const [order, setOrder] = useState<IOrderList | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true); // Estado para deshabilitar el botón
  const router = useRouter();

  const handleRating = (rate: number) => {
    setRating(rate);
    setSelectedStars(rate);
    checkEnableButton(rate, comment); // Verifica si se puede habilitar el botón
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;
    setComment(newComment);
    checkEnableButton(rating, newComment); // Verifica si se puede habilitar el botón
  };

  const checkEnableButton = (stars: number | null, comment: string) => {
    setIsButtonDisabled(!(stars !== null && comment.trim() !== ""));
  };

  const handleSendReview = async () => {
    if (selectedStars !== null && order) {
      try {
        const userSession = JSON.parse(
          localStorage.getItem("userSession") || "{}"
        );
        const userId = userSession?.userData?.data?.userid || "";

        await postRating(selectedStars, comment, order.id, userId);
        Swal.fire({
          title: "Gracias por su reseña!",
          text: "Tu reseña ha sido enviada con éxito.",
          icon: "success",
        }).then(() => {
          localStorage.removeItem("Order");
          router.push("/home");
        });
      } catch (error) {
        console.error("Error sending review:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    const storedOrderId = localStorage.getItem("Order");

    if (!storedOrderId) {
      // Si no existe el localStorage "Order", redirecciona a la página de inicio
      router.push("/home");
      return; // Detiene la ejecución del useEffect
    }

    const parsedOrder = JSON.parse(storedOrderId);
    console.log(parsedOrder);

    getOrdersByID(parsedOrder.id)
      .then((data) => setOrder(data))
      .catch((error) => console.error("Error fetching order:", error));
  }, []);

  return (
    <div className="mx-5 text-center my-10">
      <h1 className="text-2xl font-bold mb-4">Reseñas</h1>
      {order && (
        <div className="p-4  border-orange-500 border-2 rounded-lg mb-4 mx-5 flex flex-col items-center">
          <div>
            {/* <h3 className="text-lg font-bold mb-2">Order ID: {order.id}</h3> */}
            {order.orderDetails.orderDetailsProducts.map((product) => (
              <div
                key={product.products.name}
                className="flex p-3 justify-around mb-4 w-full"
              >
                <div className="flex items-center">
                  <img
                    src={product.products.imgUrl}
                    alt={product.products.name}
                    className="w-20 h-20 mr-4 rounded-xl"
                  />
                  <div>
                    <h2 className="text-lg font-bold">
                      {product.products.name}
                    </h2>
                    <p className="font-bold">${product.products.price}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <textarea
                className="mb-2 p-2 border rounded w-full"
                placeholder="Deja tu comentario"
                value={comment}
                onChange={handleCommentChange}
                required
              />
              <div className="mx-5 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-2xl ${
                      star <= (rating || 0)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleSendReview}
        className={`bg-orange-500 text-white px-4 py-2 rounded-md mt-4 ${
          isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={isButtonDisabled}
      >
        Enviar reseña
      </button>
    </div>
  );
};

export default Rating;
