"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import {
  getAllSpecializations,
  specializationsAPI,
} from "@/lib/specializationsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import SpecializationsPageHeader from "@/components/admin/specializations/SpecializationsPageHeader";
import SpecializationsTable from "@/components/admin/specializations/SpecializationsTable";
import BackToDashboardButton from "@/components/admin/specializations/BackToDashboardButton";

const SpecializationsPage = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check admin authentication
  useEffect(() => {
    requireAdminAuth(router);
  }, [router]);

  const loadSpecializations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllSpecializations();
      setSpecializations(data);
    } catch (error) {
      console.error("Error loading specializations:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecializations();
  }, []);

  // Reload specializations when page gains focus
  useEffect(() => {
    const handleFocus = () => {
      loadSpecializations();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleCreateSpecialization = () => {
    router.push("/admin/specializations/create");
  };

  const handleEditSpecialization = (id) => {
    router.push(`/admin/specializations/edit/${id}`);
  };

  const handleDeleteSpecialization = async (id) => {
    if (confirm(t("specializations.confirmDelete"))) {
      try {
        await specializationsAPI.deleteSpecialization(id);
        await loadSpecializations();
        alert(t("specializations.deleteSuccess"));
      } catch (error) {
        console.error("Error deleting specialization:", error);
        alert(t("specializations.deleteError"));
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
                <SpecializationsPageHeader />
                {error && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}
                <SpecializationsTable
                  specializations={specializations}
                  onEditSpecialization={handleEditSpecialization}
                  onDeleteSpecialization={handleDeleteSpecialization}
                />
              </div>
              <div className={`w-64 ${lang === "ar" ? "mr-6" : "ml-6"}`}>
                <BackToDashboardButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationsPage;
