import express from 'express';
import {
  registerTrainer,
  loginTrainer,
  getMe,
  getTrainers,
  getTrainer,
  updateTrainer,
  updateTrainerPlan,
  deleteTrainer,
  checkFeatureAccess
} from '../controllers/trainer.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { validateTrainerRegister, validateLogin } from '../middleware/validate.middleware.js';

const router = express.Router();

// Public routes with validation
router.post('/register', validateTrainerRegister, registerTrainer);
router.post('/login', validateLogin, loginTrainer);

// Protected routes
router.get('/me', protect, getMe);
router.get('/', protect, authorize('admin'), getTrainers);
router.get('/:id', protect, getTrainer);
router.put('/:id', protect, updateTrainer);
router.delete('/:id', protect, authorize('admin'), deleteTrainer);

// Plan management
router.put('/:id/plan', protect, authorize('admin'), updateTrainerPlan);

// Feature access check
router.get('/:id/features/:featureId', protect, checkFeatureAccess);

export default router;
