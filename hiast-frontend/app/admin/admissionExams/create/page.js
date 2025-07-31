"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { admissionExamsAPI } from "@/lib/admissionExamsApi";
import { getAllAdmissions } from "@/lib/admissionsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateAdmissionExamHeader from "@/components/admin/admissionExams/CreateAdmissionExamHeader";
import CreateAdmissionExamForm from "@/components/admin/admissionExams/CreateAdmissionExamForm";

const CreateAdmissionExamPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    requireAdminAuth();
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const admissionsData = await getAllAdmissions();
      setAdmissions(Array.isArray(admissionsData) ? admissionsData : []);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.message);
    }
  };

  const handleSubmit = async (examData) => {
    try {
      setIsLoading(true);
      setError(null);
      await admissionExamsAPI.createExam(examData);
      router.push("/admin/admissionExams");
    } catch (err) {
      console.error("Error creating admission exam:", err);
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
            <CreateAdmissionExamHeader />

            <CreateAdmissionExamForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              admissions={admissions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmissionExamPage;
