import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Récupérer l'utilisateur depuis PostgreSQL
    const result = await pool.query(
      `SELECT id, nom, email, role, telephone, genre_prefere, bio, photo_profil 
       FROM utilisateur WHERE id = $1`,
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }

    req.user = result.rows[0];
    next();
  } catch (err) {
    console.error("Erreur auth middleware:", err);
    return res.status(403).json({ error: "Token invalide" });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Non authentifié" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Accès non autorisé" });
    }

    next();
  };
};

export { authenticateToken, checkRole };