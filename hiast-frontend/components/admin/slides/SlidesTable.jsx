"use client";
import { useLanguage } from "@/components/LanguageProvider";

const SlidesTable = ({ slides, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-h-96 overflow-y-auto">
          {slides.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t("slides.noSlides")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {slides.map((slide) => (
                <div key={slide.Id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className={`flex justify-between items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className={`flex items-center space-x-3 mb-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                        <span className="text-sm font-medium text-gray-500">
                          ID: {slide.Id}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Order: {slide.DisplayOrder || 0}
                        </span>
                      </div>
                      
                      <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        {slide.Translations?.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2))?.Title || "N/A"}
                      </h3>
                      
                      <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                        <p>{slide.LinkURL || "N/A"}</p>
                      </div>
                      
                      {slide.Media?.FilePath && (
                        <div className="mb-3">
                          <img 
                            src={slide.Media.FilePath} 
                            alt={slide.Translations?.find(t => t.LanguageCode === (lang === "ar" ? 1 : 2))?.Title || "Slide"}
                            className="w-32 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex space-x-2 ${lang === "ar" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                      <button
                        onClick={() => onEdit(slide.Id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        onClick={() => onDelete(slide.Id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        {t("common.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlidesTable; 