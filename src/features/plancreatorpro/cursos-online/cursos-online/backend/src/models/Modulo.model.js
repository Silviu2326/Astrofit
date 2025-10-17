const mongoose = require('mongoose');

const moduloSchema = new mongoose.Schema({
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
  orden: {
    type: Number,
    required: [true, 'El orden es requerido'],
    min: [0, 'El orden debe ser mayor o igual a 0']
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
moduloSchema.index({ cursoId: 1 });
moduloSchema.index({ orden: 1 });

// Virtual para lecciones
moduloSchema.virtual('lecciones', {
  ref: 'Leccion',
  localField: '_id',
  foreignField: 'moduloId'
});

module.exports = mongoose.model('Modulo', moduloSchema);
