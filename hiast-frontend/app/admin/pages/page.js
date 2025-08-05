"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import PagesPageHeader from "@/components/admin/pages/PagesPageHeader";
import PagesTable from "@/components/admin/pages/PagesTable";
import BackToDashboardButton from "@/components/admin/pages/BackToDashboardButton";
import { pagesAPI } from "@/lib/pagesApi";

const PagesPage = () => {
  const { lang } = useLanguage();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pagesAPI.getAllPages();
      console.log("Pages data received:", data);
      setPages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading pages:", err);
      setError(err.message || "Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      loadPages();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleEditPage = (pageId) => {
    window.location.href = `/admin/pages/edit/${pageId}`;
  };

  const handleDeletePage = async (pageId) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        await pagesAPI.deletePage(pageId);
        await loadPages();
      } catch (err) {
        console.error("Error deleting page:", err);
        alert("Failed to delete page");
      }
    }
  };

  if (loading) {
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
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
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
            <PagesPageHeader />

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <PagesTable
              pages={pages}
              onEdit={handleEditPage}
              onDelete={handleDeletePage}
            />

            <BackToDashboardButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesPage;
