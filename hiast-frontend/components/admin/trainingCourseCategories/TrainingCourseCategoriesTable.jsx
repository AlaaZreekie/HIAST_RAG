"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { getTrainingCourseCategoryNameInLanguage } from "@/lib/trainingCourseCategoriesApi";

const TrainingCourseCategoriesTable = ({ categories, onEditCategory, onDeleteCategory }) => {
  const { t, lang } = useLanguage();

  // Debug logging
  console.log("TrainingCourseCategoriesTable received categories:", categories);

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-500">{t("trainingCourseCategories.noCategories")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className={`text-lg font-medium text-gray-900 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("trainingCourseCategories.title")} ({categories.length})
        </h3>
      </div>

      {/* Scrollable Categories Container */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {categories.map((category) => {
            console.log("Rendering category:", category);
            const categoryName = getTrainingCourseCategoryNameInLanguage(category, lang === "ar" ? 1 : 2);
            
            return (
              <div key={category.Id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className={`flex justify-between items-start ${
                  lang === "ar" ? "flex-row-reverse" : "flex-row"
                }`}>
                  {/* Category Info */}
                  <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <div className={`flex items-center mb-2 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={lang === "ar" ? "ml-3" : "mr-3"}>
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`text-lg font-medium text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {categoryName || t("trainingCourseCategories.noName")}
                        </h4>
                        <div className={`flex items-center text-sm text-gray-500 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                          <span className={lang === "ar" ? "ml-1" : "mr-1"}>{t("trainingCourseCategories.id")}:</span>
                          <span className="font-mono">{category.Id}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Details */}
                    <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className={`flex flex-wrap gap-4 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                        <span>{t("trainingCourseCategories.displayOrder")}: {category.DisplayOrder || 0}</span>
                        <span>{t("trainingCourseCategories.isActive")}: {category.IsActive ? "Yes" : "No"}</span>
                      </div>
                    </div>
                    
                    {/* Translations */}
                    {category.Translations && category.Translations.length > 0 && (
                      <div className="mb-3">
                        <p className={`text-xs font-medium text-gray-700 mb-1 ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}>
                          {t("trainingCourseCategories.translations")}:
                        </p>
                        <div className={`flex flex-wrap gap-2 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                          {category.Translations.map((translation, index) => (
                            <span
                              key={translation.Id || index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {translation.LanguageCode === 1 ? t("trainingCourseCategories.arabic") : t("trainingCourseCategories.english")}: {translation.Name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Admin Actions */}
                  <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                    <button
                      onClick={() => onEditCategory(category.Id)}
                      className={`text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("trainingCourseCategories.edit")}
                    </button>
                    <button
                      onClick={() => onDeleteCategory(category.Id)}
                      className={`text-red-600 hover:text-red-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("trainingCourseCategories.delete")}
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

export default TrainingCourseCategoriesTable; 