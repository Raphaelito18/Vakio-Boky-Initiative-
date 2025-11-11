import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Database
import pool from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";

// Middleware
import { handleUploadErrors } from "./middleware/upload.js";

import profileRoutes from "./routes/profile.js";
import postRoutes from "./routes/posts.js";
import mediaRoutes from "./routes/medias.js";
import commentRoutes from "./routes/comments.js";
import bookRoutes from "./routes/bookRoutes.js";
// const bookRoutes = require('./routes/bookRoutes');
import clubRoutes from "./routes/clubs.js";

import emailRoutes from './routes/emailRoutes.js';

// Ajouter cette ligne dans les routes

// import eventRoutes from "./routes/events.js";
// import notificationRoutes from "./routes/notifications.js";
import eventRoutes from "./routes/events.js";
import postesRoutes from "./routes/postes.js";
import notificationRoutes from "./routes/notifications.js";

import marketplaceRoutes from './routes/marketplace.js';



dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Augmentation limite pour fichiers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Configuration des fichiers statiques
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test connexion DB
pool
  .connect()
  .then(() => console.log(" Connecté à PostgreSQL"))
  .catch((err) => console.error(" Erreur de connexion DB:", err));

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/medias", mediaRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/books", bookRoutes);

// app.use("/api/events", eventRoutes);
// app.use("/api/notifications", notificationRoutes);
app.use("/api/clubs", eventRoutes); // ✅ Les routes events sont sous /api/clubs
app.use("/api/clubs", postesRoutes);  // ✅ Les routes posts sont sous /api/clubs  
app.use("/api/notifications", notificationRoutes);

app.use('/api', marketplaceRoutes);

// Route clubs
app.use("/api/clubs", clubRoutes);

app.use('/api/emails', emailRoutes);

// Routes de statut
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API Vakio_Boky - Communauté Littéraire",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database: "Connected",
    timestamp: new Date().toISOString(),
  });
});

// MIDDLEWARE 404
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route non trouvée",
    path: req.path,
    method: req.method,
    available_endpoints: [
      "GET /",
      "GET /api/health",
      "POST /api/auth/login",
      "POST /api/auth/register",
      "GET /api/posts",
      "POST /api/posts",
      "GET /api/comments",
      "POST /api/comments",
      // "POST /api/events",
    ],
  });
});

// GESTION D'ERREURS
app.use((err, req, res, next) => {
  console.error("🔥 Erreur serveur:", err);

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token invalide" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === "23505") {
    return res.status(409).json({ error: "Donnée déjà existante" });
  }

  res.status(500).json({
    error: "Erreur interne du serveur",
    ...(process.env.NODE_ENV === "development" && {
      details: err.message,
    }),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🎯 Environnement: ${process.env.NODE_ENV || "development"}`);
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📚 Vakio_Boky - Communauté Littéraire`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/health`);
  console.log(`📁 Fichiers statiques: http://localhost:${PORT}/uploads`);
});

// Error middleware
app.use(handleUploadErrors);







