import Receta from '../models/Receta.model.js';
import Trainer from '../models/Trainer.model.js';

// @desc    Get all recetas for a trainer with filters and pagination
// @route   GET /api/recetas
// @access  Private
export const getRecetas = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      q,
      tipoComida,
      dificultad,
      restricciones,
      esFavorita,
      esDestacada,
      tiempoMaximo,
      caloriasMin,
      caloriasMax,
      sortBy = 'createdAt',
      sortDir = 'desc',
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
        { 'ingredientes.nombre': { $regex: q.trim(), $options: 'i' } },
        { etiquetas: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Filters
    if (tipoComida) {
      query.tipoComida = tipoComida;
    }

    if (dificultad) {
      query.dificultad = dificultad;
    }

    if (restricciones) {
      const restrictionsArray = Array.isArray(restricciones) ? restricciones : [restricciones];
      query.restricciones = { $in: restrictionsArray };
    }

    if (esFavorita !== undefined) {
      query.esFavorita = esFavorita === 'true';
    }

    if (esDestacada !== undefined) {
      query.esDestacada = esDestacada === 'true';
    }

    if (tiempoMaximo) {
      query.$expr = {
        $lte: [
          { $add: ['$tiempoPreparacion', '$tiempoCoccion'] },
          parseInt(tiempoMaximo)
        ]
      };
    }

    if (caloriasMax) {
      query['valoresNutricionales.calorias'] = { $lte: parseInt(caloriasMax) };
    }

    if (caloriasMin) {
      query['valoresNutricionales.calorias'] = {
        ...query['valoresNutricionales.calorias'],
        $gte: parseInt(caloriasMin)
      };
    }

    // Get stats
    const stats = await Receta.getStatsByTrainer(trainerId);

    // Sort
    const sortOptions = {};
    const validSortFields = ['nombre', 'tipoComida', 'dificultad', 'rating', 'contadorUsos', 'createdAt', 'updatedAt'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.createdAt = -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    // Get total count
    const total = await Receta.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    // Get recetas
    const recetas = await Receta.find(query)
      .populate('trainerId', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v -isDeleted');

    res.status(200).json({
      success: true,
      data: recetas,
      total,
      page: pageNum,
      pageSize: limit,
      pages,
      stats
    });
  } catch (error) {
    console.error('Error getting recetas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las recetas',
      details: error.message
    });
  }
};

// @desc    Get single receta
// @route   GET /api/recetas/:id
// @access  Private
export const getReceta = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const receta = await Receta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    })
      .populate('trainerId', 'name email');

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: receta
    });
  } catch (error) {
    console.error('Error getting receta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener la receta',
      details: error.message
    });
  }
};

// @desc    Create new receta
// @route   POST /api/recetas
// @access  Private
export const createReceta = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      nombre,
      descripcion,
      tipoComida,
      dificultad,
      tiempoPreparacion,
      tiempoCoccion,
      porciones,
      ingredientes,
      pasos,
      valoresNutricionales,
      restricciones,
      etiquetas,
      fotoUrl,
      videoUrl,
      notasPersonales,
      tipsNotas,
      rating,
      esFavorita,
      esDestacada,
      badge,
      esPublica
    } = req.body;

    const recetaData = {
      trainerId,
      nombre,
      descripcion: descripcion || '',
      tipoComida,
      dificultad: dificultad || 'Media',
      tiempoPreparacion: tiempoPreparacion || 0,
      tiempoCoccion: tiempoCoccion || 0,
      porciones: porciones || 1,
      ingredientes: ingredientes || [],
      pasos: pasos || [],
      valoresNutricionales: valoresNutricionales || { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
      restricciones: restricciones || [],
      etiquetas: etiquetas || [],
      fotoUrl: fotoUrl || '',
      videoUrl: videoUrl || '',
      notasPersonales: notasPersonales || '',
      tipsNotas: tipsNotas || '',
      rating: rating || 0,
      esFavorita: esFavorita || false,
      esDestacada: esDestacada || false,
      badge: badge || '',
      esPublica: esPublica || false
    };

    const receta = await Receta.create(recetaData);

    // Populate para devolver datos completos
    await receta.populate('trainerId', 'name email');

    res.status(201).json({
      success: true,
      data: receta,
      message: 'Receta creada correctamente'
    });
  } catch (error) {
    console.error('Error creating receta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear la receta',
      details: error.message
    });
  }
};

