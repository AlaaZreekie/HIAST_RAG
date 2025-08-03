"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { faqsAPI, getFaqById } from "@/lib/faqsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateFaqHeader from "@/components/admin/faqs/CreateFaqHeader";
import CreateFaqForm from "@/components/admin/faqs/CreateFaqForm";

const EditFaqPage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const faqId = React.use(params).id;

  useEffect(() => {
    const loadFaq = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFaqById(faqId);
        if (data) {
          setFaq(data);
        } else {
          setError(t("faqs.notFound"));
        }
      } catch (err) {
        console.error("Error loading FAQ:", err);
        setError(err.message || t("faqs.notFound"));
      } finally {
        setLoading(false);
      }
    };

    if (faqId) {
      loadFaq();
    }
  }, [faqId, t]);

  const handleSubmit = async (faqData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await faqsAPI.updateFaq(faqId, faqData);
      router.push("/admin/faqs");
    } catch (err) {
      console.error("Error updating FAQ:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
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
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => router.push("/admin/faqs")}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  {t("faqs.backToList")}
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
            <CreateFaqHeader isEditMode={true} />
            <CreateFaqForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
              initialData={faq}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFaqPage;
