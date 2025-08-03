"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const LanguagesPageHeader = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {t("languages.title")}
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        {t("languages.subtitle")}
      </p>
      <button
        onClick={() => router.push("/admin/languages/create")}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {t("languages.create")}
      </button>
    </div>
  );
};

export default LanguagesPageHeader; 