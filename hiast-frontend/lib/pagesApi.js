import { apiRequest } from "./api";

const pagesApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/pages/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const pagesAPI = {
  getAllPages: async () => {
    return pagesApiRequest("GetAllPages");
  },

  createPage: async (pageData) => {
    return pagesApiRequest("CreatePage", {
      method: "POST",
      body: JSON.stringify(pageData),
    });
  },

  updatePage: async (pageData) => {
    return pagesApiRequest("UpdatePage", {
      method: "PUT",
      body: JSON.stringify(pageData),
    });
  },

  deletePage: async (pageId) => {
    return pagesApiRequest("DeletePage", {
      method: "DELETE",
      body: JSON.stringify({ Id: pageId }),
    });
  },

  addPageTranslation: async (translationData) => {
    return pagesApiRequest("AddPageTranslation", {
      method: "POST",
      body: JSON.stringify(translationData),
    });
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Title) queryParams.append("Title", filter.Title);
    if (filter.Slug) queryParams.append("Slug", filter.Slug);
    if (filter.IsActive !== undefined)
      queryParams.append("IsActive", filter.IsActive);

    return pagesApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

export const getAllPages = async () => {
  try {
    const response = await pagesAPI.getAllPages();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
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
