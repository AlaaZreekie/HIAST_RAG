"use client";
import { useLanguage } from "@/components/LanguageProvider";

export default function UsersPage() {
  const { t, lang } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1
            className={`text-3xl font-bold text-gray-900 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("dashboard.nav.users")}
          </h1>
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <p className="text-gray-500 text-center">
              {t("common.comingSoon")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
