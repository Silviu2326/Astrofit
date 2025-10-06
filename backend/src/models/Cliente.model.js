import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
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

  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Email inválido'
    }
  },

  telefono: {
    type: String,
    trim: true
  },

  foto: {
    type: String,
    default: ''
  },

  // Estado del cliente
  estado: {
    type: String,
    enum: ['activo', 'inactivo'],
    default: 'activo'
  },

  // Etiquetas para categorización
  etiquetas: [{
    type: String,
    trim: true
  }],

  // Fechas
  fechaAlta: {
    type: Date,
    default: Date.now
  },

  ultimaActividad: {
    type: Date,
    default: Date.now
  },

  // Información adicional
  notas: {
    type: String,
    default: ''
  },

  // Datos de contacto adicionales
  direccion: {
    calle: String,
    ciudad: String,
    codigoPostal: String,
    pais: String
  },

  // Información de facturación
  facturacion: {
    nombreFiscal: String,
    nif: String,
    direccionFiscal: String
  },

  // Preferencias
  preferencias: {
    idioma: {
      type: String,
      default: 'es'
    },
    notificaciones: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      push: {
        type: Boolean,
        default: true
      }
    }
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
clienteSchema.index({ trainerId: 1, email: 1 }, { unique: true });
clienteSchema.index({ trainerId: 1, estado: 1 });
clienteSchema.index({ trainerId: 1, etiquetas: 1 });
clienteSchema.index({ trainerId: 1, fechaAlta: 1 });
clienteSchema.index({ trainerId: 1, ultimaActividad: 1 });
clienteSchema.index({ trainerId: 1, isDeleted: 1 });

// Texto completo para búsquedas
clienteSchema.index({
  nombre: 'text',
  email: 'text',
  telefono: 'text'
});

// Virtual para días sin actividad
clienteSchema.virtual('diasSinActividad').get(function() {
  if (!this.ultimaActividad) {
    return 0;
  }
  const diff = Date.now() - this.ultimaActividad.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Métodos de instancia
clienteSchema.methods.actualizarActividad = function() {
  this.ultimaActividad = new Date();
  return this.save();
};

clienteSchema.methods.agregarEtiqueta = function(etiqueta) {
  if (!this.etiquetas.includes(etiqueta)) {
    this.etiquetas.push(etiqueta);
    return this.save();
  }
  return this;
};

clienteSchema.methods.eliminarEtiqueta = function(etiqueta) {
  this.etiquetas = this.etiquetas.filter(e => e !== etiqueta);
  return this.save();
};

clienteSchema.methods.cambiarEstado = function(nuevoEstado) {
  this.estado = nuevoEstado;
  this.ultimaActividad = new Date();
  return this.save();
};

// Métodos estáticos
clienteSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.etiquetas && filters.etiquetas.length > 0) {
    query.etiquetas = { $all: filters.etiquetas };
  }

  return this.find(query);
};

clienteSchema.statics.searchByTrainer = function(trainerId, searchText) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { nombre: { $regex: searchText, $options: 'i' } },
      { email: { $regex: searchText, $options: 'i' } },
      { telefono: { $regex: searchText, $options: 'i' } }
    ]
  });
};

clienteSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const activos = await this.countDocuments({ trainerId, estado: 'activo', isDeleted: false });
  const inactivos = await this.countDocuments({ trainerId, estado: 'inactivo', isDeleted: false });
  const premium = await this.countDocuments({ trainerId, etiquetas: 'premium', isDeleted: false });
  const online = await this.countDocuments({ trainerId, etiquetas: 'online', isDeleted: false });

  return {
    total,
    activos,
    inactivos,
    premium,
    online
  };
};

// Middleware pre-save
clienteSchema.pre('save', function(next) {
  // Asegurar que las etiquetas no tengan duplicados
  this.etiquetas = [...new Set(this.etiquetas)];
  next();
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
