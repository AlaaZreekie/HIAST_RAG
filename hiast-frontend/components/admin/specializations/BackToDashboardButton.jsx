"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";

const BackToDashboardButton = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/admin/dashboard")}
      className={`inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
        lang === "ar" ? "flex-row-reverse" : ""
      }`}
    >
      <svg
        className={`w-4 h-4 ${lang === "ar" ? "ml-2" : "mr-2"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {t("specializations.backToDashboard")}
    </button>
  );
};

export default BackToDashboardButton; 