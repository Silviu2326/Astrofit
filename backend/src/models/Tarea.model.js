import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  // Relación con el Trainer (asignador y responsable)
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido'],
    index: true
  },

  // Relación opcional con el Cliente
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    default: null,
    index: true
  },

  // Información básica de la tarea
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder los 200 caracteres']
  },

  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres']
  },

  // Fechas
  fechaVencimiento: {
    type: Date,
    required: [true, 'La fecha de vencimiento es obligatoria'],
    index: true
  },

  fechaCompletada: {
    type: Date,
    default: null
  },

  // Estado de la tarea
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completada', 'vencida'],
    default: 'pendiente',
    index: true
  },

  // Prioridad
  prioridad: {
    type: String,
    enum: ['alta', 'media', 'baja'],
    default: 'media',
    index: true
  },

  // Asignación (nombre o referencia al trainer asignado)
  asignadoA: {
    type: String,
    required: [true, 'Debe especificar a quién se asigna la tarea'],
    trim: true
  },

  // Nombre del cliente relacionado (opcional, para búsqueda rápida)
  clienteRelacionado: {
    type: String,
    trim: true,
    default: null
  },

  // Notas adicionales
  notasAdicionales: {
    type: String,
    trim: true,
    maxlength: [500, 'Las notas no pueden exceder los 500 caracteres']
  },

  // Etiquetas para categorización
  etiquetas: [{
    type: String,
    trim: true
  }],

  // Recordatorios
  recordatorios: [{
    fecha: Date,
    enviado: {
      type: Boolean,
      default: false
    }
  }],

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
tareaSchema.index({ trainerId: 1, estado: 1 });
tareaSchema.index({ trainerId: 1, prioridad: 1 });
tareaSchema.index({ trainerId: 1, fechaVencimiento: 1 });
tareaSchema.index({ trainerId: 1, clienteId: 1 });
tareaSchema.index({ trainerId: 1, isDeleted: 1 });
tareaSchema.index({ trainerId: 1, estado: 1, prioridad: 1 });

// Texto completo para búsquedas
tareaSchema.index({
  titulo: 'text',
  descripcion: 'text',
  asignadoA: 'text'
});

// Virtual para verificar si está vencida
tareaSchema.virtual('estaVencida').get(function() {
  if (this.estado === 'completada') return false;
  return this.fechaVencimiento < new Date();
});

// Virtual para días restantes
tareaSchema.virtual('diasRestantes').get(function() {
  const diff = this.fechaVencimiento.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Métodos de instancia
tareaSchema.methods.marcarCompletada = function() {
  this.estado = 'completada';
  this.fechaCompletada = new Date();
  return this.save();
};

tareaSchema.methods.marcarEnProgreso = function() {
  this.estado = 'en progreso';
  return this.save();
};

tareaSchema.methods.actualizarEstado = function(nuevoEstado) {
  this.estado = nuevoEstado;
  if (nuevoEstado === 'completada') {
    this.fechaCompletada = new Date();
  }
  return this.save();
};

tareaSchema.methods.agregarEtiqueta = function(etiqueta) {
  if (!this.etiquetas.includes(etiqueta)) {
    this.etiquetas.push(etiqueta);
    return this.save();
  }
  return this;
};

tareaSchema.methods.eliminarEtiqueta = function(etiqueta) {
  this.etiquetas = this.etiquetas.filter(e => e !== etiqueta);
  return this.save();
};

tareaSchema.methods.agregarRecordatorio = function(fecha) {
  this.recordatorios.push({ fecha, enviado: false });
  return this.save();
};

// Métodos estáticos
tareaSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.prioridad) {
    query.prioridad = filters.prioridad;
  }

  if (filters.clienteId) {
    query.clienteId = filters.clienteId;
  }

  if (filters.asignadoA) {
    query.asignadoA = { $regex: filters.asignadoA, $options: 'i' };
  }

  if (filters.fechaDesde) {
    query.fechaVencimiento = { $gte: new Date(filters.fechaDesde) };
  }

  if (filters.fechaHasta) {
    query.fechaVencimiento = query.fechaVencimiento || {};
    query.fechaVencimiento.$lte = new Date(filters.fechaHasta);
  }

  return this.find(query).sort({ fechaVencimiento: 1 });
};

tareaSchema.statics.searchByTrainer = function(trainerId, searchText) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { titulo: { $regex: searchText, $options: 'i' } },
      { descripcion: { $regex: searchText, $options: 'i' } },
      { asignadoA: { $regex: searchText, $options: 'i' } }
    ]
  });
};

tareaSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const pendientes = await this.countDocuments({ trainerId, estado: 'pendiente', isDeleted: false });
  const enProgreso = await this.countDocuments({ trainerId, estado: 'en progreso', isDeleted: false });
  const completadas = await this.countDocuments({ trainerId, estado: 'completada', isDeleted: false });
  const vencidas = await this.countDocuments({
    trainerId,
    estado: { $ne: 'completada' },
    fechaVencimiento: { $lt: new Date() },
    isDeleted: false
  });
  const urgentes = await this.countDocuments({
    trainerId,
    prioridad: 'alta',
    estado: { $ne: 'completada' },
    isDeleted: false
  });

  return {
    total,
    pendientes,
    enProgreso,
    completadas,
    vencidas,
    urgentes
  };
};

tareaSchema.statics.getTareasVencidas = function(trainerId) {
  return this.find({
    trainerId,
    estado: { $ne: 'completada' },
    fechaVencimiento: { $lt: new Date() },
    isDeleted: false
  }).sort({ fechaVencimiento: 1 });
};

tareaSchema.statics.getTareasProximas = function(trainerId, dias = 7) {
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() + dias);

  return this.find({
    trainerId,
    estado: { $ne: 'completada' },
    fechaVencimiento: { $gte: new Date(), $lte: fechaLimite },
    isDeleted: false
  }).sort({ fechaVencimiento: 1 });
};

// Middleware pre-save
tareaSchema.pre('save', function(next) {
  // Asegurar que las etiquetas no tengan duplicados
  this.etiquetas = [...new Set(this.etiquetas)];

  // Auto-actualizar estado a vencida si aplica
  if (this.estado !== 'completada' && this.fechaVencimiento < new Date()) {
    this.estado = 'vencida';
  }

  next();
});

// Middleware para actualizar clienteRelacionado cuando se vincula un cliente
tareaSchema.pre('save', async function(next) {
  if (this.isModified('clienteId') && this.clienteId) {
    try {
      const Cliente = mongoose.model('Cliente');
      const cliente = await Cliente.findById(this.clienteId);
      if (cliente) {
        this.clienteRelacionado = cliente.nombre;
      }
    } catch (error) {
      // Si falla, continuar sin bloquear
      console.error('Error al obtener nombre del cliente:', error);
    }
  }
  next();
});

const Tarea = mongoose.model('Tarea', tareaSchema);

export default Tarea;
