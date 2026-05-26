"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const t = useTranslations("Product")

  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options?.length) {
      setTotal(
        quantity * (+product.price + product.options[selected].additionalPrice),
      );
    }
  }, [quantity, selected, product]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    });

    toast.success("The product added to the cart!");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">€{total}</h2>
      {/* product.OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((option, index) => (
            <button
              className="min-w-[6rem] p-2 ring-1 ring-green-400 rounded-md cursor-pointer"
              style={{
                background: selected === index ? "#22c55e" : "white",
                color: selected === index ? "white" : "#22c55e",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-green-500">
          <span>{t("quantity")}</span>
          <div className="flex gap-4 items-center">
            <button
              className="cursor-pointer"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              className="cursor-pointer"
              onClick={() => setQuantity((prev) => Math.min(9, prev + 1))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-green-500 text-white p-3 ring-1 ring-green-500 cursor-pointer"
          onClick={handleCart}
        >
          {t("add_to_cart")}
        </button>
      </div>
    </div>
  );
};

export default Price;
