"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { pagesAPI, getPageById } from "@/lib/pagesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreatePageHeader from "@/components/admin/pages/CreatePageHeader";
import CreatePageForm from "@/components/admin/pages/CreatePageForm";

const EditPagePage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const pageId = React.use(params).id;

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPageById(pageId);
        if (data) {
          setPage(data);
        } else {
          setError(t("pages.notFound"));
        }
      } catch (err) {
        console.error("Error loading page:", err);
        setError(err.message || t("pages.notFound"));
      } finally {
        setLoading(false);
      }
    };

    if (pageId) {
      loadPage();
    }
  }, [pageId, t]);

  const handleSubmit = async (pageData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await pagesAPI.updatePage(pageId, pageData);
      router.push("/admin/pages");
    } catch (err) {
      console.error("Error updating page:", err);
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
                  onClick={() => router.push("/admin/pages")}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  {t("pages.backToList")}
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
            <CreatePageHeader isEditMode={true} />
            <CreatePageForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
              initialData={page}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPagePage;
