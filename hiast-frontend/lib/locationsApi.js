const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function locationsApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/Admin/Locations/${endpoint}`;
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText}`);
    }

    if (!responseText) {
      return { success: true, data: null };
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      // Try parsing as double-encoded JSON
      try {
        const decoded = decodeURIComponent(responseText);
        data = JSON.parse(decoded);
      } catch (doubleParseError) {
        console.error("Failed to parse response:", responseText);
        throw new Error("Invalid JSON response");
      }
    }

    if (data.Result === false) {
      throw new Error(data.Message || "API request failed");
    }

    return {
      success: true,
      data: data.Data,
      message: data.Message,
    };
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const locationsAPI = {
  getAllLocations: () => locationsApiRequest("GetAllLocations"),
  createLocation: (data) => {
    return locationsApiRequest("CreateLocation", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  updateLocation: (data) => {
    console.log("API updateLocation called with data:", data);
    console.log("API updateLocation JSON:", JSON.stringify(data, null, 2));
    return locationsApiRequest("UpdateLocation", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  deleteLocation: (id) =>
    locationsApiRequest("DeleteLocation", {
      method: "DELETE",
      body: JSON.stringify({ Id: id }),
    }),
  getLocationsByFilter: (filter) =>
    locationsApiRequest("GetLocationsByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    }),
};

export const getAllLocations = async () => {
  try {
    const response = await locationsAPI.getAllLocations();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    throw error;
  }
};

export const getLocationById = async (id) => {
  try {
    const locations = await getAllLocations();
    return locations.find((location) => location.Id === id);
  } catch (error) {
    console.error("Failed to fetch location:", error);
    throw error;
  }
};

export const getLocationNameInLanguage = (location, languageCode) => {
  if (!location || !location.Translations) return "";

  const translation = location.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation ? translation.Name : "";
};

export const getLocationAddressInLanguage = (location, languageCode) => {
  if (!location || !location.Translations) return "";

  const translation = location.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation ? translation.Address : "";
};

export const getLocationTranslations = (location) => {
  return location?.Translations || [];
};
