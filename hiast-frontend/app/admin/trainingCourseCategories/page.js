"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getAllTrainingCourseCategories, trainingCourseCategoriesAPI } from "@/lib/trainingCourseCategoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import TrainingCourseCategoriesPageHeader from "@/components/admin/trainingCourseCategories/TrainingCourseCategoriesPageHeader";
import TrainingCourseCategoriesTable from "@/components/admin/trainingCourseCategories/TrainingCourseCategoriesTable";
import BackToDashboardButton from "@/components/admin/trainingCourseCategories/BackToDashboardButton";

const TrainingCourseCategoriesPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    requireAdminAuth();
    loadCategories();
  }, []);

  // Reload categories when returning to the page
  useEffect(() => {
    const handleFocus = () => {
      loadCategories();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllTrainingCourseCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading training course categories:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = (categoryId) => {
    router.push(`/admin/trainingCourseCategories/edit/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm(t("trainingCourseCategories.deleteConfirm"))) {
      try {
        await trainingCourseCategoriesAPI.delete(categoryId);
        await loadCategories(); // Reload the list
      } catch (error) {
        console.error("Failed to delete training course category:", error);
        alert(t("trainingCourseCategories.deleteError"));
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
        <DashboardHeader />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
            <div className="p-6">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">{t("trainingCourseCategories.loading")}</p>
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
            <TrainingCourseCategoriesPageHeader />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <TrainingCourseCategoriesTable
              categories={categories}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
            />
            <BackToDashboardButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCourseCategoriesPage; 