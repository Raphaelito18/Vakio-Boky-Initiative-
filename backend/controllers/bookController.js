import pool from '../config/db.js';

// GET /api/books - Liste des livres
const getBooks = async (req, res) => {
  try {
    const query = `
      SELECT l.*, u.nom as auteur_nom 
      FROM livres l 
      LEFT JOIN utilisateur u ON l.auteur_id = u.id 
      WHERE l.statut = 'publié'
      ORDER BY l.created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/books/mes-livres - Mes livres
const getBookById = async (req, res) => {
  try {
    const auteur_id = req.user.id;
    
    const query = `
      SELECT l.*, u.nom as auteur_nom 
      FROM livres l 
      LEFT JOIN utilisateur u ON l.auteur_id = u.id 
      WHERE l.auteur_id = $1
      ORDER BY l.created_at DESC
    `;
    const result = await pool.query(query, [auteur_id]);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/books - Créer un livre
const createBook = async (req, res) => {
  try {
    const { titre, description, couverture_url, genre, isbn, statut = 'brouillon' } = req.body;
    const auteur_id = req.user.id;

    const query = `
      INSERT INTO livres (titre, auteur_id, description, couverture_url, genre, isbn, statut)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [titre, auteur_id, description, couverture_url, genre, isbn, statut];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/books/:id - Modifier un livre
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, couverture_url, genre, isbn, statut } = req.body;
    const auteur_id = req.user.id;

    // Vérifier que l'utilisateur est l'auteur
    const checkQuery = 'SELECT auteur_id FROM livres WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    if (checkResult.rows[0].auteur_id !== auteur_id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    const query = `
      UPDATE livres 
      SET titre = $1, description = $2, couverture_url = $3, genre = $4, isbn = $5, statut = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `;
    
    const values = [titre, description, couverture_url, genre, isbn, statut, id];
    const result = await pool.query(query, values);
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/books/:id - Supprimer un livre
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const auteur_id = req.user.id;

    // Vérifier que l'utilisateur est l'auteur
    const checkQuery = 'SELECT auteur_id FROM livres WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    if (checkResult.rows[0].auteur_id !== auteur_id) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    await pool.query('DELETE FROM livres WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un livre spécifique par ID
const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT l.*, u.nom as auteur_nom 
      FROM livres l 
      LEFT JOIN utilisateur u ON l.auteur_id = u.id 
      WHERE l.id = $1
    `;
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getBooks,
  getBookById, 
  getBook,     
  createBook,
  updateBook,
  deleteBook
};