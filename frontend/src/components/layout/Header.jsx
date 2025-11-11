// // import { useState } from 'react';
// // import {
// //   FiBell,
// //   FiUser,
// //   FiBookOpen,
// //   FiShoppingCart,
// //   FiHome,
// //   FiCalendar,
// //   FiHeart,
// //   FiLogOut,
// // } from 'react-icons/fi';
// // import { motion } from 'framer-motion';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import Button from '@/components/ui/Button';
// // import Input from '../ui/Input';
// // import { useAuth } from '../../hooks/useAuth'; 

// // import NotificationBell from "../../components/clubs/NotificationBell";

// // export default function Header() {
// //   const [search, setSearch] = useState('');
// //   const [showUserMenu, setShowUserMenu] = useState(false);
  
// //   const { user, logout } = useAuth(); 
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   // Fonction pour déterminer si on est sur une page d'auth
// //   const isAuthPage = () => {
// //     return ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password']
// //       .includes(location.pathname);
// //   };

// //   // Vérification de connexion
// //   const isLoggedIn = !!user?.token && !isAuthPage();

// //   // ✅ FONCTION DE REDIRECTION INTELLIGENTE
// //   const handleProtectedNavigation = (targetPath) => {
// //     if (isLoggedIn) {
// //       // Si connecté, aller directement à la page
// //       navigate(targetPath);
// //     } else {
// //       // Si non connecté, aller vers login avec redirection
// //       navigate('/login', { 
// //         state: { 
// //           from: targetPath,
// //           message: 'Connectez-vous pour accéder à cette page' 
// //         } 
// //       });
// //     }
// //   };

// //   // déconnexion
// //   const handleLogout = () => {
// //     logout();
// //     setShowUserMenu(false);
// //     navigate('/');
// //   };

// //   // profil
// //   const handleProfile = () => {
// //     setShowUserMenu(false);
// //     navigate('/profile');
// //   };

// //   // Si on est sur une page d'auth, on cache le header complet
// //   if (isAuthPage()) {
// //     return null;
// //   }

// //   return (
// //     <header className='fixed top-0 left-0 w-full bg-blue-100 border-b-4 border-blue-500/50 backdrop-blur-sm rounded-b-2xl shadow-md z-50'>
// //       <nav className='flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2 md:gap-0'>
        
// //         {/* Logo - Toujours visible */}
// //         <div className='flex items-center gap-3'>
// //           <Link to="/">
// //             <motion.div 
// //               whileHover={{ scale: 1.05 }}
// //               className='bg-blue-800 text-white rounded-lg px-3 py-2 text-center leading-tight cursor-pointer'
// //             >
// //               <span className='block font-bold text-sm'>#Vakio_Boky</span>
// //               <span className='block text-xs font-light'>
// //                 {isLoggedIn ? 'Connecté' : 'Initiative'}
// //               </span>
// //             </motion.div>
// //           </Link>
// //         </div>

// //         {/* Navigation centrale */}
// //         <div className='flex flex-1 items-center flex-wrap justify-center gap-4 md:gap-6 text-blue-900 font-mono'>
          
// //           {/* Accueil - Toujours accessible */}
// //           <Link to="/">
// //             <motion.div
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //               className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
// //             >
// //               <FiHome /> Accueil
// //             </motion.div>
// //           </Link>

// //           {/* Barre de recherche - Toujours visible */}
// //           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
// //             <Input
// //               variant='primary'
// //               size='lg'
// //               placeholder='Rechercher des livres...'
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //             />
// //           </motion.div>

// //           {/* ✅ Explore - Redirection intelligente */}
// //           <motion.div
// //             whileHover={{ scale: 1.1 }}
// //             whileTap={{ scale: 0.95 }}
// //             onClick={() => handleProtectedNavigation('/explore')}
// //             className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
// //           >
// //             <FiBookOpen /> Explorer
// //           </motion.div>

// //           {/* ✅ Marketplace - Redirection intelligente */}
// //           <motion.div
// //             whileHover={{ scale: 1.1 }}
// //             whileTap={{ scale: 0.95 }}
// //             onClick={() => handleProtectedNavigation('/marketplace')}
// //             className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
// //           >
// //             <FiShoppingCart /> Marketplace
// //           </motion.div>

