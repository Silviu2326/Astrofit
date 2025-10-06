import TasaImpuesto from '../models/TasaImpuesto.model.js';

// @desc    Get all tasas de impuesto for a trainer
// @route   GET /api/tasas-impuesto
// @access  Private
export const getTasasImpuesto = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      tipo,
      activo,
      aplicaA,
      search
    } = req.query;

    // Build query
    const query = { trainer: req.user.id, isActive: true };

    if (tipo) query.tipo = tipo;
    if (activo !== undefined) query.activo = activo === 'true';
    if (aplicaA) query.aplicaA = aplicaA;

    // Search in nombre, codigo, descripcion
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { codigo: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const tasas = await TasaImpuesto.find(query)
      .sort({ tipo: 1, porcentaje: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const count = await TasaImpuesto.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasas.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: tasas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single tasa de impuesto
// @route   GET /api/tasas-impuesto/:id
// @access  Private
export const getTasaImpuesto = async (req, res) => {
  try {
    const tasa = await TasaImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!tasa) {
      return res.status(404).json({
        success: false,
        error: 'Tasa de impuesto no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: tasa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get tasas activas
// @route   GET /api/tasas-impuesto/activas
// @access  Private
export const getTasasActivas = async (req, res) => {
  try {
    const { tipo } = req.query;

    const tasas = await TasaImpuesto.findActivasByTrainer(req.user.id, tipo);

    res.status(200).json({
      success: true,
      count: tasas.length,
      data: tasas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get tasa by codigo
// @route   GET /api/tasas-impuesto/codigo/:codigo
// @access  Private
export const getTasaByCodigo = async (req, res) => {
  try {
    const tasa = await TasaImpuesto.findByCodigo(req.user.id, req.params.codigo);

    if (!tasa) {
      return res.status(404).json({
        success: false,
        error: 'Tasa de impuesto no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: tasa
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new tasa de impuesto
// @route   POST /api/tasas-impuesto
// @access  Private
export const createTasaImpuesto = async (req, res) => {
  try {
    const tasaData = {
      ...req.body,
      trainer: req.user.id
    };

    // Si se proporciona código, verificar que no exista
    if (tasaData.codigo) {
      const existente = await TasaImpuesto.findOne({
        trainer: req.user.id,
        codigo: tasaData.codigo.toUpperCase(),
        isActive: true
      });

      if (existente) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe una tasa con ese código'
        });
      }
    }

    const tasa = await TasaImpuesto.create(tasaData);

    res.status(201).json({
      success: true,
      data: tasa
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update tasa de impuesto
// @route   PUT /api/tasas-impuesto/:id
// @access  Private
export const updateTasaImpuesto = async (req, res) => {
  try {
    let tasa = await TasaImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!tasa) {
      return res.status(404).json({
        success: false,
        error: 'Tasa de impuesto no encontrada'
      });
    }

    // Si se actualiza el código, verificar que no exista
    if (req.body.codigo && req.body.codigo !== tasa.codigo) {
      const existente = await TasaImpuesto.findOne({
        trainer: req.user.id,
        codigo: req.body.codigo.toUpperCase(),
        isActive: true,
        _id: { $ne: req.params.id }
      });

      if (existente) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe una tasa con ese código'
        });
      }
    }

    tasa = await TasaImpuesto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: tasa
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete tasa de impuesto (soft delete)
// @route   DELETE /api/tasas-impuesto/:id
// @access  Private
export const deleteTasaImpuesto = async (req, res) => {
  try {
    const tasa = await TasaImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!tasa) {
      return res.status(404).json({
        success: false,
        error: 'Tasa de impuesto no encontrada'
      });
    }

    tasa.isActive = false;
    await tasa.save();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Calcular impuesto sobre una cantidad
// @route   POST /api/tasas-impuesto/:id/calcular
// @access  Private
export const calcularImpuesto = async (req, res) => {
  try {
    const { cantidad } = req.body;

    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere una cantidad válida'
      });
    }

    const tasa = await TasaImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true,
      activo: true
    });

    if (!tasa) {
      return res.status(404).json({
        success: false,
        error: 'Tasa de impuesto no encontrada o inactiva'
      });
    }

    const impuesto = tasa.calcularImpuesto(cantidad);
    const total = tasa.calcularTotal(cantidad);

    res.status(200).json({
      success: true,
      data: {
        tasa: {
          id: tasa._id,
          nombre: tasa.nombre,
          tipo: tasa.tipo,
          porcentaje: tasa.porcentaje
        },
        cantidad,
        impuesto,
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
