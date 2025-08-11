"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { publicAPI, getProgramNameInLanguage } from "@/lib/publicApi";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

const ProgramsSection = () => {
  const { t, lang, getLanguageCode } = useLanguage();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getAllPrograms();
        if (response.success) {
          setPrograms(response.data.slice(0, 6)); // Show only first 6 programs
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to load programs");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("common.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-12 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("homepage.programs.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("homepage.programs.subtitle")}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program) => (
            <Card
              key={program.Id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Program Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                {/* Program Name */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {getProgramNameInLanguage(program, getLanguageCode())}
                </h3>

                {/* Program Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {program.Description || t("homepage.programs.noDescription")}
                </p>

                {/* Program Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      {program.Duration ||
                        t("homepage.programs.durationNotSpecified")}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      {program.Location?.Name ||
                        t("homepage.programs.locationNotSpecified")}
                    </span>
                  </div>
                </div>

                {/* Learn More Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    (window.location.href = `/programs/${program.Id}`)
                  }
                >
                  {t("homepage.programs.learnMore")}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Programs Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => (window.location.href = "/programs")}
          >
            {t("homepage.programs.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
