import { apiRequest } from "./api";

const trainingCoursesApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/trainingCourses/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const trainingCoursesAPI = {
  getAllTrainingCourses: async () => {
    return trainingCoursesApiRequest("GetAll");
  },

  getTrainingCoursesByFilter: async (filter) => {
    return trainingCoursesApiRequest("GetByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
  },

  createTrainingCourse: async (trainingCourseData) => {
    return trainingCoursesApiRequest("Create", {
      method: "POST",
      body: JSON.stringify(trainingCourseData),
    });
  },

  updateTrainingCourse: async (trainingCourseData) => {
    return trainingCoursesApiRequest("Update", {
      method: "PUT",
      body: JSON.stringify(trainingCourseData),
    });
  },

  deleteTrainingCourse: async (id) => {
    return trainingCoursesApiRequest("Delete", {
      method: "DELETE",
      body: JSON.stringify({ Id: id }),
    });
  },
};

// Helper functions for language-specific data
export const getAllTrainingCourses = async () => {
  try {
    console.log("Fetching training courses...");
    const response = await trainingCoursesAPI.getAllTrainingCourses();
    console.log("Raw API response:", response);

    // Handle the API response structure
    if (response && response.Data) {
      const data = response.Data;
      console.log("Extracted data:", data);
      return Array.isArray(data) ? data : [];
    } else if (Array.isArray(response)) {
      console.log("Response is already an array:", response);
      return response;
    } else {
      console.warn("Unexpected response structure:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching training courses:", error);
    return [];
  }
};

export const getTrainingCourseById = async (id) => {
  try {
    const trainingCourses = await getAllTrainingCourses();
    return trainingCourses.find((tc) => tc.Id === id);
  } catch (error) {
    console.error("Error fetching training course by ID:", error);
    return null;
  }
};

// Updated helper functions to match backend DTO structure
export const getTrainingCourseNameInLanguage = (trainingCourse, languageId) => {
  if (!trainingCourse?.Translations) return "No Name";
  const translation = trainingCourse.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Title || "No Name";
};

export const getTrainingCourseDescriptionInLanguage = (
  trainingCourse,
  languageId
) => {
  if (!trainingCourse?.Translations) return "";
  const translation = trainingCourse.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Content || "";
};

export const getTrainingCourseCategoryName = (trainingCourse) => {
  if (!trainingCourse?.TrainingCourseCategory?.Translations)
    return "No Category";
  const translation = trainingCourse.TrainingCourseCategory.Translations.find(
    (t) => t.LanguageCode === 1 || t.LanguageCode === 2
  );
  return translation?.Name || "No Category";
};

export const getTrainingCourseTranslations = (trainingCourse) => {
  return trainingCourse?.Translations || [];
};

// Legacy functions for backward compatibility
export const getTrainingCourseNameInLanguageLegacy = (
  trainingCourse,
  language = "en"
) => {
  if (!trainingCourse) return "N/A";

  if (language === "ar") {
    return trainingCourse.ArabicName || trainingCourse.Name || "N/A";
  }
  return trainingCourse.EnglishName || trainingCourse.Name || "N/A";
};

export const getTrainingCourseDescriptionInLanguageLegacy = (
  trainingCourse,
  language = "en"
) => {
  if (!trainingCourse) return "N/A";

  if (language === "ar") {
    return (
      trainingCourse.ArabicDescription || trainingCourse.Description || "N/A"
    );
  }
  return (
    trainingCourse.EnglishDescription || trainingCourse.Description || "N/A"
  );
};
