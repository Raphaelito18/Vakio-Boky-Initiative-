import React from 'react';
import { FiDownload } from 'react-icons/fi';

export default function BookCard({
  category = "Livre Populaire",
  title = "Titre du livre",
  coverImage,
  language = "Inconnu",
  publicationDate = "N/A",
  author = "Inconnu",
  theme = "Inconnu",
  downloadLink = "#"
}) {
  return (
    <div className='card border-slate-300 hover:-translate-y-2 transition duration-300 border rounded shadow-sm hover:shadow-md '>
      {/* Header */}
      <div className="card-header">
        <p className='text-center bg-slate-300 p-3'>{category}</p>
      </div>

      {/* Body */}
      <div className="card-body px-5">
        <p className='book-title text-center text-sm p-4 text-blue-800'>
          {title}
        </p>

        <div className="image-container flex gap-5">
          <div className="w-48 h-64 flex-shrink-0">
            {coverImage && (
              <img
                className='w-full h-full object-contain rounded'
                src={coverImage}
                alt="cover_image"
              />
            )}
          </div>

          <div className='book-description text-sm flex-1'>
            <p className='text-blue-800'>Langue Originale</p>
            <p className='text-center'>{language}</p>

            <p className='text-blue-800 mt-2'>Date de publication</p>
            <p className='text-center'>{publicationDate}</p>

            <p className='text-blue-800 mt-2'>Auteur</p>
            <p className='text-center'>{author}</p>

            <p className='text-blue-800 mt-2'>Theme</p>
            <p className='text-center'>{theme}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer flex justify-end p-2">
        <a className='border-slate-300 rounded border p-3 hover:bg-gray-100 transition-colors' href={downloadLink}>
          <FiDownload />
        </a>
      </div>
    </div>
  );
}
