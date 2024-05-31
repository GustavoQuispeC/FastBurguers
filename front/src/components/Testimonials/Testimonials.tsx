import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonialData = [
  {
    id: 1,
    name: 'Carlos Herrera',
    text: 'The best burgers I have tasted in a long time. Top-notch ingredients and unmatched flavor.',
    img: 'https://picsum.photos/101/101', // Replace with appropriate images
  },
  {
    id: 2,
    name: 'Jessica Pearson',
    text: 'Absolutely phenomenal! The gourmet experience is evident in each bite. Highly recommend the truffle burger.',
    img: 'https://picsum.photos/102/102', // Replace with appropriate images
  },
  {
    id: 3,
    name: 'Mark Johnson',
    text: 'Excellent service and the quality of the burgers is superb. The Wagyu beef burger is a must-try!',
    img: 'https://picsum.photos/103/103', // Replace with appropriate images
  },
  {
    id: 4,
    name: 'Samantha Reed',
    text: 'I love the unique flavors and the fresh, local ingredients they use. The ambiance is just perfect for a gourmet burger place.',
    img: 'https://picsum.photos/104/104', // Replace with appropriate images
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
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-lg mx-auto">
          <p className="text-sm text-primary font-semibold">
            What our customers are saying
          </p>
          <h1 className="text-3xl font-bold text-gray-800">
            Testimonials
          </h1>
          <p className="text-xs text-gray-500">
            Discover why our guests love our gourmet burgers!
          </p>
        </div>

        {/* Testimonial cards */}
        <div>
          <Slider {...settings}>
            {testimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-white relative">
                  <div className="mb-4">
                    <img src={data.img} alt="" className="rounded-full w-20 h-20 border-2 border-gray-300" />
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
    </div>
  );
};

export default Testimonials;