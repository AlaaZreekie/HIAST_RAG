"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Language code constants to match backend LanguageCodeEnum
export const LANGUAGE_CODES = {
  AR: 1, // Arabic
  EN: 2, // English
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("ar"); // Default to Arabic
  const [messages, setMessages] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load language from localStorage only on client side
    const savedLang = localStorage.getItem("lang") || "ar";
    setLang(savedLang);
    loadMessages(savedLang);
  }, []);

  const loadMessages = (language) => {
    try {
      const localeMessages = require(`../locales/${language}.json`);
      setMessages(localeMessages);
    } catch {
      // Fallback to Arabic if locale file doesn't exist
      const fallbackMessages = require("../locales/ar.json");
      setMessages(fallbackMessages);
    }
  };

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("lang", lang);
      loadMessages(lang);
    }
  }, [lang, isClient]);

  const t = (key, vars = {}) => {
    let text = messages[key] || key;
    Object.keys(vars).forEach(k => {
      text = text.replace(`{${k}}`, vars[k]);
    });
    return text;
  };

  // Helper function to get language code for API calls
  const getLanguageCode = () => {
    return lang === "ar" ? LANGUAGE_CODES.AR : LANGUAGE_CODES.EN;
  };

  // Show loading state during SSR and initial client render
  if (!isClient || Object.keys(messages).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getLanguageCode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 