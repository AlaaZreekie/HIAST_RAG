"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";

const BooksPageHeader = () => {
  const { t, lang } = useLanguage();
  const router = useRouter();

  return (
    <div className="mb-6">
      <div className={`flex justify-between items-center ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("books.title")}
          </h1>
          <p className="text-sm text-gray-600">
            {t("books.subtitle")}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/books/create")}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}
        >
          <svg
            className={`h-4 w-4 ${lang === "ar" ? "ml-2" : "mr-2"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {t("books.create")}
        </button>
      </div>
    </div>
  );
};

export default BooksPageHeader; 