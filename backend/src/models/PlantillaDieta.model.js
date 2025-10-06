import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  calories: {
    type: Number,
    min: 0,
    default: 0
  },
  macros: {
    protein: { type: Number, min: 0, default: 0 },
    carbs: { type: Number, min: 0, default: 0 },
    fat: { type: Number, min: 0, default: 0 }
  },
  foods: [{
    type: String,
    trim: true
  }]
}, { _id: false });

const dayMenuSchema = new mongoose.Schema({
  breakfast: mealSchema,
  lunch: mealSchema,
  dinner: mealSchema,
  snacks: [mealSchema]
}, { _id: false });

const plantillaDietaSchema = new mongoose.Schema({
  // Relación con el Trainer
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
    index: true
  },

  // Información básica
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },

  description: {
    type: String,
    trim: true,
    default: ''
  },

  // Autor (información del trainer que la creó)
  author: {
    name: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      default: ''
    }
  },

  // Objetivo de la dieta
  objective: {
    type: String,
    enum: [
      'perdida_peso',
      'ganancia_muscular',
      'mantenimiento',
      'definicion',
      'volumen_limpio',
      'rendimiento',
      'salud_general',
      'recomposicion'
    ],
    required: true
  },

  // Tipo de dieta
  dietType: {
    type: String,
    enum: [
      'mediterranea',
      'keto',
      'vegana',
      'vegetariana',
      'paleo',
      'flexible',
      'intermitente',
      'baja_carbos',
      'alta_proteina'
    ],
    required: true
  },

  // Nivel de tiempo de preparación
  time_level: {
    type: String,
    enum: ['quick', 'advanced', 'no_cook'],
    required: true
  },

  // Experiencia culinaria requerida
  culinary_experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    required: true
  },

  // Calorías diarias totales
  calories: {
    type: Number,
    min: 800,
    max: 5000,
    required: true
  },

  // Macros diarios totales
  macros: {
    protein: { type: Number, min: 0, required: true },
    carbs: { type: Number, min: 0, required: true },
    fat: { type: Number, min: 0, required: true }
  },

  // Duración del plan en semanas
  duration_weeks: {
    type: Number,
    min: 1,
    max: 52,
    default: 4
  },

  // Visibilidad
  is_public: {
    type: Boolean,
    default: false
  },

  // Favorito
  is_favorite: {
    type: Boolean,
    default: false
  },

  // Restricciones alimentarias
  restrictions: [{
    type: String,
    trim: true
  }],

  // Alérgenos
  allergens: [{
    type: String,
    trim: true
  }],

  // Calificación
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  // Número de usos
  uses: {
    type: Number,
    default: 0,
    min: 0
  },

  // Número de reviews/calificaciones
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },

  // Menú semanal (array de hasta 7 días)
  weekly_menu: [dayMenuSchema],

  // Estado
  estado: {
    type: String,
    enum: ['activa', 'borrador', 'archivada'],
    default: 'activa'
  },

  // Último uso
  lastUsed: {
    type: Date,
    default: null
  },

  // Metadata
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices compuestos para búsquedas eficientes
plantillaDietaSchema.index({ trainerId: 1, name: 1 });
plantillaDietaSchema.index({ trainerId: 1, objective: 1 });
plantillaDietaSchema.index({ trainerId: 1, dietType: 1 });
plantillaDietaSchema.index({ trainerId: 1, time_level: 1 });
plantillaDietaSchema.index({ trainerId: 1, culinary_experience: 1 });
plantillaDietaSchema.index({ trainerId: 1, is_public: 1 });
plantillaDietaSchema.index({ trainerId: 1, is_favorite: 1 });
plantillaDietaSchema.index({ trainerId: 1, estado: 1 });
plantillaDietaSchema.index({ trainerId: 1, isDeleted: 1 });
plantillaDietaSchema.index({ is_public: 1, estado: 1, isDeleted: 1 }); // Para plantillas públicas
plantillaDietaSchema.index({ trainerId: 1, uses: -1 });

// Texto completo para búsquedas
plantillaDietaSchema.index({
  name: 'text',
  description: 'text',
  'author.name': 'text'
});

// Métodos de instancia
plantillaDietaSchema.methods.incrementarUso = function() {
  this.uses += 1;
  this.lastUsed = new Date();
  return this.save();
};

