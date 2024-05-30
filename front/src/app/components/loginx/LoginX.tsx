// 'use client'
// import { TextInput } from "flowbite-react";
// import { HiMail } from "react-icons/hi";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";

// import React, { useEffect, useState } from "react";
// import { LoginProps, LoginErrorProps } from "@/app/types";
// import { validateLoginForm } from "@/app/utils/loginFormValidation";

// const Login = () => {
//   const [dataUser, setDataUser] = useState<LoginProps>({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState<LoginErrorProps>({
//     email: "",
//     password: "",
//   });

//    // Mostrar u ocultar contraseña
//    const [showPassword, setShowPassword] = useState(false);
//    const handleTogglePassword = () => {
//      setShowPassword(!showPassword);
//    };

//    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     setDataUser({
//       ...dataUser,
//       [e.target.name]: e.target.value,
//     });
//    }

//    const handleSubmit = (e:any)=>{
//       e.preventDefault();
//     try {
      
//     } catch (error: any) {
//       throw new Error(error);
//     }
//    }

//    //validar formulario
//    useEffect(() => {
//     const error = validateLoginForm(dataUser);
//     setError(error);
//    }, [dataUser]);
//    console.log(dataUser)


 
//   return (
//     <div className="font-[sans-serif] text-[#333]  flex items-start justify-center md:h-screen pt-10">
//       <div className="shadow-2xl max-w-6xl rounded-md p-6">
      
//         <h3 className="font-serif font-bold">www.fastburgers.com</h3>
//         <div className="grid md:grid-cols-2 items-center gap-8">
//           <div className="max-md:order-1">
//             <img
//               src="/LogoFastBurgers.png"
//               className="lg:w-11/12 w-full h-96 object-cover"
//               alt="login-image"
//             />
//           </div>
//           <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
//             <div className="mb-12">
//               <h3 className="text-4xl font-extrabold text-gray-900">
//                 Iniciar sesión
//               </h3>
//             </div>
//             <div>
//               <div className="relative flex items-center">
//                 <TextInput
//                   name="email"
//                   type="email"
//                   rightIcon={HiMail}
//                   placeholder="name@ejemplo.com"
//                   required
//                   className="w-full"
//                   value={dataUser.email}
//                   onChange={handleChange}
//                 />
               
//                 {error.email &&  <p style={{ color: "red" }}>{error.email}</p>}
//               </div>
//             </div>
//             <div className="mt-8">
//               <div className="relative flex items-center">
//                 <TextInput
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   rightIcon={FaEye}
//                   required
//                   className="w-full "
//                   placeholder="********"
//                   value={dataUser.password}
//                   onChange={handleChange}
//                 />
//                 {error.password && <p style={{ color: "red" }}>{error.password}</p>}
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
//                   onClick={handleTogglePassword}
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash className="text-gray-500" />
//                   ) : (
//                     <FaEye className="text-gray-500" />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div className="flex items-center justify-between gap-2 mt-6">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-3 block text-sm">
//                   Recordar
//                 </label>
//               </div>
//               <div>
//                 <a
//                   href="jajvascript:void(0);"
//                   className="text-blue-600 text-sm hover:underline"
//                 >
//                   Olvidó su contraseña?
//                 </a>
//               </div>
//             </div>
//             <div className="mt-12">
//               <button
//                 type="button"
//                 className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-orange-400 bg-gray-900 hover:bg-gray-800 focus:outline-none"
//               >
//                 Ingresar
//               </button>
//               <p className="text-sm text-center mt-8">
//                 No tienes una cuenta{" "}
//                 <a
//                   href="/user"
//                   className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
//                 >
//                   Registrate aquí
//                 </a>
//               </p>
//             </div>
//             <hr className="my-6 border-gray-300" />
//             <div className="space-x-8 flex justify-center">
//               <button type="button" className="border-none outline-none">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="30px"
//                   className="inline"
//                   viewBox="0 0 512 512"
//                 >
//                   <path
//                     fill="#fbbd00"
//                     d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
//                     data-original="#fbbd00"
//                   />
//                   <path
//                     fill="#0f9d58"
//                     d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
//                     data-original="#0f9d58"
//                   />
//                   <path
//                     fill="#31aa52"
//                     d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
//                     data-original="#31aa52"
//                   />
//                   <path
//                     fill="#3c79e6"
//                     d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
//                     data-original="#3c79e6"
//                   />
//                   <path
//                     fill="#cf2d48"
//                     d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
//                     data-original="#cf2d48"
//                   />
//                   <path
//                     fill="#eb4132"
//                     d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
//                     data-original="#eb4132"
//                   />
//                 </svg>
//               </button>
//               <button type="button" className="border-none outline-none">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="30px"
//                   fill="#000"
//                   viewBox="0 0 22.773 22.773"
//                 >
//                   <path
//                     d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
//                     data-original="#000000"
//                   ></path>
//                 </svg>
//               </button>
//               <button type="button" className="border-none outline-none">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="30px"
//                   fill="#007bff"
//                   viewBox="0 0 167.657 167.657"
//                 >
//                   <path
//                     d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
//                     data-original="#010002"
//                   ></path>
//                 </svg>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
