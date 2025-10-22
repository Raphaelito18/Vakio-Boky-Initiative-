// // controllers/authController.js
// import pool from "../config/db.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

// // Login utilisateur
// const login = async (req, res) => {
//   try {
//     const { email, mot_de_passe } = req.body;

//     if (!email || !mot_de_passe) {
//       return res.status(400).json({ error: "Email et mot de passe requis" });
//     }

//     // Vérifier si l'utilisateur existe
//     const result = await pool.query(
//       "SELECT * FROM utilisateur WHERE email = $1",
//       [email]
//     );

//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: "Email ou mot de passe incorrect" });
//     }

//     const user = result.rows[0];

//     // Vérifier le mot de passe
//     const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Email ou mot de passe incorrect" });
//     }

//     // Générer le token
//     const token = generateToken(user.id);

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         nom: user.nom,
//         email: user.email,
//         role: user.role,
//         telephone: user.telephone,
//         genre_prefere: user.genre_prefere
//       }
//     });

//   } catch (error) {
//     console.error("Erreur login:", error);
//     res.status(500).json({ error: "Erreur serveur lors de la connexion" });
//   }
// };

// // Inscription utilisateur
// const register = async (req, res) => {
//   try {
//     const { 
//       nom, 
//       email, 
//       mot_de_passe, 
//       telephone, 
//       genre_prefere,
//       accepte_newsletter 
//     } = req.body;

//     if (!nom || !email || !mot_de_passe) {
//       return res.status(400).json({ error: "Nom, email et mot de passe sont requis" });
//     }

//     // Vérifier si l'email existe déjà
//     const userExists = await pool.query(
//       "SELECT id FROM utilisateur WHERE email = $1",
//       [email]
//     );

//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà" });
//     }

//     // Hasher le mot de passe
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);

//     // Insérer le nouvel utilisateur
//     const result = await pool.query(
//       `INSERT INTO utilisateur 
//        (nom, email, mot_de_passe, telephone, genre_prefere, accepte_newsletter) 
//        VALUES ($1, $2, $3, $4, $5, $6) 
//        RETURNING id, nom, email, role, telephone, genre_prefere, created_at`,
//       [nom, email, hashedPassword, telephone || null, genre_prefere || null, accepte_newsletter || false]
//     );

//     const newUser = result.rows[0];
//     const token = generateToken(newUser.id);

//     res.status(201).json({
//       message: "Utilisateur créé avec succès",
//       token,
//       user: {
//         id: newUser.id,
//         nom: newUser.nom,
//         email: newUser.email,
//         role: newUser.role,
//         telephone: newUser.telephone,
//         genre_prefere: newUser.genre_prefere
//       }
//     });

//   } catch (error) {
//     console.error("Erreur register:", error);
//     res.status(500).json({ error: "Erreur serveur lors de l'inscription" });
//   }
// };

// export { login, register };
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/emailService.js";

// Stockage temporaire des codes de réinitialisation (en production, utiliser Redis)
const resetCodes = new Map();

// Login utilisateur
const login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
      return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    const result = await pool.query(
      "SELECT * FROM utilisateur WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = generateToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        telephone: user.telephone,
        genre_prefere: user.genre_prefere,
        bio: user.bio,
        photo_profil: user.photo_profil
      }
    });

  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ error: "Erreur serveur lors de la connexion" });
  }
};

// Inscription utilisateur
const register = async (req, res) => {
  try {
    const { 
      nom, 
      email, 
      mot_de_passe, 
      telephone, 
      genre_prefere,
      accepte_newsletter 
    } = req.body;

    if (!nom || !email || !mot_de_passe) {
      return res.status(400).json({ error: "Nom, email et mot de passe sont requis" });
    }

    const userExists = await pool.query(
      "SELECT id FROM utilisateur WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);

    const result = await pool.query(
      `INSERT INTO utilisateur 
       (nom, email, mot_de_passe, telephone, genre_prefere, accepte_newsletter) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, nom, email, role, telephone, genre_prefere, bio, photo_profil, created_at`,
      [nom, email, hashedPassword, telephone || null, genre_prefere || null, accepte_newsletter || false]
    );

    const newUser = result.rows[0];
    const token = generateToken(newUser.id);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: {
        id: newUser.id,
        nom: newUser.nom,
        email: newUser.email,
        role: newUser.role,
        telephone: newUser.telephone,
        genre_prefere: newUser.genre_prefere,
        bio: newUser.bio,
        photo_profil: newUser.photo_profil
      }
    });

  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ error: "Erreur serveur lors de l'inscription" });
  }
};

