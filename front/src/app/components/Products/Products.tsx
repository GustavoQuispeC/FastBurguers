import Link from "next/link";
import React from "react";

import { FaStar } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: '/classic.jpg', 
    title: "Classic Burger",
    rating: 4.9,
    color: "Beef Patty",
    aosDelay: "0",
    description: "A classic beef burger with lettuce, tomato, and our signature sauce."
  },
  {
    id: 2,
    img:'/refresco.jpg',
    title: "Cheese Burger",
    rating: 4.8,
    color: "Cheese",
    aosDelay: "200",
    description: "Juicy burger topped with melted cheese, pickles, onions, and ketchup."
  },
  {
    id: 3,
    img: '/chicken.jpg',
    title: "Chicken Burger",
    rating: 4.7,
    color: "Chicken",
    aosDelay: "400",
    description: "Crispy chicken fillet with spicy mayo and crisp lettuce on a toasted bun."
  },
  {
    id: 4,
    img: '/veggie.jpg',
    title: "Veggie Burger",
    rating: 4.5,
    color: "Veggie",
    aosDelay: "600",
    description: "A delicious and hearty vegetable patty served with vegan mayo and fresh greens."
  },
  {
    id: 5,
    img: '/bacon.jpg',
    title: "Bacon Burger",
    rating: 4.8,
    color: "Bacon",
    aosDelay: "800",
    description: "Burger with crispy bacon, smoky barbecue sauce, and onion rings."
  },
];
const Products = () => {
  return (
    <div className="mt-14 mb-12 bg-orange-100 m-1">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-orange-400">
            Discover our top-selling burgers, each crafted with fresh ingredients and an irresistible taste. From the classic cheeseburger to our unique veggie options, find your perfect match and indulge in the flavors that make us a favorite.
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <Link href="/home">
  <div className="flex justify-center">
    <p className="text-center mt-10 cursor-pointer bg-orange-400 text-white py-1 px-5 rounded-2xl focus:outline-none focus:ring-0">
      View All 
    </p>
  </div>
</Link>
        </div>
      </div>
    </div>
  );
};

export default Products;