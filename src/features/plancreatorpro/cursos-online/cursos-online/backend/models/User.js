const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    minlength: [2, 'El apellido debe tener al menos 2 caracteres'],
    maxlength: [50, 'El apellido no puede exceder 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Por favor ingresa un email válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false // No incluir en consultas por defecto
  },
  telefono: {
    type: String,
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Por favor ingresa un número de teléfono válido'
    ]
  },
  fechaNacimiento: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value < new Date();
      },
      message: 'La fecha de nacimiento debe ser anterior a hoy'
    }
  },
  rol: {
    type: String,
    enum: {
      values: ['estudiante', 'instructor', 'admin'],
      message: 'El rol debe ser: estudiante, instructor o admin'
    },
    default: 'estudiante'
  },
  estado: {
    type: String,
    enum: {
      values: ['activo', 'inactivo', 'suspendido'],
      message: 'El estado debe ser: activo, inactivo o suspendido'
    },
    default: 'activo'
  },
  avatar: {
    type: String,
    default: null
  },
  direccion: {
    calle: {
      type: String,
      trim: true
    },
    ciudad: {
      type: String,
      trim: true
    },
    codigoPostal: {
      type: String,
      trim: true
    },
    pais: {
      type: String,
      trim: true,
      default: 'España'
    }
  },
  preferencias: {
    idioma: {
      type: String,
      default: 'es',
      enum: ['es', 'en', 'fr', 'de']
    },
    notificaciones: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  },
  ultimoAcceso: {
    type: Date,
    default: Date.now
  },
  intentosLogin: {
    type: Number,
    default: 0,
    min: 0
  },
  bloqueadoHasta: {
    type: Date,
    default: null
  }
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para optimizar consultas
userSchema.index({ email: 1 });
userSchema.index({ rol: 1 });
userSchema.index({ estado: 1 });
userSchema.index({ createdAt: -1 });

// Virtual para nombre completo
userSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

// Virtual para edad (calculada desde fechaNacimiento)
userSchema.virtual('edad').get(function() {
  if (!this.fechaNacimiento) return null;
  const hoy = new Date();
  const nacimiento = new Date(this.fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
});

// Middleware pre-save para encriptar contraseña
userSchema.pre('save', async function(next) {
  // Solo encriptar si la contraseña fue modificada
  if (!this.isModified('password')) return next();
  
  try {
    // Encriptar contraseña con salt de 12 rondas
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware pre-save para actualizar ultimoAcceso
userSchema.pre('save', function(next) {
  if (this.isModified('ultimoAcceso')) {
    this.ultimoAcceso = new Date();
  }
  next();
});

// Método para verificar contraseña
userSchema.methods.verificarPassword = async function(passwordCandidata) {
  return await bcrypt.compare(passwordCandidata, this.password);
};

// Método para verificar si la cuenta está bloqueada
userSchema.methods.estaBloqueada = function() {
  return this.bloqueadoHasta && this.bloqueadoHasta > Date.now();
};

// Método para incrementar intentos de login
userSchema.methods.incrementarIntentosLogin = function() {
  this.intentosLogin += 1;
  if (this.intentosLogin >= 5) {
    this.bloqueadoHasta = new Date(Date.now() + 2 * 60 * 60 * 1000); // Bloquear por 2 horas
  }
  return this.save();
};

// Método para resetear intentos de login
userSchema.methods.resetearIntentosLogin = function() {
  this.intentosLogin = 0;
  this.bloqueadoHasta = null;
  return this.save();
};

// Método para obtener datos públicos del usuario
userSchema.methods.obtenerDatosPublicos = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.intentosLogin;
  delete userObject.bloqueadoHasta;
  return userObject;
};

// Método estático para buscar usuarios por criterios
userSchema.statics.buscarUsuarios = function(criterios = {}) {
  const {
    nombre,
    email,
    rol,
    estado,
    fechaDesde,
    fechaHasta,
    pagina = 1,
    limite = 10,
    ordenar = '-createdAt'
  } = criterios;

  const query = {};

  if (nombre) {
    query.$or = [
      { nombre: { $regex: nombre, $options: 'i' } },
      { apellido: { $regex: nombre, $options: 'i' } }
    ];
  }

  if (email) {
    query.email = { $regex: email, $options: 'i' };
  }

  if (rol) {
    query.rol = rol;
  }

  if (estado) {
    query.estado = estado;
  }

  if (fechaDesde || fechaHasta) {
    query.createdAt = {};
    if (fechaDesde) query.createdAt.$gte = new Date(fechaDesde);
    if (fechaHasta) query.createdAt.$lte = new Date(fechaHasta);
  }

  const skip = (pagina - 1) * limite;

  return this.find(query)
    .select('-password -intentosLogin -bloqueadoHasta')
    .sort(ordenar)
    .skip(skip)
    .limit(parseInt(limite));
};

module.exports = mongoose.model('User', userSchema);
