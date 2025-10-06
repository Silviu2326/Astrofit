import express from 'express';
import {
  getExencionesImpuesto,
  getExencionImpuesto,
  getExencionesActivas,
  createExencionImpuesto,
  updateExencionImpuesto,
  deleteExencionImpuesto
} from '../controllers/exencionImpuesto.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);

router.get('/activas', getExencionesActivas);
router.route('/').get(getExencionesImpuesto).post(createExencionImpuesto);
router.route('/:id').get(getExencionImpuesto).put(updateExencionImpuesto).delete(deleteExencionImpuesto);

export default router;
