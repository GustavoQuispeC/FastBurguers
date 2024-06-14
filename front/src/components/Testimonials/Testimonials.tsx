import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

interface Testimonial {
  id: string;
  name: string;
  email: string;
  description: string;
  punctuation: number;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get<Testimonial[]>(`${process.env.NEXT_PUBLIC_API_URL}/testimony/`);
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

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
          {testimonials.map((data) => (
            <div key={data.id} className="my-6">
              <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-white relative">
                <div className="flex flex-col items-center gap-4">
                  <div className="space-y-3">
                    <p className="text-xs text-gray-600">{data.description}</p>
                    <h1 className="text-xl font-bold text-gray-800">
                      {data.name}
                    </h1>
                    <p className="text-xs text-gray-500">{`Puntuación: ${data.punctuation}`}</p>
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