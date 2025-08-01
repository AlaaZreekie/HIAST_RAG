import { apiRequest } from "./api";

const courseGroupsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return apiRequest(`/admin/courseGroups/${endpoint}`, {
    ...defaultOptions,
    ...options,
  });
};

export const courseGroupsAPI = {
  getAllCourseGroups: async () => {
    return await courseGroupsApiRequest("GetAllCourseGroups", {
      method: "GET",
    });
  },

  createCourseGroup: async (courseGroupData) => {
    return await courseGroupsApiRequest("CreateCourseGroup", {
      method: "POST",
      body: JSON.stringify(courseGroupData),
    });
  },

  updateCourseGroup: async (courseGroupId, courseGroupData) => {
    return await courseGroupsApiRequest("UpdateCourseGroup", {
      method: "PUT",
      body: JSON.stringify({
        Id: courseGroupId,
        ...courseGroupData,
      }),
    });
  },

  deleteCourseGroup: async (courseGroupId) => {
    return await courseGroupsApiRequest("DeleteCourseGroup", {
      method: "DELETE",
      body: JSON.stringify({ Id: courseGroupId }),
    });
  },
};

// Helper functions
export const getAllCourseGroups = async () => {
  try {
    const data = await courseGroupsAPI.getAllCourseGroups();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching course groups:", error);
    return [];
  }
};

export const getCourseGroupById = async (id) => {
  try {
    const courseGroups = await getAllCourseGroups();
    return courseGroups.find((courseGroup) => courseGroup.Id === id);
  } catch (error) {
    console.error("Error fetching course group by ID:", error);
    return null;
  }
};

export const getCourseGroupCodeDisplay = (courseGroupCode) => {
  const courseGroupCodeMap = {
    0: "LNG",
    1: "BIF",
    2: "GK",
    3: "CHM",
    4: "PHY",
    5: "MTH",
    6: "ELC",
    7: "TCH",
    8: "PRT",
    9: "ODS",
    10: "CAR",
    11: "SWE",
    12: "CMP",
    13: "AIN",
    14: "DBS",
    15: "NET",
    16: "TEL",
    17: "MGT",
    18: "GKT",
    19: "CGS",
    20: "NWT",
    21: "IMG",
    22: "SEC",
    23: "PRJ",
    24: "SIG",
    25: "TRD",
    26: "CRL",
    27: "ELT",
    28: "MEC",
    29: "MES",
    30: "ROB",
    31: "DES",
    32: "MAN",
  };
  return courseGroupCodeMap[courseGroupCode] || courseGroupCode;
};

export const getCourseGroupNameInLanguage = (courseGroup, languageCode) => {
  if (languageCode === "ar") {
    return courseGroup.ArabicName || "N/A";
  } else {
    return courseGroup.EnglishName || "N/A";
  }
};
