"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { 
  getAdmissionExamNameInLanguage, 
  getAdmissionExamNotesInLanguage,
  getAdmissionAcademicYear,
  getAdmissionProgramName,
  getAdmissionLocationName,
  formatExamDateTime
} from "@/lib/admissionExamsApi";

const AdmissionExamsTable = ({ exams, onEditExam, onDeleteExam }) => {
  const { t, lang } = useLanguage();
  const [expandedNotes, setExpandedNotes] = useState({});

  const toggleNotes = (examId) => {
    setExpandedNotes(prev => ({
      ...prev,
      [examId]: !prev[examId]
    }));
  };

  const getExamNameInLanguage = (exam) => {
    return getAdmissionExamNameInLanguage(exam, lang === "ar" ? 1 : 2);
  };

  const getExamNotesInLanguage = (exam) => {
    return getAdmissionExamNotesInLanguage(exam, lang === "ar" ? 1 : 2);
  };

  if (!exams || exams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t("admissionExams.noExams")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {exams.map((exam) => {
            const examName = getExamNameInLanguage(exam);
            const examNotes = getExamNotesInLanguage(exam);
            const isNotesExpanded = expandedNotes[exam.Id];
            const academicYear = getAdmissionAcademicYear(exam);
            const programName = getAdmissionProgramName(exam);
            const locationName = getAdmissionLocationName(exam);
            const examDateTime = formatExamDateTime(exam.ExamDateTime);

            return (
              <li key={exam.Id} className="px-6 py-4">
                <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex-1 min-w-0">
                    <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className="flex-1">
                        <div className={`flex items-center space-x-3 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
                              {examName}
                            </div>
                            <div className={`text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
                              {t("admissionExams.id")}: {exam.Id}
                            </div>
                          </div>
                        </div>

                        {/* Exam Date and Time */}
                        <div className={`mt-2 flex items-center space-x-4 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                          <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                            <svg className={`w-4 h-4 text-gray-400 ${lang === "ar" ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-600">{examDateTime}</span>
                          </div>
                        </div>

                        {/* Admission Details */}
                        <div className={`mt-2 flex items-center space-x-4 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                          <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                            <svg className={`w-4 h-4 text-green-500 ${lang === "ar" ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm text-gray-600">{academicYear}</span>
                          </div>
                          <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                            <svg className={`w-4 h-4 text-blue-500 ${lang === "ar" ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="text-sm text-gray-600">{programName}</span>
                          </div>
                          <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                            <svg className={`w-4 h-4 text-indigo-500 ${lang === "ar" ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm text-gray-600">{locationName}</span>
                          </div>
                        </div>

                        {/* Notes */}
                        {examNotes && (
                          <div className="mt-2">
                            <div className={`text-sm text-gray-600 ${lang === "ar" ? "text-right" : "text-left"}`}>
                              {isNotesExpanded ? examNotes : examNotes.length > 100 ? examNotes.substring(0, 100) + "..." : examNotes}
                            </div>
                            {examNotes.length > 100 && (
                              <button
                                onClick={() => toggleNotes(exam.Id)}
                                className={`mt-1 text-sm text-indigo-600 hover:text-indigo-800 ${lang === "ar" ? "text-right" : "text-left"}`}
                              >
                                {isNotesExpanded ? t("admissionExams.showLess") : t("admissionExams.showMore")}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Translations */}
                        {exam.Translations && exam.Translations.length > 0 && (
                          <div className="mt-2">
                            <div className={`flex flex-wrap gap-2 ${lang === "ar" ? "justify-end" : "justify-start"}`}>
                              {exam.Translations.map((translation) => (
                                <span
                                  key={translation.Id}
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    translation.LanguageCode === 1
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {translation.LanguageCode === 1 ? t("admissionExams.arabic") : t("admissionExams.english")}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className={`flex items-center space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                        <button
                          onClick={() => onEditExam(exam.Id)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          {t("admissionExams.edit")}
                        </button>
                        <button
                          onClick={() => onDeleteExam(exam.Id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          {t("admissionExams.delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdmissionExamsTable; 