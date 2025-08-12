"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getCurrentUserFromStorage, authAPI } from "@/lib/api";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }

      try {
        const currentUser = getCurrentUserFromStorage();
        setUser(currentUser);
      } catch (error) {
        console.error("Error getting user:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("dashboard.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      {/* Header */}
      <DashboardHeader user={user} onLogout={handleLogout} />

      {/* Main Layout */}
      <div className="flex main-layout">
        {/* Sidebar */}
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}
