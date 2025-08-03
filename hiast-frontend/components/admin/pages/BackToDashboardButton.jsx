"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const BackToDashboardButton = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <div className="mt-6">
      <button
        onClick={() => router.push("/admin/dashboard")}
        className={`inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 ${
          lang === "ar" ? "flex-row-reverse" : "flex-row"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t("common.backToDashboard")}
      </button>
    </div>
  );
};

export default BackToDashboardButton; 