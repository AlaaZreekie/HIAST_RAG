import HomepageLayout from "@/components/layout/HomepageLayout";
import React from "react";
import { cookies } from "next/headers";
import { getAllBooks } from "@/lib/publicBooksApi";

// Server-side language detection
function getLanguageFromCookies() {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang");
  return langCookie?.value || "en";
}

/*
  public string Author { get; set; }
  public int PublicationYear { get; set; }
  public string ISBN { get; set; }
  public MediaDto CoverImage { get; set; }
  public MediaDto BookFile { get; set; }
  public IList<BookTranslationDto>? Translations { get; set; }
*/

/*
MediaDto
  public string FileName { get; set; }
  public string FilePath { get; set; }
  public string FileType { get; set; }
  public MediaCategoryDto MediaCategory { get; set; }
*/

const Library = async () => {
  const lang = getLanguageFromCookies();

  console.log("*****************************************");
  const books = await getAllBooks();
  console.log(books);

  // Language code mapping
  const languageCode = lang === "ar" ? 1 : 2; // Assuming 1=English, 2=Arabic
  return (
    <HomepageLayout currentPage="library" lang={lang}>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent min-h-24">
              {lang === "ar" ? "مكتبتنا التعليمية" : "Our Academic Library"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              {lang === "ar"
                ? "اكتشف مجموعة متنوعة من الكتب الأكاديمية"
                : "Discover a diverse range of academic books"}
            </p>
          </div>
          <div>Hatem</div>
        </div>
      </section>
    </HomepageLayout>
  );
};

export default Library;
