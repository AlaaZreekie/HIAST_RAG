import { apiRequest } from "./api";

const curriculumsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/curriculums/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const curriculumsAPI = {
  getAllCurriculums: async () => {
    return curriculumsApiRequest("GetAllCurriculums");
  },

  createCurriculum: async (curriculumData) => {
    return curriculumsApiRequest("CreateCurriculum", {
      method: "POST",
      body: JSON.stringify(curriculumData),
    });
  },

  updateCurriculum: async (curriculumData) => {
    return curriculumsApiRequest("UpdateCurriculum", {
      method: "PUT",
      body: JSON.stringify(curriculumData),
    });
  },

  deleteCurriculum: async (curriculumId) => {
    return curriculumsApiRequest("DeleteCurriculum", {
      method: "DELETE",
      body: JSON.stringify({ Id: curriculumId }),
    });
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Name) queryParams.append("Name", filter.Name);
    if (filter.ProgramId) queryParams.append("ProgramId", filter.ProgramId);
    if (filter.IsActive !== undefined)
      queryParams.append("IsActive", filter.IsActive);

    return curriculumsApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

// Helper functions
export const getAllCurriculums = async () => {
  try {
    const response = await curriculumsAPI.getAllCurriculums();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching curriculums:", error);
    throw error;
  }
};

export const getCurriculumById = async (id) => {
  try {
    const curriculums = await getAllCurriculums();
    return curriculums.find((curriculum) => curriculum.Id === id);
  } catch (error) {
    console.error("Error fetching curriculum by ID:", error);
    throw error;
  }
};

export const getCurriculumNameInLanguage = (curriculum, languageId) => {
  if (!curriculum?.Translations) return "No Name";
  const translation = curriculum.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getCurriculumDescriptionInLanguage = (curriculum, languageId) => {
  if (!curriculum?.Translations) return "";
  const translation = curriculum.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getCurriculumTranslations = (curriculum) => {
  return curriculum?.Translations || [];
};
