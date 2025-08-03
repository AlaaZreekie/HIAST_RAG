"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const FaqsPageHeader = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : ""}`}>
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("faqs.title")}
          </h1>
          <p className={`mt-1 text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("faqs.subtitle")}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/faqs/create")}
          className="admin-button admin-button-primary"
        >
          {t("faqs.createNew")}
        </button>
      </div>
    </div>
  );
};

export default FaqsPageHeader; 