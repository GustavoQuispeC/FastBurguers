import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonialData = [
  {
    id: 1,
    name: 'Carlos Herrera',
    text: 'Las mejores hamburguesas que he probado en mucho tiempo. Ingredientes de primera y un sabor inigualable.',
    img: 'https://picsum.photos/101/101',
  },
  {
    id: 2,
    name: 'Jessica Pearson',
    text: '¡Simplemente fenomenal! La experiencia gourmet es evidente en cada bocado. Recomiendo altamente la hamburguesa de trufa.',
    img: 'https://picsum.photos/102/102', 
  },
  {
    id: 3,
    name: 'Mark Johnson',
    text: 'Servicio excelente y la calidad de las hamburguesas es superba. ¡La hamburguesa de carne Wagyu es imprescindible!',
    img: 'https://picsum.photos/103/103', 
  },
  {
    id: 4,
    name: 'Samantha Reed',
    text: 'Me encantan los sabores únicos y los ingredientes frescos y locales que utilizan. El ambiente es simplemente perfecto para un lugar de hamburguesas gourmet.',
    img: 'https://picsum.photos/104/104', 
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
        {/* Sección de encabezado */}
        <div className="text-center mb-10 max-w-lg mx-auto">
          <p className="text-sm text-primary font-semibold">
            Lo que nuestros clientes están diciendo
          </p>
          <h1 className="text-3xl font-bold text-gray-800">
            Testimonios
          </h1>
          <p className="text-xs text-gray-500">
            ¡Descubre por qué a nuestros invitados les encantan nuestras hamburguesas gourmet!
          </p>
        </div>

        {/* Tarjetas de testimonios */}
        <div>
          <Slider {...settings}>
            {testimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-white relative">
                  <div className="mb-4">
                    <img src={data.img} alt={data.name} className="rounded-full w-20 h-20 border-2 border-gray-300" />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-600">{data.text}</p>
                      <h1 className="text-xl font-bold text-gray-800">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-gray-200 text-9xl font-serif absolute top-0 right-0">
                    “
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
    </div>
  );
};

export default Testimonials;