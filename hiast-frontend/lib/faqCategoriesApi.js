import { apiRequest } from "./api";

const faqCategoriesApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/faqCategories/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const faqCategoriesAPI = {
  getAllCategories: async () => {
    return faqCategoriesApiRequest("GetAllFaqCategories");
  },

  getCategoriesByFilter: async (filter) => {
    return faqCategoriesApiRequest("GetFaqCategoriesByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
  },

  createCategory: async (categoryData) => {
    return faqCategoriesApiRequest("CreateFaqCategory", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  },

  updateCategory: async (categoryData) => {
    return faqCategoriesApiRequest("UpdateFaqCategory", {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: async (categoryId) => {
    return faqCategoriesApiRequest("DeleteFaqCategory", {
      method: "DELETE",
      body: JSON.stringify({ Id: categoryId }),
    });
  },
};

export const getAllFaqCategories = async () => {
  try {
    const response = await faqCategoriesAPI.getAllCategories();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching FAQ categories:", error);
    throw error;
  }
};

export const getFaqCategoryById = async (id) => {
  try {
    const categories = await getAllFaqCategories();
    return categories.find((category) => category.Id === id);
  } catch (error) {
    console.error("Error fetching FAQ category by ID:", error);
    throw error;
  }
};

export const getFaqCategoryNameInLanguage = (category, languageId) => {
  if (!category?.Translations) return "No Name";

  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getFaqCategoryTranslations = (category) => {
  return category?.Translations || [];
};
