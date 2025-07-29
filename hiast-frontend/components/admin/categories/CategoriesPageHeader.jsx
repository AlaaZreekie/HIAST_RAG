"use client";
import { useLanguage } from "@/components/LanguageProvider";

const CategoriesPageHeader = ({ onCreateCategory }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className={`flex items-center ${
        lang === "ar" ? "order-2" : "order-1"
      }`}>
        <h1 className={`text-2xl font-bold text-gray-900 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("categories.title")}
        </h1>
      </div>
      <div className={`flex items-center ${
        lang === "ar" ? "order-1" : "order-2"
      }`}>
        <button
          onClick={onCreateCategory}
          className="admin-button admin-button-primary"
        >
          {t("categories.create")}
        </button>
      </div>
    </div>
  );
};

export default CategoriesPageHeader; 