"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getAllFaqCategories, faqCategoriesAPI } from "@/lib/faqCategoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import FaqCategoriesPageHeader from "@/components/admin/faqCategories/FaqCategoriesPageHeader";
import FaqCategoriesTable from "@/components/admin/faqCategories/FaqCategoriesTable";
import BackToDashboardButton from "@/components/admin/faqCategories/BackToDashboardButton";

const FaqCategoriesPage = () => {
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
      const data = await getAllFaqCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading FAQ categories:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = (categoryId) => {
    router.push(`/admin/faqCategories/edit/${categoryId}`);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm(t("faqCategories.deleteConfirm"))) {
      return;
    }

    try {
      await faqCategoriesAPI.deleteCategory(categoryId);
      await loadCategories();
    } catch (err) {
      console.error("Error deleting FAQ category:", err);
      alert(t("faqCategories.deleteError"));
    }
  };

  if (isLoading) {
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
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  {t("faqCategories.loading")}
                </p>
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
            <FaqCategoriesPageHeader />

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <FaqCategoriesTable
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

export default FaqCategoriesPage;
