import { apiRequest } from "./api";

const API_BASE_URL = "https://localhost:7187/api";

// Generic API request function for media categories
async function mediaCategoriesApiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}/admin/mediacategories${endpoint}`;

  const defaultOptions = {
    headers: {},
  };

  // Add authorization header if token exists
  const token = localStorage.getItem("admin_token");
  if (token) {
    defaultOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  // Check if user is admin before making request
  const { isAdmin } = await import("./api.js");
  if (!isAdmin()) {
    throw new Error("Access denied. Admin role required.");
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    console.log("Making Media Categories API request to:", url);
    const response = await fetch(url, config);
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.Message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("Media Categories API Error:", error);
    throw error;
  }
}

// Media Categories API functions
export const mediaCategoriesAPI = {
  // Get all media categories
  async getAllMediaCategories() {
    const response = await mediaCategoriesApiRequest("/GetAllMediaCategories", {
      method: "GET",
    });
    return response;
  },

  // Create new media category
  async createMediaCategory(categoryData) {
    const response = await mediaCategoriesApiRequest("/CreateMediaCategory", {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  // Update existing media category
  async updateMediaCategory(categoryData) {
    const response = await mediaCategoriesApiRequest("/UpdateMediaCategory", {
      method: "PUT",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  // Delete media category
  async deleteMediaCategory(categoryId) {
    const response = await mediaCategoriesApiRequest("/DeleteMediaCategory", {
      method: "DELETE",
      body: JSON.stringify({ Id: categoryId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  // Get media categories by filter
  async getMediaCategoriesByFilter(filterData) {
    const response = await mediaCategoriesApiRequest("/GetByFilter", {
      method: "GET",
      params: filterData,
    });
    return response;
  },
};

// Helper functions
export const getAllMediaCategories = async () => {
  try {
    const response = await mediaCategoriesAPI.getAllMediaCategories();
    return response.Data || [];
  } catch (error) {
    console.error("Error fetching media categories:", error);
    throw error;
  }
};

export const getMediaCategoryById = async (id) => {
  try {
    const response = await mediaCategoriesAPI.getMediaCategoriesByFilter({
      Id: id,
    });
    const categories = response.Data || [];
    return categories.find((category) => category.Id === id);
  } catch (error) {
    console.error("Error fetching media category by ID:", error);
    throw error;
  }
};

export const getMediaCategoryNameInLanguage = (category, languageCode) => {
  if (!category?.Translations) return "Unknown";
  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || "Unknown";
};

export const getMediaCategoryTranslations = (category) => {
  return category?.Translations || [];
};
