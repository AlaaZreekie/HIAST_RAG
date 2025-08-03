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
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {faqs.map((faq) => {
            const question = getQuestionInLanguage(faq);
            const answer = getAnswerInLanguage(faq);
            const isAnswerExpanded = expandedAnswers[faq.Id];

            return (
              <li key={faq.Id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                      <div className="flex-1">
                        <div className={`flex items-center space-x-3 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""}`}>
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
                              {question}
                            </div>
                            <div className={`text-sm text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
                              {t("faqs.id")}: {faq.Id}
                            </div>
                          </div>
                        </div>

                        {/* Display Order and Category */}
                        <div className={`mt-2 flex items-center space-x-4 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""}`}>
                          <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                            <svg className={`w-4 h-4 text-gray-400 ${lang === "ar" ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                            <span className="text-sm text-gray-600">{t("faqs.displayOrder")}: {faq.DisplayOrder}</span>
                          </div>
                          <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                            <svg className={`w-4 h-4 text-green-500 ${lang === "ar" ? "ml-2" : "mr-2"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="text-sm text-gray-600">{faq.FaqCategoryName}</span>
                          </div>
                        </div>

                        {/* Answer */}
                        {answer && (
                          <div className="mt-2">
                            <div className={`text-sm text-gray-600 ${lang === "ar" ? "text-right" : "text-left"}`}>
                              {isAnswerExpanded ? answer : answer.length > 150 ? answer.substring(0, 150) + "..." : answer}
                            </div>
                            {answer.length > 150 && (
                              <button
                                onClick={() => toggleAnswer(faq.Id)}
                                className={`mt-1 text-sm text-indigo-600 hover:text-indigo-800 ${lang === "ar" ? "text-right" : "text-left"}`}
                              >
                                {isAnswerExpanded ? t("faqs.showLess") : t("faqs.showMore")}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Translations */}
                        {faq.Translations && faq.Translations.length > 0 && (
                          <div className="mt-2">
                            <div className={`flex flex-wrap gap-2 ${lang === "ar" ? "justify-end" : "justify-start"}`}>
                              {faq.Translations.map((translation) => (
                                <span
                                  key={translation.Id}
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    translation.LanguageCode === 1
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {translation.LanguageCode === 1 ? t("faqs.arabic") : t("faqs.english")}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className={`flex items-center space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""}`}>
                        <button
                          onClick={() => onEditFaq(faq.Id)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          {t("faqs.edit")}
                        </button>
                        <button
                          onClick={() => onDeleteFaq(faq.Id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          {t("faqs.delete")}
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

export default FaqsTable; 