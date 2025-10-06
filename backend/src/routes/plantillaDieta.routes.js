import express from 'express';
import {
  getPlantillasDietas,
  getPlantillaDieta,
  createPlantillaDieta,
  updatePlantillaDieta,
  deletePlantillaDieta,
  toggleFavorita,
  incrementarUso,
  calificarPlantilla,
  duplicatePlantilla,
  getStats,
  getPlantillasDietasPublicas
} from '../controllers/plantillaDieta.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

// Validation rules
const validatePlantillaDieta = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 200 })
    .withMessage('El nombre debe tener entre 2 y 200 caracteres'),

  body('objective')
    .notEmpty()
    .withMessage('El objetivo es obligatorio')
    .isIn([
      'perdida_peso',
      'ganancia_muscular',
      'mantenimiento',
      'definicion',
      'volumen_limpio',
      'rendimiento',
      'salud_general',
      'recomposicion'
    ])
    .withMessage('Objetivo inválido'),

  body('dietType')
    .notEmpty()
    .withMessage('El tipo de dieta es obligatorio')
    .isIn([
      'mediterranea',
      'keto',
      'vegana',
      'vegetariana',
      'paleo',
      'flexible',
      'intermitente',
      'baja_carbos',
      'alta_proteina'
    ])
    .withMessage('Tipo de dieta inválido'),

  body('time_level')
    .notEmpty()
    .withMessage('El nivel de tiempo es obligatorio')
    .isIn(['quick', 'advanced', 'no_cook'])
    .withMessage('Nivel de tiempo inválido'),

  body('culinary_experience')
    .notEmpty()
    .withMessage('La experiencia culinaria es obligatoria')
    .isIn(['beginner', 'intermediate', 'expert'])
    .withMessage('Experiencia culinaria inválida'),

  body('calories')
    .notEmpty()
    .withMessage('Las calorías son obligatorias')
    .isInt({ min: 800, max: 5000 })
    .withMessage('Las calorías deben estar entre 800 y 5000'),

  body('macros')
    .optional()
    .isObject()
    .withMessage('Los macros deben ser un objeto'),

  body('macros.protein')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Las proteínas deben ser un número positivo'),

  body('macros.carbs')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Los carbohidratos deben ser un número positivo'),

  body('macros.fat')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Las grasas deben ser un número positivo'),

  body('duration_weeks')
    .optional()
    .isInt({ min: 1, max: 52 })
    .withMessage('La duración debe estar entre 1 y 52 semanas'),

  body('is_public')
    .optional()
    .isBoolean()
    .withMessage('is_public debe ser un booleano'),

  body('is_favorite')
    .optional()
    .isBoolean()
    .withMessage('is_favorite debe ser un booleano'),

  body('restrictions')
    .optional()
    .isArray()
    .withMessage('Las restricciones deben ser un array'),

  body('allergens')
    .optional()
    .isArray()
    .withMessage('Los alérgenos deben ser un array'),

  body('weekly_menu')
    .optional()
    .isArray()
    .withMessage('El menú semanal debe ser un array'),

  body('estado')
    .optional()
    .isIn(['activa', 'borrador', 'archivada'])
    .withMessage('Estado inválido'),

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

// GET /api/plantillas-dietas/stats - Get statistics (must be before /:id)
router.get('/stats', getStats);

// GET /api/plantillas-dietas/publicas - Get public plantillas dietas (must be before /:id)
router.get('/publicas', getPlantillasDietasPublicas);

// GET /api/plantillas-dietas - Get all plantillas dietas with filters
router.get('/', getPlantillasDietas);

// POST /api/plantillas-dietas - Create new plantilla dieta
router.post('/', validatePlantillaDieta, createPlantillaDieta);

// GET /api/plantillas-dietas/:id - Get single plantilla dieta
router.get('/:id', getPlantillaDieta);

// PUT /api/plantillas-dietas/:id - Update plantilla dieta
router.put('/:id', validatePlantillaDieta, updatePlantillaDieta);

// DELETE /api/plantillas-dietas/:id - Delete plantilla dieta (soft delete)
router.delete('/:id', deletePlantillaDieta);

// PATCH /api/plantillas-dietas/:id/toggle-favorita - Toggle favorite
router.patch('/:id/toggle-favorita', toggleFavorita);

// PATCH /api/plantillas-dietas/:id/increment-uso - Increment usage counter
router.patch('/:id/increment-uso', incrementarUso);

// POST /api/plantillas-dietas/:id/calificar - Rate plantilla dieta
router.post('/:id/calificar', validateCalificacion, calificarPlantilla);

// POST /api/plantillas-dietas/:id/duplicate - Duplicate plantilla dieta
router.post('/:id/duplicate', duplicatePlantilla);

export default router;
