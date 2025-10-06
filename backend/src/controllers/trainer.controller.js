import Trainer from '../models/Trainer.model.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id, plan) => {
  return jwt.sign({ id, plan }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register trainer
// @route   POST /api/trainers/register
// @access  Public
export const registerTrainer = async (req, res) => {
  try {
    const { name, email, password, plan } = req.body;

    // Validate input
    if (!name || !email || !password || !plan) {
      return res.status(400).json({
        success: false,
        error: 'Por favor proporciona todos los campos requeridos'
      });
    }

    // Check if trainer exists
    const trainerExists = await Trainer.findOne({ email });
    if (trainerExists) {
      return res.status(400).json({
        success: false,
        error: 'El email ya está registrado'
      });
    }

    // Create trainer
    const trainer = await Trainer.create({
      name,
      email,
      password,
      plan,
      subscriptionStatus: 'trial'
    });

    // Generate token
    const token = generateToken(trainer._id, trainer.plan);

    res.status(201).json({
      success: true,
      data: {
        trainer: {
          id: trainer._id,
          name: trainer.name,
          email: trainer.email,
          plan: trainer.plan,
          subscriptionStatus: trainer.subscriptionStatus,
          features: trainer.getFeatures()
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Login trainer
// @route   POST /api/trainers/login
// @access  Public
export const loginTrainer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Por favor proporciona email y contraseña'
      });
    }

    // Check for trainer (include password field)
    const trainer = await Trainer.findOne({ email }).select('+password');
    if (!trainer) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Check if password matches
    const isMatch = await trainer.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Update last login
    trainer.lastLogin = Date.now();
    await trainer.save();

    // Generate token
    const token = generateToken(trainer._id, trainer.plan);

    res.status(200).json({
      success: true,
      data: {
        trainer: {
          id: trainer._id,
          name: trainer.name,
          email: trainer.email,
          plan: trainer.plan,
          subscriptionStatus: trainer.subscriptionStatus,
          features: trainer.getFeatures()
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get current trainer
// @route   GET /api/trainers/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.user.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        trainer: {
          id: trainer._id,
          name: trainer.name,
          email: trainer.email,
          plan: trainer.plan,
          subscriptionStatus: trainer.subscriptionStatus,
          avatar: trainer.avatar,
          telefono: trainer.telefono,
          especialidad: trainer.especialidad,
          certificaciones: trainer.certificaciones,
          biografia: trainer.biografia,
          redesSociales: trainer.redesSociales,
          configuracion: trainer.configuracion,
          features: trainer.getFeatures(),
          createdAt: trainer.createdAt,
          lastLogin: trainer.lastLogin
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all trainers
// @route   GET /api/trainers
// @access  Private/Admin
export const getTrainers = async (req, res) => {
  try {
    const { plan, subscriptionStatus, search, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by plan
    if (plan) {
      query.plan = plan;
    }

    // Filter by subscription status
    if (subscriptionStatus) {
      query.subscriptionStatus = subscriptionStatus;
    }

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const trainers = await Trainer.find(query)
      .select('-password')
      .limit(parseInt(limit))
      .skip(skip)
      .sort('-createdAt');

    const total = await Trainer.countDocuments(query);

    res.status(200).json({
      success: true,
      count: trainers.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: trainers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single trainer
// @route   GET /api/trainers/:id
// @access  Private
export const getTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: trainer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update trainer
// @route   PUT /api/trainers/:id
// @access  Private
export const updateTrainer = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      telefono: req.body.telefono,
      especialidad: req.body.especialidad,
      certificaciones: req.body.certificaciones,
      biografia: req.body.biografia,
      redesSociales: req.body.redesSociales,
      configuracion: req.body.configuracion,
      avatar: req.body.avatar
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key =>
      fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: trainer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update trainer plan
// @route   PUT /api/trainers/:id/plan
// @access  Private/Admin
export const updateTrainerPlan = async (req, res) => {
  try {
    const { plan, subscriptionStatus, subscriptionEndDate } = req.body;

    const updateData = { plan };

    if (subscriptionStatus) {
      updateData.subscriptionStatus = subscriptionStatus;
    }

    if (subscriptionEndDate) {
      updateData.subscriptionEndDate = subscriptionEndDate;
    }

    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        trainer: {
          id: trainer._id,
          name: trainer.name,
          email: trainer.email,
          plan: trainer.plan,
          subscriptionStatus: trainer.subscriptionStatus,
          subscriptionEndDate: trainer.subscriptionEndDate,
          features: trainer.getFeatures()
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete trainer
// @route   DELETE /api/trainers/:id
// @access  Private/Admin
export const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Trainer eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Check feature access
// @route   GET /api/trainers/:id/features/:featureId
// @access  Private
export const checkFeatureAccess = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer no encontrado'
      });
    }

    const hasAccess = trainer.hasFeatureAccess(req.params.featureId);

    res.status(200).json({
      success: true,
      data: {
        featureId: req.params.featureId,
        hasAccess,
        plan: trainer.plan
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
