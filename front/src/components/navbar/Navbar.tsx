"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  AiFillTag,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiFillProduct,
} from "react-icons/ai";
import { MdHelp } from "react-icons/md";
import { FaHome, FaCartPlus } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IProduct } from "@/interfaces/IProduct";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";
import { getProducts } from "@/helpers/products.helper";
import { IUserSession } from "@/interfaces/IUser";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: sesion } = useSession();

  const [nav, setNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [userSesion, setUserSesion] = useState<IUserSession>();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getProducts();
        setAllProducts(products);
        setSearchResults(products);

        const userSession = localStorage.getItem("userSession");
        if (userSession !== null) {
          setUserSesion(JSON.parse(userSession));
        }

        const cart = localStorage.getItem("cart");
        if (cart !== null) {
          const parsedCart = JSON.parse(cart);

          const totalCount = parsedCart.length;

          setCartItemCount(totalCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [pathname]);

  const handleSearch = (event: { target: { value: string } }) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (value.length > 0) {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value)
      );
      setSearchResults(results);
    } else {
      setSearchResults(allProducts);
    }
  };

  const CerrarSesion = () => {
    signOut();
    localStorage.removeItem("userSession");
    localStorage.removeItem("cart");
  };

  const handleProductClick = () => {
    setSearchTerm("");
    setSearchResults(allProducts);
  };
  return (
    <>
      <div className="max-w-[1640px] dark:bg-gray-600 mx-auto flex dark:text-white justify-between items-center p-4">
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          <Link href="/home">
            <h1 className="text-xl sm:text-3xl lg:text-4xl px-2">
              Fast<span className="font-bold">Burger</span>
            </h1>
          </Link>
          <DarkThemeToggle className="bg-gray-200 rounded-full ml-2" />
        </div>

        <div className="bg-gray-200 rounded-full flex items-center px-2 w-[100px] sm:w-[400px] lg:w-[500px] mx-2">
          <AiOutlineSearch size={20} />
          <input
            className="bg-transparent w-full border-none rounded-full focus:ring-0"
            type="text"
            placeholder="Search food"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {searchResults.length > 0 && searchTerm && (
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

        <div className="flex items-center justify-around w-2/5">
          <button
            onClick={() => router.push("/cart")}
            className="text-orange-400 flex items-center p-2 rounded-full relative"
          >
            <FaCartPlus size={30} />
            {cartItemCount > 0 && (
              <span className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white absolute -top-1 -right-1">
                {cartItemCount}
              </span>
            )}
          </button>
          {!sesion && !userSesion && (
            <Link href="/login">
              <button className="text-gray-900 font-bold">
                Iniciar Sesion
              </button>
            </Link>
          )}

          {(sesion || userSesion) && (
            <p className="text-gray-900 font-bold hidden md:block">
              ¡Bienvenido,
              {sesion?.user?.name || userSesion?.userData.data.name}!
            </p>
          )}
          {(sesion || userSesion) && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Image
                  src={sesion?.user?.image || "/perfil.png"}
                  alt="imagen"
                  width={30}
                  height={30}
                  className="rounded-full "
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {sesion?.user?.name || userSesion?.userData.data.name}
                </span>
                <span className="block truncate text-sm font-medium">
                  {sesion?.user?.email || userSesion?.userData.data.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
              <button onClick={CerrarSesion}>
                <Dropdown.Item>Salir</Dropdown.Item>
              </button>
            </Dropdown>
          )}
        </div>

        {nav && (
          <div
            className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"
            onClick={() => setNav(false)}
          ></div>
        )}

        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer dark:text-black"
          />
          <h2 className="text-2xl p-4 dark:text-black">
            Fast<span className="font-bold"> Burgers</span>
          </h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              <li className="text-xl py-4 flex">
                <TbTruckDelivery size={25} className="mr-4" />
                <Link href="#" className="hover:text-orange-400">
                  Envios
                </Link>
              </li>
              <li className="text-xl py-4 flex">
                <FaHome size={25} className="mr-4" />
                <Link href="/" className="hover:text-orange-400">
                  Inicio
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
    </>
  );
};

export default Navbar;
