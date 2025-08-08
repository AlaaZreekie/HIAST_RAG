import { serverApiRequest } from "./api";

const publicFaqsApiRequest = async (endpoint, options = {}) => {
  return serverApiRequest(`/User/Faq/${endpoint}`, options);
};

const publicFaqCategoriesApiRequest = async (endpoint, options = {}) => {
  return serverApiRequest(`/User/FaqCategories/${endpoint}`, options);
};

export const publicFaqsAPI = {
  getAllFaqs: async () => {
    const response = await publicFaqsApiRequest("GetAllFaqs");
    return response.Data || response;
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.FaqCategoryId)
      queryParams.append("FaqCategoryId", filter.FaqCategoryId);
    if (filter.Question) queryParams.append("Question", filter.Question);
    if (filter.Answer) queryParams.append("Answer", filter.Answer);

    const response = await publicFaqsApiRequest(
      `GetByFilter?${queryParams.toString()}`
    );
    return response.Data || response;
  },
};

export const publicFaqCategoriesAPI = {
  getAllFaqCategories: async () => {
    const response = await publicFaqCategoriesApiRequest("GetAllFaqCategories");
    return response.Data || response;
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);

    const response = await publicFaqCategoriesApiRequest(
      `GetByFilter?${queryParams.toString()}`
    );
    return response.Data || response;
  },
};

export const getAllPublicFaqs = async () => {
  try {
    const response = await publicFaqsAPI.getAllFaqs();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching public FAQs:", error);
    throw error;
  }
};

export const getPublicFaqsByCategory = async (categoryId) => {
  try {
    const response = await publicFaqsAPI.getByFilter({
      FaqCategoryId: categoryId,
    });
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching FAQs by category:", error);
    throw error;
  }
};

export const getAllPublicFaqCategories = async () => {
  try {
    const response = await publicFaqCategoriesAPI.getAllFaqCategories();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching public FAQ categories:", error);
    throw error;
  }
};

export const getFaqQuestionInLanguage = (faq, languageCode) => {
  if (!faq?.Translations) return "No Question";
  const translation = faq.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Question || "No Question";
};

export const getFaqAnswerInLanguage = (faq, languageCode) => {
  if (!faq?.Translations) return "";
  const translation = faq.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Answer || "";
};

export const getFaqTranslations = (faq) => {
  return faq?.Translations || [];
};

export const getFaqCategoryNameInLanguage = (category, languageCode) => {
  if (!category?.Translations) return "No Name";
  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || "No Name";
};

export const getFaqCategoryTranslations = (category) => {
  return category?.Translations || [];
};
