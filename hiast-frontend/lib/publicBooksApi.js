import { serverApiRequest } from "./api";

const publicBooksApiRequest = async (endpoint, options = {}) => {
  return serverApiRequest(`/user/books/${endpoint}`, options);
};

export const booksAPI = {
  getAllBooks: async () => {
    return publicBooksApiRequest("GetAllBooks");
  },

  createBook: async (bookData) => {
    return publicBooksApiRequest("CreateBook", {
      method: "POST",
      body: bookData, // FormData for file upload
    });
  },

  updateBook: async (bookData) => {
    return publicBooksApiRequest("UpdateBook", {
      method: "PUT",
      body: JSON.stringify(bookData),
    });
  },

  deleteBook: async (bookId) => {
    return publicBooksApiRequest("DeleteBook", {
      method: "DELETE",
      body: JSON.stringify({ Id: bookId }),
    });
  },

  addBookTranslation: async (translationData) => {
    return publicBooksApiRequest("AddBookTranslation", {
      method: "POST",
      body: JSON.stringify(translationData),
    });
  },

  getByFilter: async (filter) => {
    const queryParams = new URLSearchParams();
    if (filter.Id) queryParams.append("Id", filter.Id);
    if (filter.Title) queryParams.append("Title", filter.Title);
    if (filter.Author) queryParams.append("Author", filter.Author);
    if (filter.ISBN) queryParams.append("ISBN", filter.ISBN);
    if (filter.PublicationYear)
      queryParams.append("PublicationYear", filter.PublicationYear);

    return publicBooksApiRequest(`GetByFilter?${queryParams.toString()}`);
  },
};

// Helper functions
export const getAllBooks = async () => {
  try {
    const response = await booksAPI.getAllBooks();
    const data = response.Data || [];
    return Array.isArray(data) ? data : [];
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
