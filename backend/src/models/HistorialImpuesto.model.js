import mongoose from 'mongoose';

const historialImpuestoSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido'],
    index: true
  },
  // Periodo fiscal
  periodo: {
    type: String,
    required: [true, 'El periodo es requerido'],
    trim: true
  },
  trimestre: {
    type: Number,
    min: 1,
    max: 4
  },
  año: {
    type: Number,
    required: [true, 'El año es requerido'],
    min: 2000,
    max: 2100
  },
  // Tipo de impuesto
  tipoImpuesto: {
    type: String,
    required: [true, 'El tipo de impuesto es requerido'],
    enum: ['IVA', 'IRPF', 'IS', 'IAE', 'OTRO']
  },
  // Modelo fiscal asociado
  modelo: {
    type: String,
    trim: true
  },
  // Montos
  totalRetenido: {
    type: Number,
    default: 0,
    min: 0
  },
  totalPagado: {
    type: Number,
    default: 0,
    min: 0
  },
  saldo: {
    type: Number,
    default: 0
  },
  // Referencia a la declaración
  declaracionId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'declaracionModel'
  },
  declaracionModel: {
    type: String,
    enum: ['DeclaracionTrimestral', 'RetencionIRPF', 'OtroImpuesto']
  },
  // Fechas
  fechaRegistro: {
    type: Date,
    default: Date.now,
    required: true
  },
  fechaPago: {
    type: Date
  },
  fechaLimite: {
    type: Date
  },
  // Estado del pago
  estado: {
    type: String,
    enum: ['pendiente', 'pagado', 'compensado', 'vencido'],
    default: 'pendiente'
  },
  // Comprobantes
  comprobantePago: {
    type: String,
    trim: true
  },
  numeroJustificante: {
    type: String,
    trim: true
  },
  // Método de pago
  metodoPago: {
    type: String,
    enum: ['Domiciliación', 'Transferencia', 'Compensación', 'Efectivo', 'No aplica'],
    default: 'No aplica'
  },
  // Detalles adicionales
  concepto: {
    type: String,
    trim: true,
    maxlength: [500, 'El concepto no puede exceder 500 caracteres']
  },
  notas: {
    type: String,
    trim: true,
    maxlength: [2000, 'Las notas no pueden exceder 2000 caracteres']
  },
  // Categorización
  categoria: {
    type: String,
    enum: ['trimestral', 'anual', 'mensual', 'ocasional'],
    default: 'trimestral'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices compuestos para búsquedas eficientes
historialImpuestoSchema.index({ trainer: 1, año: -1, trimestre: -1 });
historialImpuestoSchema.index({ trainer: 1, tipoImpuesto: 1, año: -1 });
historialImpuestoSchema.index({ trainer: 1, estado: 1 });
historialImpuestoSchema.index({ trainer: 1, fechaLimite: 1 });
historialImpuestoSchema.index({ trainer: 1, isActive: 1 });
historialImpuestoSchema.index({ declaracionId: 1 });

// Virtual para verificar si está vencido
historialImpuestoSchema.virtual('estaVencido').get(function() {
  return this.estado === 'pendiente' && this.fechaLimite && this.fechaLimite < new Date();
});

// Virtual para días hasta vencimiento
historialImpuestoSchema.virtual('diasHastaVencimiento').get(function() {
  if (!this.fechaLimite) return null;
  const diff = this.fechaLimite.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Método para marcar como pagado
historialImpuestoSchema.methods.marcarComoPagado = function(metodoPago, numeroJustificante, comprobantePago) {
  this.estado = 'pagado';
  this.fechaPago = new Date();
  if (metodoPago) this.metodoPago = metodoPago;
  if (numeroJustificante) this.numeroJustificante = numeroJustificante;
  if (comprobantePago) this.comprobantePago = comprobantePago;
  return this.save();
};

// Método estático para obtener historial por trainer
historialImpuestoSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = {
    trainer: trainerId,
    isActive: true
  };

  if (filters.año) query.año = filters.año;
  if (filters.trimestre) query.trimestre = filters.trimestre;
  if (filters.tipoImpuesto) query.tipoImpuesto = filters.tipoImpuesto;
  if (filters.estado) query.estado = filters.estado;

  if (filters.fechaDesde) {
    query.fechaRegistro = { ...query.fechaRegistro, $gte: new Date(filters.fechaDesde) };
  }

  if (filters.fechaHasta) {
    query.fechaRegistro = { ...query.fechaRegistro, $lte: new Date(filters.fechaHasta) };
  }

  return this.find(query)
    .populate('declaracionId')
    .sort({ fechaRegistro: -1 });
};

// Método estático para obtener historial por periodo
historialImpuestoSchema.statics.findByPeriodo = function(trainerId, año, trimestre = null) {
  const query = {
    trainer: trainerId,
    año,
    isActive: true
  };

  if (trimestre) query.trimestre = trimestre;

  return this.find(query)
    .populate('declaracionId')
    .sort({ trimestre: 1, fechaRegistro: -1 });
};

// Método estático para obtener resumen anual
historialImpuestoSchema.statics.getResumenAnual = async function(trainerId, año) {
  const registros = await this.find({
    trainer: trainerId,
    año,
    isActive: true
  });

  const totalRetenido = registros.reduce((sum, r) => sum + r.totalRetenido, 0);
  const totalPagado = registros.reduce((sum, r) => sum + r.totalPagado, 0);
  const saldoTotal = registros.reduce((sum, r) => sum + r.saldo, 0);

  // Agrupar por tipo de impuesto
  const porTipo = {};
  registros.forEach(r => {
    if (!porTipo[r.tipoImpuesto]) {
      porTipo[r.tipoImpuesto] = {
        tipo: r.tipoImpuesto,
        cantidad: 0,
        totalRetenido: 0,
        totalPagado: 0,
        saldo: 0
      };
    }
    porTipo[r.tipoImpuesto].cantidad++;
    porTipo[r.tipoImpuesto].totalRetenido += r.totalRetenido;
    porTipo[r.tipoImpuesto].totalPagado += r.totalPagado;
    porTipo[r.tipoImpuesto].saldo += r.saldo;
  });

  // Agrupar por estado
  const porEstado = {
    pendiente: registros.filter(r => r.estado === 'pendiente').length,
    pagado: registros.filter(r => r.estado === 'pagado').length,
    compensado: registros.filter(r => r.estado === 'compensado').length,
    vencido: registros.filter(r => r.estaVencido).length
  };

  return {
    año,
    totalRegistros: registros.length,
    totalRetenido,
    totalPagado,
    saldoTotal,
    porTipo: Object.values(porTipo),
    porEstado
  };
};

// Método estático para obtener pagos pendientes
historialImpuestoSchema.statics.getPendientesPago = function(trainerId) {
  return this.find({
    trainer: trainerId,
    estado: 'pendiente',
    isActive: true
  })
    .populate('declaracionId')
    .sort({ fechaLimite: 1 });
};

// Middleware pre-save
historialImpuestoSchema.pre('save', function(next) {
  // Calcular saldo
  this.saldo = this.totalRetenido - this.totalPagado;

  // Actualizar estado a vencido si corresponde
  if (this.estado === 'pendiente' && this.estaVencido) {
    this.estado = 'vencido';
  }

  // Generar periodo si no existe
  if (!this.periodo) {
    if (this.trimestre) {
      this.periodo = `${this.año}-Q${this.trimestre}`;
    } else {
      this.periodo = `${this.año}`;
    }
  }

  next();
});

// Configurar toJSON para incluir virtuals
historialImpuestoSchema.set('toJSON', { virtuals: true });
historialImpuestoSchema.set('toObject', { virtuals: true });

export default mongoose.model('HistorialImpuesto', historialImpuestoSchema);
