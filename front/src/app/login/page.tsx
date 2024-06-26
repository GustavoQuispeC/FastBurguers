"use client";
import { TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaEye } from "react-icons/fa";

import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginErrorProps, LoginProps, LoginTerceros } from "../../types";
import { validateLoginForm } from "../../utils/loginFormValidation";
import { FaEyeSlash } from "react-icons/fa6";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { LoginUser } from "@/helpers/Autenticacion.helper";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const Router = useRouter();

  const [dataUser, setDataUser] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<LoginErrorProps>({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState<
    Partial<Record<keyof LoginErrorProps, boolean>>
  >({
    email: false,
    password: false,
  });

  const GoogleOnClick = async () => {
    await signIn("google", {
      callbackUrl: "http://localhost:3000/home",
      redirect: true,
    });
  };
  const FacebookOnClick = async () => {
    await signIn("facebook", {
      callbackUrl: "http://localhost:3000/home",
      redirect: true,
    });
  };

  //! Mostrar u ocultar contraseña
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  //! Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setDataUser((prevDataUser) => ({
      ...prevDataUser,
      [name]: value,
    }));

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  console.log(dataUser);

  //? Manejar submit del formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const user = await LoginUser(dataUser);

      const userWithToken = user as unknown as { token: string };
      localStorage.setItem("userSession", JSON.stringify({ userData: user }));

      const decodedToken = jwtDecode(userWithToken.token) as {
        isAdmin: boolean;
        isSuperAdmin: boolean;
      };

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido a FastBurgers!",
        showConfirmButton: false,
        timer: 1500,
      });

      if (decodedToken.isAdmin || decodedToken.isSuperAdmin) {
        Router.push("/dashboardAdmin");
      } else {
        Router.push("/home");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "El usuario o la contraseña son incorrectos",
        showConfirmButton: true,
        //timer: 1500,
      });
    }
  };

  //! Validar formulario
  useEffect(() => {
    const errors = validateLoginForm(dataUser);
    setError(errors);
  }, [dataUser]);

  return (
    <div className="font-[sans-serif] text-gray-900 flex items-center justify-center md:h-screen p-4 dark:bg-gray-800">
      <div className="shadow-2xl max-w-6xl rounded-md p-6 bg-white dark:text-white dark:bg-gray-600">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1">
            <img
              src="/LogoFastBurgers.png"
              className="lg:w-11/12 w-full h-96 object-cover"
              alt="login-image"
            />
          </div>
          <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                Iniciar sesión
              </h3>
            </div>
            <div>
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
                />
                <HiMail className="text-gray-900 dark:text-gray-200 absolute right-2" />
              </div>
              {touched.email && error.email && (
                <p style={{ color: "red" }}>{error.email}</p>
              )}
            </div>
            <div className="mb-4 mt-3">
              <div className="relative flex items-center">
                <TextInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={dataUser.password}
                  onChange={handleChange}
                  required
                  className="w-full pr-10"
                  placeholder="Ingrese su contraseña"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-2"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {touched.password && error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )}
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className="w-96 shadow-xl py-2.5 px-4 text-sm font-semibold  rounded-full text-orange-500 dark:bg-gray-400 bg-gray-900 hover:bg-gray-700 focus:outline-none"
              >
                Ingresar
              </button>
              <p className="text-sm text-center mt-8">
                No tienes una cuenta{" "}
                <Link
                  href="/user"
                  className="text-orange-500 font-semibold hover:underline ml-1 whitespace-nowrap"
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