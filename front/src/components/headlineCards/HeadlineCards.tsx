"use client"
import React from 'react'

function HeadlineCards() {
  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
       {/* Headline Cards */}
       <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
<p className='font-bold text-2xl px-2 pt-4'>Fast Burger Menu</p>
<p className='px-2'>Start your Order!</p>
<button className='border-white bg-white text-black mx-2 absolute bottom-4 '> Order Now</button>
        </div>
        <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' src='https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='/' ></img>
       </div>
       <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
<p className='font-bold text-2xl px-2 pt-4'>New Restaurants</p>
<p className='px-2'>Added Daily</p>
<button className='border-white bg-white text-black mx-2 absolute bottom-4 '>Check it out</button>
        </div>
        <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' src='https://images.pexels.com/photos/4809147/pexels-photo-4809147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='/' ></img>
       </div>
       <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
<p className='font-bold text-2xl px-2 pt-4'>We Deliver Desserts</p>
<p className='px-2'>Tasty Treats</p>
<button className='border-white bg-white text-black mx-2 absolute bottom-4 '> Take a Look </button>
        </div>
        <img className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl' src='https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='/' ></img>
       </div>

    </div>
    
  )
}

export default HeadlineCards