// @desc    Update receta
// @route   PUT /api/recetas/:id
// @access  Private
export const updateReceta = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      nombre,
      descripcion,
      tipoComida,
      dificultad,
      tiempoPreparacion,
      tiempoCoccion,
      porciones,
      ingredientes,
      pasos,
      valoresNutricionales,
      restricciones,
      etiquetas,
      fotoUrl,
      videoUrl,
      notasPersonales,
      tipsNotas,
      rating,
      esFavorita,
      esDestacada,
      badge,
      esPublica
    } = req.body;

    const receta = await Receta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    // Update fields
    if (nombre) receta.nombre = nombre;
    if (descripcion !== undefined) receta.descripcion = descripcion;
    if (tipoComida) receta.tipoComida = tipoComida;
    if (dificultad) receta.dificultad = dificultad;
    if (tiempoPreparacion !== undefined) receta.tiempoPreparacion = tiempoPreparacion;
    if (tiempoCoccion !== undefined) receta.tiempoCoccion = tiempoCoccion;
    if (porciones !== undefined) receta.porciones = porciones;
    if (ingredientes !== undefined) receta.ingredientes = ingredientes;
    if (pasos !== undefined) receta.pasos = pasos;
    if (valoresNutricionales !== undefined) receta.valoresNutricionales = valoresNutricionales;
    if (restricciones !== undefined) receta.restricciones = restricciones;
    if (etiquetas !== undefined) receta.etiquetas = etiquetas;
    if (fotoUrl !== undefined) receta.fotoUrl = fotoUrl;
    if (videoUrl !== undefined) receta.videoUrl = videoUrl;
    if (notasPersonales !== undefined) receta.notasPersonales = notasPersonales;
    if (tipsNotas !== undefined) receta.tipsNotas = tipsNotas;
    if (rating !== undefined) receta.rating = rating;
    if (esFavorita !== undefined) receta.esFavorita = esFavorita;
    if (esDestacada !== undefined) receta.esDestacada = esDestacada;
    if (badge !== undefined) receta.badge = badge;
    if (esPublica !== undefined) receta.esPublica = esPublica;

    // Incrementar versión
    receta.version += 1;

    await receta.save();

    // Populate para devolver datos completos
    await receta.populate('trainerId', 'name email');

    res.status(200).json({
      success: true,
      data: receta,
      message: 'Receta actualizada correctamente'
    });
  } catch (error) {
    console.error('Error updating receta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar la receta',
      details: error.message
    });
  }
};

// @desc    Delete receta (soft delete)
// @route   DELETE /api/recetas/:id
// @access  Private
export const deleteReceta = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const receta = await Receta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    // Soft delete
    receta.isDeleted = true;
    await receta.save();

    res.status(200).json({
      success: true,
      message: 'Receta eliminada correctamente'
    });
  } catch (error) {
    console.error('Error deleting receta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la receta',
      details: error.message
    });
  }
};

// @desc    Toggle favorita status
// @route   PATCH /api/recetas/:id/favorita
// @access  Private
export const toggleFavorita = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const receta = await Receta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    await receta.toggleFavorita();

    res.status(200).json({
      success: true,
      data: receta,
      message: receta.esFavorita ? 'Receta añadida a favoritas' : 'Receta eliminada de favoritas'
    });
  } catch (error) {
    console.error('Error toggling favorita:', error);
    res.status(500).json({
      success: false,
      error: 'Error al cambiar estado de favorita',
      details: error.message
    });
  }
};

// @desc    Update rating
// @route   PATCH /api/recetas/:id/rating
// @access  Private
export const updateRating = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const { rating } = req.body;

    if (rating === undefined || rating < 0 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'El rating debe estar entre 0 y 5'
      });
    }

    const receta = await Receta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    await receta.actualizarRating(rating);

    res.status(200).json({
      success: true,
      data: receta,
      message: 'Rating actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el rating',
      details: error.message
    });
  }
};

