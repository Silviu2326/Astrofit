import mongoose from 'mongoose';

const retencionIRPFSchema = new mongoose.Schema({
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
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'El cliente es requerido'],
    index: true
  },
  // Datos de la retención
  baseRetencion: {
    type: Number,
    required: [true, 'La base de retención es requerida'],
    min: [0, 'La base de retención no puede ser negativa']
  },
  porcentaje: {
    type: Number,
    required: [true, 'El porcentaje de retención es requerido'],
    min: [0, 'El porcentaje no puede ser negativo'],
    max: [100, 'El porcentaje no puede exceder 100'],
    default: 15
  },
  importeRetenido: {
    type: Number,
    required: [true, 'El importe retenido es requerido'],
    min: [0, 'El importe retenido no puede ser negativo']
  },
  // Periodo fiscal
  trimestre: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  año: {
    type: Number,
    required: true,
    min: 2000,
    max: 2100
  },
  periodo: {
    type: String,
    required: true
  },
  // Fecha de la retención
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Información de la factura
  numeroFactura: {
    type: String,
    trim: true
  },
  fechaFactura: {
    type: Date
  },
  // Datos del cliente (copia de seguridad)
  datosCliente: {
    nombre: String,
    nif: String,
    direccion: String
  },
  // Estado de la retención
  estado: {
    type: String,
    enum: ['pendiente', 'declarado', 'pagado'],
    default: 'pendiente'
  },
  // Declaración asociada (Modelo 111)
  modelo111Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modelo111'
  },
  // Certificado de retención
  certificadoEmitido: {
    type: Boolean,
    default: false
  },
  fechaEmisionCertificado: {
    type: Date
  },
  archivoCertificado: {
    type: String,
    trim: true
  },
  // Notas
  notas: {
    type: String,
    trim: true,
    maxlength: [1000, 'Las notas no pueden exceder 1000 caracteres']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices compuestos para búsquedas eficientes
retencionIRPFSchema.index({ trainer: 1, fecha: -1 });
retencionIRPFSchema.index({ trainer: 1, año: -1, trimestre: -1 });
retencionIRPFSchema.index({ trainer: 1, cliente: 1 });
retencionIRPFSchema.index({ trainer: 1, estado: 1 });
retencionIRPFSchema.index({ trainer: 1, isActive: 1 });
retencionIRPFSchema.index({ factura: 1 });

// Virtual para el periodo completo
retencionIRPFSchema.virtual('periodoCompleto').get(function() {
  return `${this.año}-Q${this.trimestre}`;
});

// Método para calcular el importe retenido
retencionIRPFSchema.methods.calcularImporte = function() {
  this.importeRetenido = this.baseRetencion * (this.porcentaje / 100);
  return this.importeRetenido;
};

// Método para emitir certificado
retencionIRPFSchema.methods.emitirCertificado = function(archivoUrl) {
  this.certificadoEmitido = true;
  this.fechaEmisionCertificado = new Date();
  if (archivoUrl) this.archivoCertificado = archivoUrl;
  return this.save();
};

// Método para marcar como declarado
retencionIRPFSchema.methods.marcarComoDeclarado = function(modelo111Id) {
  this.estado = 'declarado';
  if (modelo111Id) this.modelo111Id = modelo111Id;
  return this.save();
};

// Método estático para obtener retenciones por trainer
retencionIRPFSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = {
    trainer: trainerId,
    isActive: true
  };

  if (filters.año) query.año = filters.año;
  if (filters.trimestre) query.trimestre = filters.trimestre;
  if (filters.estado) query.estado = filters.estado;
  if (filters.clienteId) query.cliente = filters.clienteId;

  if (filters.fechaDesde) {
    query.fecha = { ...query.fecha, $gte: new Date(filters.fechaDesde) };
  }

  if (filters.fechaHasta) {
    query.fecha = { ...query.fecha, $lte: new Date(filters.fechaHasta) };
  }

  return this.find(query)
    .populate('factura')
    .populate('cliente')
    .sort({ fecha: -1 });
};

// Método estático para obtener retenciones por periodo
retencionIRPFSchema.statics.findByPeriodo = function(trainerId, año, trimestre) {
  return this.find({
    trainer: trainerId,
    año,
    trimestre,
    isActive: true
  })
    .populate('factura')
    .populate('cliente')
    .sort({ fecha: -1 });
};

