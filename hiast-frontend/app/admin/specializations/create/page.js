"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { specializationsAPI } from "@/lib/specializationsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateSpecializationHeader from "@/components/admin/specializations/CreateSpecializationHeader";
import CreateSpecializationForm from "@/components/admin/specializations/CreateSpecializationForm";

const CreateSpecializationPage = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check admin authentication
  requireAdminAuth(router);

  const handleSubmit = async (specializationData) => {
    try {
      setIsLoading(true);
      setError(null);

      await specializationsAPI.createSpecialization(specializationData);

      alert(t("specializations.createSuccess"));
      router.push("/admin/specializations");
    } catch (error) {
      console.error("Error creating specialization:", error);
      setError(error.message);
      alert(t("specializations.createError"));
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
            <div className={`flex ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              <div className="flex-1">
                <CreateSpecializationHeader />
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}
                <CreateSpecializationForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSpecializationPage;
