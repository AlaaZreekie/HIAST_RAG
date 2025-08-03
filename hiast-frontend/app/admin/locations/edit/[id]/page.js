"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getAllLocations, locationsAPI } from "@/lib/locationsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateLocationHeader from "@/components/admin/locations/CreateLocationHeader";
import CreateLocationForm from "@/components/admin/locations/CreateLocationForm";

const EditLocationPage = ({ params }) => {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const locationId = unwrappedParams.id;

  useEffect(() => {
    requireAdminAuth();
  }, []);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        setLoading(true);
        setError(null);
        const locations = await getAllLocations();
        const foundLocation = locations.find((loc) => loc.Id === locationId);

        if (!foundLocation) {
          setError(t("locations.notFound"));
          return;
        }

        setLocation(foundLocation);
      } catch (err) {
        console.error("Failed to load location:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (locationId) {
      loadLocation();
    }
  }, [locationId, t]);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);

      await locationsAPI.updateLocation(formData);

      router.push("/admin/locations");
    } catch (err) {
      console.error("Failed to update location:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${lang === "ar" ? "rtl" : "ltr"}`}>
        <DashboardHeader />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <main
            className={`flex-1 p-6 ${lang === "ar" ? "order-1" : "order-2"}`}
          >
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${lang === "ar" ? "rtl" : "ltr"}`}>
        <DashboardHeader />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <main
            className={`flex-1 p-6 ${lang === "ar" ? "order-1" : "order-2"}`}
          >
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div
                className={`flex ${lang === "ar" ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className={`${lang === "ar" ? "mr-3" : "ml-3"}`}>
                  <h3
                    className={`text-sm font-medium text-red-800 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("locations.error")}
                  </h3>
                  <div
                    className={`mt-2 text-sm text-red-700 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {error}
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => router.push("/admin/locations")}
                      className="admin-button admin-button-secondary"
                    >
                      {t("locations.backToList")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <main className={`flex-1 p-6 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <CreateLocationHeader isEditMode={true} />
          <CreateLocationForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            initialData={location}
            isEditMode={true}
          />
        </main>
      </div>
    </div>
  );
};

export default EditLocationPage;
