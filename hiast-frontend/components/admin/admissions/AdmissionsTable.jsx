"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const AdmissionsTable = ({ admissions, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();
  const [expandedContent, setExpandedContent] = useState({});

  const getAdmissionNameInLanguage = (admission) => {
    if (!admission.Translations || !Array.isArray(admission.Translations)) return "N/A";
    const translation = admission.Translations.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2)) || admission.Translations[0];
    return translation?.Name || "N/A";
  };

  const getAdmissionDescriptionInLanguage = (admission) => {
    if (!admission.Translations || !Array.isArray(admission.Translations)) return "N/A";
    const translation = admission.Translations.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2)) || admission.Translations[0];
    return translation?.Description || "N/A";
  };

  const toggleContent = (admissionId) => {
    setExpandedContent(prev => ({
      ...prev,
      [admissionId]: !prev[admissionId]
    }));
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (!admissions || admissions.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">{t("admissions.noAdmissions")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {admissions.map((admission) => (
              <div
                key={admission.Id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className={`flex justify-between items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex-1">
                    <div className={`flex items-center space-x-3 mb-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                      <span className="text-sm font-medium text-gray-500">
                        ID: {admission.Id}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {t("admissions.academicYear")}: {admission.AcademicYear || "N/A"}
                      </span>
                      {admission.IsActive && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {t("admissions.active")}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {getAdmissionNameInLanguage(admission)}
                    </h3>

                    <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <p>
                        {expandedContent[admission.Id] 
                          ? getAdmissionDescriptionInLanguage(admission)
                          : truncateText(getAdmissionDescriptionInLanguage(admission))
                        }
                      </p>
                      {getAdmissionDescriptionInLanguage(admission).length > 100 && (
                        <button
                          onClick={() => toggleContent(admission.Id)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
                        >
                          {expandedContent[admission.Id] ? t("common.showLess") : t("common.showMore")}
                        </button>
                      )}
                    </div>

                    {/* Additional Details */}
                    <div className={`text-xs text-gray-500 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className="flex flex-wrap gap-4">
                        <span>{t("admissions.startDate")}: {admission.StartDate ? new Date(admission.StartDate).toLocaleDateString() : "N/A"}</span>
                        <span>{t("admissions.endDate")}: {admission.EndDate ? new Date(admission.EndDate).toLocaleDateString() : "N/A"}</span>
                        <span>{t("admissions.maxStudents")}: {admission.MaxStudents || "N/A"}</span>
                      </div>
                    </div>

                    {/* Translations */}
                    {admission.Translations && admission.Translations.length > 0 && (
                      <div className={`flex flex-wrap gap-2 mb-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                        {admission.Translations.map((translation) => (
                          <span
                            key={translation.Id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {translation.LanguageName}: {translation.Name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                    <button
                      onClick={() => onEdit(admission.Id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      {t("common.edit")}
                    </button>
                    <button
                      onClick={() => onDelete(admission.Id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      {t("common.delete")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsTable; 