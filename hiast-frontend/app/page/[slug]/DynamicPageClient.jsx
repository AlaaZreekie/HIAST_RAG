"use client";
import { useRouter } from "next/navigation";
import HomepageLayout from "@/components/layout/HomepageLayout";

const DynamicPageClient = ({ page, translation, lang, slug }) => {
  const router = useRouter();

  return (
    <HomepageLayout currentPage="dynamic" lang={lang}>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {translation.Title}
          </h1>

          {/* Page Content */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: translation.Content }}
            />
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {lang === "ar" ? "العودة للصفحة الرئيسية" : "Back to Homepage"}
            </button>
          </div>
        </div>
      </main>

    </HomepageLayout>
  );
};

export default DynamicPageClient; 