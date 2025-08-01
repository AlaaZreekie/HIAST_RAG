import { apiRequest } from "./api";

const curriculumsApiRequest = async (endpoint, options = {}) => {
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

  return apiRequest(`/admin/curriculums/${endpoint}`, {
    ...defaultOptions,
    ...options,
  });
};

export const curriculumsAPI = {
  getAllCurriculums: async () => {
    return await curriculumsApiRequest("GetAllCurriculums", {
      method: "GET",
    });
  },

  createCurriculum: async (curriculumData) => {
    return await curriculumsApiRequest("CreateCurriculum", {
      method: "POST",
      body: JSON.stringify(curriculumData),
    });
  },

  updateCurriculum: async (curriculumId, curriculumData) => {
    return await curriculumsApiRequest("UpdateCurriculum", {
      method: "PUT",
      body: JSON.stringify({
        Id: curriculumId,
        ...curriculumData,
      }),
    });
  },

  deleteCurriculum: async (curriculumId) => {
    return await curriculumsApiRequest("DeleteCurriculum", {
      method: "DELETE",
      body: JSON.stringify({ Id: curriculumId }),
    });
  },
};

// Helper functions for curriculum-specific data
export const getAllCurriculums = async () => {
  try {
    const data = await curriculumsAPI.getAllCurriculums();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching curriculums:", error);
    return [];
  }
};

export const getCurriculumById = async (id) => {
  try {
    const curriculums = await getAllCurriculums();
    return curriculums.find((curriculum) => curriculum.Id === id);
  } catch (error) {
    console.error("Error fetching curriculum by ID:", error);
    return null;
  }
};

export const getCurriculumAcademicYearDisplay = (academicYear) => {
  return `Year ${academicYear}`;
};

export const getCurriculumSemesterDisplay = (semester) => {
  return `Semester ${semester}`;
};

export const getCurriculumCourseTypeDisplay = (courseType) => {
  const courseTypeMap = {
    0: "Core",
    1: "Specialized",
    2: "Elective",
  };
  return courseTypeMap[courseType] || courseType;
};

export const getCurriculumSpecializationName = (curriculum) => {
  if (!curriculum || !curriculum.Specialization) return "N/A";
  return curriculum.Specialization.Name || "N/A";
};

export const getCurriculumCourseName = (curriculum) => {
  if (!curriculum || !curriculum.Course) return "N/A";
  return curriculum.Course.Name || "N/A";
};
