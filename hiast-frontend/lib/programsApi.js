import { apiRequest } from "./api";

const programsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/programs/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const programsAPI = {
  getAllPrograms: async () => {
    const response = await programsApiRequest("GetAllPrograms");
    // Handle ApiResponse structure
    return response.Data || response;
  },

  createProgram: async (programData) => {
    return programsApiRequest("CreateProgram", {
      method: "POST",
      body: JSON.stringify(programData),
    });
  },

  updateProgram: async (programData) => {
    return programsApiRequest("UpdateProgram", {
      method: "PUT",
      body: JSON.stringify(programData),
    });
  },

  deleteProgram: async (programId) => {
    return programsApiRequest("DeleteProgram", {
      method: "DELETE",
      body: JSON.stringify({ Id: programId }),
    });
  },

  addProgramTranslation: async (translationData) => {
    return programsApiRequest("AddProgramTranslation", {
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

    const response = await programsApiRequest(
      `GetByFilter?${queryParams.toString()}`
    );
    // Handle ApiResponse structure
    return response.Data || response;
  },
};

// Helper functions
export const getAllPrograms = async () => {
  try {
    const response = await programsAPI.getAllPrograms();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
};

export const getProgramById = async (id) => {
  try {
    const programs = await getAllPrograms();
    return programs.find((program) => program.Id === id);
  } catch (error) {
    console.error("Error fetching program by ID:", error);
    throw error;
  }
};

export const getProgramNameInLanguage = (program, languageId) => {
  if (!program?.Translations) return "No Name";
  const translation = program.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getProgramDescriptionInLanguage = (program, languageId) => {
  if (!program?.Translations) return "";
  const translation = program.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getProgramTranslations = (program) => {
  return program?.Translations || [];
};
