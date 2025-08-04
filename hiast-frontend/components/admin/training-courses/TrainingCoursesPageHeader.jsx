"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const TrainingCoursesPageHeader = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <h1 className={`text-2xl font-bold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {t("trainingCourses.title")}
      </h1>
      <p className={`text-sm text-gray-600 mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
        {t("trainingCourses.subtitle")}
      </p>
      <div className={`${lang === "ar" ? "text-right" : "text-left"}`}>
        <button
          onClick={() => router.push("/admin/training-courses/create")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {t("trainingCourses.create")}
        </button>
      </div>
    </div>
  );
};

export default TrainingCoursesPageHeader; 