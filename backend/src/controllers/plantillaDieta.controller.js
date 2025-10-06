import PlantillaDieta from '../models/PlantillaDieta.model.js';
import Trainer from '../models/Trainer.model.js';

// @desc    Get all plantillas dietas for a trainer with filters and pagination
// @route   GET /api/plantillas-dietas
// @access  Private
export const getPlantillasDietas = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      q,
      objective,
      dietType,
      time_level,
      culinary_experience,
      caloriesMin,
      caloriesMax,
      is_public,
      is_favorite,
      estado,
      incluirPublicas,
      sortBy = 'name',
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
        { is_public: true, estado: 'activa' }
      ];
    } else {
      query.trainerId = trainerId;
    }

    // Text search
    if (q && q.trim()) {
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { name: { $regex: q.trim(), $options: 'i' } },
          { description: { $regex: q.trim(), $options: 'i' } },
          { 'author.name': { $regex: q.trim(), $options: 'i' } }
        ]
      });
    }

    // Objective filter
    if (objective) {
      query.objective = objective;
    }

    // Diet type filter
    if (dietType) {
      query.dietType = dietType;
    }

    // Time level filter
    if (time_level) {
      query.time_level = time_level;
    }

    // Culinary experience filter
    if (culinary_experience) {
      query.culinary_experience = culinary_experience;
    }

    // Estado filter
    if (estado) {
      query.estado = estado;
    }

    // Public filter
    if (is_public === 'true') {
      query.is_public = true;
    } else if (is_public === 'false') {
      query.is_public = false;
    }

    // Favorite filter
    if (is_favorite === 'true') {
      query.is_favorite = true;
    }

    // Calories range filter
    if (caloriesMin || caloriesMax) {
      query.calories = {};
      if (caloriesMin) query.calories.$gte = parseInt(caloriesMin);
      if (caloriesMax) query.calories.$lte = parseInt(caloriesMax);
    }

    // Get stats
    const stats = await PlantillaDieta.getStatsByTrainer(trainerId);

    // Sort
    const sortOptions = {};
    const validSortFields = ['name', 'objective', 'dietType', 'calories', 'uses', 'lastUsed', 'rating', 'createdAt'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.name = 1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    // Get total count
    const total = await PlantillaDieta.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    // Get plantillas dietas
    const plantillas = await PlantillaDieta.find(query)
      .populate('trainerId', 'name email')
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
    console.error('Error getting plantillas dietas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las plantillas de dietas',
      details: error.message
    });
  }
};

// @desc    Get single plantilla dieta
// @route   GET /api/plantillas-dietas/:id
// @access  Private
export const getPlantillaDieta = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // Buscar plantilla del trainer o pública
    const plantilla = await PlantillaDieta.findOne({
      _id: req.params.id,
      $or: [
        { trainerId },
        { is_public: true, estado: 'activa' }
      ],
      isDeleted: false
    })
      .populate('trainerId', 'name email');

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla de dieta no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: plantilla
    });
  } catch (error) {
    console.error('Error getting plantilla dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener la plantilla de dieta',
      details: error.message
    });
  }
};

// @desc    Create new plantilla dieta
// @route   POST /api/plantillas-dietas
// @access  Private
export const createPlantillaDieta = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      name,
      description,
      objective,
      dietType,
      time_level,
      culinary_experience,
      calories,
      macros,
      duration_weeks,
      is_public,
      is_favorite,
      restrictions,
      allergens,
      weekly_menu,
      estado
    } = req.body;

    // Get trainer info for author field
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer no encontrado'
      });
    }

    // Check if plantilla already exists for this trainer
    const existingPlantilla = await PlantillaDieta.findOne({
      trainerId,
      name: name.trim(),
      isDeleted: false
    });

    if (existingPlantilla) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe una plantilla de dieta con este nombre'
      });
    }

    const plantilla = await PlantillaDieta.create({
      trainerId,
      name,
      description,
      author: {
        name: trainer.name,
        avatar: trainer.avatar || ''
      },
      objective,
      dietType,
      time_level,
      culinary_experience,
      calories,
      macros: macros || { protein: 0, carbs: 0, fat: 0 },
      duration_weeks: duration_weeks || 4,
      is_public: is_public || false,
      is_favorite: is_favorite || false,
      restrictions: restrictions || [],
      allergens: allergens || [],
      weekly_menu: weekly_menu || [],
      estado: estado || 'activa'
    });

    res.status(201).json({
      success: true,
      data: plantilla,
      message: 'Plantilla de dieta creada correctamente'
    });
  } catch (error) {
    console.error('Error creating plantilla dieta:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe una plantilla de dieta con este nombre'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Error al crear la plantilla de dieta',
      details: error.message
    });
  }
};

