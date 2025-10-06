import express from 'express';
import {
  getTareas,
  getTarea,
  createTarea,
  updateTarea,
  deleteTarea,
  getStats,
  getTareasVencidas,
  getTareasProximas,
  completarTarea,
  agregarEtiqueta,
  eliminarEtiqueta
} from '../controllers/tarea.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas especiales (deben estar antes de las rutas con :id)
router.get('/stats/overview', getStats);
router.get('/vencidas', getTareasVencidas);
router.get('/proximas', getTareasProximas);

// Rutas CRUD principales
router.route('/')
  .get(getTareas)      // GET /api/tareas - Obtener todas las tareas
  .post(createTarea);  // POST /api/tareas - Crear nueva tarea

router.route('/:id')
  .get(getTarea)       // GET /api/tareas/:id - Obtener una tarea
  .put(updateTarea)    // PUT /api/tareas/:id - Actualizar tarea
  .delete(deleteTarea); // DELETE /api/tareas/:id - Eliminar tarea

// Rutas de acciones específicas
router.patch('/:id/completar', completarTarea);

// Rutas de etiquetas
router.post('/:id/etiquetas', agregarEtiqueta);
router.delete('/:id/etiquetas/:etiqueta', eliminarEtiqueta);

export default router;
