"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateCourseGroupForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    CourseGroupCode: "",
    ArabicName: "",
    EnglishName: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        CourseGroupCode: initialData.CourseGroupCode?.toString() || "",
        ArabicName: initialData.ArabicName || "",
        EnglishName: initialData.EnglishName || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      CourseGroupCode: parseInt(formData.CourseGroupCode) || 0
    };
    onSubmit(submitData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Course Group Code */}
            <div>
              <label htmlFor="CourseGroupCode" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courseGroups.form.courseGroupCode")}
              </label>
              <select
                id="CourseGroupCode"
                name="CourseGroupCode"
                value={formData.CourseGroupCode}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <option value="">{t("courseGroups.form.selectCourseGroupCode")}</option>
                <option value="0">LNG</option>
                <option value="1">BIF</option>
                <option value="2">GK</option>
                <option value="3">CHM</option>
                <option value="4">PHY</option>
                <option value="5">MTH</option>
                <option value="6">ELC</option>
                <option value="7">TCH</option>
                <option value="8">PRT</option>
                <option value="9">ODS</option>
                <option value="10">CAR</option>
                <option value="11">SWE</option>
                <option value="12">CMP</option>
                <option value="13">AIN</option>
                <option value="14">DBS</option>
                <option value="15">NET</option>
                <option value="16">TEL</option>
                <option value="17">MGT</option>
                <option value="18">GKT</option>
                <option value="19">CGS</option>
                <option value="20">NWT</option>
                <option value="21">IMG</option>
                <option value="22">SEC</option>
                <option value="23">PRJ</option>
                <option value="24">SIG</option>
                <option value="25">TRD</option>
                <option value="26">CRL</option>
                <option value="27">ELT</option>
                <option value="28">MEC</option>
                <option value="29">MES</option>
                <option value="30">ROB</option>
                <option value="31">DES</option>
                <option value="32">MAN</option>
              </select>
            </div>

            {/* Arabic Name */}
            <div>
              <label htmlFor="ArabicName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courseGroups.form.arabicName")}
              </label>
              <input
                type="text"
                id="ArabicName"
                name="ArabicName"
                value={formData.ArabicName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="EnglishName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("courseGroups.form.englishName")}
              </label>
              <input
                type="text"
                id="EnglishName"
                name="EnglishName"
                value={formData.EnglishName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className={`mt-6 flex space-x-3 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? t("common.loading") : (isEditMode ? t("courseGroups.form.update") : t("courseGroups.form.submit"))}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/course-groups")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("courseGroups.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseGroupForm; 