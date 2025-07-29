import { apiRequest, isAdmin } from "./api";

const API_BASE_URL = "https://localhost:7187/api";

// Helper function to get language code
export const getLanguageCode = (lang) => {
  return lang === "ar" ? 1 : 2; // AR = 1, EN = 2
};

// Helper function to get language name
export const getLanguageName = (lang) => {
  return lang === "ar" ? "Arabic" : "English";
};

// Helper function to format date
export const formatCategoryDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Categories API request wrapper
const categoriesApiRequest = async (endpoint, options = {}) => {
  if (!isAdmin()) {
    throw new Error("Unauthorized: Admin access required");
  }

  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  return apiRequest(`/admin/categories/${endpoint}`, finalOptions);
};

// Get all categories
export const getAllCategories = async () => {
  try {
    console.log("Calling getAllCategories...");
    console.log("Admin check:", isAdmin());
    console.log("Token exists:", !!localStorage.getItem("admin_token"));

    const response = await categoriesApiRequest("GetAllCategories");
    console.log("Categories API response:", response);
    console.log("Response type:", typeof response);
    console.log("Response.Data type:", typeof response.Data);
    console.log("Response.Data:", response.Data);

    const categories = response.Data || [];
    console.log("Extracted categories:", categories);
    console.log("Categories is array:", Array.isArray(categories));
    console.log("Categories length:", categories.length);

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await categoriesApiRequest("CreateCategory", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
    return response.Data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Update a category
export const updateCategory = async (categoryData) => {
  try {
    const response = await categoriesApiRequest("UpdateCategory", {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
    return response.Data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await categoriesApiRequest("DeleteCategory", {
      method: "DELETE",
      body: JSON.stringify({ Id: categoryId }),
    });
    return response.Data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// Add translation to a category
export const addCategoryTranslation = async (translationData) => {
  try {
    const response = await categoriesApiRequest("AddCategoryTranslation", {
      method: "POST",
      body: JSON.stringify(translationData),
    });
    return response.Data;
  } catch (error) {
    console.error("Error adding category translation:", error);
    throw error;
  }
};

// Get categories by filter
export const getCategoriesByFilter = async (filter) => {
  try {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Slug) queryParams.append("Slug", filter.Slug);
    if (filter.Name) queryParams.append("Name", filter.Name);
    if (filter.LanguageCode)
      queryParams.append("LanguageCode", filter.LanguageCode);

    const response = await categoriesApiRequest(
      `GetByFilter?${queryParams.toString()}`
    );
    return response.Data || [];
  } catch (error) {
    console.error("Error filtering categories:", error);
    throw error;
  }
};

// Helper function to get category name in current language
export const getCategoryNameInLanguage = (category, lang) => {
  if (!category?.Translations) {
    console.warn("Category has no translations:", category);
    return "No name available";
  }

  const languageCode = getLanguageCode(lang);
  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageCode
  );

  if (translation?.Name) {
    return translation.Name;
  }

  // Fallback to first available translation
  const firstTranslation = category.Translations[0];
  if (firstTranslation?.Name) {
    console.log(
      `No translation found for language ${lang}, using first available:`,
      firstTranslation.Name
    );
    return firstTranslation.Name;
  }

  console.warn("No translation found for category:", category);
  return "No name available";
};

// Helper function to get all translations for a category
export const getCategoryTranslations = (category) => {
  if (!category?.Translations) return [];
  return category.Translations.map((t) => ({
    id: t.Id,
    languageCode: t.LanguageCode,
    languageName: t.LanguageName,
    name: t.Name,
    slug: t.Slug,
  }));
};