// Mot de passe oublié
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email requis" });
    }

    // Vérifier si l'utilisateur existe
    const result = await pool.query(
      "SELECT id, nom FROM utilisateur WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      // Pour la sécurité, on ne révèle pas si l'email existe ou non
      return res.json({ 
        message: "Si l'email existe, un code de réinitialisation a été envoyé" 
      });
    }

    const user = result.rows[0];
    
    // Générer un code à 6 chiffres
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Stocker le code (en production, utiliser Redis avec expiration)
    resetCodes.set(email, {
      code: resetCode,
      expires: expirationTime,
      userId: user.id
    });

    // Envoyer l'email (à implémenter avec votre service d'email)
    try {
      await sendEmail({
        to: email,
        subject: "Réinitialisation de votre mot de passe - Vakio Boky",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Vakio Boky - Réinitialisation de mot de passe</h2>
            <p>Bonjour ${user.nom},</p>
            <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
              <h3 style="color: #1e40af; font-size: 24px; letter-spacing: 5px;">${resetCode}</h3>
            </div>
            <p>Ce code expirera dans 15 minutes.</p>
            <p>Si vous n'avez pas fait cette demande, ignorez simplement cet email.</p>
            <br>
            <p>Cordialement,<br>L'équipe Vakio Boky</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error("Erreur envoi email:", emailError);
      // En développement, on retourne le code directement
      if (process.env.NODE_ENV === 'development') {
        return res.json({ 
          message: "Code de réinitialisation (DEV): " + resetCode,
          code: resetCode // Seulement en développement
        });
      }
    }

    res.json({ 
      message: "Si l'email existe, un code de réinitialisation a été envoyé" 
    });

  } catch (error) {
    console.error("Erreur forgotPassword:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Vérification du code
const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email et code requis" });
    }

    const storedData = resetCodes.get(email);

    if (!storedData) {
      return res.status(400).json({ error: "Code invalide ou expiré" });
    }

    if (Date.now() > storedData.expires) {
      resetCodes.delete(email);
      return res.status(400).json({ error: "Code expiré" });
    }

    if (storedData.code !== code) {
      return res.status(400).json({ error: "Code incorrect" });
    }

    // Générer un token temporaire pour la réinitialisation
    const resetToken = jwt.sign(
      { 
        userId: storedData.userId, 
        email: email,
        purpose: 'password_reset' 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );

    // Supprimer le code utilisé
    resetCodes.delete(email);

    res.json({
      message: "Code vérifié avec succès",
      resetToken
    });

  } catch (error) {
    console.error("Erreur verifyCode:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Réinitialisation du mot de passe
const resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
    }

    // Vérifier le token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(400).json({ error: "Token invalide ou expiré" });
    }

    if (decoded.purpose !== 'password_reset' || decoded.email !== email) {
      return res.status(400).json({ error: "Token invalide" });
    }

    // Hasher le nouveau mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Mettre à jour le mot de passe
    await pool.query(
      "UPDATE utilisateur SET mot_de_passe = $1, updated_at = NOW() WHERE id = $2",
      [hashedPassword, decoded.userId]
    );

    res.json({
      message: "Mot de passe réinitialisé avec succès"
    });

  } catch (error) {
    console.error("Erreur resetPassword:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export { 
  login, 
  register, 
  forgotPassword, 
  verifyCode, 
  resetPassword 
};