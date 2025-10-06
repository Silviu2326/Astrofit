import express from 'express';
import {
  getPlantillas,
  getPlantilla,
  createPlantilla,
  updatePlantilla,
  deletePlantilla,
  toggleFavorita,
  incrementarUso,
  calificarPlantilla,
  duplicatePlantilla,
  getStats,
  getPlantillasPublicas
} from '../controllers/plantillaEntrenamiento.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

// Validation rules
const validatePlantilla = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 200 })
    .withMessage('El nombre debe tener entre 2 y 200 caracteres'),

  body('objetivo')
    .notEmpty()
    .withMessage('El objetivo es obligatorio')
    .isIn([
      'perdida-peso',
      'ganancia-musculo',
      'fuerza',
      'resistencia',
      'flexibilidad',
      'rehabilitacion',
      'mantenimiento'
    ])
    .withMessage('Objetivo inválido'),

  body('nivel')
    .notEmpty()
    .withMessage('El nivel es obligatorio')
    .isIn(['principiante', 'intermedio', 'avanzado', 'experto'])
    .withMessage('Nivel inválido'),

  body('modalidad')
    .notEmpty()
    .withMessage('La modalidad es obligatoria')
    .isIn([
      'gym',
      'casa',
      'exterior',
      'funcional',
      'crossfit',
      'yoga',
      'pilates',
      'otro'
    ])
    .withMessage('Modalidad inválida'),

  body('visibilidad')
    .optional()
    .isIn(['privada', 'publica', 'equipo'])
    .withMessage('Visibilidad inválida'),

  body('estado')
    .optional()
    .isIn(['activa', 'borrador', 'archivada'])
    .withMessage('Estado inválido'),

  body('duracionSemanas')
    .optional()
    .isInt({ min: 1, max: 52 })
    .withMessage('La duración debe estar entre 1 y 52 semanas'),

  body('diasPorSemana')
    .optional()
    .isInt({ min: 1, max: 7 })
    .withMessage('Los días por semana deben estar entre 1 y 7'),

  body('duracionSesion')
    .optional()
    .isInt({ min: 15, max: 180 })
    .withMessage('La duración de sesión debe estar entre 15 y 180 minutos'),

  body('equipamiento')
    .optional()
    .isArray()
    .withMessage('El equipamiento debe ser un array'),

  body('etiquetas')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array'),

  body('diasEntrenamiento')
    .optional()
    .isArray()
    .withMessage('Los días de entrenamiento deben ser un array'),

  body('gruposMusculares')
    .optional()
    .isArray()
    .withMessage('Los grupos musculares deben ser un array'),

  handleValidationErrors
];

const validateCalificacion = [
  body('puntos')
    .isInt({ min: 1, max: 5 })
    .withMessage('La calificación debe estar entre 1 y 5'),

  handleValidationErrors
];

// All routes require authentication
router.use(protect);

// GET /api/plantillas-entrenamiento/stats - Get statistics (must be before /:id)
router.get('/stats', getStats);

// GET /api/plantillas-entrenamiento/publicas - Get public plantillas (must be before /:id)
router.get('/publicas', getPlantillasPublicas);

// GET /api/plantillas-entrenamiento - Get all plantillas with filters
router.get('/', getPlantillas);

// POST /api/plantillas-entrenamiento - Create new plantilla
router.post('/', validatePlantilla, createPlantilla);

// GET /api/plantillas-entrenamiento/:id - Get single plantilla
router.get('/:id', getPlantilla);

// PUT /api/plantillas-entrenamiento/:id - Update plantilla
router.put('/:id', validatePlantilla, updatePlantilla);

// DELETE /api/plantillas-entrenamiento/:id - Delete plantilla (soft delete)
router.delete('/:id', deletePlantilla);

// PATCH /api/plantillas-entrenamiento/:id/toggle-favorita - Toggle favorite
router.patch('/:id/toggle-favorita', toggleFavorita);

// PATCH /api/plantillas-entrenamiento/:id/increment-uso - Increment usage counter
router.patch('/:id/increment-uso', incrementarUso);

// POST /api/plantillas-entrenamiento/:id/calificar - Rate plantilla
router.post('/:id/calificar', validateCalificacion, calificarPlantilla);

// POST /api/plantillas-entrenamiento/:id/duplicate - Duplicate plantilla
router.post('/:id/duplicate', duplicatePlantilla);

export default router;
