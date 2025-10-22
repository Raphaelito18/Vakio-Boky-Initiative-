import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiBook, FiCamera, 
  FiLock, FiSave, FiEdit3, FiX 
} from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    genre_prefere: '',
    bio: '',
    accepte_newsletter: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const { user, logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = user?.token;
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
        setFormData({
          nom: data.user.nom || '',
          telephone: data.user.telephone || '',
          genre_prefere: data.user.genre_prefere || '',
          bio: data.user.bio || '',
          accepte_newsletter: data.user.accepte_newsletter || false
        });
      } else {
        setMessage('Erreur lors du chargement du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = user?.token;
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
        setMessage('✅ Profil mis à jour avec succès');
        setIsEditing(false);
      } else {
        setMessage(data.error || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur de connexion au serveur');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const token = user?.token;
      const response = await fetch('http://localhost:5000/api/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Mot de passe modifié avec succès');
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage(data.error || 'Erreur lors du changement de mot de passe');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur de connexion au serveur');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
              <p className="text-gray-600">Gérez vos informations personnelles</p>
            </div>
            <div className="flex space-x-3">
              {!isEditing && !isChangingPassword && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center"
                  >
                    <FiEdit3 className="mr-2" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsChangingPassword(true)}
                    className="flex items-center"
                  >
                    <FiLock className="mr-2" />
                    Changer mot de passe
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg mb-6 ${
              message.includes('✅') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Informations personnelles
                </h2>
                {isEditing && (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>

              {!isEditing ? (
                // Affichage des informations
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nom complet</label>
                      <p className="text-gray-900">{profile?.nom}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{profile?.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Téléphone</label>
                      <p className="text-gray-900">{profile?.telephone || 'Non renseigné'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Rôle</label>
                      <p className="text-gray-900 capitalize">{profile?.role}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Genre littéraire préféré</label>
                    <p className="text-gray-900">{profile?.genre_prefere || 'Non renseigné'}</p>
                  </div>
                  {profile?.bio && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Bio</label>
                      <p className="text-gray-900">{profile.bio}</p>
                    </div>
                  )}
                </div>
              ) : (
                // Formulaire d'édition
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Nom complet *
                      </label>
                      <Input
                        variant="primary"
                        value={formData.nom}
                        onChange={(e) => handleInputChange('nom', e.target.value)}
                        icon={<FiUser className="text-gray-400" />}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Email
                      </label>
                      <Input
                        variant="primary"
                        value={profile?.email}
                        disabled
                        icon={<FiMail className="text-gray-400" />}
                      />
                      <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Téléphone
                      </label>
                      <Input
                        variant="primary"
                        value={formData.telephone}
                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                        icon={<FiPhone className="text-gray-400" />}
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Genre préféré
                      </label>
                      <Input
                        variant="primary"
                        value={formData.genre_prefere}
                        onChange={(e) => handleInputChange('genre_prefere', e.target.value)}
                        icon={<FiBook className="text-gray-400" />}
                        placeholder="Roman, Poésie, Science-fiction..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Parlez-nous de vous..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={formData.accepte_newsletter}
                      onChange={(e) => handleInputChange('accepte_newsletter', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                      Recevoir les actualités littéraires et les nouveautés
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={saving}
                      className="flex items-center"
                    >
                      <FiSave className="mr-2" />
                      {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Changement de mot de passe */}
            {isChangingPassword && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Changer le mot de passe
                  </h2>
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Mot de passe actuel *
                    </label>
                    <Input
                      variant="primary"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      icon={<FiLock className="text-gray-400" />}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Nouveau mot de passe *
                      </label>
                      <Input
                        variant="primary"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        icon={<FiLock className="text-gray-400" />}
                        required
                        minLength="6"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Confirmer le mot de passe *
                      </label>
                      <Input
                        variant="primary"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        icon={<FiLock className="text-gray-400" />}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={saving}
                      className="flex items-center"
                    >
                      <FiSave className="mr-2" />
                      {saving ? 'Changement...' : 'Changer le mot de passe'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsChangingPassword(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Photo de profil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {profile?.photo_profil ? (
                  <img
                    src={profile.photo_profil}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <FiUser size={48} className="text-blue-600" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{profile?.nom}</h3>
              <p className="text-gray-600 capitalize">{profile?.role}</p>
              <p className="text-sm text-gray-500 mt-2">
                Membre depuis {new Date(profile?.created_at).toLocaleDateString('fr-FR')}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full flex items-center justify-center"
                onClick={() => {/* Fonctionnalité upload photo */}}
              >
                <FiCamera className="mr-2" />
                Changer la photo
              </Button>
            </motion.div>

            {/* Statistiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Livres lus</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commentaires</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avis publiés</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </motion.div>

            {/* Actions rapides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {/* Naviguer vers l'historique */}}
                >
                  📚 Historique de lecture
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {/* Naviguer vers les favoris */}}
                >
                  ❤️ Mes favoris
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:border-red-200"
                  onClick={logout}
                >
                  🚪 Déconnexion
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}