"use client";
import { useLanguage } from "@/components/LanguageProvider";

const PostsPageHeader = ({ onCreatePost }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className={`flex items-center ${
        lang === "ar" ? "order-2" : "order-1"
      }`}>
        <h1 className={`text-2xl font-bold text-gray-900 ${
          lang === "ar" ? "text-right" : "text-left"
        }`}>
          {t("posts.title")}
        </h1>
      </div>
      <div className={`flex items-center ${
        lang === "ar" ? "order-1" : "order-2"
      }`}>
        <button
          onClick={onCreatePost}
          className="admin-button admin-button-primary"
        >
          {t("posts.create")}
        </button>
      </div>
    </div>
  );
};

export default PostsPageHeader; 