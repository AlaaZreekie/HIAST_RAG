"use client";
import { useLanguage } from "@/components/LanguageProvider";

const BooksTable = ({ books, onEdit, onDelete }) => {
  const { t, lang } = useLanguage();

  const getBookNameInLanguage = (book, languageCode = "en") => {
    if (!book || !book.Translations) return "N/A";
    const langCode = languagePref === "ar" ? 1 : languagePref === "en" ? 2 : languagePref;
    const translation = book.Translations.find(
      (t) => t.LanguageCode === langCode || t.LanguageName?.toLowerCase().includes(String(languagePref).toLowerCase())
    );

    return translation?.Name || "N/A";
  };

  const getBookDescriptionInLanguage = (book, languagePref = "en") => {
    if (!book || !book.Translations) return "N/A";
    const langCode = languagePref === "ar" ? 1 : languagePref === "en" ? 2 : languagePref;
    const translation = book.Translations.find(
      (t) => t.LanguageCode === langCode || t.LanguageName?.toLowerCase().includes(String(languagePref).toLowerCase())
    );
    return translation?.Description || "N/A";
  };

  if (!books || books.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">{t("books.noBooks")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {books.map((book) => (
              <div
                key={book.Id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className={`flex justify-between items-start ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="flex-1">
                    <div className={`flex items-center space-x-3 mb-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                      <span className="text-sm font-medium text-gray-500">
                        ID: {book.Id}
                      </span>
                      {book?.BookFile?.FilePath && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {t("books.hasFile")}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {getBookNameInLanguage(book, lang === "ar" ? "ar" : "en")}
                    </h3>

                    <div className={`text-sm text-gray-600 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <p className="mb-2">
                        {getBookDescriptionInLanguage(book, lang === "ar" ? "ar" : "en")}
                      </p>
                      
                      {book.Translations && book.Translations.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium mb-1">{t("books.translations")}:</p>
                          <div className="space-y-1">
                            {book.Translations.map((translation, index) => (
                              <p key={index} className="text-xs">
                                {translation.LanguageName}: {translation.Title}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`flex space-x-2 ${lang === "ar" ? "space-x-reverse" : ""}`}>
                    <button
                      onClick={() => onEdit(book.Id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      {t("common.edit")}
                    </button>
                    <button
                      onClick={() => onDelete(book.Id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      {t("common.delete")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksTable; 