// //           {/* Éléments SEULEMENT pour utilisateurs connectés */}
// //           {isLoggedIn && (
// //             <>
// //               {/* Événements - Déjà protégé par isLoggedIn */}
// //               <motion.div
// //                 whileHover={{ scale: 1.1 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => navigate('/evenements')}
// //                 className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
// //               >
// //                 <FiCalendar /> Événements
// //               </motion.div>

// //               {/* Dons - Déjà protégé par isLoggedIn */}
// //               <motion.div
// //                 whileHover={{ scale: 1.1 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 onClick={() => navigate('/dons')}
// //                 className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
// //               >
// //                 <FiHeart /> Dons
// //               </motion.div>
// //             </>
// //           )}
// //         </div>

// //         {/* Section utilisateur */}
// //         <div className='flex items-center gap-4 text-blue-900'>
          
// //           {/* Notification - SEULEMENT si connecté */}
// //           {isLoggedIn && (
// //             <motion.div
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //               className='cursor-pointer'
// //             >
// //               {/* <FiBell size={20}  /> */}
// //                <NotificationBell />
// //             </motion.div>
// //           )}

// //           {/* Menu Utilisateur */}
// //           <div className='relative'>
// //             {isLoggedIn ? (
// //               /* ✅ UTILISATEUR CONNECTÉ */
// //               <>
// //                 <motion.button
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   onClick={() => setShowUserMenu(!showUserMenu)}
// //                   className='flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors'
// //                 >
// //                   <div className='w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center text-sm font-bold'>
// //                     {user.nom?.charAt(0) || user.user?.nom?.charAt(0) || 'U'}
// //                   </div>
// //                   <span className='text-sm'>
// //                     {user.nom || user.user?.nom || 'Utilisateur'}
// //                   </span>
// //                 </motion.button>

// //                 {/* Menu déroulant */}
// //                 {showUserMenu && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'
// //                   >
// //                     <button
// //                       onClick={handleProfile}
// //                       className='flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left'
// //                     >
// //                       <FiUser size={16} />
// //                       Mon Profil
// //                     </button>
                    
// //                     <div className='border-t border-gray-200 my-1'></div>
                    
// //                     <button
// //                       onClick={handleLogout}
// //                       className='flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left'
// //                     >
// //                       <FiLogOut size={16} />
// //                       Déconnexion
// //                     </button>
// //                   </motion.div>
// //                 )}
// //               </>
// //             ) : (
// //               /* ✅ UTILISATEUR NON CONNECTÉ */
// //               <Link to="/login">
// //                 <Button variant='primary' size='sm'>
// //                   Se connecter
// //                 </Button>
// //               </Link>
// //             )}
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Overlay pour fermer le menu */}
// //       {showUserMenu && (
// //         <div 
// //           className='fixed inset-0 z-40' 
// //           onClick={() => setShowUserMenu(false)}
// //         />
// //       )}
// //     </header>
// //   );
// // }
// import { useState } from 'react';
// import {
//   FiBell,
//   FiUser,
//   FiBookOpen,
//   FiShoppingCart,
//   FiHome,
//   FiCalendar,
//   FiHeart,
//   FiLogOut,
//   FiSettings, // ✅ AJOUTER CETTE ICÔNE
// } from 'react-icons/fi';
// import { motion } from 'framer-motion';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import Button from '@/components/ui/Button';
// import Input from '../ui/Input';
// import { useAuth } from '../../hooks/useAuth'; 

// import NotificationBell from "../../components/clubs/NotificationBell";

// export default function Header() {
//   const [search, setSearch] = useState('');
//   const [showUserMenu, setShowUserMenu] = useState(false);
  
//   const { user, logout } = useAuth(); 
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ DEBUG - Voir la structure de l'user
//   console.log('🔍 Header - User object:', user);
//   console.log('🔍 Header - User role:', user?.role);
//   console.log('🔍 Header - User keys:', user ? Object.keys(user) : 'No user');

