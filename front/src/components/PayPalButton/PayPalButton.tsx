"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
const apiURL = process.env.NEXT_PUBLIC_API_URL;
function Message({ content }: any) {
  return <p>{content}</p>;
}

const PayPalButton: React.FC = () => {
  const [message, setMessage] = useState("");

  const handlecreateOrder = async () => {
    try {
      const response = await fetch(`${apiURL}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 10 }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
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

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
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
