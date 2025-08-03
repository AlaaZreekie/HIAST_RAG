import { apiRequest } from "./api";

const admissionsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/admissions/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const admissionsAPI = {
  getAllAdmissions: async () => {
    return admissionsApiRequest("GetAllAdmissions");
  },

  createAdmission: async (admissionData) => {
    return admissionsApiRequest("CreateAdmission", {
      method: "POST",
      body: JSON.stringify(admissionData),
    });
  },

  updateAdmission: async (admissionData) => {
    return admissionsApiRequest("UpdateAdmission", {
      method: "PUT",
      body: JSON.stringify(admissionData),
    });
  },

  deleteAdmission: async (admissionId) => {
    return admissionsApiRequest("DeleteAdmission", {
      method: "DELETE",
      body: JSON.stringify({ Id: admissionId }),
    });
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.AcademicYear)
      queryParams.append("AcademicYear", filter.AcademicYear);
    if (filter.ProgramId) queryParams.append("ProgramId", filter.ProgramId);
    if (filter.LocationId) queryParams.append("LocationId", filter.LocationId);
    if (filter.IsActive !== undefined)
      queryParams.append("IsActive", filter.IsActive);

    return admissionsApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

// Helper functions
export const getAllAdmissions = async () => {
  try {
    const response = await admissionsAPI.getAllAdmissions();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching admissions:", error);
    throw error;
  }
};

export const getAdmissionById = async (id) => {
  try {
    const admissions = await getAllAdmissions();
    return admissions.find((admission) => admission.Id === id);
  } catch (error) {
    console.error("Error fetching admission by ID:", error);
    throw error;
  }
};

export const getAdmissionNameInLanguage = (admission, languageId) => {
  if (!admission?.Translations) return "No Name";
  const translation = admission.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getAdmissionDescriptionInLanguage = (admission, languageId) => {
  if (!admission?.Translations) return "";
  const translation = admission.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getAdmissionTranslations = (admission) => {
  return admission?.Translations || [];
};
