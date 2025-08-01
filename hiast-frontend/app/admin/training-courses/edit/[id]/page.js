"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { trainingCoursesAPI } from "@/lib/trainingCoursesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateTrainingCourseHeader from "@/components/admin/training-courses/CreateTrainingCourseHeader";
import CreateTrainingCourseForm from "@/components/admin/training-courses/CreateTrainingCourseForm";

const EditTrainingCoursePage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [trainingCourse, setTrainingCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingTrainingCourse, setLoadingTrainingCourse] = useState(true);

  // Unwrap params using React.use() for Next.js 15
  const unwrappedParams = use(params);
  const trainingCourseId = unwrappedParams.id;

  useEffect(() => {
    requireAdminAuth();
    loadTrainingCourse();
  }, [trainingCourseId]);

  const loadTrainingCourse = async () => {
    try {
      setLoadingTrainingCourse(true);
      const trainingCourses = await trainingCoursesAPI.getAllTrainingCourses();
      const foundTrainingCourse = trainingCourses.find(
        (tc) => tc.Id === trainingCourseId
      );

      if (!foundTrainingCourse) {
        setError(t("trainingCourses.notFound"));
        return;
      }

      setTrainingCourse(foundTrainingCourse);
    } catch (err) {
      console.error("Error loading training course:", err);
      setError(err.message);
    } finally {
      setLoadingTrainingCourse(false);
    }
  };

  const handleSubmit = async (trainingCourseData) => {
    try {
      setIsLoading(true);
      setError(null);
      await trainingCoursesAPI.updateTrainingCourse(trainingCourseData);
      router.push("/admin/training-courses");
    } catch (err) {
      console.error("Error updating training course:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingTrainingCourse) {
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

  if (error && !trainingCourse) {
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
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => router.push("/admin/training-courses")}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {t("trainingCourses.backToList")}
                </button>
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
            <CreateTrainingCourseHeader isEditMode={true} />
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <CreateTrainingCourseForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              initialData={trainingCourse}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrainingCoursePage;
