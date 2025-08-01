"use client";
import { useLanguage } from "@/components/LanguageProvider";

const CreatePageHeader = ({ isEditMode = false }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {isEditMode ? t("pages.form.editTitle") : t("pages.form.title")}
      </h1>
      <p className="text-sm text-gray-600">
        {isEditMode ? t("pages.form.editSubtitle") : t("pages.form.subtitle")}
      </p>
    </div>
  );
};

export default CreatePageHeader; 