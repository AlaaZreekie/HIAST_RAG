"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateSlideForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    linkURL: "",
    arabicTitle: "",
    englishTitle: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        linkURL: initialData.LinkURL || "",
        arabicTitle: arabicTranslation?.Title || "",
        englishTitle: englishTranslation?.Title || ""
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
    
    if (!formData.arabicTitle.trim() && !formData.englishTitle.trim()) {
      return;
    }

    if (!formData.linkURL.trim()) {
      return;
    }

    if (!imageFile && !isEditMode) {
      return;
    }

    const translations = [];
    
    if (formData.arabicTitle.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null,
        LanguageCode: 1,
        Title: formData.arabicTitle.trim()
      });
    }
    
    if (formData.englishTitle.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null,
        LanguageCode: 2,
        Title: formData.englishTitle.trim()
      });
    }

    const slideData = new FormData();
    
    // Add form fields
    slideData.append("LinkURL", formData.linkURL.trim());
    slideData.append("Translations", JSON.stringify(translations));
    
    // Add image file
    if (imageFile) {
      slideData.append("CreateMedia.File", imageFile);
      slideData.append("CreateMedia.MediaCategoryId", "1"); // Default media category
    }

    // Add slide ID for updates
    if (isEditMode && initialData?.Id) {
      slideData.append("Id", initialData.Id);
    }

    onSubmit(slideData);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Link URL */}
            <div>
              <label htmlFor="linkURL" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("slides.form.linkURL")}
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  id="linkURL"
                  value={formData.linkURL}
                  onChange={(e) => handleInputChange("linkURL", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("slides.form.linkURLPlaceholder")}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="imageFile" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("slides.form.image")}
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  id="imageFile"
                  onChange={handleImageChange}
                  accept="image/*"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
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
            </div>

            {/* Arabic Title */}
            <div>
              <label htmlFor="arabicTitle" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("slides.form.title")} ({t("slides.arabic")})
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
                  placeholder={t("slides.form.titlePlaceholder")}
                />
              </div>
            </div>

            {/* English Title */}
            <div>
              <label htmlFor="englishTitle" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("slides.form.title")} ({t("slides.english")})
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
                  placeholder={t("slides.form.titlePlaceholder")}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/slides")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("slides.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("slides.form.update") : t("slides.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("slides.form.update") : t("slides.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSlideForm; 