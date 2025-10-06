import mongoose from 'mongoose';

const sesionEntrenamientoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    default: '09:00'
  },
  duracion: {
    type: Number, // minutos
    default: 60
  },
  estado: {
    type: String,
    enum: ['pendiente', 'completado', 'cancelado', 'en-progreso'],
    default: 'pendiente'
  },
  ejercicios: [{
    ejercicioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ejercicio'
    },
    series: Number,
    repeticiones: String,
    peso: Number,
    descanso: Number, // segundos
    notas: String,
    completado: {
      type: Boolean,
      default: false
    },
    orden: Number
  }],
  notasEntrenador: {
    type: String,
    default: ''
  },
  notasCliente: {
    type: String,
    default: ''
  },
  valoracionCliente: {
    type: Number,
    min: 1,
    max: 5
  },
  sensacionEsfuerzo: {
    type: Number, // RPE 1-10
    min: 1,
    max: 10
  }
}, {
  timestamps: true
});

const entrenamientoSchema = new mongoose.Schema({
  // Relación con Trainer
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
    index: true
  },

  // Relación con Cliente
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
    index: true
  },

  // Información básica
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },

  descripcion: {
    type: String,
    trim: true,
    default: ''
  },

  // Tipo y objetivo
  tipo: {
    type: String,
    enum: [
      'Fuerza',
      'Hipertrofia',
      'Resistencia',
      'Pérdida de Peso',
      'CrossFit',
      'Funcional',
      'Powerlifting',
      'Calistenia',
      'HIIT',
      'Otro'
    ],
    required: true
  },

  objetivo: {
    type: String,
    enum: [
      'Ganar Masa',
      'Perder Grasa',
      'Mantener',
      'Rendimiento',
      'Salud General',
      'Rehabilitación',
      'Competición'
    ],
    required: true
  },

  // Nivel
  nivel: {
    type: String,
    enum: ['Principiante', 'Intermedio', 'Avanzado'],
    default: 'Intermedio'
  },

  // Estado del entrenamiento
  estado: {
    type: String,
    enum: ['activo', 'completado', 'pausado', 'borrador', 'cancelado'],
    default: 'borrador',
    index: true
  },

  // Fechas
  fechaInicio: {
    type: Date,
    required: true
  },

  fechaFin: {
    type: Date
  },

  // Planificación
  totalSemanas: {
    type: Number,
    required: true,
    min: 1,
    max: 52
  },

  semanaActual: {
    type: Number,
    default: 1,
    min: 1
  },

  diasPorSemana: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },

  // Sesiones
  sesiones: [sesionEntrenamientoSchema],

  // Si se creó desde una plantilla
  plantillaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlantillaEntrenamiento'
  },

  // Métricas
  progreso: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  adherencia: {
    type: Number, // Porcentaje de sesiones completadas vs programadas
    default: 0,
    min: 0,
    max: 100
  },

  sesionesCompletadas: {
    type: Number,
    default: 0
  },

  sesionesProgramadas: {
    type: Number,
    default: 0
  },

  // Flags
  tieneComentarios: {
    type: Boolean,
    default: false
  },

  requiereRevision: {
    type: Boolean,
    default: false
  },

  conSeguimiento: {
    type: Boolean,
    default: true
  },

  // Notas generales
  notasEntrenador: {
    type: String,
    default: ''
  },

  notasCliente: {
    type: String,
    default: ''
  },

  // Metadata
  ultimaActividad: {
    type: Date,
    default: Date.now
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices compuestos
entrenamientoSchema.index({ trainerId: 1, clienteId: 1 });
entrenamientoSchema.index({ trainerId: 1, estado: 1 });
entrenamientoSchema.index({ trainerId: 1, fechaInicio: -1 });
entrenamientoSchema.index({ trainerId: 1, isDeleted: 1 });
entrenamientoSchema.index({ clienteId: 1, estado: 1 });

// Virtual para próxima sesión
entrenamientoSchema.virtual('proximaSesion').get(function() {
  const now = new Date();
  const sesionPendiente = this.sesiones
    .filter(s => s.estado === 'pendiente' && new Date(s.fecha) >= now)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0];

  return sesionPendiente;
});