//   // Fonction pour déterminer si on est sur une page d'auth
//   const isAuthPage = () => {
//     return ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password']
//       .includes(location.pathname);
//   };

//   // Vérification de connexion
//   const isLoggedIn = !!user?.token && !isAuthPage();

//   // ✅ VÉRIFIER SI ADMIN (avec plusieurs structures possibles)
//   const isAdmin = user?.role === 'admin' || user?.user?.role === 'admin';

//   // ✅ FONCTION DE REDIRECTION INTELLIGENTE
//   const handleProtectedNavigation = (targetPath) => {
//     if (isLoggedIn) {
//       // Si connecté, aller directement à la page
//       navigate(targetPath);
//     } else {
//       // Si non connecté, aller vers login avec redirection
//       navigate('/login', { 
//         state: { 
//           from: targetPath,
//           message: 'Connectez-vous pour accéder à cette page' 
//         } 
//       });
//     }
//   };

//   // déconnexion
//   const handleLogout = () => {
//     logout();
//     setShowUserMenu(false);
//     navigate('/');
//   };

//   // profil
//   const handleProfile = () => {
//     setShowUserMenu(false);
//     navigate('/profile');
//   };

//   // admin
//   const handleAdmin = () => {
//     setShowUserMenu(false);
//     navigate('/admin/marketplace');
//   };

//   // Si on est sur une page d'auth, on cache le header complet
//   if (isAuthPage()) {
//     return null;
//   }

//   return (
//     <header className='fixed top-0 left-0 w-full bg-blue-100 border-b-4 border-blue-500/50 backdrop-blur-sm rounded-b-2xl shadow-md z-50'>
//       <nav className='flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2 md:gap-0'>
        
//         {/* Logo - Toujours visible */}
//         <div className='flex items-center gap-3'>
//           <Link to="/">
//             <motion.div 
//               whileHover={{ scale: 1.05 }}
//               className='bg-blue-800 text-white rounded-lg px-3 py-2 text-center leading-tight cursor-pointer'
//             >
//               <span className='block font-bold text-sm'>#Vakio_Boky</span>
//               <span className='block text-xs font-light'>
//                 {isLoggedIn ? 'Connecté' : 'Initiative'}
//               </span>
//             </motion.div>
//           </Link>
//         </div>

//         {/* Navigation centrale */}
//         <div className='flex flex-1 items-center flex-wrap justify-center gap-4 md:gap-6 text-blue-900 font-mono'>
          
//           {/* Accueil - Toujours accessible */}
//           <Link to="/">
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
//             >
//               <FiHome /> Accueil
//             </motion.div>
//           </Link>

//           {/* Barre de recherche - Toujours visible */}
//           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//             <Input
//               variant='primary'
//               size='lg'
//               placeholder='Rechercher des livres...'
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </motion.div>

//           {/* ✅ Explore - Redirection intelligente */}
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => handleProtectedNavigation('/explore')}
//             className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
//           >
//             <FiBookOpen /> Explorer
//           </motion.div>

//           {/* ✅ Marketplace - Redirection intelligente */}
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => handleProtectedNavigation('/marketplace')}
//             className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
//           >
//             <FiShoppingCart /> Marketplace
//           </motion.div>

//           {/* Éléments SEULEMENT pour utilisateurs connectés */}
//           {isLoggedIn && (
//             <>
//               {/* Événements - Déjà protégé par isLoggedIn */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/evenements')}
//                 className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
//               >
//                 <FiCalendar /> Événements
//               </motion.div>

//               {/* Dons - Déjà protégé par isLoggedIn */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/dons')}
//                 className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
//               >
//                 <FiHeart /> Dons
//               </motion.div>
//             </>
//           )}
//         </div>

//         {/* Section utilisateur */}
//         <div className='flex items-center gap-4 text-blue-900'>
          
//           {/* Notification - SEULEMENT si connecté */}
//           {isLoggedIn && (
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className='cursor-pointer'
//             >
//               <NotificationBell />
//             </motion.div>
//           )}

