import { cookies } from "next/headers";
import HomepageLayout from "@/components/layout/HomepageLayout";

// Server-side language detection
function getLanguageFromCookies() {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang");
  return langCookie?.value || "en";
}

export default function Home() {
  const lang = getLanguageFromCookies();

  return (
    <HomepageLayout currentPage="home" lang={lang}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {lang === "ar"
              ? "مرحباً بكم في المعهد العالي للعلوم التطبيقية والتكنولوجيا"
              : "Welcome to HIAST"}
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {lang === "ar"
              ? "نحن نقدم تعليماً عالي الجودة في العلوم التطبيقية والتكنولوجيا"
              : "We provide high-quality education in applied sciences and technology"}
          </p>
          <a
            href="/programs"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            {lang === "ar" ? "استكشف البرامج" : "Explore Programs"}
          </a>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {lang === "ar" ? "برامجنا الأكاديمية" : "Our Academic Programs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {lang === "ar" ? "علوم الحاسوب" : "Computer Science"}
              </h3>
              <p className="text-gray-600 mb-4">
                {lang === "ar"
                  ? "برنامج شامل في علوم الحاسوب والبرمجة"
                  : "Comprehensive program in computer science and programming"}
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                {lang === "ar" ? "اعرف المزيد" : "Learn More"}
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {lang === "ar"
                  ? "تكنولوجيا المعلومات"
                  : "Information Technology"}
              </h3>
              <p className="text-gray-600 mb-4">
                {lang === "ar"
                  ? "دراسة متقدمة في تكنولوجيا المعلومات"
                  : "Advanced study in information technology"}
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                {lang === "ar" ? "اعرف المزيد" : "Learn More"}
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                {lang === "ar" ? "الهندسة" : "Engineering"}
              </h3>
              <p className="text-gray-600 mb-4">
                {lang === "ar"
                  ? "برامج هندسية متخصصة"
                  : "Specialized engineering programs"}
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                {lang === "ar" ? "اعرف المزيد" : "Learn More"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-100">
                {lang === "ar" ? "برنامج أكاديمي" : "Academic Programs"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">
                {lang === "ar" ? "طالب" : "Students"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">
                {lang === "ar" ? "مقرر دراسي" : "Courses"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">
                {lang === "ar" ? "معدل التوظيف" : "Employment Rate"}
              </div>
            </div>
          </div>
        </div>
      </section>
    </HomepageLayout>
  );
}
