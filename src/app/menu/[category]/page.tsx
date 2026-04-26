import { pizzas } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryPage = () => {
  return (
    <div className="flex flex-wrap text-green-500">
      {pizzas.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-green-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group hover:bg-lime-50 transition-all duration-200"
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain hover:rotate-3 transition-all duration-400" />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">€{item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-green-500 text-white p-2 rounded-md cursor-pointer hover:scale-105 hover:rotate-2 transition-all duration-200">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
