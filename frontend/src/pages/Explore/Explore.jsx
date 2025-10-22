import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiUser, FiSearch, FiStar } from 'react-icons/fi';
import Button from '@/components/ui/Button';

export default function Explore() {
  const nav = useNavigate();
  
  const handleProfile = () => {
    nav("/profile");
  };

  const categories = [
    { name: 'Romans', count: 125, color: 'from-blue-500 to-blue-600' },
    { name: 'Science-Fiction', count: 89, color: 'from-purple-500 to-purple-600' },
    { name: 'Fantasy', count: 67, color: 'from-green-500 to-green-600' },
    { name: 'Policier', count: 54, color: 'from-red-500 to-red-600' },
    { name: 'Poésie', count: 42, color: 'from-pink-500 to-pink-600' },
    { name: 'Biographie', count: 38, color: 'from-orange-500 to-orange-600' },
  ];

  const featuredBooks = [
    { title: 'Le Chant de la Terre', author: 'Marie Dubois', rating: 4.5 },
    { title: 'L\'Ombre du Passé', author: 'Jean Moreau', rating: 4.2 },
    { title: 'Les Rêves Éveillés', author: 'Sophie Laurent', rating: 4.8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Explorez l'Univers Littéraire
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Découvrez des livres captivants, rencontrez des auteurs talentueux 
            et plongez dans vos genres préférés
          </motion.p>
        </motion.div>

        {/* Barre de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Rechercher un livre, un auteur, un genre..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </motion.div>

        {/* Catégories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <FiBook className="mr-3 text-blue-600" />
            Catégories Populaires
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-r ${category.color} rounded-2xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all`}
              >
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-blue-100">{category.count} livres</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Livres en vedette */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <FiStar className="mr-3 text-yellow-500" />
            Livres en Vedette
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBooks.map((book, index) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-3">par {book.author}</p>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < Math.floor(book.rating) ? 'fill-current' : ''}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{book.rating}/5</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bouton de test vers le profil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleProfile}
            className="flex items-center mx-auto"
          >
            <FiUser className="mr-2" />
            Voir Mon Profil
          </Button>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">1,200+</div>
            <div className="text-gray-600">Livres</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">350+</div>
            <div className="text-gray-600">Auteurs</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">15+</div>
            <div className="text-gray-600">Genres</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">5,000+</div>
            <div className="text-gray-600">Lecteurs</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}