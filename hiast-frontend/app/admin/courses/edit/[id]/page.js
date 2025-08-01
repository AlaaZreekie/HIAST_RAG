"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { coursesAPI, getCourseById } from "@/lib/coursesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateCourseHeader from "@/components/admin/courses/CreateCourseHeader";
import CreateCourseForm from "@/components/admin/courses/CreateCourseForm";

const EditCoursePage = ({ params }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const courseId = React.use(params).id;

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCourseById(courseId);
        if (data) {
          setCourse(data);
        } else {
          setError(t("courses.notFound"));
        }
      } catch (err) {
        console.error("Error loading course:", err);
        setError(err.message || t("courses.notFound"));
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadCourse();
    }
  }, [courseId, t]);

  const handleSubmit = async (courseData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await coursesAPI.updateCourse(courseId, courseData);
      router.push("/admin/courses");
    } catch (err) {
      console.error("Error updating course:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => router.push("/admin/courses")}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  {t("courses.backToList")}
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
            <CreateCourseHeader isEditMode={true} />
            <CreateCourseForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
              initialData={course}
              isEditMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
