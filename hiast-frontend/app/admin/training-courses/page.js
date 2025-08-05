"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import TrainingCoursesPageHeader from "@/components/admin/training-courses/TrainingCoursesPageHeader";
import TrainingCoursesTable from "@/components/admin/training-courses/TrainingCoursesTable";
import BackToDashboardButton from "@/components/admin/training-courses/BackToDashboardButton";
import { trainingCoursesAPI } from "@/lib/trainingCoursesApi";

const TrainingCoursesPage = () => {
  const { lang, t } = useLanguage();
  const [trainingCourses, setTrainingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTrainingCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Loading training courses...");

      const response = await trainingCoursesAPI.getAllTrainingCourses();
      console.log("Training courses response:", response);

      // Handle different response structures
      let coursesData = [];
      if (response && response.Data) {
        coursesData = Array.isArray(response.Data) ? response.Data : [];
      } else if (Array.isArray(response)) {
        coursesData = response;
      } else {
        console.warn("Unexpected response structure:", response);
        coursesData = [];
      }

      console.log("Processed training courses data:", coursesData);
      setTrainingCourses(coursesData);
    } catch (err) {
      console.error("Error loading training courses:", err);
      setError(err.message || "Failed to load training courses");
      setTrainingCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainingCourses();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      loadTrainingCourses();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleEditTrainingCourse = (trainingCourseId) => {
    window.location.href = `/admin/training-courses/edit/${trainingCourseId}`;
  };

  const handleDeleteTrainingCourse = async (trainingCourseId) => {
    if (window.confirm(t("trainingCourses.deleteConfirm"))) {
      try {
        await trainingCoursesAPI.deleteTrainingCourse(trainingCourseId);
        await loadTrainingCourses();
      } catch (err) {
        console.error("Error deleting training course:", err);
        alert(t("trainingCourses.deleteError"));
      }
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}
      >
        <DashboardHeader />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
            <div className="p-6">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">
                  {t("trainingCourses.loading")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="p-6">
            <TrainingCoursesPageHeader />

            {/* Debug info */}
            <div className="mb-4 p-2 bg-yellow-100 text-xs">
              Training courses loaded: {trainingCourses.length} | Language:{" "}
              {lang} | Layout: {lang === "ar" ? "RTL" : "LTR"}
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <TrainingCoursesTable
              trainingCourses={trainingCourses}
              onEdit={handleEditTrainingCourse}
              onDelete={handleDeleteTrainingCourse}
            />

            <BackToDashboardButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCoursesPage;
