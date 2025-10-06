import PlantillaEntrenamiento from '../models/PlantillaEntrenamiento.model.js';

// @desc    Get all plantillas for a trainer with filters and pagination
// @route   GET /api/plantillas-entrenamiento
// @access  Private
export const getPlantillas = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      q,
      objetivo,
      nivel,
      modalidad,
      visibilidad,
      estado,
      esFavorita,
      etiquetas,
      incluirPublicas,
      sortBy = 'nombre',
      sortDir = 'asc',
      page = 1,
      pageSize = 20
    } = req.query;

    // Build query
    const query = {
      isDeleted: false
    };

    // Si incluirPublicas es true, buscar plantillas del trainer o públicas
    if (incluirPublicas === 'true') {
      query.$or = [
        { trainerId },
        { visibilidad: 'publica', estado: 'activa' }
      ];
    } else {
      query.trainerId = trainerId;
    }

    // Text search
    if (q && q.trim()) {
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { nombre: { $regex: q.trim(), $options: 'i' } },
          { descripcion: { $regex: q.trim(), $options: 'i' } },
          { etiquetas: { $regex: q.trim(), $options: 'i' } }
        ]
      });
    }

    // Objetivo filter
    if (objetivo) {
      query.objetivo = objetivo;
    }

    // Nivel filter
    if (nivel) {
      query.nivel = nivel;
    }

    // Modalidad filter
    if (modalidad) {
      query.modalidad = modalidad;
    }

    // Visibilidad filter
    if (visibilidad) {
      query.visibilidad = visibilidad;
    }

    // Estado filter
    if (estado) {
      query.estado = estado;
    }

    // Favorita filter
    if (esFavorita === 'true') {
      query.esFavorita = true;
    }

    // Etiquetas filter
    if (etiquetas) {
      const tagsArray = Array.isArray(etiquetas) ? etiquetas : [etiquetas];
      if (tagsArray.length > 0) {
        query.etiquetas = { $all: tagsArray };
      }
    }

    // Get stats
    const stats = await PlantillaEntrenamiento.getStatsByTrainer(trainerId);

    // Sort
    const sortOptions = {};
    const validSortFields = ['nombre', 'objetivo', 'nivel', 'modalidad', 'vecesUtilizada', 'ultimoUso', 'calificacion', 'createdAt'];
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
    const total = await PlantillaEntrenamiento.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    // Get plantillas
    const plantillas = await PlantillaEntrenamiento.find(query)
      .populate('trainerId', 'nombre apellidos')
      .populate('diasEntrenamiento.ejercicios.ejercicioId', 'nombre categoria grupoMuscular')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v -isDeleted');

    res.status(200).json({
      success: true,
      data: plantillas,
      total,
      page: pageNum,
      pageSize: limit,
      pages,
      stats
    });
  } catch (error) {
    console.error('Error getting plantillas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las plantillas',
      details: error.message
    });
  }
};

// @desc    Get single plantilla
// @route   GET /api/plantillas-entrenamiento/:id
// @access  Private
export const getPlantilla = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // Buscar plantilla del trainer o pública
    const plantilla = await PlantillaEntrenamiento.findOne({
      _id: req.params.id,
      $or: [
        { trainerId },
        { visibilidad: 'publica', estado: 'activa' }
      ],
      isDeleted: false
    })
      .populate('trainerId', 'nombre apellidos')
      .populate('diasEntrenamiento.ejercicios.ejercicioId');

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: plantilla
    });
  } catch (error) {
    console.error('Error getting plantilla:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener la plantilla',
      details: error.message
    });
  }
};

