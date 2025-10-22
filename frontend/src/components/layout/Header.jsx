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
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Input from '../ui/Input';
import { useAuth } from '../../hooks/useAuth'; 

export default function Header() {
  const [search, setSearch] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

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

  // si connecté
  const isLoggedIn = !!user?.token;

  return (
    <header className='fixed top-0 left-0 w-full bg-blue-100 border-b-4 border-blue-500/50 backdrop-blur-sm rounded-b-2xl shadow-md z-50'>
      <nav className='flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2 md:gap-0'>
        
        
        <div className='flex items-center gap-3'>
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className='bg-blue-800 text-white rounded-lg px-3 py-2 text-center leading-tight cursor-pointer'
            >
              <span className='block font-bold text-sm'>#Vakio_Boky</span>
              <span className='block text-xs font-light'>
                {isLoggedIn ? 'Connecté' : 'Initiative'}
              </span>
            </motion.div>
          </Link>
        </div>

        
        <div className='flex flex-1 items-center flex-wrap justify-center gap-4 md:gap-6 text-blue-900 font-mono'>
          
          {/* Accueil */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
            >
              <FiHome /> Accueil
            </motion.div>
          </Link>

          {/* barre de recherche*/}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Input
              variant='primary'
              size='lg'
              placeholder='Rechercher des livres...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.div>

          {/* Explore (Bibliothèque) */}
          <Link to="/explore">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
            >
              <FiBookOpen /> Explorer
            </motion.div>
          </Link>

          {/* Marketplace */}
          <Link to="/marketplace">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
            >
              <FiShoppingCart /> Marketplace
            </motion.div>
          </Link>

          {isLoggedIn && (
            <>
              {/* Événements */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
              >
                <FiCalendar /> Événements
              </motion.div>

              {/* Dons */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center gap-1 hover:text-blue-600 cursor-pointer'
              >
                <FiHeart /> Dons
              </motion.div>
            </>
          )}
        </div>

        
        <div className='flex items-center gap-4 text-blue-900'>
          
          {/* Notification */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer'
          >
            <FiBell size={20} />
          </motion.div>

          {/* Menu Utilisateur */}
          <div className='relative'>
            {isLoggedIn ? (
            
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
              /* NON CONNECTÉ */
              <Link to="/login">
                <Button variant='primary' size='sm'>
                  Se connecter
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay*/}
      {showUserMenu && (
        <div 
          className='fixed inset-0 z-40' 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}