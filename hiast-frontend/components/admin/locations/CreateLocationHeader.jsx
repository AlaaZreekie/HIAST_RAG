"use client";
import { useLanguage } from "@/components/LanguageProvider";
import BackToDashboardButton from "./BackToDashboardButton";

const CreateLocationHeader = ({ isEditMode = false }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <BackToDashboardButton />
      <div>
        <h1 className={`text-2xl font-bold text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
          {isEditMode ? t("locations.editTitle") : t("locations.createTitle")}
        </h1>
        <p className={`mt-1 text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
          {isEditMode ? t("locations.editSubtitle") : t("locations.createSubtitle")}
        </p>
      </div>
    </div>
  );
};

export default CreateLocationHeader; 