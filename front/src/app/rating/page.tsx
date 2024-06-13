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
  const router = useRouter();

  const handleRating = (rate: number) => {
    setRating(rate);
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

    if (storedOrderId) {
      const parsedOrder = JSON.parse(storedOrderId);

      getOrdersByID(parsedOrder[0].id)
        .then((data) => setOrder(data))
        .catch((error) => console.error("Error fetching order:", error));
    }
  }, []);

  return (
    <div className="mx-5 text-center my-10">
      <h1 className="text-2xl font-bold mb-4">Reseñas</h1>
      {order && (
        <div className="p-4 border border-orange-300 rounded-lg mb-4 mx-5 flex flex-col items-center">
          <div>
            <h3 className="text-lg font-bold mb-2">Order ID: {order.id}</h3>
            {order.orderDetails.products.map((product) => (
              <div
                key={product.id}
                className="flex p-3 justify-around mb-4 w-full"
              >
                <div className="flex items-center">
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="w-20 h-20 mr-4 rounded-xl"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="font-bold">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <textarea
                className="mb-2 p-2 border rounded w-full"
                placeholder="Deja tu comentario"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
                    onClick={() => {
                      handleRating(star);
                      setSelectedStars(star);
                    }}
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
        className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Enviar reseña
      </button>
    </div>
  );
};

export default Rating;
