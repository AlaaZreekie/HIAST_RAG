const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function admissionResultsApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/Admin/AdmissionResults/${endpoint}`;

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

export const admissionResultsAPI = {
  getAllResults: () => admissionResultsApiRequest("GetAllResults"),
  getResultsByFilter: (filter) =>
    admissionResultsApiRequest("GetByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    }),
  createResult: (resultData) =>
    admissionResultsApiRequest("CreateResult", {
      method: "POST",
      body: resultData, // FormData
    }),
  updateResult: (resultData) =>
    admissionResultsApiRequest("UpdateResult", {
      method: "PUT",
      body: JSON.stringify(resultData),
    }),
  deleteResult: (resultId) =>
    admissionResultsApiRequest("DeleteResult", {
      method: "DELETE",
      body: JSON.stringify({ Id: resultId }),
    }),
};

export const getAllAdmissionResults = async () => {
  try {
    return await admissionResultsAPI.getAllResults();
  } catch (error) {
    console.error("Error fetching admission results:", error);
    throw error;
  }
};

export const getAdmissionResultById = async (id) => {
  try {
    const results = await getAllAdmissionResults();
    return results.find((result) => result.Id === id);
  } catch (error) {
    console.error("Error fetching admission result by ID:", error);
    throw error;
  }
};

export const getResultTypeName = (resultType) => {
  switch (resultType) {
    case 0:
      return "Initial List";
    case 1:
      return "Final Admitted";
    case 2:
      return "Waiting List";
    default:
      return "Unknown";
  }
};

export const getAdmissionAcademicYear = (admission) => {
  return admission?.AcademicYear || "Unknown";
};

export const getAdmissionProgramName = (admission) => {
  return admission?.Program?.Name || "Unknown Program";
};

export const getAdmissionLocationName = (admission) => {
  return admission?.Location?.Name || "Unknown Location";
};

export const createAdmissionResultFormData = (resultData, file) => {
  const formData = new FormData();

  // Add file if provided
  if (file) {
    formData.append("CreateMedia.File", file);
    formData.append("CreateMedia.MediaCategoryId", resultData.MediaCategoryId);
  }

  // Add admission result data
  formData.append("AdmissionId", resultData.AdmissionId);
  formData.append("ResultType", resultData.ResultType);

  return formData;
};
