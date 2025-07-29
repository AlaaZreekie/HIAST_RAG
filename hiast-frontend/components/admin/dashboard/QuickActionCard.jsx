"use client";
import { useLanguage } from "@/components/LanguageProvider";

const QuickActionCard = ({ 
  icon, 
  title, 
  description, 
  onClick,
  order 
}) => {
  const { t, lang } = useLanguage();

  return (
    <div className={`admin-card p-6 cursor-pointer hover:shadow-md transition-shadow ${order}`}>
      <div className={`flex items-center ${
        lang === "ar" ? "flex-row-reverse" : "flex-row"
      }`}>
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className={`${
          lang === "ar" ? "mr-4 text-right" : "ml-4 text-left"
        }`}>
          <h3 className="text-lg font-medium text-gray-900">
            {t(title)}
          </h3>
          <p className="text-sm text-gray-500">
            {t(description)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard; 