import { apiRequest } from "./api";

// Public API endpoints for homepage
export const publicAPI = {
  // Posts API
  getAllPosts: () => apiRequest("GET", "/api/user/posts/getallposts"),
  getPostsByFilter: (filter) =>
    apiRequest("GET", "/api/user/posts/getbyfilter", null, filter),

  // Programs API
  getAllPrograms: () => apiRequest("GET", "/api/user/programs/getallprograms"),
  getProgramsByFilter: (filter) =>
    apiRequest("GET", "/api/user/programs/getbyfilter", null, filter),

  // Pages API
  getAllPages: () => apiRequest("GET", "/api/user/pages/getallpages"),
  getPagesByFilter: (filter) =>
    apiRequest("GET", "/api/user/pages/getbyfilter", null, filter),

  // Courses API
  getAllCourses: () => apiRequest("GET", "/api/user/courses/getallcourses"),
  getCoursesByFilter: (filter) =>
    apiRequest("GET", "/api/user/courses/getbyfilter", null, filter),

  // Specializations API
  getAllSpecializations: () =>
    apiRequest("GET", "/api/user/specializations/getallspecializations"),
  getSpecializationsByFilter: (filter) =>
    apiRequest("GET", "/api/user/specializations/getbyfilter", null, filter),

  // Locations API
  getAllLocations: () =>
    apiRequest("GET", "/api/user/locations/getalllocations"),
  getLocationsByFilter: (filter) =>
    apiRequest("GET", "/api/user/locations/getbyfilter", null, filter),

  // Books API
  getAllBooks: () => apiRequest("GET", "/api/user/books/getallbooks"),
  getBooksByFilter: (filter) =>
    apiRequest("GET", "/api/user/books/getbyfilter", null, filter),

  // Slides API
  getAllSlides: () => apiRequest("GET", "/api/user/slides/getallslides"),
  getSlidesByFilter: (filter) =>
    apiRequest("GET", "/api/user/slides/getbyfilter", null, filter),

  // Training Courses API
  getAllTrainingCourses: () =>
    apiRequest("GET", "/api/user/trainingcourses/getalltrainingcourses"),
  getTrainingCoursesByFilter: (filter) =>
    apiRequest("GET", "/api/user/trainingcourses/getbyfilter", null, filter),

  // FAQs API
  getAllFaqs: () => apiRequest("GET", "/api/user/faqs/getallfaqs"),
  getFaqsByFilter: (filter) =>
    apiRequest("GET", "/api/user/faqs/getbyfilter", null, filter),

  // FAQ Categories API
  getAllFaqCategories: () =>
    apiRequest("GET", "/api/user/faqcategories/getallfaqcategories"),
  getFaqCategoriesByFilter: (filter) =>
    apiRequest("GET", "/api/user/faqcategories/getbyfilter", null, filter),

  // Media API
  getAllMedia: () => apiRequest("GET", "/api/user/media/getallmedia"),
  getMediaByFilter: (filter) =>
    apiRequest("GET", "/api/user/media/getbyfilter", null, filter),

  // Media Categories API
  getAllMediaCategories: () =>
    apiRequest("GET", "/api/user/mediacategories/getallmediacategories"),
  getMediaCategoriesByFilter: (filter) =>
    apiRequest("GET", "/api/user/mediacategories/getbyfilter", null, filter),

  // Languages API
  getAllLanguages: () =>
    apiRequest("GET", "/api/user/languages/getalllanguages"),
  getLanguagesByFilter: (filter) =>
    apiRequest("GET", "/api/user/languages/getbyfilter", null, filter),

  // Curriculums API
  getAllCurriculums: () =>
    apiRequest("GET", "/api/user/curriculums/getallcurriculums"),
  getCurriculumsByFilter: (filter) =>
    apiRequest("GET", "/api/user/curriculums/getbyfilter", null, filter),

  // Course Groups API
  getAllCourseGroups: () =>
    apiRequest("GET", "/api/user/coursegroups/getallcoursegroups"),
  getCourseGroupsByFilter: (filter) =>
    apiRequest("GET", "/api/user/coursegroups/getbyfilter", null, filter),

  // Admission Results API
  getAllAdmissionResults: () =>
    apiRequest("GET", "/api/user/admissionresults/getalladmissionresults"),
  getAdmissionResultsByFilter: (filter) =>
    apiRequest("GET", "/api/user/admissionresults/getbyfilter", null, filter),

  // Admission Exams API
  getAllAdmissionExams: () =>
    apiRequest("GET", "/api/user/admissionexams/getalladmissionexams"),
  getAdmissionExamsByFilter: (filter) =>
    apiRequest("GET", "/api/user/admissionexams/getbyfilter", null, filter),
};

