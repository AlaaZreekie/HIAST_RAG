const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5007/api";

// Server-safe API request function (no localStorage)
export async function serverApiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    console.log("Making server API request to:", url);
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
