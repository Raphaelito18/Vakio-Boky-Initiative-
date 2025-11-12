import React from 'react';
import BookCard from './BookCard';

export default function BooksContainer() {
  return (
    <div className="books-container gap-10 py-2 grid grid-cols-1  sm:grid-cols-3">
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  );
}
