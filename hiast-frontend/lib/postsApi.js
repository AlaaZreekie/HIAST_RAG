const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

// Generic API request function for posts
async function postsApiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}/admin/posts${endpoint}`;

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
    console.log("Making Posts API request to:", url);
    const response = await fetch(url, config);
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.Message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("Posts API Error:", error);
    throw error;
  }
}

// Posts API functions
export const postsAPI = {
  // Get all posts
  async getAllPosts() {
    const response = await postsApiRequest("/GetAllPosts", {
      method: "GET",
    });
    return response;
  },

  // Create new post
  async createPost(postData) {
    const response = await postsApiRequest("/CreatePost", {
      method: "POST",
      body: JSON.stringify(postData),
    });
    return response;
  },

  // Update existing post
  async updatePost(postData) {
    const response = await postsApiRequest("/UpdatePost", {
      method: "PUT",
      body: JSON.stringify(postData),
    });
    return response;
  },

  // Delete post
  async deletePost(postId) {
    const response = await postsApiRequest("/DeletePost", {
      method: "DELETE",
      body: JSON.stringify({ Id: postId }),
    });
    return response;
  },

  // Add post translation
  async addPostTranslation(translationData) {
    const response = await postsApiRequest("/AddPostTranslation", {
      method: "POST",
      body: JSON.stringify(translationData),
    });
    return response;
  },

  // Get posts by filter
  async getPostsByFilter(filterData) {
    const queryParams = new URLSearchParams();
    Object.keys(filterData).forEach((key) => {
      if (filterData[key] !== null && filterData[key] !== undefined) {
        queryParams.append(key, filterData[key]);
      }
    });

    const response = await postsApiRequest(
      `/GetByFilter?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
    return response;
  },
};

// Helper functions
export const formatPostDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getLanguageName = (languageCode) => {
  const languages = {
    1: "Arabic",
    2: "English",
    3: "French",
    4: "German",
  };
  return languages[languageCode] || "Unknown";
};

export const getLanguageCode = (languageName) => {
  const codes = {
    Arabic: 1,
    English: 2,
    French: 3,
    German: 4,
  };
  return codes[languageName] || 2; // Default to English
};
