import express from 'express';
import {
  getSegmentos,
  getSegmento,
  createSegmento,
  updateSegmento,
  deleteSegmento,
  agregarCliente,
  eliminarCliente,
  agregarClientesMultiples,
  getMiembros,
  recalcularStats,
  getStats,
  toggleActive
} from '../controllers/segmento.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas de estadísticas (antes de rutas con :id)
router.get('/stats/overview', getStats);

// Rutas CRUD básicas
router.route('/')
  .get(getSegmentos)
  .post(createSegmento);

router.route('/:id')
  .get(getSegmento)
  .put(updateSegmento)
  .delete(deleteSegmento);

// Rutas de gestión de clientes
router.post('/:id/clientes/:clienteId', agregarCliente);
router.delete('/:id/clientes/:clienteId', eliminarCliente);
router.post('/:id/clientes/bulk', agregarClientesMultiples);

// Rutas de operaciones especiales
router.get('/:id/miembros', getMiembros);
router.post('/:id/recalcular', recalcularStats);
router.patch('/:id/toggle-active', toggleActive);

export default router;
