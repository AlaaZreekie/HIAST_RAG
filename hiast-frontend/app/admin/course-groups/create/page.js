"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { courseGroupsAPI } from "@/lib/courseGroupsApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateCourseGroupHeader from "@/components/admin/course-groups/CreateCourseGroupHeader";
import CreateCourseGroupForm from "@/components/admin/course-groups/CreateCourseGroupForm";

const CreateCourseGroupPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (courseGroupData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await courseGroupsAPI.createCourseGroup(courseGroupData);
      router.push("/admin/course-groups");
    } catch (err) {
      console.error("Error creating course group:", err);
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
            <CreateCourseGroupHeader />
            <CreateCourseGroupForm
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

export default CreateCourseGroupPage;
