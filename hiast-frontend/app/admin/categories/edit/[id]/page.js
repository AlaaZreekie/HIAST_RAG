"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { updateCategory, getAllCategories } from "@/lib/categoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateCategoryHeader from "@/components/admin/categories/CreateCategoryHeader";
import CreateCategoryForm from "@/components/admin/categories/CreateCategoryForm";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id;
  const { t, lang } = useLanguage();

  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }
      loadCategory();
    };

    checkAuth();
  }, [router, categoryId]);

  const loadCategory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Loading category with ID:", categoryId);

      // Get all categories and find the one we need
      const allCategories = await getAllCategories();
      const foundCategory = allCategories.find((cat) => cat.Id === categoryId);

      if (!foundCategory) {
        throw new Error("Category not found");
      }

      console.log("Category loaded:", foundCategory);
      setCategory(foundCategory);
    } catch (error) {
      console.error("Error loading category:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (categoryData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // The categoryData already includes the ID from the form
      await updateCategory(categoryData);
      router.push("/admin/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { authAPI } = await import("@/lib/api");
      await authAPI.logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}
      >
        <DashboardHeader user={null} onLogout={handleLogout} />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <main
            className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${
              lang === "ar" ? "order-1" : "order-2"
            }`}
          >
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t("categories.loading")}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error && !category) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}
      >
        <DashboardHeader user={null} onLogout={handleLogout} />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <main
            className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${
              lang === "ar" ? "order-1" : "order-2"
            }`}
          >
            <div className="px-4 py-6 sm:px-0">
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader user={null} onLogout={handleLogout} />

      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <main
          className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${
            lang === "ar" ? "order-1" : "order-2"
          }`}
        >
          <div className="px-4 py-6 sm:px-0">
            {/* Header */}
            <CreateCategoryHeader isEditMode={true} />

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Form */}
            <CreateCategoryForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
              initialData={category}
              isEditMode={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
