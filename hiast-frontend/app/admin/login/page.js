"use client";
import { useState } from "react";
import LoginForm from "@/components/admin/LoginForm";
import ConnectionTest from "@/components/ConnectionTest";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/admin/LanguageSwitcher";

export default function AdminLoginPage() {
  const { t, lang } = useLanguage();

  return (
    <div
      className={`min-h-screen flex items-center justify-center admin-gradient ${
        lang === "ar" ? "rtl" : "ltr"
      }`}
    >
      <LanguageSwitcher />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            {t("login.dashboard.title")}
          </h2>
          <p className="mt-2 text-sm text-blue-100">{t("login.title")}</p>
          <p className="mt-1 text-xs text-blue-200">{t("login.subtitle")}</p>
        </div>
        <LoginForm />
        <div className="mt-8">
          <ConnectionTest />
        </div>
      </div>
    </div>
  );
}
