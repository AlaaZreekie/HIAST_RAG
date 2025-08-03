"use client";
import { useLanguage } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import NewsSection from "@/components/NewsSection";
import CoursesSection from "@/components/CoursesSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen">
      <Header />
      <HeroSection />
      <ProgramsSection />
      <NewsSection />
      <CoursesSection />
      <StatsSection />
      <Footer />
    </div>
  );
}
