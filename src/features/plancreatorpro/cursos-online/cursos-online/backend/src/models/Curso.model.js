const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    minlength: [5, 'El título debe tener al menos 5 caracteres'],
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  imagenPortada: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  estado: {
    type: String,
    enum: {
      values: ['borrador', 'activo', 'pausado', 'archivado'],
      message: 'El estado debe ser: borrador, activo, pausado o archivado'
    },
    default: 'borrador'
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    trim: true,
    minlength: [2, 'La categoría debe tener al menos 2 caracteres'],
    maxlength: [50, 'La categoría no puede exceder 50 caracteres']
  },
  duracion: {
    type: String,
    trim: true,
    maxlength: [100, 'La duración no puede exceder 100 caracteres']
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El instructor es requerido']
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices
cursoSchema.index({ instructorId: 1 });
cursoSchema.index({ estado: 1 });
cursoSchema.index({ categoria: 1 });
cursoSchema.index({ titulo: 'text', descripcion: 'text' });

// Virtual para módulos
cursoSchema.virtual('modulos', {
  ref: 'Modulo',
  localField: '_id',
  foreignField: 'cursoId'
});

// Middleware para actualizar fechaActualizacion
cursoSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

module.exports = mongoose.model('Curso', cursoSchema);
