import { apiRequest } from "./api";

const testimonialsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/testimonials/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const testimonialsAPI = {
  getAllTestimonials: async () => {
    return testimonialsApiRequest("GetAllTestimonials");
  },

  createTestimonial: async (testimonialData) => {
    return testimonialsApiRequest("CreateTestimonial", {
      method: "POST",
      body: testimonialData, // FormData for file upload
    });
  },

  updateTestimonial: async (testimonialData) => {
    return testimonialsApiRequest("UpdateTestimonial", {
      method: "PUT",
      body: JSON.stringify(testimonialData),
    });
  },

  deleteTestimonial: async (testimonialId) => {
    return testimonialsApiRequest("DeleteTestimonial", {
      method: "DELETE",
      body: JSON.stringify({ Id: testimonialId }),
    });
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Name) queryParams.append("Name", filter.Name);
    if (filter.Position) queryParams.append("Position", filter.Position);
    if (filter.IsActive !== undefined)
      queryParams.append("IsActive", filter.IsActive);

    return testimonialsApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

// Helper functions
export const getAllTestimonials = async () => {
  try {
    const response = await testimonialsAPI.getAllTestimonials();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

export const getTestimonialById = async (id) => {
  try {
    const testimonials = await getAllTestimonials();
    return testimonials.find((testimonial) => testimonial.Id === id);
  } catch (error) {
    console.error("Error fetching testimonial by ID:", error);
    throw error;
  }
};

export const getTestimonialNameInLanguage = (testimonial, languageId) => {
  if (!testimonial?.Translations) return "No Name";
  const translation = testimonial.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Name || "No Name";
};

export const getTestimonialContentInLanguage = (testimonial, languageId) => {
  if (!testimonial?.Translations) return "";
  const translation = testimonial.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Content || "";
};

export const getTestimonialPositionInLanguage = (testimonial, languageId) => {
  if (!testimonial?.Translations) return "";
  const translation = testimonial.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Position || "";
};

export const getTestimonialTranslations = (testimonial) => {
  return testimonial?.Translations || [];
};

export const createTestimonialFormData = (testimonialData, file) => {
  const formData = new FormData();

  // Add file if provided
  if (file) {
    formData.append("CreateMedia.File", file);
    formData.append(
      "CreateMedia.MediaCategoryId",
      testimonialData.MediaCategoryId
    );
  }

  // Add testimonial data
  formData.append("Name", testimonialData.Name || "");
  formData.append("Content", testimonialData.Content || "");
  formData.append("AuthorName", testimonialData.AuthorName || "");
  formData.append("AuthorTitle", testimonialData.AuthorTitle || "");
  formData.append("Rating", testimonialData.Rating || 0);

  return formData;
};
