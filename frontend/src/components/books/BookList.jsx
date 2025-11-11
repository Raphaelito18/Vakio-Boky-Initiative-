import React, { useState, useEffect } from "react";
import { useBooks } from "../../hooks/useBooks.jsx";

import BookCard from "./BookCard.jsx";
import BookForm from "./BookForm.jsx";

const BookList = () => {
  const {
    books,
    myBooks,
    loading,
    error,
    fetchBooks,
    fetchMyBooks,
    createBook,
    updateBook,
    deleteBook,
    clearError,
  } = useBooks();

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [activeTab, setActiveTab] = useState("public");

  useEffect(() => {
    loadBooks();
  }, [activeTab]);

  const loadBooks = async () => {
    try {
      if (activeTab === "public") {
        await fetchBooks();
      } else {
        await fetchMyBooks();
      }
    } catch (err) {}
  };

  const handleCreateBook = async (bookData) => {
    try {
      await createBook(bookData);
      setShowForm(false);
      loadBooks();
    } catch (err) {}
  };

  const handleUpdateBook = async (bookData) => {
    try {
      await updateBook(editingBook.id, bookData);
      setEditingBook(null);
      loadBooks();
    } catch (err) {}
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
      try {
        await deleteBook(id);
        loadBooks();
      } catch (err) {}
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const currentBooks = activeTab === "public" ? books : myBooks;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Livres</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Nouveau Livre
        </button>
      </div>

      {/* Navigation par onglets */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "public"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("public")}
        >
          Livres Publiés
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "mes-livres"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("mes-livres")}
        >
          Mes Livres
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {(showForm || editingBook) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BookForm
              book={editingBook}
              onSubmit={editingBook ? handleUpdateBook : handleCreateBook}
              onCancel={() => {
                setShowForm(false);
                setEditingBook(null);
              }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Chargement...</div>
        </div>
      ) : currentBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {activeTab === "public"
              ? "Aucun livre publié trouvé"
              : "Vous n'avez pas encore créé de livres"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDeleteBook}
              showActions={activeTab === "mes-livres"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
