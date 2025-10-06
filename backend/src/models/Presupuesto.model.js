import mongoose from 'mongoose';

const presupuestoSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: [
      'nomina',
      'alquiler',
      'suministros',
      'marketing',
      'software',
      'equipamiento',
      'impuestos',
      'seguros',
      'mantenimiento',
      'otros'
    ]
  },
  periodo: {
    type: String,
    required: [true, 'El periodo es requerido'],
    enum: ['Mensual', 'Trimestral', 'Anual'],
    default: 'Mensual'
  },
  limitePresupuesto: {
    type: Number,
    required: [true, 'El límite de presupuesto es requerido'],
    min: [0, 'El límite de presupuesto no puede ser negativo']
  },
  gastoActual: {
    type: Number,
    default: 0,
    min: [0, 'El gasto actual no puede ser negativo']
  },
  año: {
    type: Number,
    required: [true, 'El año es requerido'],
    min: [2020, 'El año debe ser 2020 o posterior']
  },
  mes: {
    type: Number,
    min: [1, 'El mes debe estar entre 1 y 12'],
    max: [12, 'El mes debe estar entre 1 y 12'],
    default: null
  },
  trimestre: {
    type: Number,
    min: [1, 'El trimestre debe estar entre 1 y 4'],
    max: [4, 'El trimestre debe estar entre 1 y 4'],
    default: null
  },
  alertaActivada: {
    type: Boolean,
    default: true
  },
  umbralAlerta: {
    type: Number,
    min: [0, 'El umbral debe estar entre 0 y 100'],
    max: [100, 'El umbral debe estar entre 0 y 100'],
    default: 80 // Alertar cuando se alcance el 80%
  },
  notas: {
    type: String,
    trim: true,
    maxlength: [500, 'Las notas no pueden exceder 500 caracteres']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices compuestos para búsquedas eficientes
presupuestoSchema.index({ trainer: 1, categoria: 1, año: 1, mes: 1 });
presupuestoSchema.index({ trainer: 1, año: 1, periodo: 1 });
presupuestoSchema.index({ trainer: 1, isActive: 1 });

// Virtual para calcular el porcentaje usado
presupuestoSchema.virtual('porcentajeUsado').get(function() {
  if (this.limitePresupuesto === 0) return 0;
  return (this.gastoActual / this.limitePresupuesto) * 100;
});

// Virtual para calcular el monto disponible
presupuestoSchema.virtual('montoDisponible').get(function() {
  return Math.max(0, this.limitePresupuesto - this.gastoActual);
});

// Virtual para determinar si está excedido
presupuestoSchema.virtual('excedido').get(function() {
  return this.gastoActual > this.limitePresupuesto;
});

// Virtual para determinar si debe alertar
presupuestoSchema.virtual('debeAlertar').get(function() {
  if (!this.alertaActivada) return false;
  return this.porcentajeUsado >= this.umbralAlerta;
});

// Método para actualizar el gasto actual basado en gastos reales
presupuestoSchema.methods.actualizarGastoActual = async function() {
  const Gasto = mongoose.model('Gasto');

  let query = {
    trainer: this.trainer,
    categoria: this.categoria,
    isActive: true
  };

  // Filtrar por periodo según el tipo
  if (this.periodo === 'Mensual' && this.mes) {
    const fechaInicio = new Date(this.año, this.mes - 1, 1);
    const fechaFin = new Date(this.año, this.mes, 0, 23, 59, 59);
    query.fecha = { $gte: fechaInicio, $lte: fechaFin };
  } else if (this.periodo === 'Trimestral' && this.trimestre) {
    const mesInicio = (this.trimestre - 1) * 3;
    const fechaInicio = new Date(this.año, mesInicio, 1);
    const fechaFin = new Date(this.año, mesInicio + 3, 0, 23, 59, 59);
    query.fecha = { $gte: fechaInicio, $lte: fechaFin };
  } else if (this.periodo === 'Anual') {
    const fechaInicio = new Date(this.año, 0, 1);
    const fechaFin = new Date(this.año, 11, 31, 23, 59, 59);
    query.fecha = { $gte: fechaInicio, $lte: fechaFin };
  }

  const resultado = await Gasto.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        total: { $sum: '$monto' }
      }
    }
  ]);

  this.gastoActual = resultado.length > 0 ? resultado[0].total : 0;
  return this.gastoActual;
};

// Validación pre-save
presupuestoSchema.pre('save', function(next) {
  // Validar que se especifique mes para presupuestos mensuales
  if (this.periodo === 'Mensual' && !this.mes) {
    return next(new Error('El mes es requerido para presupuestos mensuales'));
  }

  // Validar que se especifique trimestre para presupuestos trimestrales
  if (this.periodo === 'Trimestral' && !this.trimestre) {
    return next(new Error('El trimestre es requerido para presupuestos trimestrales'));
  }

  // Limpiar campos no necesarios según el periodo
  if (this.periodo === 'Anual') {
    this.mes = null;
    this.trimestre = null;
  } else if (this.periodo === 'Trimestral') {
    this.mes = null;
  } else if (this.periodo === 'Mensual') {
    this.trimestre = null;
  }

  next();
});

// Configurar toJSON para incluir virtuals
presupuestoSchema.set('toJSON', { virtuals: true });
presupuestoSchema.set('toObject', { virtuals: true });

export default mongoose.model('Presupuesto', presupuestoSchema);