//           {/* Menu Utilisateur */}
//           <div className='relative'>
//             {isLoggedIn ? (
//               /* ✅ UTILISATEUR CONNECTÉ */
//               <>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className='flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors'
//                 >
//                   <div className='w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center text-sm font-bold'>
//                     {user.nom?.charAt(0) || user.user?.nom?.charAt(0) || 'U'}
//                   </div>
//                   <span className='text-sm'>
//                     {user.nom || user.user?.nom || 'Utilisateur'}
//                     {isAdmin && ' 👑'} {/* ✅ Indicateur admin */}
//                   </span>
//                 </motion.button>

//                 {/* Menu déroulant */}
//                 {showUserMenu && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'
//                   >
//                     <button
//                       onClick={handleProfile}
//                       className='flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left'
//                     >
//                       <FiUser size={16} />
//                       Mon Profil
//                     </button>

//                     {/* ✅ OPTION ADMIN - SEULEMENT POUR LES ADMINS */}
//                     {isAdmin && (
//                       <>
//                         <div className='border-t border-gray-200 my-1'></div>
//                         <button
//                           onClick={handleAdmin}
//                           className='flex items-center gap-2 w-full px-4 py-2 text-purple-600 hover:bg-purple-50 text-left'
//                         >
//                           <FiSettings size={16} />
//                           Administration
//                         </button>
//                       </>
//                     )}
                    
//                     <div className='border-t border-gray-200 my-1'></div>
                    
