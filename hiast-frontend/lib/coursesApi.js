import { apiRequest } from "./api";

const coursesApiRequest = (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/courses/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const coursesAPI = {
  getAllCourses: () => coursesApiRequest("GetAllCourses"),
  getCoursesByFilter: (filter) =>
    coursesApiRequest("GetByFilter", {
      method: "POST",
      body: filter,
    }),
  createCourse: (courseData) =>
    coursesApiRequest("CreateCourse", {
      method: "POST",
      body: courseData,
    }),
  updateCourse: (courseId, courseData) =>
    coursesApiRequest(`UpdateCourse/${courseId}`, {
      method: "PUT",
      body: courseData,
    }),
  deleteCourse: (courseId) =>
    coursesApiRequest(`DeleteCourse/${courseId}`, {
      method: "DELETE",
    }),
};

// Helper functions
export const getAllCourses = async () => {
  try {
    return await coursesAPI.getAllCourses();
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    const courses = await getAllCourses();
    return courses.find(course => course.Id === courseId);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

export const getCourseNameInLanguage = (course, languageCode) => {
  if (!course.Translations || !Array.isArray(course.Translations)) return "N/A";
  const translation = course.Translations.find(t => t.LanguageCode === languageCode);
  return translation?.Name || "N/A";
};

export const getCourseDescriptionInLanguage = (course, languageCode) => {
  if (!course.Translations || !Array.isArray(course.Translations)) return "N/A";
  const translation = course.Translations.find(t => t.LanguageCode === languageCode);
  return translation?.Description || "N/A";
};

export const getCourseTranslations = (course) => {
  return course.Translations || [];
}; 