import { apiRequest } from "./api";

const booksApiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  return apiRequest(`/admin/books/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const booksAPI = {
  getAllBooks: async () => {
    return booksApiRequest("GetAllBooks");
  },

  createBook: async (bookData) => {
    return booksApiRequest("CreateBook", {
      method: "POST",
      body: bookData, // FormData for file upload
    });
  },

  updateBook: async (bookData) => {
    return booksApiRequest("UpdateBook", {
      method: "PUT",
      body: JSON.stringify(bookData),
    });
  },

  deleteBook: async (bookId) => {
    return booksApiRequest("DeleteBook", {
      method: "DELETE",
      body: JSON.stringify({ Id: bookId }),
    });
  },

  addBookTranslation: async (translationData) => {
    return booksApiRequest("AddBookTranslation", {
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

    return booksApiRequest(`GetByFilter?${queryParams.toString()}`);
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
