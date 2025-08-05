"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getAllTestimonials, testimonialsAPI } from "@/lib/testimonialsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateTestimonialForm from "@/components/admin/testimonials/CreateTestimonialForm";

const EditTestimonialPage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [testimonial, setTestimonial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingTestimonial, setLoadingTestimonial] = useState(true);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const testimonialId = unwrappedParams.id;

  useEffect(() => {
    requireAdminAuth();
    loadTestimonial();
  }, [testimonialId]);

  const loadTestimonial = async () => {
    try {
      setLoadingTestimonial(true);
      const testimonials = await getAllTestimonials();
      const foundTestimonial = testimonials.find((t) => t.Id === testimonialId);

      if (!foundTestimonial) {
        setError(t("testimonials.notFound"));
        return;
      }

      setTestimonial(foundTestimonial);
    } catch (err) {
      console.error("Error loading testimonial:", err);
      setError(err.message);
    } finally {
      setLoadingTestimonial(false);
    }
  };

  const handleSubmit = async (testimonialData) => {
    try {
      setIsLoading(true);
      setError(null);
      await testimonialsAPI.updateTestimonial(testimonialData);
      router.push("/admin/testimonials");
    } catch (err) {
      console.error("Error updating testimonial:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingTestimonial) {
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
                <p className="mt-2 text-gray-600">
                  {t("testimonials.loading")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !testimonial) {
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
                  onClick={() => router.push("/admin/testimonials")}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {t("testimonials.backToList")}
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
                    {t("testimonials.editTitle")}
                  </h1>
                  <p
                    className={`mt-1 text-sm text-gray-500 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("testimonials.editSubtitle")}
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
              initialData={testimonial}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTestimonialPage;
