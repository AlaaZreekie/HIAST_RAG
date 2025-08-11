import { apiRequest } from "./api";

const API_BASE_URL = "http://localhost:5007/api";

// Generic API request function for media
async function mediaApiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}/admin/medias${endpoint}`;

  const defaultOptions = {
    headers: {},
  };

  // Add authorization header if token exists
  const token = localStorage.getItem("admin_token");
  if (token) {
    defaultOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  // Check if user is admin before making request
  const { isAdmin } = await import("./api.js");
  if (!isAdmin()) {
    throw new Error("Access denied. Admin role required.");
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
    console.log("Making Media API request to:", url);
    const response = await fetch(url, config);
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.Message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("Media API Error:", error);
    throw error;
  }
}

// Media API functions
export const mediaAPI = {
  // Get all media files
  async getAllMedias() {
    const response = await mediaApiRequest("/GetAllMedias", {
      method: "GET",
    });
    return response;
  },

  // Create new media file (with file upload)
  async createMedia(formData) {
    const response = await mediaApiRequest("/CreateMedia", {
      method: "POST",
      body: formData, // FormData for file upload
      headers: {}, // Let browser set Content-Type for FormData
    });
    return response;
  },

  // Update existing media file
  async updateMedia(mediaData) {
    const response = await mediaApiRequest("/UpdateMedia", {
      method: "PUT",
      body: JSON.stringify(mediaData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  // Delete media file
  async deleteMedia(mediaId) {
    const response = await mediaApiRequest("/DeleteMedia", {
      method: "DELETE",
      body: JSON.stringify({ Id: mediaId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },

  // Get media files by filter
  async getMediasByFilter(filterData) {
    const response = await mediaApiRequest("/GetByFilter", {
      method: "GET",
      params: filterData,
    });
    return response;
  },
};

// Helper functions
export const getAllMedias = async () => {
  try {
    const response = await mediaAPI.getAllMedias();
    return response.Data || [];
  } catch (error) {
    console.error("Error fetching media files:", error);
    throw error;
  }
};

export const getMediaById = async (id) => {
  try {
    const response = await mediaAPI.getMediasByFilter({ Id: id });
    const mediaFiles = response.Data || [];
    return mediaFiles.find((media) => media.Id === id);
  } catch (error) {
    console.error("Error fetching media by ID:", error);
    throw error;
  }
};

// File upload helper
export const createMediaFormData = (file, mediaData) => {
  const formData = new FormData();

  // Add the file
  if (file) {
    formData.append("File", file);
  }

  // Add other media data if needed
  if (mediaData && Object.keys(mediaData).length > 0) {
    Object.keys(mediaData).forEach((key) => {
      if (key !== "File") {
        // Don't add file again
        if (typeof mediaData[key] === "object") {
          formData.append(key, JSON.stringify(mediaData[key]));
        } else {
          formData.append(key, mediaData[key]);
        }
      }
    });
  }

  return formData;
};
