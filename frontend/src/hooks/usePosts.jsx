import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const auth = useAuth();
  const token = auth.user?.token;
  const user = auth.user?.user;

  console.log("🔐 [usePosts] Token:", token);
  console.log("🔐 [usePosts] User:", user);

  /**
   * Récupère tous les posts depuis l'API
   */
  const fetchPosts = async () => {
    console.log(" [usePosts] Début fetchPosts, token:", token);

    if (!token) {
      console.log(" [usePosts] Pas de token disponible");
      setError("Veuillez vous reconnecter");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log(" [usePosts] Envoi requête avec token...");

      const response = await fetch("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(" [usePosts] Réponse status:", response.status);

      const data = await response.json();
      console.log(" [usePosts] Données reçues:", data);

      if (data.posts) {
        setPosts(data.posts);
        console.log(" [usePosts] Posts chargés:", data.posts.length);
      } else {
        setError(data.error || "Erreur inconnue du serveur");
        console.log(" [usePosts] Erreur API:", data.error);
      }
    } catch (err) {
      console.error(" [usePosts] Erreur fetch:", err);
      setError("Impossible de se connecter au serveur");
    } finally {
      setLoading(false);
      console.log(" [usePosts] Fetch terminé");
    }
  };

  /**
   * Crée un nouveau post
   */
  const createPost = async (postData) => {
    console.log("[usePosts] Création post:", postData);

    if (!token) {
      return { success: false, error: "Non authentifié" };
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log(" [usePosts] Réponse création:", data);

      if (data.post) {
        // Ajoute le nouveau post au début de la liste
        setPosts((prev) => [data.post, ...prev]);
        return { success: true, post: data.post };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error(" [usePosts] Erreur création post:", err);
      return { success: false, error: "Erreur de connexion" };
    }
  };

  //  Like ou unlike un post
  const toggleLike = async (postId) => {
    console.log("❤️ [usePosts] Toggle like post:", postId);

    if (!token) return { success: false, error: "Non authentifié" };

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("📡 [usePosts] Réponse like:", data);

      if (data.liked !== undefined) {
        setPosts((prev) =>
          prev.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                user_liked: data.liked,
                likes_count: data.likes_count || 0,
              };
            }
            return post;
          })
        );

        return { success: true, liked: data.liked };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error("❌ [usePosts] Erreur like:", err);
      return { success: false, error: "Erreur de connexion" };
    }
  };

  /**
   * Ajouter un commentaire
   */
  const addComment = async (postId, commentContent) => {
    console.log("💬 [usePosts] Ajout commentaire:", { postId, commentContent });

    if (!token) {
      return { success: false, error: "Non authentifié" };
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contenu: commentContent }),
        }
      );

      const data = await response.json();
      console.log("📡 [usePosts] Réponse commentaire:", data);

      if (data.comment) {
        return { success: true, comment: data.comment };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error("❌ [usePosts] Erreur commentaire:", err);
      return { success: false, error: "Erreur de connexion" };
    }
  };

  /**
   * Partage un post
   */
  const sharePost = async (postId) => {
    console.log("🔄 [usePosts] Partage post:", postId);

    if (!token) {
      return { success: false, error: "Non authentifié" };
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/share`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("📡 [usePosts] Réponse partage:", data);

      if (data.message) {
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error("❌ [usePosts] Erreur partage:", err);
      return { success: false, error: "Erreur de connexion" };
    }
  };

  // Chargement initial des posts
  useEffect(() => {
    if (token) {
      console.log(
        "🎯 [usePosts] useEffect - Token présent, chargement des posts"
      );
      fetchPosts();
    } else {
      console.log("🎯 [usePosts] useEffect - Pas de token, arrêt");
      setLoading(false);
    }
  }, [token]);

  // Retourner toutes fonctions
  return {
    posts,
    loading,
    error,
    createPost,
    toggleLike,
    addComment,
    sharePost,
    refetch: fetchPosts,
  };
}
