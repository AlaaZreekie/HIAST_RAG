"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import {
  getAllTrainingCourseCategories,
  trainingCourseCategoriesAPI,
} from "@/lib/trainingCourseCategoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateTrainingCourseCategoryHeader from "@/components/admin/trainingCourseCategories/CreateTrainingCourseCategoryHeader";
import CreateTrainingCourseCategoryForm from "@/components/admin/trainingCourseCategories/CreateTrainingCourseCategoryForm";

const EditTrainingCourseCategoryPage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(true);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const categoryId = unwrappedParams.id;

  useEffect(() => {
    requireAdminAuth();
    loadCategory();
  }, [categoryId]);

  const loadCategory = async () => {
    try {
      setLoadingCategory(true);
      const categories = await getAllTrainingCourseCategories();
      const foundCategory = categories.find((c) => c.Id === categoryId);

      if (!foundCategory) {
        setError(t("trainingCourseCategories.notFound"));
        return;
      }

      setCategory(foundCategory);
    } catch (err) {
      console.error("Error loading training course category:", err);
      setError(err.message);
    } finally {
      setLoadingCategory(false);
    }
  };

  const handleSubmit = async (categoryData) => {
    try {
      setIsLoading(true);
      setError(null);
      await trainingCourseCategoriesAPI.updateTrainingCourseCategory(
        categoryData
      );
      router.push("/admin/training-course-categories");
    } catch (err) {
      console.error("Error updating training course category:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingCategory) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}
      >
        <DashboardHeader />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
            <div className="p-6">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">
                  {t("trainingCourseCategories.loading")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !category) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}
      >
        <DashboardHeader />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
            <div className="p-6">
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() =>
                    router.push("/admin/training-course-categories")
                  }
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {t("trainingCourseCategories.backToList")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="p-6">
            <CreateTrainingCourseCategoryHeader isEditMode={true} />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <CreateTrainingCourseCategoryForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              initialData={category}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrainingCourseCategoryPage;
