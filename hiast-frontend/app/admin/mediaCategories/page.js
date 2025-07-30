"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { getAllMediaCategories } from "@/lib/mediaCategoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import MediaCategoriesPageHeader from "@/components/admin/mediaCategories/MediaCategoriesPageHeader";
import MediaCategoriesTable from "@/components/admin/mediaCategories/MediaCategoriesTable";
import BackToDashboardButton from "@/components/admin/mediaCategories/BackToDashboardButton";

export default function MediaCategoriesPage() {
  const router = useRouter();
  const [mediaCategories, setMediaCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }
      loadMediaCategories();
    };

    checkAuth();
  }, [router]);

  // Reload media categories when page is focused (e.g., after creating a category)
  useEffect(() => {
    const handleFocus = () => {
      if (!isLoading) {
        loadMediaCategories();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [isLoading]);

  const loadMediaCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting to load media categories...");

      const response = await getAllMediaCategories();
      console.log("Media categories loaded successfully:", response);

      const categoriesData = response || [];
      console.log("Extracted media categories:", categoriesData);

      setMediaCategories(categoriesData);
    } catch (error) {
      console.error("Error loading media categories:", error);
      setError(error.message);
      setMediaCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = () => {
    router.push("/admin/mediaCategories/create");
  };

  const handleEditCategory = (categoryId) => {
    router.push(`/admin/mediaCategories/edit/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm(t("mediaCategories.confirmDelete"))) {
      return;
    }

    try {
      const { mediaCategoriesAPI } = await import("@/lib/mediaCategoriesApi");
      await mediaCategoriesAPI.deleteMediaCategory(categoryId);
      await loadMediaCategories(); // Reload the list
    } catch (error) {
      console.error("Error deleting media category:", error);
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
                <p className="mt-4 text-gray-600">
                  {t("mediaCategories.loading")}
                </p>
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
            <MediaCategoriesPageHeader
              onCreateCategory={handleCreateCategory}
            />

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Media Categories Table */}
            <MediaCategoriesTable
              mediaCategories={mediaCategories}
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
