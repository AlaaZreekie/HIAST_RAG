"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateSlideForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    id: initialData?.Id || "",
    displayOrder: initialData?.DisplayOrder || 0,
    title: initialData?.Title || "",
    description: initialData?.Description || "",
    imageUrl: initialData?.ImageUrl || "",
    arabicTitle: initialData?.ArabicTitle || "",
    englishTitle: initialData?.EnglishTitle || "",
    arabicDescription: initialData?.ArabicDescription || "",
    englishDescription: initialData?.EnglishDescription || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.ImageUrl || "");

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.Id || "",
        displayOrder: initialData.DisplayOrder || 0,
        title: initialData.Title || "",
        description: initialData.Description || "",
        imageUrl: initialData.ImageUrl || "",
        arabicTitle: initialData.ArabicTitle || "",
        englishTitle: initialData.EnglishTitle || "",
        arabicDescription: initialData.ArabicDescription || "",
        englishDescription: initialData.EnglishDescription || "",
      });
      setPreviewUrl(initialData.ImageUrl || "");
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = new FormData();
      
      // Add form fields
      submitData.append("DisplayOrder", formData.displayOrder);
      submitData.append("Title", formData.title);
      submitData.append("Description", formData.description);
      submitData.append("ArabicTitle", formData.arabicTitle);
      submitData.append("EnglishTitle", formData.englishTitle);
      submitData.append("ArabicDescription", formData.arabicDescription);
      submitData.append("EnglishDescription", formData.englishDescription);
      
      // Add image file if selected
      if (imageFile) {
        submitData.append("ImageFile", imageFile);
      }
      
      // Add ID for edit mode
      if (isEditMode && formData.id) {
        submitData.append("Id", formData.id);
      }
      
      await onSubmit(submitData);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleCancel = () => {
    router.push("/admin/slides");
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display Order */}
          <div>
            <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-2">
              {t("slides.form.order")}
            </label>
            <input
              type="number"
              id="displayOrder"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              {t("slides.form.title")}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              {t("slides.form.description")}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
              {t("slides.form.image")}
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

          {/* Arabic Title */}
          <div>
            <label htmlFor="arabicTitle" className="block text-sm font-medium text-gray-700 mb-2">
              {t("slides.form.arabicTitle")}
            </label>
            <input
              type="text"
              id="arabicTitle"
              name="arabicTitle"
              value={formData.arabicTitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              dir="rtl"
            />
          </div>

          {/* English Title */}
          <div>
            <label htmlFor="englishTitle" className="block text-sm font-medium text-gray-700 mb-2">
              {t("slides.form.englishTitle")}
            </label>
            <input
              type="text"
              id="englishTitle"
              name="englishTitle"
              value={formData.englishTitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Arabic Description */}
          <div>
            <label htmlFor="arabicDescription" className="block text-sm font-medium text-gray-700 mb-2">
              {t("slides.form.arabicDescription")}
            </label>
            <textarea
              id="arabicDescription"
              name="arabicDescription"
              value={formData.arabicDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              dir="rtl"
            />
          </div>

          {/* English Description */}
          <div>
            <label htmlFor="englishDescription" className="block text-sm font-medium text-gray-700 mb-2">
              {t("slides.form.englishDescription")}
            </label>
            <textarea
              id="englishDescription"
              name="englishDescription"
              value={formData.englishDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Form Actions */}
          <div className={`flex space-x-3 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("common.saving")}
                </>
              ) : (
                isEditMode ? t("slides.form.update") : t("slides.form.submit")
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("slides.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSlideForm; 