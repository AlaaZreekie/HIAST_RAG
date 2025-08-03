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
      body: trainingCourseData, // FormData for file upload
    });
  },

  updateTrainingCourse: async (trainingCourseData) => {
    return trainingCoursesApiRequest("Update", {
      method: "PUT",
      body: trainingCourseData, // FormData for file upload
    });
  },

  deleteTrainingCourse: async (id) => {
    return trainingCoursesApiRequest(`Delete/${id}`, {
      method: "DELETE",
    });
  },
};

// Helper functions for language-specific data
export const getAllTrainingCourses = async () => {
  try {
    const data = await trainingCoursesAPI.getAllTrainingCourses();
    return Array.isArray(data) ? data : [];
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

export const getTrainingCourseNameInLanguage = (
  trainingCourse,
  language = "en"
) => {
  if (!trainingCourse) return "N/A";

  if (language === "ar") {
    return trainingCourse.ArabicName || trainingCourse.Name || "N/A";
  }
  return trainingCourse.EnglishName || trainingCourse.Name || "N/A";
};

export const getTrainingCourseDescriptionInLanguage = (
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

export const getTrainingCourseTranslations = (trainingCourse) => {
  if (!trainingCourse) return [];

  const translations = [];

  if (trainingCourse.Name) translations.push("Name");
  if (trainingCourse.ArabicName) translations.push("ArabicName");
  if (trainingCourse.EnglishName) translations.push("EnglishName");
  if (trainingCourse.Description) translations.push("Description");
  if (trainingCourse.ArabicDescription) translations.push("ArabicDescription");
  if (trainingCourse.EnglishDescription)
    translations.push("EnglishDescription");

  return translations;
};
