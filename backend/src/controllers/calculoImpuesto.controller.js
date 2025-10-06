import CalculoImpuesto from '../models/CalculoImpuesto.model.js';
import TasaImpuesto from '../models/TasaImpuesto.model.js';
import Factura from '../models/Factura.model.js';

// @desc    Get all calculos de impuesto for a trainer
// @route   GET /api/calculos-impuesto
// @access  Private
export const getCalculosImpuesto = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      estado,
      fechaInicio,
      fechaFin,
      facturaId
    } = req.query;

    // Build query
    const query = { trainer: req.user.id, isActive: true };

    if (estado) query.estado = estado;
    if (facturaId) query.factura = facturaId;

    // Date range filter
    if (fechaInicio || fechaFin) {
      query.fechaCalculo = {};
      if (fechaInicio) query.fechaCalculo.$gte = new Date(fechaInicio);
      if (fechaFin) query.fechaCalculo.$lte = new Date(fechaFin);
    }

    // Execute query with pagination
    const calculos = await CalculoImpuesto.find(query)
      .populate('factura')
      .populate('tasasAplicadas')
      .sort({ fechaCalculo: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const count = await CalculoImpuesto.countDocuments(query);

    res.status(200).json({
      success: true,
      count: calculos.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: calculos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single calculo de impuesto
// @route   GET /api/calculos-impuesto/:id
// @access  Private
export const getCalculoImpuesto = async (req, res) => {
  try {
    const calculo = await CalculoImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    })
      .populate('factura')
      .populate('tasasAplicadas');

    if (!calculo) {
      return res.status(404).json({
        success: false,
        error: 'Cálculo de impuesto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: calculo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get calculo by factura
// @route   GET /api/calculos-impuesto/factura/:facturaId
// @access  Private
export const getCalculoByFactura = async (req, res) => {
  try {
    const calculo = await CalculoImpuesto.findByFactura(req.params.facturaId);

    if (!calculo) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró cálculo para esta factura'
      });
    }

    // Verificar que pertenece al trainer
    if (calculo.trainer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'No autorizado'
      });
    }

    res.status(200).json({
      success: true,
      data: calculo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get estadisticas de impuestos
// @route   GET /api/calculos-impuesto/estadisticas
// @access  Private
export const getEstadisticas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    const periodo = {};
    if (fechaInicio) periodo.fechaDesde = fechaInicio;
    if (fechaFin) periodo.fechaHasta = fechaFin;

    const estadisticas = await CalculoImpuesto.getEstadisticasByTrainer(
      req.user.id,
      periodo
    );

    res.status(200).json({
      success: true,
      data: estadisticas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new calculo de impuesto
// @route   POST /api/calculos-impuesto
// @access  Private
export const createCalculoImpuesto = async (req, res) => {
  try {
    const { facturaId, tasasIds, baseImponible, descuento = 0, notas } = req.body;

    // Validar campos requeridos
    if (!facturaId || !tasasIds || !Array.isArray(tasasIds) || tasasIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere facturaId y al menos una tasa'
      });
    }

    if (!baseImponible || baseImponible <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere una base imponible válida'
      });
    }

    // Verificar que la factura existe y pertenece al trainer
    const factura = await Factura.findOne({
      _id: facturaId,
      trainerId: req.user.id,
      isDeleted: false
    });

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    // Verificar si ya existe un cálculo para esta factura
    const calculoExistente = await CalculoImpuesto.findOne({
      factura: facturaId,
      isActive: true
    });

    if (calculoExistente) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un cálculo de impuesto para esta factura'
      });
    }

    // Obtener las tasas
    const tasas = await TasaImpuesto.find({
      _id: { $in: tasasIds },
      trainer: req.user.id,
      activo: true,
      isActive: true
    });

    if (tasas.length !== tasasIds.length) {
      return res.status(400).json({
        success: false,
        error: 'Una o más tasas no son válidas o están inactivas'
      });
    }

    // Crear el cálculo
    const calculo = new CalculoImpuesto({
      trainer: req.user.id,
      factura: facturaId,
      baseImponible,
      descuento,
      notas,
      estado: 'calculado'
    });

    // Calcular impuestos con las tasas
    await calculo.calcularConTasas(tasas);

    // Guardar
    await calculo.save();

    // Poblar referencias antes de devolver
    await calculo.populate('factura');
    await calculo.populate('tasasAplicadas');

    res.status(201).json({
      success: true,
      data: calculo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create calculo from factura
// @route   POST /api/calculos-impuesto/from-factura/:facturaId
// @access  Private
export const createCalculoFromFactura = async (req, res) => {
  try {
    const { facturaId } = req.params;
    const { tasasIds } = req.body;

    // Verificar que la factura existe y pertenece al trainer
    const factura = await Factura.findOne({
      _id: facturaId,
      trainerId: req.user.id,
      isDeleted: false
    });

    if (!factura) {
      return res.status(404).json({
        success: false,
        error: 'Factura no encontrada'
      });
    }

    // Verificar si ya existe un cálculo para esta factura
    const calculoExistente = await CalculoImpuesto.findOne({
      factura: facturaId,
      isActive: true
    });

    if (calculoExistente) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un cálculo de impuesto para esta factura'
      });
    }

    // Si no se especificaron tasas, usar IVA general por defecto
    let tasas;
    if (tasasIds && Array.isArray(tasasIds) && tasasIds.length > 0) {
      tasas = await TasaImpuesto.find({
        _id: { $in: tasasIds },
        trainer: req.user.id,
        activo: true,
        isActive: true
      });
    } else {
      // Buscar IVA general
      tasas = await TasaImpuesto.find({
        trainer: req.user.id,
        tipo: 'IVA',
        activo: true,
        isActive: true
      }).limit(1);
    }

    if (!tasas || tasas.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No se encontraron tasas válidas. Cree al menos una tasa de impuesto.'
      });
    }

    // Crear el cálculo usando el subtotal de la factura
    const calculo = new CalculoImpuesto({
      trainer: req.user.id,
      factura: facturaId,
      baseImponible: factura.subtotal,
      descuento: factura.descuento || 0,
      estado: 'calculado'
    });

    // Calcular impuestos con las tasas
    await calculo.calcularConTasas(tasas);

    // Guardar
    await calculo.save();

    // Actualizar la factura con los impuestos calculados
    factura.impuestos = calculo.totalImpuestos;
    factura.montoTotal = calculo.totalConImpuestos;
    await factura.save();

    // Poblar referencias antes de devolver
    await calculo.populate('factura');
    await calculo.populate('tasasAplicadas');

    res.status(201).json({
      success: true,
      data: calculo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update calculo de impuesto
// @route   PUT /api/calculos-impuesto/:id
// @access  Private
export const updateCalculoImpuesto = async (req, res) => {
  try {
    let calculo = await CalculoImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!calculo) {
      return res.status(404).json({
        success: false,
        error: 'Cálculo de impuesto no encontrado'
      });
    }

    // Solo permitir actualizar si está en estado 'calculado'
    if (calculo.estado === 'anulado') {
      return res.status(400).json({
        success: false,
        error: 'No se puede actualizar un cálculo anulado'
      });
    }

    // Actualizar campos permitidos
    const { notas, estado } = req.body;

    if (notas !== undefined) calculo.notas = notas;
    if (estado && ['calculado', 'aplicado', 'anulado'].includes(estado)) {
      calculo.estado = estado;
    }

    await calculo.save();

    await calculo.populate('factura');
    await calculo.populate('tasasAplicadas');

    res.status(200).json({
      success: true,
      data: calculo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete calculo de impuesto (soft delete)
// @route   DELETE /api/calculos-impuesto/:id
// @access  Private
export const deleteCalculoImpuesto = async (req, res) => {
  try {
    const calculo = await CalculoImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!calculo) {
      return res.status(404).json({
        success: false,
        error: 'Cálculo de impuesto no encontrado'
      });
    }

    calculo.isActive = false;
    calculo.estado = 'anulado';
    await calculo.save();

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

// @desc    Recalcular impuestos
// @route   POST /api/calculos-impuesto/:id/recalcular
// @access  Private
export const recalcularImpuesto = async (req, res) => {
  try {
    const calculo = await CalculoImpuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    }).populate('tasasAplicadas');

    if (!calculo) {
      return res.status(404).json({
        success: false,
        error: 'Cálculo de impuesto no encontrado'
      });
    }

    if (calculo.estado === 'anulado') {
      return res.status(400).json({
        success: false,
        error: 'No se puede recalcular un cálculo anulado'
      });
    }

    // Recalcular con las tasas actuales
    await calculo.calcularConTasas(calculo.tasasAplicadas);
    await calculo.save();

    await calculo.populate('factura');

    res.status(200).json({
      success: true,
      data: calculo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
