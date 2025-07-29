"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { getCategoryNameInLanguage } from "@/lib/categoriesApi";

const CategoriesTable = ({ categories, onEditCategory, onDeleteCategory }) => {
  const { t, lang } = useLanguage();

  if (categories.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-500">{t("categories.noCategories")}</p>
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
          {t("categories.title")} ({categories.length})
        </h3>
      </div>

      {/* Scrollable Categories Container */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {categories.map((category) => (
            <div key={category.Id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className={`flex justify-between items-start ${
                lang === "ar" ? "flex-row-reverse" : ""
              }`}>
                {/* Category Info */}
                <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {getCategoryNameInLanguage(category, lang)}
                  </h4>
                  
                  {/* Translations */}
                  <div className={`flex flex-wrap gap-2 mb-3 ${
                    lang === "ar" ? "flex-row-reverse" : ""
                  }`}>
                    {category.Translations?.map((translation) => (
                      <span
                        key={translation.Id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {translation.LanguageName}: {translation.Name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <button
                    onClick={() => onEditCategory(category.Id)}
                    className={`text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("categories.edit")}
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category.Id)}
                    className={`text-red-600 hover:text-red-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {t("categories.delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesTable; 