"use client";
import { useState } from "react";
import React from "react";

const ViewBooks = ({ books, lang }) => {
  const [filteredBooks, setFilteredBooks] = useState(books);

  const langCode = lang === "ar" ? 1 : 2;
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5007/api";
  const fileOrigin = apiBase.replace(/\/api$/, "");

  // Helper to get translation based on langCode
  const getTranslation = (book) => {
    return (
      (book.Translations || []).find((t) => t.LanguageCode === langCode) ||
      (book.Translations || [])[0] ||
      {}
    );
  };

  // Helper to build full file URLs
  const getFileUrl = (filePath) => {
    if (!filePath) return "";
    return filePath.startsWith("http") ? filePath : `${fileOrigin}${filePath}`;
  };

  // Search handler with case-insensitive startsWith filtering
  const handleChange = (e) => {
    const searchText = e.target.value.trim().toLowerCase();

    if (!searchText) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter((book) => {
      const tr = getTranslation(book);
      const title = tr.Title || "";
      return title.toLowerCase().startsWith(searchText);
    });

    setFilteredBooks(filtered);
  };

  return (
    <section>
      {/* SearchBar */}
      <section className="py-10 bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
              onChange={handleChange}
            />
            <button className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors flex items-center justify-center">
              {/* Search Icon */}
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m21.75 20.063-5.816-5.818a7.523 7.523 0 0 0 1.44-4.433c0-4.17-3.393-7.562-7.562-7.562-4.17 0-7.562 3.392-7.562 7.562s3.392 7.562 7.562 7.562a7.523 7.523 0 0 0 4.433-1.44l5.818 5.816 1.687-1.688ZM9.812 14.986a5.174 5.174 0 1 1-.002-10.35 5.174 5.174 0 0 1 0 10.349Z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const tr = getTranslation(book);
            const title = tr.Title || "N/A";
            const description = tr.Description || "";
            const coverUrl = getFileUrl(book?.CoverImage?.FilePath);
            const fileUrl = getFileUrl(book?.BookFile?.FilePath);

            return (
              <div
                key={book.Id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-100 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Cover */}
                <div className="relative">
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={title}
                      className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                      {lang === "en" ? "No Cover" : "لا يوجد غلاف"}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

                  {/* Title + Year */}
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

                  {/* File Link */}
                  {fileUrl && (
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-indigo-700 backdrop-blur hover:bg-white"
                      title={lang === "en" ? "View File" : "عرض الملف"}
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

                {/* Description + Meta */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {description || "No Description"}
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
                        <rect x="3" y="6" width="18" height="14" rx="2" />
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
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default ViewBooks;
