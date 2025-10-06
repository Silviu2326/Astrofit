import Entrenamiento from '../models/Entrenamiento.model.js';
import Cliente from '../models/Cliente.model.js';

// @desc    Get all entrenamientos for a trainer with filters and pagination
// @route   GET /api/entrenamientos
// @access  Private
export const getEntrenamientos = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      q,
      estado,
      tipo,
      objetivo,
      clienteId,
      nivel,
      sortBy = 'fechaInicio',
      sortDir = 'desc',
      page = 1,
      pageSize = 20
    } = req.query;

    // Build query
    const query = {
      trainerId,
      isDeleted: false
    };

    // Filters
    if (estado) query.estado = estado;
    if (tipo) query.tipo = tipo;
    if (objetivo) query.objetivo = objetivo;
    if (clienteId) query.clienteId = clienteId;
    if (nivel) query.nivel = nivel;

    // Text search
    if (q && q.trim()) {
      query.$or = [
        { titulo: { $regex: q.trim(), $options: 'i' } },
        { descripcion: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Get stats
    const stats = await Entrenamiento.getStatsByTrainer(trainerId);

    // Sort
    const sortOptions = {};
    const validSortFields = ['titulo', 'fechaInicio', 'fechaFin', 'progreso', 'adherencia', 'createdAt'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.fechaInicio = -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    // Get total count
    const total = await Entrenamiento.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    // Get entrenamientos
    const entrenamientos = await Entrenamiento.find(query)
      .populate('clienteId', 'nombre apellidos email avatar')
      .populate('plantillaId', 'nombre')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v -isDeleted');

    res.status(200).json({
      success: true,
      data: entrenamientos,
      total,
      page: pageNum,
      pageSize: limit,
      pages,
      stats
    });
  } catch (error) {
    console.error('Error getting entrenamientos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los entrenamientos',
      details: error.message
    });
  }
};

// @desc    Get single entrenamiento
// @route   GET /api/entrenamientos/:id
// @access  Private
export const getEntrenamiento = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const entrenamiento = await Entrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    })
      .populate('clienteId', 'nombre apellidos email avatar telefono')
      .populate('plantillaId', 'nombre descripcion')
      .populate('sesiones.ejercicios.ejercicioId', 'nombre categoria grupoMuscular');

    if (!entrenamiento) {
      return res.status(404).json({
        success: false,
        error: 'Entrenamiento no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: entrenamiento
    });
  } catch (error) {
    console.error('Error getting entrenamiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el entrenamiento',
      details: error.message
    });
  }
};

// @desc    Create new entrenamiento
// @route   POST /api/entrenamientos
// @access  Private
export const createEntrenamiento = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      clienteId,
      titulo,
      descripcion,
      tipo,
      objetivo,
      nivel,
      estado,
      fechaInicio,
      fechaFin,
      totalSemanas,
      diasPorSemana,
      sesiones,
      plantillaId,
      notasEntrenador
    } = req.body;

    // Verify client exists
    const cliente = await Cliente.findOne({ _id: clienteId, trainerId, isDeleted: false });
    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    const entrenamiento = await Entrenamiento.create({
      trainerId,
      clienteId,
      titulo,
      descripcion,
      tipo,
      objetivo,
      nivel: nivel || 'Intermedio',
      estado: estado || 'borrador',
      fechaInicio,
      fechaFin,
      totalSemanas,
      diasPorSemana,
      sesiones: sesiones || [],
      plantillaId,
      notasEntrenador
    });

    // Populate before sending
    await entrenamiento.populate('clienteId', 'nombre apellidos email');

    res.status(201).json({
      success: true,
      data: entrenamiento,
      message: 'Entrenamiento creado correctamente'
    });
  } catch (error) {
    console.error('Error creating entrenamiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear el entrenamiento',
      details: error.message
    });
  }
};

// @desc    Update entrenamiento
// @route   PUT /api/entrenamientos/:id
// @access  Private
export const updateEntrenamiento = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const updates = req.body;

    const entrenamiento = await Entrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!entrenamiento) {
      return res.status(404).json({
        success: false,
        error: 'Entrenamiento no encontrado'
      });
    }

    // Update allowed fields
    const allowedFields = [
      'titulo', 'descripcion', 'tipo', 'objetivo', 'nivel',
      'estado', 'fechaInicio', 'fechaFin', 'totalSemanas',
      'diasPorSemana', 'sesiones', 'notasEntrenador', 'requiereRevision'
    ];

    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        entrenamiento[field] = updates[field];
      }
    });

    await entrenamiento.save();

    // Populate before sending
    await entrenamiento.populate('clienteId', 'nombre apellidos email');

    res.status(200).json({
      success: true,
      data: entrenamiento,
      message: 'Entrenamiento actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updating entrenamiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el entrenamiento',
      details: error.message
    });
  }
};

