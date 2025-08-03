const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function programsApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/Admin/Programs/${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const responseText = await response.text();
  let data;

  try {
    data = JSON.parse(responseText);
  } catch (error) {
    console.error("Failed to parse JSON response:", responseText);
    throw new Error("Invalid JSON response from server");
  }

  if (!data.Result) {
    throw new Error(data.Message || "API request failed");
  }

  return data.Data;
}

export const programsAPI = {
  getAllPrograms: () => programsApiRequest("GetAllPrograms"),
  getProgramsByFilter: (filter) =>
    programsApiRequest("GetByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    }),
  createProgram: (programData) =>
    programsApiRequest("CreateProgram", {
      method: "POST",
      body: JSON.stringify(programData),
    }),
  updateProgram: (programData) =>
    programsApiRequest("UpdateProgram", {
      method: "PUT",
      body: JSON.stringify(programData),
    }),
  deleteProgram: (programId) =>
    programsApiRequest("DeleteProgram", {
      method: "DELETE",
      body: JSON.stringify({ Id: programId }),
    }),
  addProgramTranslation: (translationData) =>
    programsApiRequest("AddProgramTranslation", {
      method: "POST",
      body: JSON.stringify(translationData),
    }),
};

export const getAllPrograms = async () => {
  try {
    return await programsAPI.getAllPrograms();
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

export const getProgramNameInLanguage = (program, languageCode) => {
  if (!program?.Translations) return program?.Name || "Unknown";
  const translation = program.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || program?.Name || "Unknown";
};

export const getProgramTranslations = (program) => {
  return program?.Translations || [];
};
