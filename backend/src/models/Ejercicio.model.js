import mongoose from 'mongoose';

const ejercicioSchema = new mongoose.Schema({
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
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },

  descripcion: {
    type: String,
    trim: true,
    default: ''
  },

  // Categoría del ejercicio
  categoria: {
    type: String,
    enum: [
      'fuerza',
      'cardio',
      'flexibilidad',
      'equilibrio',
      'funcional',
      'deportivo',
      'otro'
    ],
    default: 'fuerza'
  },

  // Grupo muscular principal
  grupoMuscular: {
    type: String,
    enum: [
      'pecho',
      'espalda',
      'hombros',
      'brazos',
      'piernas',
      'core',
      'gluteos',
      'pantorrillas',
      'todo-cuerpo',
      'otro'
    ],
    required: true
  },

  // Grupos musculares secundarios
  gruposSecundarios: [{
    type: String,
    enum: [
      'pecho',
      'espalda',
      'hombros',
      'brazos',
      'piernas',
      'core',
      'gluteos',
      'pantorrillas',
      'otro'
    ]
  }],

  // Nivel de dificultad
  nivel: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado'],
    default: 'intermedio'
  },

  // Equipo necesario
  equipamiento: [{
    type: String,
    trim: true
  }],

  // Instrucciones paso a paso
  instrucciones: [{
    orden: Number,
    descripcion: String
  }],

  // Multimedia
  video: {
    type: String,
    default: ''
  },

  imagenes: [{
    type: String
  }],

  // Consejos y precauciones
  consejos: {
    type: String,
    default: ''
  },

  precauciones: {
    type: String,
    default: ''
  },

  // Variaciones del ejercicio
  variaciones: [{
    nombre: String,
    descripcion: String
  }],

  // Músculos trabajados (detallado)
  musculosPrincipales: [{
    type: String,
    trim: true
  }],

  musculosSecundarios: [{
    type: String,
    trim: true
  }],

  // Etiquetas para búsqueda y categorización
  etiquetas: [{
    type: String,
    trim: true
  }],

  // Estado del ejercicio
  estado: {
    type: String,
    enum: ['activo', 'borrador', 'archivado'],
    default: 'activo'
  },

  // Tipo de ejercicio
  tipo: {
    type: String,
    enum: ['compuesto', 'aislamiento', 'cardio', 'estatico'],
    default: 'compuesto'
  },

  // Métricas de popularidad
  vecesUtilizado: {
    type: Number,
    default: 0
  },

  ultimoUso: {
    type: Date,
    default: null
  },

  // Indicador de si es un ejercicio predeterminado del sistema
  esPredeterminado: {
    type: Boolean,
    default: false
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
ejercicioSchema.index({ trainerId: 1, nombre: 1 });
ejercicioSchema.index({ trainerId: 1, categoria: 1 });
ejercicioSchema.index({ trainerId: 1, grupoMuscular: 1 });
ejercicioSchema.index({ trainerId: 1, nivel: 1 });
ejercicioSchema.index({ trainerId: 1, estado: 1 });
ejercicioSchema.index({ trainerId: 1, etiquetas: 1 });
ejercicioSchema.index({ trainerId: 1, isDeleted: 1 });
ejercicioSchema.index({ trainerId: 1, vecesUtilizado: -1 });

// Texto completo para búsquedas
ejercicioSchema.index({
  nombre: 'text',
  descripcion: 'text',
  etiquetas: 'text'
});

// Métodos de instancia
ejercicioSchema.methods.incrementarUso = function() {
  this.vecesUtilizado += 1;
  this.ultimoUso = new Date();
  return this.save();
};

ejercicioSchema.methods.agregarEtiqueta = function(etiqueta) {
  if (!this.etiquetas.includes(etiqueta)) {
    this.etiquetas.push(etiqueta);
    return this.save();
  }
  return this;
};

ejercicioSchema.methods.eliminarEtiqueta = function(etiqueta) {
  this.etiquetas = this.etiquetas.filter(e => e !== etiqueta);
  return this.save();
};

ejercicioSchema.methods.cambiarEstado = function(nuevoEstado) {
  this.estado = nuevoEstado;
  return this.save();
};

// Métodos estáticos
ejercicioSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.categoria) {
    query.categoria = filters.categoria;
  }

  if (filters.grupoMuscular) {
    query.grupoMuscular = filters.grupoMuscular;
  }

  if (filters.nivel) {
    query.nivel = filters.nivel;
  }

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.etiquetas && filters.etiquetas.length > 0) {
    query.etiquetas = { $all: filters.etiquetas };
  }

  if (filters.equipamiento && filters.equipamiento.length > 0) {
    query.equipamiento = { $all: filters.equipamiento };
  }

  return this.find(query);
};

ejercicioSchema.statics.searchByTrainer = function(trainerId, searchText) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { nombre: { $regex: searchText, $options: 'i' } },
      { descripcion: { $regex: searchText, $options: 'i' } },
      { etiquetas: { $regex: searchText, $options: 'i' } }
    ]
  });
};

ejercicioSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const activos = await this.countDocuments({ trainerId, estado: 'activo', isDeleted: false });
  const borradores = await this.countDocuments({ trainerId, estado: 'borrador', isDeleted: false });
  const archivados = await this.countDocuments({ trainerId, estado: 'archivado', isDeleted: false });

  // Ejercicios por categoría
  const porCategoria = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$categoria', count: { $sum: 1 } } }
  ]);

  // Ejercicios por grupo muscular
  const porGrupoMuscular = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$grupoMuscular', count: { $sum: 1 } } }
  ]);

  // Ejercicios más usados
  const masUsados = await this.find({ trainerId, isDeleted: false })
    .sort({ vecesUtilizado: -1 })
    .limit(10)
    .select('nombre vecesUtilizado ultimoUso');

  return {
    total,
    activos,
    borradores,
    archivados,
    porCategoria,
    porGrupoMuscular,
    masUsados
  };
};

// Middleware pre-save
ejercicioSchema.pre('save', function(next) {
  // Asegurar que las etiquetas no tengan duplicados
  this.etiquetas = [...new Set(this.etiquetas)];

  // Asegurar que el equipamiento no tenga duplicados
  this.equipamiento = [...new Set(this.equipamiento)];

  // Asegurar que los grupos secundarios no tengan duplicados
  this.gruposSecundarios = [...new Set(this.gruposSecundarios)];

  next();
});

const Ejercicio = mongoose.model('Ejercicio', ejercicioSchema);

export default Ejercicio;
