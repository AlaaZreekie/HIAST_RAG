"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import LanguagesPageHeader from "@/components/admin/languages/LanguagesPageHeader";
import LanguagesTable from "@/components/admin/languages/LanguagesTable";
import BackToDashboardButton from "@/components/admin/languages/BackToDashboardButton";
import { languagesAPI } from "@/lib/languagesApi";

const LanguagesPage = () => {
  const { lang } = useLanguage();
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLanguages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await languagesAPI.getAllLanguages();
      if (Array.isArray(data)) {
        setLanguages(data);
      } else {
        setLanguages([]);
      }
    } catch (err) {
      console.error("Error loading languages:", err);
      setError(err.message || "Failed to load languages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      loadLanguages();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleEditLanguage = (languageId) => {
    window.location.href = `/admin/languages/edit/${languageId}`;
  };

  const handleDeleteLanguage = async (languageId) => {
    if (window.confirm("Are you sure you want to delete this language?")) {
      try {
        await languagesAPI.deleteLanguage(languageId);
        await loadLanguages();
      } catch (err) {
        console.error("Error deleting language:", err);
        alert("Failed to delete language");
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
            <LanguagesPageHeader />

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <LanguagesTable
              languages={languages}
              onEdit={handleEditLanguage}
              onDelete={handleDeleteLanguage}
            />

            <BackToDashboardButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesPage;
