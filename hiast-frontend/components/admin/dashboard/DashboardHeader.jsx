"use client";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/admin/LanguageSwitcher";

const DashboardHeader = ({ user, onLogout }) => {
  const { t, lang } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div
            className={`flex items-center ${
              lang === "ar" ? "order-2" : "order-1"
            }`}
          >
            <h1 className="text-2xl font-bold text-gray-900">
              {t("dashboard.title")}
            </h1>
          </div>
          <div
            className={`flex items-center space-x-4 ${
              lang === "ar" ? "order-1" : "order-2"
            }`}
          >
            {lang === "ar" ? (
              <>
                <button
                  onClick={onLogout}
                  className="admin-button admin-button-secondary"
                >
                  {t("dashboard.signOut")}
                </button>
                <LanguageSwitcher />
                <span className="text-sm text-gray-600">
                  {user?.Name && (
                    <span className="font-medium mr-2">{user.Name}</span>
                  )}
                  <span>{t("dashboard.welcome", { name: "" })}</span>
                </span>
              </>
            ) : (
              <>
                <LanguageSwitcher />
                <span className="text-sm text-gray-600">
                  <span>{t("dashboard.welcome", { name: "" })}</span>
                  {user?.Name && (
                    <span className="font-medium ml-2">{user.Name}</span>
                  )}
                </span>
                <button
                  onClick={onLogout}
                  className="admin-button admin-button-secondary"
                >
                  {t("dashboard.signOut")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 