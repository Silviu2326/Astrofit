import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
    index: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  telefono: {
    type: String,
    trim: true
  },
  foto: {
    type: String,
    default: ''
  },
  estado: {
    type: String,
    enum: ['nuevo', 'contactado', 'interesado', 'no-interesado', 'convertido', 'perdido'],
    default: 'nuevo'
  },
  prioridad: {
    type: String,
    enum: ['baja', 'media', 'alta'],
    default: 'media'
  },
  fuente: {
    type: String,
    enum: ['web', 'redes-sociales', 'referido', 'evento', 'publicidad', 'otro'],
    default: 'web'
  },
  etiquetas: [{
    type: String,
    trim: true
  }],
  interes: {
    type: String,
    trim: true // ej: "Entrenamiento personal", "Nutrición", etc.
  },
  presupuesto: {
    type: Number,
    min: 0
  },
  notas: {
    type: String,
    trim: true
  },
  fechaContacto: {
    type: Date
  },
  proximoSeguimiento: {
    type: Date
  },
  fechaConversion: {
    type: Date
  },
  clienteConvertidoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound unique index: un lead no puede tener el mismo email para el mismo trainer
leadSchema.index({ trainerId: 1, email: 1 }, { unique: true });

// Text search index para búsquedas
leadSchema.index({ nombre: 'text', email: 'text', telefono: 'text' });

// Virtual: días desde el último contacto
leadSchema.virtual('diasSinContacto').get(function() {
  if (!this.fechaContacto) return null;
  const hoy = new Date();
  const diffTime = Math.abs(hoy - this.fechaContacto);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Instance methods
leadSchema.methods.actualizarContacto = function() {
  this.fechaContacto = new Date();
  return this.save();
};

leadSchema.methods.agregarEtiqueta = function(etiqueta) {
  if (!this.etiquetas.includes(etiqueta)) {
    this.etiquetas.push(etiqueta);
    return this.save();
  }
  return this;
};

leadSchema.methods.eliminarEtiqueta = function(etiqueta) {
  this.etiquetas = this.etiquetas.filter(e => e !== etiqueta);
  return this.save();
};

leadSchema.methods.cambiarEstado = function(nuevoEstado) {
  this.estado = nuevoEstado;
  if (nuevoEstado === 'convertido' && !this.fechaConversion) {
    this.fechaConversion = new Date();
  }
  return this.save();
};

leadSchema.methods.convertirACliente = function(clienteId) {
  this.estado = 'convertido';
  this.fechaConversion = new Date();
  this.clienteConvertidoId = clienteId;
  return this.save();
};

// Static methods
leadSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false, ...filters };
  return this.find(query);
};

leadSchema.statics.searchByTrainer = function(trainerId, searchTerm) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { nombre: { $regex: searchTerm, $options: 'i' } },
      { email: { $regex: searchTerm, $options: 'i' } },
      { telefono: { $regex: searchTerm, $options: 'i' } }
    ]
  });
};

leadSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const nuevos = await this.countDocuments({ trainerId, estado: 'nuevo', isDeleted: false });
  const contactados = await this.countDocuments({ trainerId, estado: 'contactado', isDeleted: false });
  const interesados = await this.countDocuments({ trainerId, estado: 'interesado', isDeleted: false });
  const convertidos = await this.countDocuments({ trainerId, estado: 'convertido', isDeleted: false });
  const perdidos = await this.countDocuments({ trainerId, estado: 'perdido', isDeleted: false });
  const altaPrioridad = await this.countDocuments({ trainerId, prioridad: 'alta', isDeleted: false });

  return {
    total,
    nuevos,
    contactados,
    interesados,
    convertidos,
    perdidos,
    altaPrioridad,
    tasaConversion: total > 0 ? ((convertidos / total) * 100).toFixed(2) : 0
  };
};

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
