import { apiRequest } from "./api";

const locationsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/locations/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const locationsAPI = {
  getAllLocations: async () => {
    return locationsApiRequest("GetAllLocations");
  },

  createLocation: async (locationData) => {
    return locationsApiRequest("CreateLocation", {
      method: "POST",
      body: JSON.stringify(locationData),
    });
  },

  updateLocation: async (locationData) => {
    return locationsApiRequest("UpdateLocation", {
      method: "PUT",
      body: JSON.stringify(locationData),
    });
  },

  deleteLocation: async (locationId) => {
    return locationsApiRequest("DeleteLocation", {
      method: "DELETE",
      body: JSON.stringify({ Id: locationId }),
    });
  },

  getLocationsByFilter: async (filter) => {
    return locationsApiRequest("GetLocationsByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
  },
};

// Helper functions
export const getAllLocations = async () => {
  try {
    const response = await locationsAPI.getAllLocations();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const getLocationById = async (id) => {
  try {
    const locations = await getAllLocations();
    return locations.find((location) => location.Id === id);
  } catch (error) {
    console.error("Error fetching location by ID:", error);
    throw error;
  }
};

export const getLocationNameInLanguage = (location, languageId) => {
  if (!location?.Translations) return "No Name";
  const translation = location.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getLocationAddressInLanguage = (location, languageId) => {
  if (!location?.Translations) return "";
  const translation = location.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Address || "";
};

export const getLocationDescriptionInLanguage = (location, languageId) => {
  if (!location?.Translations) return "";
  const translation = location.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Description || "";
};

export const getLocationTranslations = (location) => {
  return location?.Translations || [];
};
