import express from 'express';
import {
  getTasasImpuesto,
  getTasaImpuesto,
  getTasasActivas,
  getTasaByCodigo,
  createTasaImpuesto,
  updateTasaImpuesto,
  deleteTasaImpuesto,
  calcularImpuesto
} from '../controllers/tasaImpuesto.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Special routes (must be before /:id)
router.get('/activas', getTasasActivas);
router.get('/codigo/:codigo', getTasaByCodigo);

// CRUD routes
router.route('/')
  .get(getTasasImpuesto)
  .post(createTasaImpuesto);

router.route('/:id')
  .get(getTasaImpuesto)
  .put(updateTasaImpuesto)
  .delete(deleteTasaImpuesto);

// Calculate tax
router.post('/:id/calcular', calcularImpuesto);

export default router;