plantillaDietaSchema.methods.toggleFavorita = function() {
  this.is_favorite = !this.is_favorite;
  return this.save();
};

plantillaDietaSchema.methods.agregarCalificacion = function(puntos) {
  const totalPuntos = (this.rating * this.reviews) + puntos;
  this.reviews += 1;
  this.rating = totalPuntos / this.reviews;
  return this.save();
};

plantillaDietaSchema.methods.cambiarEstado = function(nuevoEstado) {
  this.estado = nuevoEstado;
  return this.save();
};

plantillaDietaSchema.methods.cambiarVisibilidad = function(isPublic) {
  this.is_public = isPublic;
  return this.save();
};

// Métodos estáticos
plantillaDietaSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.objective) {
    query.objective = filters.objective;
  }

  if (filters.dietType) {
    query.dietType = filters.dietType;
  }

  if (filters.time_level) {
    query.time_level = filters.time_level;
  }

  if (filters.culinary_experience) {
    query.culinary_experience = filters.culinary_experience;
  }

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.is_favorite !== undefined) {
    query.is_favorite = filters.is_favorite;
  }

  if (filters.is_public !== undefined) {
    query.is_public = filters.is_public;
  }

  if (filters.caloriesMin || filters.caloriesMax) {
    query.calories = {};
    if (filters.caloriesMin) query.calories.$gte = parseInt(filters.caloriesMin);
    if (filters.caloriesMax) query.calories.$lte = parseInt(filters.caloriesMax);
  }

  return this.find(query);
};

plantillaDietaSchema.statics.findPublicas = function(filters = {}) {
  const query = {
    is_public: true,
    estado: 'activa',
    isDeleted: false
  };

  if (filters.objective) {
    query.objective = filters.objective;
  }

  if (filters.dietType) {
    query.dietType = filters.dietType;
  }

  if (filters.time_level) {
    query.time_level = filters.time_level;
  }

  if (filters.culinary_experience) {
    query.culinary_experience = filters.culinary_experience;
  }

  return this.find(query).populate('trainerId', 'name email');
};

plantillaDietaSchema.statics.searchByTrainer = function(trainerId, searchText) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { name: { $regex: searchText, $options: 'i' } },
      { description: { $regex: searchText, $options: 'i' } },
      { 'author.name': { $regex: searchText, $options: 'i' } }
    ]
  });
};

plantillaDietaSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const activas = await this.countDocuments({ trainerId, estado: 'activa', isDeleted: false });
  const borradores = await this.countDocuments({ trainerId, estado: 'borrador', isDeleted: false });
  const favoritas = await this.countDocuments({ trainerId, is_favorite: true, isDeleted: false });
  const publicas = await this.countDocuments({ trainerId, is_public: true, isDeleted: false });

  // Plantillas por objetivo
  const porObjetivo = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$objective', count: { $sum: 1 } } }
  ]);

  // Plantillas por tipo de dieta
  const porTipoDieta = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$dietType', count: { $sum: 1 } } }
  ]);

  // Plantillas más usadas
  const masUsadas = await this.find({ trainerId, isDeleted: false })
    .sort({ uses: -1 })
    .limit(10)
    .select('name uses lastUsed rating');

  // Total de usos
  const totalUsos = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: null, totalUsos: { $sum: '$uses' } } }
  ]);

  return {
    total,
    activas,
    borradores,
    favoritas,
    publicas,
    porObjetivo,
    porTipoDieta,
    masUsadas,
    totalUsos: totalUsos[0]?.totalUsos || 0
  };
};

// Middleware pre-save
plantillaDietaSchema.pre('save', function(next) {
  // Asegurar que las restricciones no tengan duplicados
  this.restrictions = [...new Set(this.restrictions)];

  // Asegurar que los alérgenos no tengan duplicados
  this.allergens = [...new Set(this.allergens)];

  // Si el autor no está definido, usar la información del trainer
  if (!this.author || !this.author.name) {
    // Esto se manejará en el controlador al poblar los datos del trainer
  }

  next();
});

const PlantillaDieta = mongoose.model('PlantillaDieta', plantillaDietaSchema);

export default PlantillaDieta;
