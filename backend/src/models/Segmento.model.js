import mongoose from 'mongoose';

const segmentoSchema = new mongoose.Schema({
  // Relación con el Trainer
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: [true, 'El trainer es requerido'],
    index: true
  },

  // Información básica del segmento
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
  },

  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    maxlength: [500, 'La descripción no puede exceder los 500 caracteres']
  },

  // Tipo de segmento
  tipoSegmento: {
    type: String,
    enum: ['automatico', 'manual', 'hibrido'],
    default: 'automatico',
    index: true
  },

  // Reglas para segmentación automática
  reglas: [{
    id: Number,
    tipo: {
      type: String,
      enum: ['etiqueta', 'actividad', 'fecha', 'estado', 'personalizado'],
      required: true
    },
    operador: {
      type: String,
      enum: ['incluye', 'excluye', 'igual', 'diferente', 'mayor', 'menor', 'entre'],
      required: true
    },
    valor: {
      type: String,
      required: true
    },
    combinador: {
      type: String,
      enum: ['AND', 'OR'],
      default: 'AND'
    }
  }],

  // Clientes agregados manualmente (opcional)
  clientesManualIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente'
  }],

  // Color para identificación visual
  color: {
    type: String,
    default: '#6366f1', // Indigo
    match: /^#[0-9A-F]{6}$/i
  },

  // Icono (emoji o nombre de icono)
  icono: {
    type: String,
    default: '🎯'
  },

  // Estado del segmento
  activo: {
    type: Boolean,
    default: true,
    index: true
  },

  // Contadores y estadísticas
  stats: {
    totalMiembros: {
      type: Number,
      default: 0
    },
    miembrosAutomaticos: {
      type: Number,
      default: 0
    },
    miembrosManuales: {
      type: Number,
      default: 0
    },
    ultimaActualizacion: {
      type: Date,
      default: Date.now
    }
  },

  // Configuración de actualización automática
  autoActualizar: {
    type: Boolean,
    default: true
  },

  frecuenciaActualizacion: {
    type: String,
    enum: ['tiempo-real', 'diaria', 'semanal', 'manual'],
    default: 'diaria'
  },

  // Metadata
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices compuestos para búsquedas eficientes
segmentoSchema.index({ trainerId: 1, tipoSegmento: 1 });
segmentoSchema.index({ trainerId: 1, activo: 1 });
segmentoSchema.index({ trainerId: 1, isDeleted: 1 });
segmentoSchema.index({ trainerId: 1, 'stats.totalMiembros': -1 });

// Índice de texto para búsquedas
segmentoSchema.index({
  nombre: 'text',
  descripcion: 'text'
});

// Virtual para obtener clientes poblados
segmentoSchema.virtual('clientes', {
  ref: 'Cliente',
  localField: 'clientesManualIds',
  foreignField: '_id'
});

// Virtual para porcentaje de miembros manuales
segmentoSchema.virtual('porcentajeManuales').get(function() {
  if (this.stats.totalMiembros === 0) return 0;
  return Math.round((this.stats.miembrosManuales / this.stats.totalMiembros) * 100);
});

// Métodos de instancia
segmentoSchema.methods.agregarCliente = async function(clienteId) {
  if (!this.clientesManualIds.includes(clienteId)) {
    this.clientesManualIds.push(clienteId);
    await this.recalcularStats();
    return this.save();
  }
  return this;
};

segmentoSchema.methods.eliminarCliente = async function(clienteId) {
  this.clientesManualIds = this.clientesManualIds.filter(
    id => id.toString() !== clienteId.toString()
  );
  await this.recalcularStats();
  return this.save();
};

segmentoSchema.methods.agregarClientesMultiples = async function(clienteIds) {
  const nuevosIds = clienteIds.filter(
    id => !this.clientesManualIds.includes(id)
  );
  this.clientesManualIds.push(...nuevosIds);
  await this.recalcularStats();
  return this.save();
};

segmentoSchema.methods.recalcularStats = async function() {
  const Cliente = mongoose.model('Cliente');

  // Contar clientes manuales
  const miembrosManuales = this.clientesManualIds.length;

  // Contar clientes que cumplen las reglas (si hay reglas)
  let miembrosAutomaticos = 0;
  if (this.reglas.length > 0) {
    // Aquí implementarías la lógica de evaluación de reglas
    // Por ahora, es un placeholder
    const query = this.buildQueryFromRules();
    miembrosAutomaticos = await Cliente.countDocuments(query);
  }

  // Actualizar stats
  this.stats.miembrosManuales = miembrosManuales;
  this.stats.miembrosAutomaticos = miembrosAutomaticos;
  this.stats.totalMiembros = miembrosManuales + miembrosAutomaticos;
  this.stats.ultimaActualizacion = new Date();

  // Determinar tipo de segmento
  if (miembrosManuales > 0 && miembrosAutomaticos > 0) {
    this.tipoSegmento = 'hibrido';
  } else if (miembrosManuales > 0) {
    this.tipoSegmento = 'manual';
  } else {
    this.tipoSegmento = 'automatico';
  }

  return this;
};

