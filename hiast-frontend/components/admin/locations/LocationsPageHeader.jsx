"use client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const LocationsPageHeader = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();

  return (
    <div className="mb-6">
      <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : ""}`}>
        <div>
          <h1 className={`text-2xl font-bold text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("locations.title")}
          </h1>
          <p className={`mt-1 text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("locations.subtitle")}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/locations/create")}
          className={`admin-button admin-button-primary ${lang === "ar" ? "flex-row-reverse" : ""}`}
        >
          <svg
            className={`w-5 h-5 ${lang === "ar" ? "ml-2" : "mr-2"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {t("locations.create")}
        </button>
      </div>
    </div>
  );
};

export default LocationsPageHeader; 