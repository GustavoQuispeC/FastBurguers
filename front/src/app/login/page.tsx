"use client";

import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import React from "react";
import { FaEye } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

const Login = () => {
  const GoogleOnClick = async () => {
    await signIn("google", {
      callbackUrl: "/home",
      redirect: true,
    });
  };
  const FacebookOnClick = async () => {
    await signIn("facebook", {
      callbackUrl: "/home",
      redirect: true,
    });
  };

  return (
    <div className="font-[sans-serif] text-gray-900 flex items-center justify-center md:h-screen p-4 ">
      <div className="shadow-2xl max-w-6xl rounded-md p-6 bg-white">
        <h3 className="font-serif font-bold">www.fastburgers.com</h3>
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1">
            <img
              src="/LogoFastBurgers.png"
              className="lg:w-11/12 w-full h-96 object-cover"
              alt="login-image"
            />
          </div>
          <form className="max-w-md w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-gray-900">
                Iniciar sesión
              </h3>
            </div>
            <div>
              <div className="relative flex items-center">
                <TextInput
                  id="email4"
                  type="email"
                  rightIcon={HiMail}
                  placeholder="nombre@ejemplo.com"
                  required
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-8">
              <div className="relative flex items-center">
                <TextInput
                  name="password"
                  type="password"
                  rightIcon={FaEye}
                  required
                  className="w-full "
                  placeholder="Ingrese su contraseña"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-orange-500 focus:ring-gray-500 border-orange-400 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  Recordarme
                </label>
              </div>
              <div>
                <a
                  href="jajvascript:void(0);"
                  className="text-orange-400 text-sm hover:underline"
                >
                  Olvidó su contraseña?
                </a>
              </div>
            </div>
            <div className="mt-12">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-orange-400 bg-gray-900 hover:bg-gray-700 focus:outline-none"
              >
                Ingresar
              </button>
              <p className="text-sm text-center mt-8">
                No tienes una cuenta{" "}
                <Link
                  href="/user"
                  className="text-orange-400 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Registrate aquí
                </Link>
              </p>
            </div>
            <hr className="my-6 border-gray-300" />

            <div className="flex justify-around items-center">
              <button onClick={GoogleOnClick}>
                <Image src="/google.png" alt="google" width={30} height={30} />
              </button>

              <button onClick={FacebookOnClick}>
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  width={35}
                  height={35}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
