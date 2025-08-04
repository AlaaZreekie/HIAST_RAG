"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  getFaqQuestionInLanguage,
  getFaqAnswerInLanguage,
  getFaqTranslations,
} from "@/lib/faqsApi";

const FaqsTable = ({ faqs, onEditFaq, onDeleteFaq }) => {
  const { t, lang } = useLanguage();
  const [expandedAnswers, setExpandedAnswers] = useState({});

  const toggleAnswer = (faqId) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  const getQuestionInLanguage = (faq) => {
    return getFaqQuestionInLanguage(faq, lang === "ar" ? 1 : 2);
  };

  const getAnswerInLanguage = (faq) => {
    return getFaqAnswerInLanguage(faq, lang === "ar" ? 1 : 2);
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t("faqs.noFaqs")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-h-96 overflow-y-auto">
          {faqs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t("faqs.noFaqs")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => {
                const question = getQuestionInLanguage(faq);
                const answer = getAnswerInLanguage(faq);
                const isAnswerExpanded = expandedAnswers[faq.Id];

                return (
                  <div key={faq.Id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className={`flex justify-between items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className="flex-1">
                        <div className={`flex items-center space-x-3 mb-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                          <span className="text-sm font-medium text-gray-500">
                            ID: {faq.Id}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {t("faqs.displayOrder")}: {faq.DisplayOrder}
                          </span>
                          {faq.FaqCategoryName && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {faq.FaqCategoryName}
                            </span>
                          )}
                        </div>
                        
                        <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {question}
                        </h3>
                        
                        {answer && (
                          <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            <p>
                              {isAnswerExpanded ? answer : answer.length > 150 ? answer.substring(0, 150) + "..." : answer}
                            </p>
                            {answer.length > 150 && (
                              <button
                                onClick={() => toggleAnswer(faq.Id)}
                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
                              >
                                {isAnswerExpanded ? t("common.showLess") : t("common.showMore")}
                              </button>
                            )}
                          </div>
                        )}
                        
                        {/* Translations */}
                        {faq.Translations && faq.Translations.length > 0 && (
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{t("faqs.translations")}: {faq.Translations.length}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                        <button
                          onClick={() => onEditFaq(faq.Id)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          {t("common.edit")}
                        </button>
                        <button
                          onClick={() => onDeleteFaq(faq.Id)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqsTable; 