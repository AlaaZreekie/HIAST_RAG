"use client";
import { useLanguage } from "@/components/LanguageProvider";

const CoursesSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${lang === "ar" ? "text-right" : "text-left"}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("homepage.courses.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("homepage.courses.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`homepage.courses.course${item}.title`)}
              </h3>
              <p className="text-gray-600 mb-4">
                {t(`homepage.courses.course${item}.description`)}
              </p>
              <button className="text-primary hover:text-primary/80 font-medium">
                {t("homepage.courses.learnMore")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection; 