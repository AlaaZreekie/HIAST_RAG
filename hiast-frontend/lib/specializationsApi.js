const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

// Generic API request function for specializations
async function specializationsApiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}/Admin/Specializations${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Add authorization header if token exists
  const token = localStorage.getItem("admin_token");
  if (token) {
    defaultOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    console.log("Making Specializations API request to:", url);
    const response = await fetch(url, config);
    console.log("Response status:", response.status);

    const text = await response.text();
    console.log("Raw response text:", text);

    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
      // If the result is a string (double-encoded), parse again
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
    } catch (e) {
      console.error("JSON parsing error:", e);
      data = null;
    }

    if (!response.ok) {
      const errorMessage =
        (data && (data.Message || data.message)) ||
        `HTTP ${response.status}: ${response.statusText}`;
      console.error("Specializations API request failed:", {
        status: response.status,
        statusText: response.statusText,
        url: url,
        data: data,
        errorMessage: errorMessage,
      });
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Specializations API Error:", error);
    throw error;
  }
}

// Specializations API functions
export const specializationsAPI = {
  // Get all specializations
  async getAllSpecializations() {
    const response = await specializationsApiRequest("/GetAllSpecializations", {
      method: "GET",
    });
    return response.Data || [];
  },

  // Get specializations by filter
  async getSpecializationsByFilter(filter) {
    const response = await specializationsApiRequest(
      "/GetSpecializationsByFilter",
      {
        method: "POST",
        body: JSON.stringify(filter),
      }
    );
    return response.Data || [];
  },

  // Create specialization
  async createSpecialization(specializationData) {
    const response = await specializationsApiRequest("/CreateSpecialization", {
      method: "POST",
      body: JSON.stringify(specializationData),
    });
    return response.Data;
  },

  // Update specialization
  async updateSpecialization(specializationData) {
    const response = await specializationsApiRequest("/UpdateSpecialization", {
      method: "PUT",
      body: JSON.stringify(specializationData),
    });
    return response.Data;
  },

  // Delete specialization
  async deleteSpecialization(specializationId) {
    const response = await specializationsApiRequest("/DeleteSpecialization", {
      method: "DELETE",
      body: JSON.stringify({ Id: specializationId }),
    });
    return response.Data;
  },
};

// Helper functions
export const getAllSpecializations = async () => {
  try {
    return await specializationsAPI.getAllSpecializations();
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw error;
  }
};

export const getSpecializationById = async (id) => {
  try {
    const specializations = await getAllSpecializations();
    return specializations.find((spec) => spec.Id === id);
  } catch (error) {
    console.error("Error fetching specialization by ID:", error);
    throw error;
  }
};

export const getSpecializationNameInLanguage = (
  specialization,
  languageCode
) => {
  if (!specialization?.Translations) return specialization?.Name || "Unknown";
  const translation = specialization.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || specialization?.Name || "Unknown";
};

export const getSpecializationTranslations = (specialization) => {
  return specialization?.Translations || [];
};
