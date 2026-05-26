import Image from "next/image";
import React, { useTransition } from "react";
import CountDown from "./CountDown";
import { useTranslations } from "next-intl";

const Offer = () => {
  const t = useTranslations("App");

  return (
    <div className='bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url("/offerBg.png")] md:h-[70vh]'>
      {/* TEXT CONTAINER */}
      <div className="flex-1 text-white flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-5xl font-bold xl:text-6xl">{t("offer_title")}</h1>
        <p>{t("offer_desc")}</p>
        <CountDown />
        <button className="bg-green-500 rounded-md py-3 px-6">
          {t("order_now")}
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image
          src="/images/offerProduct.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Offer;
