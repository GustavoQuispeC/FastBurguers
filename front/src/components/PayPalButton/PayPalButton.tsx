import { createOrder } from "@/helpers/orders.helper";
import { IProductCart } from "@/interfaces/IProduct";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

function Message({ content }: any) {
  return <p>{content}</p>;
}

interface PayPalButtonProps {
  allFieldsCompleted: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ allFieldsCompleted }) => {
  const [cart, setCart] = useState<IProductCart[]>([]);
  const [message, setMessage] = useState("");
  const Router = useRouter();

  // Use a ref to store the cart
  const cartRef = useRef<IProductCart[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as IProductCart[];
    setCart(cartData);
    cartRef.current = cartData; // Update the ref
  }, []);

  const handlecreateOrder = async (): Promise<string> => {
    const totalAmount = localStorage.getItem("totalAmount") || "0";
    const amount = parseFloat(totalAmount).toFixed(2);
    const total = parseFloat(amount);

    try {
      const response = await fetch(`${apiURL}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const orderId = await response.text();
      return orderId;
    } catch (error: any) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error.message}`);
      throw error;
    }
  };

  const handleApprove = async (data: any, actions: any) => {
    try {
      const orderId = data.orderID;
      const userSession = JSON.parse(
        localStorage.getItem("userSession") || "{}"
      );
      const userId = userSession?.userData?.data?.userid || "";
      const userToken = userSession?.userData?.token || "";
      const customerName = userSession?.userData?.data?.name || "";
      const email = userSession?.userData?.data?.email || "";

      if (!userId || !userToken || !customerName || !email) {
        throw new Error("User data is missing.");
      }

      const currentCart = cartRef.current;
      if (currentCart.length === 0) {
        throw new Error("Cart is empty.");
      }

      const items = currentCart.map((item) => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
      }));

      console.log("Items:", items);

      const total = localStorage.getItem("totalAmount") || "0";
      const amount = parseFloat(total).toFixed(2);
      const totalAmount = parseFloat(amount);

      const body = {
        email,
        items,
        totalAmount,
        orderId,
        customerName,
      };

      const response = await fetch(
        `${apiURL}/payments/capture-order/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const orderData = await response.json();
      console.log("Order Data:", orderData);

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // Accede a la captura desde el objeto de respuesta correctamente
        const transaction = orderData.capture;
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
        );
        console.log("Capture result:", transaction);

        if (transaction.status === "COMPLETED") {
          const order = {
            userId,
            products: currentCart.map((item) => ({ id: String(item.id) })),
          };

          const createOrderResponse = await createOrder(order, userToken);

          console.log("Order created successfully:", createOrderResponse);

          // Guardar la respuesta en localStorage
          localStorage.setItem("Order", JSON.stringify(createOrderResponse));

          localStorage.removeItem("cart");

          Router.push("/tracking");
        }
      }
    } catch (error: any) {
      console.error(error);
      setMessage(
        `Sorry, your transaction could not be processed...${error.message}`
      );
    }
  };

  return (
    <>
      <PayPalButtons
        style={{
          shape: "pill",
          layout: "vertical",
          color: "black",
          label: "pay",
        }}
        createOrder={handlecreateOrder}
        onApprove={handleApprove}
        disabled={!allFieldsCompleted} // Disable button if fields are not completed
      />
      <Message content={message} />
    </>
  );
};

export default PayPalButton;
