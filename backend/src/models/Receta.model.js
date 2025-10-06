import mongoose from 'mongoose';

const ingredienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0
  },
  unidad: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: true });

const pasoSchema = new mongoose.Schema({
  orden: {
    type: Number,
    required: true,
    min: 1
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  tiempoEstimado: {
    type: Number,
    min: 0,
    default: 0 // en minutos
  }
}, { _id: true });

const valoresNutricionalesSchema = new mongoose.Schema({
  calorias: {
    type: Number,
    required: true,
    min: 0
  },
  proteinas: {
    type: Number,
    required: true,
    min: 0
  },
  carbohidratos: {
    type: Number,
    required: true,
    min: 0
  },
  grasas: {
    type: Number,
    required: true,
    min: 0
  },
  fibra: {
    type: Number,
    min: 0,
    default: 0
  },
  sodio: {
    type: Number,
    min: 0,
    default: 0
  },
  azucar: {
    type: Number,
    min: 0,
    default: 0
  }
}, { _id: false });

const recetaSchema = new mongoose.Schema({
  // Relación con el Trainer
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
    index: true
  },

  // Información básica
  nombre: {
    type: String,
    required: [true, 'El nombre de la receta es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [200, 'El nombre no puede exceder 200 caracteres']
  },

  descripcion: {
    type: String,
    trim: true,
    default: '',
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },

  // Tipo de comida
  tipoComida: {
    type: String,
    enum: ['Desayuno', 'Almuerzo', 'Cena', 'Snack', 'Postre', 'Bebida'],
    required: [true, 'El tipo de comida es obligatorio']
  },

  // Dificultad
  dificultad: {
    type: String,
    enum: ['Fácil', 'Media', 'Difícil'],
    required: true,
    default: 'Media'
  },

  // Tiempos de preparación (en minutos)
  tiempoPreparacion: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },

  tiempoCoccion: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },

  // Porciones
  porciones: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },

  // Ingredientes
  ingredientes: [ingredienteSchema],

  // Pasos de preparación
  pasos: [pasoSchema],

  // Valores nutricionales
  valoresNutricionales: {
    type: valoresNutricionalesSchema,
    required: true
  },

  // Restricciones alimentarias
  restricciones: [{
    type: String,
    enum: ['Vegano', 'Vegetariano', 'Sin gluten', 'Sin lactosa', 'Sin frutos secos', 'Bajo en sodio', 'Diabético', 'Keto', 'Paleo'],
    trim: true
  }],

  // Etiquetas
  etiquetas: [{
    type: String,
    trim: true
  }],

  // URLs multimedia
  fotoUrl: {
    type: String,
    trim: true,
    default: ''
  },

  videoUrl: {
    type: String,
    trim: true,
    default: ''
  },

  // Notas personales del trainer
  notasPersonales: {
    type: String,
    trim: true,
    default: ''
  },

  // Tips y notas adicionales
  tipsNotas: {
    type: String,
    trim: true,
    default: ''
  },

  // Rating (0-5)
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  // Favorita
  esFavorita: {
    type: Boolean,
    default: false
  },

  // Destacada
  esDestacada: {
    type: Boolean,
    default: false
  },

  // Badge especial
  badge: {
    type: String,
    enum: ['Más Popular', 'Nuevo', "Chef's Choice", ''],
    default: ''
  },

  // Versión de la receta
  version: {
    type: Number,
    default: 1,
    min: 1
  },

  // Público/Privado (si es pública puede ser compartida)
  esPublica: {
    type: Boolean,
    default: false
  },

  // Contador de usos
  contadorUsos: {
    type: Number,
    default: 0,
    min: 0
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
recetaSchema.index({ trainerId: 1, isDeleted: 1 });
recetaSchema.index({ trainerId: 1, tipoComida: 1 });
recetaSchema.index({ trainerId: 1, dificultad: 1 });
recetaSchema.index({ trainerId: 1, esFavorita: 1 });
recetaSchema.index({ trainerId: 1, esPublica: 1 });
recetaSchema.index({ esPublica: 1, isDeleted: 1 });

// Índice de texto completo para búsquedas
recetaSchema.index({
  nombre: 'text',
  descripcion: 'text',
  'ingredientes.nombre': 'text',
  etiquetas: 'text'
});

// Virtual para tiempo total
recetaSchema.virtual('tiempoTotal').get(function() {
  return this.tiempoPreparacion + this.tiempoCoccion;
});

// Virtual para calorías por porción
recetaSchema.virtual('caloriasPorPorcion').get(function() {
  if (!this.valoresNutricionales || !this.porciones || this.porciones === 0) return 0;
  return Math.round(this.valoresNutricionales.calorias / this.porciones);
});

// Métodos de instancia
recetaSchema.methods.incrementarUso = function() {
  this.contadorUsos += 1;
  return this.save();
};

recetaSchema.methods.actualizarVersion = function() {
  this.version += 1;
  return this.save();
};

recetaSchema.methods.toggleFavorita = function() {
  this.esFavorita = !this.esFavorita;
  return this.save();
};

recetaSchema.methods.actualizarRating = function(nuevoRating) {
  if (nuevoRating >= 0 && nuevoRating <= 5) {
    this.rating = nuevoRating;
    return this.save();
  }
  throw new Error('El rating debe estar entre 0 y 5');
};

// Métodos estáticos
recetaSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.tipoComida) {
    query.tipoComida = filters.tipoComida;
  }

  if (filters.dificultad) {
    query.dificultad = filters.dificultad;
  }

  if (filters.restricciones && filters.restricciones.length > 0) {
    query.restricciones = { $in: filters.restricciones };
  }

  if (filters.esFavorita !== undefined) {
    query.esFavorita = filters.esFavorita;
  }

  if (filters.esDestacada !== undefined) {
    query.esDestacada = filters.esDestacada;
  }

  if (filters.tiempoMaximo) {
    query.$expr = {
      $lte: [
        { $add: ['$tiempoPreparacion', '$tiempoCoccion'] },
        parseInt(filters.tiempoMaximo)
      ]
    };
  }

  if (filters.caloriasMax) {
    query['valoresNutricionales.calorias'] = { $lte: parseInt(filters.caloriasMax) };
  }

  if (filters.caloriasMin) {
    query['valoresNutricionales.calorias'] = {
      ...query['valoresNutricionales.calorias'],
      $gte: parseInt(filters.caloriasMin)
    };
  }

  return this.find(query);
};

