const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function admissionsApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/Admin/Admissions/${endpoint}`;

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

export const admissionsAPI = {
  getAllAdmissions: () => admissionsApiRequest("GetAllAdmissions"),
  getAdmissionsByFilter: (filter) =>
    admissionsApiRequest("GetByFilter", {
      method: "POST",
      body: JSON.stringify(filter),
    }),
  createAdmission: (admissionData) =>
    admissionsApiRequest("CreateAdmission", {
      method: "POST",
      body: JSON.stringify(admissionData),
    }),
  updateAdmission: (admissionData) =>
    admissionsApiRequest("UpdateAdmission", {
      method: "PUT",
      body: JSON.stringify(admissionData),
    }),
  deleteAdmission: (admissionId) =>
    admissionsApiRequest("DeleteAdmission", {
      method: "DELETE",
      body: JSON.stringify({ Id: admissionId }),
    }),
};

export const getAllAdmissions = async () => {
  try {
    return await admissionsAPI.getAllAdmissions();
  } catch (error) {
    console.error("Error fetching admissions:", error);
    throw error;
  }
};

export const getAdmissionById = async (id) => {
  try {
    const admissions = await getAllAdmissions();
    return admissions.find((admission) => admission.Id === id);
  } catch (error) {
    console.error("Error fetching admission by ID:", error);
    throw error;
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