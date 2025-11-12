import React from 'react';
import SearchBar from '../../components/book_component/SearchBar';
import BooksContainer from '../../components/book_component/Books_container';

export default function Explore() {
  return (
    <section className="p-5">
      <SearchBar />
      <BooksContainer />
    </section>
  );
}
