"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const PostsTable = ({ posts, onEditPost, onDeletePost }) => {
  const { t, lang } = useLanguage();
  const [expandedPosts, setExpandedPosts] = useState(new Set());

  // Helper function to get content in current language
  const getContentInLanguage = (post, languageCode) => {
    const translation = post.Translations?.find(t => t.LanguageCode === languageCode);
    return translation || null;
  };

  // Helper function to get category name in current language
  const getCategoryNameInLanguage = (category, languageCode) => {
    if (!category?.Translations) return t("posts.noCategory");
    const translation = category.Translations.find(t => t.LanguageCode === languageCode);
    return translation?.Name || t("posts.noCategory");
  };

  // Get current language code (1 for Arabic, 2 for English)
  const currentLanguageCode = lang === "ar" ? 1 : 2;

  // Toggle post expansion
  const togglePostExpansion = (postId) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  if (posts.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-500">{t("posts.noPosts")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className={`text-lg font-medium text-gray-900 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("posts.title")} ({posts.length})
        </h3>
      </div>

      {/* Scrollable Posts Container - Max 3 posts visible */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {posts.map((post) => {
            // Get content in current language
            const currentTranslation = getContentInLanguage(post, currentLanguageCode);
            // Get category name in current language
            const categoryName = getCategoryNameInLanguage(post.Category, currentLanguageCode);
            // Check if post is expanded
            const isExpanded = expandedPosts.has(post.Id);
            // Check if content is long enough to need truncation
            const hasLongContent = currentTranslation?.Content && currentTranslation.Content.length > 100;
            
            return (
              <div key={post.Id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className={`flex justify-between items-start ${
                  lang === "ar" ? "flex-row-reverse" : ""
                }`}>
                  {/* Post Info */}
                  <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      {currentTranslation?.Title || t("posts.noTitle")}
                    </h4>
                    
                    {/* Dynamic Content Section */}
                    <div className="mb-3">
                      {currentTranslation?.Content ? (
                        <div>
                          <p className="text-sm text-gray-600">
                            {isExpanded 
                              ? currentTranslation.Content 
                              : currentTranslation.Content.length > 100 
                                ? currentTranslation.Content.substring(0, 100) + "..." 
                                : currentTranslation.Content
                            }
                          </p>
                          
                          {/* Expand/Collapse Button */}
                          {hasLongContent && (
                            <button
                              onClick={() => togglePostExpansion(post.Id)}
                              className={`mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-900 transition-colors ${
                                lang === "ar" ? "text-right" : "text-left"
                              }`}
                            >
                              {isExpanded ? t("posts.showLess") : t("posts.showMore")}
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">{t("posts.noContent")}</p>
                      )}
                    </div>
                    
                    {/* Post Details */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                      <span>{t("posts.author")}: {post.AuthorName || t("posts.unknownAuthor")}</span>
                      <span>{t("posts.category")}: {categoryName}</span>
                      <span>{t("posts.date")}: {new Date(post.PublicationDate).toLocaleDateString()}</span>
                    </div>
                    
                    {/* Language Indicator */}
                    <div className={`flex flex-wrap gap-2 mb-3 ${
                      lang === "ar" ? "flex-row-reverse" : ""
                    }`}>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {lang === "ar" ? "العربية" : "English"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                    <button
                      onClick={() => onEditPost(post.Id)}
                      className={`text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("posts.edit")}
                    </button>
                    <button
                      onClick={() => onDeletePost(post.Id)}
                      className={`text-red-600 hover:text-red-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      {t("posts.delete")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostsTable; 