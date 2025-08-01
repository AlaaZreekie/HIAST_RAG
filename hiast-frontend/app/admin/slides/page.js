"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import SlidesPageHeader from "@/components/admin/slides/SlidesPageHeader";
import SlidesTable from "@/components/admin/slides/SlidesTable";
import BackToDashboardButton from "@/components/admin/slides/BackToDashboardButton";
import { slidesAPI } from "@/lib/slidesApi";

const SlidesPage = () => {
  const { lang } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSlides = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await slidesAPI.getAllSlides();
      if (Array.isArray(data)) {
        setSlides(data);
      } else {
        setSlides([]);
      }
    } catch (err) {
      console.error("Error loading slides:", err);
      setError(err.message || "Failed to load slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      loadSlides();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleEditSlide = (slideId) => {
    window.location.href = `/admin/slides/edit/${slideId}`;
  };

  const handleDeleteSlide = async (slideId) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      try {
        await slidesAPI.deleteSlide(slideId);
        await loadSlides();
      } catch (err) {
        console.error("Error deleting slide:", err);
        alert("Failed to delete slide");
      }
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
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
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
            <SlidesPageHeader />

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <SlidesTable
              slides={slides}
              onEdit={handleEditSlide}
              onDelete={handleDeleteSlide}
            />

            <BackToDashboardButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidesPage;