// @desc    Update plantilla dieta
// @route   PUT /api/plantillas-dietas/:id
// @access  Private
export const updatePlantillaDieta = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const {
      name,
      description,
      objective,
      dietType,
      time_level,
      culinary_experience,
      calories,
      macros,
      duration_weeks,
      is_public,
      is_favorite,
      restrictions,
      allergens,
      weekly_menu,
      estado
    } = req.body;

    const plantilla = await PlantillaDieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla de dieta no encontrada'
      });
    }

    // Check if name is being changed and if it already exists
    if (name && name.trim() !== plantilla.name) {
      const nombreExists = await PlantillaDieta.findOne({
        trainerId,
        name: name.trim(),
        isDeleted: false,
        _id: { $ne: req.params.id }
      });

      if (nombreExists) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe una plantilla de dieta con este nombre'
        });
      }
    }

    // Update fields
    if (name) plantilla.name = name;
    if (description !== undefined) plantilla.description = description;
    if (objective) plantilla.objective = objective;
    if (dietType) plantilla.dietType = dietType;
    if (time_level) plantilla.time_level = time_level;
    if (culinary_experience) plantilla.culinary_experience = culinary_experience;
    if (calories) plantilla.calories = calories;
    if (macros !== undefined) plantilla.macros = macros;
    if (duration_weeks) plantilla.duration_weeks = duration_weeks;
    if (is_public !== undefined) plantilla.is_public = is_public;
    if (is_favorite !== undefined) plantilla.is_favorite = is_favorite;
    if (restrictions !== undefined) plantilla.restrictions = restrictions;
    if (allergens !== undefined) plantilla.allergens = allergens;
    if (weekly_menu !== undefined) plantilla.weekly_menu = weekly_menu;
    if (estado) plantilla.estado = estado;

    await plantilla.save();

    res.status(200).json({
      success: true,
      data: plantilla,
      message: 'Plantilla de dieta actualizada correctamente'
    });
  } catch (error) {
    console.error('Error updating plantilla dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar la plantilla de dieta',
      details: error.message
    });
  }
};

// @desc    Delete plantilla dieta (soft delete)
// @route   DELETE /api/plantillas-dietas/:id
// @access  Private
export const deletePlantillaDieta = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const plantilla = await PlantillaDieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla de dieta no encontrada'
      });
    }

    // Soft delete
    plantilla.isDeleted = true;
    await plantilla.save();

    res.status(200).json({
      success: true,
      message: 'Plantilla de dieta eliminada correctamente'
    });
  } catch (error) {
    console.error('Error deleting plantilla dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la plantilla de dieta',
      details: error.message
    });
  }
};

