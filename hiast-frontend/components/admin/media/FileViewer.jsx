"use client";
import { useLanguage } from "@/components/LanguageProvider";

const FileViewer = ({ file, onClose }) => {
  const { t, lang } = useLanguage();
  
  // Backend base URL for static files (without /api)
  const BACKEND_BASE_URL = "https://localhost:7187";

  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    return `${BACKEND_BASE_URL}${filePath}`;
  };

  const isImageFile = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension);
  };

  const isVideoFile = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    return ['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(extension);
  };

  const isPdfFile = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    return ['pdf'].includes(extension);
  };

  const handleDownload = () => {
    const fileUrl = getFileUrl(file.FilePath);
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = file.FileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const fileUrl = getFileUrl(file.FilePath);

  if (!file || !fileUrl) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <p className="text-gray-500">{t("media.fileNotFound")}</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {t("media.close")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className={`text-lg font-medium text-gray-900 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}>
            {file.FileName}
          </h3>
          <div className={`flex gap-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t("media.download")}
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t("media.close")}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
          {/* Image Viewer */}
          {isImageFile(file.FileName) && (
            <div className="flex justify-center">
              <img 
                src={fileUrl} 
                alt={file.FileName}
                className="max-w-full max-h-[70vh] object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-center text-gray-500">
                <p>{t("media.imageLoadError")}</p>
              </div>
            </div>
          )}

          {/* Video Viewer */}
          {isVideoFile(file.FileName) && (
            <div className="flex justify-center">
              <video 
                controls 
                className="max-w-full max-h-[70vh]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              >
                <source src={fileUrl} type={file.FileType} />
                {t("media.videoNotSupported")}
              </video>
              <div className="hidden text-center text-gray-500">
                <p>{t("media.videoLoadError")}</p>
              </div>
            </div>
          )}

          {/* PDF Viewer */}
          {isPdfFile(file.FileName) && (
            <div className="flex justify-center">
              <iframe
                src={fileUrl}
                className="w-full h-[70vh] border"
                title={file.FileName}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-center text-gray-500">
                <p>{t("media.pdfLoadError")}</p>
                <a 
                  href={fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t("media.openInNewTab")}
                </a>
              </div>
            </div>
          )}

          {/* Generic File Viewer */}
          {!isImageFile(file.FileName) && !isVideoFile(file.FileName) && !isPdfFile(file.FileName) && (
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">{t("media.fileTypeNotSupported")}</p>
              <a 
                href={fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {t("media.openInNewTab")}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileViewer; 