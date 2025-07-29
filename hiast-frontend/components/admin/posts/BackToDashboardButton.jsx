"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const BackToDashboardButton = () => {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={() => router.push("/admin/dashboard")}
        className="admin-button admin-button-secondary"
      >
        {t("posts.backToDashboard")}
      </button>
    </div>
  );
};

export default BackToDashboardButton; 