// Método estático para obtener retenciones por cliente
retencionIRPFSchema.statics.findByCliente = function(clienteId, año = null) {
  const query = {
    cliente: clienteId,
    isActive: true
  };

  if (año) query.año = año;

  return this.find(query)
    .populate('factura')
    .sort({ fecha: -1 });
};

// Método estático para obtener resumen trimestral
retencionIRPFSchema.statics.getResumenTrimestral = async function(trainerId, año, trimestre) {
  const retenciones = await this.find({
    trainer: trainerId,
    año,
    trimestre,
    isActive: true
  }).populate('cliente');

  const totalRetenciones = retenciones.length;
  const totalBaseRetencion = retenciones.reduce((sum, r) => sum + r.baseRetencion, 0);
  const totalImporteRetenido = retenciones.reduce((sum, r) => sum + r.importeRetenido, 0);

  // Agrupar por cliente
  const porCliente = {};
  retenciones.forEach(r => {
    const clienteId = r.cliente._id.toString();
    if (!porCliente[clienteId]) {
      porCliente[clienteId] = {
        cliente: {
          id: r.cliente._id,
          nombre: r.cliente.nombre,
          nif: r.datosCliente?.nif || r.cliente.nif
        },
        cantidadRetenciones: 0,
        totalBase: 0,
        totalRetenido: 0
      };
    }
    porCliente[clienteId].cantidadRetenciones++;
    porCliente[clienteId].totalBase += r.baseRetencion;
    porCliente[clienteId].totalRetenido += r.importeRetenido;
  });

  return {
    periodo: `${año}-Q${trimestre}`,
    totalRetenciones,
    totalBaseRetencion,
    totalImporteRetenido,
    porCliente: Object.values(porCliente),
    pendientes: retenciones.filter(r => r.estado === 'pendiente').length,
    declaradas: retenciones.filter(r => r.estado === 'declarado').length,
    certificadosEmitidos: retenciones.filter(r => r.certificadoEmitido).length
  };
};

// Método estático para obtener resumen anual
retencionIRPFSchema.statics.getResumenAnual = async function(trainerId, año) {
  const retenciones = await this.find({
    trainer: trainerId,
    año,
    isActive: true
  }).populate('cliente');

  const totalRetenciones = retenciones.length;
  const totalBaseRetencion = retenciones.reduce((sum, r) => sum + r.baseRetencion, 0);
  const totalImporteRetenido = retenciones.reduce((sum, r) => sum + r.importeRetenido, 0);

  // Agrupar por trimestre
  const porTrimestre = {};
  for (let t = 1; t <= 4; t++) {
    const retencionesT = retenciones.filter(r => r.trimestre === t);
    porTrimestre[`T${t}`] = {
      trimestre: t,
      cantidad: retencionesT.length,
      totalBase: retencionesT.reduce((sum, r) => sum + r.baseRetencion, 0),
      totalRetenido: retencionesT.reduce((sum, r) => sum + r.importeRetenido, 0)
    };
  }

  return {
    año,
    totalRetenciones,
    totalBaseRetencion,
    totalImporteRetenido,
    porTrimestre,
    certificadosEmitidos: retenciones.filter(r => r.certificadoEmitido).length
  };
};

// Middleware pre-save
retencionIRPFSchema.pre('save', function(next) {
  // Calcular importe retenido si cambió la base o el porcentaje
  if (this.isModified('baseRetencion') || this.isModified('porcentaje')) {
    this.calcularImporte();
  }

  // Calcular periodo si cambió el año o trimestre
  if (this.isModified('año') || this.isModified('trimestre')) {
    this.periodo = `${this.año}-Q${this.trimestre}`;
  }

  // Calcular trimestre desde la fecha si no está definido
  if (!this.trimestre && this.fecha) {
    const mes = this.fecha.getMonth() + 1;
    this.trimestre = Math.ceil(mes / 3);
  }

  // Establecer año desde la fecha si no está definido
  if (!this.año && this.fecha) {
    this.año = this.fecha.getFullYear();
  }

  next();
});

// Configurar toJSON para incluir virtuals
retencionIRPFSchema.set('toJSON', { virtuals: true });
retencionIRPFSchema.set('toObject', { virtuals: true });

export default mongoose.model('RetencionIRPF', retencionIRPFSchema);
