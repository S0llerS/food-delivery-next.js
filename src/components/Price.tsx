"use client";

import React, { useEffect, useState } from "react";

type Props = {
  price: number;
  id: number;
  options?: { title: String; additionalPrice: number }[];
};

const Price = ({ price, id, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price),
    );
  }, [quantity, selected, options, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">€{total.toFixed(2)}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
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
          <span>Quantity</span>
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
        <button className="uppercase w-56 bg-green-500 text-white p-3 ring-1 ring-green-500 cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
