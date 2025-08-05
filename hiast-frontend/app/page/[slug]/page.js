"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { publicAPI } from "@/lib/publicApi";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const DynamicPage = () => {
  const params = useParams();
  const router = useRouter();
  const { lang, getLanguageCode } = useLanguage();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const slug = params.slug;

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Create filter to search by title (which should match the slug/button text)
        const filter = {
          Title: slug, // The slug is the title we're searching for
          LanguageCode: getLanguageCode(), // Current language code (1 for AR, 2 for EN)
        };

        console.log("Searching for page with filter:", filter);
        console.log("Current language code:", getLanguageCode());
        console.log("Slug:", slug);

        // Use the correct API call - build query string manually
        const queryParams = new URLSearchParams();
        if (filter.Title) queryParams.append("Title", filter.Title);
        if (filter.LanguageCode)
          queryParams.append("LanguageCode", filter.LanguageCode);

        const url = `/api/user/pages/getbyfilter?${queryParams.toString()}`;
        console.log("API URL:", url);

        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "https://localhost:44373"
          }${url}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response status:", response.status);
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        let data;
        try {
          data = JSON.parse(responseText);
          // Handle double-encoded JSON
          if (typeof data === "string") {
            data = JSON.parse(data);
          }
        } catch (e) {
          console.error("JSON parsing error:", e);
          data = null;
        }

        console.log("Parsed data:", data);

        // Handle ApiResponse structure
        const pages = data?.Data || data || [];

        console.log("Pages array:", pages);
        console.log("Pages length:", pages.length);

        if (pages.length === 0) {
          // No page found - show error instead of immediate redirect
          console.log("No page found, setting error");
          setError("Page not found");
          return;
        }

        // Get the first matching page
        const foundPage = pages[0];
        console.log("Found page:", foundPage);

        setPage(foundPage);
      } catch (err) {
        console.error("Error loading page:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPage();
    }
  }, [slug, lang, getLanguageCode]);

  // Get the translation for current language
  const getPageTranslation = () => {
    if (!page?.Translations) return null;

    const currentLanguageCode = getLanguageCode();
    return (
      page.Translations.find((t) => t.LanguageCode === currentLanguageCode) ||
      page.Translations[0]
    );
  };

  const translation = getPageTranslation();

  if (loading) {
    return (
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-gray-50"
      >
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {lang === "ar" ? "جاري التحميل..." : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !translation) {
    return (
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-gray-50"
      >
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {lang === "ar"
                ? "404 - الصفحة غير موجودة"
                : "404 - Page Not Found"}
            </h1>
            <p className="text-gray-600 mb-8">
              {error ||
                (lang === "ar"
                  ? "عذراً، الصفحة التي تبحث عنها غير موجودة."
                  : "Sorry, the page you're looking for doesn't exist.")}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => router.push("/")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
              >
                {lang === "ar" ? "العودة للصفحة الرئيسية" : "Back to Homepage"}
              </button>
              <button
                onClick={() => router.push("/not-found")}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Go to 404 Page
              </button>
            </div>
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                Debug Info: Slug = &quot;{slug}&quot;, Language = &quot;{lang}
                &quot;, LanguageCode = &quot;{getLanguageCode()}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <button
                  onClick={() => router.push("/")}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  {lang === "ar" ? "الرئيسية" : "Home"}
                </button>
                <button
                  onClick={() => router.push("/page/about")}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  {lang === "ar" ? "عن المعهد" : "About Us"}
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                  {lang === "ar" ? "البرامج" : "Programs"}
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                  {lang === "ar" ? "الأخبار" : "News"}
                </button>
                <button
                  onClick={() => router.push("/page/contact")}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  {lang === "ar" ? "اتصل بنا" : "Contact"}
                </button>
              </nav>
              <LanguageSwitcher />
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
                <li>
                  <button
                    onClick={() => router.push("/page/contact")}
                    className="hover:text-white"
                  >
                    {lang === "ar" ? "اتصل بنا" : "Contact"}
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
};

export default DynamicPage;
