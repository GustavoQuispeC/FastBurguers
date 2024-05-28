"use client";
import HeadlineCards from "./components/headlineCards/HeadlineCards";
import Hero from "./components/hero/hero";
import Navbar from "./components/navbar/Naavbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HeadlineCards />
    </div>
  );
};

export default Home;
