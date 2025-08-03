"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateFaqCategoryForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
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
        Id: arabicTranslation?.Id || null,
        LanguageCode: 1,
        Name: formData.arabicName.trim()
      });
    }
    
    if (formData.englishName.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null,
        LanguageCode: 2,
        Name: formData.englishName.trim()
      });
    }

    const faqCategoryData = {
      Translations: translations
    };

    // Add FAQ category ID for updates
    if (isEditMode && initialData?.Id) {
      faqCategoryData.Id = initialData.Id;
    }

    onSubmit(faqCategoryData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Arabic Name */}
            <div>
              <label htmlFor="arabicName" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("faqCategories.form.name")} ({t("faqCategories.arabic")})
              </label>
              <input
                type="text"
                id="arabicName"
                value={formData.arabicName}
                onChange={(e) => handleInputChange("arabicName", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                placeholder={t("faqCategories.form.namePlaceholder")}
              />
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="englishName" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("faqCategories.form.name")} ({t("faqCategories.english")})
              </label>
              <input
                type="text"
                id="englishName"
                value={formData.englishName}
                onChange={(e) => handleInputChange("englishName", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                placeholder={t("faqCategories.form.namePlaceholder")}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className={`mt-6 flex space-x-3 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? t("common.loading") : (isEditMode ? t("faqCategories.form.update") : t("faqCategories.form.submit"))}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/faq-categories")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("faqCategories.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFaqCategoryForm; 