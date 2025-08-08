import { serverApiRequest } from "./api";

const publicProgramsApiRequest = async (endpoint, options = {}) => {
  return serverApiRequest(`/User/Programs/${endpoint}`, options);
};

export const publicProgramsAPI = {
  getAllPrograms: async () => {
    const response = await publicProgramsApiRequest("GetAllPrograms");
    // Handle ApiResponse structure
    return response.Data || response;
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Name) queryParams.append("Name", filter.Name);
    if (filter.Duration) queryParams.append("Duration", filter.Duration);
    if (filter.Description)
      queryParams.append("Description", filter.Description);
    if (filter.LanguageCode)
      queryParams.append("LanguageCode", filter.LanguageCode);

    const response = await publicProgramsApiRequest(
      `GetByFilter?${queryParams.toString()}`
    );
    // Handle ApiResponse structure
    return response.Data || response;
  },
};

// Helper functions for public use
export const getAllPublicPrograms = async () => {
  try {
    const response = await publicProgramsAPI.getAllPrograms();
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching public programs:", error);
    throw error;
  }
};

export const getPublicProgramById = async (id) => {
  try {
    const programs = await getAllPublicPrograms();
    return programs.find((program) => program.Id === id);
  } catch (error) {
    console.error("Error fetching public program by ID:", error);
    throw error;
  }
};

export const getProgramNameInLanguage = (program, languageCode) => {
  if (!program?.Translations) return "No Name";
  const translation = program.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || "No Name";
};

export const getProgramDescriptionInLanguage = (program, languageCode) => {
  if (!program?.Translations) return "";
  const translation = program.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Description || "";
};

export const getProgramTranslations = (program) => {
  return program?.Translations || [];
};
