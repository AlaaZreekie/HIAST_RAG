import { serverApiRequest } from "./api";

const curriculumsApiRequest = async (endpoint, options = {}) => {
  return serverApiRequest(`/user/curriculum/${endpoint}`, options);
};

export const curriculumsAPI = {
  getAllCurriculums: async () => {
    return curriculumsApiRequest("GetAllCurriculums");
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("SpecializationId", filter.Id);
    if (filter.Name) queryParams.append("Name", filter.Name);
    if (filter.ProgramId) queryParams.append("ProgramId", filter.ProgramId);
    if (filter.IsActive !== undefined)
      queryParams.append("IsActive", filter.IsActive);

    return curriculumsApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

// Helper functions
export const getAllCurriculums = async () => {
  try {
    const response = await curriculumsAPI.getAllCurriculums();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching curriculums:", error);
    throw error;
  }
};

export const getCurriculumById = async (id) => {
  try {
    const curriculums = await curriculumsAPI.getByFilter({ Id: id });
    return curriculums;
  } catch (error) {
    console.error("Error fetching curriculum by ID:", error);
    throw error;
  }
};
