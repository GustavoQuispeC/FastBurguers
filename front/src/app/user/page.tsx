"use client";
import { Alert, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { RegisterErrorProps, RegisterProps } from "../types";
import { validateRegisterForm } from "../utils/registerFormValidation";
import {
  FaEye,
  FaEyeSlash,
  FaFlag,
  FaPhoneSquare,
  FaUser,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiMail } from "react-icons/hi";
import { MdMapsHomeWork } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const Router = useRouter();

  //const [showAlert, setShowAlert] = useState(false);
  const notify = () =>
    toast.success("Usuario registrado exitosamente", {
      theme: "colored",
    });

  const [dataUser, setDataUser] = useState<RegisterProps>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    country: "",
    city: "",
  });

  const [error, setError] = useState<RegisterErrorProps>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    country: "",
    city: "",
  });

  //! Mostrar u ocultar contraseña
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
   

      notify();
      // Add form submission logic here if needed
    
  };

  //Validar formulario
  useEffect(() => {
    const errors = validateRegisterForm(dataUser);
    setError(errors);
  }, [dataUser]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />

      <div className="min-h-screen flex justify-center py-10 md:pt-0 md:items-center">
        <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/5">
          <form
            onClick={handleSubmit}
            className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full"
          >
            <div className="flex justify-center mb-6">
              <span className="inline-block bg-gray-200 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                  />
                </svg>
              </span>
            </div>

            <h1 className="text-center text-2xl mb-6 text-gray-900 font-bold font-sans">
              Crear una nueva cuenta
            </h1>

            <div className="pb-4">
              <div className="relative flex items-center">
                <TextInput
                  id="name"
                  name="name"
                  type="name"
                  value={dataUser.name}
                  onChange={handleChange}
                  placeholder="Ingrese nombre completo"
                  required
                  className="w-full pr-10"
                />{" "}
                <FaUser className="text-gray-900 dark:text-gray-200 absolute right-2" />
              </div>
              {error.name && <p style={{ color: "red" }}>{error.name}</p>}
            </div>

            <div className="pb-4">
              <div className="relative flex items-center">
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  value={dataUser.email}
                  onChange={handleChange}
                  placeholder="nombre@ejemplo.com"
                  required
                  className="w-full pr-10"
                />{" "}
                <HiMail className="text-gray-900 dark:text-gray-200 absolute right-2" />
              </div>
              {error.email && <p style={{ color: "red" }}>{error.email}</p>}
            </div>
            <div className="pb-4">
              <div className="relative flex items-center">
                <TextInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={dataUser.password}
                  onChange={handleChange}
                  required
                  className="w-full pr-10"
                  placeholder="Ingrese su contraseña"
                />{" "}
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )}
            </div>

            <div className="pb-4">
              <div className="relative flex items-center">
                <TextInput
                  id="Rpassword"
                  name="Rpassword"
                  type={showPassword ? "text" : "password"}
                  //   value={dataUser.password}
                  //   onChange={handleChange}
                  required
                  className="w-full pr-10"
                  placeholder="Repetir su contraseña"
                />{" "}
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {/* {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )} */}
            </div>

            <div className="pb-4">
              <div className="relative flex items-center">
                <TextInput
                  id="address"
                  name="address"
                  type="address"
                  value={dataUser.address}
                  onChange={handleChange}
                  placeholder="Ingrese su dirección"
                  required
                  className="w-full pr-10"
                />{" "}
                <MdMapsHomeWork className="text-gray-900 dark:text-gray-200 absolute right-2" />
              </div>
              {error.address && <p style={{ color: "red" }}>{error.address}</p>}
            </div>

            <div className="pb-4">
              <div className="relative flex items-center">
                <TextInput
                  id="country"
                  name="country"
                  type="country"
                  value={dataUser.country}
                  onChange={handleChange}
                  placeholder="Ingrese su pais"
                  required
                  className="w-full pr-10"
                />{" "}
                <FaFlag className="text-gray-900 dark:text-gray-200 absolute right-2" />
              </div>
              {error.country && <p style={{ color: "red" }}>{error.country}</p>}
            </div>
            <div className="pb-4">
              <div className="relative flex items-center">
                <TextInput
                  id="city"
                  name="city"
                  type="city"
                  value={dataUser.city}
                  onChange={handleChange}
                  placeholder="Ingrese su city"
                  required
                  className="w-full pr-10"
                />{" "}
                <FaTreeCity className="text-gray-900 dark:text-gray-200 absolute right-2" />
              </div>
              {error.city && <p style={{ color: "red" }}>{error.city}</p>}
            </div>

            <div className="pb-4">
              <div className="relative flex items-center">
                <TextInput
                  id="phone"
                  name="phone"
                  type="phone"
                  value={dataUser.phone}
                  onChange={handleChange}
                  placeholder="Ingrese su teléfono"
                  required
                  className="w-full pr-10"
                />{" "}
                <FaPhoneSquare className="text-gray-900 dark:text-gray-200 absolute right-2" />
              </div>
              {error.phone && <p style={{ color: "red" }}>{error.phone}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gray-900 hover:bg-gray-800 rounded-lg px-4 py-2 text-lg text-orange-400 tracking-wide font-bold font-sans"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
