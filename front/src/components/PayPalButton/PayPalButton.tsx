import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

function Message({ content }: any) {
  return <p>{content}</p>;
}

const PayPalButton: React.FC = () => {
  const [message, setMessage] = useState("");

  const handlecreateOrder = async (): Promise<string> => {
    try {
      const response = await fetch(`${apiURL}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 10 }),
      });

      const orderId = await response.text(); // Solo esperamos el ID de la orden como texto

      if (orderId) {
        // Aquí puedes hacer lo que necesites con el ID de la orden
        console.log("Order ID:", orderId);
        // Redirigir al usuario a la página de aprobación de PayPal (opcional)
        window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;
        return orderId; // Devuelve el ID de la orden
      } else {
        throw new Error("Could not retrieve order ID from server");
      }
    } catch (error: any) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
      throw error;
    }
  };

  const handleApprove = async (data: any, actions: any) => {
    try {
      const response = await fetch(`/api/orders/${data.orderID}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const orderData = await response.json();

      // Handle the approval response as before
    } catch (error) {
      console.error(error);
      setMessage(`Sorry, your transaction could not be processed...${error}`);
    }
  };

  return (
    <>
      <PayPalButtons
        createOrder={handlecreateOrder}
        onApprove={handleApprove}
      />
      <Message content={message} />
    </>
  );
};

export default PayPalButton;
