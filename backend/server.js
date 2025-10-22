import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";

// Routes - IMPORTANT: utiliser le bon chemin
import authRoutes from "./routes/auth.js"; // ✅ Route d'authentification
import profileRoutes from "./routes/profile.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // ou le port de votre frontend
  credentials: true
}));
app.use(express.json());

// Test connexion DB
pool.connect()
  .then(() => console.log("✅ Connecté à PostgreSQL"))
  .catch((err) => console.error("❌ Erreur de connexion DB:", err));

// Routes API
app.use("/api/auth", authRoutes); // ✅ Uniquement les routes d'auth pour commencer
app.use("/api/profile", profileRoutes);

// Route de test
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 API Vakio_Boky - Communauté Littéraire",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    database: "Connected",
    timestamp: new Date().toISOString() 
  });
});

// ✅ Route 404 pour les routes non trouvées
app.use((req, res, next) => {
  res.status(404).json({ 
    error: "Route non trouvée",
    path: req.path,
    method: req.method,
    available_endpoints: [
      "GET /",
      "GET /api/health", 
      "POST /api/auth/login",
      "POST /api/auth/register"
    ]
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("🔥 Erreur serveur:", err);
  res.status(500).json({ 
    error: "Erreur interne du serveur",
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🎯 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📚 Vakio_Boky - Communauté Littéraire`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/health`);
});