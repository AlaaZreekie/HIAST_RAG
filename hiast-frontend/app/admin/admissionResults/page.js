"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import {
  getAllAdmissionResults,
  admissionResultsAPI,
} from "@/lib/admissionResultsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import AdmissionResultsPageHeader from "@/components/admin/admissionResults/AdmissionResultsPageHeader";
import AdmissionResultsTable from "@/components/admin/admissionResults/AdmissionResultsTable";
import BackToDashboardButton from "@/components/admin/admissionResults/BackToDashboardButton";

const AdmissionResultsPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    requireAdminAuth();
    loadResults();
  }, []);

  // Reload results when returning to the page
  useEffect(() => {
    const handleFocus = () => {
      loadResults();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const loadResults = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllAdmissionResults();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading admission results:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditResult = (resultId) => {
    router.push(`/admin/admissionResults/edit/${resultId}`);
  };

  const handleDeleteResult = async (resultId) => {
    if (window.confirm(t("admissionResults.deleteConfirm"))) {
      try {
        await admissionResultsAPI.deleteResult(resultId);
        await loadResults(); // Reload the list
      } catch (error) {
        console.error("Failed to delete admission result:", error);
        alert(t("admissionResults.deleteError"));
      }
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
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">
                  {t("admissionResults.loading")}
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
            <AdmissionResultsPageHeader />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <AdmissionResultsTable
              results={results}
              onEditResult={handleEditResult}
              onDeleteResult={handleDeleteResult}
            />
            <BackToDashboardButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionResultsPage;
