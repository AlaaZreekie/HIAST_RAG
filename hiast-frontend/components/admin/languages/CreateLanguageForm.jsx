"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const CreateLanguageForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    code: "",
    name: ""
  });

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        code: initialData.Code || "",
        name: initialData.Name || ""
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
    
    if (!formData.name.trim()) {
      return;
    }

    const languageData = {
      Code: formData.code.trim(),
      Name: formData.name.trim()
    };

    // Add language ID for updates
    if (isEditMode && initialData?.Id) {
      languageData.Id = initialData.Id;
    }

    onSubmit(languageData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Language Code */}
            <div>
              <label htmlFor="code" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("languages.form.code")}
              </label>
              <select
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                required
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                <option value="">{t("languages.form.selectCode")}</option>
                <option value="1">{t("languages.form.arabic")}</option>
                <option value="2">{t("languages.form.english")}</option>
              </select>
            </div>

            {/* Language Name */}
            <div>
              <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("languages.form.name")}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                placeholder={t("languages.form.namePlaceholder")}
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
              {isLoading ? t("common.loading") : (isEditMode ? t("languages.form.update") : t("languages.form.submit"))}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("languages.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLanguageForm; 