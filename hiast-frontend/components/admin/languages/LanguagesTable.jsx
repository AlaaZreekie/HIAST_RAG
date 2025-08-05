"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { getLanguageCodeDisplay } from "@/lib/languagesApi";

const LanguagesTable = ({ languages, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();

  // Debug logging
  console.log("LanguagesTable received languages:", languages);

  if (!languages || languages.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">{t("languages.noLanguages")}</p>
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
            {languages.map((language) => {
              console.log("Rendering language:", language);
              return (
                <div
                  key={language.Id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className={`flex justify-between items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className={`flex items-center space-x-3 mb-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                        <span className="text-sm font-medium text-gray-500">
                          ID: {language.Id}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {t("languages.code")}: {getLanguageCodeDisplay(language.Code)}
                        </span>
                      </div>

                      <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {language.Name || "N/A"}
                      </h3>

                      <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        <p>{t("languages.code")}: {getLanguageCodeDisplay(language.Code)}</p>
                        {language.Description && (
                          <p className="mt-1">{language.Description}</p>
                        )}
                      </div>

                      {/* Additional Language Info */}
                      <div className={`text-xs text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        <div className="flex flex-wrap gap-4">
                          <span>{t("languages.isActive")}: {language.IsActive ? "Yes" : "No"}</span>
                          <span>{t("languages.displayOrder")}: {language.DisplayOrder || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                      <button
                        onClick={() => onEdit(language.Id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        onClick={() => onDelete(language.Id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        {t("common.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesTable; 