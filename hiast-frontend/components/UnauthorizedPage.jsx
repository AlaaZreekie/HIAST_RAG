"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UnauthorizedPage = ({ 
  title = null, 
  message = null, 
  showLoginButton = true, 
  showHomeButton = true,
  redirectTo = null 
}) => {
  const { t, lang } = useLanguage();
  const router = useRouter();

  // Default title and message based on language
  const defaultTitle = title || (lang === "ar" ? "غير مصرح بالوصول" : "Access Denied");
  const defaultMessage = message || (lang === "ar" 
    ? "عذراً، ليس لديك الصلاحيات المطلوبة للوصول إلى هذه الصفحة. يرجى تسجيل الدخول بحساب مدير للوصول إلى هذه المنطقة."
    : "Sorry, you don't have the required permissions to access this page. Please log in with an admin account to access this area."
  );

  const handleLogin = () => {
    router.push("/admin/login");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    // Auto-redirect after 10 seconds if redirectTo is specified
    if (redirectTo) {
      const timer = setTimeout(() => {
        router.push(redirectTo);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [redirectTo, router]);

  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${lang === "ar" ? "rtl" : "ltr"}`}>
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-2xl font-bold text-gray-900 mb-4 text-center ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {defaultTitle}
        </h1>

        {/* Message */}
        <p className={`text-gray-600 mb-8 text-center leading-relaxed ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {defaultMessage}
        </p>

        {/* Auto-redirect notice */}
        {redirectTo && (
          <div className={`mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700 text-center ${
            lang === "ar" ? "text-right" : "text-left"
          }`}>
            {lang === "ar" 
              ? "سيتم توجيهك تلقائياً خلال 10 ثوانٍ..."
              : "You will be redirected automatically in 10 seconds..."
            }
          </div>
        )}

        {/* Action Buttons */}
        <div className={`flex flex-col space-y-3 ${
          lang === "ar" ? "space-y-reverse" : ""
        }`}>
          {showLoginButton && (
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              {lang === "ar" ? "تسجيل الدخول" : "Login"}
            </button>
          )}
          
          {showHomeButton && (
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              {lang === "ar" ? "العودة للصفحة الرئيسية" : "Go to Homepage"}
            </button>
          )}

          <button
            onClick={handleGoBack}
            className="w-full bg-white text-gray-700 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            {lang === "ar" ? "العودة للصفحة السابقة" : "Go Back"}
          </button>
        </div>

        {/* Error Code */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {lang === "ar" ? "رمز الخطأ:" : "Error Code:"} 403
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 