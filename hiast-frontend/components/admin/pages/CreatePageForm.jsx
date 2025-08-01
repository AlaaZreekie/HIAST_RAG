"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreatePageForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    Title: "",
    Content: "",
    Slug: "",
    ArabicTitle: "",
    EnglishTitle: "",
    ArabicContent: "",
    EnglishContent: "",
    ArabicSlug: "",
    EnglishSlug: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Title: initialData.Title || "",
        Content: initialData.Content || "",
        Slug: initialData.Slug || "",
        ArabicTitle: initialData.ArabicTitle || "",
        EnglishTitle: initialData.EnglishTitle || "",
        ArabicContent: initialData.ArabicContent || "",
        EnglishContent: initialData.EnglishContent || "",
        ArabicSlug: initialData.ArabicSlug || "",
        EnglishSlug: initialData.EnglishSlug || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label htmlFor="Title" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.title")}
              </label>
              <input
                type="text"
                id="Title"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="Content" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.content")}
              </label>
              <textarea
                id="Content"
                name="Content"
                value={formData.Content}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="Slug" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.slug")}
              </label>
              <input
                type="text"
                id="Slug"
                name="Slug"
                value={formData.Slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
              />
            </div>

            {/* Arabic Title */}
            <div>
              <label htmlFor="ArabicTitle" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.arabicTitle")}
              </label>
              <input
                type="text"
                id="ArabicTitle"
                name="ArabicTitle"
                value={formData.ArabicTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Title */}
            <div>
              <label htmlFor="EnglishTitle" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.englishTitle")}
              </label>
              <input
                type="text"
                id="EnglishTitle"
                name="EnglishTitle"
                value={formData.EnglishTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
              />
            </div>

            {/* Arabic Content */}
            <div>
              <label htmlFor="ArabicContent" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.arabicContent")}
              </label>
              <textarea
                id="ArabicContent"
                name="ArabicContent"
                value={formData.ArabicContent}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Content */}
            <div>
              <label htmlFor="EnglishContent" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.englishContent")}
              </label>
              <textarea
                id="EnglishContent"
                name="EnglishContent"
                value={formData.EnglishContent}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
              />
            </div>

            {/* Arabic Slug */}
            <div>
              <label htmlFor="ArabicSlug" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.arabicSlug")}
              </label>
              <input
                type="text"
                id="ArabicSlug"
                name="ArabicSlug"
                value={formData.ArabicSlug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Slug */}
            <div>
              <label htmlFor="EnglishSlug" className="block text-sm font-medium text-gray-700 mb-2">
                {t("pages.form.englishSlug")}
              </label>
              <input
                type="text"
                id="EnglishSlug"
                name="EnglishSlug"
                value={formData.EnglishSlug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
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