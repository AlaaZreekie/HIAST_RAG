"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const BackToDashboardButton = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <button
      onClick={() => router.push("/admin/dashboard")}
      className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      <svg
        className={`h-4 w-4 ${lang === "ar" ? "ml-2" : "mr-2"}`}
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
      {t("programs.backToDashboard")}
    </button>
  );
};

export default BackToDashboardButton; 