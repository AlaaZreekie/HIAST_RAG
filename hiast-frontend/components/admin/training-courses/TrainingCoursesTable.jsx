"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { 
  getTrainingCourseNameInLanguage, 
  getTrainingCourseDescriptionInLanguage,
  getTrainingCourseCategoryName,
  getTrainingCourseTranslations
} from "@/lib/trainingCoursesApi";

const TrainingCoursesTable = ({ trainingCourses, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();
  const [expandedContent, setExpandedContent] = useState({});

  const toggleContent = (trainingCourseId) => {
    setExpandedContent(prev => ({
      ...prev,
      [trainingCourseId]: !prev[trainingCourseId]
    }));
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Debug: Log translation keys
  console.log("Current language:", lang);
  console.log("Edit button text:", t("common.edit"));
  console.log("Delete button text:", t("common.delete"));
  console.log("Edit button key exists:", t("common.edit") !== "common.edit");
  console.log("Delete button key exists:", t("common.delete") !== "common.delete");
  console.log("Test translation:", t("common.loading"));

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
              {trainingCourses.map((trainingCourse) => {
                const courseName = getTrainingCourseNameInLanguage(trainingCourse, lang === "ar" ? 1 : 2);
                const courseDescription = getTrainingCourseDescriptionInLanguage(trainingCourse, lang === "ar" ? 1 : 2);
                const categoryName = getTrainingCourseCategoryName(trainingCourse);
                const translations = getTrainingCourseTranslations(trainingCourse);
                
                return (
                  <div key={trainingCourse.Id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className={`flex justify-between items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        <div className={`flex items-center space-x-3 mb-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                          <span className="text-sm font-medium text-gray-500">
                            ID: {trainingCourse.Id}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {categoryName}
                          </span>
                        </div>
                        
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {courseName}
                        </h3>
                        
                        {/* Course Details */}
                        <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          <div className={`flex flex-wrap gap-4 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                            <span>{t("trainingCourses.courseCode")}: {trainingCourse.CourseCode || "N/A"}</span>
                            <span>{t("trainingCourses.durationHours")}: {trainingCourse.DurationHours || 0}</span>
                            <span>{t("trainingCourses.numberOfSessions")}: {trainingCourse.NumberOfSessions || 0}</span>
                            <span>{t("trainingCourses.year")}: {trainingCourse.Year || "N/A"}</span>
                          </div>
                          {trainingCourse.TargetAudience && (
                            <div className="mt-2">
                              <span className="font-medium">{t("trainingCourses.targetAudience")}:</span> {trainingCourse.TargetAudience}
                            </div>
                          )}
                        </div>
                        
                        {/* Description */}
                        {courseDescription && (
                          <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            <p>
                              {expandedContent[trainingCourse.Id] 
                                ? courseDescription
                                : truncateText(courseDescription)
                              }
                              {courseDescription.length > 100 && (
                                <button
                                  onClick={() => toggleContent(trainingCourse.Id)}
                                  className={`text-indigo-600 hover:text-indigo-800 text-sm font-medium ${lang === "ar" ? "mr-2" : "ml-2"}`}
                                >
                                  {expandedContent[trainingCourse.Id] ? t("common.showLess") : t("common.showMore")}
                                </button>
                              )}
                            </p>
                          </div>
                        )}
                        
                        {/* Image */}
                        {trainingCourse.ImageUrl && (
                          <div className="mb-3">
                            <img 
                              src={trainingCourse.ImageUrl} 
                              alt={courseName}
                              className="w-32 h-20 object-cover rounded border"
                            />
                          </div>
                        )}
                        
                        {/* Translations */}
                        <div className={`text-xs text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          <span className={lang === "ar" ? "ml-4" : "mr-4"}>
                            {t("trainingCourses.translations")}: {translations.length}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                        <button
                          onClick={() => onEdit(trainingCourse.Id)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1 rounded border border-indigo-200 hover:bg-indigo-50 transition-colors"
                          title={t("trainingCourses.edit")}
                        >
                          {t("trainingCourses.edit")}
                        </button>
                        <button
                          onClick={() => onDelete(trainingCourse.Id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
                          title={t("trainingCourses.delete")}
                        >
                          {t("trainingCourses.delete")}
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
    </div>
  );
};

export default TrainingCoursesTable; 