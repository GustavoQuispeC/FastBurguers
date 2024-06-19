import React from 'react';
import Link from 'next/link';
import { useCategory } from "@/context/category.context"; 

function HeadlineCards() {
  const { setSelectedCategoryName } = useCategory();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryName(categoryName);
  };

  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      <div className='rounded-xl relative'>
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex flex-col justify-center items-center p-4'>
          <p className='font-bold text-xl sm:text-2xl px-2'>Menú de Fast Burger</p>
          <p className='px-2 text-center'>¡Comienza tu pedido ahora!</p>
          <Link href='/home'>
            <button type="button" className="focus:outline-none text-white bg-orange-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 mt-4">Pedir Ahora</button>
          </Link>
        </div>
        <img className='w-full object-cover rounded-xl' style={{ height: '200px' }} src='https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='imagen de comida' />
      </div>

      <div className='rounded-xl relative'>
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex flex-col justify-center items-center p-4'>
          <p className='font-bold text-xl sm:text-2xl px-2'>Nuevos Restaurantes</p>
          <p className='px-2 text-center'>Nos estamos expandiendo!</p>
          <Link href='/contact'>
            <button type="button" className="focus:outline-none text-white bg-orange-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 mt-4">Descúbrelos</button>
          </Link>
        </div>
        <img className='w-full object-cover rounded-xl' style={{ height: '200px' }} src='https://images.pexels.com/photos/4809147/pexels-photo-4809147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='imagen de restaurante' />
      </div>

      <div className='rounded-xl relative'>
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white flex flex-col justify-center items-center p-4'>
          <p className='font-bold text-xl sm:text-2xl px-2'>Entregamos Postres</p>
          <p className='px-2 text-center'>Dulces Delicias</p>
          <Link href="/product">
            <button type="button" onClick={() => handleCategoryClick("Postres")} className="focus:outline-none text-white bg-orange-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 mt-4">Echa un Vistazo</button>
          </Link>
        </div>
        <img className='w-full object-cover rounded-xl' style={{ height: '200px' }} src='https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='imagen de postre' />
      </div>
    </div>
  );
}

export default HeadlineCards;