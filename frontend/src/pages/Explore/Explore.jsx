import React, { useState } from 'react';
import SearchBar from '../../components/book_component/SearchBar';
import BooksContainer from '../../components/book_component/BooksContainer';
import booksData from '../../components/book_component/booksData';

export default function Explore() {
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBooks(booksData);
      return;
    }

    const filtered = booksData.filter(book =>
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <section className="p-5">
      <SearchBar onSearch={handleSearch} />
      
      {filteredBooks.length > 0 ? (
        <BooksContainer books={filteredBooks} />
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          Aucun livre trouvé
        </p>
      )}
    </section>
  );
}
