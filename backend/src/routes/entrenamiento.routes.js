import express from 'express';
import {
  getEntrenamientos,
  getEntrenamiento,
  createEntrenamiento,
  updateEntrenamiento,
  deleteEntrenamiento,
  pausarEntrenamiento,
  reanudarEntrenamiento,
  finalizarEntrenamiento,
  completarSesion,
  getStats,
  duplicateEntrenamiento
} from '../controllers/entrenamiento.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

// Validation rules
const validateEntrenamiento = [
  body('clienteId')
    .notEmpty()
    .withMessage('El cliente es obligatorio')
    .isMongoId()
    .withMessage('ID de cliente inválido'),

  body('titulo')
    .trim()
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 2, max: 200 })
    .withMessage('El título debe tener entre 2 y 200 caracteres'),

  body('tipo')
    .notEmpty()
    .withMessage('El tipo es obligatorio')
    .isIn([
      'Fuerza',
      'Hipertrofia',
      'Resistencia',
      'Pérdida de Peso',
      'CrossFit',
      'Funcional',
      'Powerlifting',
      'Calistenia',
      'HIIT',
      'Otro'
    ])
    .withMessage('Tipo inválido'),

  body('objetivo')
    .notEmpty()
    .withMessage('El objetivo es obligatorio')
    .isIn([
      'Ganar Masa',
      'Perder Grasa',
      'Mantener',
      'Rendimiento',
      'Salud General',
      'Rehabilitación',
      'Competición'
    ])
    .withMessage('Objetivo inválido'),

  body('nivel')
    .optional()
    .isIn(['Principiante', 'Intermedio', 'Avanzado'])
    .withMessage('Nivel inválido'),

  body('estado')
    .optional()
    .isIn(['activo', 'completado', 'pausado', 'borrador', 'cancelado'])
    .withMessage('Estado inválido'),

  body('fechaInicio')
    .notEmpty()
    .withMessage('La fecha de inicio es obligatoria')
    .isISO8601()
    .withMessage('Fecha de inicio inválida'),

  body('fechaFin')
    .optional()
    .isISO8601()
    .withMessage('Fecha de fin inválida'),

  body('totalSemanas')
    .notEmpty()
    .withMessage('El total de semanas es obligatorio')
    .isInt({ min: 1, max: 52 })
    .withMessage('Las semanas deben estar entre 1 y 52'),

  body('diasPorSemana')
    .notEmpty()
    .withMessage('Los días por semana son obligatorios')
    .isInt({ min: 1, max: 7 })
    .withMessage('Los días por semana deben estar entre 1 y 7'),

  body('sesiones')
    .optional()
    .isArray()
    .withMessage('Las sesiones deben ser un array'),

  handleValidationErrors
];

const validateCompletarSesion = [
  body('notasCliente')
    .optional()
    .trim(),

  body('valoracionCliente')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('La valoración debe estar entre 1 y 5'),

  body('sensacionEsfuerzo')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('La sensación de esfuerzo debe estar entre 1 y 10'),

  body('ejercicios')
    .optional()
    .isArray()
    .withMessage('Los ejercicios deben ser un array'),

  handleValidationErrors
];

// All routes require authentication
router.use(protect);

// GET /api/entrenamientos/stats - Get statistics (must be before /:id)
router.get('/stats', getStats);

// GET /api/entrenamientos - Get all entrenamientos with filters
router.get('/', getEntrenamientos);

// POST /api/entrenamientos - Create new entrenamiento
router.post('/', validateEntrenamiento, createEntrenamiento);

// GET /api/entrenamientos/:id - Get single entrenamiento
router.get('/:id', getEntrenamiento);

// PUT /api/entrenamientos/:id - Update entrenamiento
router.put('/:id', validateEntrenamiento, updateEntrenamiento);

// DELETE /api/entrenamientos/:id - Delete entrenamiento (soft delete)
router.delete('/:id', deleteEntrenamiento);

// PATCH /api/entrenamientos/:id/pausar - Pause entrenamiento
router.patch('/:id/pausar', pausarEntrenamiento);

// PATCH /api/entrenamientos/:id/reanudar - Resume entrenamiento
router.patch('/:id/reanudar', reanudarEntrenamiento);

// PATCH /api/entrenamientos/:id/finalizar - Finalize entrenamiento
router.patch('/:id/finalizar', finalizarEntrenamiento);

// POST /api/entrenamientos/:id/duplicate - Duplicate entrenamiento
router.post('/:id/duplicate', duplicateEntrenamiento);

// POST /api/entrenamientos/:id/sesiones/:sesionId/completar - Complete session
router.post('/:id/sesiones/:sesionId/completar', validateCompletarSesion, completarSesion);

export default router;
