import { Carousel } from "flowbite-react";
import Image from "next/image";

const Carrusel = () => {
  return (
    <div className=" h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {[
          "/banner1.jpg",
          "/banner2.jpg",
          "/banner3.jpg",
          "/banner4.jpg",
          "/banner5.jpg",
        ].map((src, index) => (
          <div key={index} className="w-full h-full">
            <Image
              src={src}
              alt={`banner${index + 1}`}
              layout="fill"
              objectFit="contain"
              objectPosition="center center"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrusel;
