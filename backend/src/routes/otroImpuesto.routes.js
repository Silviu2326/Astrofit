import express from 'express';
import {
  getOtrosImpuestos,
  getOtroImpuesto,
  getProximosVencimientos,
  getResumenAnual,
  createOtroImpuesto,
  updateOtroImpuesto,
  registrarPago,
  deleteOtroImpuesto
} from '../controllers/otroImpuesto.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);

router.get('/proximos-vencimientos', getProximosVencimientos);
router.get('/resumen/:añoFiscal', getResumenAnual);
router.route('/').get(getOtrosImpuestos).post(createOtroImpuesto);
router.route('/:id').get(getOtroImpuesto).put(updateOtroImpuesto).delete(deleteOtroImpuesto);
router.post('/:id/pagar', registrarPago);

export default router;
