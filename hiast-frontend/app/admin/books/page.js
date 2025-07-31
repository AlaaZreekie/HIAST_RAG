"use client";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";

const BooksPage = () => {
  const { lang } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Books Management
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Manage books and publications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
