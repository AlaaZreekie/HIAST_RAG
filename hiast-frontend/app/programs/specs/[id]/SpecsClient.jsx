"use client";
import { useState, useEffect } from "react";
import React from "react";
import { getSpecializationById } from "@/lib/publicSpecializationsApi";

export const SpecsClient = ({ lang, id }) => {
  // const { specs } = await getSpecData(id);
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const s = await getSpecializationById(id);

      setSpecs(s["Data"]);
    }
    fetchData();
  }, []);
  return (
    <div>
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
            <h1 className="text-5xl md:text-7xl min-h-24 font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {lang === "ar" ? "برامج التأهيل المدرسي" : "Engineering Programs"}
            </h1>
          </div>
        </div>
      </section>
      {/*  */}
      {/* Programs Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {lang === "ar"
                ? "جميع الاختصاصات المتاحة"
                : "All Available Specilizations"}
            </h2>
          </div>

          {specs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specs.map((spec) => (
                <div
                  key={spec.Id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Program Icon/Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white"
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

                  {/* Program Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {spec["Translations"][lang === "en" ? 1 : 0]["Name"]}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {
                        spec["Translations"][lang === "en" ? 1 : 0][
                          "Description"
                        ]
                      }
                    </p>

                    {/* Program Details */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-blue-600">
                        <svg
                          className="w-5 h-5"
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
                        <span className="font-semibold">{spec.Duration}</span>
                      </div>

                      <div className="flex items-center gap-2 text-green-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-semibold">
                          {lang === "ar" ? "متاح" : "Available"}
                        </span>
                      </div>
                    </div>
                    {/* 
                      //TODO: 
                    */}
                    <a
                      href={`/`}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      {lang === "ar" ? "عرض المقررات" : "View Courses"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {lang === "ar"
                  ? "لا توجد برامج متاحة حالياً"
                  : "No Programs Available"}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {lang === "ar"
                  ? "نحن نعمل على إضافة برامج جديدة. تحقق مرة أخرى قريباً!"
                  : "We're working on adding new programs. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
