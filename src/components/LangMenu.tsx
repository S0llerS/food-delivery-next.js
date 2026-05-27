"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

const LangMenu = () => {
  const t = useTranslations("Navbar");
  const [toggle, setToggle] = useState(false);

  const match = document.cookie.match(/(^| )locale=([^;]+)/);
  const currentLocale = match ? decodeURIComponent(match[2]) : 'en';

  const handleLang = (locale: string) => {
    document.cookie = `locale=${locale}; Path=/;`;
    window.location.reload();
  };

  return (
    <div className="">
      <Image
        src={`/lang/${currentLocale}.png`}
        alt=""
        width={48}
        height={48}
        className="hover:scale-110 duration-200 cursor-pointer"
        onClick={(e) => {
          setToggle(!toggle);
        }}
      />

      {toggle && (
        <div className="absolute bg-white z-10 border-2 rounded-md p-2 text-black">
          <span className="block font-bold text-center">{t("language")}</span>
          <div className="">
            <div className="flex hover:scale-105 duration-200 cursor-pointer" onClick={() => handleLang("en")}>
              <Image src="/lang/en.png" alt="" width={32} height={32} />
              <span className="flex items-center text-black">English</span>
            </div>
            <div className="flex hover:scale-105 duration-200 cursor-pointer" onClick={() => handleLang("bg")}>
              <Image src="/lang/bg.png" alt="" width={32} height={32} />
              <span className="flex items-center text-black">Български</span>
            </div>
            <div className="flex hover:scale-105 duration-200 cursor-pointer" onClick={() => handleLang("ru")}>
              <Image src="/lang/ru.png" alt="" width={32} height={32} />
              <span className="flex items-center text-black">Русский</span>
            </div>
            <div className="flex hover:scale-105 duration-200 cursor-pointer" onClick={() => handleLang("ua")}>
              <Image src="/lang/ua.png" alt="" width={32} height={32} />
              <span className="flex items-center text-black">Українська</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LangMenu;