// Métodos de instancia
entrenamientoSchema.methods.calcularProgreso = function() {
  if (this.sesionesProgramadas === 0) return 0;
  this.progreso = Math.round((this.sesionesCompletadas / this.sesionesProgramadas) * 100);
  return this.progreso;
};

entrenamientoSchema.methods.calcularAdherencia = function() {
  const sesionesEsperadas = this.sesiones.filter(s => new Date(s.fecha) < new Date()).length;
  if (sesionesEsperadas === 0) return 0;
  const completadas = this.sesiones.filter(s => s.estado === 'completado').length;
  this.adherencia = Math.round((completadas / sesionesEsperadas) * 100);
  return this.adherencia;
};

entrenamientoSchema.methods.completarSesion = async function(sesionId, datos) {
  const sesion = this.sesiones.id(sesionId);
  if (!sesion) throw new Error('Sesión no encontrada');

  sesion.estado = 'completado';
  if (datos.notasCliente) sesion.notasCliente = datos.notasCliente;
  if (datos.valoracionCliente) sesion.valoracionCliente = datos.valoracionCliente;
  if (datos.sensacionEsfuerzo) sesion.sensacionEsfuerzo = datos.sensacionEsfuerzo;

  // Marcar ejercicios como completados
  if (datos.ejercicios) {
    datos.ejercicios.forEach(ej => {
      const ejercicio = sesion.ejercicios.id(ej.id);
      if (ejercicio) {
        ejercicio.completado = true;
        if (ej.peso) ejercicio.peso = ej.peso;
        if (ej.notas) ejercicio.notas = ej.notas;
      }
    });
  }

  this.sesionesCompletadas += 1;
  this.ultimaActividad = new Date();

  await this.save();
  return sesion;
};

entrenamientoSchema.methods.pausar = function() {
  this.estado = 'pausado';
  return this.save();
};

entrenamientoSchema.methods.reanudar = function() {
  this.estado = 'activo';
  return this.save();
};

entrenamientoSchema.methods.finalizar = function() {
  this.estado = 'completado';
  this.fechaFin = new Date();
  return this.save();
};

// Métodos estáticos
entrenamientoSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.estado) query.estado = filters.estado;
  if (filters.clienteId) query.clienteId = filters.clienteId;
  if (filters.tipo) query.tipo = filters.tipo;

  return this.find(query).populate('clienteId', 'nombre apellidos email avatar');
};

entrenamientoSchema.statics.findByCliente = function(clienteId, filters = {}) {
  const query = { clienteId, isDeleted: false };

  if (filters.estado) query.estado = filters.estado;

  return this.find(query).populate('trainerId', 'nombre apellidos');
};

entrenamientoSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const activos = await this.countDocuments({ trainerId, estado: 'activo', isDeleted: false });
  const completados = await this.countDocuments({ trainerId, estado: 'completado', isDeleted: false });
  const pausados = await this.countDocuments({ trainerId, estado: 'pausado', isDeleted: false });
  const borradores = await this.countDocuments({ trainerId, estado: 'borrador', isDeleted: false });

  // Entrenamientos por tipo
  const porTipo = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$tipo', count: { $sum: 1 } } }
  ]);

  // Adherencia promedio
  const adherenciaPromedio = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), estado: 'activo', isDeleted: false } },
    { $group: { _id: null, avgAdherencia: { $avg: '$adherencia' } } }
  ]);

  return {
    total,
    activos,
    completados,
    pausados,
    borradores,
    porTipo,
    adherenciaPromedio: adherenciaPromedio[0]?.avgAdherencia || 0
  };
};

// Middleware pre-save
entrenamientoSchema.pre('save', function(next) {
  // Actualizar última actividad
  this.ultimaActividad = new Date();

  // Calcular sesiones programadas
  this.sesionesProgramadas = this.sesiones.length;

  // Calcular métricas
  this.calcularProgreso();
  this.calcularAdherencia();

  next();
});

const Entrenamiento = mongoose.model('Entrenamiento', entrenamientoSchema);

export default Entrenamiento;
