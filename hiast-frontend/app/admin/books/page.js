"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { booksAPI } from "@/lib/booksApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";

const BooksPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await booksAPI.getAllBooks();
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("Error loading books:", err);
      setError(err.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      loadBooks();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleEditBook = (bookId) => {
    router.push(`/admin/books/edit/${bookId}`);
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm(t("books.confirmDelete"))) {
      try {
        await booksAPI.deleteBook(bookId);
        await loadBooks();
      } catch (err) {
        console.error("Error deleting book:", err);
        alert(t("books.deleteError"));
      }
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
            <div className="mb-6">
              <div
                className={`flex justify-between items-center ${
                  lang === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {t("books.title")}
                  </h1>
                  <p className="text-sm text-gray-600">{t("books.subtitle")}</p>
                </div>
                <button
                  onClick={() => router.push("/admin/books/create")}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    lang === "ar" ? "flex-row-reverse" : "flex-row"
                  }`}
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

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="max-h-96 overflow-y-auto">
                    {books.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">{t("books.noBooks")}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {books.map((book) => (
                          <div
                            key={book.Id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div
                              className={`flex justify-between items-start ${
                                lang === "ar" ? "flex-row-reverse" : "flex-row"
                              }`}
                            >
                              <div className="flex-1">
                                <div
                                  className={`flex items-center space-x-3 mb-2 ${
                                    lang === "ar" ? "space-x-reverse" : ""
                                  }`}
                                >
                                  <span className="text-sm font-medium text-gray-500">
                                    ID: {book.Id}
                                  </span>
                                  {book.FileUrl && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                      {t("books.hasFile")}
                                    </span>
                                  )}
                                </div>

                                <h3
                                  className={`text-lg font-semibold text-gray-900 mb-2 ${
                                    lang === "ar" ? "text-right" : "text-left"
                                  }`}
                                >
                                  {book.Name || "N/A"}
                                </h3>

                                <div
                                  className={`text-sm text-gray-600 mb-3 ${
                                    lang === "ar" ? "text-right" : "text-left"
                                  }`}
                                >
                                  <p className="mb-2">
                                    {book.Description || "N/A"}
                                  </p>

                                  {book.Translations &&
                                    book.Translations.length > 0 && (
                                      <div className="mt-2">
                                        <p className="font-medium mb-1">
                                          {t("books.translations")}:
                                        </p>
                                        <div className="space-y-1">
                                          {book.Translations.map(
                                            (translation, index) => (
                                              <p
                                                key={index}
                                                className="text-xs"
                                              >
                                                {translation.LanguageName}:{" "}
                                                {translation.Name}
                                              </p>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>

                              <div
                                className={`flex space-x-2 ${
                                  lang === "ar" ? "space-x-reverse" : ""
                                }`}
                              >
                                <button
                                  onClick={() => handleEditBook(book.Id)}
                                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                  {t("common.edit")}
                                </button>
                                <button
                                  onClick={() => handleDeleteBook(book.Id)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  {t("common.delete")}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
