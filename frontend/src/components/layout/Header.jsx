import { useState } from 'react';
import {
  FiBell,
  FiUser,
  FiBookOpen,
  FiShoppingCart,
  FiHome,
  FiCalendar,
  FiHeart,
  FiSearch,
  FiX,
  FiMenu,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '../ui/Input';

export default function Header({ isLoggedIn = false }) {
  const [search, setSearch] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <header className='sticky top-0 left-0 w-full bg-blue-300  backdrop-blur-sm  shadow-md z-50'>
        <nav className='flex items-center justify-between px-4 md:px-8 py-3'>
          {/* --- Logo / Nom --- */}
          <div className='flex items-center gap-3'>
            <div className='bg-blue-800 text-white rounded-lg px-3 py-2 text-center leading-tight'>
              <span className='block font-bold text-sm'>#Vakio_Boky</span>
              <span className='block text-xs font-light'>
                {isLoggedIn ? 'Connecté' : 'Initiative'}
              </span>
            </div>
          </div>

          {/* --- Barre de navigation (visible sur PC) --- */}
          <div className='hidden md:flex flex-1 items-center justify-center gap-6 text-blue-900 font-mono'>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href='#'
              className='flex items-center gap-1 hover:text-blue-600'
            >
              <FiHome /> Accueil
            </motion.a>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Input
                variant='primary'
                size='lg'
                placeholder='Rechercher des livres...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </motion.div>

            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href='#'
              className='flex items-center gap-1 hover:text-blue-600'
            >
              <FiBookOpen /> Bibliothèque
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href='#'
              className='flex items-center gap-1 hover:text-blue-600'
            >
              <FiShoppingCart /> Marketplace
            </motion.a>

            {isLoggedIn && (
              <>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href='#'
                  className='flex items-center gap-1 hover:text-blue-600'
                >
                  <FiCalendar /> Événements
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href='#'
                  className='flex items-center gap-1 hover:text-blue-600'
                >
                  <FiHeart /> Dons
                </motion.a>
              </>
            )}
          </div>

          {/* --- Icônes utilisateur et boutons mobiles --- */}
          <div className='flex items-center gap-4 text-blue-900'>
            {/* --- Recherche mobile --- */}
            <div className='block md:hidden'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className='text-blue-800'
              >
                {showMobileSearch ? <FiX size={22} /> : <FiSearch size={22} />}
              </motion.button>
            </div>

            {/* --- Notifications --- */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href='#'
            >
              <FiBell size={20} />
            </motion.a>

            {/* --- Profil utilisateur --- */}
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href='#'
            >
              <FiUser size={20} />
            </motion.a>

            {/* --- Menu mobile --- */}
            <div className='block md:hidden'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className='text-blue-800'
              >
                {showMobileMenu ? <FiX size={22} /> : <FiMenu size={22} />}
              </motion.button>
            </div>
          </div>
        </nav>

        {/* --- Barre de recherche Mobile (sous le header) --- */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className='px-4 pb-3 md:hidden'
            >
              <Input
                variant='primary'
                size='lg'
                placeholder='Rechercher des livres...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Menu Mobile déroulant --- */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='bg-blue-50 border-t border-blue-300 rounded-b-2xl shadow-md md:hidden'
            >
              <div className='flex flex-col items-start p-4 text-blue-900 font-mono space-y-3'>
                <a
                  href='#'
                  className='flex items-center gap-2 hover:text-blue-600'
                >
                  <FiHome /> Accueil
                </a>
                <a
                  href='#'
                  className='flex items-center gap-2 hover:text-blue-600'
                >
                  <FiBookOpen /> Bibliothèque
                </a>
                <a
                  href='#'
                  className='flex items-center gap-2 hover:text-blue-600'
                >
                  <FiShoppingCart /> Marketplace
                </a>
                {isLoggedIn && (
                  <>
                    <a
                      href='#'
                      className='flex items-center gap-2 hover:text-blue-600'
                    >
                      <FiCalendar /> Événements
                    </a>
                    <a
                      href='#'
                      className='flex items-center gap-2 hover:text-blue-600'
                    >
                      <FiHeart /> Dons
                    </a>
                  </>
                )}
                {!isLoggedIn && (
                  <Button variant='primary' size='sm' className='mt-2'>
                    Se connecter
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
