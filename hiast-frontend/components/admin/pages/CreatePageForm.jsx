"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreatePageForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    arabicTitle: "",
    englishTitle: "",
    arabicContent: "",
    englishContent: ""
  });

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        arabicTitle: arabicTranslation?.Title || "",
        englishTitle: englishTranslation?.Title || "",
        arabicContent: arabicTranslation?.Content || "",
        englishContent: englishTranslation?.Content || ""
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
    
    if (!formData.arabicTitle.trim() && !formData.englishTitle.trim()) {
      return;
    }

    const translations = [];
    
    if (formData.arabicTitle.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null,
        LanguageCode: 1,
        Title: formData.arabicTitle.trim(),
        Content: formData.arabicContent.trim()
      });
    }
    
    if (formData.englishTitle.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null,
        LanguageCode: 2,
        Title: formData.englishTitle.trim(),
        Content: formData.englishContent.trim()
      });
    }

    const pageData = {
      Translations: translations
    };

    // Add page ID for updates
    if (isEditMode && initialData?.Id) {
      pageData.Id = initialData.Id;
    }

    onSubmit(pageData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Arabic Title */}
            <div>
              <label htmlFor="arabicTitle" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("pages.form.title")} ({t("pages.arabic")})
              </label>
              <input
                type="text"
                id="arabicTitle"
                value={formData.arabicTitle}
                onChange={(e) => handleInputChange("arabicTitle", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                placeholder={t("pages.form.titlePlaceholder")}
              />
            </div>

            {/* English Title */}
            <div>
              <label htmlFor="englishTitle" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("pages.form.title")} ({t("pages.english")})
              </label>
              <input
                type="text"
                id="englishTitle"
                value={formData.englishTitle}
                onChange={(e) => handleInputChange("englishTitle", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                placeholder={t("pages.form.titlePlaceholder")}
              />
            </div>

            {/* Arabic Content */}
            <div>
              <label htmlFor="arabicContent" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("pages.form.content")} ({t("pages.arabic")})
              </label>
              <textarea
                id="arabicContent"
                value={formData.arabicContent}
                onChange={(e) => handleInputChange("arabicContent", e.target.value)}
                rows={8}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                placeholder={t("pages.form.contentPlaceholder")}
              />
            </div>

            {/* English Content */}
            <div>
              <label htmlFor="englishContent" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("pages.form.content")} ({t("pages.english")})
              </label>
              <textarea
                id="englishContent"
                value={formData.englishContent}
                onChange={(e) => handleInputChange("englishContent", e.target.value)}
                rows={8}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                placeholder={t("pages.form.contentPlaceholder")}
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
              {isLoading ? t("common.loading") : (isEditMode ? t("pages.form.update") : t("pages.form.submit"))}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/pages")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("pages.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePageForm; 