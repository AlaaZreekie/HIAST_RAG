"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { testimonialsAPI } from "@/lib/testimonialsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateTestimonialForm from "@/components/admin/testimonials/CreateTestimonialForm";

const CreateTestimonialPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useState(() => {
    requireAdminAuth();
  }, []);

  const handleSubmit = async (testimonialData) => {
    try {
      setIsLoading(true);
      setError(null);
      await testimonialsAPI.createTestimonial(testimonialData);
      router.push("/admin/testimonials");
    } catch (err) {
      console.error("Error creating testimonial:", err);
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
            <div className="mb-6">
              <div
                className={`flex items-center justify-between ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <div>
                  <h1
                    className={`text-2xl font-bold text-gray-900 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("testimonials.createTitle")}
                  </h1>
                  <p
                    className={`mt-1 text-sm text-gray-500 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("testimonials.createSubtitle")}
                  </p>
                </div>
                <button
                  onClick={() => router.push("/admin/testimonials")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  {t("common.backToDashboard")}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <CreateTestimonialForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestimonialPage;
