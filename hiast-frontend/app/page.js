"use client";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900">
              {lang === "ar"
                ? "المعهد العالي للعلوم التطبيقية والتكنولوجيا"
                : "HIAST"}
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                {lang === "ar" ? "البرامج" : "Programs"}
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                {lang === "ar" ? "الأخبار" : "News"}
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                {lang === "ar" ? "اتصل بنا" : "Contact"}
              </button>
            </div>
          </div>
        </div>
      </header>

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
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {lang === "ar" ? "استكشف البرامج" : "Explore Programs"}
          </button>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {lang === "ar" ? "المعهد العالي" : "HIAST"}
              </h3>
              <p className="text-gray-300">
                {lang === "ar"
                  ? "معهد رائد في التعليم العالي"
                  : "A leading institute in higher education"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {lang === "ar" ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    {lang === "ar" ? "الرئيسية" : "Home"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {lang === "ar" ? "البرامج" : "Programs"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {lang === "ar" ? "الأخبار" : "News"}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {lang === "ar" ? "اتصل بنا" : "Contact Us"}
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  {lang === "ar" ? "الهاتف: 123-456-789" : "Phone: 123-456-789"}
                </li>
                <li>
                  {lang === "ar"
                    ? "البريد الإلكتروني: info@hiast.edu"
                    : "Email: info@hiast.edu"}
                </li>
                <li>
                  {lang === "ar"
                    ? "العنوان: دمشق، سوريا"
                    : "Address: Damascus, Syria"}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {lang === "ar" ? "تابعنا" : "Follow Us"}
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>
              {lang === "ar"
                ? "© 2024 المعهد العالي للعلوم التطبيقية والتكنولوجيا. جميع الحقوق محفوظة."
                : "© 2024 HIAST. All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
