"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { getAllMediaCategories } from "@/lib/mediaCategoriesApi";

const CreateMediaForm = ({ onSubmit, isLoading, error, initialData, isEditMode = false }) => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [mediaCategories, setMediaCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Load media categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const categories = await getAllMediaCategories();
        setMediaCategories(categories);
      } catch (error) {
        console.error("Error loading media categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Pre-fill category if in edit mode
  useEffect(() => {
    if (isEditMode && initialData?.MediaCategoryId) {
      setSelectedCategoryId(initialData.MediaCategoryId);
    }
  }, [initialData, isEditMode]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowCategoryDropdown(false);
  };

  const getCategoryNameInLanguage = (category, languageCode) => {
    if (!category?.Translations) return category?.Name || "Unknown";
    const translation = category.Translations.find(t => t.LanguageCode === languageCode);
    return translation?.Name || category?.Name || "Unknown";
  };

  const getSelectedCategoryName = () => {
    if (!selectedCategoryId) return t("media.form.selectCategory");
    const selectedCategory = mediaCategories.find(cat => cat.Id === selectedCategoryId);
    return selectedCategory ? getCategoryNameInLanguage(selectedCategory, lang === "ar" ? 1 : 2) : t("media.form.selectCategory");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isEditMode && !selectedFile) {
      alert(t("media.selectFile"));
      return;
    }

    if (!selectedCategoryId) {
      alert(t("media.selectCategory"));
      return;
    }

    // For create mode, pass file and category
    // For edit mode, pass category update
    if (isEditMode) {
      onSubmit({ MediaCategoryId: selectedCategoryId }); // Update category only
    } else {
      onSubmit({ MediaCategoryId: selectedCategoryId }, selectedFile); // Pass file and category
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* File Upload */}
            {!isEditMode && (
              <div>
                <label htmlFor="file" className={`block text-sm font-medium text-gray-700 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}>
                  {t("media.form.file")}
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    className={`block w-full text-sm text-gray-500 ${
                      lang === "ar" ? "text-right" : "text-left"
                    } file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${
                      lang === "ar" ? "file:mr-0 file:ml-4" : ""
                    }`}
                    accept="image/*,video/*,application/pdf"
                    lang={lang}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  />
                </div>
                
                {/* File Preview */}
                {filePreview && (
                  <div className="mt-2">
                    <img 
                      src={filePreview} 
                      alt="Preview" 
                      className="max-w-xs max-h-32 object-contain border rounded"
                    />
                  </div>
                )}
                
                {selectedFile && (
                  <p className={`mt-1 text-sm text-gray-500 ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}>
                    {t("media.selectedFile")}: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}

                {/* No file selected message */}
                {!selectedFile && (
                  <p className={`mt-1 text-sm text-gray-400 ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}>
                    {t("media.noFileSelected")}
                  </p>
                )}
              </div>
            )}

            {/* Media Category Selector */}
            <div>
              <label className={`block text-sm font-medium text-gray-700 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}>
                {t("media.form.category")}
              </label>
              <div className="mt-1 relative">
                {/* Category Dropdown Button */}
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className={`w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                  disabled={loadingCategories}
                >
                  <span className={loadingCategories ? "text-gray-400" : "text-gray-900"}>
                    {loadingCategories ? t("media.loadingCategories") : getSelectedCategoryName()}
                  </span>
                  <span className={`absolute inset-y-0 ${lang === "ar" ? "left-0" : "right-0"} flex items-center pr-2`}>
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Category Dropdown */}
                {showCategoryDropdown && !loadingCategories && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="max-h-48 overflow-y-auto">
                      {mediaCategories.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          {t("mediaCategories.noCategories")}
                        </div>
                      ) : (
                        <div className="py-1">
                          {mediaCategories.map((category) => (
                            <button
                              key={category.Id}
                              type="button"
                              onClick={() => handleCategorySelect(category.Id)}
                              className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 ${
                                selectedCategoryId === category.Id ? "bg-indigo-50 text-indigo-900" : "text-gray-900"
                              } ${lang === "ar" ? "text-right" : "text-left"}`}
                            >
                              {getCategoryNameInLanguage(category, lang === "ar" ? 1 : 2)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {loadingCategories && (
                <p className={`mt-1 text-sm text-gray-500 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}>
                  {t("media.loadingCategories")}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push("/admin/media")}
                className="admin-button admin-button-secondary"
                disabled={isLoading}
              >
                {t("media.form.cancel")}
              </button>
              <button
                type="submit"
                className="admin-button admin-button-primary"
                disabled={isLoading || loadingCategories}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? t("media.form.update") : t("media.form.submit")}
                  </div>
                ) : (
                  isEditMode ? t("media.form.update") : t("media.form.submit")
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMediaForm; 