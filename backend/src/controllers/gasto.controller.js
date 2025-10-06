import Gasto from '../models/Gasto.model.js';

// @desc    Get all gastos for a trainer
// @route   GET /api/gastos
// @access  Private
export const getGastos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      categoria,
      estado,
      proveedor,
      fechaInicio,
      fechaFin,
      esRecurrente,
      search
    } = req.query;

    // Build query
    const query = { trainer: req.user.id, isActive: true };

    if (categoria) query.categoria = categoria;
    if (estado) query.estado = estado;
    if (proveedor) query.proveedor = { $regex: proveedor, $options: 'i' };
    if (esRecurrente !== undefined) query.esRecurrente = esRecurrente === 'true';

    // Date range filter
    if (fechaInicio || fechaFin) {
      query.fecha = {};
      if (fechaInicio) query.fecha.$gte = new Date(fechaInicio);
      if (fechaFin) query.fecha.$lte = new Date(fechaFin);
    }

    // Search in concepto, descripcion, proveedor
    if (search) {
      query.$or = [
        { concepto: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } },
        { proveedor: { $regex: search, $options: 'i' } },
        { referencia: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const gastos = await Gasto.find(query)
      .sort({ fecha: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const count = await Gasto.countDocuments(query);

    res.status(200).json({
      success: true,
      count: gastos.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: gastos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single gasto
// @route   GET /api/gastos/:id
// @access  Private
export const getGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!gasto) {
      return res.status(404).json({
        success: false,
        error: 'Gasto no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: gasto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new gasto
// @route   POST /api/gastos
// @access  Private
export const createGasto = async (req, res) => {
  try {
    // Add trainer to gasto data
    const gastoData = {
      ...req.body,
      trainer: req.user.id
    };

    const gasto = await Gasto.create(gastoData);

    res.status(201).json({
      success: true,
      data: gasto
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update gasto
// @route   PUT /api/gastos/:id
// @access  Private
export const updateGasto = async (req, res) => {
  try {
    let gasto = await Gasto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!gasto) {
      return res.status(404).json({
        success: false,
        error: 'Gasto no encontrado'
      });
    }

    gasto = await Gasto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: gasto
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete gasto (soft delete)
// @route   DELETE /api/gastos/:id
// @access  Private
export const deleteGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findOne({
      _id: req.params.id,
      trainer: req.user.id,
      isActive: true
    });

    if (!gasto) {
      return res.status(404).json({
        success: false,
        error: 'Gasto no encontrado'
      });
    }

    // Soft delete
    gasto.isActive = false;
    await gasto.save();

    res.status(200).json({
      success: true,
      message: 'Gasto eliminado correctamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get gastos statistics
// @route   GET /api/gastos/stats/summary
// @access  Private
export const getGastosStats = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    const query = { trainer: req.user.id, isActive: true };

    if (fechaInicio || fechaFin) {
      query.fecha = {};
      if (fechaInicio) query.fecha.$gte = new Date(fechaInicio);
      if (fechaFin) query.fecha.$lte = new Date(fechaFin);
    }

    // Total por categoría
    const gastosPorCategoria = await Gasto.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$categoria',
          total: { $sum: '$monto' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Total por proveedor
    const gastosPorProveedor = await Gasto.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$proveedor',
          total: { $sum: '$monto' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 10 }
    ]);

    // Total por estado
    const gastosPorEstado = await Gasto.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$estado',
          total: { $sum: '$monto' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Total general
    const totalGeneral = await Gasto.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          total: { $sum: '$monto' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Gastos recurrentes
    const gastosRecurrentes = await Gasto.countDocuments({
      ...query,
      esRecurrente: true
    });

    res.status(200).json({
      success: true,
      data: {
        porCategoria: gastosPorCategoria,
        porProveedor: gastosPorProveedor,
        porEstado: gastosPorEstado,
        totalGeneral: totalGeneral[0] || { total: 0, count: 0 },
        gastosRecurrentes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get gastos by periodo (year-month)
// @route   GET /api/gastos/periodo/:periodo
// @access  Private
export const getGastosByPeriodo = async (req, res) => {
  try {
    const { periodo } = req.params; // Format: YYYY-MM
    const [year, month] = periodo.split('-');

    const fechaInicio = new Date(year, month - 1, 1);
    const fechaFin = new Date(year, month, 0, 23, 59, 59);

    const gastos = await Gasto.find({
      trainer: req.user.id,
      isActive: true,
      fecha: {
        $gte: fechaInicio,
        $lte: fechaFin
      }
    }).sort({ fecha: -1 });

    const total = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);

    res.status(200).json({
      success: true,
      periodo,
      count: gastos.length,
      total,
      data: gastos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Bulk update gastos estado
// @route   PUT /api/gastos/bulk/estado
// @access  Private
export const bulkUpdateEstado = async (req, res) => {
  try {
    const { ids, estado } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere un array de IDs'
      });
    }

    if (!['Pagado', 'Pendiente', 'Aprobado', 'Rechazado'].includes(estado)) {
      return res.status(400).json({
        success: false,
        error: 'Estado inválido'
      });
    }

    const result = await Gasto.updateMany(
      {
        _id: { $in: ids },
        trainer: req.user.id,
        isActive: true
      },
      {
        $set: { estado }
      }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} gastos actualizados`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Bulk delete gastos
// @route   DELETE /api/gastos/bulk/delete
// @access  Private
export const bulkDeleteGastos = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere un array de IDs'
      });
    }

    const result = await Gasto.updateMany(
      {
        _id: { $in: ids },
        trainer: req.user.id,
        isActive: true
      },
      {
        $set: { isActive: false }
      }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} gastos eliminados`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
