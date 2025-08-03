"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateBookForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    author: "",
    publicationYear: new Date().getFullYear(),
    isbn: "",
    arabicTitle: "",
    englishTitle: "",
    arabicDescription: "",
    englishDescription: ""
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [bookPreview, setBookPreview] = useState(null);

  // Pre-fill form data when in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      const arabicTranslation = initialData.Translations?.find(t => t.LanguageCode === 1);
      const englishTranslation = initialData.Translations?.find(t => t.LanguageCode === 2);
      
      setFormData({
        author: initialData.Author || "",
        publicationYear: initialData.PublicationYear || new Date().getFullYear(),
        isbn: initialData.ISBN || "",
        arabicTitle: arabicTranslation?.Title || "",
        englishTitle: englishTranslation?.Title || "",
        arabicDescription: arabicTranslation?.Description || "",
        englishDescription: englishTranslation?.Description || ""
      });
      
      if (initialData.CoverImageUrl) {
        setCoverPreview(initialData.CoverImageUrl);
      }
      if (initialData.FileUrl) {
        setBookPreview(initialData.FileUrl);
      }
    }
  }, [initialData, isEditMode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBookPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.arabicTitle.trim() && !formData.englishTitle.trim()) {
      return;
    }

    const translations = [];
    
    if (formData.arabicTitle.trim()) {
      const arabicTranslation = initialData?.Translations?.find(t => t.LanguageCode === 1);
      translations.push({
        Id: arabicTranslation?.Id || null, // Include ID for updates
        LanguageCode: 1, // Arabic
        Title: formData.arabicTitle.trim(),
        Description: formData.arabicDescription.trim()
      });
    }
    
    if (formData.englishTitle.trim()) {
      const englishTranslation = initialData?.Translations?.find(t => t.LanguageCode === 2);
      translations.push({
        Id: englishTranslation?.Id || null, // Include ID for updates
        LanguageCode: 2, // English
        Title: formData.englishTitle.trim(),
        Description: formData.englishDescription.trim()
      });
    }

    const bookData = new FormData();
    
    // Add form fields
    bookData.append("Author", formData.author.trim());
    bookData.append("PublicationYear", formData.publicationYear.toString());
    bookData.append("ISBN", formData.isbn.trim());
    
    // Add files
    if (coverImageFile) {
      bookData.append("CoverImageFile", coverImageFile);
    }
    if (bookFile) {
      bookData.append("BookFile", bookFile);
    }
    
    // Add translations
    bookData.append("Translations", JSON.stringify(translations));

    // Add book ID for updates
    if (isEditMode && initialData?.Id) {
      bookData.append("Id", initialData.Id);
    }

    onSubmit(bookData);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Author */}
            <div>
              <label htmlFor="author" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("books.form.author")}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("books.form.authorPlaceholder")}
                  required
                />
              </div>
            </div>

            {/* Publication Year */}
            <div>
              <label htmlFor="publicationYear" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("books.form.publicationYear")}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="publicationYear"
                  value={formData.publicationYear}
                  onChange={(e) => handleInputChange("publicationYear", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  min="1000"
                  max="9999"
                  required
                />
              </div>
            </div>

            {/* ISBN */}
            <div>
              <label htmlFor="isbn" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("books.form.isbn")}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange("isbn", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("books.form.isbnPlaceholder")}
                  required
                />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label htmlFor="coverImageFile" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("books.form.coverImage")}
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  id="coverImageFile"
                  onChange={handleCoverImageChange}
                  accept="image/*"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  required={!isEditMode}
                />
                {coverPreview && (
                  <div className="mt-2">
                    <img
                      src={coverPreview}
                      alt="Cover Preview"
                      className="w-32 h-40 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Book File Upload */}
            <div>
              <label htmlFor="bookFile" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("books.form.bookFile")}
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  id="bookFile"
                  onChange={handleBookFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  required={!isEditMode}
                />
                {bookPreview && (
                  <div className="mt-2">
                    <a 
                      href={bookPreview} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      {t("books.form.viewFile")}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Arabic Title */}
            <div>
              <label htmlFor="arabicTitle" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("books.form.title")} (${t("books.arabic")})`
                  : `${t("books.form.title")} (${t("books.arabic")})`
                }
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="arabicTitle"
                  value={formData.arabicTitle}
                  onChange={(e) => handleInputChange("arabicTitle", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("books.form.titlePlaceholder")}
                />
              </div>
            </div>

            {/* Arabic Description */}
            <div>
              <label htmlFor="arabicDescription" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("books.form.description")} (${t("books.arabic")})`
                  : `${t("books.form.description")} (${t("books.arabic")})`
                }
              </label>
              <div className="mt-1">
                <textarea
                  id="arabicDescription"
                  rows={4}
                  value={formData.arabicDescription}
                  onChange={(e) => handleInputChange("arabicDescription", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("books.form.descriptionPlaceholder")}
                />
              </div>
            </div>

            {/* English Title */}
            <div>
              <label htmlFor="englishTitle" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("books.form.title")} (${t("books.english")})`
                  : `${t("books.form.title")} (${t("books.english")})`
                }
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="englishTitle"
                  value={formData.englishTitle}
                  onChange={(e) => handleInputChange("englishTitle", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("books.form.titlePlaceholder")}
                />
              </div>
            </div>

            {/* English Description */}
            <div>
              <label htmlFor="englishDescription" className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {lang === "ar" 
                  ? `${t("books.form.description")} (${t("books.english")})`
                  : `${t("books.form.description")} (${t("books.english")})`
                }
              </label>
              <div className="mt-1">
                <textarea
                  id="englishDescription"
                  rows={4}
                  value={formData.englishDescription}
                  onChange={(e) => handleInputChange("englishDescription", e.target.value)}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  placeholder={t("books.form.descriptionPlaceholder")}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/books")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("books.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("books.form.update") : t("books.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("books.form.update") : t("books.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookForm; 