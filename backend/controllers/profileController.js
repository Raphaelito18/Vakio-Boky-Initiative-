
import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// Obtenir le profil utilisateur
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT 
        id, nom, email, role, telephone, genre_prefere, 
        bio, photo_profil, accepte_newsletter, created_at, updated_at 
       FROM utilisateur 
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const user = result.rows[0];
    res.json({ user });

  } catch (error) {
    console.error("Erreur getProfile:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Mettre à jour le profil
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      nom, 
      telephone, 
      genre_prefere, 
      bio, 
      accepte_newsletter 
    } = req.body;

    // Mettre à jour les champs autorisés
    const result = await pool.query(
      `UPDATE utilisateur 
       SET nom = $1, telephone = $2, genre_prefere = $3, 
           bio = $4, accepte_newsletter = $5, updated_at = NOW()
       WHERE id = $6 
       RETURNING id, nom, email, role, telephone, genre_prefere, bio, photo_profil, accepte_newsletter, created_at, updated_at`,
      [nom, telephone, genre_prefere, bio, accepte_newsletter, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({
      message: "Profil mis à jour avec succès",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Erreur updateProfile:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Changer le mot de passe
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Le nouveau mot de passe doit contenir au moins 6 caractères" });
    }

    // Récupérer le mot de passe actuel
    const userResult = await pool.query(
      "SELECT mot_de_passe FROM utilisateur WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const user = userResult.rows[0];

    // Vérifier le mot de passe actuel
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.mot_de_passe);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: "Mot de passe actuel incorrect" });
    }

    // Hasher le nouveau mot de passe
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Mettre à jour le mot de passe
    await pool.query(
      "UPDATE utilisateur SET mot_de_passe = $1, updated_at = NOW() WHERE id = $2",
      [hashedNewPassword, userId]
    );

    res.json({ message: "Mot de passe modifié avec succès" });

  } catch (error) {
    console.error("Erreur changePassword:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Mettre à jour la photo de profil
const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const { photo_profil } = req.body;

    if (!photo_profil) {
      return res.status(400).json({ error: "URL de la photo requise" });
    }

    const result = await pool.query(
      `UPDATE utilisateur 
       SET photo_profil = $1, updated_at = NOW()
       WHERE id = $2 
       RETURNING id, nom, email, photo_profil`,
      [photo_profil, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({
      message: "Photo de profil mise à jour",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Erreur updateProfilePicture:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export {
  getProfile,
  updateProfile,
  changePassword,
  updateProfilePicture
};