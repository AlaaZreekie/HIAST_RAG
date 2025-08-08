import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import DynamicPageClient from "./DynamicPageClient";

// Server-side language detection
function getLanguageFromCookies() {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang");
  return langCookie?.value || "en";
}

// Get language code for API calls
function getLanguageCode(lang) {
  return lang === "ar" ? 1 : 2;
}

// Server-side data fetching
async function fetchPageData(slug, languageCode) {
  try {
    // First, let's see what pages exist
    const allPagesUrl = `/api/user/pages/getallpages`;
    // Use HTTP for server-side requests to avoid SSL issues
    const apiUrl = "http://localhost:5007";

    const allPagesResponse = await fetch(`${apiUrl}${allPagesUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (allPagesResponse.ok) {
      const allPagesText = await allPagesResponse.text();
      let allPagesData;
      try {
        allPagesData = JSON.parse(allPagesText);
        if (typeof allPagesData === "string") {
          allPagesData = JSON.parse(allPagesData);
        }
      } catch (e) {
        console.error("  JSON parsing error for all pages:", e);
      }

      const allPages = allPagesData?.Data || allPagesData || [];
      
    }

    // Now try to fetch the specific page
    const queryParams = new URLSearchParams();
    queryParams.append("Title", slug);
    queryParams.append("LanguageCode", languageCode);

    const url = `/api/user/pages/getbyfilter?${queryParams.toString()}`;



    const response = await fetch(`${apiUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for dynamic content
    });

    if (!response.ok) {
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();


    let data;

    try {
      data = JSON.parse(responseText);
      // Handle double-encoded JSON
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
    } catch (e) {
      console.error("  JSON parsing error:", e);
      return null;
    }



    // Handle ApiResponse structure
    const pages = data?.Data || data || [];


    if (pages.length === 0) {

      return null;
    }


    return pages[0];
  } catch (error) {
    console.error("  Error fetching page data:", error);
    return null;
  }
}

export default async function DynamicPage({ params }) {
  const slug = params.slug;
  const lang = getLanguageFromCookies();
  const languageCode = getLanguageCode(lang);



  // Fetch page data server-side
  const page = await fetchPageData(slug, languageCode);



  if (!page) {

    notFound();
  }

  // Get the translation for current language
  const getPageTranslation = () => {
    if (!page?.Translations) return null;

    return (
      page.Translations.find((t) => t.LanguageCode === languageCode) ||
      page.Translations[0]
    );
  };

  const translation = getPageTranslation();



  if (!translation) {

    notFound();
  }

  return (
    <DynamicPageClient
      page={page}
      translation={translation}
      lang={lang}
      slug={slug}
    />
  );
}
