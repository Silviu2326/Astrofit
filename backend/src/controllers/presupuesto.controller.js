import Presupuesto from '../models/Presupuesto.model.js';

// @desc    Get all presupuestos for a trainer
// @route   GET /api/presupuestos
// @access  Private
export const getPresupuestos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      categoria,
      periodo,
      año,
      mes,
      trimestre,
      excedidos
    } = req.query;

    // Build query
    const query = { trainer: req.user.id, isActive: true };

    if (categoria) query.categoria = categoria;
    if (periodo) query.periodo = periodo;
    if (año) query.año = parseInt(año);
    if (mes) query.mes = parseInt(mes);
    if (trimestre) query.trimestre = parseInt(trimestre);

    // Execute query with pagination
    const presupuestos = await Presupuesto.find(query)
      .sort({ año: -1, mes: -1, categoria: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Filter excedidos if requested (virtual field)
    let resultados = presupuestos;
    if (excedidos === 'true') {
      resultados = presupuestos.filter(p => p.excedido);
    }

    // Get total count for pagination
    const count = await Presupuesto.countDocuments(query);

    res.status(200).json({
      success: true,
      count: resultados.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: resultados
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single presupuesto
// @route   GET /api/presupuestos/:id
// @access  Private
export const getPresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!presupuesto) {
      return res.status(404).json({
        success: false,
        error: 'Presupuesto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: presupuesto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new presupuesto
// @route   POST /api/presupuestos
// @access  Private
export const createPresupuesto = async (req, res) => {
  try {
    // Add trainer to presupuesto data
    const presupuestoData = {
      ...req.body,
      trainer: req.user.id
    };

    // Check if presupuesto already exists for this category/period
    const existingQuery = {
      trainer: req.user.id,
      categoria: presupuestoData.categoria,
      año: presupuestoData.año,
      periodo: presupuestoData.periodo,
      isActive: true
    };

    if (presupuestoData.periodo === 'Mensual') {
      existingQuery.mes = presupuestoData.mes;
    } else if (presupuestoData.periodo === 'Trimestral') {
      existingQuery.trimestre = presupuestoData.trimestre;
    }

    const existing = await Presupuesto.findOne(existingQuery);
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un presupuesto para esta categoría y periodo'
      });
    }

    const presupuesto = await Presupuesto.create(presupuestoData);

    // Update gastoActual based on real expenses
    await presupuesto.actualizarGastoActual();
    await presupuesto.save();

    res.status(201).json({
      success: true,
      data: presupuesto
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update presupuesto
// @route   PUT /api/presupuestos/:id
// @access  Private
export const updatePresupuesto = async (req, res) => {
  try {
    let presupuesto = await Presupuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!presupuesto) {
      return res.status(404).json({
        success: false,
        error: 'Presupuesto no encontrado'
      });
    }

    presupuesto = await Presupuesto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: presupuesto
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete presupuesto (soft delete)
// @route   DELETE /api/presupuestos/:id
// @access  Private
export const deletePresupuesto = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!presupuesto) {
      return res.status(404).json({
        success: false,
        error: 'Presupuesto no encontrado'
      });
    }

    // Soft delete
    presupuesto.isActive = false;
    await presupuesto.save();

    res.status(200).json({
      success: true,
      message: 'Presupuesto eliminado correctamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get presupuestos by year
// @route   GET /api/presupuestos/year/:year
// @access  Private
export const getPresupuestosByYear = async (req, res) => {
  try {
    const { year } = req.params;

    const presupuestos = await Presupuesto.find({
      trainer: req.user.id,
      año: parseInt(year),
      isActive: true
    }).sort({ categoria: 1, mes: 1 });

    res.status(200).json({
      success: true,
      count: presupuestos.length,
      data: presupuestos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get presupuestos by periodo (YYYY-MM for monthly)
// @route   GET /api/presupuestos/periodo/:periodo
// @access  Private
export const getPresupuestosByPeriodo = async (req, res) => {
  try {
    const { periodo } = req.params; // Format: YYYY-MM
    const [year, month] = periodo.split('-');

    const presupuestos = await Presupuesto.find({
      trainer: req.user.id,
      año: parseInt(year),
      periodo: 'Mensual',
      mes: parseInt(month),
      isActive: true
    }).sort({ categoria: 1 });

    res.status(200).json({
      success: true,
      periodo,
      count: presupuestos.length,
      data: presupuestos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update gasto actual for a presupuesto
// @route   PUT /api/presupuestos/:id/actualizar-gasto
// @access  Private
export const actualizarGastoActual = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!presupuesto) {
      return res.status(404).json({
        success: false,
        error: 'Presupuesto no encontrado'
      });
    }

    await presupuesto.actualizarGastoActual();
    await presupuesto.save();

    res.status(200).json({
      success: true,
      data: presupuesto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update all gastos actuales for a trainer
// @route   PUT /api/presupuestos/actualizar-todos
// @access  Private
export const actualizarTodosGastos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find({
      trainer: req.user.id,
      isActive: true
    });

    let actualizados = 0;
    for (const presupuesto of presupuestos) {
      await presupuesto.actualizarGastoActual();
      await presupuesto.save();
      actualizados++;
    }

    res.status(200).json({
      success: true,
      message: `${actualizados} presupuestos actualizados`,
      count: actualizados
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get presupuestos summary/stats
// @route   GET /api/presupuestos/stats/summary
// @access  Private
export const getPresupuestosSummary = async (req, res) => {
  try {
    const { año } = req.query;
    const añoActual = año ? parseInt(año) : new Date().getFullYear();

    const presupuestos = await Presupuesto.find({
      trainer: req.user.id,
      año: añoActual,
      isActive: true
    });

    const summary = {
      año: añoActual,
      totalPresupuestado: 0,
      totalGastado: 0,
      totalDisponible: 0,
      excedidos: 0,
      conAlertas: 0,
      porCategoria: {},
      porPeriodo: {
        Mensual: 0,
        Trimestral: 0,
        Anual: 0
      }
    };

    presupuestos.forEach(p => {
      summary.totalPresupuestado += p.limitePresupuesto;
      summary.totalGastado += p.gastoActual;
      summary.totalDisponible += p.montoDisponible;

      if (p.excedido) summary.excedidos++;
      if (p.debeAlertar) summary.conAlertas++;

      // Por categoría
      if (!summary.porCategoria[p.categoria]) {
        summary.porCategoria[p.categoria] = {
          presupuestado: 0,
          gastado: 0,
          disponible: 0,
          count: 0
        };
      }
      summary.porCategoria[p.categoria].presupuestado += p.limitePresupuesto;
      summary.porCategoria[p.categoria].gastado += p.gastoActual;
      summary.porCategoria[p.categoria].disponible += p.montoDisponible;
      summary.porCategoria[p.categoria].count++;

      // Por periodo
      summary.porPeriodo[p.periodo]++;
    });

    summary.porcentajeUsado = summary.totalPresupuestado > 0
      ? (summary.totalGastado / summary.totalPresupuestado) * 100
      : 0;

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get presupuestos excedidos
// @route   GET /api/presupuestos/excedidos
// @access  Private
export const getPresupuestosExcedidos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find({
      trainer: req.user.id,
      isActive: true
    });

    const excedidos = presupuestos.filter(p => p.excedido);

    res.status(200).json({
      success: true,
      count: excedidos.length,
      data: excedidos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get presupuestos con alertas
// @route   GET /api/presupuestos/alertas
// @access  Private
export const getPresupuestosConAlertas = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find({
      trainer: req.user.id,
      isActive: true,
      alertaActivada: true
    });

    const conAlertas = presupuestos.filter(p => p.debeAlertar);

    res.status(200).json({
      success: true,
      count: conAlertas.length,
      data: conAlertas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
