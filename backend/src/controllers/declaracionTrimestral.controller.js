import DeclaracionTrimestral from '../models/DeclaracionTrimestral.model.js';
import Factura from '../models/Factura.model.js';
import Gasto from '../models/Gasto.model.js';

// @desc    Get all declaraciones trimestrales for a trainer
// @route   GET /api/declaraciones-trimestrales
// @access  Private
export const getDeclaracionesTrimestrales = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      año,
      trimestre,
      estado,
      modelo
    } = req.query;

    // Build query
    const query = { trainer: req.user.id, isActive: true };

    if (año) query.año = parseInt(año);
    if (trimestre) query.trimestre = parseInt(trimestre);
    if (estado) query.estado = estado;
    if (modelo) query.modelo = modelo;

    // Execute query with pagination
    const declaraciones = await DeclaracionTrimestral.find(query)
      .populate('detalles.factura')
      .sort({ año: -1, trimestre: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const count = await DeclaracionTrimestral.countDocuments(query);

    res.status(200).json({
      success: true,
      count: declaraciones.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: declaraciones
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single declaracion trimestral
// @route   GET /api/declaraciones-trimestrales/:id
// @access  Private
export const getDeclaracionTrimestral = async (req, res) => {
  try {
    const declaracion = await DeclaracionTrimestral.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    }).populate('detalles.factura');

    if (!declaracion) {
      return res.status(404).json({
        success: false,
        error: 'Declaración trimestral no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: declaracion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get declaracion by periodo
// @route   GET /api/declaraciones-trimestrales/periodo/:año/:trimestre
// @access  Private
export const getDeclaracionByPeriodo = async (req, res) => {
  try {
    const { año, trimestre } = req.params;
    const { modelo = '303' } = req.query;

    const declaracion = await DeclaracionTrimestral.findByPeriodo(
      req.user.id,
      parseInt(año),
      parseInt(trimestre),
      modelo
    );

    if (!declaracion) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró declaración para este periodo'
      });
    }

    res.status(200).json({
      success: true,
      data: declaracion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get resumen anual
// @route   GET /api/declaraciones-trimestrales/resumen/:año
// @access  Private
export const getResumenAnual = async (req, res) => {
  try {
    const { año } = req.params;

    const resumen = await DeclaracionTrimestral.getResumenAnual(
      req.user.id,
      parseInt(año)
    );

    res.status(200).json({
      success: true,
      data: resumen
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create declaracion trimestral
// @route   POST /api/declaraciones-trimestrales
// @access  Private
export const createDeclaracionTrimestral = async (req, res) => {
  try {
    const declaracionData = {
      ...req.body,
      trainer: req.user.id
    };

    // Verificar si ya existe una declaración para este periodo
    const existente = await DeclaracionTrimestral.findOne({
      trainer: req.user.id,
      año: declaracionData.año,
      trimestre: declaracionData.trimestre,
      modelo: declaracionData.modelo || '303',
      isActive: true
    });

    if (existente) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe una declaración para este periodo'
      });
    }

    const declaracion = await DeclaracionTrimestral.create(declaracionData);

    await declaracion.populate('detalles.factura');

    res.status(201).json({
      success: true,
      data: declaracion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create declaracion from facturas y gastos
// @route   POST /api/declaraciones-trimestrales/from-periodo
// @access  Private
export const createDeclaracionFromPeriodo = async (req, res) => {
  try {
    const { año, trimestre } = req.body;

    if (!año || !trimestre) {
      return res.status(400).json({
        success: false,
        error: 'Se requieren año y trimestre'
      });
    }

    // Verificar si ya existe
    const existente = await DeclaracionTrimestral.findOne({
      trainer: req.user.id,
      año: parseInt(año),
      trimestre: parseInt(trimestre),
      modelo: '303',
      isActive: true
    });

    if (existente) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe una declaración para este periodo'
      });
    }

    // Calcular fechas del trimestre
    const mesInicio = (trimestre - 1) * 3;
    const mesFin = mesInicio + 3;
    const fechaInicio = new Date(año, mesInicio, 1);
    const fechaFin = new Date(año, mesFin, 0, 23, 59, 59);

    // Obtener facturas del trimestre
    const facturas = await Factura.find({
      trainerId: req.user.id,
      fecha: { $gte: fechaInicio, $lte: fechaFin },
      estado: { $ne: 'Anulada' },
      isDeleted: false
    });

    // Obtener gastos del trimestre
    const gastos = await Gasto.find({
      trainer: req.user.id,
      fecha: { $gte: fechaInicio, $lte: fechaFin },
      estado: 'Pagado',
      isActive: true
    });

    // Crear declaración
    const declaracion = await DeclaracionTrimestral.crearDesdeFacturas(
      req.user.id,
      parseInt(año),
      parseInt(trimestre),
      facturas,
      gastos
    );

    await declaracion.save();
    await declaracion.populate('detalles.factura');

    res.status(201).json({
      success: true,
      data: declaracion,
      info: {
        facturasIncluidas: facturas.length,
        gastosIncluidos: gastos.length
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update declaracion trimestral
// @route   PUT /api/declaraciones-trimestrales/:id
// @access  Private
export const updateDeclaracionTrimestral = async (req, res) => {
  try {
    let declaracion = await DeclaracionTrimestral.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!declaracion) {
      return res.status(404).json({
        success: false,
        error: 'Declaración trimestral no encontrada'
      });
    }

    // No permitir editar si ya está presentada o pagada
    if (['presentado', 'pagado'].includes(declaracion.estado)) {
      return res.status(400).json({
        success: false,
        error: 'No se puede editar una declaración presentada o pagada'
      });
    }

    declaracion = await DeclaracionTrimestral.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('detalles.factura');

    res.status(200).json({
      success: true,
      data: declaracion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Presentar declaracion
// @route   POST /api/declaraciones-trimestrales/:id/presentar
// @access  Private
export const presentarDeclaracion = async (req, res) => {
  try {
    const { numeroReferencia } = req.body;

    const declaracion = await DeclaracionTrimestral.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!declaracion) {
      return res.status(404).json({
        success: false,
        error: 'Declaración trimestral no encontrada'
      });
    }

    if (declaracion.estado !== 'borrador') {
      return res.status(400).json({
        success: false,
        error: 'Solo se pueden presentar declaraciones en borrador'
      });
    }

    await declaracion.presentar(numeroReferencia);
    await declaracion.populate('detalles.factura');

    res.status(200).json({
      success: true,
      data: declaracion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Marcar como pagado
// @route   POST /api/declaraciones-trimestrales/:id/pagar
// @access  Private
export const pagarDeclaracion = async (req, res) => {
  try {
    const { metodoPago } = req.body;

    const declaracion = await DeclaracionTrimestral.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!declaracion) {
      return res.status(404).json({
        success: false,
        error: 'Declaración trimestral no encontrada'
      });
    }

    if (declaracion.estado !== 'presentado') {
      return res.status(400).json({
        success: false,
        error: 'Solo se pueden pagar declaraciones presentadas'
      });
    }

    await declaracion.marcarComoPagado(metodoPago);
    await declaracion.populate('detalles.factura');

    res.status(200).json({
      success: true,
      data: declaracion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete declaracion trimestral (soft delete)
// @route   DELETE /api/declaraciones-trimestrales/:id
// @access  Private
export const deleteDeclaracionTrimestral = async (req, res) => {
  try {
    const declaracion = await DeclaracionTrimestral.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!declaracion) {
      return res.status(404).json({
        success: false,
        error: 'Declaración trimestral no encontrada'
      });
    }

    // Solo permitir eliminar borradores
    if (declaracion.estado !== 'borrador') {
      return res.status(400).json({
        success: false,
        error: 'Solo se pueden eliminar declaraciones en borrador'
      });
    }

    declaracion.isActive = false;
    await declaracion.save();

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
