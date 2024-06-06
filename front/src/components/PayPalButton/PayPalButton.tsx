"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
const apiURL = process.env.NEXT_PUBLIC_API_URL;
function Message({ content }: any) {
  return <p>{content}</p>;
}
const totalAmount = localStorage.getItem("totalAmount") || "0";
const amount = parseFloat(totalAmount).toFixed(2);

const PayPalButton: React.FC = () => {
  const [message, setMessage] = useState("");
  const Router = useRouter();

  const handlecreateOrder = async (): Promise<string> => {
    try {
      const response = await fetch(`${apiURL}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });

      const orderId = await response.text();

      return orderId;
    } catch (error: any) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
      throw error;
    }
  };

  const handleApprove = async (data: any, actions: any) => {
    try {
      const response = await fetch(
        `${apiURL}/payments/capture-order/${data.orderID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = await response.json();

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
      const transaction = orderData.purchase_units[0].payments.captures[0];
      if (transaction.status === "COMPLETED") {
        Router.push("/tracking");
      }
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