// @desc    Increment uso counter
// @route   PATCH /api/recetas/:id/uso
// @access  Private
export const incrementarUso = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const receta = await Receta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    await receta.incrementarUso();

    res.status(200).json({
      success: true,
      data: receta,
      message: 'Uso registrado correctamente'
    });
  } catch (error) {
    console.error('Error incrementing uso:', error);
    res.status(500).json({
      success: false,
      error: 'Error al registrar el uso',
      details: error.message
    });
  }
};

// @desc    Get recetas statistics for a trainer
// @route   GET /api/recetas/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const stats = await Receta.getStatsByTrainer(trainerId);

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

// @desc    Get public recetas
// @route   GET /api/recetas/publicas
// @access  Private
export const getRecetasPublicas = async (req, res) => {
  try {
    const {
      q,
      tipoComida,
      dificultad,
      restricciones,
      sortBy = 'rating',
      sortDir = 'desc',
      page = 1,
      pageSize = 20
    } = req.query;

    // Build query
    const query = {
      esPublica: true,
      isDeleted: false
    };

    // Text search
    if (q && q.trim()) {
      query.$or = [
        { nombre: { $regex: q.trim(), $options: 'i' } },
        { descripcion: { $regex: q.trim(), $options: 'i' } },
        { 'ingredientes.nombre': { $regex: q.trim(), $options: 'i' } },
        { etiquetas: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Filters
    if (tipoComida) {
      query.tipoComida = tipoComida;
    }

    if (dificultad) {
      query.dificultad = dificultad;
    }

    if (restricciones) {
      const restrictionsArray = Array.isArray(restricciones) ? restricciones : [restricciones];
      query.restricciones = { $in: restrictionsArray };
    }

    // Sort
    const sortOptions = {};
    const validSortFields = ['nombre', 'rating', 'contadorUsos', 'createdAt'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.rating = -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    // Get total count
    const total = await Receta.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    // Get recetas
    const recetas = await Receta.find(query)
      .populate('trainerId', 'name')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-notasPersonales -__v -isDeleted');

    res.status(200).json({
      success: true,
      data: recetas,
      total,
      page: pageNum,
      pageSize: limit,
      pages
    });
  } catch (error) {
    console.error('Error getting recetas publicas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las recetas públicas',
      details: error.message
    });
  }
};

// @desc    Duplicate receta
// @route   POST /api/recetas/:id/duplicar
// @access  Private
export const duplicarReceta = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const recetaOriginal = await Receta.findOne({
      _id: req.params.id,
      $or: [
        { trainerId },
        { esPublica: true }
      ],
      isDeleted: false
    });

    if (!recetaOriginal) {
      return res.status(404).json({
        success: false,
        error: 'Receta no encontrada'
      });
    }

    // Crear copia de la receta
    const recetaDuplicada = new Receta({
      trainerId,
      nombre: `${recetaOriginal.nombre} (Copia)`,
      descripcion: recetaOriginal.descripcion,
      tipoComida: recetaOriginal.tipoComida,
      dificultad: recetaOriginal.dificultad,
      tiempoPreparacion: recetaOriginal.tiempoPreparacion,
      tiempoCoccion: recetaOriginal.tiempoCoccion,
      porciones: recetaOriginal.porciones,
      ingredientes: recetaOriginal.ingredientes,
      pasos: recetaOriginal.pasos,
      valoresNutricionales: recetaOriginal.valoresNutricionales,
      restricciones: recetaOriginal.restricciones,
      etiquetas: recetaOriginal.etiquetas,
      fotoUrl: recetaOriginal.fotoUrl,
      videoUrl: recetaOriginal.videoUrl,
      tipsNotas: recetaOriginal.tipsNotas,
      esFavorita: false,
      esDestacada: false,
      esPublica: false,
      version: 1
    });

    await recetaDuplicada.save();
    await recetaDuplicada.populate('trainerId', 'name email');

    res.status(201).json({
      success: true,
      data: recetaDuplicada,
      message: 'Receta duplicada correctamente'
    });
  } catch (error) {
    console.error('Error duplicating receta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al duplicar la receta',
      details: error.message
    });
  }
};
