"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { faqCategoriesAPI } from "@/lib/faqCategoriesApi";

const CreateFaqForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    displayOrder: "",
    faqCategoryId: "",
    arabicQuestion: "",
    englishQuestion: "",
    arabicAnswer: "",
    englishAnswer: ""
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

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        displayOrder: initialData.DisplayOrder?.toString() || "",
        faqCategoryId: initialData.FaqCategoryId?.toString() || "",
        arabicQuestion: arabicTranslation?.Question || "",
        englishQuestion: englishTranslation?.Question || "",
        arabicAnswer: arabicTranslation?.Answer || "",
        englishAnswer: englishTranslation?.Answer || ""
      });
    }
  }, [initialData, isEditMode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.arabicQuestion.trim() && !formData.englishQuestion.trim()) {
      return;
    }

    if (!formData.faqCategoryId) {
      return;
    }

    const translations = [];
    
    if (formData.arabicQuestion.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null,
        LanguageCode: 1,
        Question: formData.arabicQuestion.trim(),
        Answer: formData.arabicAnswer.trim()
      });
    }
    
    if (formData.englishQuestion.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null,
        LanguageCode: 2,
        Question: formData.englishQuestion.trim(),
        Answer: formData.englishAnswer.trim()
      });
    }

    const faqData = {
      DisplayOrder: parseInt(formData.displayOrder) || 0,
      FaqCategoryId: formData.faqCategoryId,
      Translations: translations
    };

    // Add FAQ ID for updates
    if (isEditMode && initialData?.Id) {
      faqData.Id = initialData.Id;
    }

    onSubmit(faqData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Display Order */}
            <div>
              <label htmlFor="displayOrder" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("faqs.form.displayOrder")}
              </label>
              <input
                type="number"
                id="displayOrder"
                value={formData.displayOrder}
                onChange={(e) => handleInputChange("displayOrder", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                placeholder={t("faqs.form.displayOrderPlaceholder")}
              />
            </div>

            {/* FAQ Category */}
            <div>
              <label htmlFor="faqCategoryId" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("faqs.form.category")}
              </label>
              <select
                id="faqCategoryId"
                value={formData.faqCategoryId}
                onChange={(e) => handleInputChange("faqCategoryId", e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
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
              <label htmlFor="arabicQuestion" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("faqs.form.question")} ({t("faqs.arabic")})
              </label>
              <textarea
                id="arabicQuestion"
                value={formData.arabicQuestion}
                onChange={(e) => handleInputChange("arabicQuestion", e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                placeholder={t("faqs.form.questionPlaceholder")}
              />
            </div>

            {/* English Question */}
            <div>
              <label htmlFor="englishQuestion" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("faqs.form.question")} ({t("faqs.english")})
              </label>
              <textarea
                id="englishQuestion"
                value={formData.englishQuestion}
                onChange={(e) => handleInputChange("englishQuestion", e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                placeholder={t("faqs.form.questionPlaceholder")}
              />
            </div>

            {/* Arabic Answer */}
            <div>
              <label htmlFor="arabicAnswer" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("faqs.form.answer")} ({t("faqs.arabic")})
              </label>
              <textarea
                id="arabicAnswer"
                value={formData.arabicAnswer}
                onChange={(e) => handleInputChange("arabicAnswer", e.target.value)}
                rows={5}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="rtl"
                placeholder={t("faqs.form.answerPlaceholder")}
              />
            </div>

            {/* English Answer */}
            <div>
              <label htmlFor="englishAnswer" className={`block text-sm font-medium text-gray-700 mb-2 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("faqs.form.answer")} ({t("faqs.english")})
              </label>
              <textarea
                id="englishAnswer"
                value={formData.englishAnswer}
                onChange={(e) => handleInputChange("englishAnswer", e.target.value)}
                rows={5}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
                dir="ltr"
                placeholder={t("faqs.form.answerPlaceholder")}
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