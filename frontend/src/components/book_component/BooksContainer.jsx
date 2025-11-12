import React from 'react';
import BookCard from './BookCard';

export default function BooksContainer() {
  return (
    <div className="books-container gap-6 grid grid-cols-1  md:grid-cols-3">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  );
}
