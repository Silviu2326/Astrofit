import express from 'express';
import {
  getNotas,
  getNota,
  createNota,
  updateNota,
  deleteNota,
  toggleFijar,
  toggleArchivar,
  getNotasFijadas,
  getNotasArchivadas,
  agregarEtiqueta,
  eliminarEtiqueta
} from '../controllers/nota.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas especiales (antes de rutas con :id)
router.get('/fijadas', getNotasFijadas);
router.get('/archivadas', getNotasArchivadas);

// Rutas CRUD básicas
router.route('/')
  .get(getNotas)
  .post(createNota);

router.route('/:id')
  .get(getNota)
  .put(updateNota)
  .delete(deleteNota);

// Rutas de acciones
router.patch('/:id/fijar', toggleFijar);
router.patch('/:id/archivar', toggleArchivar);

// Rutas de etiquetas
router.post('/:id/etiquetas', agregarEtiqueta);
router.delete('/:id/etiquetas/:etiqueta', eliminarEtiqueta);

export default router;
