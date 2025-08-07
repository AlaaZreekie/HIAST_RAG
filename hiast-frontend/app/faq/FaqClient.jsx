"use client";
import { useState, useEffect } from "react";
import {
  getFaqQuestionInLanguage,
  getFaqAnswerInLanguage,
  getFaqCategoryNameInLanguage,
} from "@/lib/publicFaqsApi";

const FaqClient = ({ faqs, categories, lang, languageCode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  const [openFaqs, setOpenFaqs] = useState(new Set());

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(faq => faq.FaqCategoryId === selectedCategory);
      setFilteredFaqs(filtered);
    }
  }, [selectedCategory, faqs]);

  const toggleFaq = (faqId) => {
    const newOpenFaqs = new Set(openFaqs);
    if (newOpenFaqs.has(faqId)) {
      newOpenFaqs.delete(faqId);
    } else {
      newOpenFaqs.add(faqId);
    }
    setOpenFaqs(newOpenFaqs);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {lang === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              {lang === "ar"
                ? "اكتشف إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا وبرامجنا"
                : "Find answers to the most commonly asked questions about our services and programs"}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {lang === "ar" ? "تصفية حسب الفئة" : "Filter by Category"}
            </h2>
            <div className="flex justify-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-3 rounded-xl border-2 border-blue-200 bg-white text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
              >
                <option value="all">
                  {lang === "ar" ? "جميع الفئات" : "All Categories"}
                </option>
                {categories.map((category) => (
                  <option key={category.Id} value={category.Id}>
                    {getFaqCategoryNameInLanguage(category, languageCode)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* FAQs Grid */}
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.Id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFaq(faq.Id)}
                      className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                      aria-expanded={openFaqs.has(faq.Id)}
                      aria-controls={`faq-answer-${faq.Id}`}
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                        {getFaqQuestionInLanguage(faq, languageCode)}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-6 h-6 text-blue-600 transition-transform duration-200 ${
                            openFaqs.has(faq.Id) ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Answer - Always rendered but hidden with CSS */}
                    <div
                      id={`faq-answer-${faq.Id}`}
                      className={`faq-answer overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaqs.has(faq.Id) 
                          ? "max-h-[2000px] opacity-100" 
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-8 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <div
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: getFaqAnswerInLanguage(faq, languageCode),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {lang === "ar"
                    ? "لا توجد أسئلة متاحة في هذه الفئة"
                    : "No FAQs available in this category"}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {lang === "ar"
                    ? "نحن نعمل على إضافة المزيد من الأسئلة الشائعة. تحقق مرة أخرى قريباً!"
                    : "We're working on adding more frequently asked questions. Check back soon!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {lang === "ar" ? "إحصائيات الأسئلة الشائعة" : "FAQ Statistics"}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {lang === "ar"
                ? "أرقام تتحدث عن مدى مساعدتنا للطلاب"
                : "Numbers that speak of how we help students"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                {faqs.length}+
              </div>
              <div className="text-blue-100 text-lg font-medium">
                {lang === "ar" ? "سؤال شائع" : "FAQ Questions"}
              </div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                {categories.length}+
              </div>
              <div className="text-blue-100 text-lg font-medium">
                {lang === "ar" ? "فئة" : "Categories"}
              </div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-blue-100 text-lg font-medium">
                {lang === "ar" ? "طالب" : "Students"}
              </div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                95%
              </div>
              <div className="text-blue-100 text-lg font-medium">
                {lang === "ar" ? "معدل الرضا" : "Satisfaction Rate"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for FAQ animations */}
      <style jsx>{`
        .faq-answer {
          transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
        }
        
        .faq-answer.max-h-0 {
          max-height: 0 !important;
          opacity: 0 !important;
          overflow: hidden;
        }
        
        .faq-answer.max-h-\\[2000px\\] {
          max-height: 2000px !important;
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
};

export default FaqClient; 