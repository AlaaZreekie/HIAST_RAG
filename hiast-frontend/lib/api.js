const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

// API Response wrapper
class ApiResponse {
  constructor(success, message, statusCode, data) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

// Generic API request function
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

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
    console.log("Making API request to:", url);
    console.log("Request config:", config);
    const response = await fetch(url, config);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

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
    console.log("Parsed response data:", data);

    if (!response.ok) {
      const errorMessage =
        (data && (data.Message || data.message)) ||
        `HTTP ${response.status}: ${response.statusText}`;
      console.error("API request failed:", {
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
    console.error("API Error:", error);
    throw error;
  }
}

// Authentication API functions
export const authAPI = {
  // Login user
  async login(email, password, rememberMe = false) {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        Email: email,
        Password: password,
        RememberMe: rememberMe,
      }),
    });

    console.log("Login response:", response);
    // Handle the actual backend response structure
    if (response.Result && response.Data?.Token?.Token) {
      localStorage.setItem("admin_token", response.Data.Token.Token);
      console.log("Token set:", response.Data.Token.Token);
      localStorage.setItem("admin_user", JSON.stringify(response.Data));
    } else {
      console.log("Login failed - response structure:", {
        result: response.Result,
        hasData: !!response.Data,
        hasToken: !!response.Data?.Token,
        hasTokenToken: !!response.Data?.Token?.Token,
      });
    }

    return response;
  },

  // Logout user
  async logout() {
    try {
      await apiRequest("/Auth/Logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }
  },

  // Get current authenticated user
  async getCurrentUser() {
    return await apiRequest("/auth/GetAuthenticatedUser", {
      method: "GET",
    });
  },

  // Register new user (if needed)
  async register(username, email, password) {
    return await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        Username: username,
        Email: email,
        Password: password,
      }),
    });
  },
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("admin_token");
  return !!token;
};

// Get current user from localStorage
export const getCurrentUserFromStorage = () => {
  const userStr = localStorage.getItem("admin_user");
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user has admin role
export const isAdmin = () => {
  const user = getCurrentUserFromStorage();
  return user?.Token?.UserRoles?.includes("Admin") || false;
};

// Clear authentication data
export const clearAuth = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
};