// @desc    Toggle favorite plantilla dieta
// @route   PATCH /api/plantillas-dietas/:id/toggle-favorita
// @access  Private
export const toggleFavorita = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const plantilla = await PlantillaDieta.findOne({
      _id: req.params.id,
      trainerId,
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla de dieta no encontrada'
      });
    }

    await plantilla.toggleFavorita();

    res.status(200).json({
      success: true,
      data: plantilla,
      message: plantilla.is_favorite ? 'Plantilla añadida a favoritas' : 'Plantilla quitada de favoritas'
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

// @desc    Increment plantilla dieta usage counter
// @route   PATCH /api/plantillas-dietas/:id/increment-uso
// @access  Private
export const incrementarUso = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const plantilla = await PlantillaDieta.findOne({
      _id: req.params.id,
      $or: [
        { trainerId },
        { is_public: true, estado: 'activa' }
      ],
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla de dieta no encontrada'
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

// @desc    Rate plantilla dieta
// @route   POST /api/plantillas-dietas/:id/calificar
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

    const plantilla = await PlantillaDieta.findOne({
      _id: req.params.id,
      is_public: true,
      isDeleted: false
    });

    if (!plantilla) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla de dieta no encontrada'
      });
    }

    await plantilla.agregarCalificacion(puntos);

    res.status(200).json({
      success: true,
      data: plantilla,
      message: 'Calificación agregada correctamente'
    });
  } catch (error) {
    console.error('Error rating plantilla dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al calificar la plantilla de dieta',
      details: error.message
    });
  }
};

// @desc    Duplicate plantilla dieta
// @route   POST /api/plantillas-dietas/:id/duplicate
// @access  Private
export const duplicatePlantilla = async (req, res) => {
  try {
    const trainerId = req.user.id;

    const original = await PlantillaDieta.findOne({
      _id: req.params.id,
      $or: [
        { trainerId },
        { is_public: true, estado: 'activa' }
      ],
      isDeleted: false
    });

    if (!original) {
      return res.status(404).json({
        success: false,
        error: 'Plantilla de dieta no encontrada'
      });
    }

    // Get trainer info for author field
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer no encontrado'
      });
    }

    // Create a copy with modified name
    const plantillaData = original.toObject();
    delete plantillaData._id;
    delete plantillaData.createdAt;
    delete plantillaData.updatedAt;
    plantillaData.trainerId = trainerId; // Asignar al trainer actual
    plantillaData.name = `${plantillaData.name} (copia)`;
    plantillaData.author = {
      name: trainer.name,
      avatar: trainer.avatar || ''
    };
    plantillaData.uses = 0;
    plantillaData.lastUsed = null;
    plantillaData.is_favorite = false;
    plantillaData.is_public = false; // La copia es privada por defecto
    plantillaData.rating = 0;
    plantillaData.reviews = 0;

    const duplicate = await PlantillaDieta.create(plantillaData);

    res.status(201).json({
      success: true,
      data: duplicate,
      message: 'Plantilla de dieta duplicada correctamente'
    });
  } catch (error) {
    console.error('Error duplicating plantilla dieta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al duplicar la plantilla de dieta',
      details: error.message
    });
  }
};

// @desc    Get plantilla dieta statistics
// @route   GET /api/plantillas-dietas/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const trainerId = req.user.id;
    const stats = await PlantillaDieta.getStatsByTrainer(trainerId);

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

// @desc    Get public plantillas dietas
// @route   GET /api/plantillas-dietas/publicas
// @access  Private
export const getPlantillasDietasPublicas = async (req, res) => {
  try {
    const {
      objective,
      dietType,
      time_level,
      culinary_experience,
      sortBy = 'rating',
      sortDir = 'desc',
      page = 1,
      pageSize = 20
    } = req.query;

    const query = {
      is_public: true,
      estado: 'activa',
      isDeleted: false
    };

    if (objective) query.objective = objective;
    if (dietType) query.dietType = dietType;
    if (time_level) query.time_level = time_level;
    if (culinary_experience) query.culinary_experience = culinary_experience;

    // Sort
    const sortOptions = {};
    const validSortFields = ['name', 'rating', 'uses', 'createdAt'];
    if (validSortFields.includes(sortBy)) {
      sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;
    } else {
      sortOptions.rating = -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limit = Math.max(1, Math.min(100, parseInt(pageSize)));
    const skip = (pageNum - 1) * limit;

    const total = await PlantillaDieta.countDocuments(query);
    const pages = Math.max(1, Math.ceil(total / limit));

    const plantillas = await PlantillaDieta.find(query)
      .populate('trainerId', 'name email')
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
    console.error('Error getting public plantillas dietas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener plantillas de dietas públicas',
      details: error.message
    });
  }
};
