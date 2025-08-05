"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getAllPrograms, programsAPI } from "@/lib/programsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import ProgramsPageHeader from "@/components/admin/programs/ProgramsPageHeader";
import ProgramsTable from "@/components/admin/programs/ProgramsTable";

const ProgramsPage = () => {
  const { t, lang } = useLanguage();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    requireAdminAuth();
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Loading programs...");
      const data = await getAllPrograms();
      console.log("Programs data received:", data);
      setPrograms(data);
    } catch (err) {
      console.error("Error loading programs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (programId) => {
    try {
      await programsAPI.deleteProgram(programId);
      await loadPrograms(); // Reload the list
    } catch (err) {
      console.error("Error deleting program:", err);
      alert(t("programs.deleteError"));
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
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">{t("programs.loading")}</p>
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
              <div className="text-center py-8">
                <p className="text-red-600">
                  {t("programs.error")}: {error}
                </p>
                <button
                  onClick={loadPrograms}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {t("programs.retry")}
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
            <ProgramsPageHeader />
            <ProgramsTable programs={programs} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
