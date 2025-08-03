"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { coursesAPI } from "@/lib/coursesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateCourseHeader from "@/components/admin/courses/CreateCourseHeader";
import CreateCourseForm from "@/components/admin/courses/CreateCourseForm";

const CreateCoursePage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (courseData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await coursesAPI.createCourse(courseData);
      router.push("/admin/courses");
    } catch (err) {
      console.error("Error creating course:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
            <CreateCourseHeader />
            <CreateCourseForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
