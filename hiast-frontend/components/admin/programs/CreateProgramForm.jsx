"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateProgramForm = ({ onSubmit, isLoading, error, initialData, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    arabicName: "",
    englishName: "",
    arabicDescription: "",
    englishDescription: ""
  });

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        arabicName: arabicTranslation?.Name || "",
        englishName: englishTranslation?.Name || "",
        arabicDescription: arabicTranslation?.Description || "",
        englishDescription: englishTranslation?.Description || ""
      });
    }
  }, [initialData, isEditMode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.arabicName.trim() && !formData.englishName.trim()) {
      alert(t("programs.form.nameRequired"));
      return;
    }

    const translations = [];
    
    if (formData.arabicName.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null, // Include ID for updates
        LanguageCode: 1, // Arabic
        Name: formData.arabicName.trim(),
        Description: formData.arabicDescription.trim()
      });
    }
    
    if (formData.englishName.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null, // Include ID for updates
        LanguageCode: 2, // English
        Name: formData.englishName.trim(),
        Description: formData.englishDescription.trim()
      });
    }

    const programData = {
      Translations: translations
    };

    // Add program ID for updates
    if (isEditMode && initialData?.Id) {
      programData.Id = initialData.Id;
    }

    onSubmit(programData);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Arabic Name */}
            <div>
              <label htmlFor="arabicName" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("programs.form.name")} ({t("programs.arabic")})
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="arabicName"
                  value={formData.arabicName}
                  onChange={(e) => handleInputChange("arabicName", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("programs.form.namePlaceholder")}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>

            {/* Arabic Description */}
            <div>
              <label htmlFor="arabicDescription" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("programs.form.description")} ({t("programs.arabic")})
              </label>
              <div className="mt-1">
                <textarea
                  id="arabicDescription"
                  rows={4}
                  value={formData.arabicDescription}
                  onChange={(e) => handleInputChange("arabicDescription", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("programs.form.descriptionPlaceholder")}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="englishName" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("programs.form.name")} ({t("programs.english")})
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="englishName"
                  value={formData.englishName}
                  onChange={(e) => handleInputChange("englishName", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("programs.form.namePlaceholder")}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>

            {/* English Description */}
            <div>
              <label htmlFor="englishDescription" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("programs.form.description")} ({t("programs.english")})
              </label>
              <div className="mt-1">
                <textarea
                  id="englishDescription"
                  rows={4}
                  value={formData.englishDescription}
                  onChange={(e) => handleInputChange("englishDescription", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("programs.form.descriptionPlaceholder")}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/programs")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("programs.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("programs.form.update") : t("programs.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("programs.form.update") : t("programs.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProgramForm; 