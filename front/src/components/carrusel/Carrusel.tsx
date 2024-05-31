import { Carousel } from "flowbite-react";
import Image from "next/image";

const Carrusel = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 overflow-hidden">
      <Carousel>
        {[
          ["/banner1.jpg", "/banner2.jpg"],
          ["/banner3.jpg", "/banner4.jpg"],
          ["/banner5.jpg", "/banner1.jpg"],
        ].map((group, index) => (
          <div key={index} className="flex w-full h-full">
            {group.map((src, imgIndex) => (
              <div key={imgIndex} className="relative w-1/2 h-full">
                <Image
                  src={src}
                  alt={`banner${index * 2 + imgIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carrusel;
