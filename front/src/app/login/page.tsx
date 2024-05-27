import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import React from "react";
import { FaEye } from "react-icons/fa";
import Autenticar from "../components/autenticar/Autenticar";

const Login = () => {
  return (
    <div className="font-[sans-serif] text-[#333] bg-white flex items-center justify-center md:h-screen p-4">
      <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl rounded-md p-6">
        {/* <a href="#"><img
          src="/logo.png" alt="logo" className='w-40 md:mb-4 mb-12' />
        </a> */}
        <h3 className="font-serif font-bold">fastburgers.com</h3>
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1">
            <img
              src="/loginHamburguesa.jpeg"
              className="lg:w-11/12 w-full h-96 object-cover"
              alt="login-image"
            />
          </div>
          <form className="max-w-md w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-blue-600">
                Iniciar sesión
              </h3>
            </div>
            <div>
              <div className="relative flex items-center">
                <TextInput
                  id="email4"
                  type="email"
                  rightIcon={HiMail}
                  placeholder="name@ejemplo.com"
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
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="jajvascript:void(0);"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Olvidó su contraseña?
                </a>
              </div>
            </div>
            <div className="mt-12">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Sign in
              </button>
              <p className="text-sm text-center mt-8">
                No tienes una cuenta{" "}
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Registrate aquí
                </a>
              </p>
            </div>
            <hr className="my-6 border-gray-300" />

            <Autenticar />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
