import { TextInput, Textarea } from "flowbite-react";
import React from "react";

const Contact = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center p-">
        <div className="px-3">
          <p className="font-medium text-2xl text-blue-500 dark:text-blue-400">
            Contáctenos
          </p>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 md:text-xl dark:text-white">
            Chatea amigablemente con nuestro equipo
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400 pb-4">
            Nos encantaría saber de usted. Por favor complete este formulario y
            envíenos un correo electrónico.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombres</label>
              <TextInput
                type="text"
                // className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su nombre completo"
              />
            </div>
            <div>
              <label className="block text-gray-700">Correo</label>
              <TextInput
                type="email"
                // className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su correo electrónico"
              />
            </div>
            <div>
              <label className="block text-gray-700">Mensaje</label>
              <Textarea
                // className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Escriba su mensaje"
              ></Textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Enviar
            </button>
          </form>
          <div className="mt-6 flex justify-around">
            <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                <path
                  fill="#448AFF"
                  d="M24,4C13.5,4,5,12.1,5,22c0,5.2,2.3,9.8,6,13.1V44l7.8-4.7c1.6,0.4,3.4,0.7,5.2,0.7c10.5,0,19-8.1,19-18C43,12.1,34.5,4,24,4z"
                />
                <path fill="#FFF" d="M12 28L22 17 27 22 36 17 26 28 21 23z" />
              </svg>
              <span>Chat</span>
            </button>
            <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span>Llamadas</span>
            </button>
            <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>Oficina</span>
            </button>
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 mt-6 p-6 flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d124898.01123534753!2d-77.0637824!3d-11.9701504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1709784581410!5m2!1ses-419!2spe"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
