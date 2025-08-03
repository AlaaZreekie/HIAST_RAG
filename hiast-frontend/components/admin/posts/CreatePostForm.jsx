"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreatePostForm = ({ onSubmit, isLoading, error, initialData, isEditMode = false, categories = [] }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    arabicTitle: "",
    englishTitle: "",
    arabicContent: "",
    englishContent: "",
    categoryId: ""
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
        englishContent: englishTranslation?.Content || "",
        categoryId: initialData.CategoryId || ""
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

    if (!formData.categoryId) {
      return;
    }

    const translations = [];
    
    if (formData.arabicTitle.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null, // Include ID for updates
        LanguageCode: 1, // Arabic
        Title: formData.arabicTitle.trim(),
        Content: formData.arabicContent.trim()
      });
    }
    
    if (formData.englishTitle.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null, // Include ID for updates
        LanguageCode: 2, // English
        Title: formData.englishTitle.trim(),
        Content: formData.englishContent.trim()
      });
    }

    const postData = {
      CategoryId: formData.categoryId,
      Translations: translations
    };

    // Add post ID for updates
    if (isEditMode && initialData?.Id) {
      postData.Id = initialData.Id;
    }

    onSubmit(postData);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label htmlFor="categoryId" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("posts.form.category")}
              </label>
              <div className="mt-1">
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange("categoryId", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  required
                >
                  <option value="">{t("posts.form.selectCategory")}</option>
                  {categories.map((category) => (
                    <option key={category.Id} value={category.Id}>
                      {category.Translations?.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2))?.Name || category.Name || "Unknown"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Arabic Title */}
            <div>
              <label htmlFor="arabicTitle" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("posts.form.title")} (${t("posts.arabic")})`
                  : `${t("posts.form.title")} (${t("posts.arabic")})`
                }
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="arabicTitle"
                  value={formData.arabicTitle}
                  onChange={(e) => handleInputChange("arabicTitle", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("posts.form.titlePlaceholder")}
                />
              </div>
            </div>

            {/* Arabic Content */}
            <div>
              <label htmlFor="arabicContent" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("posts.form.content")} (${t("posts.arabic")})`
                  : `${t("posts.form.content")} (${t("posts.arabic")})`
                }
              </label>
              <div className="mt-1">
                <textarea
                  id="arabicContent"
                  rows={4}
                  value={formData.arabicContent}
                  onChange={(e) => handleInputChange("arabicContent", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("posts.form.contentPlaceholder")}
                />
              </div>
            </div>

            {/* English Title */}
            <div>
              <label htmlFor="englishTitle" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("posts.form.title")} (${t("posts.english")})`
                  : `${t("posts.form.title")} (${t("posts.english")})`
                }
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="englishTitle"
                  value={formData.englishTitle}
                  onChange={(e) => handleInputChange("englishTitle", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("posts.form.titlePlaceholder")}
                />
              </div>
            </div>

            {/* English Content */}
            <div>
              <label htmlFor="englishContent" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("posts.form.content")} (${t("posts.english")})`
                  : `${t("posts.form.content")} (${t("posts.english")})`
                }
              </label>
              <div className="mt-1">
                <textarea
                  id="englishContent"
                  rows={4}
                  value={formData.englishContent}
                  onChange={(e) => handleInputChange("englishContent", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("posts.form.contentPlaceholder")}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/posts")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("posts.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("posts.form.update") : t("posts.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("posts.form.update") : t("posts.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm; 