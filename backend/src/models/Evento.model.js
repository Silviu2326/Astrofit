import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  // Relación con el Trainer
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido'],
    index: true
  },

  // Información del evento
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder los 200 caracteres']
  },

  descripcion: {
    type: String,
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres']
  },

  // Fechas y horarios
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria'],
    index: true
  },

  fechaFin: {
    type: Date,
    required: [true, 'La fecha de fin es obligatoria'],
    validate: {
      validator: function(value) {
        return value >= this.fechaInicio;
      },
      message: 'La fecha de fin debe ser posterior a la fecha de inicio'
    }
  },

  // Tipo de evento
  tipo: {
    type: String,
    enum: ['cita', 'clase', 'reunion', 'evento', 'otro'],
    default: 'evento',
    index: true
  },

  // Ubicación
  ubicacion: {
    type: String,
    trim: true,
    maxlength: [200, 'La ubicación no puede exceder los 200 caracteres']
  },

  // Participantes (referencias a otros usuarios/clientes)
  participantes: [{
    type: String,
    trim: true
  }],

  // Cliente relacionado (opcional)
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    index: true
  },

  // Color para el calendario
  color: {
    type: String,
    default: '#3b82f6', // Blue
    match: /^#[0-9A-F]{6}$/i
  },

  // Configuración de recordatorio
  recordatorio: {
    type: Boolean,
    default: false
  },

  minutosAntes: {
    type: Number,
    default: 15,
    enum: [5, 15, 30, 60, 1440] // 5min, 15min, 30min, 1h, 1 día
  },

  // Estado del evento
  completado: {
    type: Boolean,
    default: false
  },

  cancelado: {
    type: Boolean,
    default: false
  },

  // Soft delete
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
eventoSchema.index({ trainer: 1, fechaInicio: 1 });
eventoSchema.index({ trainer: 1, tipo: 1 });
eventoSchema.index({ trainer: 1, cliente: 1 });

// Virtual para duración en minutos
eventoSchema.virtual('duracionMinutos').get(function() {
  const diff = this.fechaFin - this.fechaInicio;
  return Math.floor(diff / (1000 * 60));
});

// Métodos de instancia
eventoSchema.methods.marcarCompletado = function() {
  this.completado = true;
  return this.save();
};

eventoSchema.methods.cancelar = function() {
  this.cancelado = true;
  return this.save();
};

// Métodos estáticos
eventoSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = {
    trainer: trainerId,
    isDeleted: false,
    ...filters
  };
  return this.find(query).sort({ fechaInicio: 1 });
};

eventoSchema.statics.findByFechaRange = function(trainerId, fechaInicio, fechaFin) {
  return this.find({
    trainer: trainerId,
    isDeleted: false,
    fechaInicio: { $gte: fechaInicio },
    fechaFin: { $lte: fechaFin }
  }).sort({ fechaInicio: 1 });
};

eventoSchema.statics.findByCliente = function(trainerId, clienteId) {
  return this.find({
    trainer: trainerId,
    cliente: clienteId,
    isDeleted: false
  }).sort({ fechaInicio: -1 });
};

eventoSchema.statics.findProximos = function(trainerId, limit = 10) {
  return this.find({
    trainer: trainerId,
    isDeleted: false,
    completado: false,
    cancelado: false,
    fechaInicio: { $gte: new Date() }
  })
  .sort({ fechaInicio: 1 })
  .limit(limit);
};

eventoSchema.statics.getEventosDelDia = function(trainerId, fecha) {
  const startOfDay = new Date(fecha);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(fecha);
  endOfDay.setHours(23, 59, 59, 999);

  return this.find({
    trainer: trainerId,
    isDeleted: false,
    fechaInicio: { $gte: startOfDay, $lte: endOfDay }
  }).sort({ fechaInicio: 1 });
};

const Evento = mongoose.model('Evento', eventoSchema);

export default Evento;
