import { apiRequest } from "./api";

const faqsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/faqs/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const faqsAPI = {
  getAllFaqs: async () => {
    return faqsApiRequest("GetAllFaqs");
  },

  getFaqsByFilter: async (filter) => {
    return faqsApiRequest("GetFaqsByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
  },

  createFaq: async (faqData) => {
    return faqsApiRequest("CreateFaq", {
      method: "POST",
      body: JSON.stringify(faqData),
    });
  },

  updateFaq: async (faqData) => {
    return faqsApiRequest("UpdateFaq", {
      method: "PUT",
      body: JSON.stringify(faqData),
    });
  },

  deleteFaq: async (faqId) => {
    return faqsApiRequest("DeleteFaq", {
      method: "DELETE",
      body: JSON.stringify({ Id: faqId }),
    });
  },
};

export const getAllFaqs = async () => {
  try {
    const response = await faqsAPI.getAllFaqs();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};

export const getFaqById = async (id) => {
  try {
    const faqs = await getAllFaqs();
    return faqs.find((faq) => faq.Id === id);
  } catch (error) {
    console.error("Error fetching FAQ by ID:", error);
    throw error;
  }
};

export const getFaqQuestionInLanguage = (faq, languageId) => {
  if (!faq?.Translations) return "No Question";

  const translation = faq.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Question || "No Question";
};

export const getFaqAnswerInLanguage = (faq, languageId) => {
  if (!faq?.Translations) return "";

  const translation = faq.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Answer || "";
};

export const getFaqTranslations = (faq) => {
  return faq?.Translations || [];
};