// Helper functions for language-specific content
export const getContentInLanguage = (item, languageCode) => {
  if (!item || !item.Translations)
    return item?.Name || item?.Title || "Unknown";

  const translation = item.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return (
    translation?.Name ||
    translation?.Title ||
    item?.Name ||
    item?.Title ||
    "Unknown"
  );
};

export const getPostContentInLanguage = (post, languageCode) => {
  if (!post || !post.Translations) return post?.Title || "Unknown";

  const translation = post.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Title || post?.Title || "Unknown";
};

export const getPostDescriptionInLanguage = (post, languageCode) => {
  if (!post || !post.Translations) return post?.Description || "";

  const translation = post.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Description || post?.Description || "";
};

export const getProgramNameInLanguage = (program, languageCode) => {
  if (!program || !program.Translations) return program?.Name || "Unknown";

  const translation = program.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || program?.Name || "Unknown";
};

export const getLocationNameInLanguage = (location, languageCode) => {
  if (!location || !location.Translations) return location?.Name || "Unknown";

  const translation = location.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || location?.Name || "Unknown";
};

export const getLocationAddressInLanguage = (location, languageCode) => {
  if (!location || !location.Translations) return location?.Address || "";

  const translation = location.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Address || location?.Address || "";
};

export const getCourseNameInLanguage = (course, languageCode) => {
  if (!course || !course.Translations) return course?.Name || "Unknown";

  const translation = course.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || course?.Name || "Unknown";
};

export const getSpecializationNameInLanguage = (
  specialization,
  languageCode
) => {
  if (!specialization || !specialization.Translations)
    return specialization?.Name || "Unknown";

  const translation = specialization.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || specialization?.Name || "Unknown";
};

export const getBookNameInLanguage = (book, languageCode) => {
  if (!book || !book.Translations) return book?.Name || "Unknown";

  const translation = book.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || book?.Name || "Unknown";
};

export const getSlideNameInLanguage = (slide, languageCode) => {
  if (!slide || !slide.Translations) return slide?.Name || "Unknown";

  const translation = slide.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || slide?.Name || "Unknown";
};

export const getTrainingCourseNameInLanguage = (
  trainingCourse,
  languageCode
) => {
  if (!trainingCourse || !trainingCourse.Translations)
    return trainingCourse?.Name || "Unknown";

  const translation = trainingCourse.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || trainingCourse?.Name || "Unknown";
};

export const getFaqQuestionInLanguage = (faq, languageCode) => {
  if (!faq || !faq.Translations) return faq?.Question || "Unknown";

  const translation = faq.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Question || faq?.Question || "Unknown";
};

export const getFaqAnswerInLanguage = (faq, languageCode) => {
  if (!faq || !faq.Translations) return faq?.Answer || "";

  const translation = faq.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Answer || faq?.Answer || "";
};

export const getFaqCategoryNameInLanguage = (faqCategory, languageCode) => {
  if (!faqCategory || !faqCategory.Translations)
    return faqCategory?.Name || "Unknown";

  const translation = faqCategory.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || faqCategory?.Name || "Unknown";
};

export const getMediaCategoryNameInLanguage = (mediaCategory, languageCode) => {
  if (!mediaCategory || !mediaCategory.Translations)
    return mediaCategory?.Name || "Unknown";

  const translation = mediaCategory.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || mediaCategory?.Name || "Unknown";
};

export const getLanguageCodeDisplay = (languageCode) => {
  switch (languageCode) {
    case 1:
      return "AR";
    case 2:
      return "EN";
    case 3:
      return "FR";
    case 4:
      return "DU";
    default:
      return "Unknown";
  }
};
