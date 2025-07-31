"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const CoursesTable = ({ courses, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();
  const [expandedContent, setExpandedContent] = useState({});

  const getCourseNameInLanguage = (course) => {
    if (!course.Translations || !Array.isArray(course.Translations)) return "N/A";
    const translation = course.Translations.find(t => t.LanguageCode === lang) || course.Translations[0];
    return translation?.Name || "N/A";
  };

  const getCourseDescriptionInLanguage = (course) => {
    if (!course.Translations || !Array.isArray(course.Translations)) return "N/A";
    const translation = course.Translations.find(t => t.LanguageCode === lang) || course.Translations[0];
    return translation?.Description || "N/A";
  };

  const toggleContent = (courseId) => {
    setExpandedContent(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-h-96 overflow-y-auto">
          {courses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t("courses.noCourses")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.Id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          ID: {course.Id}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {getCourseNameInLanguage(course)}
                      </h3>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        <p>
                          {expandedContent[course.Id] 
                            ? getCourseDescriptionInLanguage(course)
                            : truncateText(getCourseDescriptionInLanguage(course))
                          }
                        </p>
                        {getCourseDescriptionInLanguage(course).length > 100 && (
                          <button
                            onClick={() => toggleContent(course.Id)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
                          >
                            {expandedContent[course.Id] ? t("common.showLess") : t("common.showMore")}
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{t("courses.translations")}: {course.Translations?.length || 0}</span>
                      </div>
                    </div>
                    
                    <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                      <button
                        onClick={() => onEdit(course.Id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        onClick={() => onDelete(course.Id)}
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

export default CoursesTable; 