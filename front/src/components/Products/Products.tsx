import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { getProducts } from "@/helpers/products.helper";
import { IProduct } from "@/interfaces/IProduct";
import {Rating} from "@mui/material"

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const loadedProducts = await getProducts();
        setProducts(loadedProducts.slice(0, 7)); 
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mt-14 mb-12 bg-orange-100 m-1">
      <div className="text-center mb-10 max-w-[600px] mx-auto pt-6">
        <p className="text-sm text-primary">
          Productos más vendidos para ti
        </p>
        <h1 className="text-3xl font-bold">
          Productos
        </h1>
        <p className="text-xs text-orange-400">
          Descubre nuestras hamburguesas más vendidas, cada una elaborada con ingredientes frescos
          y un sabor irresistible. Desde la hamburguesa clásica con queso hasta nuestras opciones
          vegetarianas únicas, encuentra tu combinación perfecta y disfruta de los sabores
          que nos hacen favoritos.
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 place-items-center gap-5">
          {products.map((product: IProduct) => (
            <div key={product.id}>
              <img
                src={product.imgUrl} 
                alt={product.name}  
                className="h-[300px] w-[200px] object-cover rounded-md"
              />
           <div className="product-item text-center">
  <Rating name="read-only" value={5} readOnly />
  <h3 className="font-bold">{product.name}</h3>
  <p className="text-sm text-gray-600">{product.price}</p>
               
                <div className="flex items-center gap-1">
                 
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/home">
          <div className="flex justify-center pb-10">
            <p className="text-center mt-10 cursor-pointer bg-orange-400  hover:bg-orange-700 text-white py-1 px-5 rounded-2xl focus:outline-none focus:ring-0">
              Ver Todos
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Products;