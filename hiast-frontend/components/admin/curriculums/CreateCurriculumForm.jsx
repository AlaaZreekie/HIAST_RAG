"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateCurriculumForm = ({
  onSubmit,
  isLoading,
  error,
  initialData = null,
  isEditMode = false,
}) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    AcademicYear: "",
    Semester: "",
    CourseType: "",
    SpecializationId: "",
    CourseId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        AcademicYear: initialData.AcademicYear?.toString() || "",
        Semester: initialData.Semester?.toString() || "",
        CourseType: initialData.CourseType?.toString() || "",
        SpecializationId: initialData.SpecializationId?.toString() || "",
        CourseId: initialData.CourseId?.toString() || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      AcademicYear: parseInt(formData.AcademicYear) || 0,
      Semester: parseInt(formData.Semester) || 0,
      CourseType: parseInt(formData.CourseType) || 0,
      SpecializationId: parseInt(formData.SpecializationId) || 0,
      CourseId: parseInt(formData.CourseId) || 0,
    };
    onSubmit(submitData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Academic Year */}
            <div>
              <label
                htmlFor="AcademicYear"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("curriculums.form.academicYear")}
              </label>
              <input
                type="number"
                id="AcademicYear"
                name="AcademicYear"
                value={formData.AcademicYear}
                onChange={handleChange}
                required
                min="1"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Semester */}
            <div>
              <label
                htmlFor="Semester"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("curriculums.form.semester")}
              </label>
              <select
                id="Semester"
                name="Semester"
                value={formData.Semester}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <option value="">{t("curriculums.form.selectSemester")}</option>
                <option value="1">{t("curriculums.form.semester1")}</option>
                <option value="2">{t("curriculums.form.semester2")}</option>
              </select>
            </div>

            {/* Course Type */}
            <div>
              <label
                htmlFor="CourseType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("curriculums.form.courseType")}
              </label>
              <select
                id="CourseType"
                name="CourseType"
                value={formData.CourseType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <option value="">
                  {t("curriculums.form.selectCourseType")}
                </option>
                <option value="0">{t("curriculums.form.core")}</option>
                <option value="1">{t("curriculums.form.specialized")}</option>
                <option value="2">{t("curriculums.form.elective")}</option>
              </select>
            </div>

            {/* Specialization ID */}
            <div>
              <label
                htmlFor="SpecializationId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("curriculums.form.specializationId")}
              </label>
              <input
                type=""
                id="SpecializationId"
                name="SpecializationId"
                value={formData.SpecializationId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Course ID */}
            <div>
              <label
                htmlFor="CourseId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("curriculums.form.courseId")}
              </label>
              <input
                type=""
                id="CourseId"
                name="CourseId"
                value={formData.CourseId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div
            className={`mt-6 flex space-x-3 ${
              lang === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading
                ? t("common.loading")
                : isEditMode
                ? t("curriculums.form.update")
                : t("curriculums.form.submit")}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/curriculums")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("curriculums.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCurriculumForm;
