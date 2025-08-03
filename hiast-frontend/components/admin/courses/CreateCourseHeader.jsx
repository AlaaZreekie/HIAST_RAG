"use client";
import { useLanguage } from "@/components/LanguageProvider";

const CreateCourseHeader = ({ isEditMode = false }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {isEditMode ? t("courses.form.editTitle") : t("courses.form.title")}
      </h1>
      <p className="text-sm text-gray-600">
        {isEditMode ? t("courses.form.editSubtitle") : t("courses.form.subtitle")}
      </p>
    </div>
  );
};

export default CreateCourseHeader; 