"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import FileViewer from "./FileViewer";

const MediaTable = ({ mediaFiles, onEditMedia, onDeleteMedia }) => {
  const { t, lang } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);

  const BACKEND_BASE_URL = "http://localhost:5007";

  if (mediaFiles.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-500">{t("media.noFiles")}</p>
        </div>
      </div>
    );
  }

  const getFileTypeIcon = (fileName) => {
    const extension = fileName?.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension)) {
      return (
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (["mp4", "avi", "mov", "wmv", "flv"].includes(extension)) {
      return (
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      );
    } else if (["pdf"].includes(extension)) {
      return (
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-8 h-8 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    }
  };

  const getCategoryNameInLanguage = (category, languageCode) => {
    if (!category?.Translations) return category?.Name || "Unknown";
    const translation = category.Translations.find(
      (t) => t.LanguageCode === languageCode
    );
    return translation?.Name || category?.Name || "Unknown";
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    // Construct the full URL to the file in wwwroot
    return `${BACKEND_BASE_URL}${filePath}`;
  };

  const isImageFile = (fileName) => {
    const extension = fileName?.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension);
  };

  const isVideoFile = (fileName) => {
    const extension = fileName?.split(".").pop()?.toLowerCase();
    return ["mp4", "avi", "mov", "wmv", "flv"].includes(extension);
  };

  const isPdfFile = (fileName) => {
    const extension = fileName?.split(".").pop()?.toLowerCase();
    return ["pdf"].includes(extension);
  };

  const handleDownload = (media) => {
    const fileUrl = getFileUrl(media.FilePath);
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = media.FileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = (media) => {
    setSelectedFile(media);
  };

  const closeFileViewer = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3
            className={`text-lg font-medium text-gray-900 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("media.title")} ({mediaFiles.length})
          </h3>
        </div>

        {/* Scrollable Media Container - Max 3 files visible */}
        <div className="max-h-96 overflow-y-auto">
          <div className="divide-y divide-gray-200">
            {mediaFiles.map((media) => {
              const categoryName = media.MediaCategory
                ? getCategoryNameInLanguage(
                    media.MediaCategory,
                    lang === "ar" ? 1 : 2
                  )
                : t("media.noCategory");

              const fileUrl = getFileUrl(media.FilePath);

              return (
                <div
                  key={media.Id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`flex justify-between items-start ${
                      lang === "ar" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Media Info */}
                    <div
                      className={`flex-1 ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`flex items-center mb-2 ${
                          lang === "ar" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div className={lang === "ar" ? "ml-3" : "mr-3"}>
                          {getFileTypeIcon(media.FileName)}
                        </div>
                        <div>
                          <h4
                            className={`text-lg font-medium text-gray-900 ${
                              lang === "ar" ? "text-right" : "text-left"
                            }`}
                          >
                            {media.FileName || t("media.noName")}
                          </h4>
                          <p
                            className={`text-sm text-gray-500 ${
                              lang === "ar" ? "text-right" : "text-left"
                            }`}
                          >
                            {media.FileType || "Unknown file type"}
                          </p>
                        </div>
                      </div>

                      {/* File Preview (for images) */}
                      {isImageFile(media.FileName) && fileUrl && (
                        <div className="mb-3">
                          <img
                            src={fileUrl}
                            alt={media.FileName}
                            className="max-w-xs max-h-32 object-contain border rounded shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleView(media)}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}

                      {/* Video Preview (for videos) */}
                      {isVideoFile(media.FileName) && fileUrl && (
                        <div className="mb-3">
                          <video
                            className="max-w-xs max-h-32 border rounded shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleView(media)}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          >
                            <source src={fileUrl} type={media.FileType} />
                            {t("media.videoNotSupported")}
                          </video>
                        </div>
                      )}

                      {/* File Details */}
                      <div
                        className={`flex flex-wrap gap-4 text-xs text-gray-500 mb-3 ${
                          lang === "ar" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <span>
                          {t("media.type")}: {media.FileType || "Unknown"}
                        </span>
                        <span>
                          {t("media.category")}: {categoryName}
                        </span>
                      </div>

                      {/* File Actions */}
                      {fileUrl && (
                        <div
                          className={`flex gap-2 ${
                            lang === "ar" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <button
                            onClick={() => handleView(media)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
                          >
                            <svg
                              className={`w-3 h-3 ${
                                lang === "ar" ? "ml-1" : "mr-1"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            {t("media.view")}
                          </button>
                          <button
                            onClick={() => handleDownload(media)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                          >
                            <svg
                              className={`w-3 h-3 ${
                                lang === "ar" ? "ml-1" : "mr-1"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            {t("media.download")}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Admin Actions */}
                    <div
                      className={`flex space-x-2 ${
                        lang === "ar"
                          ? "flex-row-reverse space-x-reverse"
                          : "flex-row"
                      }`}
                    >
                      <button
                        onClick={() => onEditMedia(media.Id)}
                        className={`text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {t("media.edit")}
                      </button>
                      <button
                        onClick={() => onDeleteMedia(media.Id)}
                        className={`text-red-600 hover:text-red-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {t("media.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* File Viewer Modal */}
      {selectedFile && (
        <FileViewer file={selectedFile} onClose={closeFileViewer} />
      )}
    </>
  );
};

export default MediaTable;
