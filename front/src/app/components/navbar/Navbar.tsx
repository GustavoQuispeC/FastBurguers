"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AiFillTag,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { AiFillProduct } from "react-icons/ai";
import { MdHelp } from "react-icons/md";
import { FaHome, FaCartPlus } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

import productosPreload from "@/app/helpers/productos";
import { IProduct } from "@/app/interfaces/IProduct";
import Link from "next/link";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const { data: sesion, status, update } = useSession();

  const [nav, setnav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length > 0) {
      const results = productosPreload.filter((product) =>
        product.name.toLowerCase().includes(value)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="max-w-[1640px] bg-white mx-auto flex justify-between items-center p-4">
      {/* Lado Izquierdo */}
      <div className="flex items-center">
        <div onClick={() => setnav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <Link href="/home">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 ">
            Fast<span className="font-bold">Burger</span>
          </h1>
        </Link>
        <div className="hidden lg:flex  items-center bg-gray-200 rounded-full p-1 text-[14px] ">
          <p className=" bg-black text-orange-400 rounded-full p-2">Delivery</p>
          <p className="p-2">Pickup</p>
        </div>
      </div>

      {/* SearchInput */}
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={20} />
        <input
          className="bg-transparent w-full border-none rounded-full focus:ring-0 focus:border-transparent"
          type="text"
          placeholder="Search food"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Mostrar resultados de búsqueda */}
      {searchResults.length > 0 && (
        <div className="absolute top-16 left-0 right-0 z-50 bg-white shadow-md">
          {searchResults.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              onClick={handleProductClick}
            >
              <div className="flex items-center p-2 border-b border-gray-200">
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="w-12 h-12 object-cover mr-2"
                />
                <p className="text-gray-800">{product.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* Cart Button */}
      <button
        onClick={() => router.push("/cart")}
        className=" text-orange-400 hidden md:flex items-center p-2 rounded-full"
      >
        <FaCartPlus size={20} />
      </button>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Image
              src={sesion?.user?.image || "/perfil.png"}
              alt="imagen"
              width={30}
              height={30}
              className="rounded-full"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{sesion?.user?.name}</span>
            <span className="block truncate text-sm font-medium">
              {sesion?.user?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <button
            onClick={() => {
              signOut();
            }}
          >
            <Dropdown.Item>Salir</Dropdown.Item>
          </button>
        </Dropdown>
      </div>

      {/* Mobile Menu*/}
      {/* Overlay*/}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        " "
      )}
      {/* Side drawer menu*/}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setnav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4 ">
          Fast<span className="font-bold"> Burgers</span>
        </h2>

        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex">
              <TbTruckDelivery size={25} className="mr-4" />
              <Link href="#" className="hover:text-orange-400">
                Delivery
              </Link>
            </li>
            <li className="text-xl py-4 flex">
              <FaHome size={25} className="mr-4" />
              <Link href="/" className="hover:text-orange-400">
                Home
              </Link>
            </li>
            <li className="text-xl py-4 flex">
              <AiFillProduct size={25} className="mr-4" />
              <Link href="/product" className="hover:text-orange-400">
                Productos
              </Link>
            </li>

            <li className="text-xl py-4 flex">
              <AiFillTag size={25} className="mr-4" />
              <Link href="#" className="hover:text-orange-400">
                Promociones
              </Link>
            </li>
            <li className="text-xl py-4 flex">
              <FaCartPlus size={25} className="mr-4" />
              <Link href="/cart" className="hover:text-orange-400">
                Carrito
              </Link>
            </li>
            <li className="text-xl py-4 flex">
              <MdHelp size={25} className="mr-4" />
              <Link href="/contact" className="hover:text-orange-400">
                Nosotros
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
