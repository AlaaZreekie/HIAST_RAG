"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import { curriculumsAPI } from "@/lib/curriculumsApi";

const CurriculumsPage = () => {
  const { lang } = useLanguage();
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCurriculums = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await curriculumsAPI.getAllCurriculums();
      if (Array.isArray(data.Data)) {
        setCurriculums(data.Data);
      } else {
        setCurriculums([]);
      }
    } catch (err) {
      console.error("Error loading curriculums:", err);
      setError(err.message || "Failed to load curriculums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurriculums();
  }, []);

  const handleDeleteCurriculum = async (curriculumId) => {
    if (window.confirm("Are you sure you want to delete this curriculum?")) {
      try {
        await curriculumsAPI.deleteCurriculum(curriculumId);
        await loadCurriculums();
      } catch (err) {
        console.error("Error deleting curriculum:", err);
        alert("Failed to delete curriculum");
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="p-6">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Curriculums
                </h1>
                <p className="text-sm text-gray-600 mb-4">
                  Manage curriculum entries and study plans
                </p>
              </div>
              <button
                onClick={() =>
                  (window.location.href = "/admin/curriculums/create")
                }
                className={`h-1/2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  lang === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {"Create Curriculum"}
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="max-h-96 overflow-y-auto">
                    {curriculums.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No curriculums found</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {curriculums.map((curriculum) => (
                          <div
                            key={curriculum.Id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-sm font-medium text-gray-500">
                                    ID: {curriculum.Id}
                                  </span>
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    Year {curriculum.AcademicYear} - Semester{" "}
                                    {curriculum.Semester}
                                  </span>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  {curriculum["Course"]["Translations"][0]
                                    ?.Name || "N/A"}
                                </h3>

                                <div className="text-sm text-gray-600 mb-3">
                                  <p>
                                    Specialization:{" "}
                                    {curriculum.Specialization[
                                      "Translations"
                                    ][0]?.Name || "N/A"}
                                  </p>
                                  <p>Course Type: {curriculum.CourseType}</p>
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    (window.location.href = `/admin/curriculums/edit/${curriculum.Id}`)
                                  }
                                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteCurriculum(curriculum.Id)
                                  }
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumsPage;
