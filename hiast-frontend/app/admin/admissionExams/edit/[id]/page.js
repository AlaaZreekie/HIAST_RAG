"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import {
  getAllAdmissionExams,
  admissionExamsAPI,
} from "@/lib/admissionExamsApi";
import { getAllAdmissions } from "@/lib/admissionsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateAdmissionExamHeader from "@/components/admin/admissionExams/CreateAdmissionExamHeader";
import CreateAdmissionExamForm from "@/components/admin/admissionExams/CreateAdmissionExamForm";

const EditAdmissionExamPage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [exam, setExam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingExam, setLoadingExam] = useState(true);
  const [admissions, setAdmissions] = useState([]);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const examId = unwrappedParams.id;

  useEffect(() => {
    requireAdminAuth();
    loadData();
  }, [examId]);

  const loadData = async () => {
    try {
      setLoadingExam(true);
      const [exams, admissionsData] = await Promise.all([
        getAllAdmissionExams(),
        getAllAdmissions(),
      ]);

      const foundExam = exams.find((e) => e.Id === examId);
      if (!foundExam) {
        setError(t("admissionExams.notFound"));
        return;
      }

      setExam(foundExam);
      setAdmissions(Array.isArray(admissionsData) ? admissionsData : []);
    } catch (err) {
      console.error("Error loading admission exam:", err);
      setError(err.message);
    } finally {
      setLoadingExam(false);
    }
  };

  const handleSubmit = async (examData) => {
    try {
      setIsLoading(true);
      setError(null);
      await admissionExamsAPI.updateExam(examData);
      router.push("/admin/admissionExams");
    } catch (err) {
      console.error("Error updating admission exam:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingExam) {
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  {t("admissionExams.loading")}
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
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
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
            <CreateAdmissionExamHeader isEditMode={true} />

            <CreateAdmissionExamForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              admissions={admissions}
              initialData={exam}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmissionExamPage;
