"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { Input } from "@/components/ui/Input";
import { useLanguage } from "@/components/LanguageProvider";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t, lang } = useLanguage();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      setError(t("login.error.requiredEmail"));
      return false;
    }
    if (!formData.password) {
      setError(t("login.error.requiredPassword"));
      return false;
    }
    if (!formData.email.includes("@")) {
      setError(t("login.error.invalidEmail"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.login(
        formData.email,
        formData.password,
        formData.rememberMe
      );

      console.log("Login response in form:", response);
      // Handle the actual backend response structure
      if (response.Result && response.Data?.Token?.Token) {
        // Redirect to admin dashboard
        router.push("/admin/dashboard");
      } else {
        setError(response.Message || t("login.error.loginFailed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || t("login.error.general"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-100 px-4 py-3 rounded-lg backdrop-blur-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
            {t("login.email")}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t("login.placeholder.email")}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 placeholder-white/50"
            style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-white mb-3">
            {t("login.password")}
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/20 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 placeholder-white/50"
              placeholder={t("login.placeholder.password")}
              disabled={isLoading}
              style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
            />
            <button
              type="button"
              className={`absolute inset-y-0 ${lang === "ar" ? "left-0 pl-3" : "right-0 pr-3"} flex items-center`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-white/30 rounded bg-white/20"
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="ml-3 block text-sm font-semibold text-white">
              {t("login.rememberMe")}
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("login.loading")}
              </>
            ) : (
              t("login.button")
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-white/80 font-medium">
          {t("login.support")} {" "}
          <a href="#" className="font-bold text-white hover:text-blue-200 transition-colors duration-200">
            {t("login.contactSupport")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;