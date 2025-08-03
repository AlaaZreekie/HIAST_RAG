"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const FaqCategoriesPageHeader = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  const handleCreateCategory = () => {
    router.push("/admin/faqCategories/create");
  };

  return (
    <div className={`mb-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("faqCategories.title")}
          </h1>
          <p className={`mt-1 text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("faqCategories.subtitle")}
          </p>
        </div>
        <button
          onClick={handleCreateCategory}
          className="admin-button admin-button-primary"
        >
          {t("faqCategories.createNew")}
        </button>
      </div>
    </div>
  );
};

export default FaqCategoriesPageHeader; 