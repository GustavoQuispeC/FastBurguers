"use client";

import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "test",
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
