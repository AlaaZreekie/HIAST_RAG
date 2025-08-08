import { cookies } from "next/headers";
import {
  getAllPublicFaqs,
  getAllPublicFaqCategories,
  getFaqQuestionInLanguage,
  getFaqAnswerInLanguage,
  getFaqCategoryNameInLanguage,
} from "@/lib/publicFaqsApi";
import HomepageLayout from "@/components/layout/HomepageLayout";
import FaqClient from "./FaqClient";

function getLanguageFromCookies() {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("lang");
  return langCookie?.value || "en";
}

async function getFaqsData() {
  try {
    const [faqs, categories] = await Promise.all([
      getAllPublicFaqs(),
      getAllPublicFaqCategories(),
    ]);
    return { faqs, categories };
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return { faqs: [], categories: [] };
  }
}

export default async function FaqPage() {
  const lang = getLanguageFromCookies();
  const { faqs, categories } = await getFaqsData();
  const languageCode = lang === "ar" ? 1 : 2;

  return (
    <HomepageLayout currentPage="faq" lang={lang}>
      <FaqClient
        faqs={faqs}
        categories={categories}
        lang={lang}
        languageCode={languageCode}
      />
    </HomepageLayout>
  );
}
