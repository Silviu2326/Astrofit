import express from 'express';
import {
  getRetencionesIRPF,
  getRetencionIRPF,
  getRetencionesByPeriodo,
  getRetencionesByCliente,
  getResumenTrimestral,
  getResumenAnual,
  createRetencionIRPF,
  createRetencionFromFactura,
  updateRetencionIRPF,
  emitirCertificado,
  marcarComoDeclarado,
  deleteRetencionIRPF
} from '../controllers/retencionIRPF.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Special routes (must be before /:id)
router.get('/periodo/:año/:trimestre', getRetencionesByPeriodo);
router.get('/cliente/:clienteId', getRetencionesByCliente);
router.get('/resumen/trimestral/:año/:trimestre', getResumenTrimestral);
router.get('/resumen/anual/:año', getResumenAnual);
router.post('/from-factura/:facturaId', createRetencionFromFactura);

// CRUD routes
router.route('/')
  .get(getRetencionesIRPF)
  .post(createRetencionIRPF);

router.route('/:id')
  .get(getRetencionIRPF)
  .put(updateRetencionIRPF)
  .delete(deleteRetencionIRPF);

// Action routes
router.post('/:id/certificado', emitirCertificado);
router.post('/:id/declarar', marcarComoDeclarado);

export default router;
