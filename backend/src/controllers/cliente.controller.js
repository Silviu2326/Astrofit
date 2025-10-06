import Cliente from '../models/Cliente.model.js';

// @desc    Get all clientes for a trainer with filters and pagination
// @route   GET /api/clientes
// @access  Private
export const getClientes = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      q,
      estado,
      etiquetas,
      fechaAltaDesde,
      fechaAltaHasta,
      sinActividadDias,
      sortBy = 'ultimaActividad',
      sortDir = 'desc',
      page = 1,
      pageSize = 10
    } = req.query;

    // Build query
    const query = {
      trainerId,
      isDeleted: false
    };

    // Text search
    if (q && q.trim()) {
      query.$or = [
        { nombre: { $regex: q.trim(), $options: 'i' } },
        { email: { $regex: q.trim(), $options: 'i' } },
        { telefono: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Estado filter
    if (estado && (estado === 'activo' || estado === 'inactivo')) {
      query.estado = estado;
    }

    // Etiquetas filter (must have all tags)
    if (etiquetas) {
      const tagsArray = Array.isArray(etiquetas) ? etiquetas : [etiquetas];
      if (tagsArray.length > 0) {
        query.etiquetas = { $all: tagsArray };
      }
    }

    // Fecha alta range
    if (fechaAltaDesde || fechaAltaHasta) {
      query.fechaAlta = {};
      if (fechaAltaDesde) {
        query.fechaAlta.$gte = new Date(fechaAltaDesde);
      }
      if (fechaAltaHasta) {
        query.fechaAlta.$lte = new Date(fechaAltaHasta);
      }
    }

    // Sin actividad en X días
    if (sinActividadDias && !isNaN(sinActividadDias)) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(sinActividadDias));
      query.ultimaActividad = { $lte: daysAgo };
    }

    // Get stats
    const stats = await Cliente.getStatsByTrainer(trainerId);

    // Sort
    const sortOptions = {};
    const validSortFields = ['nombre', 'estado', 'fechaAlta', 'ultimaActividad'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.ultimaActividad = -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    // Get total count
    const total = await Cliente.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    // Get clientes
    const clientes = await Cliente.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v -isDeleted');

    res.status(200).json({
      success: true,
      data: clientes,
      total,
      page: pageNum,
      pageSize: limit,
      pages,
      stats
    });
  } catch (error) {
    console.error('Error getting clientes:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los clientes',
      details: error.message
    });
  }
};

// @desc    Get single cliente
// @route   GET /api/clientes/:id
// @access  Private
export const getCliente = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const cliente = await Cliente.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: cliente
    });
  } catch (error) {
    console.error('Error getting cliente:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el cliente',
      details: error.message
    });
  }
};

// @desc    Create new cliente
// @route   POST /api/clientes
// @access  Private
export const createCliente = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { nombre, email, telefono, estado, etiquetas, notas, direccion, facturacion } = req.body;

    // Check if cliente already exists for this trainer
    const existingCliente = await Cliente.findOne({
      trainerId,
      email: email.toLowerCase().trim(),
      isDeleted: false
    });

    if (existingCliente) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un cliente con este email'
      });
    }

    const cliente = await Cliente.create({
      trainerId,
      nombre,
      email,
      telefono,
      estado: estado || 'activo',
      etiquetas: etiquetas || [],
      notas,
      direccion,
      facturacion,
      fechaAlta: new Date(),
      ultimaActividad: new Date()
    });

    res.status(201).json({
      success: true,
      data: cliente,
      message: 'Cliente creado correctamente'
    });
  } catch (error) {
    console.error('Error creating cliente:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un cliente con este email'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error al crear el cliente',
      details: error.message
    });
  }
};

// @desc    Update cliente
// @route   PUT /api/clientes/:id
// @access  Private
export const updateCliente = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { nombre, email, telefono, estado, etiquetas, notas, direccion, facturacion, foto } = req.body;

    const cliente = await Cliente.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    // Check if email is being changed and if it already exists
    if (email && email.toLowerCase().trim() !== cliente.email) {
      const emailExists = await Cliente.findOne({
        trainerId,
        email: email.toLowerCase().trim(),
        isDeleted: false,
        _id: { $ne: req.params.id }
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe un cliente con este email'
        });
      }
    }

    // Update fields
    if (nombre) cliente.nombre = nombre;
    if (email) cliente.email = email;
    if (telefono !== undefined) cliente.telefono = telefono;
    if (estado) cliente.estado = estado;
    if (etiquetas !== undefined) cliente.etiquetas = etiquetas;
    if (notas !== undefined) cliente.notas = notas;
    if (direccion) cliente.direccion = direccion;
    if (facturacion) cliente.facturacion = facturacion;
    if (foto !== undefined) cliente.foto = foto;

    cliente.ultimaActividad = new Date();

    await cliente.save();

    res.status(200).json({
      success: true,
      data: cliente,
      message: 'Cliente actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updating cliente:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el cliente',
      details: error.message
    });
  }
};

// @desc    Delete cliente (soft delete)
// @route   DELETE /api/clientes/:id
// @access  Private
export const deleteCliente = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const cliente = await Cliente.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    // Soft delete
    cliente.isDeleted = true;
    await cliente.save();

    res.status(200).json({
      success: true,
      message: 'Cliente eliminado correctamente'
    });
  } catch (error) {
    console.error('Error deleting cliente:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el cliente',
      details: error.message
    });
  }
};

// @desc    Delete multiple clientes (soft delete)
// @route   POST /api/clientes/bulk-delete
// @access  Private
export const bulkDeleteClientes = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Debe proporcionar un array de IDs'
      });
    }

    const result = await Cliente.updateMany(
      {
        _id: { $in: ids },
        trainerId,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} clientes eliminados correctamente`,
      count: result.modifiedCount
    });
  } catch (error) {
    console.error('Error bulk deleting clientes:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar los clientes',
      details: error.message
    });
  }
};

// @desc    Add tags to multiple clientes
// @route   POST /api/clientes/bulk-add-tags
// @access  Private
export const bulkAddTags = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { ids, tags } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Debe proporcionar un array de IDs'
      });
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Debe proporcionar un array de etiquetas'
      });
    }

    const result = await Cliente.updateMany(
      {
        _id: { $in: ids },
        trainerId,
        isDeleted: false
      },
      {
        $addToSet: { etiquetas: { $each: tags } },
        $set: { ultimaActividad: new Date() }
      }
    );

    res.status(200).json({
      success: true,
      message: `Etiquetas añadidas a ${result.modifiedCount} clientes`,
      count: result.modifiedCount
    });
  } catch (error) {
    console.error('Error bulk adding tags:', error);
    res.status(500).json({
      success: false,
      error: 'Error al añadir etiquetas',
      details: error.message
    });
  }
};

// @desc    Update activity timestamp
// @route   PATCH /api/clientes/:id/activity
// @access  Private
export const updateActivity = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const cliente = await Cliente.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    await cliente.actualizarActividad();

    res.status(200).json({
      success: true,
      data: cliente,
      message: 'Actividad actualizada'
    });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar la actividad',
      details: error.message
    });
  }
};

// @desc    Get cliente statistics
// @route   GET /api/clientes/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const stats = await Cliente.getStatsByTrainer(trainerId);

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
