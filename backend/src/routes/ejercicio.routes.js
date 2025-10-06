import express from 'express';
import {
  getEjercicios,
  getEjercicio,
  createEjercicio,
  updateEjercicio,
  deleteEjercicio,
  bulkDeleteEjercicios,
  bulkAddTags,
  incrementarUso,
  getStats,
  duplicateEjercicio
} from '../controllers/ejercicio.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

// Validation rules
const validateEjercicio = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 200 })
    .withMessage('El nombre debe tener entre 2 y 200 caracteres'),

  body('grupoMuscular')
    .notEmpty()
    .withMessage('El grupo muscular es obligatorio')
    .isIn([
      'pecho',
      'espalda',
      'hombros',
      'brazos',
      'piernas',
      'core',
      'gluteos',
      'pantorrillas',
      'todo-cuerpo',
      'otro'
    ])
    .withMessage('Grupo muscular inválido'),

  body('categoria')
    .optional()
    .isIn([
      'fuerza',
      'cardio',
      'flexibilidad',
      'equilibrio',
      'funcional',
      'deportivo',
      'otro'
    ])
    .withMessage('Categoría inválida'),

  body('nivel')
    .optional()
    .isIn(['principiante', 'intermedio', 'avanzado'])
    .withMessage('Nivel inválido'),

  body('estado')
    .optional()
    .isIn(['activo', 'borrador', 'archivado'])
    .withMessage('Estado inválido'),

  body('tipo')
    .optional()
    .isIn(['compuesto', 'aislamiento', 'cardio', 'estatico'])
    .withMessage('Tipo inválido'),

  body('equipamiento')
    .optional()
    .isArray()
    .withMessage('El equipamiento debe ser un array'),

  body('etiquetas')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array'),

  body('instrucciones')
    .optional()
    .isArray()
    .withMessage('Las instrucciones deben ser un array'),

  body('variaciones')
    .optional()
    .isArray()
    .withMessage('Las variaciones deben ser un array'),

  handleValidationErrors
];

const validateBulkTags = [
  body('ids')
    .isArray({ min: 1 })
    .withMessage('Debe proporcionar al menos un ID'),

  body('tags')
    .isArray({ min: 1 })
    .withMessage('Debe proporcionar al menos una etiqueta'),

  handleValidationErrors
];

const validateBulkDelete = [
  body('ids')
    .isArray({ min: 1 })
    .withMessage('Debe proporcionar al menos un ID'),

  handleValidationErrors
];

// All routes require authentication
router.use(protect);

// GET /api/ejercicios/stats - Get statistics (must be before /:id)
router.get('/stats', getStats);

// POST /api/ejercicios/bulk-delete - Bulk delete ejercicios
router.post('/bulk-delete', validateBulkDelete, bulkDeleteEjercicios);

// POST /api/ejercicios/bulk-add-tags - Bulk add tags
router.post('/bulk-add-tags', validateBulkTags, bulkAddTags);

// GET /api/ejercicios - Get all ejercicios with filters
router.get('/', getEjercicios);

// POST /api/ejercicios - Create new ejercicio
router.post('/', validateEjercicio, createEjercicio);

// GET /api/ejercicios/:id - Get single ejercicio
router.get('/:id', getEjercicio);

// PUT /api/ejercicios/:id - Update ejercicio
router.put('/:id', validateEjercicio, updateEjercicio);

// DELETE /api/ejercicios/:id - Delete ejercicio (soft delete)
router.delete('/:id', deleteEjercicio);

// PATCH /api/ejercicios/:id/increment-uso - Increment usage counter
router.patch('/:id/increment-uso', incrementarUso);

// POST /api/ejercicios/:id/duplicate - Duplicate ejercicio
router.post('/:id/duplicate', duplicateEjercicio);

export default router;
