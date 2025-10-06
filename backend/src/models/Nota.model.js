import mongoose from 'mongoose';

const notaSchema = new mongoose.Schema({
  // Relación obligatoria con Trainer
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido'],
    index: true
  },

  // Contenido de la nota
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [200, 'El título no puede exceder los 200 caracteres']
  },

  contenido: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    trim: true,
    maxlength: [5000, 'El contenido no puede exceder los 5000 caracteres']
  },

  // Relaciones opcionales
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    index: true
  },

  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    index: true
  },

  tarea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tarea',
    index: true
  },

  evento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    index: true
  },

  // Categorización
  categoria: {
    type: String,
    enum: ['general', 'seguimiento', 'observacion', 'recordatorio', 'importante', 'otro'],
    default: 'general',
    index: true
  },

  // Etiquetas para organización
  etiquetas: [{
    type: String,
    trim: true,
    lowercase: true
  }],

  // Color para identificación visual
  color: {
    type: String,
    default: '#f59e0b', // Amber
    match: /^#[0-9A-F]{6}$/i
  },

  // Estado de la nota
  fijada: {
    type: Boolean,
    default: false,
    index: true
  },

  archivada: {
    type: Boolean,
    default: false,
    index: true
  },

  // Recordatorio
  recordatorio: {
    activo: {
      type: Boolean,
      default: false
    },
    fecha: {
      type: Date
    }
  },

  // Archivos adjuntos (referencias a URLs o paths)
  adjuntos: [{
    nombre: String,
    url: String,
    tipo: String, // 'imagen', 'documento', 'audio', etc.
    tamaño: Number // en bytes
  }],

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

// Índices compuestos para búsquedas eficientes
notaSchema.index({ trainer: 1, createdAt: -1 });
notaSchema.index({ trainer: 1, cliente: 1 });
notaSchema.index({ trainer: 1, lead: 1 });
notaSchema.index({ trainer: 1, tarea: 1 });
notaSchema.index({ trainer: 1, evento: 1 });
notaSchema.index({ trainer: 1, categoria: 1 });
notaSchema.index({ trainer: 1, fijada: 1 });
notaSchema.index({ trainer: 1, archivada: 1 });

// Índice de texto para búsqueda
notaSchema.index({ titulo: 'text', contenido: 'text', etiquetas: 'text' });

// Virtual para tipo de relación
notaSchema.virtual('tipoRelacion').get(function() {
  if (this.cliente) return 'cliente';
  if (this.lead) return 'lead';
  if (this.tarea) return 'tarea';
  if (this.evento) return 'evento';
  return 'sin_relacion';
});

// Métodos de instancia
notaSchema.methods.fijar = function() {
  this.fijada = true;
  return this.save();
};

notaSchema.methods.desfijar = function() {
  this.fijada = false;
  return this.save();
};

notaSchema.methods.archivar = function() {
  this.archivada = true;
  return this.save();
};

notaSchema.methods.desarchivar = function() {
  this.archivada = false;
  return this.save();
};

notaSchema.methods.agregarEtiqueta = function(etiqueta) {
  if (!this.etiquetas.includes(etiqueta.toLowerCase())) {
    this.etiquetas.push(etiqueta.toLowerCase());
    return this.save();
  }
  return this;
};

notaSchema.methods.eliminarEtiqueta = function(etiqueta) {
  this.etiquetas = this.etiquetas.filter(e => e !== etiqueta.toLowerCase());
  return this.save();
};

// Métodos estáticos
notaSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = {
    trainer: trainerId,
    isDeleted: false,
    archivada: false,
    ...filters
  };
  return this.find(query).sort({ fijada: -1, createdAt: -1 });
};

notaSchema.statics.findFijadas = function(trainerId) {
  return this.find({
    trainer: trainerId,
    isDeleted: false,
    fijada: true,
    archivada: false
  }).sort({ createdAt: -1 });
};

notaSchema.statics.findArchivadas = function(trainerId) {
  return this.find({
    trainer: trainerId,
    isDeleted: false,
    archivada: true
  }).sort({ createdAt: -1 });
};

notaSchema.statics.findByCliente = function(trainerId, clienteId) {
  return this.find({
    trainer: trainerId,
    cliente: clienteId,
    isDeleted: false
  }).sort({ fijada: -1, createdAt: -1 });
};

notaSchema.statics.findByLead = function(trainerId, leadId) {
  return this.find({
    trainer: trainerId,
    lead: leadId,
    isDeleted: false
  }).sort({ fijada: -1, createdAt: -1 });
};

notaSchema.statics.findByTarea = function(trainerId, tareaId) {
  return this.find({
    trainer: trainerId,
    tarea: tareaId,
    isDeleted: false
  }).sort({ createdAt: -1 });
};

notaSchema.statics.findByEvento = function(trainerId, eventoId) {
  return this.find({
    trainer: trainerId,
    evento: eventoId,
    isDeleted: false
  }).sort({ createdAt: -1 });
};

notaSchema.statics.findByCategoria = function(trainerId, categoria) {
  return this.find({
    trainer: trainerId,
    categoria: categoria,
    isDeleted: false,
    archivada: false
  }).sort({ fijada: -1, createdAt: -1 });
};

notaSchema.statics.findByEtiqueta = function(trainerId, etiqueta) {
  return this.find({
    trainer: trainerId,
    etiquetas: etiqueta.toLowerCase(),
    isDeleted: false,
    archivada: false
  }).sort({ fijada: -1, createdAt: -1 });
};

notaSchema.statics.buscar = function(trainerId, searchTerm) {
  return this.find({
    trainer: trainerId,
    isDeleted: false,
    $text: { $search: searchTerm }
  }, {
    score: { $meta: 'textScore' }
  }).sort({ score: { $meta: 'textScore' } });
};

const Nota = mongoose.model('Nota', notaSchema);

export default Nota;
