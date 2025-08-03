"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { getLocationNameInLanguage, getLocationAddressInLanguage } from "@/lib/locationsApi";

const LocationsTable = ({ locations, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const currentLanguageCode = lang === "ar" ? 1 : 2;

  const getContentInLanguage = (location) => {
    return getLocationNameInLanguage(location, currentLanguageCode);
  };

  const getAddressInLanguage = (location) => {
    return getLocationAddressInLanguage(location, currentLanguageCode);
  };

  const handleEdit = (location) => {
    router.push(`/admin/locations/edit/${location.Id}`);
  };

  const handleDelete = async (location) => {
    if (window.confirm(t("locations.deleteConfirm"))) {
      try {
        await onDelete(location.Id);
      } catch (error) {
        console.error("Failed to delete location:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="max-h-96 overflow-y-auto">
        <div className="grid gap-4">
          {locations.map((location) => (
            <div
              key={location.Id}
              className="bg-gray-50 rounded-lg p-4 border"
            >
              <div className={`flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""} space-x-4`}>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`flex items-center ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""} space-x-2`}>
                      <span className={`text-sm font-medium text-gray-500 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {t("locations.id")}:
                      </span>
                      <span className={`text-sm font-mono text-gray-900 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {location.Id}
                      </span>
                    </div>
                    <h3 className={`text-lg font-semibold text-gray-900 mt-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {getContentInLanguage(location)}
                    </h3>
                    {getAddressInLanguage(location) && (
                      <div className={`mt-2 flex items-start ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""} space-x-2`}>
                        <svg
                          className={`w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0 ${lang === "ar" ? "ml-1" : "mr-1"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className={`text-sm text-gray-600 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {getAddressInLanguage(location)}
                        </p>
                      </div>
                    )}
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {location.LocationCode}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {location.Translations?.length || 0} {t("locations.translations")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`flex ${lang === "ar" ? "flex-row-reverse space-x-reverse" : ""} space-x-2`}>
                  <button
                    onClick={() => handleEdit(location)}
                    className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${lang === "ar" ? "ml-1" : "mr-1"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    {t("locations.edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(location)}
                    className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${lang === "ar" ? "ml-1" : "mr-1"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {t("locations.delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationsTable; 