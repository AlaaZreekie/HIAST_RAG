"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { trainingCourseCategoriesAPI } from "@/lib/trainingCourseCategoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateTrainingCourseCategoryHeader from "@/components/admin/trainingCourseCategories/CreateTrainingCourseCategoryHeader";
import CreateTrainingCourseCategoryForm from "@/components/admin/trainingCourseCategories/CreateTrainingCourseCategoryForm";

const CreateTrainingCourseCategoryPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    requireAdminAuth();
  }, []);

  const handleSubmit = async (categoryData) => {
    try {
      setIsLoading(true);
      setError(null);
      await trainingCourseCategoriesAPI.createCategory(categoryData);
      router.push("/admin/training-course-categories");
    } catch (err) {
      console.error("Error creating training course category:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="p-6">
            <CreateTrainingCourseCategoryHeader isEditMode={false} />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <CreateTrainingCourseCategoryForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              isEditMode={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrainingCourseCategoryPage;
