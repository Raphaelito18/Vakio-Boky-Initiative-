import pool from "../config/db.js";

/**
 * Opérations CRUD sur les commentaires
 */
class CommentController {
  async deleteComment(req, res) {
    const commentId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
      // Vérifie que le commentaire existe
      const commentCheck = await pool.query(
        `SELECT c.*, p.auteur_id as post_auteur_id 
         FROM comments c 
         JOIN posts p ON c.post_id = p.id 
         WHERE c.id = $1`,
        [commentId]
      );

      if (commentCheck.rows.length === 0) {
        return res.status(404).json({
          error: "Commentaire non trouvé",
        });
      }

      const comment = commentCheck.rows[0];

      // Vérifie les permissions : auteur du commentaire OU auteur du post OU admin
      const canDelete =
        parseInt(userId) === parseInt(comment.user_id) ||
        parseInt(userId) === parseInt(comment.post_auteur_id) ||
        userRole === "admin";

      if (!canDelete) {
        return res.status(403).json({
          error: "Vous n'êtes pas autorisé à supprimer ce commentaire",
        });
      }

      // Supprime le commentaire
      await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);

      res.json({
        message: "Commentaire supprimé avec succès",
      });
    } catch (error) {
      console.error("❌ Erreur suppression commentaire:", error);
      res.status(500).json({
        error: "Erreur serveur lors de la suppression du commentaire",
      });
    }
  }

  /**
   * MÉTHODE : updateComment
   * Modifie un commentaire (auteur seulement)
   */
  async updateComment(req, res) {
    const commentId = req.params.id;
    const userId = req.user.id;
    const { contenu } = req.body;

    // Validation
    if (!contenu || !contenu.trim()) {
      return res.status(400).json({
        error: "Le contenu du commentaire ne peut pas être vide",
      });
    }

    try {
      // Vérifie que le commentaire existe et appartient à l'utilisateur
      const commentCheck = await pool.query(
        "SELECT * FROM comments WHERE id = $1 AND user_id = $2",
        [commentId, userId]
      );

      if (commentCheck.rows.length === 0) {
        return res.status(404).json({
          error: "Commentaire non trouvé ou accès non autorisé",
        });
      }

      // Met à jour le commentaire
      const result = await pool.query(
        `UPDATE comments 
         SET contenu = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $2 
         RETURNING *, 
         (SELECT nom FROM utilisateur WHERE id = $3) as user_nom`,
        [contenu.trim(), commentId, userId]
      );

      res.json({
        message: "Commentaire modifié avec succès",
        comment: result.rows[0],
      });
    } catch (error) {
      console.error("❌ Erreur modification commentaire:", error);
      res.status(500).json({
        error: "Erreur serveur lors de la modification du commentaire",
      });
    }
  }

  /**
   * MÉTHODE : getComment
   * Récupère un commentaire spécifique
   */
  async getComment(req, res) {
    const commentId = req.params.id;

    try {
      const result = await pool.query(
        `SELECT c.*, u.nom as user_nom 
         FROM comments c 
         JOIN utilisateur u ON c.user_id = u.id 
         WHERE c.id = $1`,
        [commentId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Commentaire non trouvé",
        });
      }

      res.json({
        comment: result.rows[0],
      });
    } catch (error) {
      console.error("❌ Erreur récupération commentaire:", error);
      res.status(500).json({
        error: "Erreur serveur",
      });
    }
  }
}

export default new CommentController();
