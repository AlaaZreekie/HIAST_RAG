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

export const slidesAPI = {
  getAllSlides: async () => {
    return slidesApiRequest("GetAllSliders");
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

    return slidesApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};
