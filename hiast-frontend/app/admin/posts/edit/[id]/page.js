"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { postsAPI } from "@/lib/postsApi";
import { getAllCategories } from "@/lib/categoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreatePostHeader from "@/components/admin/posts/CreatePostHeader";
import CreatePostForm from "@/components/admin/posts/CreatePostForm";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  const { t, lang } = useLanguage();

  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }
      loadData();
    };

    checkAuth();
  }, [router, postId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Loading post with ID:", postId);

      // Load categories and posts
      const [categoriesData, postsResponse] = await Promise.all([
        getAllCategories(),
        postsAPI.getAllPosts(),
      ]);

      const postsData = postsResponse.Data || [];
      const foundPost = postsData.find((p) => p.Id === postId);

      if (!foundPost) {
        throw new Error("Post not found");
      }

      console.log("Post loaded:", foundPost);
      setPost(foundPost);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading post:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (postData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // The postData already includes the ID from the form
      await postsAPI.updatePost(postData);
      router.push("/admin/posts");
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
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

  if (isLoading) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}
      >
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
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">{t("posts.loading")}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div
        className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}
      >
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
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
            <CreatePostHeader isEditMode={true} />

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Form */}
            <CreatePostForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
              initialData={post}
              isEditMode={true}
              categories={categories}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
