import mongoose from 'mongoose';

const seguimientoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  peso: {
    type: Number,
    min: 0
  },
  calorias_consumidas: {
    type: Number,
    min: 0,
    default: 0
  },
  macros_consumidos: {
    proteinas: { type: Number, min: 0, default: 0 },
    carbohidratos: { type: Number, min: 0, default: 0 },
    grasas: { type: Number, min: 0, default: 0 }
  },
  adherencia_dia: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  notas: {
    type: String,
    trim: true,
    default: ''
  }
}, { _id: true, timestamps: true });

const dietaSchema = new mongoose.Schema({
  // Relación con el Trainer
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
    index: true
  },

  // Relación con el Cliente
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
    index: true
  },

  // Relación con la Plantilla de Dieta (opcional)
  plantillaDietaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlantillaDieta',
    default: null
  },

  // Información básica
  nombre: {
    type: String,
    required: [true, 'El nombre del plan es obligatorio'],
    trim: true
  },

  descripcion: {
    type: String,
    trim: true,
    default: ''
  },

  // Objetivo de la dieta
  objetivo: {
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
  tipoDieta: {
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
      'alta_proteina',
      'dash',
      'cetogenica',
      'sin_gluten',
      'antiinflamatoria',
      'deportiva',
      'hipercalorica'
    ],
    required: true
  },

  // Fechas
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria']
  },

  fechaFin: {
    type: Date
  },

  duracion: {
    type: Number, // en días
    required: true,
    min: 1
  },

  // Estado
  estado: {
    type: String,
    enum: ['activo', 'pausado', 'completado', 'en pausa', 'cancelado'],
    default: 'activo'
  },

  // Calorías objetivo diarias
  calorias_objetivo: {
    type: Number,
    min: 800,
    max: 5000,
    required: true
  },

  // Macros objetivo diarios
  macros_objetivo: {
    proteinas: { type: Number, min: 0, required: true },
    carbohidratos: { type: Number, min: 0, required: true },
    grasas: { type: Number, min: 0, required: true }
  },

  // Restricciones alimentarias
  restricciones: [{
    type: String,
    trim: true
  }],

  // Alérgenos a evitar
  alergenos: [{
    type: String,
    trim: true
  }],

  // Peso inicial del cliente
  peso_inicial: {
    type: Number,
    min: 0
  },

  // Peso actual del cliente
  peso_actual: {
    type: Number,
    min: 0
  },

  // Peso objetivo
  peso_objetivo: {
    type: Number,
    min: 0
  },

  // Adherencia general (porcentaje)
  adherencia: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },

  // Progreso (porcentaje de días completados)
  progreso: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },

  // Nutricionista asignado (puede ser el mismo trainer u otro)
  nutricionista: {
    nombre: String,
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainer'
    }
  },

  // Seguimiento diario
  seguimientos: [seguimientoSchema],

  // Notas adicionales del trainer
  notas: {
    type: String,
    trim: true,
    default: ''
  },

  // Última actualización registrada
  ultimaActualizacion: {
    type: Date,
    default: Date.now
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
dietaSchema.index({ trainerId: 1, clienteId: 1 });
dietaSchema.index({ trainerId: 1, estado: 1 });
dietaSchema.index({ trainerId: 1, objetivo: 1 });
dietaSchema.index({ trainerId: 1, tipoDieta: 1 });
dietaSchema.index({ trainerId: 1, fechaInicio: 1 });
dietaSchema.index({ trainerId: 1, isDeleted: 1 });
dietaSchema.index({ clienteId: 1, estado: 1, isDeleted: 1 });
dietaSchema.index({ plantillaDietaId: 1 });

// Texto completo para búsquedas
dietaSchema.index({
  nombre: 'text',
  descripcion: 'text',
  'nutricionista.nombre': 'text'
});

// Virtual para calcular días transcurridos
dietaSchema.virtual('diasTranscurridos').get(function() {
  if (!this.fechaInicio) return 0;
  const diff = Date.now() - this.fechaInicio.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Virtual para calcular días restantes
dietaSchema.virtual('diasRestantes').get(function() {
  if (!this.fechaInicio || !this.duracion) return 0;
  const diasTranscurridos = this.diasTranscurridos;
  const restantes = this.duracion - diasTranscurridos;
  return Math.max(0, restantes);
});

// Virtual para calcular el progreso de peso
dietaSchema.virtual('progresoPerso').get(function() {
  if (!this.peso_inicial || !this.peso_objetivo || !this.peso_actual) return 0;

  const pesoTotal = Math.abs(this.peso_objetivo - this.peso_inicial);
  const pesoAvanzado = Math.abs(this.peso_actual - this.peso_inicial);

  if (pesoTotal === 0) return 0;

  return Math.min(100, Math.round((pesoAvanzado / pesoTotal) * 100));
});

// Métodos de instancia
dietaSchema.methods.actualizarProgreso = function() {
  if (!this.duracion) return this;

  const diasTranscurridos = this.diasTranscurridos;
  this.progreso = Math.min(100, Math.round((diasTranscurridos / this.duracion) * 100));
  this.ultimaActualizacion = new Date();

  return this.save();
};

dietaSchema.methods.actualizarAdherencia = function() {
  if (!this.seguimientos || this.seguimientos.length === 0) {
    this.adherencia = 0;
    return this.save();
  }

  const totalAdherencia = this.seguimientos.reduce((sum, seg) => sum + (seg.adherencia_dia || 0), 0);
  this.adherencia = Math.round(totalAdherencia / this.seguimientos.length);
  this.ultimaActualizacion = new Date();

  return this.save();
};

dietaSchema.methods.agregarSeguimiento = function(seguimientoData) {
  this.seguimientos.push(seguimientoData);

  // Actualizar peso actual si se proporciona
  if (seguimientoData.peso) {
    this.peso_actual = seguimientoData.peso;
  }

  this.ultimaActualizacion = new Date();

  return this.save();
};

dietaSchema.methods.cambiarEstado = function(nuevoEstado) {
  this.estado = nuevoEstado;
  this.ultimaActualizacion = new Date();

  // Si se completa, marcar progreso al 100%
  if (nuevoEstado === 'completado') {
    this.progreso = 100;
  }

  return this.save();
};

dietaSchema.methods.actualizarPeso = function(nuevoPeso) {
  this.peso_actual = nuevoPeso;
  this.ultimaActualizacion = new Date();

  return this.save();
};

// Métodos estáticos
dietaSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.objetivo) {
    query.objetivo = filters.objetivo;
  }

  if (filters.tipoDieta) {
    query.tipoDieta = filters.tipoDieta;
  }

  if (filters.clienteId) {
    query.clienteId = filters.clienteId;
  }

  if (filters.nutricionista) {
    query['nutricionista.nombre'] = { $regex: filters.nutricionista, $options: 'i' };
  }

  if (filters.fechaInicio) {
    query.fechaInicio = { $gte: new Date(filters.fechaInicio) };
  }

  return this.find(query);
};

dietaSchema.statics.findByCliente = function(clienteId, filters = {}) {
  const query = { clienteId, isDeleted: false };

  if (filters.estado) {
    query.estado = filters.estado;
  }

  return this.find(query);
};

dietaSchema.statics.searchByTrainer = function(trainerId, searchText) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { nombre: { $regex: searchText, $options: 'i' } },
      { descripcion: { $regex: searchText, $options: 'i' } },
      { 'nutricionista.nombre': { $regex: searchText, $options: 'i' } }
    ]
  });
};

dietaSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const activas = await this.countDocuments({ trainerId, estado: 'activo', isDeleted: false });
  const pausadas = await this.countDocuments({ trainerId, estado: { $in: ['pausado', 'en pausa'] }, isDeleted: false });
  const completadas = await this.countDocuments({ trainerId, estado: 'completado', isDeleted: false });

  // Adherencia promedio
  const dietasConAdherencia = await this.find({ trainerId, isDeleted: false, estado: { $in: ['activo', 'pausado', 'en pausa'] } });
  const adherenciaTotal = dietasConAdherencia.reduce((sum, dieta) => sum + (dieta.adherencia || 0), 0);
  const adherenciaPromedio = dietasConAdherencia.length > 0 ? Math.round(adherenciaTotal / dietasConAdherencia.length) : 0;

  // Dietas por objetivo
  const porObjetivo = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$objetivo', count: { $sum: 1 } } }
  ]);

  // Dietas por tipo
  const porTipoDieta = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$tipoDieta', count: { $sum: 1 } } }
  ]);

  return {
    total,
    activas,
    pausadas,
    completadas,
    adherenciaPromedio,
    porObjetivo,
    porTipoDieta
  };
};

// Middleware pre-save
dietaSchema.pre('save', function(next) {
  // Asegurar que las restricciones no tengan duplicados
  this.restricciones = [...new Set(this.restricciones)];

  // Asegurar que los alérgenos no tengan duplicados
  this.alergenos = [...new Set(this.alergenos)];

  // Calcular fecha de fin si no está definida
  if (!this.fechaFin && this.fechaInicio && this.duracion) {
    const fechaFin = new Date(this.fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + this.duracion);
    this.fechaFin = fechaFin;
  }

  next();
});

const Dieta = mongoose.model('Dieta', dietaSchema);

export default Dieta;
