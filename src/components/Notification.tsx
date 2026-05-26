import { useTranslations } from "next-intl";
import React from "react";

const Notification = () => {
  const t = useTranslations("Notification");

  return (
    <div className="h-12 bg-green-500 text-white px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer">
      {t("notification")}
    </div>
  );
};

export default Notification;
