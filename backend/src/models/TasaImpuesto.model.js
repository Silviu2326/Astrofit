import mongoose from 'mongoose';

const tasaImpuestoSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido'],
    index: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  tipo: {
    type: String,
    required: [true, 'El tipo es requerido'],
    enum: ['IVA', 'IRPF', 'OTRO'],
    default: 'IVA'
  },
  porcentaje: {
    type: Number,
    required: [true, 'El porcentaje es requerido'],
    min: [0, 'El porcentaje no puede ser negativo'],
    max: [100, 'El porcentaje no puede exceder 100']
  },
  aplicaA: {
    type: String,
    required: [true, 'El campo aplicaA es requerido'],
    enum: ['servicios', 'productos', 'ambos'],
    default: 'ambos'
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaVigencia: {
    type: Date,
    default: Date.now
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  // Código interno para referencia (ej: "IVA_GENERAL", "IVA_REDUCIDO")
  codigo: {
    type: String,
    trim: true,
    uppercase: true,
    maxlength: [50, 'El código no puede exceder 50 caracteres']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices compuestos para búsquedas eficientes
tasaImpuestoSchema.index({ trainer: 1, tipo: 1 });
tasaImpuestoSchema.index({ trainer: 1, activo: 1 });
tasaImpuestoSchema.index({ trainer: 1, codigo: 1 });
tasaImpuestoSchema.index({ trainer: 1, isActive: 1 });

// Virtual para obtener el porcentaje en decimal
tasaImpuestoSchema.virtual('porcentajeDecimal').get(function() {
  return this.porcentaje / 100;
});

// Método para calcular impuesto sobre una cantidad
tasaImpuestoSchema.methods.calcularImpuesto = function(cantidad) {
  return cantidad * (this.porcentaje / 100);
};

// Método para calcular total con impuesto
tasaImpuestoSchema.methods.calcularTotal = function(cantidad) {
  return cantidad + this.calcularImpuesto(cantidad);
};

// Método estático para obtener tasas activas de un trainer
tasaImpuestoSchema.statics.findActivasByTrainer = function(trainerId, tipo = null) {
  const query = {
    trainer: trainerId,
    activo: true,
    isActive: true
  };

  if (tipo) {
    query.tipo = tipo;
  }

  return this.find(query).sort({ tipo: 1, porcentaje: -1 });
};

// Método estático para obtener tasa por código
tasaImpuestoSchema.statics.findByCodigo = function(trainerId, codigo) {
  return this.findOne({
    trainer: trainerId,
    codigo: codigo.toUpperCase(),
    activo: true,
    isActive: true
  });
};

// Configurar toJSON para incluir virtuals
tasaImpuestoSchema.set('toJSON', { virtuals: true });
tasaImpuestoSchema.set('toObject', { virtuals: true });

export default mongoose.model('TasaImpuesto', tasaImpuestoSchema);
