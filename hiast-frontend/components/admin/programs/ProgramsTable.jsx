"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { getProgramNameInLanguage } from "@/lib/programsApi";

const ProgramsTable = ({ programs, onEdit, onDelete }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [expandedPrograms, setExpandedPrograms] = useState(new Set());

  console.log("ProgramsTable received programs:", programs);

  const toggleProgramExpansion = (programId) => {
    setExpandedPrograms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(programId)) {
        newSet.delete(programId);
      } else {
        newSet.add(programId);
      }
      return newSet;
    });
  };

  const getContentInLanguage = (program, field) => {
    if (!program?.Translations) return "";
    const currentLanguageCode = lang === "ar" ? 1 : 2;
    const translation = program.Translations.find(t => t.LanguageCode === currentLanguageCode);
    return translation?.[field] || "";
  };

  const handleEdit = (program) => {
    router.push(`/admin/programs/edit/${program.Id}`);
  };

  const handleDelete = async (program) => {
    if (window.confirm(t("programs.confirmDelete"))) {
      await onDelete(program.Id);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="max-h-96 overflow-y-auto p-4">
        {programs.length === 0 ? (
          <div className={`text-center py-8 text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
            {t("programs.noPrograms")}
          </div>
        ) : (
          <div className="space-y-4">
            {programs.map((program) => {
              const programName = getProgramNameInLanguage(program, lang === "ar" ? 1 : 2);
              const isExpanded = expandedPrograms.has(program.Id);
              
              return (
                <div key={program.Id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className={`flex items-start justify-between ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Program Info */}
                    <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className={`flex items-center mb-2 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={lang === "ar" ? "ml-3" : "mr-3"}>
                          <svg
                            className="h-6 w-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {programName || t("programs.noName")}
                          </h4>
                          <div className={`flex items-center text-sm text-gray-500 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                            <span className={lang === "ar" ? "ml-1" : "mr-1"}>{t("programs.id")}:</span>
                            <span className="font-mono">{program.Id}</span>
                          </div>
                        </div>
                      </div>

                      {/* Program Duration */}
                      {program.Duration && (
                        <div className="mt-2">
                          <p className={`text-sm text-gray-600 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            <span className="font-medium">{t("programs.form.duration")}:</span> {program.Duration}
                          </p>
                        </div>
                      )}

                      {/* Program Description */}
                      {(() => {
                        const currentLanguageCode = lang === "ar" ? 1 : 2;
                        const translation = program.Translations?.find(t => t.LanguageCode === currentLanguageCode);
                        const description = translation?.Description;
                        
                        if (description) {
                          return (
                            <div className="mt-2">
                              <p className={`text-sm text-gray-600 ${lang === "ar" ? "text-right" : "text-left"}`}>
                                {isExpanded ? description : `${description.substring(0, 100)}...`}
                              </p>
                              {description.length > 100 && (
                                <button
                                  onClick={() => toggleProgramExpansion(program.Id)}
                                  className={`mt-2 text-sm text-indigo-600 hover:text-indigo-800 ${
                                    lang === "ar" ? "text-right" : "text-left"
                                  }`}
                                >
                                  {isExpanded ? t("programs.showLess") : t("programs.showMore")}
                                </button>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })()}

                      {/* Translations */}
                      {program.Translations && program.Translations.length > 0 && (
                        <div className="mt-3">
                          <div className={`flex flex-wrap gap-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                            {program.Translations.map((translation) => (
                              <span
                                key={translation.Id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {translation.LanguageCode === 1 ? t("programs.arabic") : t("programs.english")}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <button
                        onClick={() => handleEdit(program)}
                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        <svg
                          className={`h-4 w-4 ${lang === "ar" ? "ml-1" : "mr-1"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        {t("programs.edit")}
                      </button>
                      <button
                        onClick={() => handleDelete(program)}
                        className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        <svg
                          className={`h-4 w-4 ${lang === "ar" ? "ml-1" : "mr-1"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        {t("programs.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramsTable; 