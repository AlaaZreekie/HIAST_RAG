"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateAdmissionForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false, programs = [], locations = [] }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    academicYear: new Date().getFullYear(),
    programId: "",
    locationId: "",
    isActive: true,
    arabicName: "",
    englishName: "",
    arabicDescription: "",
    englishDescription: ""
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        academicYear: initialData.AcademicYear || new Date().getFullYear(),
        programId: initialData.ProgramId || "",
        locationId: initialData.LocationId || "",
        isActive: initialData.IsActive ?? true,
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

    if (!formData.programId) {
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

    const admissionData = {
      AcademicYear: parseInt(formData.academicYear),
      ProgramId: formData.programId,
      LocationId: formData.locationId,
      IsActive: formData.isActive,
      Translations: translations
    };

    if (isEditMode && initialData?.Id) {
      admissionData.Id = initialData.Id;
    }

    onSubmit(admissionData);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="programId" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("admissions.form.program")}
              </label>
              <div className="mt-1">
                <select
                  id="programId"
                  value={formData.programId}
                  onChange={(e) => handleInputChange("programId", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  required
                >
                  <option value="">{t("admissions.form.selectProgram")}</option>
                  {programs.map((program) => (
                    <option key={program.Id} value={program.Id}>
                      {program.Translations?.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2))?.Name || program.Name || "Unknown"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="academicYear" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("admissions.form.academicYear")}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="academicYear"
                  value={formData.academicYear}
                  onChange={(e) => handleInputChange("academicYear", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  min="2020"
                  max="2030"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange("isActive", e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className={`ml-2 block text-sm text-gray-900 ${
                lang === "ar" ? "mr-2 ml-0" : "ml-2"
              }`}>
                {t("admissions.form.isActive")}
              </label>
            </div>

            <div>
              <label htmlFor="arabicName" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("admissions.form.name")} ({t("admissions.arabic")})
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="arabicName"
                  value={formData.arabicName}
                  onChange={(e) => handleInputChange("arabicName", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("admissions.form.namePlaceholder")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="englishName" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("admissions.form.name")} ({t("admissions.english")})
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="englishName"
                  value={formData.englishName}
                  onChange={(e) => handleInputChange("englishName", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("admissions.form.namePlaceholder")}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/admissions")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("admissions.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("admissions.form.update") : t("admissions.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("admissions.form.update") : t("admissions.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmissionForm; 