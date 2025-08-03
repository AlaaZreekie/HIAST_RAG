import { apiRequest } from "./api";

const admissionResultsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/admissionResults/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const admissionResultsAPI = {
  getAllResults: async () => {
    return admissionResultsApiRequest("GetAllResults");
  },

  createResult: async (resultData) => {
    return admissionResultsApiRequest("CreateResult", {
      method: "POST",
      body: resultData, // FormData for file upload
    });
  },

  updateResult: async (resultData) => {
    return admissionResultsApiRequest("UpdateResult", {
      method: "PUT",
      body: JSON.stringify(resultData),
    });
  },

  deleteResult: async (resultId) => {
    return admissionResultsApiRequest("DeleteResult", {
      method: "DELETE",
      body: JSON.stringify({ Id: resultId }),
    });
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.AdmissionId)
      queryParams.append("AdmissionId", filter.AdmissionId);
    if (filter.StudentName)
      queryParams.append("StudentName", filter.StudentName);
    if (filter.ResultDate) queryParams.append("ResultDate", filter.ResultDate);
    if (filter.IsPassed !== undefined)
      queryParams.append("IsPassed", filter.IsPassed);

    return admissionResultsApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

// Helper functions
export const getAllAdmissionResults = async () => {
  try {
    const response = await admissionResultsAPI.getAllResults();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching admission results:", error);
    throw error;
  }
};

export const getAdmissionResultById = async (id) => {
  try {
    const results = await getAllAdmissionResults();
    return results.find((result) => result.Id === id);
  } catch (error) {
    console.error("Error fetching admission result by ID:", error);
    throw error;
  }
};

export const getAdmissionResultNameInLanguage = (result, languageId) => {
  if (!result?.Translations) return "No Name";
  const translation = result.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getAdmissionResultDescriptionInLanguage = (result, languageId) => {
  if (!result?.Translations) return "";
  const translation = result.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getAdmissionResultTranslations = (result) => {
  return result?.Translations || [];
};

export const getAdmissionResultAdmissionName = (result) => {
  return result?.Admission?.Name || "Unknown Admission";
};

export const getAdmissionResultStudentName = (result) => {
  return result?.StudentName || "Unknown Student";
};

export const formatResultDate = (date) => {
  if (!date) return "No Date";
  return new Date(date).toLocaleDateString();
};

// Result type helper function
export const getResultTypeName = (type) => {
  switch (type) {
    case 0:
      return "Passed";
    case 1:
      return "Failed";
    case 2:
      return "Pending";
    default:
      return "Unknown";
  }
};

// Admission-related helper functions
export const getAdmissionAcademicYear = (admission) => {
  return admission?.AcademicYear || "Unknown Year";
};

export const getAdmissionProgramName = (admission) => {
  return admission?.Program?.Name || "Unknown Program";
};

export const getAdmissionLocationName = (admission) => {
  return admission?.Location?.Name || "Unknown Location";
};
