"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { createAdmissionResultFormData } from "@/lib/admissionResultsApi";

const CreateAdmissionResultForm = ({ 
  onSubmit, 
  isLoading, 
  error, 
  admissions = [], 
  mediaCategories = [],
  initialData = null,
  isEditMode = false 
}) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  
  const [formData, setFormData] = useState({
    AdmissionId: "",
    ResultType: 0,
    MediaCategoryId: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        Id: initialData.Id,
        AdmissionId: initialData.Admission?.Id || "",
        ResultType: initialData.ResultType || 0,
        MediaCategoryId: initialData.Media?.MediaCategoryId || "",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setFileError(t("admissionResults.invalidFileType"));
        setSelectedFile(null);
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFileError(t("admissionResults.fileTooLarge"));
        setSelectedFile(null);
        return;
      }
      
      setFileError("");
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEditMode && !selectedFile) {
      setFileError(t("admissionResults.fileRequired"));
      return;
    }

    if (!formData.AdmissionId) {
      alert(t("admissionResults.admissionRequired"));
      return;
    }

    if (!formData.MediaCategoryId) {
      alert(t("admissionResults.mediaCategoryRequired"));
      return;
    }

    try {
      const resultData = createAdmissionResultFormData(formData, selectedFile);
      await onSubmit(resultData);
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  const getAdmissionDisplayName = (admission) => {
    if (!admission) return "";
    const programName = admission.Program?.Name || "Unknown Program";
    const locationName = admission.Location?.Name || "Unknown Location";
    return `${admission.AcademicYear} - ${programName} (${locationName})`;
  };

  const getResultTypeName = (type) => {
    switch (type) {
      case 0: return t("admissionResults.initialList");
      case 1: return t("admissionResults.finalAdmitted");
      case 2: return t("admissionResults.waitingList");
      default: return t("admissionResults.unknown");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Admission Selection */}
      <div>
        <label htmlFor="admission" className={`block text-sm font-medium text-gray-700 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("admissionResults.admission")} *
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
            <option value="">{t("admissionResults.selectAdmission")}</option>
            {admissions.map((admission) => (
              <option key={admission.Id} value={admission.Id}>
                {getAdmissionDisplayName(admission)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Type Selection */}
      <div>
        <label htmlFor="resultType" className={`block text-sm font-medium text-gray-700 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("admissionResults.resultType")} *
        </label>
        <div className="mt-1">
          <select
            id="resultType"
            name="ResultType"
            value={formData.ResultType}
            onChange={handleInputChange}
            required
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            <option value={0}>{getResultTypeName(0)}</option>
            <option value={1}>{getResultTypeName(1)}</option>
            <option value={2}>{getResultTypeName(2)}</option>
          </select>
        </div>
      </div>

      {/* Media Category Selection */}
      <div>
        <label htmlFor="mediaCategory" className={`block text-sm font-medium text-gray-700 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("admissionResults.mediaCategory")} *
        </label>
        <div className="mt-1">
          <select
            id="mediaCategory"
            name="MediaCategoryId"
            value={formData.MediaCategoryId}
            onChange={handleInputChange}
            required
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
            size="3"
          >
            <option value="">{t("admissionResults.selectMediaCategory")}</option>
            {mediaCategories.map((category) => (
              <option key={category.Id} value={category.Id}>
                {category.Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* File Upload */}
      {!isEditMode && (
        <div>
          <label htmlFor="file" className={`block text-sm font-medium text-gray-700 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}>
            {t("admissionResults.file")} *
          </label>
          <div className="mt-1">
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.gif"
              required={!isEditMode}
              className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
              dir={lang === "ar" ? "rtl" : "ltr"}
              lang={lang}
            />
            {fileError && (
              <p className="mt-1 text-sm text-red-600">{fileError}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {t("admissionResults.fileHelp")}
            </p>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className={`flex space-x-3 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""}`}>
        <button
          type="submit"
          disabled={isLoading}
          className="admin-button admin-button-primary"
        >
          {isLoading ? t("admissionResults.saving") : (isEditMode ? t("admissionResults.update") : t("admissionResults.create"))}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/admissionResults")}
          className="admin-button admin-button-secondary"
        >
          {t("admissionResults.cancel")}
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

export default CreateAdmissionResultForm; 