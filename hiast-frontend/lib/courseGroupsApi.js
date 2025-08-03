import { apiRequest } from "./api";

const courseGroupsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/courseGroups/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const courseGroupsAPI = {
  getAllCourseGroups: async () => {
    return courseGroupsApiRequest("GetAllCourseGroups");
  },

  createCourseGroup: async (courseGroupData) => {
    return courseGroupsApiRequest("CreateCourseGroup", {
      method: "POST",
      body: JSON.stringify(courseGroupData),
    });
  },

  updateCourseGroup: async (courseGroupData) => {
    return courseGroupsApiRequest("UpdateCourseGroup", {
      method: "PUT",
      body: JSON.stringify(courseGroupData),
    });
  },

  deleteCourseGroup: async (courseGroupId) => {
    return courseGroupsApiRequest("DeleteCourseGroup", {
      method: "DELETE",
      body: JSON.stringify({ Id: courseGroupId }),
    });
  },

  addCourseGroupTranslation: async (translationData) => {
    return courseGroupsApiRequest("AddCourseGroupTranslation", {
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

    return courseGroupsApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

// Helper functions
export const getAllCourseGroups = async () => {
  try {
    const response = await courseGroupsAPI.getAllCourseGroups();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching course groups:", error);
    throw error;
  }
};

export const getCourseGroupById = async (id) => {
  try {
    const courseGroups = await getAllCourseGroups();
    return courseGroups.find((courseGroup) => courseGroup.Id === id);
  } catch (error) {
    console.error("Error fetching course group by ID:", error);
    throw error;
  }
};

export const getCourseGroupNameInLanguage = (courseGroup, languageId) => {
  if (!courseGroup?.Translations) return "No Name";
  const translation = courseGroup.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getCourseGroupDescriptionInLanguage = (
  courseGroup,
  languageId
) => {
  if (!courseGroup?.Translations) return "";
  const translation = courseGroup.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getCourseGroupTranslations = (courseGroup) => {
  return courseGroup?.Translations || [];
};
