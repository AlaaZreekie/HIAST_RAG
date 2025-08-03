"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const BackToDashboardButton = () => {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/admin/locations")}
      className="admin-button admin-button-secondary mb-4"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {t("locations.backToList")}
    </button>
  );
};

export default BackToDashboardButton; 