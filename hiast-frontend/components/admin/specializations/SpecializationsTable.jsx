"use client";
import { useLanguage } from "@/components/LanguageProvider";

const SpecializationsTable = ({ specializations, onEditSpecialization, onDeleteSpecialization }) => {
  const { t, lang } = useLanguage();

  if (specializations.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-500">{t("specializations.noSpecializations")}</p>
        </div>
      </div>
    );
  }

  const getSpecializationNameInLanguage = (specialization, languageCode) => {
    if (!specialization?.Translations) return specialization?.Name || "Unknown";
    const translation = specialization.Translations.find(t => t.LanguageCode === languageCode);
    return translation?.Name || specialization?.Name || "Unknown";
  };

  const getProgramNameInLanguage = (program, languageCode) => {
    if (!program?.Translations) return program?.Name || "Unknown";
    const translation = program.Translations.find(t => t.LanguageCode === languageCode);
    return translation?.Name || program?.Name || "Unknown";
  };

  const getLocationNameInLanguage = (location, languageCode) => {
    if (!location?.Translations) return location?.Name || "Unknown";
    const translation = location.Translations.find(t => t.LanguageCode === languageCode);
    return translation?.Name || location?.Name || "Unknown";
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className={`text-lg font-medium text-gray-900 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("specializations.title")} ({specializations.length})
        </h3>
      </div>

      {/* Scrollable Specializations Container - Max 3 specializations visible */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {specializations.map((specialization) => {
            const specializationName = getSpecializationNameInLanguage(specialization, lang === "ar" ? 1 : 2);
            const programName = getProgramNameInLanguage(specialization.Program, lang === "ar" ? 1 : 2);
            const locationName = getLocationNameInLanguage(specialization.Location, lang === "ar" ? 1 : 2);
            
            return (
              <div key={specialization.Id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className={`flex justify-between items-start ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}>
                  {/* Specialization Info */}
                  <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <div className={`flex items-center mb-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                      <div className={lang === "ar" ? "ml-3" : "mr-3"}>
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {specializationName || t("specializations.noName")}
                        </h4>
                        <div className={`flex items-center text-sm text-gray-500 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                          <span className={lang === "ar" ? "ml-1" : "mr-1"}>{t("specializations.id")}:</span>
                          <span className="font-mono">{specialization.Id}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Program and Location Info */}
                    <div className={`flex items-center space-x-4 mb-3 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""}`}>
                      {specialization.Program && (
                        <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                          <svg className={`w-4 h-4 text-green-500 ${lang === "ar" ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm text-gray-600">{programName}</span>
                        </div>
                      )}
                      {specialization.Location && (
                        <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                          <svg className={`w-4 h-4 text-indigo-500 ${lang === "ar" ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">{locationName}</span>
                        </div>
                      )}
                    </div>

                    {/* Translations */}
                    {specialization.Translations && specialization.Translations.length > 0 && (
                      <div className="mb-3">
                        <p className={`text-xs font-medium text-gray-700 mb-1 ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}>
                          {t("specializations.translations")}:
                        </p>
                        <div className={`flex flex-wrap gap-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                          {specialization.Translations.map((translation, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {translation.LanguageCode === 1 ? t("specializations.arabic") : t("specializations.english")}: {translation.Name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Admin Actions */}
                  <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                    <button
                      onClick={() => onEditSpecialization(specialization.Id)}
                      className={`text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("specializations.edit")}
                    </button>
                    <button
                      onClick={() => onDeleteSpecialization(specialization.Id)}
                      className={`text-red-600 hover:text-red-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("specializations.delete")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpecializationsTable; 