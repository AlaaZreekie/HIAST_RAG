const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function testimonialsApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/Admin/Testimonials/${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const responseText = await response.text();
  let data;

  try {
    data = JSON.parse(responseText);
  } catch (error) {
    console.error("Failed to parse JSON response:", responseText);
    throw new Error("Invalid JSON response from server");
  }

  if (!data.Result) {
    throw new Error(data.Message || "API request failed");
  }

  return data.Data;
}

export const testimonialsAPI = {
  getAllTestimonials: () => testimonialsApiRequest("GetAllTestimonials"),
  getTestimonialsByFilter: (filter) =>
    testimonialsApiRequest("GetByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    }),
  createTestimonial: (testimonialData) =>
    testimonialsApiRequest("CreateTestimonial", {
      method: "POST",
      body: testimonialData, // FormData
    }),
  updateTestimonial: (testimonialData) =>
    testimonialsApiRequest("UpdateTestimonial", {
      method: "PUT",
      body: JSON.stringify(testimonialData),
    }),
  deleteTestimonial: (testimonialId) =>
    testimonialsApiRequest("DeleteTestimonial", {
      method: "DELETE",
      body: JSON.stringify({ Id: testimonialId }),
    }),
};

export const getAllTestimonials = async () => {
  try {
    return await testimonialsAPI.getAllTestimonials();
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

export const getTestimonialNameInLanguage = (testimonial, languageCode) => {
  if (!testimonial?.Translations) return testimonial?.Name || "Unknown";
  const translation = testimonial.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || testimonial?.Name || "Unknown";
};

export const getTestimonialContentInLanguage = (testimonial, languageCode) => {
  if (!testimonial?.Translations) return testimonial?.Content || "Unknown";
  const translation = testimonial.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Content || testimonial?.Content || "Unknown";
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
