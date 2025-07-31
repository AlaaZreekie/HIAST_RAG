"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { admissionResultsAPI } from "@/lib/admissionResultsApi";
import { getAllAdmissions } from "@/lib/admissionsApi";
import { getAllMediaCategories } from "@/lib/mediaCategoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateAdmissionResultHeader from "@/components/admin/admissionResults/CreateAdmissionResultHeader";
import CreateAdmissionResultForm from "@/components/admin/admissionResults/CreateAdmissionResultForm";

const CreateAdmissionResultPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admissions, setAdmissions] = useState([]);
  const [mediaCategories, setMediaCategories] = useState([]);

  useEffect(() => {
    requireAdminAuth();
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [admissionsData, categoriesData] = await Promise.all([
        getAllAdmissions(),
        getAllMediaCategories(),
      ]);
      setAdmissions(Array.isArray(admissionsData) ? admissionsData : []);
      setMediaCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.message);
    }
  };

  const handleSubmit = async (resultData) => {
    try {
      setIsLoading(true);
      setError(null);
      await admissionResultsAPI.createResult(resultData);
      router.push("/admin/admissionResults");
    } catch (err) {
      console.error("Error creating admission result:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="p-6">
            <CreateAdmissionResultHeader />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmissionResultPage;
