"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateLocationForm = ({ onSubmit, isLoading, error, initialData, isEditMode = false }) => {
  const { t, lang } = useLanguage();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    locationCode: "DAMAS",
    arabicName: "",
    englishName: "",
    arabicAddress: "",
    englishAddress: "",
  });

  useEffect(() => {
    if (initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        locationCode: initialData.LocationCode || "DAMAS",
        arabicName: arabicTranslation?.Name || "",
        englishName: englishTranslation?.Name || "",
        arabicAddress: arabicTranslation?.Address || "",
        englishAddress: englishTranslation?.Address || "",
      });
    }
  }, [initialData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.arabicName.trim() || !formData.englishName.trim()) {
      alert(t("locations.form.validationError"));
      return;
    }

    const submitData = {
      LocationCode: formData.locationCode,
      Translations: [
        {
          LanguageCode: 1,
          Name: formData.arabicName.trim(),
          Address: formData.arabicAddress.trim()
        },
        {
          LanguageCode: 2,
          Name: formData.englishName.trim(),
          Address: formData.englishAddress.trim()
        }
      ]
    };

    // Add Id only for edit mode
    if (isEditMode && initialData?.Id) {
      submitData.Id = initialData.Id;
      
      // Add translation IDs for update
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      if (arabicTranslation?.Id) {
        submitData.Translations[0].Id = arabicTranslation.Id;
      }
      if (englishTranslation?.Id) {
        submitData.Translations[1].Id = englishTranslation.Id;
      }
    }

    console.log("Submitting location data:", submitData);
    console.log("JSON stringified data:", JSON.stringify(submitData, null, 2));

    await onSubmit(submitData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="locationCode" className={`block text-sm font-medium text-gray-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("locations.form.locationCode")}
          </label>
          <select
            id="locationCode"
            value={formData.locationCode}
            onChange={(e) => handleInputChange("locationCode", e.target.value)}
            className={`admin-input w-full ${lang === "ar" ? "text-right" : "text-left"}`}
            required
          >
            <option value="DAMAS">DAMAS</option>
            <option value="ALEPPO">ALEPPO</option>
            <option value="LATAKIA">LATAKIA</option>
          </select>
        </div>

        <div>
          <label htmlFor="arabicName" className={`block text-sm font-medium text-gray-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("locations.form.arabicName")}
          </label>
          <input
            type="text"
            id="arabicName"
            value={formData.arabicName}
            onChange={(e) => handleInputChange("arabicName", e.target.value)}
            className={`admin-input w-full ${lang === "ar" ? "text-right" : "text-left"}`}
            dir="rtl"
            required
          />
        </div>

        <div>
          <label htmlFor="englishName" className={`block text-sm font-medium text-gray-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("locations.form.englishName")}
          </label>
          <input
            type="text"
            id="englishName"
            value={formData.englishName}
            onChange={(e) => handleInputChange("englishName", e.target.value)}
            className={`admin-input w-full ${lang === "ar" ? "text-right" : "text-left"}`}
            dir="ltr"
            required
          />
        </div>

        <div>
          <label htmlFor="arabicAddress" className={`block text-sm font-medium text-gray-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("locations.form.arabicAddress")}
          </label>
          <input
            type="text"
            id="arabicAddress"
            value={formData.arabicAddress}
            onChange={(e) => handleInputChange("arabicAddress", e.target.value)}
            className={`admin-input w-full ${lang === "ar" ? "text-right" : "text-left"}`}
            dir="rtl"
          />
        </div>

        <div>
          <label htmlFor="englishAddress" className={`block text-sm font-medium text-gray-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("locations.form.englishAddress")}
          </label>
          <input
            type="text"
            id="englishAddress"
            value={formData.englishAddress}
            onChange={(e) => handleInputChange("englishAddress", e.target.value)}
            className={`admin-input w-full ${lang === "ar" ? "text-right" : "text-left"}`}
            dir="ltr"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className={`flex ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className={`${lang === "ar" ? "mr-3" : "ml-3"}`}>
                <h3 className={`text-sm font-medium text-red-800 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("locations.form.error")}
                </h3>
                <div className={`mt-2 text-sm text-red-700 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`flex justify-end ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""} space-x-3`}>
          <button
            type="button"
            onClick={() => router.push("/admin/locations")}
            className="admin-button admin-button-secondary"
            disabled={isLoading}
          >
            {t("locations.form.cancel")}
          </button>
          <button
            type="submit"
            className="admin-button admin-button-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                <svg
                  className={`animate-spin h-5 w-5 text-white ${lang === "ar" ? "ml-3" : "mr-3"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t("locations.form.saving")}
              </div>
            ) : (
              t("locations.form.save")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLocationForm; 