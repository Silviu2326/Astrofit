import express from 'express';
import {
  getDeclaracionesTrimestrales,
  getDeclaracionTrimestral,
  getDeclaracionByPeriodo,
  getResumenAnual,
  createDeclaracionTrimestral,
  createDeclaracionFromPeriodo,
  updateDeclaracionTrimestral,
  presentarDeclaracion,
  pagarDeclaracion,
  deleteDeclaracionTrimestral
} from '../controllers/declaracionTrimestral.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Special routes (must be before /:id)
router.get('/periodo/:año/:trimestre', getDeclaracionByPeriodo);
router.get('/resumen/:año', getResumenAnual);
router.post('/from-periodo', createDeclaracionFromPeriodo);

// CRUD routes
router.route('/')
  .get(getDeclaracionesTrimestrales)
  .post(createDeclaracionTrimestral);

router.route('/:id')
  .get(getDeclaracionTrimestral)
  .put(updateDeclaracionTrimestral)
  .delete(deleteDeclaracionTrimestral);

// Action routes
router.post('/:id/presentar', presentarDeclaracion);
router.post('/:id/pagar', pagarDeclaracion);

export default router;
