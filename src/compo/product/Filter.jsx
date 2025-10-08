import React from 'react'
import ficon from "../../assets/product/filter.png"


const Filter = () => {
  return (
    <div className=" flex items-center gap-2 mt-10 ml-10">
      <img className='h-[25px] ' src={ficon} />
      
       
     <p className="flex gap-1 bg-pink-200/50 rounded px-2 py-1 w-fit hover:bg-pink-400/50 cursor-pointer">All</p>
       <p className="flex gap-1 bg-pink-200/50 rounded px-2 py-1 w-fit hover:bg-pink-400/50 cursor-pointer">Cleanser</p>
       <p className="flex gap-1 bg-pink-200/50 rounded px-2 py-1 w-fit hover:bg-pink-400/50 cursor-pointer">Serum</p>
        <p className="flex gap-1 bg-pink-200/50 rounded px-2 py-1 w-fit hover:bg-pink-400/50 cursor-pointer">Moistruizer</p>
         <p className="flex gap-1 bg-pink-200/50 rounded px-2 py-1 w-fit hover:bg-pink-400/50 cursor-pointer">SunScreen</p>
    </div>
  )
}

export default Filter
