"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateCategoryHeader = ({ isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className={`flex items-center ${
        lang === "ar" ? "order-2" : "order-1"
      }`}>
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="admin-button admin-button-secondary"
        >
          {t("categories.backToDashboard")}
        </button>
        <h1 className={`text-2xl font-bold text-gray-900 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {isEditMode ? t("categories.edit") : t("categories.create")}
        </h1>
      </div>
    </div>
  );
};

export default CreateCategoryHeader; 