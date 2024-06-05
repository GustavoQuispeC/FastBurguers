"use client"
import React from "react";
import { TextInput, Textarea } from "flowbite-react";
import RatingStars from "@/components/ratingStars/ratingStars"; // Asegúrate de que la ruta sea correcta


const Contacto: React.FC = () => {
  const handleCambioDeCalificacion = (calificacion: number) => {
    console.log("Calificación seleccionada:", calificacion);
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1kew-d7XLDgB5lY5pFufQQpq5unMj4r0&ehbc=2E312F&noprof=1"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="mapa"
            scrolling="no"
            style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Danos tu Opinion!</h2>
            <p className="leading-relaxed mb-5 text-gray-600">Valoramos tus comentarios y preocupaciones. Por favor, háznos saber cómo fue tu experiencia de compra y cómo podemos mejorar nuestros servicios.</p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Tu Nombre</label>
              <TextInput id="name" name="name" placeholder="Ingresa tu nombre" required />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Tu Correo Electrónico</label>
              <TextInput type="email" id="email" name="email" placeholder="Ingresa tu correo electrónico" required />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">Tu Mensaje</label>
              <Textarea id="message" name="message" placeholder="Ingresa tu mensaje" required />
            </div>
            <div className="relative mb-4">
              <label htmlFor="rating" className="leading-7 text-sm text-gray-600">Calificación</label>
              <RatingStars onChange={handleCambioDeCalificacion} />
            </div>
            <button className="text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-800 rounded text-lg">Enviar Opinion</button>
            <p className="text-xs text-gray-500 mt-3">¡Gracias por ayudarnos a mejorar tus futuras experiencias!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;