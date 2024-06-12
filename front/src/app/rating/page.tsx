"use client";

import { useEffect, useState } from "react";
import { IOrderList } from "@/interfaces/IOrder";
import Image from "next/image";
import { getOrdersByID } from "@/helpers/orders.helper";

const Rating: React.FC = () => {
  const [order, setOrder] = useState<IOrderList | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSendReview = () => {
    if (selectedStars !== null) {
      console.log("Enviando reseña al backend:", selectedStars);
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
        <div className="p-4 border rounded-lg mb-4 mx-5 flex">
          <div>
            <h3 className="text-lg font-bold mb-2">Order ID: {order.id}</h3>
            {order.orderDetails.products.map((product) => (
              <div key={product.id} className="flex p-3 justify-around">
                <div className="flex items-center">
                  <Image
                    src={product.imgUrl}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="font-bold">${product.price}</p>
                  </div>
                </div>
                <div className="mt-4">
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
            ))}
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
