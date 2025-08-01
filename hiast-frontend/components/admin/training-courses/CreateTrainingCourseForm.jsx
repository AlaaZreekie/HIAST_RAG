"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateTrainingCourseForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    id: initialData?.Id || "",
    name: initialData?.Name || "",
    description: initialData?.Description || "",
    imageUrl: initialData?.ImageUrl || "",
    startDate: initialData?.StartDate ? new Date(initialData.StartDate).toISOString().split('T')[0] : "",
    endDate: initialData?.EndDate ? new Date(initialData.EndDate).toISOString().split('T')[0] : "",
    price: initialData?.Price || 0,
    isActive: initialData?.IsActive ?? true,
    arabicName: initialData?.ArabicName || "",
    englishName: initialData?.EnglishName || "",
    arabicDescription: initialData?.ArabicDescription || "",
    englishDescription: initialData?.EnglishDescription || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.ImageUrl || "");

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.Id || "",
        name: initialData.Name || "",
        description: initialData.Description || "",
        imageUrl: initialData.ImageUrl || "",
        startDate: initialData.StartDate ? new Date(initialData.StartDate).toISOString().split('T')[0] : "",
        endDate: initialData.EndDate ? new Date(initialData.EndDate).toISOString().split('T')[0] : "",
        price: initialData.Price || 0,
        isActive: initialData.IsActive ?? true,
        arabicName: initialData.ArabicName || "",
        englishName: initialData.EnglishName || "",
        arabicDescription: initialData.ArabicDescription || "",
        englishDescription: initialData.EnglishDescription || "",
      });
      setPreviewUrl(initialData.ImageUrl || "");
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      submitData.append("Name", formData.name);
      submitData.append("Description", formData.description);
      submitData.append("StartDate", formData.startDate);
      submitData.append("EndDate", formData.endDate);
      submitData.append("Price", formData.price);
      submitData.append("IsActive", formData.isActive);
      submitData.append("ArabicName", formData.arabicName);
      submitData.append("EnglishName", formData.englishName);
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
    router.push("/admin/training-courses");
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.description")}
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

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.startDate")}
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.endDate")}
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.price")}
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Is Active */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              {t("trainingCourses.form.isActive")}
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.image")}
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

          {/* Arabic Name */}
          <div>
            <label htmlFor="arabicName" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.arabicName")}
            </label>
            <input
              type="text"
              id="arabicName"
              name="arabicName"
              value={formData.arabicName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              dir="rtl"
            />
          </div>

          {/* English Name */}
          <div>
            <label htmlFor="englishName" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.englishName")}
            </label>
            <input
              type="text"
              id="englishName"
              name="englishName"
              value={formData.englishName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Arabic Description */}
          <div>
            <label htmlFor="arabicDescription" className="block text-sm font-medium text-gray-700 mb-2">
              {t("trainingCourses.form.arabicDescription")}
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
              {t("trainingCourses.form.englishDescription")}
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
                isEditMode ? t("trainingCourses.form.update") : t("trainingCourses.form.submit")
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("trainingCourses.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrainingCourseForm; 