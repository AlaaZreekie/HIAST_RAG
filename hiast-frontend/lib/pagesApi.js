const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function pagesApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/admin/page/${endpoint}`;
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText}`);
    }

    if (!responseText) {
      return null;
    }

    const data = JSON.parse(responseText);
    return data.Data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const pagesAPI = {
  getAllPages: () => pagesApiRequest("GetAllPages"),
  createPage: (pageData) =>
    pagesApiRequest("CreatePage", { method: "POST", body: pageData }),
  updatePage: (pageData) =>
    pagesApiRequest("UpdatePage", { method: "PUT", body: pageData }),
  deletePage: (pageId) =>
    pagesApiRequest("DeletePage", { method: "DELETE", body: { Id: pageId } }),
};

export const getAllPages = async () => {
  try {
    return await pagesAPI.getAllPages();
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error;
  }
};

export const getPageById = async (id) => {
  try {
    const pages = await getAllPages();
    return pages.find((page) => page.Id === id);
  } catch (error) {
    console.error("Error fetching page by ID:", error);
    throw error;
  }
};

export const getPageTitleInLanguage = (page, languageId) => {
  if (!page?.Translations) return "No Title";
  const translation = page.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Title || "No Title";
};

export const getPageContentInLanguage = (page, languageId) => {
  if (!page?.Translations) return "";
  const translation = page.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Content || "";
};

export const getPageSlugInLanguage = (page, languageId) => {
  if (!page?.Translations) return "";
  const translation = page.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Slug || "";
};
