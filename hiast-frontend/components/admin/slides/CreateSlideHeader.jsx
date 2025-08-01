"use client";
import { useLanguage } from "@/components/LanguageProvider";

const CreateSlideHeader = ({ isEditMode = false }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {isEditMode ? t("slides.form.editTitle") : t("slides.form.title")}
      </h1>
      <p className="text-sm text-gray-600">
        {isEditMode ? t("slides.form.editSubtitle") : t("slides.form.subtitle")}
      </p>
    </div>
  );
};

export default CreateSlideHeader; 