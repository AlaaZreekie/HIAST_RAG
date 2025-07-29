"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { postsAPI } from "@/lib/postsApi";
import { getAllCategories } from "@/lib/categoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreatePostHeader from "@/components/admin/posts/CreatePostHeader";
import CreatePostForm from "@/components/admin/posts/CreatePostForm";

export default function CreatePostPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }
      loadCategories();
    };

    checkAuth();
  }, [router]);

  const loadCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
      setError("Failed to load categories");
    }
  };

  const handleSubmit = async (postData) => {
    try {
      setIsLoading(true);
      setError(null);

      await postsAPI.createPost(postData);
      router.push("/admin/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { authAPI } = await import("@/lib/api");
      await authAPI.logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader user={null} onLogout={handleLogout} />

      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <main
          className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${
            lang === "ar" ? "order-1" : "order-2"
          }`}
        >
          <div className="px-4 py-6 sm:px-0">
            {/* Header */}
            <CreatePostHeader />

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Form */}
            <CreatePostForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              categories={categories}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
