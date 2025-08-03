"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { pagesAPI } from "@/lib/pagesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreatePageHeader from "@/components/admin/pages/CreatePageHeader";
import CreatePageForm from "@/components/admin/pages/CreatePageForm";

const CreatePagePage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (pageData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await pagesAPI.createPage(pageData);
      router.push("/admin/pages");
    } catch (err) {
      console.error("Error creating page:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
            <CreatePageHeader />
            <CreatePageForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePagePage;
