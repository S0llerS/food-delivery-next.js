import Image from 'next/image'
import React from 'react'
import CountDown from './CountDown'

const Offer = () => {
  return (
    <div className='bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url("/offerBg.png")] md:h-[70vh]'>
      {/* TEXT CONTAINER */}
      <div className='flex-1 text-white flex flex-col justify-center items-center text-center gap-8 p-6'>
        <h1 className='text-5xl font-bold xl:text-6xl'>Limited Protein Snack</h1>
        <p>Overloaded with protein so much that anyone who tries it is going to become Gigachad instantly.</p>
        <CountDown />
        <button className='bg-green-500 rounded-md py-3 px-6'>Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className='flex-1 w-full relative md:h-full'>
        <Image src="/images/offerProduct.png" alt="" fill className='object-contain' />
      </div>
    </div>
  )
}

export default Offer
