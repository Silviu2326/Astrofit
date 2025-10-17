const mongoose = require('mongoose');

const leccionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    minlength: [3, 'El título debe tener al menos 3 caracteres'],
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo es requerido'],
    enum: {
      values: ['video', 'texto', 'quiz', 'archivo'],
      message: 'El tipo debe ser: video, texto, quiz o archivo'
    }
  },
  contenido: {
    type: String,
    trim: true,
    maxlength: [10000, 'El contenido no puede exceder 10000 caracteres']
  },
  duracion: {
    type: Number,
    min: [1, 'La duración debe ser mayor a 0']
  },
  orden: {
    type: Number,
    required: [true, 'El orden es requerido'],
    min: [0, 'El orden debe ser mayor o igual a 0']
  },
  bloqueada: {
    type: Boolean,
    default: false
  },
  moduloId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modulo',
    required: [true, 'El módulo es requerido']
  },
  cursoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: [true, 'El curso es requerido']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices
leccionSchema.index({ moduloId: 1 });
leccionSchema.index({ cursoId: 1 });
leccionSchema.index({ orden: 1 });

// Validación condicional para contenido
leccionSchema.pre('validate', function(next) {
  if (this.tipo !== 'quiz' && !this.contenido) {
    return next(new Error('El contenido es requerido para este tipo de lección'));
  }
  next();
});

module.exports = mongoose.model('Leccion', leccionSchema);
