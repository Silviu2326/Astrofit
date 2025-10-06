import express from 'express';
import {
  getDietas,
  getDieta,
  createDieta,
  updateDieta,
  deleteDieta,
  addSeguimiento,
  updateSeguimiento,
  deleteSeguimiento,
  cambiarEstado,
  actualizarPeso,
  getStats,
  getDietasByCliente
} from '../controllers/dieta.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

// Validation rules
const validateDieta = [
  body('clienteId')
    .notEmpty()
    .withMessage('El cliente es obligatorio')
    .isMongoId()
    .withMessage('ID de cliente inválido'),

  body('plantillaDietaId')
    .optional()
    .isMongoId()
    .withMessage('ID de plantilla inválido'),

  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('El nombre debe tener entre 2 y 200 caracteres'),

  body('objetivo')
    .optional()
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

  body('tipoDieta')
    .optional()
    .isIn([
      'mediterranea',
      'keto',
      'vegana',
      'vegetariana',
      'paleo',
      'flexible',
      'intermitente',
      'baja_carbos',
      'alta_proteina',
      'dash',
      'cetogenica',
      'sin_gluten',
      'antiinflamatoria',
      'deportiva',
      'hipercalorica'
    ])
    .withMessage('Tipo de dieta inválido'),

  body('fechaInicio')
    .optional()
    .isISO8601()
    .withMessage('Fecha de inicio inválida'),

  body('duracion')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La duración debe ser un número positivo'),

  body('calorias_objetivo')
    .optional()
    .isInt({ min: 800, max: 5000 })
    .withMessage('Las calorías objetivo deben estar entre 800 y 5000'),

  body('macros_objetivo')
    .optional()
    .isObject()
    .withMessage('Los macros objetivo deben ser un objeto'),

  body('macros_objetivo.proteinas')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Las proteínas deben ser un número positivo'),

  body('macros_objetivo.carbohidratos')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Los carbohidratos deben ser un número positivo'),

  body('macros_objetivo.grasas')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Las grasas deben ser un número positivo'),

  body('restricciones')
    .optional()
    .isArray()
    .withMessage('Las restricciones deben ser un array'),

  body('alergenos')
    .optional()
    .isArray()
    .withMessage('Los alérgenos deben ser un array'),

  body('peso_inicial')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El peso inicial debe ser un número positivo'),

  body('peso_actual')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El peso actual debe ser un número positivo'),

  body('peso_objetivo')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El peso objetivo debe ser un número positivo'),

  body('estado')
    .optional()
    .isIn(['activo', 'pausado', 'completado', 'en pausa', 'cancelado'])
    .withMessage('Estado inválido'),

  handleValidationErrors
];

const validateSeguimiento = [
  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('Fecha inválida'),

  body('peso')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El peso debe ser un número positivo'),

  body('calorias_consumidas')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Las calorías consumidas deben ser un número positivo'),

  body('macros_consumidos')
    .optional()
    .isObject()
    .withMessage('Los macros consumidos deben ser un objeto'),

  body('macros_consumidos.proteinas')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Las proteínas deben ser un número positivo'),

  body('macros_consumidos.carbohidratos')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Los carbohidratos deben ser un número positivo'),

  body('macros_consumidos.grasas')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Las grasas deben ser un número positivo'),

  body('adherencia_dia')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('La adherencia debe estar entre 0 y 100'),

  handleValidationErrors
];

const validateEstado = [
  body('estado')
    .notEmpty()
    .withMessage('El estado es obligatorio')
    .isIn(['activo', 'pausado', 'completado', 'en pausa', 'cancelado'])
    .withMessage('Estado inválido'),

  handleValidationErrors
];

const validatePeso = [
  body('peso')
    .notEmpty()
    .withMessage('El peso es obligatorio')
    .isFloat({ min: 0 })
    .withMessage('El peso debe ser un número positivo'),

  handleValidationErrors
];

const validateMongoId = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido'),

  handleValidationErrors
];

const validateClienteId = [
  param('clienteId')
    .isMongoId()
    .withMessage('ID de cliente inválido'),

  handleValidationErrors
];

// All routes require authentication
router.use(protect);

// GET /api/dietas/stats - Get statistics (must be before /:id)
router.get('/stats', getStats);

// GET /api/dietas/cliente/:clienteId - Get dietas by client (must be before /:id)
router.get('/cliente/:clienteId', validateClienteId, getDietasByCliente);

// GET /api/dietas - Get all dietas with filters
router.get('/', getDietas);

// POST /api/dietas - Create new dieta
router.post('/', validateDieta, createDieta);

// GET /api/dietas/:id - Get single dieta
router.get('/:id', validateMongoId, getDieta);

// PUT /api/dietas/:id - Update dieta
router.put('/:id', [...validateMongoId, ...validateDieta], updateDieta);

// DELETE /api/dietas/:id - Delete dieta (soft delete)
router.delete('/:id', validateMongoId, deleteDieta);

// POST /api/dietas/:id/seguimiento - Add seguimiento
router.post('/:id/seguimiento', [...validateMongoId, ...validateSeguimiento], addSeguimiento);

// PUT /api/dietas/:id/seguimiento/:seguimientoId - Update seguimiento
router.put(
  '/:id/seguimiento/:seguimientoId',
  [
    param('id').isMongoId().withMessage('ID de dieta inválido'),
    param('seguimientoId').isMongoId().withMessage('ID de seguimiento inválido'),
    ...validateSeguimiento
  ],
  updateSeguimiento
);

// DELETE /api/dietas/:id/seguimiento/:seguimientoId - Delete seguimiento
router.delete(
  '/:id/seguimiento/:seguimientoId',
  [
    param('id').isMongoId().withMessage('ID de dieta inválido'),
    param('seguimientoId').isMongoId().withMessage('ID de seguimiento inválido'),
    handleValidationErrors
  ],
  deleteSeguimiento
);

// PATCH /api/dietas/:id/estado - Change estado
router.patch('/:id/estado', [...validateMongoId, ...validateEstado], cambiarEstado);

// PATCH /api/dietas/:id/peso - Update peso
router.patch('/:id/peso', [...validateMongoId, ...validatePeso], actualizarPeso);

export default router;
