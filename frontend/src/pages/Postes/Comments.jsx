import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiUser } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

export default function Comments({ postId, isOpen, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const auth = useAuth();
  const token = auth.user?.token;

  /**
   * Charge les commentaires
   */
  const loadComments = async () => {
    if (!isOpen) return;

    setLoadingComments(true);
    console.log(" [Comments] Chargement commentaires pour post:", postId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/comments`
      );
      console.log(" [Comments] Réponse status:", response.status);

      const data = await response.json();
      console.log("[Comments] Données reçues:", data);

      if (data.comments) {
        setComments(data.comments);
        console.log(" [Comments] Commentaires chargés:", data.comments.length);
      } else {
        console.log(" [Comments] Pas de données comments:", data);
      }
    } catch (error) {
      console.error(" [Comments] Erreur chargement:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  /**
   * Ajoute un nouveau
   */
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    console.log("💬 [Comments] Ajout commentaire:", {
      postId,
      contenu: newComment,
    });

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contenu: newComment }),
        }
      );

      console.log("[Comments] Réponse POST status:", response.status);

      const data = await response.json();
      console.log(" [Comments] Réponse POST données:", data);

      if (data.comment) {
        setComments((prev) => [...prev, data.comment]);
        setNewComment("");
        console.log(" [Comments] Commentaire ajouté avec succès");
      } else {
        console.log(" [Comments] Erreur ajout:", data.error);
        alert("Erreur: " + (data.error || "Inconnue"));
      }
    } catch (error) {
      console.error(" [Comments] Erreur ajout commentaire:", error);
      alert("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // Charge les commentaires quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête */}
            <div className="bg-blue-800 text-white p-4">
              <h3 className="text-lg font-semibold">Commentaires (DEBUG)</h3>
              <p className="text-sm opacity-75">Post ID: {postId}</p>
            </div>

            {/* Liste*/}
            <div className="p-4 overflow-y-auto max-h-96">
              {loadingComments ? (
                <div className="text-center py-4">
                  Chargement des commentaires...
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Aucun commentaire pour le moment
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="text-blue-600 text-sm" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="font-medium text-sm text-blue-900">
                            {comment.user_nom || "Utilisateur"}
                          </p>
                          <p className="text-gray-700 mt-1">
                            {comment.contenu}
                          </p>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(comment.created_at).toLocaleString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Formulaire d'ajout */}
            <form onSubmit={handleAddComment} className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tapez votre commentaire..."
                  className="flex-1"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={loading || !newComment.trim()}
                  className="flex items-center"
                >
                  <FiSend size={16} />
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
