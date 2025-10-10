// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Header() {
//   return (
//     <header className='bg-white shadow'>
//       <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
//         <Link to='/' className='text-xl font-semibold'>
//           Vakio Boky
//         </Link>
//         <nav className='space-x-4'>
//           <Link to='/explore'>Explorer</Link>
//           <Link to='/marketplace'>Marketplace</Link>
//         </nav>
//       </div>
//     </header>
//   );
// }
//////////////////////////////////////////////////////////////////////////

// non connecte
import { FiSearch, FiBell, FiUser, FiBookOpen, FiShoppingCart, FiHome } from "react-icons/fi";
// import { FaShoppingCart, FaBookOpen, FaHome } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-100 border-b-4 border-blue-500 rounded-b-2xl shadow-md z-50">
      <nav className="flex items-center justify-between px-8 py-3">
        {/*nom sy logo */}
        <div className="flex items-center gap-3">
          {/* Gauche: Ity aloha tsy identique loatra @le maquette */}
          <div className="bg-blue-800 text-white rounded-lg px-3 py-2 text-center leading-tight">
            <span className="block font-bold text-sm">#Vakio_Boky</span>
            <span className="block text-xs font-light">Initiative</span>
          </div>
        </div>

        {/*centre*/}
        <div className="flex items-center gap-6 text-blue-900 font-mono">
          <a href="#" className="flex items-center gap-1 hover:text-blue-600">
            <FiHome className="text-blue-900" /> Accueil
          </a>

          {/* Barre de recherche */}
          <div className="flex items-center bg-white border border-blue-400 rounded-md px-2 py-1">
            <input
              type="text"
              placeholder="Rechercher..."
              className="outline-none text-sm w-40 bg-transparent placeholder:text-blue-400 text-blue-900"
            />
            <FiSearch className="text-blue-700 ml-2" />
          </div>

          <a href="#" className="flex items-center gap-1 hover:text-blue-600">
            <FiBookOpen className="text-blue-900" /> Bibliothèque
          </a>

          <a href="#" className="flex items-center gap-1 hover:text-blue-600">
            <FiShoppingCart className="text-blue-900" /> Marketplace
          </a>
        </div>

        {/* Droite */}
        <div className="flex items-center gap-4 text-blue-900">
          <a href="#" className="hover:text-blue-600">
            <FiBell size={20} />
          </a>
          <a href="#" className="hover:text-blue-600">
            <FiUser size={20} />
            {/* nataoko juste an'ito satria ilay icone @ maquette oatran hoe logout nefa vao tsy connecte le olona eto,
            a mon avis tokony icone pour connexion na inscription.  */}
          </a>
        </div>
      </nav>
    </header>
  );
}

// connecte: Rehefa gerer nny back @login de tokony code 1 ihany de arakaraka hoe connecte ve sa tsia de arakaraka
// header miseho

// import { FiSearch, FiBell, FiUser, FiSettings, FiHome, FiBookOpen, FiShoppingCart, FiCalendar, FiHeart } from "react-icons/fi";


// export default function Header() {
//   return (
//     <header className="fixed top-0 left-0 w-full bg-blue-100 border-b-4 border-blue-500 rounded-b-2xl shadow-md z-50">
//       <nav className="flex items-center justify-between px-8 py-3">
//
//         <div className="flex items-center gap-3">
//           <div className="bg-blue-800 text-white rounded-lg px-3 py-2 text-center leading-tight">
//             <span className="block font-bold text-sm">#Vakio_Boky</span>
//             <span className="block text-xs font-light">Connecté</span>
//           </div>
//         </div>

//
//         <div className="flex items-center gap-6 text-blue-900 font-mono">
//           <a href="#" className="flex items-center gap-1 hover:text-blue-600">
//             <FiHome className="text-blue-900" /> Accueil
//           </a>
//           <a href="#" className="flex items-center gap-1 hover:text-blue-600">
//             <FiBookOpen className="text-blue-900" /> Bibliothèque
//           </a>
//           <a href="#" className="flex items-center gap-1 hover:text-blue-600">
//             <FiShoppingCart className="text-blue-900" /> Marketplace
//           </a>
//           <a href="#" className="flex items-center gap-1 hover:text-blue-600">
//             <FiCalendar className="text-blue-900" /> Évenements
//           </a>
//           <a href="#" className="flex items-center gap-1 hover:text-blue-600">
//             <FiHeart className="text-blue-900" /> Dons
//           </a>
//         </div>

//
//         <div className="flex items-center gap-4 text-blue-900">
//           <a
//             href="#"
//             className="hover:text-blue-600 transition-transform transform hover:scale-110"
//           >
//             <FiSearch size={20} />
//           </a>
//           <a
//             href="#"
//             className="hover:text-blue-600 transition-transform transform hover:scale-110"
//           >
//             <FiBell size={20} />
//           </a>
//           <a
//             href="#"
//             className="hover:text-blue-600 transition-transform transform hover:scale-110"
//           >
//             <FiUser size={20} />
//           </a>
//           <a
//             href="#"
//             className="hover:text-blue-600 transition-transform transform hover:scale-110"
//           >
//             <FiSettings size={20} />
//           </a>
//         </div>
//       </nav>
//     </header>
//   );
// }
