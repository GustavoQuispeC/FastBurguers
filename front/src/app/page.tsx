"use client"
import HeadlineCards from "@/components/headlineCards/HeadlineCards";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/navbar/Naavbar";
import Head from "next/head";
import React from "react";

const Home= () => {
  return (
  
      <div> 
     <Navbar/>
     <Hero/>
     <HeadlineCards/>
        </div>
   
  );
};

export default Home ;
