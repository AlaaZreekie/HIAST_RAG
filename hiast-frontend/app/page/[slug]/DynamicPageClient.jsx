"use client";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
const DynamicPageClient = ({ page, translation, lang, slug }) => {
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
            <div className="flex items-center gap-4">
                             <nav className="flex gap-4">
                 <a
                   href="/"
                   className="px-4 py-2 text-gray-600 hover:text-gray-900"
                 >
                   {lang === "ar" ? "الرئيسية" : "Home"}
                 </a>
                 <a
                   href="/page/about"
                   className="px-4 py-2 text-gray-600 hover:text-gray-900"
                 >
                   {lang === "ar" ? "عن المعهد" : "About Us"}
                 </a>
                 <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900">
                   {lang === "ar" ? "البرامج" : "Programs"}
                 </a>
                 <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900">
                   {lang === "ar" ? "الأخبار" : "News"}
                 </a>
                 <a
                   href="/page/contact"
                   className="px-4 py-2 text-gray-600 hover:text-gray-900"
                 >
                   {lang === "ar" ? "اتصل بنا" : "Contact"}
                 </a>
               </nav>
              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {translation.Title}
          </h1>

          {/* Page Content */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: translation.Content }}
            />
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {lang === "ar" ? "العودة للصفحة الرئيسية" : "Back to Homepage"}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
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
                   <a
                     href="/"
                     className="hover:text-white"
                   >
                     {lang === "ar" ? "الرئيسية" : "Home"}
                   </a>
                 </li>
                 <li>
                   <a
                     href="/page/about"
                     className="hover:text-white"
                   >
                     {lang === "ar" ? "عن المعهد" : "About Us"}
                   </a>
                 </li>
                 <li>
                   <a href="#" className="hover:text-white">
                     {lang === "ar" ? "البرامج" : "Programs"}
                   </a>
                 </li>
                 <li>
                   <a
                     href="/page/contact"
                     className="hover:text-white"
                   >
                     {lang === "ar" ? "اتصل بنا" : "Contact"}
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
};

export default DynamicPageClient; 