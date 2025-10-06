import express from 'express';
import {
  getRecetas,
  getReceta,
  createReceta,
  updateReceta,
  deleteReceta,
  toggleFavorita,
  updateRating,
  incrementarUso,
  getStats,
  getRecetasPublicas,
  duplicarReceta
} from '../controllers/receta.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

// Validation rules
const validateReceta = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('El nombre debe tener entre 2 y 200 caracteres'),

  body('tipoComida')
    .notEmpty()
    .withMessage('El tipo de comida es obligatorio')
    .isIn(['Desayuno', 'Almuerzo', 'Cena', 'Snack', 'Postre', 'Bebida'])
    .withMessage('Tipo de comida inválido'),

  body('dificultad')
    .optional()
    .isIn(['Fácil', 'Media', 'Difícil'])
    .withMessage('Dificultad inválida'),

  body('tiempoPreparacion')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El tiempo de preparación debe ser un número positivo'),

  body('tiempoCoccion')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El tiempo de cocción debe ser un número positivo'),

  body('porciones')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Las porciones deben ser al menos 1'),

  body('ingredientes')
    .optional()
    .isArray()
    .withMessage('Los ingredientes deben ser un array'),

  body('ingredientes.*.nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre del ingrediente es obligatorio'),

  body('ingredientes.*.cantidad')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La cantidad debe ser un número positivo'),

  body('ingredientes.*.unidad')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La unidad es obligatoria'),

  body('pasos')
    .optional()
    .isArray()
    .withMessage('Los pasos deben ser un array'),

  body('pasos.*.orden')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El orden debe ser un número positivo'),

  body('pasos.*.descripcion')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La descripción del paso es obligatoria'),

  body('pasos.*.tiempoEstimado')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El tiempo estimado debe ser un número positivo'),

  body('valoresNutricionales')
    .notEmpty()
    .withMessage('Los valores nutricionales son obligatorios')
    .isObject()
    .withMessage('Los valores nutricionales deben ser un objeto'),

  body('valoresNutricionales.calorias')
    .notEmpty()
    .withMessage('Las calorías son obligatorias')
    .isFloat({ min: 0 })
    .withMessage('Las calorías deben ser un número positivo'),

  body('valoresNutricionales.proteinas')
    .notEmpty()
    .withMessage('Las proteínas son obligatorias')
    .isFloat({ min: 0 })
    .withMessage('Las proteínas deben ser un número positivo'),

  body('valoresNutricionales.carbohidratos')
    .notEmpty()
    .withMessage('Los carbohidratos son obligatorios')
    .isFloat({ min: 0 })
    .withMessage('Los carbohidratos deben ser un número positivo'),

  body('valoresNutricionales.grasas')
    .notEmpty()
    .withMessage('Las grasas son obligatorias')
    .isFloat({ min: 0 })
    .withMessage('Las grasas deben ser un número positivo'),

  body('valoresNutricionales.fibra')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La fibra debe ser un número positivo'),

  body('valoresNutricionales.sodio')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El sodio debe ser un número positivo'),

  body('valoresNutricionales.azucar')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El azúcar debe ser un número positivo'),

  body('restricciones')
    .optional()
    .isArray()
    .withMessage('Las restricciones deben ser un array'),

  body('restricciones.*')
    .optional()
    .isIn(['Vegano', 'Vegetariano', 'Sin gluten', 'Sin lactosa', 'Sin frutos secos', 'Bajo en sodio', 'Diabético', 'Keto', 'Paleo'])
    .withMessage('Restricción inválida'),

  body('etiquetas')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('El rating debe estar entre 0 y 5'),

  body('badge')
    .optional()
    .isIn(['Más Popular', 'Nuevo', "Chef's Choice", ''])
    .withMessage('Badge inválido'),

  handleValidationErrors
];

const validateRating = [
  body('rating')
    .notEmpty()
    .withMessage('El rating es obligatorio')
    .isFloat({ min: 0, max: 5 })
    .withMessage('El rating debe estar entre 0 y 5'),

  handleValidationErrors
];

const validateMongoId = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido'),

  handleValidationErrors
];

// All routes require authentication
router.use(protect);

// GET /api/recetas/stats - Get statistics (must be before /:id)
router.get('/stats', getStats);

// GET /api/recetas/publicas - Get public recetas (must be before /:id)
router.get('/publicas', getRecetasPublicas);

// GET /api/recetas - Get all recetas with filters
router.get('/', getRecetas);

// POST /api/recetas - Create new receta
router.post('/', validateReceta, createReceta);

// GET /api/recetas/:id - Get single receta
router.get('/:id', validateMongoId, getReceta);

// PUT /api/recetas/:id - Update receta
router.put('/:id', [...validateMongoId, ...validateReceta], updateReceta);

// DELETE /api/recetas/:id - Delete receta (soft delete)
router.delete('/:id', validateMongoId, deleteReceta);

// PATCH /api/recetas/:id/favorita - Toggle favorita status
router.patch('/:id/favorita', validateMongoId, toggleFavorita);

// PATCH /api/recetas/:id/rating - Update rating
router.patch('/:id/rating', [...validateMongoId, ...validateRating], updateRating);

// PATCH /api/recetas/:id/uso - Increment uso counter
router.patch('/:id/uso', validateMongoId, incrementarUso);

// POST /api/recetas/:id/duplicar - Duplicate receta
router.post('/:id/duplicar', validateMongoId, duplicarReceta);

export default router;
