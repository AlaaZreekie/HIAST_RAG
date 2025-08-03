import { apiRequest } from "./api";

// Posts API functions
export const postsAPI = {
  // Get all posts
  async getAllPosts() {
    const response = await apiRequest("/admin/posts/GetAllPosts", {
      method: "GET",
    });
    return response;
  },

  // Create new post
  async createPost(postData) {
    const response = await apiRequest("/admin/posts/CreatePost", {
      method: "POST",
      body: JSON.stringify(postData),
    });
    return response;
  },

  // Update existing post
  async updatePost(postData) {
    const response = await apiRequest("/admin/posts/UpdatePost", {
      method: "PUT",
      body: JSON.stringify(postData),
    });
    return response;
  },

  // Delete post
  async deletePost(postId) {
    const response = await apiRequest("/admin/posts/DeletePost", {
      method: "DELETE",
      body: JSON.stringify({ Id: postId }),
    });
    return response;
  },

  // Add post translation
  async addPostTranslation(translationData) {
    const response = await apiRequest("/admin/posts/AddPostTranslation", {
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

    const response = await apiRequest(
      `/admin/posts/GetByFilter?${queryParams.toString()}`,
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