// @desc    Delete entrenamiento (soft delete)
// @route   DELETE /api/entrenamientos/:id
// @access  Private
export const deleteEntrenamiento = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const entrenamiento = await Entrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!entrenamiento) {
      return res.status(404).json({
        success: false,
        error: 'Entrenamiento no encontrado'
      });
    }

    entrenamiento.isDeleted = true;
    await entrenamiento.save();

    res.status(200).json({
      success: true,
      message: 'Entrenamiento eliminado correctamente'
    });
  } catch (error) {
    console.error('Error deleting entrenamiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el entrenamiento',
      details: error.message
    });
  }
};

// @desc    Pause entrenamiento
// @route   PATCH /api/entrenamientos/:id/pausar
// @access  Private
export const pausarEntrenamiento = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const entrenamiento = await Entrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!entrenamiento) {
      return res.status(404).json({
        success: false,
        error: 'Entrenamiento no encontrado'
      });
    }

    await entrenamiento.pausar();

    res.status(200).json({
      success: true,
      data: entrenamiento,
      message: 'Entrenamiento pausado correctamente'
    });
  } catch (error) {
    console.error('Error pausing entrenamiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al pausar el entrenamiento',
      details: error.message
    });
  }
};

// @desc    Resume entrenamiento
// @route   PATCH /api/entrenamientos/:id/reanudar
// @access  Private
export const reanudarEntrenamiento = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const entrenamiento = await Entrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!entrenamiento) {
      return res.status(404).json({
        success: false,
        error: 'Entrenamiento no encontrado'
      });
    }

    await entrenamiento.reanudar();

    res.status(200).json({
      success: true,
      data: entrenamiento,
      message: 'Entrenamiento reanudado correctamente'
    });
  } catch (error) {
    console.error('Error resuming entrenamiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al reanudar el entrenamiento',
      details: error.message
    });
  }
};

// @desc    Finalize entrenamiento
// @route   PATCH /api/entrenamientos/:id/finalizar
// @access  Private
export const finalizarEntrenamiento = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const entrenamiento = await Entrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!entrenamiento) {
      return res.status(404).json({
        success: false,
        error: 'Entrenamiento no encontrado'
      });
    }

    await entrenamiento.finalizar();

    res.status(200).json({
      success: true,
      data: entrenamiento,
      message: 'Entrenamiento finalizado correctamente'
    });
  } catch (error) {
    console.error('Error finalizing entrenamiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al finalizar el entrenamiento',
      details: error.message
    });
  }
};

// @desc    Complete session
// @route   POST /api/entrenamientos/:id/sesiones/:sesionId/completar
// @access  Private
export const completarSesion = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { sesionId } = req.params;
    const datos = req.body;

    const entrenamiento = await Entrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!entrenamiento) {
      return res.status(404).json({
        success: false,
        error: 'Entrenamiento no encontrado'
      });
    }

    const sesion = await entrenamiento.completarSesion(sesionId, datos);

    res.status(200).json({
      success: true,
      data: { entrenamiento, sesion },
      message: 'Sesión completada correctamente'
    });
  } catch (error) {
    console.error('Error completing sesion:', error);
    res.status(500).json({
      success: false,
      error: 'Error al completar la sesión',
      details: error.message
    });
  }
};

// @desc    Get statistics
// @route   GET /api/entrenamientos/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const stats = await Entrenamiento.getStatsByTrainer(trainerId);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener estadísticas',
      details: error.message
    });
  }
};

// @desc    Duplicate entrenamiento
// @route   POST /api/entrenamientos/:id/duplicate
// @access  Private
export const duplicateEntrenamiento = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const original = await Entrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!original) {
      return res.status(404).json({
        success: false,
        error: 'Entrenamiento no encontrado'
      });
    }

    // Create a copy
    const entrenamientoData = original.toObject();
    delete entrenamientoData._id;
    delete entrenamientoData.createdAt;
    delete entrenamientoData.updatedAt;
    entrenamientoData.titulo = `${entrenamientoData.titulo} (copia)`;
    entrenamientoData.estado = 'borrador';
    entrenamientoData.progreso = 0;
    entrenamientoData.adherencia = 0;
    entrenamientoData.sesionesCompletadas = 0;

    // Reset sesiones
    entrenamientoData.sesiones = entrenamientoData.sesiones.map(sesion => ({
      ...sesion,
      estado: 'pendiente',
      notasCliente: '',
      valoracionCliente: undefined,
      sensacionEsfuerzo: undefined,
      ejercicios: sesion.ejercicios.map(ej => ({
        ...ej,
        completado: false,
        peso: undefined,
        notas: ''
      }))
    }));

    const duplicate = await Entrenamiento.create(entrenamientoData);

    res.status(201).json({
      success: true,
      data: duplicate,
      message: 'Entrenamiento duplicado correctamente'
    });
  } catch (error) {
    console.error('Error duplicating entrenamiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al duplicar el entrenamiento',
      details: error.message
    });
  }
};
