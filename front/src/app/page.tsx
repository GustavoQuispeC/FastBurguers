"use client"


import HeadlineCards from "@/app/components/headlineCards/HeadlineCards";
import Hero from "@/app/components/hero/hero";
import Products from "@/app/components/Products/Products";
import Banner from "@/app/components/Banner/Banner";
import Head from "next/head";
import React from "react";
import Testimonials from "./components/Testimonials/Testimonials";



const Home= () => {
  return (
  
      <div> 

    <Hero/>
  <HeadlineCards/>
  <Products/>
  <Banner/>
  <Testimonials/>
  </div>
   
  );
;}

export default Home;