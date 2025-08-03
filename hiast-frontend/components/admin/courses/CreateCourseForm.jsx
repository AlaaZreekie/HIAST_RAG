"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateCourseForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false, courseGroups = [] }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    courseCode: "",
    credits: "",
    theoreticalHours: "",
    practicalHours: "",
    courseGroupId: "",
    arabicName: "",
    englishName: "",
    arabicDescription: "",
    englishDescription: ""
  });

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        courseCode: initialData.CourseCode || "",
        credits: initialData.Credits || "",
        theoreticalHours: initialData.TheoreticalHours || "",
        practicalHours: initialData.PracticalHours || "",
        courseGroupId: initialData.CourseGroupId || "",
        arabicName: arabicTranslation?.Name || "",
        englishName: englishTranslation?.Name || "",
        arabicDescription: arabicTranslation?.Description || "",
        englishDescription: englishTranslation?.Description || ""
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
    
    if (!formData.arabicName.trim() && !formData.englishName.trim()) {
      return;
    }

    if (!formData.courseGroupId) {
      return;
    }

    const translations = [];
    
    if (formData.arabicName.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null,
        LanguageCode: 1,
        Name: formData.arabicName.trim(),
        Description: formData.arabicDescription.trim()
      });
    }
    
    if (formData.englishName.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null,
        LanguageCode: 2,
        Name: formData.englishName.trim(),
        Description: formData.englishDescription.trim()
      });
    }

    const courseData = {
      CourseCode: formData.courseCode.trim(),
      Credits: parseFloat(formData.credits),
      TheoreticalHours: parseInt(formData.theoreticalHours),
      PracticalHours: parseInt(formData.practicalHours),
      CourseGroupId: formData.courseGroupId,
      Translations: translations
    };

    // Add course ID for updates
    if (isEditMode && initialData?.Id) {
      courseData.Id = initialData.Id;
    }

    onSubmit(courseData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Course Code */}
            <div>
              <label htmlFor="courseCode" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.courseCode")}
              </label>
              <input
                type="text"
                id="courseCode"
                value={formData.courseCode}
                onChange={(e) => handleInputChange("courseCode", e.target.value)}
                required
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                placeholder={t("courses.form.courseCodePlaceholder")}
              />
            </div>

            {/* Credits */}
            <div>
              <label htmlFor="credits" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.credits")}
              </label>
              <input
                type="number"
                id="credits"
                value={formData.credits}
                onChange={(e) => handleInputChange("credits", e.target.value)}
                required
                step="0.5"
                min="0"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                placeholder={t("courses.form.creditsPlaceholder")}
              />
            </div>

            {/* Theoretical Hours */}
            <div>
              <label htmlFor="theoreticalHours" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.theoreticalHours")}
              </label>
              <input
                type="number"
                id="theoreticalHours"
                value={formData.theoreticalHours}
                onChange={(e) => handleInputChange("theoreticalHours", e.target.value)}
                required
                min="0"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                placeholder={t("courses.form.theoreticalHoursPlaceholder")}
              />
            </div>

            {/* Practical Hours */}
            <div>
              <label htmlFor="practicalHours" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.practicalHours")}
              </label>
              <input
                type="number"
                id="practicalHours"
                value={formData.practicalHours}
                onChange={(e) => handleInputChange("practicalHours", e.target.value)}
                required
                min="0"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                placeholder={t("courses.form.practicalHoursPlaceholder")}
              />
            </div>

            {/* Course Group */}
            <div>
              <label htmlFor="courseGroupId" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.courseGroup")}
              </label>
              <select
                id="courseGroupId"
                value={formData.courseGroupId}
                onChange={(e) => handleInputChange("courseGroupId", e.target.value)}
                required
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                <option value="">{t("courses.form.selectCourseGroup")}</option>
                {courseGroups.map((group) => (
                  <option key={group.Id} value={group.Id}>
                    {group.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Arabic Name */}
            <div>
              <label htmlFor="arabicName" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.name")} ({t("courses.arabic")})
              </label>
              <input
                type="text"
                id="arabicName"
                value={formData.arabicName}
                onChange={(e) => handleInputChange("arabicName", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                placeholder={t("courses.form.namePlaceholder")}
              />
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="englishName" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.name")} ({t("courses.english")})
              </label>
              <input
                type="text"
                id="englishName"
                value={formData.englishName}
                onChange={(e) => handleInputChange("englishName", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                placeholder={t("courses.form.namePlaceholder")}
              />
            </div>

            {/* Arabic Description */}
            <div>
              <label htmlFor="arabicDescription" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.description")} ({t("courses.arabic")})
              </label>
              <textarea
                id="arabicDescription"
                value={formData.arabicDescription}
                onChange={(e) => handleInputChange("arabicDescription", e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                placeholder={t("courses.form.descriptionPlaceholder")}
              />
            </div>

            {/* English Description */}
            <div>
              <label htmlFor="englishDescription" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("courses.form.description")} ({t("courses.english")})
              </label>
              <textarea
                id="englishDescription"
                value={formData.englishDescription}
                onChange={(e) => handleInputChange("englishDescription", e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                placeholder={t("courses.form.descriptionPlaceholder")}
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