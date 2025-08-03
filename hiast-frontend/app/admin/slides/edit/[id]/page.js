"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { slidesAPI } from "@/lib/slidesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateSlideHeader from "@/components/admin/slides/CreateSlideHeader";
import CreateSlideForm from "@/components/admin/slides/CreateSlideForm";

const EditSlidePage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [slide, setSlide] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingSlide, setLoadingSlide] = useState(true);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const slideId = unwrappedParams.id;

  useEffect(() => {
    requireAdminAuth();
    loadSlide();
  }, [slideId]);

  const loadSlide = async () => {
    try {
      setLoadingSlide(true);
      const slides = await slidesAPI.getAllSlides();
      const foundSlide = slides.find((s) => s.Id === slideId);

      if (!foundSlide) {
        setError(t("slides.notFound"));
        return;
      }

      setSlide(foundSlide);
    } catch (err) {
      console.error("Error loading slide:", err);
      setError(err.message);
    } finally {
      setLoadingSlide(false);
    }
  };

  const handleSubmit = async (slideData) => {
    try {
      setIsLoading(true);
      setError(null);
      await slidesAPI.updateSlide(slideData);
      router.push("/admin/slides");
    } catch (err) {
      console.error("Error updating slide:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingSlide) {
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
                <p className="mt-2 text-gray-600">{t("slides.loading")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !slide) {
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
                  onClick={() => router.push("/admin/slides")}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {t("slides.backToList")}
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
            <CreateSlideHeader isEditMode={true} />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <CreateSlideForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              initialData={slide}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSlidePage;
