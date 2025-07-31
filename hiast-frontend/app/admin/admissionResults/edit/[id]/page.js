"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import {
  getAllAdmissionResults,
  admissionResultsAPI,
} from "@/lib/admissionResultsApi";
import { getAllAdmissions } from "@/lib/admissionsApi";
import { getAllMediaCategories } from "@/lib/mediaCategoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateAdmissionResultHeader from "@/components/admin/admissionResults/CreateAdmissionResultHeader";
import CreateAdmissionResultForm from "@/components/admin/admissionResults/CreateAdmissionResultForm";

const EditAdmissionResultPage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingResult, setLoadingResult] = useState(true);
  const [admissions, setAdmissions] = useState([]);
  const [mediaCategories, setMediaCategories] = useState([]);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const resultId = unwrappedParams.id;

  useEffect(() => {
    requireAdminAuth();
    loadData();
  }, [resultId]);

  const loadData = async () => {
    try {
      setLoadingResult(true);
      const [results, admissionsData, categoriesData] = await Promise.all([
        getAllAdmissionResults(),
        getAllAdmissions(),
        getAllMediaCategories(),
      ]);

      const foundResult = results.find((r) => r.Id === resultId);
      if (!foundResult) {
        setError(t("admissionResults.notFound"));
        return;
      }

      setResult(foundResult);
      setAdmissions(Array.isArray(admissionsData) ? admissionsData : []);
      setMediaCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error("Error loading admission result:", err);
      setError(err.message);
    } finally {
      setLoadingResult(false);
    }
  };

  const handleSubmit = async (resultData) => {
    try {
      setIsLoading(true);
      setError(null);
      await admissionResultsAPI.updateResult(resultData);
      router.push("/admin/admissionResults");
    } catch (err) {
      console.error("Error updating admission result:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingResult) {
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

  if (error && !result) {
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
                  onClick={() => router.push("/admin/admissionResults")}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {t("admissionResults.backToList")}
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
            <CreateAdmissionResultHeader isEditMode={true} />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <CreateAdmissionResultForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              admissions={admissions}
              mediaCategories={mediaCategories}
              initialData={result}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmissionResultPage;
