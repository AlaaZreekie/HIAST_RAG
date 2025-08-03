"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { languagesAPI, getLanguageById } from "@/lib/languagesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateLanguageHeader from "@/components/admin/languages/CreateLanguageHeader";
import CreateLanguageForm from "@/components/admin/languages/CreateLanguageForm";

const EditLanguagePage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const languageId = React.use(params).id;

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLanguageById(languageId);
        if (data) {
          setLanguage(data);
        } else {
          setError(t("languages.notFound"));
        }
      } catch (err) {
        console.error("Error loading language:", err);
        setError(err.message || t("languages.notFound"));
      } finally {
        setLoading(false);
      }
    };

    if (languageId) {
      loadLanguage();
    }
  }, [languageId, t]);

  const handleSubmit = async (languageData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await languagesAPI.updateLanguage(languageId, languageData);
      router.push("/admin/languages");
    } catch (err) {
      console.error("Error updating language:", err);
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
                  {[...Array(4)].map((_, i) => (
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
                  onClick={() => router.push("/admin/languages")}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  {t("languages.backToList")}
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
            <CreateLanguageHeader isEditMode={true} />
            <CreateLanguageForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
              initialData={language}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLanguagePage;
