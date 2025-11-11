import express from 'express';
import bookController from '../controllers/bookController.js';
import ExtraitController from '../controllers/ExtraitController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Routes Books
router.post('/', authenticateToken, bookController.createBook);
router.get('/', authenticateToken, bookController.getBooks); // Tous les livres publiés
router.get('/mes-livres', authenticateToken, bookController.getBookById); // Mes livres
router.get('/:id', authenticateToken, bookController.getBook); // Détail d'un livre spécifique
router.put('/:id', authenticateToken, bookController.updateBook);
router.delete('/:id', authenticateToken, bookController.deleteBook);

// Routes Extraits
router.post('/extraits', authenticateToken, ExtraitController.createExtrait);
router.get('/:livreId/extraits', authenticateToken, ExtraitController.getExtraitsByLivre);
router.put('/extraits/:id', authenticateToken, ExtraitController.updateExtrait);
router.delete('/extraits/:id', authenticateToken, ExtraitController.deleteExtrait);

export default router;