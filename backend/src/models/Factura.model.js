import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
  // Relación con el Trainer
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
    index: true
  },

  // Relación con el Cliente
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
    index: true
  },

  // Número de factura (auto-generado)
  numeroFactura: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    index: true
  },

  // Información básica
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },

  fechaVencimiento: {
    type: Date,
    required: true
  },

  // Estado de la factura
  estado: {
    type: String,
    enum: ['Pagada', 'Pendiente', 'Anulada', 'Vencida'],
    default: 'Pendiente',
    required: true
  },

  // Items de la factura
  items: [{
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    precioUnitario: {
      type: Number,
      required: true,
      min: 0
    },
    subtotal: {
      type: Number,
      required: true
    },
    // Referencia opcional a producto/servicio
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto'
    }
  }],

  // Montos
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },

  descuento: {
    type: Number,
    default: 0,
    min: 0
  },

  impuestos: {
    type: Number,
    default: 0,
    min: 0
  },

  montoTotal: {
    type: Number,
    required: true,
    min: 0
  },

  // Información de pago
  metodoPago: {
    type: String,
    enum: ['Tarjeta', 'Transferencia', 'PayPal', 'Stripe', 'Efectivo', 'Otro'],
    default: 'Transferencia'
  },

  referenciaPago: {
    type: String,
    trim: true
  },

  fechaPago: {
    type: Date
  },

  // Notas y observaciones
  notas: {
    type: String,
    trim: true
  },

  notasInternas: {
    type: String,
    trim: true
  },

  // Información del cliente en el momento de la factura
  datosCliente: {
    nombre: String,
    email: String,
    telefono: String,
    direccion: String,
    nombreFiscal: String,
    nif: String,
    direccionFiscal: String
  },

  // Metadata
  isDeleted: {
    type: Boolean,
    default: false
  },

  // Relación con suscripción si aplica
  suscripcionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suscripcion'
  },

  // Recordatorios enviados
  recordatoriosEnviados: [{
    fecha: Date,
    tipo: String,
    canal: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices compuestos para búsquedas eficientes
facturaSchema.index({ trainerId: 1, numeroFactura: 1 });
facturaSchema.index({ trainerId: 1, clienteId: 1 });
facturaSchema.index({ trainerId: 1, estado: 1 });
facturaSchema.index({ trainerId: 1, fecha: -1 });
facturaSchema.index({ trainerId: 1, fechaVencimiento: 1 });
facturaSchema.index({ trainerId: 1, isDeleted: 1 });

// Virtual para días hasta vencimiento
facturaSchema.virtual('diasHastaVencimiento').get(function() {
  if (!this.fechaVencimiento) {
    return 0;
  }
  const diff = this.fechaVencimiento.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Virtual para verificar si está vencida
facturaSchema.virtual('estaVencida').get(function() {
  return this.estado === 'Pendiente' && this.diasHastaVencimiento < 0;
});

// Métodos de instancia
facturaSchema.methods.marcarComoPagada = function(metodoPago, referenciaPago) {
  this.estado = 'Pagada';
  this.fechaPago = new Date();
  if (metodoPago) this.metodoPago = metodoPago;
  if (referenciaPago) this.referenciaPago = referenciaPago;
  return this.save();
};

facturaSchema.methods.anular = function(motivo) {
  this.estado = 'Anulada';
  if (motivo) {
    this.notasInternas = (this.notasInternas || '') + `\nAnulada: ${motivo}`;
  }
  return this.save();
};

facturaSchema.methods.agregarRecordatorio = function(tipo, canal) {
  this.recordatoriosEnviados.push({
    fecha: new Date(),
    tipo,
    canal
  });
  return this.save();
};

facturaSchema.methods.calcularTotales = function() {
  // Calcular subtotal de items
  this.items.forEach(item => {
    item.subtotal = item.cantidad * item.precioUnitario;
  });

  // Calcular subtotal de la factura
  this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);

  // Calcular total
  this.montoTotal = this.subtotal - this.descuento + this.impuestos;

  return this;
};

// Métodos estáticos
facturaSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.clienteId) {
    query.clienteId = filters.clienteId;
  }

  if (filters.fechaDesde) {
    query.fecha = { ...query.fecha, $gte: new Date(filters.fechaDesde) };
  }

  if (filters.fechaHasta) {
    query.fecha = { ...query.fecha, $lte: new Date(filters.fechaHasta) };
  }

  return this.find(query).sort({ fecha: -1 });
};

facturaSchema.statics.findByCliente = function(clienteId) {
  return this.find({ clienteId, isDeleted: false }).sort({ fecha: -1 });
};

facturaSchema.statics.getStatsByTrainer = async function(trainerId) {
  const facturas = await this.find({ trainerId, isDeleted: false });

  const total = facturas.length;
  const pagadas = facturas.filter(f => f.estado === 'Pagada').length;
  const pendientes = facturas.filter(f => f.estado === 'Pendiente').length;
  const vencidas = facturas.filter(f => f.estado === 'Pendiente' && f.estaVencida).length;
  const anuladas = facturas.filter(f => f.estado === 'Anulada').length;

  const totalFacturado = facturas
    .filter(f => f.estado !== 'Anulada')
    .reduce((sum, f) => sum + f.montoTotal, 0);

  const totalCobrado = facturas
    .filter(f => f.estado === 'Pagada')
    .reduce((sum, f) => sum + f.montoTotal, 0);

  const totalPendiente = facturas
    .filter(f => f.estado === 'Pendiente')
    .reduce((sum, f) => sum + f.montoTotal, 0);

  return {
    total,
    pagadas,
    pendientes,
    vencidas,
    anuladas,
    totalFacturado,
    totalCobrado,
    totalPendiente
  };
};

facturaSchema.statics.generarNumeroFactura = async function(trainerId) {
  const year = new Date().getFullYear();
  const prefix = `F-${year}-`;

  const ultimaFactura = await this.findOne({
    trainerId,
    numeroFactura: new RegExp(`^${prefix}`)
  }).sort({ numeroFactura: -1 });

  let numero = 1;
  if (ultimaFactura) {
    const match = ultimaFactura.numeroFactura.match(/(\d+)$/);
    if (match) {
      numero = parseInt(match[1]) + 1;
    }
  }

  return `${prefix}${String(numero).padStart(6, '0')}`;
};

// Middleware pre-save
facturaSchema.pre('save', async function(next) {
  // Generar número de factura si no existe
  if (this.isNew && !this.numeroFactura) {
    this.numeroFactura = await this.constructor.generarNumeroFactura(this.trainerId);
  }

  // Actualizar estado a vencida si corresponde
  if (this.estado === 'Pendiente' && this.estaVencida) {
    this.estado = 'Vencida';
  }

  // Calcular totales
  this.calcularTotales();

  next();
});

// Middleware pre-find para popular referencias
facturaSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'clienteId',
    select: 'nombre email telefono'
  });
  next();
});

const Factura = mongoose.model('Factura', facturaSchema);

export default Factura;
