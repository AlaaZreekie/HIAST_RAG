"use client";
import React from "react";

async function getSpecData(id) {
  try {
    const [faqs, categories] = await Promise.all([]);
    return { faqs, categories };
  } catch (error) {
    console.error("Error fetching Specs:", error);
    return { faqs: [], categories: [] };
  }
}

export const SpecsClient = async ({ lang, id }) => {
  const { faqs, categories } = await getSpecData(id);
  console.log(id);
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
      <section className="py-20 bg-gray-50"></section>
    </div>
  );
};
