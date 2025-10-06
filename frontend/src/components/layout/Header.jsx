import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link to='/' className='text-xl font-semibold'>
          Vakio Boky
        </Link>
        <nav className='space-x-4'>
          <Link to='/explore'>Explorer</Link>
          <Link to='/marketplace'>Marketplace</Link>
        </nav>
      </div>
    </header>
  );
}
