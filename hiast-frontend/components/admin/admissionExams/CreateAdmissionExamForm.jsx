"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { getAdmissionAcademicYear, getAdmissionProgramName, getAdmissionLocationName } from "@/lib/admissionsApi";

const CreateAdmissionExamForm = ({
  onSubmit,
  isLoading,
  error,
  admissions = [],
  initialData = null,
  isEditMode = false
}) => {
  const router = useRouter();
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    ExamDateTime: "",
    AdmissionId: "",
    Translations: [
      {
        LanguageCode: 1, // Arabic
        ExamName: "",
        Notes: ""
      },
      {
        LanguageCode: 2, // English
        ExamName: "",
        Notes: ""
      }
    ]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Id: initialData.Id,
        ExamDateTime: initialData.ExamDateTime ? new Date(initialData.ExamDateTime).toISOString().slice(0, 16) : "",
        AdmissionId: initialData.Admission?.Id || "",
        Translations: initialData.Translations || [
          {
            LanguageCode: 1,
            ExamName: "",
            Notes: ""
          },
          {
            LanguageCode: 2,
            ExamName: "",
            Notes: ""
          }
        ]
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTranslationChange = (languageCode, field, value) => {
    setFormData(prev => ({
      ...prev,
      Translations: prev.Translations.map(translation => 
        translation.LanguageCode === languageCode 
          ? { ...translation, [field]: value }
          : translation
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.ExamDateTime) {
      alert(t("admissionExams.examDateTimeRequired"));
      return;
    }
    if (!formData.AdmissionId) {
      alert(t("admissionExams.admissionRequired"));
      return;
    }
    if (!formData.Translations[0].ExamName && !formData.Translations[1].ExamName) {
      alert(t("admissionExams.examNameRequired"));
      return;
    }

    // Filter out empty translations
    const validTranslations = formData.Translations.filter(t => t.ExamName.trim());
    
    const submitData = {
      ...formData,
      ExamDateTime: new Date(formData.ExamDateTime).toISOString(),
      Translations: validTranslations
    };

    onSubmit(submitData);
  };

  const getAdmissionDisplayName = (admission) => {
    const academicYear = getAdmissionAcademicYear(admission);
    const programName = getAdmissionProgramName(admission);
    const locationName = getAdmissionLocationName(admission);
    return `${academicYear} - ${programName} - ${locationName}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Exam Date and Time */}
      <div>
        <label htmlFor="examDateTime" className={`block text-sm font-medium text-gray-700 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("admissionExams.form.examDateTime")} *
        </label>
        <div className="mt-1">
          <input
            type="datetime-local"
            id="examDateTime"
            name="ExamDateTime"
            value={formData.ExamDateTime}
            onChange={handleInputChange}
            required
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          />
        </div>
      </div>

      {/* Admission Selection */}
      <div>
        <label htmlFor="admission" className={`block text-sm font-medium text-gray-700 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("admissionExams.form.admission")} *
        </label>
        <div className="mt-1">
          <select
            id="admission"
            name="AdmissionId"
            value={formData.AdmissionId}
            onChange={handleInputChange}
            required
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
            size="3"
          >
            <option value="">{t("admissionExams.form.selectAdmission")}</option>
            {admissions.map((admission) => (
              <option key={admission.Id} value={admission.Id}>
                {getAdmissionDisplayName(admission)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Arabic Translation */}
      <div className="border border-gray-200 rounded-md p-4">
        <h3 className={`text-lg font-medium text-gray-900 mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
          {t("admissionExams.form.arabicTranslation")}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="arabicExamName" className={`block text-sm font-medium text-gray-700 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}>
              {t("admissionExams.form.examName")} (العربية)
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="arabicExamName"
                value={formData.Translations.find(t => t.LanguageCode === 1)?.ExamName || ""}
                onChange={(e) => handleTranslationChange(1, "ExamName", e.target.value)}
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                lang="ar"
              />
            </div>
          </div>

          <div>
            <label htmlFor="arabicNotes" className={`block text-sm font-medium text-gray-700 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}>
              {t("admissionExams.form.notes")} (العربية)
            </label>
            <div className="mt-1">
              <textarea
                id="arabicNotes"
                value={formData.Translations.find(t => t.LanguageCode === 1)?.Notes || ""}
                onChange={(e) => handleTranslationChange(1, "Notes", e.target.value)}
                rows={3}
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                lang="ar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* English Translation */}
      <div className="border border-gray-200 rounded-md p-4">
        <h3 className={`text-lg font-medium text-gray-900 mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
          {t("admissionExams.form.englishTranslation")}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="englishExamName" className={`block text-sm font-medium text-gray-700 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}>
              {t("admissionExams.form.examName")} (English)
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="englishExamName"
                value={formData.Translations.find(t => t.LanguageCode === 2)?.ExamName || ""}
                onChange={(e) => handleTranslationChange(2, "ExamName", e.target.value)}
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                lang="en"
              />
            </div>
          </div>

          <div>
            <label htmlFor="englishNotes" className={`block text-sm font-medium text-gray-700 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}>
              {t("admissionExams.form.notes")} (English)
            </label>
            <div className="mt-1">
              <textarea
                id="englishNotes"
                value={formData.Translations.find(t => t.LanguageCode === 2)?.Notes || ""}
                onChange={(e) => handleTranslationChange(2, "Notes", e.target.value)}
                rows={3}
                className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                lang="en"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className={`flex space-x-3 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""}`}>
        <button
          type="submit"
          disabled={isLoading}
          className="admin-button admin-button-primary"
        >
          {isLoading ? t("admissionExams.form.saving") : (isEditMode ? t("admissionExams.form.update") : t("admissionExams.form.submit"))}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/admissionExams")}
          className="admin-button admin-button-secondary"
        >
          {t("admissionExams.form.cancel")}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </form>
  );
};

export default CreateAdmissionExamForm; 