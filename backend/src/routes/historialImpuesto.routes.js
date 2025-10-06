import express from 'express';
import {
  getHistorialImpuestos,
  getHistorialImpuesto,
  getResumenAnual,
  getPendientesPago,
  createHistorialImpuesto,
  updateHistorialImpuesto,
  marcarComoPagado,
  deleteHistorialImpuesto
} from '../controllers/historialImpuesto.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);

router.get('/resumen/:año', getResumenAnual);
router.get('/pendientes', getPendientesPago);
router.route('/').get(getHistorialImpuestos).post(createHistorialImpuesto);
router.route('/:id').get(getHistorialImpuesto).put(updateHistorialImpuesto).delete(deleteHistorialImpuesto);
router.post('/:id/pagar', marcarComoPagado);

export default router;
