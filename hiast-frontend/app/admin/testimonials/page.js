"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getAllTestimonials, testimonialsAPI } from "@/lib/testimonialsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import TestimonialsPageHeader from "@/components/admin/testimonials/TestimonialsPageHeader";
import TestimonialsTable from "@/components/admin/testimonials/TestimonialsTable";
import BackToDashboardButton from "@/components/admin/testimonials/BackToDashboardButton";

const TestimonialsPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    requireAdminAuth();
    loadTestimonials();
  }, []);

  // Reload testimonials when returning to the page
  useEffect(() => {
    const handleFocus = () => {
      loadTestimonials();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllTestimonials();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading testimonials:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTestimonial = (testimonialId) => {
    router.push(`/admin/testimonials/edit/${testimonialId}`);
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (window.confirm(t("testimonials.deleteConfirm"))) {
      try {
        await testimonialsAPI.deleteTestimonial(testimonialId);
        await loadTestimonials(); // Reload the list
      } catch (error) {
        console.error("Failed to delete testimonial:", error);
        alert(t("testimonials.deleteError"));
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
        <DashboardHeader />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
            <div className="p-6">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">{t("testimonials.loading")}</p>
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
            <TestimonialsPageHeader />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <TestimonialsTable
              testimonials={testimonials}
              onEditTestimonial={handleEditTestimonial}
              onDeleteTestimonial={handleDeleteTestimonial}
            />
            <BackToDashboardButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage; 