import express from 'express';
import { body } from 'express-validator';
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  bulkDeleteLeads,
  bulkAddTags,
  updateContacto,
  convertirACliente,
  getStats
} from '../controllers/lead.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { handleValidationErrors } from '../middleware/validate.middleware.js';

const router = express.Router();

// Validation rules
const validateLead = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('email').trim().notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido'),
  body('telefono').optional().trim(),
  body('estado').optional().isIn(['nuevo', 'contactado', 'interesado', 'no-interesado', 'convertido', 'perdido'])
    .withMessage('Estado inválido'),
  body('prioridad').optional().isIn(['baja', 'media', 'alta'])
    .withMessage('Prioridad inválida'),
  body('fuente').optional().isIn(['web', 'redes-sociales', 'referido', 'evento', 'publicidad', 'otro'])
    .withMessage('Fuente inválida'),
  body('etiquetas').optional().isArray().withMessage('Las etiquetas deben ser un array'),
  body('interes').optional().trim(),
  body('presupuesto').optional().isNumeric().withMessage('El presupuesto debe ser un número'),
  body('notas').optional().trim(),
  body('fechaContacto').optional().isISO8601().withMessage('Fecha de contacto inválida'),
  body('proximoSeguimiento').optional().isISO8601().withMessage('Fecha de seguimiento inválida'),
  handleValidationErrors
];

const validateBulkDelete = [
  body('ids').isArray().withMessage('Se requiere un array de IDs')
    .notEmpty().withMessage('El array de IDs no puede estar vacío'),
  handleValidationErrors
];

const validateBulkTags = [
  body('ids').isArray().withMessage('Se requiere un array de IDs')
    .notEmpty().withMessage('El array de IDs no puede estar vacío'),
  body('tags').isArray().withMessage('Se requiere un array de etiquetas')
    .notEmpty().withMessage('El array de etiquetas no puede estar vacío'),
  handleValidationErrors
];

const validateConversion = [
  body('clienteId').notEmpty().withMessage('El ID del cliente es obligatorio'),
  handleValidationErrors
];

// Apply authentication middleware to all routes
router.use(protect);

// Stats route - must be before /:id
router.get('/stats', getStats);

// Bulk operations routes - must be before /:id
router.post('/bulk-delete', validateBulkDelete, bulkDeleteLeads);
router.post('/bulk-add-tags', validateBulkTags, bulkAddTags);

// Standard CRUD routes
router.get('/', getLeads);
router.get('/:id', getLead);
router.post('/', validateLead, createLead);
router.put('/:id', validateLead, updateLead);
router.delete('/:id', deleteLead);

// Special action routes
router.patch('/:id/contacto', updateContacto);
router.post('/:id/convertir', validateConversion, convertirACliente);

export default router;
