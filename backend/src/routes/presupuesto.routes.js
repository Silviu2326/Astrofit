import express from 'express';
import {
  getPresupuestos,
  getPresupuesto,
  createPresupuesto,
  updatePresupuesto,
  deletePresupuesto,
  getPresupuestosByYear,
  getPresupuestosByPeriodo,
  actualizarGastoActual,
  actualizarTodosGastos,
  getPresupuestosSummary,
  getPresupuestosExcedidos,
  getPresupuestosConAlertas
} from '../controllers/presupuesto.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Stats and special routes (must be before /:id)
router.get('/stats/summary', getPresupuestosSummary);
router.get('/excedidos', getPresupuestosExcedidos);
router.get('/alertas', getPresupuestosConAlertas);
router.get('/year/:year', getPresupuestosByYear);
router.get('/periodo/:periodo', getPresupuestosByPeriodo);
router.put('/actualizar-todos', actualizarTodosGastos);

// CRUD routes
router.route('/')
  .get(getPresupuestos)
  .post(createPresupuesto);

router.route('/:id')
  .get(getPresupuesto)
  .put(updatePresupuesto)
  .delete(deletePresupuesto);

router.put('/:id/actualizar-gasto', actualizarGastoActual);

export default router;
