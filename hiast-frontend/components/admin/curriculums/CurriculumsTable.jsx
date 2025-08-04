"use client";
import { useLanguage } from "@/components/LanguageProvider";

const CurriculumsTable = ({ curriculums, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();

  const getCurriculumNameInLanguage = (curriculum) => {
    if (!curriculum.Translations || !Array.isArray(curriculum.Translations)) return "N/A";
    const translation = curriculum.Translations.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2)) || curriculum.Translations[0];
    return translation?.Name || "N/A";
  };

  const getCurriculumDescriptionInLanguage = (curriculum) => {
    if (!curriculum.Translations || !Array.isArray(curriculum.Translations)) return "N/A";
    const translation = curriculum.Translations.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2)) || curriculum.Translations[0];
    return translation?.Description || "N/A";
  };

  if (!curriculums || curriculums.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">{t("curriculums.noCurriculums")}</p>
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
            {curriculums.map((curriculum) => (
              <div
                key={curriculum.Id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className={`flex justify-between items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex-1">
                    <div className={`flex items-center space-x-3 mb-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                      <span className="text-sm font-medium text-gray-500">
                        ID: {curriculum.Id}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {t("curriculums.displayOrder")}: {curriculum.DisplayOrder || 0}
                      </span>
                    </div>

                    <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {getCurriculumNameInLanguage(curriculum)}
                    </h3>

                    <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <p>{getCurriculumDescriptionInLanguage(curriculum)}</p>
                    </div>

                    {/* Translations */}
                    {curriculum.Translations && curriculum.Translations.length > 0 && (
                      <div className={`flex flex-wrap gap-2 mb-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                        {curriculum.Translations.map((translation) => (
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
                      onClick={() => onEdit(curriculum.Id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      {t("common.edit")}
                    </button>
                    <button
                      onClick={() => onDelete(curriculum.Id)}
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

export default CurriculumsTable; 