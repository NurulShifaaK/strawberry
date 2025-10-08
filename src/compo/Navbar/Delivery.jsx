import React from 'react'
import truck from "../../assets/delivery/truck.png";
import world from "../../assets/delivery/world.png";
import support from "../../assets/delivery/support.png";
import feedback from "../../assets/delivery/feedback.png";

const Delivery = () => {
  return (
    <div className='flex flex-col'>
        <p className='text-center font-semibold text-2xl mt-6'>Why Aurora? </p>
        <div className='flex justify-around mt-8 '>
            <div className='flex flex-col gap-2 items-center'>
            <img className='w-[50px] h-[50px] md:w-[80px] md:h-[80px]' src={truck} />
            <p>Free Delivery</p>
            </div>
            <div className='flex flex-col gap-2 items-center'>
            <img  className='w-[50px] h-[50px] md:w-[80px] md:h-[80px]'  src={world} />
            <p>WorldWide</p>
            </div>
            <div className='flex flex-col gap-2 items-center'>
            <img className='w-[50px] h-[50px] md:w-[80px] md:h-[80px]'  src={support} />
            <p>24/7 Care</p>
            </div>
            <div className='flex flex-col gap-2 items-center'>
            <img  className='w-[50px] h-[50px] md:w-[80px] md:h-[80px]'  src={feedback} />
            <p>Best Quality</p>
            </div>
        </div>
    </div>
  )
}

export default Delivery