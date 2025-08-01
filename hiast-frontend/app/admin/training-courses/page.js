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
  const { lang } = useLanguage();
  const [trainingCourses, setTrainingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTrainingCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await trainingCoursesAPI.getAllTrainingCourses();
      if (Array.isArray(data)) {
        setTrainingCourses(data);
      } else {
        setTrainingCourses([]);
      }
    } catch (err) {
      console.error("Error loading training courses:", err);
      setError(err.message || "Failed to load training courses");
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
    if (
      window.confirm("Are you sure you want to delete this training course?")
    ) {
      try {
        await trainingCoursesAPI.deleteTrainingCourse(trainingCourseId);
        await loadTrainingCourses();
      } catch (err) {
        console.error("Error deleting training course:", err);
        alert("Failed to delete training course");
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
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
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
