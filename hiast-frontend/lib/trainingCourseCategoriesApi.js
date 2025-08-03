import { apiRequest } from "./api";

const trainingCourseCategoriesApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/trainingCourseCategories/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const trainingCourseCategoriesAPI = {
  getAllCategories: async () => {
    return trainingCourseCategoriesApiRequest("GetAll");
  },

  getCategoriesByFilter: async (filter) => {
    return trainingCourseCategoriesApiRequest("GetByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
  },

  createCategory: async (categoryData) => {
    return trainingCourseCategoriesApiRequest("Create", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  },

  updateCategory: async (categoryData) => {
    return trainingCourseCategoriesApiRequest("Update", {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: async (categoryId) => {
    return trainingCourseCategoriesApiRequest("Delete", {
      method: "DELETE",
      body: JSON.stringify({ Id: categoryId }),
    });
  },
};

// Helper functions
export const getAllTrainingCourseCategories = async () => {
  try {
    const response = await trainingCourseCategoriesAPI.getAllCategories();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching training course categories:", error);
    throw error;
  }
};

export const getTrainingCourseCategoryById = async (id) => {
  try {
    const categories = await getAllTrainingCourseCategories();
    return categories.find((category) => category.Id === id);
  } catch (error) {
    console.error("Error fetching training course category by ID:", error);
    throw error;
  }
};

export const getTrainingCourseCategoryNameInLanguage = (
  category,
  languageId
) => {
  if (!category?.Translations) return "No Name";
  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getTrainingCourseCategoryDescriptionInLanguage = (
  category,
  languageId
) => {
  if (!category?.Translations) return "";
  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getTrainingCourseCategoryTranslations = (category) => {
  return category?.Translations || [];
};
