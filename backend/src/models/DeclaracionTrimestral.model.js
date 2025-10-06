import mongoose from 'mongoose';

const detalleDeclaracionSchema = new mongoose.Schema({
  factura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura'
  },
  tipo: {
    type: String,
    enum: ['ingreso', 'gasto'],
    required: true
  },
  numeroFactura: String,
  fecha: Date,
  baseImponible: {
    type: Number,
    required: true,
    min: 0
  },
  cuotaIVA: {
    type: Number,
    required: true,
    min: 0
  },
  porcentajeIVA: Number,
  concepto: String
}, { _id: false });

const declaracionTrimestralSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido'],
    index: true
  },
  trimestre: {
    type: Number,
    required: [true, 'El trimestre es requerido'],
    min: 1,
    max: 4
  },
  año: {
    type: Number,
    required: [true, 'El año es requerido'],
    min: 2000,
    max: 2100
  },
  // Información fiscal
  totalVentas: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  ivaRepercutido: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  ivaSoportado: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  resultado: {
    type: Number,
    required: true,
    default: 0
  },
  totalExenciones: {
    type: Number,
    default: 0,
    min: 0
  },
  // Estado de la declaración
  estado: {
    type: String,
    enum: ['borrador', 'presentado', 'pagado', 'compensado'],
    default: 'borrador',
    required: true
  },
  // Fechas importantes
  fechaLimite: {
    type: Date,
    required: true
  },
  fechaPresentacion: {
    type: Date
  },
  fechaPago: {
    type: Date
  },
  // Modelo fiscal
  modelo: {
    type: String,
    enum: ['303', '390', '130', '131'],
    default: '303'
  },
  // Detalles de operaciones
  detalles: [detalleDeclaracionSchema],
  // Información adicional
  notas: {
    type: String,
    trim: true,
    maxlength: [2000, 'Las notas no pueden exceder 2000 caracteres']
  },
  // Archivos adjuntos
  archivoDeclaracion: {
    type: String,
    trim: true
  },
  archivoJustificantePago: {
    type: String,
    trim: true
  },
  // Referencia de presentación
  numeroReferencia: {
    type: String,
    trim: true
  },
  // Método de pago si aplica
  metodoPago: {
    type: String,
    enum: ['Domiciliación', 'Transferencia', 'Compensación', 'No aplica'],
    default: 'No aplica'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices compuestos para búsquedas eficientes
declaracionTrimestralSchema.index({ trainer: 1, año: -1, trimestre: -1 });
declaracionTrimestralSchema.index({ trainer: 1, estado: 1 });
declaracionTrimestralSchema.index({ trainer: 1, fechaLimite: 1 });
declaracionTrimestralSchema.index({ trainer: 1, modelo: 1 });
declaracionTrimestralSchema.index({ trainer: 1, isActive: 1 });

// Índice único para evitar duplicados
declaracionTrimestralSchema.index(
  { trainer: 1, año: 1, trimestre: 1, modelo: 1 },
  { unique: true, partialFilterExpression: { isActive: true } }
);

// Virtual para el periodo
declaracionTrimestralSchema.virtual('periodo').get(function() {
  return `Q${this.trimestre}-${this.año}`;
});

// Virtual para verificar si está vencida
declaracionTrimestralSchema.virtual('estaVencida').get(function() {
  return this.estado === 'borrador' && this.fechaLimite < new Date();
});

// Virtual para días hasta vencimiento
declaracionTrimestralSchema.virtual('diasHastaVencimiento').get(function() {
  if (!this.fechaLimite) return 0;
  const diff = this.fechaLimite.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Método para calcular totales
declaracionTrimestralSchema.methods.calcularTotales = function() {
  const ingresos = this.detalles.filter(d => d.tipo === 'ingreso');
  const gastos = this.detalles.filter(d => d.tipo === 'gasto');

  this.totalVentas = ingresos.reduce((sum, item) => sum + item.baseImponible, 0);
  this.ivaRepercutido = ingresos.reduce((sum, item) => sum + item.cuotaIVA, 0);
  this.ivaSoportado = gastos.reduce((sum, item) => sum + item.cuotaIVA, 0);
  this.resultado = this.ivaRepercutido - this.ivaSoportado;

  return this;
};

// Método para presentar declaración
declaracionTrimestralSchema.methods.presentar = function(numeroReferencia) {
  this.estado = 'presentado';
  this.fechaPresentacion = new Date();
  if (numeroReferencia) this.numeroReferencia = numeroReferencia;
  return this.save();
};

// Método para marcar como pagado
declaracionTrimestralSchema.methods.marcarComoPagado = function(metodoPago) {
  this.estado = 'pagado';
  this.fechaPago = new Date();
  if (metodoPago) this.metodoPago = metodoPago;
  return this.save();
};

// Método estático para obtener declaraciones por trainer
declaracionTrimestralSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = {
    trainer: trainerId,
    isActive: true
  };

  if (filters.año) query.año = filters.año;
  if (filters.trimestre) query.trimestre = filters.trimestre;
  if (filters.estado) query.estado = filters.estado;
  if (filters.modelo) query.modelo = filters.modelo;

  return this.find(query)
    .sort({ año: -1, trimestre: -1 })
    .populate('detalles.factura');
};

// Método estático para obtener declaración por periodo
declaracionTrimestralSchema.statics.findByPeriodo = function(trainerId, año, trimestre, modelo = '303') {
  return this.findOne({
    trainer: trainerId,
    año,
    trimestre,
    modelo,
    isActive: true
  }).populate('detalles.factura');
};

// Método estático para crear desde facturas
declaracionTrimestralSchema.statics.crearDesdeFacturas = async function(
  trainerId,
  año,
  trimestre,
  facturas,
  gastos = []
) {
  // Calcular fecha límite del trimestre
  const fechasLimite = {
    1: new Date(año, 3, 20), // 20 de abril
    2: new Date(año, 6, 20), // 20 de julio
    3: new Date(año, 9, 20), // 20 de octubre
    4: new Date(año + 1, 0, 30) // 30 de enero del año siguiente
  };

  const declaracion = new this({
    trainer: trainerId,
    trimestre,
    año,
    fechaLimite: fechasLimite[trimestre],
    modelo: '303',
    detalles: []
  });

  // Agregar facturas como ingresos
  facturas.forEach(factura => {
    declaracion.detalles.push({
      factura: factura._id,
      tipo: 'ingreso',
      numeroFactura: factura.numeroFactura,
      fecha: factura.fecha,
      baseImponible: factura.subtotal || 0,
      cuotaIVA: factura.impuestos || 0,
      porcentajeIVA: factura.subtotal > 0 ? ((factura.impuestos || 0) / factura.subtotal) * 100 : 0,
      concepto: `Factura ${factura.numeroFactura}`
    });
  });

  // Agregar gastos
  gastos.forEach(gasto => {
    const baseImponible = gasto.monto || 0;
    const cuotaIVA = baseImponible * 0.21; // Asumiendo IVA 21%

    declaracion.detalles.push({
      tipo: 'gasto',
      fecha: gasto.fecha,
      baseImponible,
      cuotaIVA,
      porcentajeIVA: 21,
      concepto: gasto.concepto
    });
  });

  declaracion.calcularTotales();
  return declaracion;
};

// Método estático para obtener resumen anual
declaracionTrimestralSchema.statics.getResumenAnual = async function(trainerId, año) {
  const declaraciones = await this.find({
    trainer: trainerId,
    año,
    isActive: true
  }).sort({ trimestre: 1 });

  const totalIvaRepercutido = declaraciones.reduce((sum, d) => sum + d.ivaRepercutido, 0);
  const totalIvaSoportado = declaraciones.reduce((sum, d) => sum + d.ivaSoportado, 0);
  const totalResultado = declaraciones.reduce((sum, d) => sum + d.resultado, 0);

  return {
    año,
    totalDeclaraciones: declaraciones.length,
    totalIvaRepercutido,
    totalIvaSoportado,
    totalResultado,
    declaracionesPorTrimestre: declaraciones.map(d => ({
      trimestre: d.trimestre,
      estado: d.estado,
      resultado: d.resultado,
      fechaLimite: d.fechaLimite,
      fechaPresentacion: d.fechaPresentacion
    }))
  };
};

// Middleware pre-save
declaracionTrimestralSchema.pre('save', function(next) {
  // Recalcular totales si se modificaron los detalles
  if (this.isModified('detalles')) {
    this.calcularTotales();
  }
  next();
});

// Configurar toJSON para incluir virtuals
declaracionTrimestralSchema.set('toJSON', { virtuals: true });
declaracionTrimestralSchema.set('toObject', { virtuals: true });

export default mongoose.model('DeclaracionTrimestral', declaracionTrimestralSchema);
