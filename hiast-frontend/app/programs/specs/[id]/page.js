import { cookies } from "next/headers";
import HomepageLayout from "@/components/layout/HomepageLayout";
import { SpecsClient } from "./SpecsClient";

// Server-side language detection
function getLanguageFromCookies() {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang");
  return langCookie?.value || "en";
}

export default function ProductPage({ params }) {
  const lang = getLanguageFromCookies();

  // Language code mapping
  const languageCode = lang === "ar" ? 1 : 2; // Assuming 1=English, 2=Arabic

  //  <h1>Product ID: {params.id}</h1>;

  return (
    <HomepageLayout currentPage="programs" lang={lang}>
      <SpecsClient lang={lang} id={params.id} />
    </HomepageLayout>
  );
}
