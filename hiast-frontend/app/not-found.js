"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/admin/dashboard");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            {/* Animated 404 Background - Original Size and Shape */}
            <div
              className="mx-auto"
              style={{
                backgroundImage:
                  "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "300px",
                width: "100%",
              }}
            >
              <h1 className="text-6xl font-bold text-indigo-600 drop-shadow-lg">
                404
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-4 pt-0">
          <h2
            className={`text-2xl font-bold text-gray-900 mb-4 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("404.title")}
          </h2>

          <p
            className={`text-gray-600 mb-8 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("404.message")}
          </p>

          {/* Action Buttons */}
          <div
            className={`flex gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}
          >
            <button
              onClick={handleGoHome}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                className={`w-5 h-5 ${lang === "ar" ? "ml-2" : "mr-2"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t("404.goToDashboard")}
            </button>

            <button
              onClick={handleGoBack}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                className={`w-5 h-5 ${lang === "ar" ? "ml-2" : "mr-2"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {t("404.goBack")}
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p
              className={`text-sm text-gray-500 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("404.help")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p
            className={`text-xs text-gray-400 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("404.institute")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
