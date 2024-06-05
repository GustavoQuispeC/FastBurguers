"use client";

import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

if (!clientId) {
  throw new Error(
    "NEXT_PUBLIC_PAYPAL_CLIENT_ID no está definido en el archivo .env.local"
  );
}

const initialOptions = {
  clientId: clientId,
  currency: "USD",
  components: "buttons",
};

export const PayPalContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};
