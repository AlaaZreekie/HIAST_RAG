"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const TrainingCoursesTable = ({ trainingCourses, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();
  const [expandedContent, setExpandedContent] = useState({});

  const getTrainingCourseNameInLanguage = (trainingCourse) => {
    return trainingCourse.Name || "N/A";
  };

  const getTrainingCourseDescriptionInLanguage = (trainingCourse) => {
    return trainingCourse.Description || "N/A";
  };

  const toggleContent = (trainingCourseId) => {
    setExpandedContent(prev => ({
      ...prev,
      [trainingCourseId]: !prev[trainingCourseId]
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
          {trainingCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t("trainingCourses.noTrainingCourses")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trainingCourses.map((trainingCourse) => (
                <div key={trainingCourse.Id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          ID: {trainingCourse.Id}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {trainingCourse.CategoryName || "No Category"}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {getTrainingCourseNameInLanguage(trainingCourse)}
                      </h3>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        <p>
                          {expandedContent[trainingCourse.Id] 
                            ? getTrainingCourseDescriptionInLanguage(trainingCourse)
                            : truncateText(getTrainingCourseDescriptionInLanguage(trainingCourse))
                          }
                          {getTrainingCourseDescriptionInLanguage(trainingCourse).length > 100 && (
                            <button
                              onClick={() => toggleContent(trainingCourse.Id)}
                              className="ml-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                              {expandedContent[trainingCourse.Id] ? t("common.showLess") : t("common.showMore")}
                            </button>
                          )}
                        </p>
                      </div>
                      
                      {trainingCourse.ImageUrl && (
                        <div className="mb-3">
                          <img 
                            src={trainingCourse.ImageUrl} 
                            alt={getTrainingCourseNameInLanguage(trainingCourse)}
                            className="w-32 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500">
                        <span className="mr-4">
                          {t("trainingCourses.translations")}: {getTrainingCourseTranslations(trainingCourse).length}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                      <button
                        onClick={() => onEdit(trainingCourse.Id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        onClick={() => onDelete(trainingCourse.Id)}
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

const getTrainingCourseTranslations = (trainingCourse) => {
  if (!trainingCourse) return [];
  
  const translations = [];
  
  if (trainingCourse.Name) translations.push("Name");
  if (trainingCourse.ArabicName) translations.push("ArabicName");
  if (trainingCourse.EnglishName) translations.push("EnglishName");
  if (trainingCourse.Description) translations.push("Description");
  if (trainingCourse.ArabicDescription) translations.push("ArabicDescription");
  if (trainingCourse.EnglishDescription) translations.push("EnglishDescription");
  
  return translations;
};

export default TrainingCoursesTable; 