"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { getTestimonialNameInLanguage, getTestimonialContentInLanguage } from "@/lib/testimonialsApi";

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

  const getContentInLanguage = (testimonial) => {
    return getTestimonialContentInLanguage(testimonial, lang === "ar" ? 1 : 2);
  };

  const getAuthorNameInLanguage = (testimonial) => {
    return getTestimonialNameInLanguage(testimonial, lang === "ar" ? 1 : 2);
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
            const authorName = getAuthorNameInLanguage(testimonial);
            const content = getContentInLanguage(testimonial);
            
            return (
              <div key={testimonial.Id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className={`flex justify-between items-start ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}>
                  {/* Testimonial Info */}
                  <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <div className={`flex items-start ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                      {/* Author Avatar */}
                      <div className={`flex-shrink-0 ${lang === "ar" ? "ml-4" : "mr-4"}`}>
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          {testimonial.Media ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/wwwroot/${testimonial.Media.FilePath}`}
                              alt={authorName}
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
                        <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : ""} space-x-2 mb-2`}>
                          <span className={`text-sm font-medium text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            {t("testimonials.id")}:
                          </span>
                          <span className="text-sm font-mono text-gray-900">{testimonial.Id}</span>
                        </div>
                        
                        <h4 className={`text-lg font-medium text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {authorName || t("testimonials.noAuthor")}
                        </h4>
                        
                        {testimonial.AuthorTitle && (
                          <p className={`text-sm text-gray-600 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            {testimonial.AuthorTitle}
                          </p>
                        )}
                        
                        {/* Rating */}
                        {testimonial.Rating && (
                          <div className={`flex items-center mb-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                            <span className={`text-sm text-gray-500 ${lang === "ar" ? "ml-2" : "mr-2"}`}>
                              {t("testimonials.rating")}:
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < testimonial.Rating ? "text-yellow-400" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="mt-3">
                          <p className={`text-sm text-gray-700 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            {content && content.length > 150 ? (
                              <>
                                {content.substring(0, 150)}...
                                <button className="text-indigo-600 hover:text-indigo-800 ml-1">
                                  {t("testimonials.showMore")}
                                </button>
                              </>
                            ) : (
                              content || t("testimonials.noContent")
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                    <button
                      onClick={() => onEditTestimonial(testimonial.Id)}
                      className={`text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("testimonials.edit")}
                    </button>
                    <button
                      onClick={() => onDeleteTestimonial(testimonial.Id)}
                      className={`text-red-600 hover:text-red-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("testimonials.delete")}
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