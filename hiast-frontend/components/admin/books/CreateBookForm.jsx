"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const CreateBookForm = ({ onSubmit, isLoading, error, initialData = null, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    FileUrl: "",
    ArabicName: "",
    EnglishName: "",
    ArabicDescription: "",
    EnglishDescription: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name || "",
        Description: initialData.Description || "",
        FileUrl: initialData.FileUrl || "",
        ArabicName: initialData.ArabicName || "",
        EnglishName: initialData.EnglishName || "",
        ArabicDescription: initialData.ArabicDescription || "",
        EnglishDescription: initialData.EnglishDescription || ""
      });
      if (initialData.FileUrl) {
        setFilePreview(initialData.FileUrl);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append("Name", formData.Name);
    submitData.append("Description", formData.Description);
    submitData.append("ArabicName", formData.ArabicName);
    submitData.append("EnglishName", formData.EnglishName);
    submitData.append("ArabicDescription", formData.ArabicDescription);
    submitData.append("EnglishDescription", formData.EnglishDescription);
    
    if (selectedFile) {
      submitData.append("File", selectedFile);
    }

    onSubmit(submitData);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-2">
                {t("books.form.name")}
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-2">
                {t("books.form.description")}
              </label>
              <textarea
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir={lang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="File" className="block text-sm font-medium text-gray-700 mb-2">
                {t("books.form.file")}
              </label>
              <input
                type="file"
                id="File"
                name="File"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {filePreview && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{t("books.form.filePreview")}:</p>
                  <a 
                    href={filePreview} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    {t("books.form.viewFile")}
                  </a>
                </div>
              )}
            </div>

            {/* Arabic Name */}
            <div>
              <label htmlFor="ArabicName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("books.form.arabicName")}
              </label>
              <input
                type="text"
                id="ArabicName"
                name="ArabicName"
                value={formData.ArabicName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Name */}
            <div>
              <label htmlFor="EnglishName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("books.form.englishName")}
              </label>
              <input
                type="text"
                id="EnglishName"
                name="EnglishName"
                value={formData.EnglishName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="ltr"
              />
            </div>

            {/* Arabic Description */}
            <div>
              <label htmlFor="ArabicDescription" className="block text-sm font-medium text-gray-700 mb-2">
                {t("books.form.arabicDescription")}
              </label>
              <textarea
                id="ArabicDescription"
                name="ArabicDescription"
                value={formData.ArabicDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                dir="rtl"
              />
            </div>

            {/* English Description */}
            <div>
              <label htmlFor="EnglishDescription" className="block text-sm font-medium text-gray-700 mb-2">
                {t("books.form.englishDescription")}
              </label>
              <textarea
                id="EnglishDescription"
                name="EnglishDescription"
                value={formData.EnglishDescription}
                onChange={handleChange}
                required
                rows={4}
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
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? t("common.loading") : (isEditMode ? t("books.form.update") : t("books.form.submit"))}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/books")}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t("books.form.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookForm; 