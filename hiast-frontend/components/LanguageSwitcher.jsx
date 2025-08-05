"use client";
import { useRouter } from "next/navigation";

const LanguageSwitcher = ({ currentLang = "en", className = "" }) => {
  const router = useRouter();

  const handleLanguageChange = (newLang) => {
    // Set cookie and refresh page for SSR compatibility
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => handleLanguageChange("ar")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          currentLang === "ar"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        العربية
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          currentLang === "en"
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