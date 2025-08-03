"use client";
import { useLanguage } from "@/components/LanguageProvider";

const CreateAdmissionExamHeader = ({ isEditMode = false }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <h1 className={`text-2xl font-bold text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {isEditMode ? t("admissionExams.editTitle") : t("admissionExams.createTitle")}
      </h1>
      <p className={`mt-1 text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {isEditMode ? t("admissionExams.editSubtitle") : t("admissionExams.createSubtitle")}
      </p>
    </div>
  );
};

export default CreateAdmissionExamHeader; 