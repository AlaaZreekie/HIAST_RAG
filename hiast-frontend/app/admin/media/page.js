"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { getAllMedias } from "@/lib/mediaApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import MediaPageHeader from "@/components/admin/media/MediaPageHeader";
import MediaTable from "@/components/admin/media/MediaTable";
import BackToDashboardButton from "@/components/admin/media/BackToDashboardButton";

export default function MediaPage() {
  const router = useRouter();
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }
      loadMediaFiles();
    };

    checkAuth();
  }, [router]);

  // Reload media files when page is focused (e.g., after creating a file)
  useEffect(() => {
    const handleFocus = () => {
      if (!isLoading) {
        loadMediaFiles();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [isLoading]);

  const loadMediaFiles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting to load media files...");

      const response = await getAllMedias();
      console.log("Media files loaded successfully:", response);

      const filesData = response || [];
      console.log("Extracted media files:", filesData);

      setMediaFiles(filesData);
    } catch (error) {
      console.error("Error loading media files:", error);
      setError(error.message);
      setMediaFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateMedia = () => {
    router.push("/admin/media/create");
  };

  const handleEditMedia = (mediaId) => {
    router.push(`/admin/media/edit/${mediaId}`);
  };

  const handleDeleteMedia = async (mediaId) => {
    if (!confirm(t("media.confirmDelete"))) {
      return;
    }

    try {
      const { mediaAPI } = await import("@/lib/mediaApi");
      await mediaAPI.deleteMedia(mediaId);
      await loadMediaFiles(); // Reload the list
    } catch (error) {
      console.error("Error deleting media file:", error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { authAPI } = await import("@/lib/api");
      await authAPI.logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}
      >
        <DashboardHeader user={null} onLogout={handleLogout} />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <main
            className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${
              lang === "ar" ? "order-1" : "order-2"
            }`}
          >
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

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader user={null} onLogout={handleLogout} />

      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <main
          className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${
            lang === "ar" ? "order-1" : "order-2"
          }`}
        >
          <div className="px-4 py-6 sm:px-0">
            {/* Debug info */}
            <div className="mb-4 p-2 bg-yellow-100 text-xs">
              Language: {lang} | Layout: {lang === "ar" ? "RTL" : "LTR"}
            </div>

            {/* Header */}
            <MediaPageHeader onCreateMedia={handleCreateMedia} />

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Media Table */}
            <MediaTable
              mediaFiles={mediaFiles}
              onEditMedia={handleEditMedia}
              onDeleteMedia={handleDeleteMedia}
            />

            {/* Back to Dashboard Button */}
            <BackToDashboardButton />
          </div>
        </main>
      </div>
    </div>
  );
}
