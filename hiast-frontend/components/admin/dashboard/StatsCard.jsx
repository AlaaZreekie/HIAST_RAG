"use client";
import { useLanguage } from "@/components/LanguageProvider";

const StatsCard = ({ 
  icon, 
  title, 
  value, 
  bgColor = "bg-blue-100", 
  iconColor = "text-blue-600",
  order 
}) => {
  const { t, lang } = useLanguage();

  return (
    <div className={`admin-card p-6 ${order}`}>
      <div className={`flex items-center ${
        lang === "ar" ? "flex-row-reverse" : "flex-row"
      }`}>
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 ${bgColor} rounded-md flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <div className={`${
          lang === "ar" ? "mr-4 text-right" : "ml-4 text-left"
        }`}>
          <p className="text-sm font-medium text-gray-500">
            {t(title)}
          </p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 