const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function faqsApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/admin/faq/${endpoint}`;
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText}`);
    }

    if (!responseText) {
      return null;
    }

    const data = JSON.parse(responseText);
    return data.Data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const faqsAPI = {
  getAllFaqs: () => faqsApiRequest("GetAllFaqs"),
  getFaqsByFilter: (filter) =>
    faqsApiRequest("GetByFilter", {
      method: "GET",
      body: filter,
    }),
  createFaq: (faqData) =>
    faqsApiRequest("CreateFaq", {
      method: "POST",
      body: faqData,
    }),
  updateFaq: (faqData) =>
    faqsApiRequest("UpdateFaq", {
      method: "PUT",
      body: faqData,
    }),
  deleteFaq: (faqId) =>
    faqsApiRequest("DeleteFaq", {
      method: "DELETE",
      body: { Id: faqId },
    }),
};

export const getAllFaqs = async () => {
  try {
    return await faqsAPI.getAllFaqs();
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
