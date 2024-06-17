
"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";

const ProductAddWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
 
  const isAddProductPage = pathname.startsWith("/productAdd");

  useEffect(() => {
  }, [pathname]);
  return (
    <>
      
      {!isAddProductPage && <Navbar />}
      {children}
      {!isAddProductPage && <Chatbot />}
      {!isAddProductPage && <Footer />}
      
    </>
  );
};

export default ProductAddWrapper;