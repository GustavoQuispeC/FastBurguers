import { TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import React from "react";

const page = () => {
return (
    <>
        {/* <div>
            {showAlert && (
                <Alert color="warning">
                    <span className="font-medium">Mensaje:</span> Usuario registrado con
                    éxito.
                </Alert>
            )}
        </div> */}
<div className="min-h-screen flex justify-center py-10 md:pt-0 md:items-center">
    <div className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/5">
        <form className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full">
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
            <div>
                <label
                    className="text-gray-800 font-semibold block my-3 text-md"
                    htmlFor="username"
                >
                    Nombre completo
                </label>
                <TextInput
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Ingrese su nombre completo"
                />
            </div>
            <div>
                <label
                    className="text-gray-800 font-semibold block my-3 text-md"
                    htmlFor="email"
                >
                    Correo
                </label>
                <TextInput
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Ingrese su correo"
                />
            </div>
            <div>
                <label
                    className="text-gray-800 font-semibold block my-3 text-md"
                    htmlFor="password"
                >
                    Contraseña
                </label>
                <TextInput
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Ingrese su contraseña"
                />
            </div>
            <div>
                <label
                    className="text-gray-800 font-semibold block my-3 text-md"
                    htmlFor="address"
                >
                    Dirección
                </label>
                <TextInput
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Ingrese su dirección"
                />
            </div>
            <div>
                <label
                    className="text-gray-800 font-semibold block my-3 text-md"
                    htmlFor="phone"
                >
                    Teléfono
                </label>
                <TextInput
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Ingrese su teléfono"
                />
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

export default page;
