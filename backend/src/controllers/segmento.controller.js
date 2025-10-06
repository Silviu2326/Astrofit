import Segmento from '../models/Segmento.model.js';
import Cliente from '../models/Cliente.model.js';

/**
 * @desc    Obtener todos los segmentos del trainer
 * @route   GET /api/segmentos
 * @access  Private
 */
export const getSegmentos = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { tipoSegmento, activo, search, page = 1, limit = 50 } = req.query;

    const filtros = {};
    if (tipoSegmento) filtros.tipoSegmento = tipoSegmento;
    if (activo !== undefined) filtros.activo = activo === 'true';

    let query;

    if (search) {
      query = Segmento.searchByTrainer(trainerId, search);
    } else {
      query = Segmento.findByTrainer(trainerId, filtros);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const segmentos = await query
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Segmento.countDocuments({
      trainerId,
      isDeleted: false,
      ...filtros
    });

    res.status(200).json({
      success: true,
      count: segmentos.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: segmentos
    });
  } catch (error) {
    console.error('Error al obtener segmentos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los segmentos',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener un segmento por ID
 * @route   GET /api/segmentos/:id
 * @access  Private
 */
export const getSegmento = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;

    const segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    }).populate('clientesManualIds', 'nombre email foto estado etiquetas');

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: segmento
    });
  } catch (error) {
    console.error('Error al obtener segmento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el segmento',
      message: error.message
    });
  }
};

/**
 * @desc    Crear un nuevo segmento
 * @route   POST /api/segmentos
 * @access  Private
 */
export const createSegmento = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const segmentoData = {
      ...req.body,
      trainerId
    };

    // Validar que los clientes pertenezcan al trainer
    if (segmentoData.clientesManualIds && segmentoData.clientesManualIds.length > 0) {
      const clientesValidos = await Cliente.find({
        _id: { $in: segmentoData.clientesManualIds },
        trainerId,
        isDeleted: false
      });

      if (clientesValidos.length !== segmentoData.clientesManualIds.length) {
        return res.status(400).json({
          success: false,
          error: 'Algunos clientes no son válidos o no pertenecen a este trainer'
        });
      }
    }

    const segmento = await Segmento.create(segmentoData);
    await segmento.populate('clientesManualIds', 'nombre email foto estado');

    res.status(201).json({
      success: true,
      data: segmento,
      message: 'Segmento creado exitosamente'
    });
  } catch (error) {
    console.error('Error al crear segmento:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Error de validación',
        messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error al crear el segmento',
      message: error.message
    });
  }
};

/**
 * @desc    Actualizar un segmento
 * @route   PUT /api/segmentos/:id
 * @access  Private
 */
export const updateSegmento = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;
    const updates = req.body;

    let segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    // Validar clientes si se actualizan
    if (updates.clientesManualIds) {
      const clientesValidos = await Cliente.find({
        _id: { $in: updates.clientesManualIds },
        trainerId,
        isDeleted: false
      });

      if (clientesValidos.length !== updates.clientesManualIds.length) {
        return res.status(400).json({
          success: false,
          error: 'Algunos clientes no son válidos'
        });
      }
    }

    // Aplicar actualizaciones
    Object.keys(updates).forEach(key => {
      segmento[key] = updates[key];
    });

    await segmento.save();
    await segmento.populate('clientesManualIds', 'nombre email foto estado');

    res.status(200).json({
      success: true,
      data: segmento,
      message: 'Segmento actualizado exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar segmento:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Error de validación',
        messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error al actualizar el segmento',
      message: error.message
    });
  }
};

/**
 * @desc    Eliminar un segmento (soft delete)
 * @route   DELETE /api/segmentos/:id
 * @access  Private
 */
export const deleteSegmento = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;

    const segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    segmento.isDeleted = true;
    await segmento.save();

    res.status(200).json({
      success: true,
      message: 'Segmento eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar segmento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el segmento',
      message: error.message
    });
  }
};

/**
 * @desc    Agregar cliente a un segmento
 * @route   POST /api/segmentos/:id/clientes/:clienteId
 * @access  Private
 */
