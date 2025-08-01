"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { faqCategoriesAPI } from "@/lib/faqCategoriesApi";

const CreateFaqForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    DisplayOrder: "",
    FaqCategoryId: "",
    ArabicQuestion: "",
    EnglishQuestion: "",
    ArabicAnswer: "",
    EnglishAnswer: ""
  });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await faqCategoriesAPI.getAllFaqCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading FAQ categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        DisplayOrder: initialData.DisplayOrder?.toString() || "",
        FaqCategoryId: initialData.FaqCategoryId?.toString() || "",
        ArabicQuestion: initialData.ArabicQuestion || "",
        EnglishQuestion: initialData.EnglishQuestion || "",
        ArabicAnswer: initialData.ArabicAnswer || "",
        EnglishAnswer: initialData.EnglishAnswer || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      DisplayOrder: parseInt(formData.DisplayOrder) || 0,
      FaqCategoryId: parseInt(formData.FaqCategoryId) || 0
    };
    onSubmit(submitData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Display Order */}
            <div>
              <label htmlFor="DisplayOrder" className="block text-sm font-medium text-gray-700 mb-2">
                {t("faqs.form.displayOrder")}
              </label>
              <input
                type="number"
                id="DisplayOrder"
                name="DisplayOrder"
                value={formData.DisplayOrder}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* FAQ Category */}
            <div>
              <label htmlFor="FaqCategoryId" className="block text-sm font-medium text-gray-700 mb-2">
                {t("faqs.form.category")}
              </label>
              <select
                id="FaqCategoryId"
                name="FaqCategoryId"
                value={formData.FaqCategoryId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <option value="">{t("faqs.form.selectCategory")}</option>
                {categories.map((category) => (
                  <option key={category.Id} value={category.Id}>
                    {category.Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Arabic Question */}
            <div>
              <label htmlFor="ArabicQuestion" className="block text-sm font-medium text-gray-700 mb-2">
                {t("faqs.form.arabicQuestion")}
              </label>
              <textarea
                id="ArabicQuestion"
                name="ArabicQuestion"
                value={formData.ArabicQuestion}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Question */}
            <div>
              <label htmlFor="EnglishQuestion" className="block text-sm font-medium text-gray-700 mb-2">
                {t("faqs.form.englishQuestion")}
              </label>
              <textarea
                id="EnglishQuestion"
                name="EnglishQuestion"
                value={formData.EnglishQuestion}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
              />
            </div>

            {/* Arabic Answer */}
            <div>
              <label htmlFor="ArabicAnswer" className="block text-sm font-medium text-gray-700 mb-2">
                {t("faqs.form.arabicAnswer")}
              </label>
              <textarea
                id="ArabicAnswer"
                name="ArabicAnswer"
                value={formData.ArabicAnswer}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Answer */}
            <div>
              <label htmlFor="EnglishAnswer" className="block text-sm font-medium text-gray-700 mb-2">
                {t("faqs.form.englishAnswer")}
              </label>
              <textarea
                id="EnglishAnswer"
                name="EnglishAnswer"
                value={formData.EnglishAnswer}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className={`mt-6 flex space-x-3 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            <button
              type="submit"
              disabled={isLoading || loadingCategories}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? t("common.loading") : (isEditMode ? t("faqs.form.update") : t("faqs.form.submit"))}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/faqs")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("faqs.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFaqForm; 