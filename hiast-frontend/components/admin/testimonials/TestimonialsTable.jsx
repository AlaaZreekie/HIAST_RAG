"use client";
import { useLanguage } from "@/components/LanguageProvider";

const TestimonialsTable = ({ testimonials, onEditTestimonial, onDeleteTestimonial }) => {
  const { t, lang } = useLanguage();

  if (testimonials.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-500">{t("testimonials.noTestimonials")}</p>
        </div>
      </div>
    );
  }

  const getQuoteInLanguage = (testimonial) => {
    if (!testimonial?.Translations) return "No Quote";
    const translation = testimonial.Translations.find(
      (t) => t.LanguageCode === (lang === "ar" ? 1 : 2)
    );
    return translation?.Quote || "No Quote";
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className={`text-lg font-medium text-gray-900 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("testimonials.title")} ({testimonials.length})
        </h3>
      </div>

      {/* Scrollable Testimonials Container */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {testimonials.map((testimonial) => {
            const quote = getQuoteInLanguage(testimonial);
            
            return (
              <div key={testimonial.Id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className={`flex justify-between items-start ${
                  lang === "ar" ? "flex-row-reverse" : "flex-row"
                }`}>
                  {/* Testimonial Info */}
                  <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <div className={`flex items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Author Avatar */}
                      <div className={`flex-shrink-0 ${lang === "ar" ? "ml-4" : "mr-4"}`}>
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          {testimonial.Media ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/wwwroot/${testimonial.Media.FilePath}`}
                              alt={testimonial.GraduateName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                        </div>
                      </div>
                      
                      {/* Testimonial Content */}
                      <div className="flex-1 min-w-0">
                        <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"} space-x-2 mb-2`}>
                          <span className={`text-sm font-medium text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            {t("testimonials.id")}:
                          </span>
                          <span className="text-sm font-mono text-gray-900">{testimonial.Id}</span>
                        </div>
                        
                        <h4 className={`text-lg font-medium text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {testimonial.GraduateName || t("testimonials.noGraduateName")}
                        </h4>
                        
                        {testimonial.GraduateYear && (
                          <p className={`text-sm text-gray-600 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            {t("testimonials.graduateYear")}: {testimonial.GraduateYear}
                          </p>
                        )}
                        
                        {/* Quote */}
                        <div className="mt-3">
                          <p className={`text-sm text-gray-700 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            {quote && quote.length > 150 ? (
                              <>
                                {quote.substring(0, 150)}...
                                <button className={`text-indigo-600 hover:text-indigo-800 ${lang === "ar" ? "mr-1" : "ml-1"}`}>
                                  {t("testimonials.showMore")}
                                </button>
                              </>
                            ) : (
                              quote || t("testimonials.noQuote")
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                    <button
                      onClick={() => onEditTestimonial(testimonial.Id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1 rounded border border-indigo-200 hover:bg-indigo-50 transition-colors"
                      title={t("common.edit")}
                    >
                      {t("common.edit")}
                    </button>
                    <button
                      onClick={() => onDeleteTestimonial(testimonial.Id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
                      title={t("common.delete")}
                    >
                      {t("common.delete")}
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

export default TestimonialsTable; 