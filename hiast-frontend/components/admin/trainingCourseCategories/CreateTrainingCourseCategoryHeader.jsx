"use client";
import { useLanguage } from "@/components/LanguageProvider";
import BackToDashboardButton from "./BackToDashboardButton";

const CreateTrainingCourseCategoryHeader = ({ isEditMode = false }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : ""}`}>
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {isEditMode ? t("trainingCourseCategories.editTitle") : t("trainingCourseCategories.createTitle")}
          </h1>
          <p className={`mt-1 text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {isEditMode ? t("trainingCourseCategories.editSubtitle") : t("trainingCourseCategories.createSubtitle")}
          </p>
        </div>
        <BackToDashboardButton />
      </div>
    </div>
  );
};

export default CreateTrainingCourseCategoryHeader; 