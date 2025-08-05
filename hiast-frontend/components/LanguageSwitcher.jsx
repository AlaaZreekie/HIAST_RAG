"use client";
import { useLanguage } from "@/components/LanguageProvider";

const LanguageSwitcher = ({ className = "" }) => {
  const { lang, setLang } = useLanguage();

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => handleLanguageChange("ar")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          lang === "ar"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        العربية
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          lang === "en"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher; 