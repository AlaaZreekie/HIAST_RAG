"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateTrainingCourseForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false, categories = [] }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    courseCode: "",
    durationHours: "",
    numberOfSessions: "",
    targetAudience: "",
    year: new Date().getFullYear(),
    trainingCourseCategoryId: "",
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
        courseCode: initialData.CourseCode || "",
        durationHours: initialData.DurationHours || "",
        numberOfSessions: initialData.NumberOfSessions || "",
        targetAudience: initialData.TargetAudience || "",
        year: initialData.Year || new Date().getFullYear(),
        trainingCourseCategoryId: initialData.TrainingCourseCategoryId || "",
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

    if (!formData.trainingCourseCategoryId) {
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

    const trainingCourseData = {
      CourseCode: formData.courseCode.trim(),
      DurationHours: parseInt(formData.durationHours),
      NumberOfSessions: parseInt(formData.numberOfSessions),
      TargetAudience: formData.targetAudience.trim(),
      Year: parseInt(formData.year),
      TrainingCourseCategoryId: formData.trainingCourseCategoryId,
      Translations: translations
    };

    // Add training course ID for updates
    if (isEditMode && initialData?.Id) {
      trainingCourseData.Id = initialData.Id;
    }

    onSubmit(trainingCourseData);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label htmlFor="trainingCourseCategoryId" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("trainingCourses.form.category")}
              </label>
              <div className="mt-1">
                <select
                  id="trainingCourseCategoryId"
                  value={formData.trainingCourseCategoryId}
                  onChange={(e) => handleInputChange("trainingCourseCategoryId", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  required
                >
                  <option value="">{t("trainingCourses.form.selectCategory")}</option>
                  {categories.map((category) => (
                    <option key={category.Id} value={category.Id}>
                      {category.Translations?.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2))?.Name || category.Name || "Unknown"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Code */}
            <div>
              <label htmlFor="courseCode" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("trainingCourses.form.courseCode")}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="courseCode"
                  value={formData.courseCode}
                  onChange={(e) => handleInputChange("courseCode", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("trainingCourses.form.courseCodePlaceholder")}
                  required
                />
              </div>
            </div>

            {/* Duration Hours */}
            <div>
              <label htmlFor="durationHours" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("trainingCourses.form.durationHours")}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="durationHours"
                  value={formData.durationHours}
                  onChange={(e) => handleInputChange("durationHours", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Number of Sessions */}
            <div>
              <label htmlFor="numberOfSessions" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("trainingCourses.form.numberOfSessions")}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="numberOfSessions"
                  value={formData.numberOfSessions}
                  onChange={(e) => handleInputChange("numberOfSessions", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label htmlFor="targetAudience" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("trainingCourses.form.targetAudience")}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("trainingCourses.form.targetAudiencePlaceholder")}
                  required
                />
              </div>
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("trainingCourses.form.year")}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="year"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  min="2020"
                  max="2030"
                  required
                />
              </div>
            </div>

            {/* Arabic Title */}
            <div>
              <label htmlFor="arabicTitle" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("trainingCourses.form.title")} (${t("trainingCourses.arabic")})`
                  : `${t("trainingCourses.form.title")} (${t("trainingCourses.arabic")})`
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
                  placeholder={t("trainingCourses.form.titlePlaceholder")}
                />
              </div>
            </div>

            {/* Arabic Content */}
            <div>
              <label htmlFor="arabicContent" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("trainingCourses.form.content")} (${t("trainingCourses.arabic")})`
                  : `${t("trainingCourses.form.content")} (${t("trainingCourses.arabic")})`
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
                  placeholder={t("trainingCourses.form.contentPlaceholder")}
                />
              </div>
            </div>

            {/* English Title */}
            <div>
              <label htmlFor="englishTitle" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("trainingCourses.form.title")} (${t("trainingCourses.english")})`
                  : `${t("trainingCourses.form.title")} (${t("trainingCourses.english")})`
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
                  placeholder={t("trainingCourses.form.titlePlaceholder")}
                />
              </div>
            </div>

            {/* English Content */}
            <div>
              <label htmlFor="englishContent" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("trainingCourses.form.content")} (${t("trainingCourses.english")})`
                  : `${t("trainingCourses.form.content")} (${t("trainingCourses.english")})`
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
                  placeholder={t("trainingCourses.form.contentPlaceholder")}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/training-courses")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("trainingCourses.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("trainingCourses.form.update") : t("trainingCourses.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("trainingCourses.form.update") : t("trainingCourses.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrainingCourseForm; 