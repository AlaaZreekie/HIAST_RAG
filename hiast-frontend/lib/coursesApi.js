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
  getAllCourses: async () => {
    return coursesApiRequest("GetAllCourses");
  },

  getCoursesByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Name) queryParams.append("Name", filter.Name);
    if (filter.CourseGroupId)
      queryParams.append("CourseGroupId", filter.CourseGroupId);
    if (filter.CurriculumId)
      queryParams.append("CurriculumId", filter.CurriculumId);

    return coursesApiRequest(`GetByFilter?${queryParams.toString()}`);
  },

  createCourse: async (courseData) => {
    return coursesApiRequest("CreateCourse", {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  },

  updateCourse: async (courseData) => {
    return coursesApiRequest("UpdateCourse", {
      method: "PUT",
      body: JSON.stringify(courseData),
    });
  },

  deleteCourse: async (courseId) => {
    return coursesApiRequest("DeleteCourse", {
      method: "DELETE",
      body: JSON.stringify({ Id: courseId }),
    });
  },

  addCourseTranslation: async (translationData) => {
    return coursesApiRequest("AddCourseTranslation", {
      method: "POST",
      body: JSON.stringify(translationData),
    });
  },
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
    return courses.find((course) => course.Id === courseId);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

export const getCourseNameInLanguage = (course, languageCode) => {
  if (!course.Translations || !Array.isArray(course.Translations)) return "N/A";
  const translation = course.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || "N/A";
};

export const getCourseDescriptionInLanguage = (course, languageCode) => {
  if (!course.Translations || !Array.isArray(course.Translations)) return "N/A";
  const translation = course.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Description || "N/A";
};

export const getCourseTranslations = (course) => {
  return course.Translations || [];
};
