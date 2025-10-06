import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email inválido'
    ]
  },
  telefono: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'prueba', 'pausado'],
    default: 'activo'
  },
  plan: {
    type: String,
    enum: ['Básico', 'Premium', 'Elite', 'Personalizado'],
    default: 'Básico'
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  fechaNacimiento: {
    type: Date
  },
  direccion: {
    calle: String,
    ciudad: String,
    codigoPostal: String,
    pais: { type: String, default: 'España' }
  },
  objetivos: [String],
  notas: {
    type: String,
    maxlength: 1000
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para búsqueda
clientSchema.index({ nombre: 'text', email: 'text' });

export default mongoose.model('Client', clientSchema);
