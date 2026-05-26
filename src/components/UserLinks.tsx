"use client";

import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const UserLinks = () => {
  const t = useTranslations("Navbar");
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/orders">{t("orders")}</Link>
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>
            {t("logout")}
          </span>
        </div>
      ) : (
        <Link href="/login">{t("login")}</Link>
      )}
    </div>
  );
};

export default UserLinks;
