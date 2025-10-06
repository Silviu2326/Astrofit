import Ejercicio from '../models/Ejercicio.model.js';

// @desc    Get all ejercicios for a trainer with filters and pagination
// @route   GET /api/ejercicios
// @access  Private
export const getEjercicios = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      q,
      categoria,
      grupoMuscular,
      nivel,
      estado,
      etiquetas,
      equipamiento,
      sortBy = 'nombre',
      sortDir = 'asc',
      page = 1,
      pageSize = 20
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
        { descripcion: { $regex: q.trim(), $options: 'i' } },
        { etiquetas: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Categoria filter
    if (categoria) {
      query.categoria = categoria;
    }

    // Grupo muscular filter
    if (grupoMuscular) {
      query.grupoMuscular = grupoMuscular;
    }

    // Nivel filter
    if (nivel) {
      query.nivel = nivel;
    }

    // Estado filter
    if (estado) {
      query.estado = estado;
    }

    // Etiquetas filter (must have all tags)
    if (etiquetas) {
      const tagsArray = Array.isArray(etiquetas) ? etiquetas : [etiquetas];
      if (tagsArray.length > 0) {
        query.etiquetas = { $all: tagsArray };
      }
    }

    // Equipamiento filter (must have all equipment)
    if (equipamiento) {
      const equipArray = Array.isArray(equipamiento) ? equipamiento : [equipamiento];
      if (equipArray.length > 0) {
        query.equipamiento = { $all: equipArray };
      }
    }

    // Get stats
    const stats = await Ejercicio.getStatsByTrainer(trainerId);

    // Sort
    const sortOptions = {};
    const validSortFields = ['nombre', 'categoria', 'grupoMuscular', 'nivel', 'vecesUtilizado', 'ultimoUso', 'createdAt'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.nombre = 1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    // Get total count
    const total = await Ejercicio.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    // Get ejercicios
    const ejercicios = await Ejercicio.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v -isDeleted');

    res.status(200).json({
      success: true,
      data: ejercicios,
      total,
      page: pageNum,
      pageSize: limit,
      pages,
      stats
    });
  } catch (error) {
    console.error('Error getting ejercicios:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener los ejercicios',
      details: error.message
    });
  }
};

// @desc    Get single ejercicio
// @route   GET /api/ejercicios/:id
// @access  Private
export const getEjercicio = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const ejercicio = await Ejercicio.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!ejercicio) {
      return res.status(404).json({
        success: false,
        error: 'Ejercicio no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: ejercicio
    });
  } catch (error) {
    console.error('Error getting ejercicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener el ejercicio',
      details: error.message
    });
  }
};

// @desc    Create new ejercicio
// @route   POST /api/ejercicios
// @access  Private
export const createEjercicio = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      nombre,
      descripcion,
      categoria,
      grupoMuscular,
      gruposSecundarios,
      nivel,
      equipamiento,
      instrucciones,
      video,
      imagenes,
      consejos,
      precauciones,
      variaciones,
      musculosPrincipales,
      musculosSecundarios,
      etiquetas,
      estado,
      tipo
    } = req.body;

    // Check if ejercicio already exists for this trainer
    const existingEjercicio = await Ejercicio.findOne({
      trainerId,
      nombre: nombre.trim(),
      isDeleted: false
    });

    if (existingEjercicio) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un ejercicio con este nombre'
      });
    }

    const ejercicio = await Ejercicio.create({
      trainerId,
      nombre,
      descripcion,
      categoria,
      grupoMuscular,
      gruposSecundarios: gruposSecundarios || [],
      nivel: nivel || 'intermedio',
      equipamiento: equipamiento || [],
      instrucciones: instrucciones || [],
      video,
      imagenes: imagenes || [],
      consejos,
      precauciones,
      variaciones: variaciones || [],
      musculosPrincipales: musculosPrincipales || [],
      musculosSecundarios: musculosSecundarios || [],
      etiquetas: etiquetas || [],
      estado: estado || 'activo',
      tipo: tipo || 'compuesto'
    });

    res.status(201).json({
      success: true,
      data: ejercicio,
      message: 'Ejercicio creado correctamente'
    });
  } catch (error) {
    console.error('Error creating ejercicio:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un ejercicio con este nombre'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error al crear el ejercicio',
      details: error.message
    });
  }
};

