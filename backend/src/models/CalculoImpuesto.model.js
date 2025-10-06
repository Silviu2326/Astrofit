import mongoose from 'mongoose';

const desgloseImpuestoSchema = new mongoose.Schema({
  tasaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TasaImpuesto',
    required: true
  },
  nombreTasa: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true,
    enum: ['IVA', 'IRPF', 'OTRO']
  },
  porcentaje: {
    type: Number,
    required: true
  },
  baseImponible: {
    type: Number,
    required: true,
    min: 0
  },
  cuotaImpuesto: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const calculoImpuestoSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido'],
    index: true
  },
  factura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura',
    required: [true, 'La factura es requerida'],
    index: true
  },
  baseImponible: {
    type: Number,
    required: [true, 'La base imponible es requerida'],
    min: [0, 'La base imponible no puede ser negativa']
  },
  totalImpuestos: {
    type: Number,
    required: [true, 'El total de impuestos es requerido'],
    min: [0, 'El total de impuestos no puede ser negativo'],
    default: 0
  },
  totalConImpuestos: {
    type: Number,
    required: [true, 'El total con impuestos es requerido'],
    min: [0, 'El total con impuestos no puede ser negativo']
  },
  // Desglose detallado por cada tasa aplicada
  desglose: [desgloseImpuestoSchema],
  // IDs de las tasas aplicadas (para referencia rápida)
  tasasAplicadas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TasaImpuesto'
  }],
  fechaCalculo: {
    type: Date,
    default: Date.now,
    required: true
  },
  // Información adicional
  descuento: {
    type: Number,
    default: 0,
    min: 0
  },
  // Si hubo exenciones aplicadas
  exenciones: [{
    concepto: String,
    motivo: String,
    montoExento: Number
  }],
  // Notas del cálculo
  notas: {
    type: String,
    trim: true,
    maxlength: [1000, 'Las notas no pueden exceder 1000 caracteres']
  },
  // Estado del cálculo
  estado: {
    type: String,
    enum: ['calculado', 'aplicado', 'anulado'],
    default: 'calculado'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices compuestos para búsquedas eficientes
calculoImpuestoSchema.index({ trainer: 1, factura: 1 });
calculoImpuestoSchema.index({ trainer: 1, fechaCalculo: -1 });
calculoImpuestoSchema.index({ trainer: 1, estado: 1 });
calculoImpuestoSchema.index({ trainer: 1, isActive: 1 });

// Virtual para obtener el porcentaje efectivo total
calculoImpuestoSchema.virtual('porcentajeEfectivo').get(function() {
  if (this.baseImponible === 0) return 0;
  return (this.totalImpuestos / this.baseImponible) * 100;
});

// Método para calcular impuestos basado en tasas
calculoImpuestoSchema.methods.calcularConTasas = async function(tasas) {
  if (!Array.isArray(tasas) || tasas.length === 0) {
    throw new Error('Se requiere al menos una tasa para calcular');
  }

  this.desglose = [];
  this.tasasAplicadas = [];
  this.totalImpuestos = 0;

  for (const tasa of tasas) {
    const cuota = this.baseImponible * (tasa.porcentaje / 100);

    this.desglose.push({
      tasaId: tasa._id,
      nombreTasa: tasa.nombre,
      tipo: tasa.tipo,
      porcentaje: tasa.porcentaje,
      baseImponible: this.baseImponible,
      cuotaImpuesto: cuota
    });

    this.tasasAplicadas.push(tasa._id);
    this.totalImpuestos += cuota;
  }

  this.totalConImpuestos = this.baseImponible - this.descuento + this.totalImpuestos;
  return this;
};

// Método para recalcular totales
calculoImpuestoSchema.methods.recalcular = function() {
  this.totalImpuestos = this.desglose.reduce((sum, item) => sum + item.cuotaImpuesto, 0);
  this.totalConImpuestos = this.baseImponible - this.descuento + this.totalImpuestos;
  return this;
};

// Método estático para obtener cálculos por trainer
calculoImpuestoSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = {
    trainer: trainerId,
    isActive: true
  };

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.fechaDesde) {
    query.fechaCalculo = { ...query.fechaCalculo, $gte: new Date(filters.fechaDesde) };
  }

  if (filters.fechaHasta) {
    query.fechaCalculo = { ...query.fechaCalculo, $lte: new Date(filters.fechaHasta) };
  }

  return this.find(query)
    .populate('factura')
    .populate('tasasAplicadas')
    .sort({ fechaCalculo: -1 });
};

// Método estático para obtener cálculo por factura
calculoImpuestoSchema.statics.findByFactura = function(facturaId) {
  return this.findOne({
    factura: facturaId,
    isActive: true
  })
    .populate('tasasAplicadas')
    .populate('factura');
};

// Método estático para obtener estadísticas
calculoImpuestoSchema.statics.getEstadisticasByTrainer = async function(trainerId, periodo = {}) {
  const query = {
    trainer: trainerId,
    isActive: true,
    estado: { $ne: 'anulado' }
  };

  if (periodo.fechaDesde) {
    query.fechaCalculo = { $gte: new Date(periodo.fechaDesde) };
  }

  if (periodo.fechaHasta) {
    query.fechaCalculo = { ...query.fechaCalculo, $lte: new Date(periodo.fechaHasta) };
  }

  const calculos = await this.find(query);

  const totalBaseImponible = calculos.reduce((sum, calc) => sum + calc.baseImponible, 0);
  const totalImpuestos = calculos.reduce((sum, calc) => sum + calc.totalImpuestos, 0);
  const totalConImpuestos = calculos.reduce((sum, calc) => sum + calc.totalConImpuestos, 0);

  // Desglose por tipo de impuesto
  const porTipo = {};
  calculos.forEach(calc => {
    calc.desglose.forEach(item => {
      if (!porTipo[item.tipo]) {
        porTipo[item.tipo] = {
          tipo: item.tipo,
          totalBase: 0,
          totalCuota: 0,
          cantidad: 0
        };
      }
      porTipo[item.tipo].totalBase += item.baseImponible;
      porTipo[item.tipo].totalCuota += item.cuotaImpuesto;
      porTipo[item.tipo].cantidad++;
    });
  });

  return {
    totalCalculos: calculos.length,
    totalBaseImponible,
    totalImpuestos,
    totalConImpuestos,
    porcentajePromedio: totalBaseImponible > 0 ? (totalImpuestos / totalBaseImponible) * 100 : 0,
    desglosePorTipo: Object.values(porTipo)
  };
};

// Middleware pre-save
calculoImpuestoSchema.pre('save', function(next) {
  // Recalcular totales antes de guardar
  if (this.isModified('desglose') || this.isModified('baseImponible') || this.isModified('descuento')) {
    this.recalcular();
  }
  next();
});

// Configurar toJSON para incluir virtuals
calculoImpuestoSchema.set('toJSON', { virtuals: true });
calculoImpuestoSchema.set('toObject', { virtuals: true });

export default mongoose.model('CalculoImpuesto', calculoImpuestoSchema);
