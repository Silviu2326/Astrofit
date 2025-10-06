import Tarea from '../models/Tarea.model.js';
import Cliente from '../models/Cliente.model.js';

/**
 * @desc    Obtener todas las tareas del trainer
 * @route   GET /api/tareas
 * @access  Private
 */
export const getTareas = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const {
      estado,
      prioridad,
      clienteId,
      asignadoA,
      fechaDesde,
      fechaHasta,
      search,
      page = 1,
      limit = 50,
      sort = '-fechaVencimiento'
    } = req.query;

    // Construir filtros
    const filters = {};
    if (estado) filters.estado = estado;
    if (prioridad) filters.prioridad = prioridad;
    if (clienteId) filters.clienteId = clienteId;
    if (asignadoA) filters.asignadoA = asignadoA;
    if (fechaDesde) filters.fechaDesde = fechaDesde;
    if (fechaHasta) filters.fechaHasta = fechaHasta;

    let query;

    // Si hay búsqueda por texto
    if (search) {
      query = Tarea.searchByTrainer(trainerId, search);
    } else {
      query = Tarea.findByTrainer(trainerId, filters);
    }

    // Aplicar paginación y ordenamiento
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const tareas = await query
      .populate('clienteId', 'nombre email telefono')
      .limit(parseInt(limit))
      .skip(skip)
      .sort(sort);

    // Contar total para paginación
    const total = await Tarea.countDocuments({
      trainerId,
      isDeleted: false,
      ...filters
    });

    res.status(200).json({
      success: true,
      count: tareas.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: tareas
    });
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las tareas',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener una tarea por ID
 * @route   GET /api/tareas/:id
 * @access  Private
 */
export const getTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;

    const tarea = await Tarea.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    }).populate('clienteId', 'nombre email telefono foto');

    if (!tarea) {
      return res.status(404).json({
        success: false,
        error: 'Tarea no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: tarea
    });
  } catch (error) {
    console.error('Error al obtener tarea:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener la tarea',
      message: error.message
    });
  }
};

/**
 * @desc    Crear una nueva tarea
 * @route   POST /api/tareas
 * @access  Private
 */
export const createTarea = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const tareaData = {
      ...req.body,
      trainerId
    };

    // Validar que el cliente existe si se proporciona
    if (tareaData.clienteId) {
      const cliente = await Cliente.findOne({
        _id: tareaData.clienteId,
        trainerId,
        isDeleted: false
      });

      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente no encontrado'
        });
      }

      // Establecer el nombre del cliente para búsqueda rápida
      tareaData.clienteRelacionado = cliente.nombre;
    }

    const tarea = await Tarea.create(tareaData);

    // Poblar el cliente si existe
    await tarea.populate('clienteId', 'nombre email telefono');

    res.status(201).json({
      success: true,
      data: tarea,
      message: 'Tarea creada exitosamente'
    });
  } catch (error) {
    console.error('Error al crear tarea:', error);

    // Manejar errores de validación
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
      error: 'Error al crear la tarea',
      message: error.message
    });
  }
};

/**
 * @desc    Actualizar una tarea
 * @route   PUT /api/tareas/:id
 * @access  Private
 */
export const updateTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;
    const updates = req.body;

    // Buscar tarea
    let tarea = await Tarea.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!tarea) {
      return res.status(404).json({
        success: false,
        error: 'Tarea no encontrada'
      });
    }

    // Validar cliente si se actualiza
    if (updates.clienteId && updates.clienteId !== tarea.clienteId?.toString()) {
      const cliente = await Cliente.findOne({
        _id: updates.clienteId,
        trainerId,
        isDeleted: false
      });

      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente no encontrado'
        });
      }

      updates.clienteRelacionado = cliente.nombre;
    }

    // Aplicar actualizaciones
    Object.keys(updates).forEach(key => {
      tarea[key] = updates[key];
    });

    // Si se marca como completada, actualizar fecha
    if (updates.estado === 'completada' && tarea.estado !== 'completada') {
      tarea.fechaCompletada = new Date();
    }

    await tarea.save();
    await tarea.populate('clienteId', 'nombre email telefono');

    res.status(200).json({
      success: true,
      data: tarea,
      message: 'Tarea actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error al actualizar tarea:', error);

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
      error: 'Error al actualizar la tarea',
      message: error.message
    });
  }
};

