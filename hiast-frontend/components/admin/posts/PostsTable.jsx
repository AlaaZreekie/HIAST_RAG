"use client";
import { useLanguage } from "@/components/LanguageProvider";

const PostsTable = ({ posts, onEditPost, onDeletePost }) => {
  const { t, lang } = useLanguage();

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

      {/* Scrollable Posts Container */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.Id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className={`flex justify-between items-start ${
                lang === "ar" ? "flex-row-reverse" : ""
              }`}>
                {/* Post Info */}
                <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {post.Title || t("posts.noTitle")}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {post.Content ? (post.Content.length > 100 ? post.Content.substring(0, 100) + "..." : post.Content) : t("posts.noContent")}
                  </p>
                  
                  {/* Post Details */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                    <span>{t("posts.author")}: {post.AuthorName || t("posts.unknownAuthor")}</span>
                    <span>{t("posts.category")}: {post.CategoryName || t("posts.noCategory")}</span>
                    <span>{t("posts.date")}: {new Date(post.PublicationDate).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Translations */}
                  <div className={`flex flex-wrap gap-2 mb-3 ${
                    lang === "ar" ? "flex-row-reverse" : ""
                  }`}>
                    {post.Translations?.map((translation) => (
                      <span
                        key={translation.Id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {translation.LanguageName}: {translation.Title}
                      </span>
                    ))}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsTable; 