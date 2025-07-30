"use client";
import { useLanguage } from "@/components/LanguageProvider";
import BackToDashboardButton from "./BackToDashboardButton";

const CreateSpecializationHeader = ({ isEditMode = false }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <div className={`flex justify-between items-center ${
        lang === "ar" ? "flex-row-reverse" : ""
      }`}>
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}>
            {isEditMode ? t("specializations.edit") : t("specializations.create")}
          </h1>
          <p className={`text-gray-600 mt-1 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}>
            {isEditMode 
              ? t("specializations.editSubtitle") 
              : t("specializations.createSubtitle")
            }
          </p>
        </div>
        <BackToDashboardButton />
      </div>
    </div>
  );
};

export default CreateSpecializationHeader; 