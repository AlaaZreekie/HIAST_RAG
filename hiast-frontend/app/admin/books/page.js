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
      const response = await booksAPI.getAllBooks();
      const data = response?.Data || [];
      setBooks(Array.isArray(data) ? data : []);
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
              <div>
                {books.length === 0 ? (
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="text-center py-8">
                        <p className="text-gray-500">{t("books.noBooks")}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => {
                      const langCode = lang === "ar" ? 1 : 2;
                      const tr =
                        (book.Translations || []).find(
                          (t) => t.LanguageCode === langCode
                        ) || (book.Translations || [])[0];
                      const title = tr?.Title || "N/A";
                      const description = tr?.Description || "";
                      const apiBase =
                        process.env.NEXT_PUBLIC_API_URL ||
                        "http://localhost:5007/api";
                      const fileOrigin = apiBase.replace(/\/api$/, "");
                      const rawCover = book?.CoverImage?.FilePath || "";
                      const rawFile = book?.BookFile?.FilePath || "";
                      const coverUrl = rawCover
                        ? rawCover.startsWith("http")
                          ? rawCover
                          : `${fileOrigin}${rawCover}`
                        : "";
                      const fileUrl = rawFile
                        ? rawFile.startsWith("http")
                          ? rawFile
                          : `${fileOrigin}${rawFile}`
                        : "";
                      return (
                        <div
                          key={book.Id}
                          className="group relative bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-100 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                        >
                          <div className="relative">
                            {coverUrl ? (
                              <img
                                src={coverUrl}
                                alt={title}
                                className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                                {t("books.noCover") || "No Cover"}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                            <div
                              className={`absolute bottom-0 left-0 right-0 p-4 ${
                                lang === "ar" ? "text-right" : "text-left"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <h3 className="text-white text-lg font-semibold drop-shadow">
                                  {title}
                                </h3>
                                <span className="ml-2 inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-gray-700 shadow-sm">
                                  {book.PublicationYear}
                                </span>
                              </div>
                            </div>
                            {fileUrl && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-3 right-3 inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-indigo-700 backdrop-blur hover:bg-white"
                                title={t("books.viewFile") || "View File"}
                              >
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <path d="M14 2v6h6" />
                                </svg>
                                <span className="ml-1">PDF</span>
                              </a>
                            )}
                          </div>

                          <div className="p-4">
                            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                              {description || t("books.noDescription") || ""}
                            </p>
                            <div className="flex flex-wrap gap-2 text-[11px]">
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
                                <svg
                                  className="h-3.5 w-3.5 mr-1 text-gray-500"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                                  <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                                {book.Author}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
                                <svg
                                  className="h-3.5 w-3.5 mr-1 text-gray-500"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M3 4h18" />
                                  <path d="M8 2v4" />
                                  <path d="M16 2v4" />
                                  <rect
                                    x="3"
                                    y="6"
                                    width="18"
                                    height="14"
                                    rx="2"
                                  />
                                </svg>
                                {book.PublicationYear}
                              </span>
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
                                <svg
                                  className="h-3.5 w-3.5 mr-1 text-gray-500"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M4 4h16v16H4z" />
                                  <path d="M4 9h16" />
                                </svg>
                                ISBN: {book.ISBN}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`px-4 py-3 bg-gray-50 border-t flex ${
                              lang === "ar"
                                ? "justify-start space-x-reverse"
                                : "justify-end"
                            } space-x-2`}
                          >
                            <button
                              onClick={() => handleEditBook(book.Id)}
                              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              {t("common.edit")}
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.Id)}
                              className="inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-200 hover:bg-red-100"
                            >
                              {t("common.delete")}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
