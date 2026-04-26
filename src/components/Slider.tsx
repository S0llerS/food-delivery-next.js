"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    title: "get stronger each time",
    image: "/images/slide1.jpg",
  },
  {
    id: 2,
    title: "delivery everywhere",
    image: "/images/slide2.avif",
  },
  {
    id: 3,
    title: "eat healthy & be happy",
    image: "/images/slide3.avif",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % data.length),
      2000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] bg-lime-50">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-2 text-green-500 font-bold">
        <h1 className="text-5xl h-1/2 flex items-center justify-center text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button className="bg-green-500 text-white py-4 px-8">Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
