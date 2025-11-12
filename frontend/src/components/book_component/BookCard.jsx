import React from 'react';
import { FiDownload } from 'react-icons/fi';
import CoverImage from '../../../public/assets/images/1.jpg';

export default function BookCard() {
  return (
    <div className='card border-slate-300 border rounded hover:-translate-y-1 transition duration-200 '>
      {/* card-header */}
      <div className="card-header">
        <p className='text-center bg-slate-300 p-3'>Livre Populaire</p>
      </div>

      {/* card-body */}
      <div className="card-body px-5">
        <p className='book-title text-center text-sm p-4 text-blue-800'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, numquam!
        </p>
        <div className="image-container flex gap-5">
          <div>
            <img className='w-48' src={CoverImage} alt="cover_image" />
          </div>
          <div className='book-description text-sm'>
            <p className='text-blue-800'>Langue Originale</p>
            <p className='text-center'>Anglais</p>
            <p className='text-blue-800'>Date de publication</p>
            <p className='text-center'>10 Sept 2025</p>
            <p className='text-blue-800'>Auteur</p>
            <p className='text-center'>Julie Soto</p>
            <p className='text-blue-800'>Theme</p>
            <p className='text-center'>Romance</p>
          </div>
        </div>
      </div>

      {/* card-footer */}
      <div className="card-footer flex justify-end p-2">
        <a className='border-slate-300 rounded border p-3' href="">
          <FiDownload />
        </a>
      </div>
    </div>
  );
}
