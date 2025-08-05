"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function NotFound() {
  const { lang } = useLanguage();
  const router = useRouter();

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900">
              {lang === "ar"
                ? "المعهد العالي للعلوم التطبيقية والتكنولوجيا"
                : "HIAST"}
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {lang === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            {lang === "ar"
              ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
              : "Sorry, the page you're looking for doesn't exist or has been moved."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {lang === "ar" ? "العودة للصفحة الرئيسية" : "Back to Homepage"}
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              {lang === "ar" ? "العودة للصفحة السابقة" : "Go Back"}
            </button>
          </div>
        </div>
      </div>

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
                  <button
                    onClick={() => router.push("/")}
                    className="hover:text-white"
                  >
                    {lang === "ar" ? "الرئيسية" : "Home"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/page/about")}
                    className="hover:text-white"
                  >
                    {lang === "ar" ? "عن المعهد" : "About Us"}
                  </button>
                </li>
                <li>
                  <button className="hover:text-white">
                    {lang === "ar" ? "البرامج" : "Programs"}
                  </button>
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