// @desc    Create new plantilla
// @route   POST /api/plantillas-entrenamiento
// @access  Private
export const createPlantilla = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      nombre,
      descripcion,
      objetivo,
      nivel,
      modalidad,
      duracionSemanas,
      diasPorSemana,
      duracionSesion,
      diasEntrenamiento,
      equipamiento,
      gruposMusculares,
      etiquetas,
      visibilidad,
      imagen,
      estado
    } = req.body;

    // Check if plantilla already exists for this trainer
    const existingPlantilla = await PlantillaEntrenamiento.findOne({
      trainerId,
      nombre: nombre.trim(),
      isDeleted: false
    });

    if (existingPlantilla) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe una plantilla con este nombre'
      });
    }

    const plantilla = await PlantillaEntrenamiento.create({
      trainerId,
      nombre,
      descripcion,
      objetivo,
      nivel,
      modalidad,
      duracionSemanas: duracionSemanas || 4,
      diasPorSemana: diasPorSemana || 3,
      duracionSesion: duracionSesion || 60,
      diasEntrenamiento: diasEntrenamiento || [],
      equipamiento: equipamiento || [],
      gruposMusculares: gruposMusculares || [],
      etiquetas: etiquetas || [],
      visibilidad: visibilidad || 'privada',
      imagen,
      estado: estado || 'activa'
    });

    res.status(201).json({
      success: true,
      data: plantilla,
      message: 'Plantilla creada correctamente'
    });
  } catch (error) {
    console.error('Error creating plantilla:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe una plantilla con este nombre'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error al crear la plantilla',
      details: error.message
    });
  }
};

// @desc    Update plantilla
// @route   PUT /api/plantillas-entrenamiento/:id
// @access  Private
export const updatePlantilla = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      nombre,
      descripcion,
      objetivo,
      nivel,
      modalidad,
      duracionSemanas,
      diasPorSemana,
      duracionSesion,
      diasEntrenamiento,
      equipamiento,
      gruposMusculares,
      etiquetas,
      visibilidad,
      imagen,
      estado
    } = req.body;

    const plantilla = await PlantillaEntrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla no encontrada'
      });
    }

    // Check if nombre is being changed and if it already exists
    if (nombre && nombre.trim() !== plantilla.nombre) {
      const nombreExists = await PlantillaEntrenamiento.findOne({
        trainerId,
        nombre: nombre.trim(),
        isDeleted: false,
        _id: { $ne: req.params.id }
      });

      if (nombreExists) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe una plantilla con este nombre'
        });
      }
    }

    // Update fields
    if (nombre) plantilla.nombre = nombre;
    if (descripcion !== undefined) plantilla.descripcion = descripcion;
    if (objetivo) plantilla.objetivo = objetivo;
    if (nivel) plantilla.nivel = nivel;
    if (modalidad) plantilla.modalidad = modalidad;
    if (duracionSemanas) plantilla.duracionSemanas = duracionSemanas;
    if (diasPorSemana) plantilla.diasPorSemana = diasPorSemana;
    if (duracionSesion) plantilla.duracionSesion = duracionSesion;
    if (diasEntrenamiento !== undefined) plantilla.diasEntrenamiento = diasEntrenamiento;
    if (equipamiento !== undefined) plantilla.equipamiento = equipamiento;
    if (gruposMusculares !== undefined) plantilla.gruposMusculares = gruposMusculares;
    if (etiquetas !== undefined) plantilla.etiquetas = etiquetas;
    if (visibilidad) plantilla.visibilidad = visibilidad;
    if (imagen !== undefined) plantilla.imagen = imagen;
    if (estado) plantilla.estado = estado;

    await plantilla.save();

    res.status(200).json({
      success: true,
      data: plantilla,
      message: 'Plantilla actualizada correctamente'
    });
  } catch (error) {
    console.error('Error updating plantilla:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar la plantilla',
      details: error.message
    });
  }
};

// @desc    Delete plantilla (soft delete)
// @route   DELETE /api/plantillas-entrenamiento/:id
// @access  Private
export const deletePlantilla = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const plantilla = await PlantillaEntrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla no encontrada'
      });
    }

    // Soft delete
    plantilla.isDeleted = true;
    await plantilla.save();

    res.status(200).json({
      success: true,
      message: 'Plantilla eliminada correctamente'
    });
  } catch (error) {
    console.error('Error deleting plantilla:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la plantilla',
      details: error.message
    });
  }
};

// @desc    Toggle favorite plantilla
// @route   PATCH /api/plantillas-entrenamiento/:id/toggle-favorita
// @access  Private
export const toggleFavorita = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const plantilla = await PlantillaEntrenamiento.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla no encontrada'
      });
    }

    await plantilla.toggleFavorita();

    res.status(200).json({
      success: true,
      data: plantilla,
      message: plantilla.esFavorita ? 'Plantilla añadida a favoritas' : 'Plantilla quitada de favoritas'
    });
  } catch (error) {
    console.error('Error toggling favorita:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar favorita',
      details: error.message
    });
  }
};

