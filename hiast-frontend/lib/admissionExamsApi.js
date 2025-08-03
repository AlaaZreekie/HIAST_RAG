import { apiRequest } from "./api";

const admissionExamsApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/admissionExams/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const admissionExamsAPI = {
  getAllExams: async () => {
    return admissionExamsApiRequest("GetAllAdmissionExams");
  },

  getExamsByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.AdmissionId)
      queryParams.append("AdmissionId", filter.AdmissionId);
    if (filter.ExamName) queryParams.append("ExamName", filter.ExamName);
    if (filter.ExamDate) queryParams.append("ExamDate", filter.ExamDate);

    return admissionExamsApiRequest(`GetByFilter?${queryParams.toString()}`);
  },

  createExam: async (examData) => {
    return admissionExamsApiRequest("CreateAdmissionExam", {
      method: "POST",
      body: JSON.stringify(examData),
    });
  },

  updateExam: async (examData) => {
    return admissionExamsApiRequest("UpdateAdmissionExam", {
      method: "PUT",
      body: JSON.stringify(examData),
    });
  },

  deleteExam: async (examId) => {
    return admissionExamsApiRequest("DeleteAdmissionExam", {
      method: "DELETE",
      body: JSON.stringify({ Id: examId }),
    });
  },
};

export const getAllAdmissionExams = async () => {
  try {
    const response = await admissionExamsAPI.getAllExams();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching admission exams:", error);
    throw error;
  }
};

export const getAdmissionExamById = async (id) => {
  try {
    const exams = await getAllAdmissionExams();
    return exams.find((exam) => exam.Id === id);
  } catch (error) {
    console.error("Error fetching admission exam by ID:", error);
    throw error;
  }
};

export const getAdmissionExamNameInLanguage = (exam, languageId) => {
  if (!exam?.Translations) return "No Name";

  const translation = exam.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.ExamName || "No Name";
};

export const getAdmissionExamNotesInLanguage = (exam, languageId) => {
  if (!exam?.Translations) return "";

  const translation = exam.Translations.find(
    (t) => t.LanguageCode === languageId
  );
  return translation?.Notes || "";
};

export const getAdmissionExamTranslations = (exam) => {
  return exam?.Translations || [];
};

export const getAdmissionAcademicYear = (exam) => {
  return exam?.Admission?.AcademicYear || "Unknown";
};

export const getAdmissionProgramName = (exam) => {
  return exam?.Admission?.Program?.Name || "Unknown Program";
};

export const getAdmissionLocationName = (exam) => {
  return exam?.Admission?.Location?.Name || "Unknown Location";
};

export const formatExamDateTime = (dateTime) => {
  if (!dateTime) return "No Date";
  return new Date(dateTime).toLocaleString();
};