/**
 * @desc    Eliminar una tarea (soft delete)
 * @route   DELETE /api/tareas/:id
 * @access  Private
 */
export const deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;

    const tarea = await Tarea.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!tarea) {
      return res.status(404).json({
        success: false,
        error: 'Tarea no encontrada'
      });
    }

    // Soft delete
    tarea.isDeleted = true;
    await tarea.save();

    res.status(200).json({
      success: true,
      message: 'Tarea eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la tarea',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener estadísticas de tareas del trainer
 * @route   GET /api/tareas/stats/overview
 * @access  Private
 */
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const stats = await Tarea.getStatsByTrainer(trainerId);

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
 * @desc    Obtener tareas vencidas
 * @route   GET /api/tareas/vencidas
 * @access  Private
 */
export const getTareasVencidas = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const tareas = await Tarea.getTareasVencidas(trainerId)
      .populate('clienteId', 'nombre email telefono');

    res.status(200).json({
      success: true,
      count: tareas.length,
      data: tareas
    });
  } catch (error) {
    console.error('Error al obtener tareas vencidas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tareas vencidas',
      message: error.message
    });
  }
};

/**
 * @desc    Obtener tareas próximas a vencer
 * @route   GET /api/tareas/proximas
 * @access  Private
 */
export const getTareasProximas = async (req, res) => {
  try {
    const trainerId = req.user._id;
    const { dias = 7 } = req.query;

    const tareas = await Tarea.getTareasProximas(trainerId, parseInt(dias))
      .populate('clienteId', 'nombre email telefono');

    res.status(200).json({
      success: true,
      count: tareas.length,
      data: tareas
    });
  } catch (error) {
    console.error('Error al obtener tareas próximas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tareas próximas',
      message: error.message
    });
  }
};

/**
 * @desc    Marcar tarea como completada
 * @route   PATCH /api/tareas/:id/completar
 * @access  Private
 */
export const completarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const trainerId = req.user._id;

    const tarea = await Tarea.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!tarea) {
      return res.status(404).json({
        success: false,
        error: 'Tarea no encontrada'
      });
    }

    await tarea.marcarCompletada();
    await tarea.populate('clienteId', 'nombre email telefono');

    res.status(200).json({
      success: true,
      data: tarea,
      message: 'Tarea marcada como completada'
    });
  } catch (error) {
    console.error('Error al completar tarea:', error);
    res.status(500).json({
      success: false,
      error: 'Error al completar la tarea',
      message: error.message
    });
  }
};

/**
 * @desc    Agregar etiqueta a una tarea
 * @route   POST /api/tareas/:id/etiquetas
 * @access  Private
 */
export const agregarEtiqueta = async (req, res) => {
  try {
    const { id } = req.params;
    const { etiqueta } = req.body;
    const trainerId = req.user._id;

    if (!etiqueta) {
      return res.status(400).json({
        success: false,
        error: 'La etiqueta es requerida'
      });
    }

    const tarea = await Tarea.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!tarea) {
      return res.status(404).json({
        success: false,
        error: 'Tarea no encontrada'
      });
    }

    await tarea.agregarEtiqueta(etiqueta);
    await tarea.populate('clienteId', 'nombre email telefono');

    res.status(200).json({
      success: true,
      data: tarea,
      message: 'Etiqueta agregada exitosamente'
    });
  } catch (error) {
    console.error('Error al agregar etiqueta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al agregar etiqueta',
      message: error.message
    });
  }
};

/**
 * @desc    Eliminar etiqueta de una tarea
 * @route   DELETE /api/tareas/:id/etiquetas/:etiqueta
 * @access  Private
 */
export const eliminarEtiqueta = async (req, res) => {
  try {
    const { id, etiqueta } = req.params;
    const trainerId = req.user._id;

    const tarea = await Tarea.findOne({
      _id: id,
      trainerId,
      isDeleted: false
    });

    if (!tarea) {
      return res.status(404).json({
        success: false,
        error: 'Tarea no encontrada'
      });
    }

    await tarea.eliminarEtiqueta(etiqueta);
    await tarea.populate('clienteId', 'nombre email telefono');

    res.status(200).json({
      success: true,
      data: tarea,
      message: 'Etiqueta eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar etiqueta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar etiqueta',
      message: error.message
    });
  }
};