export const agregarCliente = async (req, res) => {
  try {
    const { id, clienteId } = req.params;
    const trainerId = req.user._id;

    const segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    // Verificar que el cliente existe y pertenece al trainer
    const cliente = await Cliente.findOne({
      _id: clienteId,
      trainerId,
      isDeleted: false
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    await segmento.agregarCliente(clienteId);
    await segmento.populate('clientesManualIds', 'nombre email foto estado');

    res.status(200).json({
      success: true,
      data: segmento,
      message: 'Cliente agregado al segmento'
    });
  } catch (error) {
    console.error('Error al agregar cliente:', error);
    res.status(500).json({
      success: false,
      error: 'Error al agregar cliente',
      message: error.message
    });
  }
};

/**
 * @desc    Eliminar cliente de un segmento
 * @route   DELETE /api/segmentos/:id/clientes/:clienteId
 * @access  Private
 */
export const eliminarCliente = async (req, res) => {
  try {
    const { id, clienteId } = req.params;
    const trainerId = req.user._id;

    const segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    await segmento.eliminarCliente(clienteId);
    await segmento.populate('clientesManualIds', 'nombre email foto estado');

    res.status(200).json({
      success: true,
      data: segmento,
      message: 'Cliente eliminado del segmento'
    });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar cliente',
      message: error.message
    });
  }
};

/**
 * @desc    Agregar múltiples clientes a un segmento
 * @route   POST /api/segmentos/:id/clientes/bulk
 * @access  Private
 */
export const agregarClientesMultiples = async (req, res) => {
  try {
    const { id } = req.params;
    const { clienteIds } = req.body;
    const trainerId = req.user._id;

    if (!clienteIds || !Array.isArray(clienteIds) || clienteIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere un array de IDs de clientes'
      });
    }

    const segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    // Verificar que todos los clientes existen y pertenecen al trainer
    const clientesValidos = await Cliente.find({
      _id: { $in: clienteIds },
      trainerId,
      isDeleted: false
    });

    if (clientesValidos.length !== clienteIds.length) {
      return res.status(400).json({
        success: false,
        error: 'Algunos clientes no son válidos'
      });
    }

    await segmento.agregarClientesMultiples(clienteIds);
    await segmento.populate('clientesManualIds', 'nombre email foto estado');

    res.status(200).json({
      success: true,
      data: segmento,
      message: `${clienteIds.length} clientes agregados al segmento`
    });
  } catch (error) {
    console.error('Error al agregar clientes:', error);
    res.status(500).json({
      success: false,
      error: 'Error al agregar clientes',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener miembros de un segmento
 * @route   GET /api/segmentos/:id/miembros
 * @access  Private
 */
export const getMiembros = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;

    const segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    const miembros = await segmento.obtenerMiembros();

    res.status(200).json({
      success: true,
      count: miembros.length,
      data: miembros
    });
  } catch (error) {
    console.error('Error al obtener miembros:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener miembros',
      message: error.message
    });
  }
};

/**
 * @desc    Recalcular estadísticas de un segmento
 * @route   POST /api/segmentos/:id/recalcular
 * @access  Private
 */
export const recalcularStats = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;

    const segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    await segmento.recalcularStats();
    await segmento.save();

    res.status(200).json({
      success: true,
      data: segmento,
      message: 'Estadísticas recalculadas'
    });
  } catch (error) {
    console.error('Error al recalcular stats:', error);
    res.status(500).json({
      success: false,
      error: 'Error al recalcular estadísticas',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener estadísticas de segmentos del trainer
 * @route   GET /api/segmentos/stats/overview
 * @access  Private
 */
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const stats = await Segmento.getStatsByTrainer(trainerId);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas',
      message: error.message
    });
  }
};

/**
 * @desc    Activar/Desactivar segmento
 * @route   PATCH /api/segmentos/:id/toggle-active
 * @access  Private
 */
export const toggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;

    const segmento = await Segmento.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!segmento) {
      return res.status(404).json({
        success: false,
        error: 'Segmento no encontrado'
      });
    }

    segmento.activo = !segmento.activo;
    await segmento.save();

    res.status(200).json({
      success: true,
      data: segmento,
      message: `Segmento ${segmento.activo ? 'activado' : 'desactivado'}`
    });
  } catch (error) {
    console.error('Error al cambiar estado:', error);
    res.status(500).json({
      success: false,
      error: 'Error al cambiar estado',
      message: error.message
    });
  }
};
