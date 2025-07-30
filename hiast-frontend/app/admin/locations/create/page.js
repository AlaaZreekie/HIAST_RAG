"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { locationsAPI } from "@/lib/locationsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateLocationHeader from "@/components/admin/locations/CreateLocationHeader";
import CreateLocationForm from "@/components/admin/locations/CreateLocationForm";

const CreateLocationPage = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    requireAdminAuth();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);

      await locationsAPI.createLocation(formData);

      router.push("/admin/locations");
    } catch (err) {
      console.error("Failed to create location:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <main className={`flex-1 p-6 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <CreateLocationHeader />
          <CreateLocationForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default CreateLocationPage;
