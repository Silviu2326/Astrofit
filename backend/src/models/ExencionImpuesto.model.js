import mongoose from 'mongoose';

const exencionImpuestoSchema = new mongoose.Schema({
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
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  // Tipo de exención
  tipoExencion: {
    type: String,
    required: [true, 'El tipo de exención es requerido'],
    enum: ['IVA', 'IRPF', 'IS', 'GENERAL']
  },
  // Criterios de aplicación
  criterio: {
    type: String,
    required: [true, 'El criterio es requerido'],
    trim: true,
    maxlength: [500, 'El criterio no puede exceder 500 caracteres']
  },
  // Código de exención (ej: E1, E2, etc.)
  codigo: {
    type: String,
    trim: true,
    uppercase: true,
    maxlength: [50, 'El código no puede exceder 50 caracteres']
  },
  // Porcentaje de exención (0-100)
  porcentajeExencion: {
    type: Number,
    min: [0, 'El porcentaje no puede ser negativo'],
    max: [100, 'El porcentaje no puede exceder 100'],
    default: 100
  },
  // Aplicación automática
  aplicacionAutomatica: {
    type: Boolean,
    default: false
  },
  // Condiciones para aplicar
  condiciones: [{
    campo: {
      type: String,
      required: true
    },
    operador: {
      type: String,
      enum: ['igual', 'diferente', 'mayor', 'menor', 'contiene', 'empieza_con'],
      required: true
    },
    valor: {
      type: String,
      required: true
    }
  }],
  // Base legal
  baseLegal: {
    type: String,
    trim: true,
    maxlength: [500, 'La base legal no puede exceder 500 caracteres']
  },
  articulo: {
    type: String,
    trim: true,
    maxlength: [100, 'El artículo no puede exceder 100 caracteres']
  },
  // Vigencia
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es requerida'],
    default: Date.now
  },
  fechaFin: {
    type: Date
  },
  activo: {
    type: Boolean,
    default: true
  },
  // Documentación requerida
  documentacionRequerida: [{
    type: String,
    trim: true
  }],
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
exencionImpuestoSchema.index({ trainer: 1, tipoExencion: 1 });
exencionImpuestoSchema.index({ trainer: 1, activo: 1 });
exencionImpuestoSchema.index({ trainer: 1, codigo: 1 });
exencionImpuestoSchema.index({ trainer: 1, isActive: 1 });

// Virtual para verificar si está vigente
exencionImpuestoSchema.virtual('vigente').get(function() {
  const ahora = new Date();
  const despuesFechaInicio = this.fechaInicio <= ahora;
  const antesFechaFin = !this.fechaFin || this.fechaFin >= ahora;
  return this.activo && despuesFechaInicio && antesFechaFin;
});

// Método para verificar si aplica a un cliente/operación
exencionImpuestoSchema.methods.aplicaA = function(datos) {
  if (!this.vigente) return false;

  // Si no hay condiciones, aplicar automáticamente si está activa
  if (!this.condiciones || this.condiciones.length === 0) {
    return this.aplicacionAutomatica;
  }

  // Verificar todas las condiciones
  return this.condiciones.every(condicion => {
    const valorDato = datos[condicion.campo];
    const valorCondicion = condicion.valor;

    switch (condicion.operador) {
      case 'igual':
        return valorDato == valorCondicion;
      case 'diferente':
        return valorDato != valorCondicion;
      case 'mayor':
        return parseFloat(valorDato) > parseFloat(valorCondicion);
      case 'menor':
        return parseFloat(valorDato) < parseFloat(valorCondicion);
      case 'contiene':
        return String(valorDato).includes(valorCondicion);
      case 'empieza_con':
        return String(valorDato).startsWith(valorCondicion);
      default:
        return false;
    }
  });
};

// Método para calcular exención sobre un monto
exencionImpuestoSchema.methods.calcularExencion = function(monto) {
  return monto * (this.porcentajeExencion / 100);
};

// Método estático para obtener exenciones activas
exencionImpuestoSchema.statics.findActivasByTrainer = function(trainerId, tipoExencion = null) {
  const query = {
    trainer: trainerId,
    activo: true,
    isActive: true,
    fechaInicio: { $lte: new Date() }
  };

  // Verificar que no haya expirado
  query.$or = [
    { fechaFin: { $exists: false } },
    { fechaFin: null },
    { fechaFin: { $gte: new Date() } }
  ];

  if (tipoExencion) {
    query.tipoExencion = tipoExencion;
  }

  return this.find(query).sort({ nombre: 1 });
};

// Método estático para obtener por código
exencionImpuestoSchema.statics.findByCodigo = function(trainerId, codigo) {
  return this.findOne({
    trainer: trainerId,
    codigo: codigo.toUpperCase(),
    activo: true,
    isActive: true
  });
};

// Método estático para encontrar exenciones aplicables
exencionImpuestoSchema.statics.findAplicables = async function(trainerId, datos, tipoExencion) {
  const exenciones = await this.findActivasByTrainer(trainerId, tipoExencion);

  return exenciones.filter(exencion => {
    return exencion.aplicaA(datos);
  });
};

// Middleware pre-save
exencionImpuestoSchema.pre('save', function(next) {
  // Si la fecha de fin es anterior a la de inicio, error
  if (this.fechaFin && this.fechaFin < this.fechaInicio) {
    next(new Error('La fecha de fin no puede ser anterior a la fecha de inicio'));
    return;
  }

  next();
});

// Configurar toJSON para incluir virtuals
exencionImpuestoSchema.set('toJSON', { virtuals: true });
exencionImpuestoSchema.set('toObject', { virtuals: true });

export default mongoose.model('ExencionImpuesto', exencionImpuestoSchema);
