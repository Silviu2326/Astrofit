import express from 'express';
import {
  getGastos,
  getGasto,
  createGasto,
  updateGasto,
  deleteGasto,
  getGastosStats,
  getGastosByPeriodo,
  bulkUpdateEstado,
  bulkDeleteGastos
} from '../controllers/gasto.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Stats and analytics routes (must be before /:id)
router.get('/stats/summary', getGastosStats);
router.get('/periodo/:periodo', getGastosByPeriodo);

// Bulk operations
router.put('/bulk/estado', bulkUpdateEstado);
router.delete('/bulk/delete', bulkDeleteGastos);

// CRUD routes
router.route('/')
  .get(getGastos)
  .post(createGasto);

router.route('/:id')
  .get(getGasto)
  .put(updateGasto)
  .delete(deleteGasto);

export default router;
