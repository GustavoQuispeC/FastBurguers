import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import { ThemeModeScript } from "flowbite-react";
import Provider from "@/context/Provider";
import Footer from "@/components/footer/Footer";
import { PayPalContext } from "@/context/PayPalContext";
import { CategoryProvider } from "@/context/category.context";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fast Burgers",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
<CategoryProvider>
 
        <PayPalContext>
          <Provider>
            <Navbar />
            {children}
            <Footer />
          </Provider>
        </PayPalContext>

  </CategoryProvider>
      </body>
    </html>
  );
}