//                     <button
//                       onClick={handleLogout}
//                       className='flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left'
//                     >
//                       <FiLogOut size={16} />
//                       Déconnexion
//                     </button>
//                   </motion.div>
//                 )}
//               </>
//             ) : (
//               /* ✅ UTILISATEUR NON CONNECTÉ */
//               <Link to="/login">
//                 <Button variant='primary' size='sm'>
//                   Se connecter
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Overlay pour fermer le menu */}
//       {showUserMenu && (
//         <div 
//           className='fixed inset-0 z-40' 
//           onClick={() => setShowUserMenu(false)}
//         />
//       )}
//     </header>
//   );
// }
import { useState } from 'react';
import {
  FiBell,
  FiUser,
  FiBookOpen,
  FiShoppingCart,
  FiHome,
  FiCalendar,
  FiHeart,
  FiLogOut,
  FiSettings,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../hooks/useAuth'; 
import NotificationBell from "../../components/clubs/NotificationBell";

export default function Header() {
  const [search, setSearch] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ DEBUG COMPLET
  console.log('=== HEADER DEBUG ===');
  console.log('🔍 User object:', user);
  console.log('🔍 User role:', user?.role);
  console.log('🔍 User email:', user?.email);
  console.log('🔍 Is logged in:', !!user?.token);

  // Fonction pour déterminer si on est sur une page d'auth
  const isAuthPage = () => {
    return ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password']
      .includes(location.pathname);
  };

  // Vérification de connexion
  const isLoggedIn = !!user?.token && !isAuthPage();

  // ✅ VÉRIFICATION ADMIN AMÉLIORÉE
  const getUserRole = () => {
    if (!user) return null;
    
    // Essayer plusieurs structures possibles
    const role = user.role || user.user?.role;
    console.log('🔍 Extracted role:', role);
    return role;
  };

  const isAdmin = getUserRole() === 'admin';
  
  // ✅ FORÇAGE TEMPORAIRE - À ENLEVER APRÈS TEST
  const tempAdmin = user?.email === 'fanirynomena11@gmail.com'; // Votre email admin
  const finalIsAdmin = isAdmin || tempAdmin;
  
  console.log('🔍 Is admin:', isAdmin);
  console.log('🔍 Temp admin:', tempAdmin);
  console.log('🔍 Final is admin:', finalIsAdmin);

  // ✅ FONCTION DE REDIRECTION INTELLIGENTE
  const handleProtectedNavigation = (targetPath) => {
    if (isLoggedIn) {
      navigate(targetPath);
    } else {
      navigate('/login', { 
        state: { 
          from: targetPath,
          message: 'Connectez-vous pour accéder à cette page' 
        } 
      });
    }
  };

  // déconnexion
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // profil
  const handleProfile = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  // admin
  const handleAdmin = () => {
    setShowUserMenu(false);
    navigate('/admin/marketplace');
  };

  // Si on est sur une page d'auth, on cache le header complet
  if (isAuthPage()) {
    return null;
  }

  return (
    <header className='fixed top-0 left-0 w-full bg-blue-100 border-b-4 border-blue-500/50 backdrop-blur-sm rounded-b-2xl shadow-md z-50'>
      <nav className='flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2 md:gap-0'>
        
        {/* Logo - Toujours visible */}
        <div className='flex items-center gap-3'>
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className='bg-blue-800 text-white rounded-lg px-3 py-2 text-center leading-tight cursor-pointer'
            >
              <span className='block font-bold text-sm'>#Vakio_Boky</span>
              <span className='block text-xs font-light'>
                {isLoggedIn ? 'Connecté' : 'Initiative'}
                {finalIsAdmin && ' (Admin)'}
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Navigation centrale */}
        <div className='flex flex-1 items-center flex-wrap justify-center gap-4 md:gap-6 text-blue-900 font-mono'>
          
          {/* Accueil - Toujours accessible */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
            >
              <FiHome /> Accueil
            </motion.div>
          </Link>

          {/* Barre de recherche - Toujours visible */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Input
              variant='primary'
              size='lg'
              placeholder='Rechercher des livres...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>

          {/* ✅ Explore - Redirection intelligente */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleProtectedNavigation('/explore')}
            className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
          >
            <FiBookOpen /> Explorer
          </motion.div>

          {/* ✅ Marketplace - Redirection intelligente */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleProtectedNavigation('/marketplace')}
            className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
          >
            <FiShoppingCart /> Marketplace
          </motion.div>

          {/* Éléments SEULEMENT pour utilisateurs connectés */}
          {isLoggedIn && (
            <>
              {/* Événements - Déjà protégé par isLoggedIn */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/evenements')}
                className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
              >
                <FiCalendar /> Événements
              </motion.div>

              {/* Dons - Déjà protégé par isLoggedIn */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dons')}
                className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
              >
                <FiHeart /> Dons
              </motion.div>
            </>
          )}
        </div>

        {/* Section utilisateur */}
        <div className='flex items-center gap-4 text-blue-900'>
          
          {/* Notification - SEULEMENT si connecté */}
          {isLoggedIn && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='cursor-pointer'
            >
              <NotificationBell />
            </motion.div>
          )}

          {/* Menu Utilisateur */}
          <div className='relative'>
            {isLoggedIn ? (
              /* ✅ UTILISATEUR CONNECTÉ */
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className='flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                >
                  <div className='w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center text-sm font-bold'>
                    {user.nom?.charAt(0) || user.user?.nom?.charAt(0) || 'U'}
                  </div>
                  <span className='text-sm'>
                    {user.nom || user.user?.nom || 'Utilisateur'}
                    {finalIsAdmin && ' 👑'}
                  </span>
                </motion.button>

                {/* Menu déroulant */}
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'
                  >
                    <button
                      onClick={handleProfile}
                      className='flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left'
                    >
                      <FiUser size={16} />
                      Mon Profil
                    </button>

                    {/* ✅ OPTION ADMIN - SEULEMENT POUR LES ADMINS */}
                    {finalIsAdmin && (
                      <>
                        <div className='border-t border-gray-200 my-1'></div>
                        <button
                          onClick={handleAdmin}
                          className='flex items-center gap-2 w-full px-4 py-2 text-purple-600 hover:bg-purple-50 text-left'
                        >
                          <FiSettings size={16} />
                          Administration
                        </button>
                      </>
                    )}
                    
                    <div className='border-t border-gray-200 my-1'></div>
                    
                    <button
                      onClick={handleLogout}
                      className='flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left'
                    >
                      <FiLogOut size={16} />
                      Déconnexion
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              /* ✅ UTILISATEUR NON CONNECTÉ */
              <Link to="/login">
                <Button variant='primary' size='sm'>
                  Se connecter
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay pour fermer le menu */}
      {showUserMenu && (
        <div 
          className='fixed inset-0 z-40' 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}