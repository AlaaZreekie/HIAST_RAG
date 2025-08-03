const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function faqCategoriesApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/admin/faqCategory/${endpoint}`;
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

export const faqCategoriesAPI = {
  getAllCategories: () => faqCategoriesApiRequest("GetAllFaqCategories"),
  getCategoriesByFilter: (filter) =>
    faqCategoriesApiRequest("GetByFilter", {
      method: "GET",
      body: filter,
    }),
  createCategory: (categoryData) =>
    faqCategoriesApiRequest("CreateFaqCategory", {
      method: "POST",
      body: categoryData,
    }),
  updateCategory: (categoryData) =>
    faqCategoriesApiRequest("UpdateFaqCategory", {
      method: "PUT",
      body: categoryData,
    }),
  deleteCategory: (categoryId) =>
    faqCategoriesApiRequest("DeleteFaqCategory", {
      method: "DELETE",
      body: { Id: categoryId },
    }),
};

export const getAllFaqCategories = async () => {
  try {
    return await faqCategoriesAPI.getAllCategories();
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
