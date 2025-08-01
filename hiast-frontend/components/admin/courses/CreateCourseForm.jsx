"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateCourseForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    ArabicName: "",
    EnglishName: "",
    ArabicDescription: "",
    EnglishDescription: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name || "",
        Description: initialData.Description || "",
        ArabicName: initialData.ArabicName || "",
        EnglishName: initialData.EnglishName || "",
        ArabicDescription: initialData.ArabicDescription || "",
        EnglishDescription: initialData.EnglishDescription || ""
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
            {/* Name */}
            <div>
              <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courses.form.name")}
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courses.form.description")}
              </label>
              <textarea
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Arabic Name */}
            <div>
              <label htmlFor="ArabicName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courses.form.arabicName")}
              </label>
              <input
                type="text"
                id="ArabicName"
                name="ArabicName"
                value={formData.ArabicName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="EnglishName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courses.form.englishName")}
              </label>
              <input
                type="text"
                id="EnglishName"
                name="EnglishName"
                value={formData.EnglishName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
              />
            </div>

            {/* Arabic Description */}
            <div>
              <label htmlFor="ArabicDescription" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courses.form.arabicDescription")}
              </label>
              <textarea
                id="ArabicDescription"
                name="ArabicDescription"
                value={formData.ArabicDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Description */}
            <div>
              <label htmlFor="EnglishDescription" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courses.form.englishDescription")}
              </label>
              <textarea
                id="EnglishDescription"
                name="EnglishDescription"
                value={formData.EnglishDescription}
                onChange={handleChange}
                required
                rows={4}
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
              {isLoading ? t("common.loading") : (isEditMode ? t("courses.form.update") : t("courses.form.submit"))}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/courses")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("courses.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseForm; 