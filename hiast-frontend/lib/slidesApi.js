import { apiRequest } from "./api";

const slidesApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/sliders/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

// Helper functions for parsing slide data
export const getSlideTitleInLanguage = (slide, languageCode) => {
  if (!slide?.Translations) return "N/A";
  const translation = slide.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Title || "N/A";
};

export const getSlideTranslations = (slide) => {
  return slide?.Translations || [];
};

export const getSlideImageUrl = (slide) => {
  return slide?.Media?.FilePath || null;
};

export const createSlideFormData = (slideData) => {
  const formData = new FormData();

  // Add form fields
  formData.append("LinkURL", slideData.LinkURL);
  formData.append("Translations", JSON.stringify(slideData.Translations));

  // Add image file
  if (slideData.CreateMedia?.File) {
    formData.append("CreateMedia.File", slideData.CreateMedia.File);
    formData.append(
      "CreateMedia.MediaCategoryId",
      slideData.CreateMedia.MediaCategoryId || "1"
    );
  }

  return formData;
};

export const slidesAPI = {
  getAllSlides: async () => {
    const response = await slidesApiRequest("GetAllSliders");
    // Handle ApiResponse structure
    return response.Data || response;
  },

  createSlide: async (slideData) => {
    return slidesApiRequest("CreateSlider", {
      method: "POST",
      body: slideData, // FormData for file upload
    });
  },

  updateSlide: async (slideData) => {
    return slidesApiRequest("UpdateSlider", {
      method: "PUT",
      body: JSON.stringify(slideData),
    });
  },

  deleteSlide: async (slideId) => {
    return slidesApiRequest("DeleteSlider", {
      method: "DELETE",
      body: JSON.stringify({ Id: slideId }),
    });
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Title) queryParams.append("Title", filter.Title);
    if (filter.Description)
      queryParams.append("Description", filter.Description);
    if (filter.IsActive !== undefined)
      queryParams.append("IsActive", filter.IsActive);

    const response = await slidesApiRequest(
      `GetByFilter?${queryParams.toString()}`
    );
    // Handle ApiResponse structure
    return response.Data || response;
  },
};
