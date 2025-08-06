"use client";
import { useLanguage } from "@/components/LanguageProvider";

const LanguageSwitcher = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      {lang === "ar" ? (
        <>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
          
        </>
      ) : (
        <>
          
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher; 