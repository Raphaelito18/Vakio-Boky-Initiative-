import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiImage,
  FiVideo,
  FiFile,
  FiX,
  FiEdit,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import Button from "@/components/ui/Button"; // Bouton personnalisé
import Input from "@/components/ui/Input"; // Input personnalisé
import { usePosts } from "@/hooks/usePosts"; // Hook pour gérer les posts
import { useAuth } from "@/hooks/useAuth"; // Hook pour récupérer l'utilisateur
import PostComments from "./PostComments"; // Composant pour afficher les commentaires
import UploadMedia from "./UploadMedia"; // Composant pour uploader les médias
import ReactQuill from "react-quill"; // Import normal
import Modal from "@/components/ui/Modal";
import "react-quill/dist/quill.snow.css"; // CSS nécessaire



export default function Postes() {
  // --- AUTH ---
  const auth = useAuth();
  const user = auth.user?.user; // Informations utilisateur
  const token = auth.user?.token; // Token pour les requêtes sécurisées

  // --- POSTS HOOK ---
  const {
    posts,
    loading,
    error,
    createPost,
    toggleLike,
    addComment,
    sharePost,
    refetch,
  } = usePosts();

  // --- ÉTATS LOCAUX ---
  const [newPostContent, setNewPostContent] = useState(""); // Contenu nouveau post
  const [isCreating, setIsCreating] = useState(false); // Loading du post
  const [showMediaUpload, setShowMediaUpload] = useState(false); // Modal média
  const [postMedias, setPostMedias] = useState([]); // Médias attachés au post
  const [selectedPostForComments, setSelectedPostForComments] = useState(null); // Post sélectionné pour commenter
  const [showComments, setShowComments] = useState(false); // Affichage commentaires
  const [showPostOptions, setShowPostOptions] = useState(null); // Options (éditer/supprimer)
  const [editingPost, setEditingPost] = useState(null); // Post en cours d'édition
  const [editPostContent, setEditPostContent] = useState(""); // Contenu du post édité
  const [mediaError, setMediaError] = useState(null); // Erreur lors du chargement des médias

  const [showModal, setShowModal] = useState(false);

  const handleSave = (content) => {
    setNewPostContent(content);
    setShowModal(false);
  };
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: [1, 2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };
  // --- CREATION DE POST ---
  const handleCreatePost = async (e) => {
    e.preventDefault();

    // Vérifier que le post contient du texte ou un média
    if (!newPostContent.trim() && postMedias.length === 0) {
      alert("Le contenu ou un média est requis");
      return;
    }

    setIsCreating(true); // Loading

    try {
      const postData = {
        contenu: newPostContent,
        type_post: postMedias.length > 0 ? "media" : "simple",
        media_url: postMedias.length > 0 ? postMedias[0].url : null,
      };

      // Création du post via le hook
      const result = await createPost(postData);

      if (result.success) {
        setNewPostContent(""); // Réinitialiser input
        setPostMedias([]); // Réinitialiser médias
        await refetch(); // Recharger la liste des posts
      } else {
        alert(result.error || "Erreur lors de la création du post");
      }
    } catch (error) {
      console.error("Erreur création post:", error);
      alert("Erreur lors de la création du post");
    } finally {
      setIsCreating(false); // Fin du loading
    }
  };

  // --- MÉDIAS ---
  const handleMediasUploaded = async (medias) => {
    if (medias && medias.length > 0) {
      setPostMedias(medias);
      setShowMediaUpload(false);
      setMediaError(null);
    } else {
      setMediaError("Aucun média valide sélectionné");
    }
  };

  const handleMediaError = (postId, mediaUrl) => {
    console.error(`Erreur chargement média pour le post ${postId}:`, mediaUrl);
  };

  // --- LIKE POST ---
  const handleLike = async (postId) => {
    const result = await toggleLike(postId);
    if (!result.success) alert("Erreur lors du like");
  };

  // --- SHARE POST ---
  const handleShare = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const result = await sharePost(postId);

    if (result.success) {
      const shareText = `Découvrez ce post de ${post.auteur_nom} sur Vakio Boky`;
      const shareUrl = `${window.location.origin}/post/${postId}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: "Vakio Boky",
            text: shareText,
            url: shareUrl,
          });
        } catch {
          console.log("Partage annulé");
        }
      } else {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
      }
    } else {
      alert("Erreur lors du partage");
    }
  };

  // --- DELETE POST ---
  const handleDeletePost = async (postId) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette publication ?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        await refetch();
        setShowPostOptions(null);
      } else {
        alert(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur suppression post:", error);
      alert("Erreur lors de la suppression");
    }
  };

  // --- EDIT POST ---
  const handleEditPost = async (postId) => {
    if (!editPostContent.trim()) {
      alert("Le contenu ne peut pas être vide");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contenu: editPostContent }),
        }
      );

      const data = await response.json();
      if (data.success) {
        await refetch();
        setEditingPost(null);
        setEditPostContent("");
      } else {
        alert(data.error || "Erreur lors de la modification");
      }
    } catch (error) {
      console.error("Erreur modification post:", error);
      alert("Erreur lors de la modification");
    }
  };

  // --- LOADING INITIAL ---
  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-blue-800 text-lg"
        >
          Chargement des posts...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* En-tête fil d'actualité */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-blue-800 text-white rounded-lg px-6 py-4 inline-block mb-4"
          >
            <span className="block font-bold text-xl">#Vakio_Boky</span>
            <span className="block text-sm font-light">
              Fil d'Actualité Littéraire
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-900 text-lg font-semibold"
          >
            Bienvenue dans la communauté, {user?.nom} !
          </motion.p>
        </motion.div>

        {/* Formulaire création post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-blue-200 p-6 mb-6"
        >
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="space-y-3">
              <label className="text-blue-900 text-sm font-medium block">
                Partagez vos pensées littéraires...
              </label>
              {/* Input simulé */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="border border-blue-200 rounded-lg p-3 cursor-text bg-white"
                onClick={() => setShowModal(true)}
              >
                {newPostContent ? (
                  <div
                    className="text-blue-800"
                    dangerouslySetInnerHTML={{ __html: newPostContent }}
                  />
                ) : (
                  <span className="text-blue-400">
                    Qu'avez-vous lu récemment ? Partagez vos impressions...
                  </span>
                )}
              </motion.div>

              {/* Modal */}
              <Modal isOpen={showModal} onClose={() => setShowModal(false)} className="py-3">
               <div className="p-3">
                 <h3 className="text-lg font-bold text-blue-900 mb-4">
                  Éditez votre publication
                </h3>
                <ReactQuill
                  theme="snow"
                  value={newPostContent}
                  onChange={setNewPostContent}
                  modules={modules}
                  className="bg-white min-h-[200px]"
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => handleSave(newPostContent)}>
                    Enregistrer
                  </Button>
                </div>
               </div>
              </Modal>
            </div>

            {/* Boutons médias et publier */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMediaUpload(true)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Ajouter une image"
                >
                  <FiImage size={20} />
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMediaUpload(true)}
                  className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Ajouter une vidéo"
                >
                  <FiVideo size={20} />
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMediaUpload(true)}
                  className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                  title="Ajouter un document"
                >
                  <FiFile size={20} />
                </motion.button>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={
                    isCreating ||
                    (!newPostContent.trim() && postMedias.length === 0)
                  }
                >
                  {isCreating ? "Publication..." : "Publier"}
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>

        {/* Modal upload médias */}
        <AnimatePresence>
          {showMediaUpload && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowMediaUpload(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Ajouter un média</h3>
                  <button
                    onClick={() => setShowMediaUpload(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                <UploadMedia
                  onMediasUploaded={handleMediasUploaded}
                  maxFiles={5}
                  accept="image/*,video/*,application/pdf,.doc,.docx,.txt"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liste des posts */}
        <AnimatePresence>
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 text-center"
            >
              <p className="text-blue-600 text-lg">
                Aucun post pour le moment. Soyez le premier à partager !
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl border border-blue-200 p-6"
                >
                  {/* Header du post */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {post.auteur_nom ? (
                          <span className="text-blue-800 font-bold text-sm">
                            {post.auteur_nom.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <FiUser className="text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900">
                          {post.auteur_nom || "Utilisateur"}
                        </h3>
                        <p className="text-blue-400 text-sm">
                          {new Date(post.created_at).toLocaleDateString(
                            "fr-FR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Options éditer/supprimer */}
                    {user?.id === post.auteur_id && (
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowPostOptions(
                              showPostOptions === post.id ? null : post.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                        >
                          •••
                        </button>

                        <AnimatePresence>
                          {showPostOptions === post.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg py-1 z-10 min-w-32"
                            >
                              <button
                                onClick={() => {
                                  setEditingPost(post.id);
                                  setEditPostContent(post.contenu);
                                  setShowPostOptions(null);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                              >
                                <FiEdit size={14} /> Modifier
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 text-sm"
                              >
                                <FiTrash2 size={14} /> Supprimer
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Contenu du post */}
                  {editingPost === post.id ? (
                    <div className="mb-4 space-y-3">
                      <Input
                        value={editPostContent}
                        onChange={(e) => setEditPostContent(e.target.value)}
                        multiline
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEditPost(post.id)}
                          disabled={!editPostContent.trim()}
                        >
                          Enregistrer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingPost(null);
                            setEditPostContent("");
                          }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <p className="text-blue-800 leading-relaxed whitespace-pre-line">
                          {post.contenu}
                        </p>
                        {post.media_url && (
                          <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            {post.type_post === "image" && (
                              <img
                                src={post.media_url}
                                alt="Post media"
                                className="w-full max-h-96 object-contain cursor-pointer"
                                onError={() =>
                                  handleMediaError(post.id, post.media_url)
                                }
                                onClick={() =>
                                  window.open(post.media_url, "_blank")
                                }
                              />
                            )}
                            {post.type_post === "video" && (
                              <video
                                src={post.media_url}
                                controls
                                className="w-full max-h-96 bg-black"
                                onError={() =>
                                  handleMediaError(post.id, post.media_url)
                                }
                              />
                            )}
                            {(post.type_post === "document" ||
                              post.type_post === "fichier") && (
                              <div className="p-4 flex items-center space-x-3">
                                <FiFile className="text-blue-500 text-2xl" />
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">
                                    Document joint
                                  </p>
                                  <a
                                    href={post.media_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm"
                                  >
                                    Télécharger le fichier
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions du post */}
                      <div className="flex items-center space-x-6 text-blue-500 text-sm mb-4">
                        <span>{post.likes_count || 0} j'aime</span>
                        <span>{post.comments_count || 0} commentaires</span>
                        <span>{post.shares_count || 0} partages</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-blue-100 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            post.user_liked
                              ? "text-red-500 bg-red-50"
                              : "text-blue-500 hover:bg-blue-50"
                          }`}
                        >
                          <FiHeart
                            size={18}
                            fill={post.user_liked ? "currentColor" : "none"}
                          />
                          <span>J'aime</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedPostForComments(post.id);
                            setShowComments(true);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                        >
                          <FiMessageCircle size={18} /> <span>Commenter</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare(post.id)}
                          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-green-500 hover:bg-green-50 transition-colors"
                        >
                          <FiShare2 size={18} /> <span>Partager</span>
                        </motion.button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Commentaires */}
        <PostComments
          postId={selectedPostForComments}
          isOpen={showComments}
          onClose={() => {
            setShowComments(false);
            setSelectedPostForComments(null);
          }}
          onCommentAdded={refetch}
        />

        {/* Affichage erreur globale */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mt-4 text-center"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
}
