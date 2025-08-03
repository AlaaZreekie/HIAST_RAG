import { apiRequest } from "./api";

const specializationsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/specializations/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const specializationsAPI = {
  getAllSpecializations: async () => {
    return specializationsApiRequest("GetAllSpecializations");
  },

  getSpecializationsByFilter: async (filter) => {
    return specializationsApiRequest("GetSpecializationsByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
  },

  createSpecialization: async (specializationData) => {
    return specializationsApiRequest("CreateSpecialization", {
      method: "POST",
      body: JSON.stringify(specializationData),
    });
  },

  updateSpecialization: async (specializationData) => {
    return specializationsApiRequest("UpdateSpecialization", {
      method: "PUT",
      body: JSON.stringify(specializationData),
    });
  },

  deleteSpecialization: async (specializationId) => {
    return specializationsApiRequest("DeleteSpecialization", {
      method: "DELETE",
      body: JSON.stringify({ Id: specializationId }),
    });
  },
};

// Helper functions
export const getAllSpecializations = async () => {
  try {
    const response = await specializationsAPI.getAllSpecializations();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw error;
  }
};

export const getSpecializationById = async (id) => {
  try {
    const specializations = await getAllSpecializations();
    return specializations.find((specialization) => specialization.Id === id);
  } catch (error) {
    console.error("Error fetching specialization by ID:", error);
    throw error;
  }
};

export const getSpecializationNameInLanguage = (specialization, languageId) => {
  if (!specialization?.Translations) return "No Name";
  const translation = specialization.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getSpecializationDescriptionInLanguage = (
  specialization,
  languageId
) => {
  if (!specialization?.Translations) return "";
  const translation = specialization.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getSpecializationTranslations = (specialization) => {
  return specialization?.Translations || [];
};
