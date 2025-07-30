"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getAllLocations, locationsAPI } from "@/lib/locationsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import LocationsPageHeader from "@/components/admin/locations/LocationsPageHeader";
import LocationsTable from "@/components/admin/locations/LocationsTable";

const LocationsPage = () => {
  const { t, lang } = useLanguage();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    requireAdminAuth();
  }, []);

  const loadLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllLocations();
      setLocations(data || []);
    } catch (err) {
      console.error("Failed to load locations:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      loadLocations();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleDelete = async (locationId) => {
    try {
      await locationsAPI.deleteLocation(locationId);
      await loadLocations();
    } catch (err) {
      console.error("Failed to delete location:", err);
      setError(err.message);
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
                      onClick={loadLocations}
                      className="admin-button admin-button-secondary"
                    >
                      {t("locations.retry")}
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
          <LocationsPageHeader />
          <LocationsTable locations={locations} onDelete={handleDelete} />
        </main>
      </div>
    </div>
  );
};

export default LocationsPage;
