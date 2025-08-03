"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "./ui/Button";

const HeroSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="relative bg-gradient-primary min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-4xl mx-auto text-center ${lang === "ar" ? "text-right" : "text-left"}`}>
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t("hero.title")}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
            {t("hero.subtitle")}
          </p>
          
          {/* Description */}
          <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>
          
          {/* Call to Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${lang === "ar" ? "sm:flex-row-reverse" : ""}`}>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 transition-colors"
            >
              {t("hero.primaryButton")}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary transition-colors"
            >
              {t("hero.secondaryButton")}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-white/80">{t("hero.stats.programs")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/80">{t("hero.stats.students")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">{t("hero.stats.courses")}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
