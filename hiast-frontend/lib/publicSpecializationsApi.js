import { serverApiRequest } from "./api";

const specializationsApiRequest = async (endpoint, options = {}) => {
  return serverApiRequest(`/User/specializations/${endpoint}`, options);
};

export const specializationsAPI = {
  getAllSpecializations: async () => {
    return specializationsApiRequest("GetAllSpecializations");
  },

  getSpecializationsByFilter: async (filter) => {
    return specializationsApiRequest("GetSpecializationsByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
  },
};

// Helper functions
export const getAllSpecializations = async () => {
  try {
    const response = await specializationsAPI.getAllSpecializations();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw error;
  }
};

export const getSpecializationById = async (id) => {
  try {
    const option = {
      ProgramId: id,
    };
    const specialization = await specializationsAPI.getSpecializationsByFilter(
      option
    );
    return specialization;
    // const specializations = await getAllSpecializations();
    // return specializations.find((specialization) => specialization.Id === id);
  } catch (error) {
    console.error("Error fetching specialization by ID:", error);
    throw error;
  }
};