recetaSchema.statics.findPublicas = function(filters = {}) {
  const query = { esPublica: true, isDeleted: false };

  if (filters.tipoComida) {
    query.tipoComida = filters.tipoComida;
  }

  if (filters.dificultad) {
    query.dificultad = filters.dificultad;
  }

  if (filters.restricciones && filters.restricciones.length > 0) {
    query.restricciones = { $in: filters.restricciones };
  }

  return this.find(query);
};

recetaSchema.statics.searchByTrainer = function(trainerId, searchText) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { nombre: { $regex: searchText, $options: 'i' } },
      { descripcion: { $regex: searchText, $options: 'i' } },
      { 'ingredientes.nombre': { $regex: searchText, $options: 'i' } },
      { etiquetas: { $regex: searchText, $options: 'i' } }
    ]
  });
};

recetaSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const favoritas = await this.countDocuments({ trainerId, esFavorita: true, isDeleted: false });
  const destacadas = await this.countDocuments({ trainerId, esDestacada: true, isDeleted: false });
  const publicas = await this.countDocuments({ trainerId, esPublica: true, isDeleted: false });

  // Por tipo de comida
  const porTipoComida = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$tipoComida', count: { $sum: 1 } } }
  ]);

  // Por dificultad
  const porDificultad = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$dificultad', count: { $sum: 1 } } }
  ]);

  // Recetas más usadas
  const masUsadas = await this.find({ trainerId, isDeleted: false })
    .sort({ contadorUsos: -1 })
    .limit(10)
    .select('nombre contadorUsos tipoComida');

  // Rating promedio
  const ratingStats = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false, rating: { $gt: 0 } } },
    { $group: { _id: null, avgRating: { $avg: '$rating' } } }
  ]);

  const ratingPromedio = ratingStats.length > 0 ? Math.round(ratingStats[0].avgRating * 10) / 10 : 0;

  return {
    total,
    favoritas,
    destacadas,
    publicas,
    porTipoComida,
    porDificultad,
    masUsadas,
    ratingPromedio
  };
};

// Middleware pre-save
recetaSchema.pre('save', function(next) {
  // Asegurar que las etiquetas no tengan duplicados
  this.etiquetas = [...new Set(this.etiquetas)];

  // Asegurar que las restricciones no tengan duplicados
  this.restricciones = [...new Set(this.restricciones)];

  // Ordenar pasos por orden
  if (this.pasos && this.pasos.length > 0) {
    this.pasos.sort((a, b) => a.orden - b.orden);
  }

  next();
});

const Receta = mongoose.model('Receta', recetaSchema);

export default Receta;
