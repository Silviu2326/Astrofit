import express from 'express';
import {
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente,
  bulkDeleteClientes,
  bulkAddTags,
  updateActivity,
  getStats
} from '../controllers/cliente.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

// Validation rules
const validateCliente = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),

  body('telefono')
    .optional()
    .trim(),

  body('estado')
    .optional()
    .isIn(['activo', 'inactivo'])
    .withMessage('Estado inválido'),

  body('etiquetas')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array'),

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

// GET /api/clientes/stats - Get statistics (must be before /:id)
router.get('/stats', getStats);

// POST /api/clientes/bulk-delete - Bulk delete clientes
router.post('/bulk-delete', validateBulkDelete, bulkDeleteClientes);

// POST /api/clientes/bulk-add-tags - Bulk add tags
router.post('/bulk-add-tags', validateBulkTags, bulkAddTags);

// GET /api/clientes - Get all clientes with filters
router.get('/', getClientes);

// POST /api/clientes - Create new cliente
router.post('/', validateCliente, createCliente);

// GET /api/clientes/:id - Get single cliente
router.get('/:id', getCliente);

// PUT /api/clientes/:id - Update cliente
router.put('/:id', validateCliente, updateCliente);

// DELETE /api/clientes/:id - Delete cliente (soft delete)
router.delete('/:id', deleteCliente);

// PATCH /api/clientes/:id/activity - Update activity timestamp
router.patch('/:id/activity', updateActivity);

export default router;
