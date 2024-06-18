"use client";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import Container from "@/components/container/Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import React, { useState, useEffect } from "react";

const Footer: React.FC = (): React.ReactElement => {
  const [footerHeight, setFooterHeight] = useState("500px");

  useEffect(() => {
    // Función para actualizar el height basado en el tamaño de la pantalla
    function updateSize() {
      if (window.innerWidth < 640) {
        setFooterHeight("800px");
      } else {
        setFooterHeight("500px");
      }
    }

    // Establecer el tamaño inicialmente y añadir listener para resize
    updateSize();
    window.addEventListener("resize", updateSize);

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <footer
      style={{
        backgroundImage: 'url("/footer-pattern.jpg")',
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: footerHeight,
        width: "100%",
      }}
      className="bg-black text-slate-200 text-sm"
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-around  pt-16 pb-8">
          <Link href="/product">
          <FooterList>
            <h3 className=" text-base text-orange-500 font-bold mb-3">
           Menu
            </h3>

            <div>Hamburguesas </div>
            <div>Postres</div>
            <div>Bebidas</div>
            <div>Sandwiches</div>
          </FooterList>
</Link>
          <FooterList>
            <h3 className=" text-base text-orange-500 font-bold mb-2">
              Servicio al Cliente
            </h3>
<Link href="/contact">
            <div>Contáctanos</div>
</Link>
<Link href="/politica">
            <div>Política de Entrega</div>
</Link>
<Link href="/devoluciones">
            <div>Devoluciones y Cambios</div>
</Link>
<Link href="/faq">
            <div>Preguntas Frecuentes</div>
</Link>
          </FooterList>

          <div className=" w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2 text-orange-500">
              Sobre Nosotros
            </h3>
            <p className="mb-2">
              {" "}
              ¡Bienvenido a Fast Burgers, tu lugar para hamburguesas rápidas y
              deliciosas y más! Nos enfocamos en ingredientes frescos y un
              servicio rápido para ofrecer una experiencia gastronómica de
              primera clase. Disfruta de nuestra variedad de hamburguesas,
              acompañamientos y bebidas hoy. ©2024 Fast Burgers. Todos los
              Derechos Reservados.
            </p>
            <p>
              &copy;{new Date().getFullYear()} Fast Burger. Todos los derechos
              reservados{" "}
            </p>
          </div>
          <FooterList>
            <h3 className="text-base text-orange-500 font bold mb-2">
              {" "}
              Síguenos
            </h3>
            <div className="flex gap-2">
              <Link href={"https://www.facebook.com/"}>
                <MdFacebook size={24} />
              </Link>
              <Link href={"https://twitter.com/"}>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href={"https://www.instagram.com/"}>
                <AiFillInstagram size={24} />
              </Link>
              <Link href={"https://www.youtube.com/"}>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;