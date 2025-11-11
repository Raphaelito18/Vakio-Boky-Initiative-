import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    console.log("📁 Destination upload:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + extension;
    console.log("📄 Nom fichier généré:", filename);
    cb(null, filename);
  },
});

// FILTRAGE
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    "image/jpeg": true,
    "image/jpg": true,
    "image/png": true,
    "image/gif": true,
    "image/webp": true,
    "video/mp4": true,
    "video/mpeg": true,
    "video/quicktime": true,
    "application/pdf": true,
  };

  if (allowedTypes[file.mimetype]) {
    console.log("✅ Type fichier autorisé:", file.mimetype);
    cb(null, true);
  } else {
    console.log("❌ Type fichier refusé:", file.mimetype);
    cb(new Error(`Type de fichier non supporté: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 5,
  },
});

/**
 * ROUTE
 */
router.post(
  "/upload",
  authenticateToken,
  upload.array("fichiers", 5),
  async (req, res) => {
    console.log("📤 [Upload] Début traitement des fichiers");

    try {
      // Vérifier
      if (!req.files || req.files.length === 0) {
        console.log("❌ [Upload] Aucun fichier reçu");
        return res.status(400).json({
          success: false,
          error: "Aucun fichier fourni",
        });
      }

      console.log(`✅ [Upload] ${req.files.length} fichier(s) reçu(s)`);

      const medias = req.files.map((file) => {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const fileUrl = `${baseUrl}/uploads/${file.filename}`;

        let type_media = "fichier";
        if (file.mimetype.startsWith("image/")) type_media = "image";
        else if (file.mimetype.startsWith("video/")) type_media = "video";
        else if (file.mimetype === "application/pdf") type_media = "document";

        const mediaInfo = {
          id: Date.now() + Math.random(),
          nom_original: file.originalname,
          nom_fichier: file.filename,
          chemin: file.path,
          type_mime: file.mimetype,
          type_media: type_media,
          url: fileUrl,
          taille: file.size,
          created_at: new Date().toISOString(),
        };

        console.log(`📄 [Upload] Fichier traité:`, {
          nom: file.originalname,
          type: type_media,
          url: fileUrl,
        });

        return mediaInfo;
      });

      console.log("[Upload] Upload terminé avec succès");

      res.json({
        success: true,
        message: `${req.files.length} fichier(s) uploadé(s) avec succès`,
        medias: medias,
      });
    } catch (error) {
      console.error(" [Upload] Erreur traitement:", error);
      res.status(500).json({
        success: false,
        error: "Erreur lors du traitement des fichiers: " + error.message,
      });
    }
  }
);

/**
 * Récupérer les infos
 */
router.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  console.log("📁 [Get Media] Recherche fichier:", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("❌ [Get Media] Fichier non trouvé:", filename);
      res.status(404).json({
        success: false,
        error: "Fichier non trouvé",
      });
    }
  });
});

export default router;
