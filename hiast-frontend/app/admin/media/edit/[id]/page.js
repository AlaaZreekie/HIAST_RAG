"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { getAllMedias, mediaAPI } from "@/lib/mediaApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateMediaHeader from "@/components/admin/media/CreateMediaHeader";
import CreateMediaForm from "@/components/admin/media/CreateMediaForm";

export default function EditMediaPage() {
  const router = useRouter();
  const params = useParams();
  const mediaId = params.id;
  const { t, lang } = useLanguage();
  
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }
      loadData();
    };

    checkAuth();
  }, [router, mediaId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Loading media file with ID:", mediaId);

      // Load all media files and find the specific one
      const mediaFilesData = await getAllMedias();
      const foundMedia = mediaFilesData.find(media => media.Id === mediaId);
      
      if (!foundMedia) {
        throw new Error("Media file not found");
      }
      
      console.log("Media file loaded:", foundMedia);
      setMedia(foundMedia);
    } catch (error) {
      console.error("Error loading media file:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (mediaData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // The mediaData already includes the ID from the form
      await mediaAPI.updateMedia(mediaData);
      router.push("/admin/media");
    } catch (error) {
      console.error("Error updating media file:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { authAPI } = await import("@/lib/api");
      await authAPI.logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
        <DashboardHeader user={null} onLogout={handleLogout} />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <main className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${lang === "ar" ? "order-1" : "order-2"}`}>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t("media.loading")}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error && !media) {
    return (
      <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
        <DashboardHeader user={null} onLogout={handleLogout} />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <main className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${lang === "ar" ? "order-1" : "order-2"}`}>
            <div className="px-4 py-6 sm:px-0">
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader user={null} onLogout={handleLogout} />

      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <main className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="px-4 py-6 sm:px-0">
            {/* Header */}
            <CreateMediaHeader isEditMode={true} />

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Form */}
            <CreateMediaForm 
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
              initialData={media}
              isEditMode={true}
            />
          </div>
        </main>
      </div>
    </div>
  );
} 