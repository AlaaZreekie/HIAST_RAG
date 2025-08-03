"use client";
import { useLanguage } from "@/components/LanguageProvider";

const MediaPageHeader = ({ onCreateMedia }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className={`flex items-center ${
        lang === "ar" ? "order-2" : "order-1"
      }`}>
        <h1 className={`text-2xl font-bold text-gray-900 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("media.title")}
        </h1>
      </div>
      <div className={`flex items-center ${
        lang === "ar" ? "order-1" : "order-2"
      }`}>
        <button
          onClick={onCreateMedia}
          className="admin-button admin-button-primary"
        >
          {t("media.create")}
        </button>
      </div>
    </div>
  );
};

export default MediaPageHeader; 