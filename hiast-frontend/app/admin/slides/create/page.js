"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateSlideHeader from "@/components/admin/slides/CreateSlideHeader";
import CreateSlideForm from "@/components/admin/slides/CreateSlideForm";

const CreateSlidePage = () => {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      // Import the API dynamically to avoid SSR issues
      const { slidesAPI } = await import("@/lib/slidesApi");

      await slidesAPI.createSlide(formData);
      window.location.href = "/admin/slides";
    } catch (err) {
      console.error("Error creating slide:", err);
      setError(err.message || "Failed to create slide");
    } finally {
      setLoading(false);
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
            <CreateSlideHeader />

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <CreateSlideForm
              onSubmit={handleSubmit}
              isLoading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSlidePage;
