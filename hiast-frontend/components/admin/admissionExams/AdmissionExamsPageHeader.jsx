"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const AdmissionExamsPageHeader = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : ""}`}>
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("admissionExams.title")}
          </h1>
          <p className={`mt-1 text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("admissionExams.subtitle")}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/admissionExams/create")}
          className="admin-button admin-button-primary"
        >
          {t("admissionExams.createNew")}
        </button>
      </div>
    </div>
  );
};

export default AdmissionExamsPageHeader; 