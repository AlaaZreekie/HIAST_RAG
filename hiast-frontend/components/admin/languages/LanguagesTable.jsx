"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { getLanguageCodeDisplay } from "@/lib/languagesApi";

const LanguagesTable = ({ languages, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-h-96 overflow-y-auto">
          {languages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t("languages.noLanguages")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {languages.map((language) => (
                <div
                  key={language.Id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          ID: {language.Id}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Code: {getLanguageCodeDisplay(language.Code)}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {language.Name}
                      </h3>

                      <div className="text-sm text-gray-600 mb-3">
                        <p>Code: {getLanguageCodeDisplay(language.Code)}</p>
                      </div>
                    </div>

                    <div
                      className={`flex space-x-2 ${
                        lang === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguagesTable; 