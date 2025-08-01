"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { requireAdminAuth } from "@/lib/adminAuth";
import { booksAPI } from "@/lib/booksApi";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import CreateBookHeader from "@/components/admin/books/CreateBookHeader";
import CreateBookForm from "@/components/admin/books/CreateBookForm";

const CreateBookPage = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (bookData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await booksAPI.createBook(bookData);
      router.push("/admin/books");
    } catch (err) {
      console.error("Error creating book:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <DashboardHeader />
      <div className="flex main-layout">
        <div className={lang === "ar" ? "order-2" : "order-1"}>
          <DashboardSidebar />
        </div>
        <div className={`flex-1 ${lang === "ar" ? "order-1" : "order-2"}`}>
          <div className="p-6">
            <CreateBookHeader />
            <CreateBookForm
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookPage;
