const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  pregunta: {
    type: String,
    required: [true, 'La pregunta es requerida'],
    trim: true,
    minlength: [10, 'La pregunta debe tener al menos 10 caracteres'],
    maxlength: [500, 'La pregunta no puede exceder 500 caracteres']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo es requerido'],
    enum: {
      values: ['opcion-multiple', 'verdadero-falso', 'texto-libre'],
      message: 'El tipo debe ser: opcion-multiple, verdadero-falso o texto-libre'
    }
  },
  opciones: {
    type: [String],
    validate: {
      validator: function(v) {
        if (this.tipo === 'opcion-multiple') {
          return v && v.length >= 2 && v.length <= 6;
        }
        return true;
      },
      message: 'Las opciones múltiples deben tener entre 2 y 6 opciones'
    }
  },
  respuestaCorrecta: {
    type: String,
    required: function() {
      return this.tipo !== 'texto-libre';
    },
    trim: true
  },
  puntos: {
    type: Number,
    required: [true, 'Los puntos son requeridos'],
    min: [1, 'Los puntos deben ser mayor a 0'],
    max: [100, 'Los puntos no pueden exceder 100']
  },
  orden: {
    type: Number,
    required: [true, 'El orden es requerido'],
    min: [0, 'El orden debe ser mayor o igual a 0']
  }
});

const quizSchema = new mongoose.Schema({
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
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  duracion: {
    type: Number,
    required: [true, 'La duración es requerida'],
    min: [1, 'La duración debe ser mayor a 0']
  },
  intentosPermitidos: {
    type: Number,
    default: 1,
    min: [1, 'Los intentos deben ser mayor a 0'],
    max: [10, 'Los intentos no pueden exceder 10']
  },
  puntuacionMinima: {
    type: Number,
    required: [true, 'La puntuación mínima es requerida'],
    min: [0, 'La puntuación mínima no puede ser negativa'],
    max: [100, 'La puntuación mínima no puede exceder 100']
  },
  estado: {
    type: String,
    enum: {
      values: ['borrador', 'activo', 'pausado'],
      message: 'El estado debe ser: borrador, activo o pausado'
    },
    default: 'borrador'
  },
  preguntas: {
    type: [preguntaSchema],
    validate: {
      validator: function(v) {
        return v && v.length >= 1 && v.length <= 50;
      },
      message: 'Debe tener entre 1 y 50 preguntas'
    }
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  cursoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: [true, 'El curso es requerido']
  },
  leccionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leccion'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices
quizSchema.index({ cursoId: 1 });
quizSchema.index({ leccionId: 1 });
quizSchema.index({ estado: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
