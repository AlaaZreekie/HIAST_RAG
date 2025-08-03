import { apiRequest } from "./api";

const mediaCategoriesApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/mediaCategories/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const mediaCategoriesAPI = {
  getAllMediaCategories: async () => {
    return mediaCategoriesApiRequest("GetAllMediaCategories");
  },

  createMediaCategory: async (categoryData) => {
    return mediaCategoriesApiRequest("CreateMediaCategory", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  },

  updateMediaCategory: async (categoryData) => {
    return mediaCategoriesApiRequest("UpdateMediaCategory", {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  },

  deleteMediaCategory: async (categoryId) => {
    return mediaCategoriesApiRequest("DeleteMediaCategory", {
      method: "DELETE",
      body: JSON.stringify({ Id: categoryId }),
    });
  },

  addMediaCategoryTranslation: async (translationData) => {
    return mediaCategoriesApiRequest("AddMediaCategoryTranslation", {
      method: "POST",
      body: JSON.stringify(translationData),
    });
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Name) queryParams.append("Name", filter.Name);
    if (filter.Code) queryParams.append("Code", filter.Code);
    if (filter.IsActive !== undefined)
      queryParams.append("IsActive", filter.IsActive);

    return mediaCategoriesApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

// Helper functions
export const getAllMediaCategories = async () => {
  try {
    const response = await mediaCategoriesAPI.getAllMediaCategories();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching media categories:", error);
    throw error;
  }
};

export const getMediaCategoryById = async (id) => {
  try {
    const categories = await getAllMediaCategories();
    return categories.find((category) => category.Id === id);
  } catch (error) {
    console.error("Error fetching media category by ID:", error);
    throw error;
  }
};

export const getMediaCategoryNameInLanguage = (category, languageId) => {
  if (!category?.Translations) return "No Name";
  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getMediaCategoryDescriptionInLanguage = (category, languageId) => {
  if (!category?.Translations) return "";
  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getMediaCategoryTranslations = (category) => {
  return category?.Translations || [];
};
