"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getAllPrograms, programsAPI } from "@/lib/programsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateProgramHeader from "@/components/admin/programs/CreateProgramHeader";
import CreateProgramForm from "@/components/admin/programs/CreateProgramForm";

const EditProgramPage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [program, setProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingProgram, setLoadingProgram] = useState(true);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const programId = unwrappedParams.id;

  useEffect(() => {
    requireAdminAuth();
    loadProgram();
  }, [programId]);

  const loadProgram = async () => {
    try {
      setLoadingProgram(true);
      const programs = await getAllPrograms();
      const foundProgram = programs.find((p) => p.Id === programId);

      if (!foundProgram) {
        setError(t("programs.notFound"));
        return;
      }

      setProgram(foundProgram);
    } catch (err) {
      console.error("Error loading program:", err);
      setError(err.message);
    } finally {
      setLoadingProgram(false);
    }
  };

  const handleSubmit = async (programData) => {
    try {
      setIsLoading(true);
      setError(null);
      await programsAPI.updateProgram(programData);
      router.push("/admin/programs");
    } catch (err) {
      console.error("Error updating program:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingProgram) {
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

  if (error && !program) {
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
                  onClick={() => router.push("/admin/programs")}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {t("programs.backToList")}
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
            <CreateProgramHeader isEditMode={true} />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <CreateProgramForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              initialData={program}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProgramPage;
