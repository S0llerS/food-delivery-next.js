import { ProductType } from "@/types/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (category: string) => {
  const res = await fetch(
    `http://localhost:3000/api/products?cat=${category}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

type Props = {
  params: Promise<{ category: string }>;
};

const CategoryPage = async ({ params }: Props) => {
  const t = await getTranslations("Menu");

  const { category } = await params;
  const products: ProductType[] = await getData(category);

  return (
    <div className="flex flex-wrap text-green-500">
      {products.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-green-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group hover:bg-lime-50 transition-all duration-200"
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image
                src={item.img}
                alt=""
                fill
                className="object-contain hover:rotate-3 transition-all duration-400"
              />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">€{item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-green-500 text-white p-2 rounded-md cursor-pointer hover:scale-105 hover:rotate-2 transition-all duration-200">
              {t("add_to_cart")}
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