segmentoSchema.methods.buildQueryFromRules = function() {
  const query = {
    trainerId: this.trainerId,
    isDeleted: false
  };

  if (this.reglas.length === 0) {
    return query;
  }

  // Construir query basado en reglas
  const conditions = [];

  this.reglas.forEach(regla => {
    let condition = {};

    switch (regla.tipo) {
      case 'etiqueta':
        if (regla.operador === 'incluye') {
          condition = { etiquetas: { $in: [regla.valor] } };
        } else if (regla.operador === 'excluye') {
          condition = { etiquetas: { $nin: [regla.valor] } };
        }
        break;

      case 'estado':
        if (regla.operador === 'igual') {
          condition = { estado: regla.valor };
        } else if (regla.operador === 'diferente') {
          condition = { estado: { $ne: regla.valor } };
        }
        break;

      case 'actividad':
        // Implementar lógica de actividad
        const dias = parseInt(regla.valor) || 30;
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - dias);

        if (regla.operador === 'mayor') {
          condition = { ultimaActividad: { $lt: fechaLimite } };
        } else if (regla.operador === 'menor') {
          condition = { ultimaActividad: { $gte: fechaLimite } };
        }
        break;

      case 'fecha':
        const fecha = new Date(regla.valor);
        if (regla.operador === 'mayor') {
          condition = { fechaAlta: { $gt: fecha } };
        } else if (regla.operador === 'menor') {
          condition = { fechaAlta: { $lt: fecha } };
        }
        break;
    }

    if (Object.keys(condition).length > 0) {
      conditions.push(condition);
    }
  });

  // Combinar condiciones según el combinador
  if (conditions.length > 0) {
    // Determinar si usar AND u OR basado en el primer combinador
    const useOr = this.reglas[0]?.combinador === 'OR';
    query[useOr ? '$or' : '$and'] = conditions;
  }

  return query;
};

segmentoSchema.methods.obtenerMiembros = async function() {
  const Cliente = mongoose.model('Cliente');

  let miembrosAutomaticos = [];
  let miembrosManuales = [];

  // Obtener clientes automáticos (por reglas)
  if (this.reglas.length > 0) {
    const query = this.buildQueryFromRules();
    miembrosAutomaticos = await Cliente.find(query).select('nombre email foto estado etiquetas');
  }

  // Obtener clientes manuales
  if (this.clientesManualIds.length > 0) {
    miembrosManuales = await Cliente.find({
      _id: { $in: this.clientesManualIds },
      trainerId: this.trainerId,
      isDeleted: false
    }).select('nombre email foto estado etiquetas');
  }

  // Combinar y eliminar duplicados
  const todosIds = new Set();
  const miembros = [];

  [...miembrosAutomaticos, ...miembrosManuales].forEach(cliente => {
    const id = cliente._id.toString();
    if (!todosIds.has(id)) {
      todosIds.add(id);
      miembros.push(cliente);
    }
  });

  return miembros;
};

// Métodos estáticos
segmentoSchema.statics.findByTrainer = function(trainerId, filtros = {}) {
  const query = { trainerId, isDeleted: false };

  if (filtros.tipoSegmento) {
    query.tipoSegmento = filtros.tipoSegmento;
  }

  if (filtros.activo !== undefined) {
    query.activo = filtros.activo;
  }

  return this.find(query).sort({ 'stats.totalMiembros': -1 });
};

segmentoSchema.statics.searchByTrainer = function(trainerId, searchText) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { nombre: { $regex: searchText, $options: 'i' } },
      { descripcion: { $regex: searchText, $options: 'i' } }
    ]
  });
};

segmentoSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const automaticos = await this.countDocuments({
    trainerId,
    tipoSegmento: 'automatico',
    isDeleted: false
  });
  const manuales = await this.countDocuments({
    trainerId,
    tipoSegmento: 'manual',
    isDeleted: false
  });
  const hibridos = await this.countDocuments({
    trainerId,
    tipoSegmento: 'hibrido',
    isDeleted: false
  });

  // Calcular total de miembros en todos los segmentos
  const segmentos = await this.find({ trainerId, isDeleted: false });
  const totalMiembros = segmentos.reduce((sum, seg) => sum + seg.stats.totalMiembros, 0);
  const promedioMiembros = total > 0 ? Math.round(totalMiembros / total) : 0;

  return {
    total,
    automaticos,
    manuales,
    hibridos,
    totalMiembros,
    promedioMiembros
  };
};

// Middleware pre-save
segmentoSchema.pre('save', async function(next) {
  // Recalcular stats antes de guardar si cambió algo relevante
  if (this.isModified('reglas') || this.isModified('clientesManualIds')) {
    await this.recalcularStats();
  }
  next();
});

const Segmento = mongoose.model('Segmento', segmentoSchema);

export default Segmento;
