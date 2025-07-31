"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { faqsAPI } from "@/lib/faqsApi";
import { getAllFaqCategories } from "@/lib/faqCategoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateFaqHeader from "@/components/admin/faqs/CreateFaqHeader";
import CreateFaqForm from "@/components/admin/faqs/CreateFaqForm";

const CreateFaqPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [faqCategories, setFaqCategories] = useState([]);

  useEffect(() => {
    requireAdminAuth();
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categoriesData = await getAllFaqCategories();
      setFaqCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.message);
    }
  };

  const handleSubmit = async (faqData) => {
    try {
      setIsLoading(true);
      setError(null);
      await faqsAPI.createFaq(faqData);
      router.push("/admin/faqs");
    } catch (err) {
      console.error("Error creating FAQ:", err);
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
            <CreateFaqHeader />

            <CreateFaqForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              faqCategories={faqCategories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFaqPage; 