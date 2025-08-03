import { apiRequest } from "./api";

const languagesApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/languages/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const languagesAPI = {
  getAllLanguages: async () => {
    return languagesApiRequest("GetAllLanguages");
  },

  getLanguagesByFilter: async (filter) => {
    return languagesApiRequest("GetLanguagesByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
  },

  createLanguage: async (languageData) => {
    return languagesApiRequest("CreateLanguage", {
      method: "POST",
      body: JSON.stringify(languageData),
    });
  },

  updateLanguage: async (languageData) => {
    return languagesApiRequest("UpdateLanguage", {
      method: "PUT",
      body: JSON.stringify(languageData),
    });
  },

  deleteLanguage: async (id) => {
    return languagesApiRequest("DeleteLanguage", {
      method: "DELETE",
      body: JSON.stringify({ Id: id }),
    });
  },
};

// Helper functions for language-specific data
export const getAllLanguages = async () => {
  try {
    const data = await languagesAPI.getAllLanguages();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};

export const getLanguageById = async (id) => {
  try {
    const languages = await getAllLanguages();
    return languages.find((lang) => lang.Id === id);
  } catch (error) {
    console.error("Error fetching language by ID:", error);
    return null;
  }
};

export const getLanguageNameInLanguage = (language, languageCode = "en") => {
  if (!language) return "N/A";
  return language.Name || "N/A";
};

export const getLanguageCodeDisplay = (code) => {
  const codeMap = {
    1: "AR",
    2: "EN",
    3: "FR",
    4: "DU",
  };
  return codeMap[code] || code;
};

export const getLanguageTranslations = (language) => {
  if (!language) return [];

  const translations = [];
  if (language.Name) translations.push("Name");
  if (language.Code) translations.push("Code");

  return translations;
};
