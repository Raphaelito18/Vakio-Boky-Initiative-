import { useState } from 'react';
import {
  FiBell,
  FiUser,
  FiBookOpen,
  FiShoppingCart,
  FiHome,
  FiCalendar,
  FiHeart,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '../ui/Input';

export default function Header({ isLoggedIn = false }) {
  const [search, setSearch] = useState('');

  return (
    <header className='fixed top-0 left-0 w-full bg-blue-100 border-b-4 border-blue-500/50 backdrop-blur-sm rounded-b-2xl shadow-md z-50'>
      <nav className='flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 gap-2 md:gap-0'>
        {/* --- Logo / Nom --- */}
        <div className='flex items-center gap-3'>
          <div className='bg-blue-800 text-white rounded-lg px-3 py-2 text-center leading-tight'>
            <span className='block font-bold text-sm'>#Vakio_Boky</span>
            <span className='block text-xs font-light'>
              {isLoggedIn ? 'Connecté' : 'Initiative'}
            </span>
          </div>
        </div>

        {/* --- Centre: Navigation + Recherche --- */}
        <div className='flex flex-1 items-center flex-wrap justify-center gap-4 md:gap-6 text-blue-900 font-mono'>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href='#'
            className='flex items-center gap-1 hover:text-blue-600'
          >
            <FiHome /> Accueil
          </motion.a>

          {/* --- Barre de recherche dynamique --- */}
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

        {/* --- Droite: Icônes utilisateur --- */}
        <div className='flex items-center gap-4 text-blue-900'>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href='#'
          >
            <FiBell size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href='#'
          >
            <FiUser size={20} />
          </motion.a>

          {/* {!isLoggedIn && (
            <Button variant='primary' size='sm'>
              Se connecter
            </Button>
          )} */}
        </div>
      </nav>
    </header>
  );
}
