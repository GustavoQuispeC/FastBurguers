// components/ClientWrapper.tsx
"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/dashboardAdmin");
  const isAddProductPage = pathname.startsWith("/productAdd");

  useEffect(() => {
    console.log("Current Pathname:", pathname);
    console.log("Is Admin Page:", isAdminPage);
  }, [pathname]);

  return (
    <>
      
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Chatbot />}
      {!isAdminPage && <Footer />}
      
    </>
  );
};

export default ClientWrapper;
