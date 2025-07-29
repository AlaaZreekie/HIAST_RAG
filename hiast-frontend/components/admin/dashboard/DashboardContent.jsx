"use client";
import { useLanguage } from "@/components/LanguageProvider";
import StatsGrid from "./StatsGrid";
import QuickActionsGrid from "./QuickActionsGrid";

const DashboardContent = () => {
  const { lang } = useLanguage();

  return (
    <main
      className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${
        lang === "ar" ? "order-1" : "order-2"
      }`}
    >
      <div className="px-4 py-6 sm:px-0">
        <div className="space-y-8">
          {/* Stats Grid */}
          <StatsGrid />
          
          {/* Quick Actions Grid */}
          <QuickActionsGrid />
        </div>
      </div>
    </main>
  );
};

export default DashboardContent; 