import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";
import { useTranslations } from "next-intl";
import LangMenu from "./LangMenu";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const user = false;

  return (
    <div className="h-12 text-green-500 p-4 flex items-center justify-between border-b-2 border-b-green-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-2">
        <Link href="/">{t("homepage")}</Link>
        <Link href="/menu">{t("menu")}</Link>
        <Link href="/">{t("contact")}</Link>

        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-lime-200 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>0987987</span>
        </div>
      </div>

      {/* LOGO */}
      <div className="text-lg md:font-bold flex-1 md:text-center">
        <Link href="/">Matteo's Food</Link>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>

      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-2">
        <UserLinks />
        <CartIcon />

        <Link href="/add">{t("add")}</Link>

        <LangMenu />
      </div>
    </div>
  );
};

export default Navbar;
