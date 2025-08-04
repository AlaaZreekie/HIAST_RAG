"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const PagesTable = ({ pages, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();
  const [expandedContent, setExpandedContent] = useState({});

  const getPageTitleInLanguage = (page) => {
    if (!page.Translations || !Array.isArray(page.Translations)) return "N/A";
    const translation = page.Translations.find(t => t.LanguageCode === lang) || page.Translations[0];
    return translation?.Title || "N/A";
  };

  const getPageContentInLanguage = (page) => {
    if (!page.Translations || !Array.isArray(page.Translations)) return "N/A";
    const translation = page.Translations.find(t => t.LanguageCode === lang) || page.Translations[0];
    return translation?.Content || "N/A";
  };

  const getPageSlugInLanguage = (page) => {
    if (!page.Translations || !Array.isArray(page.Translations)) return "N/A";
    const translation = page.Translations.find(t => t.LanguageCode === lang) || page.Translations[0];
    return translation?.Slug || "N/A";
  };

  const toggleContent = (pageId) => {
    setExpandedContent(prev => ({
      ...prev,
      [pageId]: !prev[pageId]
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
          {pages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t("pages.noPages")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pages.map((page) => (
                <div key={page.Id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className={`flex justify-between items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className={`flex items-center space-x-3 mb-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                        <span className="text-sm font-medium text-gray-500">
                          ID: {page.Id}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {getPageSlugInLanguage(page)}
                        </span>
                      </div>
                      
                      <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {getPageTitleInLanguage(page)}
                      </h3>
                      
                      <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        <p>
                          {expandedContent[page.Id] 
                            ? getPageContentInLanguage(page)
                            : truncateText(getPageContentInLanguage(page))
                          }
                        </p>
                        {getPageContentInLanguage(page).length > 100 && (
                          <button
                            onClick={() => toggleContent(page.Id)}
                            className={`text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}
                          >
                            {expandedContent[page.Id] ? t("common.showLess") : t("common.showMore")}
                          </button>
                        )}
                      </div>
                      
                      <div className={`flex items-center space-x-2 text-xs text-gray-500 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                        <span>{t("pages.translations")}: {page.Translations?.length || 0}</span>
                      </div>
                    </div>
                    
                    <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                      <button
                        onClick={() => onEdit(page.Id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        onClick={() => onDelete(page.Id)}
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

export default PagesTable; 