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

    console.log("🔍 Checking all pages first:");
    console.log("  URL:", `${apiUrl}${allPagesUrl}`);

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
      console.log("  All pages in database:", allPages.length);
      allPages.forEach((page, index) => {
        console.log(`    Page ${index + 1}:`, {
          Id: page.Id,
          Translations: page.Translations?.map((t) => ({
            LanguageCode: t.LanguageCode,
            Title: t.Title,
            Slug: t.Slug,
          })),
        });
      });
    }

    // Now try to fetch the specific page
    const queryParams = new URLSearchParams();
    queryParams.append("Title", slug);
    queryParams.append("LanguageCode", languageCode);

    const url = `/api/user/pages/getbyfilter?${queryParams.toString()}`;

    console.log("🔍 Fetching page data:");
    console.log("  Slug:", slug);
    console.log("  LanguageCode:", languageCode);
    console.log("  URL:", `${apiUrl}${url}`);

    const response = await fetch(`${apiUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for dynamic content
    });

    console.log("  Response status:", response.status);

    if (!response.ok) {
      console.error("  HTTP error! status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log("  Response text:", responseText.substring(0, 200) + "...");

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

    console.log("  Parsed data:", JSON.stringify(data, null, 2));

    // Handle ApiResponse structure
    const pages = data?.Data || data || [];
    console.log("  Pages array length:", pages.length);

    if (pages.length === 0) {
      console.log("  No pages found");
      return null;
    }

    console.log("  Found page:", JSON.stringify(pages[0], null, 2));
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

  console.log("🚀 DynamicPage component:");
  console.log("  Slug:", slug);
  console.log("  Lang:", lang);
  console.log("  LanguageCode:", languageCode);

  // Fetch page data server-side
  const page = await fetchPageData(slug, languageCode);

  console.log("  Page result:", page ? "Found" : "Not found");

  if (!page) {
    console.log("  ❌ Page not found, calling notFound()");
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

  console.log("  Translation result:", translation ? "Found" : "Not found");

  if (!translation) {
    console.log("  ❌ Translation not found, calling notFound()");
    notFound();
  }

  console.log("  ✅ Rendering DynamicPageClient");

  return (
    <DynamicPageClient
      page={page}
      translation={translation}
      lang={lang}
      slug={slug}
    />
  );
}
