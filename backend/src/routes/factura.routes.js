import express from 'express';
import {
  getFacturas,
  getFactura,
  createFactura,
  updateFactura,
  marcarComoPagada,
  anularFactura,
  deleteFactura,
  getFacturasStats,
  getFacturasByCliente,
  enviarRecordatorio,
  getIngresosPorMes
} from '../controllers/factura.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas de estadísticas e informes
router.get('/stats', getFacturasStats);
router.get('/ingresos/por-mes', getIngresosPorMes);

// Rutas de facturas por cliente
router.get('/cliente/:clienteId', getFacturasByCliente);

// Rutas CRUD de facturas
router.route('/')
  .get(getFacturas)
  .post(createFactura);

router.route('/:id')
  .get(getFactura)
  .put(updateFactura)
  .delete(deleteFactura);

// Rutas de acciones específicas
router.put('/:id/pagar', marcarComoPagada);
router.put('/:id/anular', anularFactura);
router.post('/:id/recordatorio', enviarRecordatorio);

export default router;
