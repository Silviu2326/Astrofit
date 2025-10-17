const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'El ID de la pregunta es requerido']
  },
  answerText: {
    type: String,
    required: [true, 'La respuesta es requerida'],
    trim: true,
    maxlength: [1000, 'La respuesta no puede exceder 1000 caracteres']
  },
  esCorrecta: {
    type: Boolean,
    required: [true, 'El estado de corrección es requerido']
  },
  puntosObtenidos: {
    type: Number,
    required: [true, 'Los puntos obtenidos son requeridos'],
    min: [0, 'Los puntos no pueden ser negativos']
  }
});

const quizResultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: [true, 'El quiz es requerido']
  },
  estudianteId: {
    type: String,
    required: [true, 'El ID del estudiante es requerido']
  },
  estudianteNombre: {
    type: String,
    required: [true, 'El nombre del estudiante es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  puntuacion: {
    type: Number,
    required: [true, 'La puntuación es requerida'],
    min: [0, 'La puntuación no puede ser negativa']
  },
  puntuacionMaxima: {
    type: Number,
    required: [true, 'La puntuación máxima es requerida'],
    min: [0, 'La puntuación máxima no puede ser negativa']
  },
  porcentaje: {
    type: Number,
    required: [true, 'El porcentaje es requerido'],
    min: [0, 'El porcentaje no puede ser negativo'],
    max: [100, 'El porcentaje no puede exceder 100']
  },
  aprobado: {
    type: Boolean,
    required: [true, 'El estado de aprobación es requerido']
  },
  fechaCompletado: {
    type: Date,
    default: Date.now
  },
  tiempoUtilizado: {
    type: Number,
    min: [0, 'El tiempo utilizado no puede ser negativo']
  },
  respuestas: {
    type: [respuestaSchema],
    required: [true, 'Las respuestas son requeridas']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices
quizResultSchema.index({ quizId: 1 });
quizResultSchema.index({ estudianteId: 1 });
quizResultSchema.index({ fechaCompletado: -1 });
quizResultSchema.index({ aprobado: 1 });

// Índice compuesto para búsquedas eficientes
quizResultSchema.index({ quizId: 1, estudianteId: 1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);