// @desc    Update ejercicio
// @route   PUT /api/ejercicios/:id
// @access  Private
export const updateEjercicio = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      nombre,
      descripcion,
      categoria,
      grupoMuscular,
      gruposSecundarios,
      nivel,
      equipamiento,
      instrucciones,
      video,
      imagenes,
      consejos,
      precauciones,
      variaciones,
      musculosPrincipales,
      musculosSecundarios,
      etiquetas,
      estado,
      tipo
    } = req.body;

    const ejercicio = await Ejercicio.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!ejercicio) {
      return res.status(404).json({
        success: false,
        error: 'Ejercicio no encontrado'
      });
    }

    // Check if nombre is being changed and if it already exists
    if (nombre && nombre.trim() !== ejercicio.nombre) {
      const nombreExists = await Ejercicio.findOne({
        trainerId,
        nombre: nombre.trim(),
        isDeleted: false,
        _id: { $ne: req.params.id }
      });

      if (nombreExists) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe un ejercicio con este nombre'
        });
      }
    }

    // Update fields
    if (nombre) ejercicio.nombre = nombre;
    if (descripcion !== undefined) ejercicio.descripcion = descripcion;
    if (categoria) ejercicio.categoria = categoria;
    if (grupoMuscular) ejercicio.grupoMuscular = grupoMuscular;
    if (gruposSecundarios !== undefined) ejercicio.gruposSecundarios = gruposSecundarios;
    if (nivel) ejercicio.nivel = nivel;
    if (equipamiento !== undefined) ejercicio.equipamiento = equipamiento;
    if (instrucciones !== undefined) ejercicio.instrucciones = instrucciones;
    if (video !== undefined) ejercicio.video = video;
    if (imagenes !== undefined) ejercicio.imagenes = imagenes;
    if (consejos !== undefined) ejercicio.consejos = consejos;
    if (precauciones !== undefined) ejercicio.precauciones = precauciones;
    if (variaciones !== undefined) ejercicio.variaciones = variaciones;
    if (musculosPrincipales !== undefined) ejercicio.musculosPrincipales = musculosPrincipales;
    if (musculosSecundarios !== undefined) ejercicio.musculosSecundarios = musculosSecundarios;
    if (etiquetas !== undefined) ejercicio.etiquetas = etiquetas;
    if (estado) ejercicio.estado = estado;
    if (tipo) ejercicio.tipo = tipo;

    await ejercicio.save();

    res.status(200).json({
      success: true,
      data: ejercicio,
      message: 'Ejercicio actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updating ejercicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el ejercicio',
      details: error.message
    });
  }
};

// @desc    Delete ejercicio (soft delete)
// @route   DELETE /api/ejercicios/:id
// @access  Private
export const deleteEjercicio = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const ejercicio = await Ejercicio.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!ejercicio) {
      return res.status(404).json({
        success: false,
        error: 'Ejercicio no encontrado'
      });
    }

    // Soft delete
    ejercicio.isDeleted = true;
    await ejercicio.save();

    res.status(200).json({
      success: true,
      message: 'Ejercicio eliminado correctamente'
    });
  } catch (error) {
    console.error('Error deleting ejercicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar el ejercicio',
      details: error.message
    });
  }
};

// @desc    Delete multiple ejercicios (soft delete)
// @route   POST /api/ejercicios/bulk-delete
// @access  Private
export const bulkDeleteEjercicios = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Debe proporcionar un array de IDs'
      });
    }

    const result = await Ejercicio.updateMany(
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
      message: `${result.modifiedCount} ejercicios eliminados correctamente`,
      count: result.modifiedCount
    });
  } catch (error) {
    console.error('Error bulk deleting ejercicios:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar los ejercicios',
      details: error.message
    });
  }
};

// @desc    Add tags to multiple ejercicios
// @route   POST /api/ejercicios/bulk-add-tags
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

    const result = await Ejercicio.updateMany(
      {
        _id: { $in: ids },
        trainerId,
        isDeleted: false
      },
      {
        $addToSet: { etiquetas: { $each: tags } }
      }
    );

    res.status(200).json({
      success: true,
      message: `Etiquetas añadidas a ${result.modifiedCount} ejercicios`,
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

// @desc    Increment ejercicio usage counter
// @route   PATCH /api/ejercicios/:id/increment-uso
// @access  Private
export const incrementarUso = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const ejercicio = await Ejercicio.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!ejercicio) {
      return res.status(404).json({
        success: false,
        error: 'Ejercicio no encontrado'
      });
    }

    await ejercicio.incrementarUso();

    res.status(200).json({
      success: true,
      data: ejercicio,
      message: 'Uso actualizado'
    });
  } catch (error) {
    console.error('Error incrementing uso:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el uso',
      details: error.message
    });
  }
};

// @desc    Get ejercicio statistics
// @route   GET /api/ejercicios/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const stats = await Ejercicio.getStatsByTrainer(trainerId);

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

// @desc    Duplicate ejercicio
// @route   POST /api/ejercicios/:id/duplicate
// @access  Private
export const duplicateEjercicio = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const original = await Ejercicio.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!original) {
      return res.status(404).json({
        success: false,
        error: 'Ejercicio no encontrado'
      });
    }

    // Create a copy with modified name
    const ejercicioData = original.toObject();
    delete ejercicioData._id;
    delete ejercicioData.createdAt;
    delete ejercicioData.updatedAt;
    ejercicioData.nombre = `${ejercicioData.nombre} (copia)`;
    ejercicioData.vecesUtilizado = 0;
    ejercicioData.ultimoUso = null;

    const duplicate = await Ejercicio.create(ejercicioData);

    res.status(201).json({
      success: true,
      data: duplicate,
      message: 'Ejercicio duplicado correctamente'
    });
  } catch (error) {
    console.error('Error duplicating ejercicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al duplicar el ejercicio',
      details: error.message
    });
  }
};
