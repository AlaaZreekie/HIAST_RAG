"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getResultTypeName, getAdmissionAcademicYear, getAdmissionProgramName, getAdmissionLocationName } from "@/lib/admissionResultsApi";
import FileViewer from "@/components/admin/media/FileViewer";

const AdmissionResultsTable = ({ results, onEditResult, onDeleteResult }) => {
  const { t, lang } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showFileViewer, setShowFileViewer] = useState(false);

  if (results.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-500">{t("admissionResults.noResults")}</p>
        </div>
      </div>
    );
  }

  const handleFileView = (media) => {
    setSelectedFile(media);
    setShowFileViewer(true);
  };

  const closeFileViewer = () => {
    setShowFileViewer(false);
    setSelectedFile(null);
  };

  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className={`text-lg font-medium text-gray-900 ${
            lang === "ar" ? "text-right" : "text-left"
          }`}>
            {t("admissionResults.title")} ({results.length})
          </h3>
        </div>

        {/* Scrollable Results Container */}
        <div className="max-h-96 overflow-y-auto">
          <div className="divide-y divide-gray-200">
            {results.map((result) => {
              const resultTypeName = getResultTypeName(result.ResultType);
              const academicYear = getAdmissionAcademicYear(result.Admission);
              const programName = getAdmissionProgramName(result.Admission);
              const locationName = getAdmissionLocationName(result.Admission);
              
              return (
                <div key={result.Id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className={`flex justify-between items-start ${
                    lang === "ar" ? "flex-row-reverse" : "flex-row"
                  }`}>
                    {/* Result Info */}
                    <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className={`flex items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                        {/* File Icon */}
                        <div className={`flex-shrink-0 ${lang === "ar" ? "ml-4" : "mr-4"}`}>
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            {result.Media ? (
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            )}
                          </div>
                        </div>
                        
                        {/* Result Content */}
                        <div className="flex-1 min-w-0">
                          <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"} space-x-2 mb-2`}>
                            <span className={`text-sm font-medium text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
                              {t("admissionResults.id")}:
                            </span>
                            <span className="text-sm font-mono text-gray-900">{result.Id}</span>
                          </div>
                          
                          <h4 className={`text-lg font-medium text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            {resultTypeName}
                          </h4>
                          
                          {/* Admission Info */}
                          <div className={`space-y-1 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                            <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                              <span className={`text-sm text-gray-500 ${lang === "ar" ? "ml-2" : "mr-2"}`}>
                                {t("admissionResults.academicYear")}:
                              </span>
                              <span className="text-sm text-gray-700">{academicYear}</span>
                            </div>
                            
                            <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                              <span className={`text-sm text-gray-500 ${lang === "ar" ? "ml-2" : "mr-2"}`}>
                                {t("admissionResults.program")}:
                              </span>
                              <span className="text-sm text-gray-700">{programName}</span>
                            </div>
                            
                            <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                              <span className={`text-sm text-gray-500 ${lang === "ar" ? "ml-2" : "mr-2"}`}>
                                {t("admissionResults.location")}:
                              </span>
                              <span className="text-sm text-gray-700">{locationName}</span>
                            </div>
                          </div>
                          
                          {/* File Actions */}
                          {result.Media && (
                            <div className={`flex items-center space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                              <button
                                onClick={() => handleFileView(result.Media)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                {t("admissionResults.viewFile")}
                              </button>
                              <a
                                href={`${process.env.NEXT_PUBLIC_API_URL}/wwwroot/${result.Media.FilePath}`}
                                download
                                className="text-green-600 hover:text-green-800 text-sm font-medium"
                              >
                                {t("admissionResults.downloadFile")}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Admin Actions */}
                    <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                      <button
                        onClick={() => onEditResult(result.Id)}
                        className={`text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {t("admissionResults.edit")}
                      </button>
                      <button
                        onClick={() => onDeleteResult(result.Id)}
                        className={`text-red-600 hover:text-red-900 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          lang === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {t("admissionResults.delete")}
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
      {showFileViewer && selectedFile && (
        <FileViewer
          file={selectedFile}
          onClose={closeFileViewer}
        />
      )}
    </>
  );
};

export default AdmissionResultsTable; 