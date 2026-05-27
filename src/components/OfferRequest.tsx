"use client";

import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

const OfferRequest = () => {
  const t = useTranslations("App");

  return (
    <div>
      <button
        className="bg-green-500 rounded-md py-3 px-6 hover:bg-green-700 duration-200 cursor-pointer"
        onClick={() => toast.success(t("confirm"))}
      >
        {t("request")}
      </button>
    </div>
  );
};

export default OfferRequest;
