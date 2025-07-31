const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function trainingCourseCategoriesApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/Admin/TrainingCourseCategories/${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const responseText = await response.text();
  let data;

  try {
    data = JSON.parse(responseText);
  } catch (error) {
    console.error("Failed to parse JSON response:", responseText);
    throw new Error("Invalid JSON response from server");
  }

  if (!data.Result) {
    throw new Error(data.Message || "API request failed");
  }

  return data.Data;
}

export const trainingCourseCategoriesAPI = {
  getAll: () => trainingCourseCategoriesApiRequest("GetAll"),
  getByFilter: (filter) =>
    trainingCourseCategoriesApiRequest("GetByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    }),
  create: (categoryData) =>
    trainingCourseCategoriesApiRequest("Create", {
      method: "POST",
      body: JSON.stringify(categoryData),
    }),
  update: (categoryData) =>
    trainingCourseCategoriesApiRequest("Update", {
      method: "PUT",
      body: JSON.stringify(categoryData),
    }),
  delete: (categoryId) =>
    trainingCourseCategoriesApiRequest("Delete", {
      method: "DELETE",
      body: JSON.stringify({ Id: categoryId }),
    }),
};

export const getAllTrainingCourseCategories = async () => {
  try {
    return await trainingCourseCategoriesAPI.getAll();
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
  languageCode
) => {
  if (!category?.Translations) return category?.Name || "Unknown";
  const translation = category.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || category?.Name || "Unknown";
};

export const getTrainingCourseCategoryTranslations = (category) => {
  return category?.Translations || [];
};
