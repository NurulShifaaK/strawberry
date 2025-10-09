import React from 'react'

const Footer = () => {
  return (
   <div className=' mt-6 p-4 w-full shadow-2xl rounded bg-violet-400/50 text-white'>
    <div>
<p  className='text-center font-bold sm:text-9xl text-6xl'>Aurora</p>
<p className='text-center mt-2 font-semibold font-serif text-white/70'>Radiance redefined for every kind of Beautiful</p>
</div>
 <div className='flex justify-center mt-4'>
<input
className="border border-white/40 rounded px-4 py-1 w-[300px] font-semibold text-black/40 "
 type="text"
 placeholder="Email Us"
 />
 <button className='bg-white/80 rounded text-black/50 px-4 font-semibold py-1 ml-2'>Send</button>
 </div>
   </div>
  )
}

export default Footer