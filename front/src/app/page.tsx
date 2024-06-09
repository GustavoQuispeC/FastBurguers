"use client";

import HeadlineCards from "@/components/headlineCards/HeadlineCards";
import Hero from "@/components/hero/hero";
import Products from "@/components/Products/Products";
import Banner from "@/components/Banner/Banner";
import Head from "next/head";
import React from "react";
import Testimonials from "../components/Testimonials/Testimonials";
import { CategoryProvider } from "@/context/category.context";
const Home = () => {
  return (
   
    <div>
      <Hero />
      <HeadlineCards />
      <Products />
      <Banner />
      <Testimonials />
    </div>
  
  );
};

export default Home;
