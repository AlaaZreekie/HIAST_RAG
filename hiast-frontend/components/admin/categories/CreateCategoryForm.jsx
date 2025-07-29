"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateCategoryForm = ({ onSubmit, isLoading, error, initialData, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    arabicName: "",
    englishName: ""
  });

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        arabicName: arabicTranslation?.Name || "",
        englishName: englishTranslation?.Name || ""
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
      return;
    }

    const translations = [];
    
    if (formData.arabicName.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null, // Include ID for updates
        LanguageCode: 1, // Arabic
        Name: formData.arabicName.trim()
      });
    }
    
    if (formData.englishName.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null, // Include ID for updates
        LanguageCode: 2, // English
        Name: formData.englishName.trim()
      });
    }

    const categoryData = {
      Translations: translations
    };

    // Add category ID for updates
    if (isEditMode && initialData?.Id) {
      categoryData.Id = initialData.Id;
    }

    onSubmit(categoryData);
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
                {lang === "ar" 
                  ? `${t("categories.form.name")} (${t("categories.arabic")})`
                  : `${t("categories.form.name")} (${t("categories.arabic")})`
                }
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
                  placeholder={t("categories.form.namePlaceholder")}
                />
              </div>
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="englishName" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("categories.form.name")} (${t("categories.english")})`
                  : `${t("categories.form.name")} (${t("categories.english")})`
                }
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
                  placeholder={t("categories.form.namePlaceholder")}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("categories.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("categories.form.update") : t("categories.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("categories.form.update") : t("categories.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryForm; 