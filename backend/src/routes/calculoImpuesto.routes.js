import express from 'express';
import {
  getCalculosImpuesto,
  getCalculoImpuesto,
  getCalculoByFactura,
  getEstadisticas,
  createCalculoImpuesto,
  createCalculoFromFactura,
  updateCalculoImpuesto,
  deleteCalculoImpuesto,
  recalcularImpuesto
} from '../controllers/calculoImpuesto.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Special routes (must be before /:id)
router.get('/estadisticas', getEstadisticas);
router.get('/factura/:facturaId', getCalculoByFactura);
router.post('/from-factura/:facturaId', createCalculoFromFactura);

// CRUD routes
router.route('/')
  .get(getCalculosImpuesto)
  .post(createCalculoImpuesto);

router.route('/:id')
  .get(getCalculoImpuesto)
  .put(updateCalculoImpuesto)
  .delete(deleteCalculoImpuesto);

// Recalculate
router.post('/:id/recalcular', recalcularImpuesto);

export default router;
