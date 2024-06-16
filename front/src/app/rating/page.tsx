"use client";

import { useEffect, useState } from "react";
import { IOrderList } from "@/interfaces/IOrder";
import { getOrdersByID } from "@/helpers/orders.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { postRating, postProductRating } from "@/helpers/Reseñas.helper";

const Rating: React.FC = () => {
  const [order, setOrder] = useState<IOrderList | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [productRatings, setProductRatings] = useState<
    {
      productId: string;
      rating: number;
      comment: string;
      leaveComment: boolean;
    }[]
  >([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const router = useRouter();

  const handleRating = (rate: number, productId?: string) => {
    if (productId) {
      const updatedProductRatings = productRatings.map((productRating) =>
        productRating.productId === productId
          ? { ...productRating, rating: rate }
          : productRating
      );
      setProductRatings(updatedProductRatings);
    } else {
      setRating(rate);
      setSelectedStars(rate);
      checkEnableButton(rate, comment);
    }
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    productId?: string
  ) => {
    const newComment = e.target.value;
    if (productId) {
      const updatedProductRatings = productRatings.map((productRating) =>
        productRating.productId === productId
          ? { ...productRating, comment: newComment }
          : productRating
      );
      setProductRatings(updatedProductRatings);
    } else {
      setComment(newComment);
      checkEnableButton(rating, newComment);
    }
  };

  const handleLeaveCommentChange = (productId: string) => {
    const updatedProductRatings = productRatings.map((productRating) =>
      productRating.productId === productId
        ? { ...productRating, leaveComment: !productRating.leaveComment }
        : productRating
    );
    setProductRatings(updatedProductRatings);
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

        if (order) {
          await postRating(selectedStars, comment, order.id, userId);
        }

        if (productRatings.length > 0) {
          await postProductRating(userId, productRatings);
        }

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
      router.push("/home");
      return;
    }

    const parsedOrder = JSON.parse(storedOrderId);
    getOrdersByID(parsedOrder.id)
      .then((data) => {
        setOrder(data);
        const initialProductRatings =
          data.orderDetails.orderDetailsProducts.map((product: any) => ({
            productId: product.products.id,
            rating: 0,
            comment: "",
            leaveComment: false,
          }));
        setProductRatings(initialProductRatings);
      })
      .catch((error) => console.error("Error fetching order:", error));
  }, []);

  return (
    <div className="mx-5 text-center my-10">
      <h1 className="text-2xl font-bold mb-4">Reseñas</h1>
      {order && (
        <div className="p-4 rounded-lg mb-4 mx-5 flex flex-col items-center">
          <fieldset className="border-2 border-orange-500 p-4 rounded-lg mb-4 w-full ">
            <legend className="text-xl font-bold">
              Reseña nuestros productos
            </legend>
            {order.orderDetails.orderDetailsProducts.map((product) => (
              <div
                key={product.products.id}
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
                <div className="flex flex-col items-center">
                  <label className="flex items-center mb-2">
                    ¿Desea dejar su opinión?
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={
                        productRatings.find(
                          (productRating) =>
                            productRating.productId === product.products.id
                        )?.leaveComment || false
                      }
                      onChange={() =>
                        handleLeaveCommentChange(product.products.id)
                      }
                    />
                  </label>
                  {productRatings.find(
                    (productRating) =>
                      productRating.productId === product.products.id
                  )?.leaveComment && (
                    <textarea
                      className="mb-2 p-2 border rounded w-full"
                      placeholder="Deja tu comentario"
                      value={
                        productRatings.find(
                          (productRating) =>
                            productRating.productId === product.products.id
                        )?.comment || ""
                      }
                      onChange={(e) =>
                        handleCommentChange(e, product.products.id)
                      }
                      required
                    />
                  )}
                  <div className="mx-5 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`text-2xl ${
                          star <=
                          (productRatings.find(
                            (productRating) =>
                              productRating.productId === product.products.id
                          )?.rating || 0)
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => handleRating(star, product.products.id)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </fieldset>
          <fieldset className="border-2 border-orange-500 p-4 rounded-lg mb-4 w-full">
            <legend className="text-xl font-bold">Reseña su Orden</legend>
            <textarea
              className="mb-2 p-2 border rounded w-full"
              placeholder="Deja tu comentario general"
              value={comment}
              onChange={(e) => handleCommentChange(e)}
              required
            />
            <div className="mx-5 flex items-center justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-2xl ${
                    star <= (rating || 0) ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </fieldset>
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
