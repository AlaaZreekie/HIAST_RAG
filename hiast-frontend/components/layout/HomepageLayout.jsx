import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HomepageLayout({ children, currentPage = "home", lang = "en" }) {
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {lang === "ar"
                ? "المعهد العالي للعلوم التطبيقية والتكنولوجيا"
                : "HIAST"}
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-6">
                <a
                  href="/"
                  className={`px-4 py-2 font-medium transition-colors duration-200 ${
                    currentPage === "home"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {lang === "ar" ? "الرئيسية" : "Home"}
                </a>
                <a
                  href="/page/about"
                  className={`px-4 py-2 font-medium transition-colors duration-200 ${
                    currentPage === "about"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {lang === "ar" ? "عن المعهد" : "About Us"}
                </a>
                <a
                  href="/programs"
                  className={`px-4 py-2 font-medium transition-colors duration-200 ${
                    currentPage === "programs"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {lang === "ar" ? "البرامج" : "Programs"}
                </a>
                <a
                  href="/faq"
                  className={`px-4 py-2 font-medium transition-colors duration-200 ${
                    currentPage === "faq"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {lang === "ar" ? "الأخبار" : "News"}
                </a>
                <a
                  href="/page/contact"
                  className={`px-4 py-2 font-medium transition-colors duration-200 ${
                    currentPage === "contact"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {lang === "ar" ? "اتصل بنا" : "Contact"}
                </a>
              </nav>
              <LanguageSwitcher currentLang={lang} />

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

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
                  <a href="/" className="hover:text-white">
                    {lang === "ar" ? "الرئيسية" : "Home"}
                  </a>
                </li>
                <li>
                  <a href="/page/about" className="hover:text-white">
                    {lang === "ar" ? "عن المعهد" : "About Us"}
                  </a>
                </li>
                <li>
                  <a href="/programs" className="hover:text-white">
                    {lang === "ar" ? "البرامج" : "Programs"}
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white">
                    {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                  </a>
                </li>
                <li>
                  <a href="/page/contact" className="hover:text-white">
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
} 