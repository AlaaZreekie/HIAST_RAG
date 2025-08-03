import { apiRequest } from "./api";

export const slidesAPI = {
  getAllSlides: () => apiRequest("/admin/slides/GetAllSlides"),
  createSlide: (slideData) =>
    apiRequest("/admin/slides/CreateSlide", {
      method: "POST",
      body: slideData,
    }),
  updateSlide: (slideId, slideData) =>
    apiRequest(`/admin/slides/UpdateSlide/${slideId}`, {
      method: "PUT",
      body: slideData,
    }),
  deleteSlide: (slideId) =>
    apiRequest(`/admin/slides/DeleteSlide/${slideId}`, { method: "DELETE" }),
};
