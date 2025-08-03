"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateTestimonialForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    graduateName: "",
    graduateYear: "",
    arabicQuote: "",
    englishQuote: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        graduateName: initialData.GraduateName || "",
        graduateYear: initialData.GraduateYear?.toString() || "",
        arabicQuote: arabicTranslation?.Quote || "",
        englishQuote: englishTranslation?.Quote || ""
      });
      
      if (initialData.ImageUrl) {
        setPreviewUrl(initialData.ImageUrl);
      }
    }
  }, [initialData, isEditMode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.arabicQuote.trim() && !formData.englishQuote.trim()) {
      return;
    }

    if (!formData.graduateName.trim()) {
      return;
    }

    if (!formData.graduateYear) {
      return;
    }

    if (!imageFile && !isEditMode) {
      return;
    }

    const translations = [];
    
    if (formData.arabicQuote.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null,
        LanguageCode: 1,
        Quote: formData.arabicQuote.trim()
      });
    }
    
    if (formData.englishQuote.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null,
        LanguageCode: 2,
        Quote: formData.englishQuote.trim()
      });
    }

    const testimonialData = new FormData();
    
    // Add form fields
    testimonialData.append("GraduateName", formData.graduateName.trim());
    testimonialData.append("GraduateYear", formData.graduateYear);
    testimonialData.append("Translations", JSON.stringify(translations));
    
    // Add image file
    if (imageFile) {
      testimonialData.append("CreateMedia.File", imageFile);
      testimonialData.append("CreateMedia.MediaCategoryId", "1"); // Default media category
    }

    // Add testimonial ID for updates
    if (isEditMode && initialData?.Id) {
      testimonialData.append("Id", initialData.Id);
    }

    onSubmit(testimonialData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Graduate Name */}
            <div>
              <label htmlFor="graduateName" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("testimonials.form.graduateName")}
              </label>
              <input
                type="text"
                id="graduateName"
                value={formData.graduateName}
                onChange={(e) => handleInputChange("graduateName", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                placeholder={t("testimonials.form.graduateNamePlaceholder")}
                required
              />
            </div>

            {/* Graduate Year */}
            <div>
              <label htmlFor="graduateYear" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("testimonials.form.graduateYear")}
              </label>
              <input
                type="number"
                id="graduateYear"
                value={formData.graduateYear}
                onChange={(e) => handleInputChange("graduateYear", e.target.value)}
                min="1900"
                max="9999"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                placeholder={t("testimonials.form.graduateYearPlaceholder")}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="imageFile" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("testimonials.form.image")}
              </label>
              <input
                type="file"
                id="imageFile"
                onChange={handleImageChange}
                accept="image/*"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                required={!isEditMode}
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            {/* Arabic Quote */}
            <div>
              <label htmlFor="arabicQuote" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("testimonials.form.quote")} ({t("testimonials.arabic")})
              </label>
              <textarea
                id="arabicQuote"
                value={formData.arabicQuote}
                onChange={(e) => handleInputChange("arabicQuote", e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                placeholder={t("testimonials.form.quotePlaceholder")}
              />
            </div>

            {/* English Quote */}
            <div>
              <label htmlFor="englishQuote" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("testimonials.form.quote")} ({t("testimonials.english")})
              </label>
              <textarea
                id="englishQuote"
                value={formData.englishQuote}
                onChange={(e) => handleInputChange("englishQuote", e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                placeholder={t("testimonials.form.quotePlaceholder")}
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
              {isLoading ? t("common.loading") : (isEditMode ? t("testimonials.form.update") : t("testimonials.form.submit"))}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/testimonials")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("testimonials.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestimonialForm; 