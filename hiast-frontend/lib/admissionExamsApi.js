const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7187/api";

async function admissionExamsApiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const url = `${API_BASE_URL}/admin/admissionExams/${endpoint}`;
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText}`);
    }

    if (!responseText) {
      return null;
    }

    const data = JSON.parse(responseText);
    return data.Data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const admissionExamsAPI = {
  getAllExams: () => admissionExamsApiRequest("GetAllAdmissionExams"),
  getExamsByFilter: (filter) =>
    admissionExamsApiRequest("GetByFilter", {
      method: "GET",
      body: filter,
    }),
  createExam: (examData) =>
    admissionExamsApiRequest("CreateAdmissionExam", {
      method: "POST",
      body: examData,
    }),
  updateExam: (examData) =>
    admissionExamsApiRequest("UpdateAdmissionExam", {
      method: "PUT",
      body: examData,
    }),
  deleteExam: (examId) =>
    admissionExamsApiRequest("DeleteAdmissionExam", {
      method: "DELETE",
      body: { Id: examId },
    }),
};

export const getAllAdmissionExams = async () => {
  try {
    return await admissionExamsAPI.getAllExams();
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