// @desc    Increment plantilla usage counter
// @route   PATCH /api/plantillas-entrenamiento/:id/increment-uso
// @access  Private
export const incrementarUso = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const plantilla = await PlantillaEntrenamiento.findOne({
      _id: req.params.id,
      $or: [
        { trainerId },
        { visibilidad: 'publica', estado: 'activa' }
      ],
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla no encontrada'
      });
    }

    await plantilla.incrementarUso();

    res.status(200).json({
      success: true,
      data: plantilla,
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

// @desc    Rate plantilla
// @route   POST /api/plantillas-entrenamiento/:id/calificar
// @access  Private
export const calificarPlantilla = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { puntos } = req.body;

    if (!puntos || puntos < 1 || puntos > 5) {
      return res.status(400).json({
        success: false,
        error: 'La calificación debe ser entre 1 y 5'
      });
    }

    const plantilla = await PlantillaEntrenamiento.findOne({
      _id: req.params.id,
      visibilidad: 'publica',
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla no encontrada'
      });
    }

    await plantilla.agregarCalificacion(puntos);

    res.status(200).json({
      success: true,
      data: plantilla,
      message: 'Calificación agregada correctamente'
    });
  } catch (error) {
    console.error('Error rating plantilla:', error);
    res.status(500).json({
      success: false,
      error: 'Error al calificar la plantilla',
      details: error.message
    });
  }
};

// @desc    Duplicate plantilla
// @route   POST /api/plantillas-entrenamiento/:id/duplicate
// @access  Private
export const duplicatePlantilla = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const original = await PlantillaEntrenamiento.findOne({
      _id: req.params.id,
      $or: [
        { trainerId },
        { visibilidad: 'publica', estado: 'activa' }
      ],
      isDeleted: false
    });

    if (!original) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla no encontrada'
      });
    }

    // Create a copy with modified name
    const plantillaData = original.toObject();
    delete plantillaData._id;
    delete plantillaData.createdAt;
    delete plantillaData.updatedAt;
    plantillaData.trainerId = trainerId; // Asignar al trainer actual
    plantillaData.nombre = `${plantillaData.nombre} (copia)`;
    plantillaData.vecesUtilizada = 0;
    plantillaData.ultimoUso = null;
    plantillaData.esFavorita = false;
    plantillaData.visibilidad = 'privada'; // La copia es privada por defecto
    plantillaData.esPlantillaSistema = false;

    const duplicate = await PlantillaEntrenamiento.create(plantillaData);

    res.status(201).json({
      success: true,
      data: duplicate,
      message: 'Plantilla duplicada correctamente'
    });
  } catch (error) {
    console.error('Error duplicating plantilla:', error);
    res.status(500).json({
      success: false,
      error: 'Error al duplicar la plantilla',
      details: error.message
    });
  }
};

// @desc    Get plantilla statistics
// @route   GET /api/plantillas-entrenamiento/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const stats = await PlantillaEntrenamiento.getStatsByTrainer(trainerId);

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

// @desc    Get public plantillas
// @route   GET /api/plantillas-entrenamiento/publicas
// @access  Private
export const getPlantillasPublicas = async (req, res) => {
  try {
    const {
      objetivo,
      nivel,
      modalidad,
      sortBy = 'calificacion',
      sortDir = 'desc',
      page = 1,
      pageSize = 20
    } = req.query;

    const query = {
      visibilidad: 'publica',
      estado: 'activa',
      isDeleted: false
    };

    if (objetivo) query.objetivo = objetivo;
    if (nivel) query.nivel = nivel;
    if (modalidad) query.modalidad = modalidad;

    // Sort
    const sortOptions = {};
    const validSortFields = ['nombre', 'calificacion', 'vecesUtilizada', 'createdAt'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.calificacion = -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    const total = await PlantillaEntrenamiento.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    const plantillas = await PlantillaEntrenamiento.find(query)
      .populate('trainerId', 'nombre apellidos')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v -isDeleted');

    res.status(200).json({
      success: true,
      data: plantillas,
      total,
      page: pageNum,
      pageSize: limit,
      pages
    });
  } catch (error) {
    console.error('Error getting public plantillas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener plantillas públicas',
      details: error.message
    });
  }
};
