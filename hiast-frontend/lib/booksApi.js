import { apiRequest } from "./api";

export const booksAPI = {
  getAllBooks: () => apiRequest("/admin/books/GetAllBooks"),
  createBook: (bookData) =>
    apiRequest("/admin/books/CreateBook", { method: "POST", body: bookData }),
  updateBook: (bookId, bookData) =>
    apiRequest(`/admin/books/UpdateBook/${bookId}`, {
      method: "PUT",
      body: bookData,
    }),
  deleteBook: (bookId) =>
    apiRequest(`/admin/books/DeleteBook/${bookId}`, { method: "DELETE" }),
};

// Helper functions
export const getAllBooks = async () => {
  try {
    return await booksAPI.getAllBooks();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getBookById = async (bookId) => {
  try {
    const books = await getAllBooks();
    return books.find((book) => book.Id === bookId);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};

export const getBookNameInLanguage = (book, languageCode) => {
  if (!book.Translations || !Array.isArray(book.Translations)) return "N/A";
  const translation = book.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Name || "N/A";
};

export const getBookDescriptionInLanguage = (book, languageCode) => {
  if (!book.Translations || !Array.isArray(book.Translations)) return "N/A";
  const translation = book.Translations.find(
    (t) => t.LanguageCode === languageCode
  );
  return translation?.Description || "N/A";
};

export const getBookTranslations = (book) => {
  return book.Translations || [];
};
