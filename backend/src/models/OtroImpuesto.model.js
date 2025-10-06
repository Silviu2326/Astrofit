import mongoose from 'mongoose';

const otroImpuestoSchema = new mongoose.Schema({
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
    maxlength: [200, 'El nombre no puede exceder 200 caracteres']
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  // Categoría del impuesto
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: ['IAE', 'Tasa Municipal', 'Seguridad Social', 'Impuesto Sociedades', 'Otros']
  },
  // Montos
  importeAnual: {
    type: Number,
    required: [true, 'El importe anual es requerido'],
    min: [0, 'El importe no puede ser negativo']
  },
  importePagado: {
    type: Number,
    default: 0,
    min: [0, 'El importe pagado no puede ser negativo']
  },
  importePendiente: {
    type: Number,
    default: 0,
    min: [0, 'El importe pendiente no puede ser negativo']
  },
  // Frecuencia de pago
  frecuencia: {
    type: String,
    required: [true, 'La frecuencia es requerida'],
    enum: ['Anual', 'Semestral', 'Trimestral', 'Mensual', 'Único']
  },
  // Vencimientos
  proximoVencimiento: {
    type: Date,
    required: [true, 'La fecha de próximo vencimiento es requerida']
  },
  ultimoPago: {
    type: Date
  },
  // Estado
  estado: {
    type: String,
    enum: ['pendiente', 'pagado', 'parcial', 'vencido'],
    default: 'pendiente'
  },
  // Información de pago
  pagos: [{
    fecha: {
      type: Date,
      required: true
    },
    importe: {
      type: Number,
      required: true,
      min: 0
    },
    metodoPago: {
      type: String,
      enum: ['Domiciliación', 'Transferencia', 'Efectivo', 'Tarjeta', 'Otro']
    },
    numeroJustificante: String,
    comprobante: String,
    notas: String
  }],
  // Año fiscal
  añoFiscal: {
    type: Number,
    required: [true, 'El año fiscal es requerido'],
    min: 2000,
    max: 2100
  },
  // Configuración de recurrencia
  esRecurrente: {
    type: Boolean,
    default: true
  },
  // Organismo gestor
  organismoGestor: {
    type: String,
    trim: true,
    maxlength: [200, 'El organismo gestor no puede exceder 200 caracteres']
  },
  // Número de referencia
  numeroReferencia: {
    type: String,
    trim: true,
    maxlength: [100, 'El número de referencia no puede exceder 100 caracteres']
  },
  // Base de cálculo
  baseCalculo: {
    type: String,
    trim: true,
    maxlength: [500, 'La base de cálculo no puede exceder 500 caracteres']
  },
  // Documentos
  documentos: [{
    nombre: String,
    url: String,
    tipo: {
      type: String,
      enum: ['Notificación', 'Justificante', 'Liquidación', 'Otro']
    },
    fechaSubida: {
      type: Date,
      default: Date.now
    }
  }],
  // Alertas
  alertaActivada: {
    type: Boolean,
    default: true
  },
  diasAnticipacionAlerta: {
    type: Number,
    default: 15,
    min: 0
  },
  // Notas
  notas: {
    type: String,
    trim: true,
    maxlength: [2000, 'Las notas no pueden exceder 2000 caracteres']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices compuestos para búsquedas eficientes
otroImpuestoSchema.index({ trainer: 1, añoFiscal: -1 });
otroImpuestoSchema.index({ trainer: 1, categoria: 1 });
otroImpuestoSchema.index({ trainer: 1, estado: 1 });
otroImpuestoSchema.index({ trainer: 1, proximoVencimiento: 1 });
otroImpuestoSchema.index({ trainer: 1, isActive: 1 });

// Virtual para verificar si está vencido
otroImpuestoSchema.virtual('estaVencido').get(function() {
  return this.estado === 'pendiente' && this.proximoVencimiento < new Date();
});

// Virtual para días hasta vencimiento
otroImpuestoSchema.virtual('diasHastaVencimiento').get(function() {
  if (!this.proximoVencimiento) return null;
  const diff = this.proximoVencimiento.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Virtual para porcentaje pagado
otroImpuestoSchema.virtual('porcentajePagado').get(function() {
  if (this.importeAnual === 0) return 0;
  return (this.importePagado / this.importeAnual) * 100;
});

// Método para registrar un pago
otroImpuestoSchema.methods.registrarPago = function(importe, metodoPago, numeroJustificante, comprobante, notas) {
  this.pagos.push({
    fecha: new Date(),
    importe,
    metodoPago,
    numeroJustificante,
    comprobante,
    notas
  });

  this.importePagado += importe;
  this.importePendiente = this.importeAnual - this.importePagado;
  this.ultimoPago = new Date();

  // Actualizar estado
  if (this.importePagado >= this.importeAnual) {
    this.estado = 'pagado';
  } else if (this.importePagado > 0) {
    this.estado = 'parcial';
  }

  return this.save();
};

// Método para calcular próximo vencimiento
otroImpuestoSchema.methods.calcularProximoVencimiento = function() {
  if (!this.esRecurrente) return null;

  const fecha = new Date(this.proximoVencimiento);

  switch (this.frecuencia) {
    case 'Mensual':
      fecha.setMonth(fecha.getMonth() + 1);
      break;
    case 'Trimestral':
      fecha.setMonth(fecha.getMonth() + 3);
      break;
    case 'Semestral':
      fecha.setMonth(fecha.getMonth() + 6);
      break;
    case 'Anual':
      fecha.setFullYear(fecha.getFullYear() + 1);
      break;
    default:
      return null;
  }

  return fecha;
};

// Método estático para obtener impuestos por trainer
otroImpuestoSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = {
    trainer: trainerId,
    isActive: true
  };

  if (filters.añoFiscal) query.añoFiscal = filters.añoFiscal;
  if (filters.categoria) query.categoria = filters.categoria;
  if (filters.estado) query.estado = filters.estado;

  return this.find(query).sort({ proximoVencimiento: 1 });
};

// Método estático para obtener próximos vencimientos
otroImpuestoSchema.statics.getProximosVencimientos = function(trainerId, dias = 30) {
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() + dias);

  return this.find({
    trainer: trainerId,
    estado: { $in: ['pendiente', 'parcial'] },
    proximoVencimiento: { $lte: fechaLimite },
    isActive: true
  }).sort({ proximoVencimiento: 1 });
};

// Método estático para obtener resumen anual
otroImpuestoSchema.statics.getResumenAnual = async function(trainerId, añoFiscal) {
  const impuestos = await this.find({
    trainer: trainerId,
    añoFiscal,
    isActive: true
  });

  const totalAnual = impuestos.reduce((sum, imp) => sum + imp.importeAnual, 0);
  const totalPagado = impuestos.reduce((sum, imp) => sum + imp.importePagado, 0);
  const totalPendiente = impuestos.reduce((sum, imp) => sum + imp.importePendiente, 0);

  // Agrupar por categoría
  const porCategoria = {};
  impuestos.forEach(imp => {
    if (!porCategoria[imp.categoria]) {
      porCategoria[imp.categoria] = {
        categoria: imp.categoria,
        cantidad: 0,
        totalAnual: 0,
        totalPagado: 0,
        totalPendiente: 0
      };
    }
    porCategoria[imp.categoria].cantidad++;
    porCategoria[imp.categoria].totalAnual += imp.importeAnual;
    porCategoria[imp.categoria].totalPagado += imp.importePagado;
    porCategoria[imp.categoria].totalPendiente += imp.importePendiente;
  });

  return {
    añoFiscal,
    totalImpuestos: impuestos.length,
    totalAnual,
    totalPagado,
    totalPendiente,
    porcentajePagado: totalAnual > 0 ? (totalPagado / totalAnual) * 100 : 0,
    porCategoria: Object.values(porCategoria),
    pendientes: impuestos.filter(i => i.estado === 'pendiente').length,
    pagados: impuestos.filter(i => i.estado === 'pagado').length,
    vencidos: impuestos.filter(i => i.estaVencido).length
  };
};

// Middleware pre-save
otroImpuestoSchema.pre('save', function(next) {
  // Calcular importe pendiente
  this.importePendiente = this.importeAnual - this.importePagado;

  // Actualizar estado a vencido si corresponde
  if (this.estado === 'pendiente' && this.estaVencido) {
    this.estado = 'vencido';
  }

  next();
});

// Configurar toJSON para incluir virtuals
otroImpuestoSchema.set('toJSON', { virtuals: true });
otroImpuestoSchema.set('toObject', { virtuals: true });

export default mongoose.model('OtroImpuesto', otroImpuestoSchema);
