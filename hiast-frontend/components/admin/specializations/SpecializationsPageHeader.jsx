"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";

const SpecializationsPageHeader = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();

  return (
    <div className="mb-6">
      <div className={`flex justify-between items-center ${
        lang === "ar" ? "flex-row-reverse" : ""
      }`}>
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}>
            {t("specializations.title")}
          </h1>
          <p className={`text-gray-600 mt-1 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}>
            {t("specializations.subtitle")}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/specializations/create")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {t("specializations.create")}
        </button>
      </div>
    </div>
  );
};

export default SpecializationsPageHeader; 