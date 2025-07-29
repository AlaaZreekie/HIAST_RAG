"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requireAdminAuth } from "@/lib/adminAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { postsAPI } from "@/lib/postsApi";
import { getAllCategories } from "@/lib/categoriesApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import PostsPageHeader from "@/components/admin/posts/PostsPageHeader";
import PostsTable from "@/components/admin/posts/PostsTable";
import BackToDashboardButton from "@/components/admin/posts/BackToDashboardButton";

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      if (!requireAdminAuth(router)) {
        return;
      }
      loadPosts();
    };

    checkAuth();
  }, [router]);

  // Reload posts when page is focused (e.g., after creating a post)
  useEffect(() => {
    const handleFocus = () => {
      if (!isLoading) {
        loadPosts();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isLoading]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting to load posts...");

      const response = await postsAPI.getAllPosts();
      console.log("Posts loaded successfully:", response);
      
      const postsData = response.Data || [];
      console.log("Extracted posts:", postsData);
      
      setPosts(postsData);
    } catch (error) {
      console.error("Error loading posts:", error);
      setError(error.message);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = () => {
    router.push("/admin/posts/create");
  };

  const handleEditPost = (postId) => {
    router.push(`/admin/posts/edit/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    if (!confirm(t("posts.confirmDelete"))) {
      return;
    }

    try {
      await postsAPI.deletePost(postId);
      await loadPosts(); // Reload the list
    } catch (error) {
      console.error("Error deleting post:", error);
      setError(error.message);
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
      <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
        <DashboardHeader user={null} onLogout={handleLogout} />
        <div className="flex main-layout">
          <div className={lang === "ar" ? "order-2" : "order-1"}>
            <DashboardSidebar />
          </div>
          <main className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${lang === "ar" ? "order-1" : "order-2"}`}>
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

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader user={null} onLogout={handleLogout} />

      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <main className={`flex-1 py-6 px-4 sm:px-6 lg:px-8 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="px-4 py-6 sm:px-0">
            {/* Debug info */}
            <div className="mb-4 p-2 bg-yellow-100 text-xs">
              Language: {lang} | Layout: {lang === "ar" ? "RTL" : "LTR"}
            </div>

            {/* Header */}
            <PostsPageHeader onCreatePost={handleCreatePost} />

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Posts Table */}
            <PostsTable 
              posts={posts}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
            />

            {/* Back to Dashboard Button */}
            <BackToDashboardButton />
          </div>
        </main>
      </div>
    </div>
  );
}
