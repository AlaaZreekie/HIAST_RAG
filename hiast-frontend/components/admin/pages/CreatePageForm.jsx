"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { Editor } from '@tinymce/tinymce-react';

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
      if (isEditMode && arabicTranslation) {
        // For update, use UpdatePageTranslationDto structure (with Id)
        translations.push({
          Id: arabicTranslation.Id,
          Title: formData.arabicTitle.trim(),
          Content: formData.arabicContent.trim()
        });
      } else {
        // For create, use CreatePageTranslationDto structure (no Id)
        translations.push({
          LanguageCode: 1,
          Title: formData.arabicTitle.trim(),
          Content: formData.arabicContent.trim()
        });
      }
    }
    
    if (formData.englishTitle.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      if (isEditMode && englishTranslation) {
        // For update, use UpdatePageTranslationDto structure (with Id)
        translations.push({
          Id: englishTranslation.Id,
          Title: formData.englishTitle.trim(),
          Content: formData.englishContent.trim()
        });
      } else {
        // For create, use CreatePageTranslationDto structure (no Id)
        translations.push({
          LanguageCode: 2,
          Title: formData.englishTitle.trim(),
          Content: formData.englishContent.trim()
        });
      }
    }

    const pageData = {
      Translations: translations
    };

    // Add page ID for updates
    if (isEditMode && initialData?.Id) {
      pageData.Id = initialData.Id;
    }

    console.log("Submitting page data:", JSON.stringify(pageData, null, 2));
    console.log("Is edit mode:", isEditMode);
    console.log("Initial data:", initialData);
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

            {/* Arabic Content - Rich Text Editor */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("pages.form.content")} ({t("pages.arabic")})
              </label>
              <Editor
                apiKey="jsq7xo6pxpwhuyknggeg3u05plwf9y6py5van8imy4ye30pc" // You can get a free API key from https://www.tiny.cloud/
                value={formData.arabicContent}
                onEditorChange={(content) => handleInputChange("arabicContent", content)}
                init={{
                  height: 300,
                  menubar: false,
                  directionality: 'rtl',
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>

            {/* English Content - Rich Text Editor */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("pages.form.content")} ({t("pages.english")})
              </label>
              <Editor
                apiKey="jsq7xo6pxpwhuyknggeg3u05plwf9y6py5van8imy4ye30pc" // You can get a free API key from https://www.tiny.cloud/
                value={formData.englishContent}
                onEditorChange={(content) => handleInputChange("englishContent", content)}
                init={{
                  height: 300,
                  menubar: false,
                  directionality: 'ltr',
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
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