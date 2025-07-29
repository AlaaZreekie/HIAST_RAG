"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import {
  getAllCategories,
  deleteCategory,
  getCategoryNameInLanguage,
} from "@/lib/categoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CategoriesPageHeader from "@/components/admin/categories/CategoriesPageHeader";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import BackToDashboardButton from "@/components/admin/categories/BackToDashboardButton";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }
      loadCategories();
    };

    checkAuth();
  }, [router]);

  // Reload categories when page is focused (e.g., after creating a category)
  useEffect(() => {
    const handleFocus = () => {
      if (!isLoading) {
        loadCategories();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [isLoading]);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting to load categories...");

      const data = await getAllCategories();
      console.log("Categories loaded successfully:", data);

      // Ensure data is an array
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.warn("Categories data is not an array:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      setError(error.message);
      setCategories([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = () => {
    router.push("/admin/categories/create");
  };

  const handleEditCategory = (categoryId) => {
    router.push(`/admin/categories/edit/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm(t("categories.confirmDelete"))) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      await loadCategories(); // Reload the list
    } catch (error) {
      console.error("Error deleting category:", error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { authAPI } = await import("@/lib/api");
      await authAPI.logout();
      router.push("/admin/login");
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
            {/* Debug info */}
            <div className="mb-4 p-2 bg-yellow-100 text-xs">
              Language: {lang} | Layout: {lang === "ar" ? "RTL" : "LTR"}
            </div>

            {/* Header */}
            <CategoriesPageHeader onCreateCategory={handleCreateCategory} />

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Categories Table */}
            <CategoriesTable
              categories={categories}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
            />

            {/* Back to Dashboard Button */}
            <BackToDashboardButton />
          </div>
        </main>
      </div>
    </div>
  );
}
