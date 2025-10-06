import mongoose from 'mongoose';

const gastoSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido']
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es requerida'],
    default: Date.now
  },
  concepto: {
    type: String,
    required: [true, 'El concepto es requerido'],
    trim: true,
    maxlength: [200, 'El concepto no puede exceder 200 caracteres']
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
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
  subcategoria: {
    type: String,
    trim: true,
    maxlength: [100, 'La subcategoría no puede exceder 100 caracteres']
  },
  proveedor: {
    type: String,
    required: [true, 'El proveedor es requerido'],
    trim: true,
    maxlength: [200, 'El proveedor no puede exceder 200 caracteres']
  },
  monto: {
    type: Number,
    required: [true, 'El monto es requerido'],
    min: [0, 'El monto no puede ser negativo']
  },
  metodoPago: {
    type: String,
    required: [true, 'El método de pago es requerido'],
    enum: ['Transferencia', 'Tarjeta', 'Efectivo', 'Domiciliación', 'Otro']
  },
  estado: {
    type: String,
    required: [true, 'El estado es requerido'],
    enum: ['Pagado', 'Pendiente', 'Aprobado', 'Rechazado'],
    default: 'Pendiente'
  },
  referencia: {
    type: String,
    trim: true,
    maxlength: [100, 'La referencia no puede exceder 100 caracteres']
  },
  notas: {
    type: String,
    trim: true,
    maxlength: [2000, 'Las notas no pueden exceder 2000 caracteres']
  },
  esRecurrente: {
    type: Boolean,
    default: false
  },
  frecuencia: {
    type: String,
    enum: ['Semanal', 'Mensual', 'Trimestral', 'Anual', null],
    default: null
  },
  proximaRecurrencia: {
    type: Date,
    default: null
  },
  tieneFactura: {
    type: Boolean,
    default: false
  },
  facturaUrl: {
    type: String,
    trim: true,
    default: null
  },
  archivoAdjunto: {
    type: String,
    trim: true,
    default: null
  },
  etiquetas: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para mejorar las consultas
gastoSchema.index({ trainer: 1, fecha: -1 });
gastoSchema.index({ trainer: 1, categoria: 1 });
gastoSchema.index({ trainer: 1, estado: 1 });
gastoSchema.index({ trainer: 1, proveedor: 1 });
gastoSchema.index({ fecha: -1 });

// Método virtual para obtener el periodo (año-mes)
gastoSchema.virtual('periodo').get(function() {
  const fecha = new Date(this.fecha);
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
});

// Método para calcular la próxima recurrencia
gastoSchema.methods.calcularProximaRecurrencia = function() {
  if (!this.esRecurrente || !this.frecuencia) {
    return null;
  }

  const fecha = new Date(this.fecha);
  let proxima = new Date(fecha);

  switch (this.frecuencia) {
    case 'Semanal':
      proxima.setDate(proxima.getDate() + 7);
      break;
    case 'Mensual':
      proxima.setMonth(proxima.getMonth() + 1);
      break;
    case 'Trimestral':
      proxima.setMonth(proxima.getMonth() + 3);
      break;
    case 'Anual':
      proxima.setFullYear(proxima.getFullYear() + 1);
      break;
  }

  return proxima;
};

// Hook para calcular automáticamente la próxima recurrencia antes de guardar
gastoSchema.pre('save', function(next) {
  if (this.esRecurrente && this.frecuencia && this.isModified('fecha')) {
    this.proximaRecurrencia = this.calcularProximaRecurrencia();
  } else if (!this.esRecurrente) {
    this.proximaRecurrencia = null;
    this.frecuencia = null;
  }
  next();
});

// Configurar toJSON para incluir virtuals
gastoSchema.set('toJSON', { virtuals: true });
gastoSchema.set('toObject', { virtuals: true });

export default mongoose.model('Gasto', gastoSchema);
