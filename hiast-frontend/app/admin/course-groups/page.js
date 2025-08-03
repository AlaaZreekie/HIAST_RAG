"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import { courseGroupsAPI } from "@/lib/courseGroupsApi";

const CourseGroupsPage = () => {
  const { lang } = useLanguage();
  const [courseGroups, setCourseGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCourseGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseGroupsAPI.getAllCourseGroups();
      if (Array.isArray(data)) {
        setCourseGroups(data);
      } else {
        setCourseGroups([]);
      }
    } catch (err) {
      console.error("Error loading course groups:", err);
      setError(err.message || "Failed to load course groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourseGroups();
  }, []);

  const handleDeleteCourseGroup = async (courseGroupId) => {
    if (window.confirm("Are you sure you want to delete this course group?")) {
      try {
        await courseGroupsAPI.deleteCourseGroup(courseGroupId);
        await loadCourseGroups();
      } catch (err) {
        console.error("Error deleting course group:", err);
        alert("Failed to delete course group");
      }
    }
  };

  const getCourseGroupCodeDisplay = (courseGroupCode) => {
    const codeMap = {
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
    return codeMap[courseGroupCode] || courseGroupCode;
  };

  const getCourseGroupNameInLanguage = (courseGroup, languageCode = "en") => {
    if (!courseGroup || !courseGroup.Translations) return "N/A";

    const translation = courseGroup.Translations.find(
      (t) =>
        t.LanguageCode === languageCode ||
        t.LanguageName?.toLowerCase().includes(languageCode.toLowerCase())
    );

    return translation?.Name || "N/A";
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Course Groups
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Manage course groups and subject areas
            </p>

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
                    {courseGroups.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No course groups found</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {courseGroups.map((courseGroup) => (
                          <div
                            key={courseGroup.Id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-sm font-medium text-gray-500">
                                    ID: {courseGroup.Id}
                                  </span>
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    Code:{" "}
                                    {getCourseGroupCodeDisplay(
                                      courseGroup.CourseGroupCode
                                    )}
                                  </span>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  {getCourseGroupNameInLanguage(
                                    courseGroup,
                                    lang === "ar" ? "ar" : "en"
                                  )}
                                </h3>

                                <div className="text-sm text-gray-600 mb-3">
                                  <p>
                                    Code:{" "}
                                    {getCourseGroupCodeDisplay(
                                      courseGroup.CourseGroupCode
                                    )}
                                  </p>
                                  {courseGroup.Translations &&
                                    courseGroup.Translations.length > 0 && (
                                      <div className="mt-2">
                                        <p className="font-medium">
                                          Translations:
                                        </p>
                                        <div className="space-y-1">
                                          {courseGroup.Translations.map(
                                            (translation, index) => (
                                              <p
                                                key={index}
                                                className="text-xs"
                                              >
                                                {translation.LanguageName}:{" "}
                                                {translation.Name}
                                              </p>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    (window.location.href = `/admin/course-groups/edit/${courseGroup.Id}`)
                                  }
                                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteCourseGroup(courseGroup.Id)
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

export default CourseGroupsPage;
