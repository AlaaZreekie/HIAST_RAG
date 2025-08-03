"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import {
  getAllSpecializations,
  specializationsAPI,
} from "@/lib/specializationsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateSpecializationHeader from "@/components/admin/specializations/CreateSpecializationHeader";
import CreateSpecializationForm from "@/components/admin/specializations/CreateSpecializationForm";

const EditSpecializationPage = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const specializationId = params.id;

  const [specialization, setSpecialization] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check admin authentication
  requireAdminAuth(router);

  useEffect(() => {
    const loadSpecialization = async () => {
      try {
        setLoading(true);
        const specializations = await getAllSpecializations();
        const foundSpecialization = specializations.find(
          (spec) => spec.Id === specializationId
        );

        if (!foundSpecialization) {
          setError(t("specializations.notFound"));
          return;
        }

        setSpecialization(foundSpecialization);
      } catch (error) {
        console.error("Error loading specialization:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (specializationId) {
      loadSpecialization();
    }
  }, [specializationId, t]);

  const handleSubmit = async (specializationData) => {
    try {
      setIsLoading(true);
      setError(null);

      await specializationsAPI.updateSpecialization(specializationData);

      alert(t("specializations.updateSuccess"));
      router.push("/admin/specializations");
    } catch (error) {
      console.error("Error updating specialization:", error);
      setError(error.message);
      alert(t("specializations.updateError"));
    } finally {
      setIsLoading(false);
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
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">
                  {t("specializations.loading")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800">{error}</p>
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
            <div className={`flex ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              <div className="flex-1">
                <CreateSpecializationHeader isEditMode={true} />
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}
                <CreateSpecializationForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  error={error}
                  initialData={specialization}
                  isEditMode={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSpecializationPage;
