import express from 'express';
import {
  getEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
  completarEvento,
  cancelarEvento,
  getEventosDelDia,
  getProximosEventos
} from '../controllers/evento.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas especiales (antes de rutas con :id)
router.get('/proximos', getProximosEventos);
router.get('/dia/:fecha', getEventosDelDia);

// Rutas CRUD básicas
router.route('/')
  .get(getEventos)
  .post(createEvento);

router.route('/:id')
  .get(getEvento)
  .put(updateEvento)
  .delete(deleteEvento);

// Rutas de acciones
router.patch('/:id/completar', completarEvento);
router.patch('/:id/cancelar', cancelarEvento);

export default router;
