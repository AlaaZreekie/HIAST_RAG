"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { publicAPI, getPostContentInLanguage, getPostDescriptionInLanguage } from "@/lib/publicApi";
import { Card } from "./ui/Card";

const NewsSection = () => {
  const { t, lang, getLanguageCode } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getAllPosts();
        if (response.success) {
          setPosts(response.data.slice(0, 3)); // Show only 3 latest posts
        }
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${lang === "ar" ? "text-right" : "text-left"}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("homepage.news.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("homepage.news.subtitle")}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.Id} className="hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                {/* Post Image Placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Post Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {getPostContentInLanguage(post, getLanguageCode())}
                </h3>

                {/* Post Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {getPostDescriptionInLanguage(post, getLanguageCode())}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.CreatedAt).toLocaleDateString()}</span>
                  <span>{post.Author?.Name || t("homepage.news.anonymous")}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All News Button */}
        <div className="text-center mt-12">
          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            {t("homepage.news.viewAll")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 