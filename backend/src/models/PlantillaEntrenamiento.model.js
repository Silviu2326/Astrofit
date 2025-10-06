import mongoose from 'mongoose';

const plantillaEntrenamientoSchema = new mongoose.Schema({
  // Relación con el Trainer
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true,
    index: true
  },

  // Información básica
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },

  descripcion: {
    type: String,
    trim: true,
    default: ''
  },

  // Objetivo del entrenamiento
  objetivo: {
    type: String,
    enum: [
      'perdida-peso',
      'ganancia-musculo',
      'fuerza',
      'resistencia',
      'flexibilidad',
      'rehabilitacion',
      'mantenimiento'
    ],
    required: true
  },

  // Nivel
  nivel: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado', 'experto'],
    required: true
  },

  // Modalidad
  modalidad: {
    type: String,
    enum: [
      'gym',
      'casa',
      'exterior',
      'funcional',
      'crossfit',
      'yoga',
      'pilates',
      'otro'
    ],
    required: true
  },

  // Duración del programa
  duracionSemanas: {
    type: Number,
    min: 1,
    max: 52,
    default: 4
  },

  // Frecuencia semanal
  diasPorSemana: {
    type: Number,
    min: 1,
    max: 7,
    default: 3
  },

  // Duración por sesión (en minutos)
  duracionSesion: {
    type: Number,
    min: 15,
    max: 180,
    default: 60
  },

  // Estructura de ejercicios por día
  diasEntrenamiento: [{
    dia: {
      type: Number,
      min: 1,
      max: 7,
      required: true
    },
    nombre: {
      type: String,
      trim: true
    },
    ejercicios: [{
      ejercicioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ejercicio'
      },
      series: {
        type: Number,
        min: 1,
        default: 3
      },
      repeticiones: {
        type: String, // Puede ser "10-12" o "15" o "Max"
        default: '10'
      },
      descanso: {
        type: Number, // En segundos
        default: 60
      },
      notas: String,
      orden: Number
    }],
    calentamiento: {
      duracion: Number, // En minutos
      descripcion: String
    },
    enfriamiento: {
      duracion: Number, // En minutos
      descripcion: String
    }
  }],

  // Equipamiento necesario
  equipamiento: [{
    type: String,
    trim: true
  }],

  // Grupos musculares trabajados
  gruposMusculares: [{
    type: String,
    enum: [
      'pecho',
      'espalda',
      'hombros',
      'brazos',
      'piernas',
      'core',
      'gluteos',
      'pantorrillas',
      'todo-cuerpo'
    ]
  }],

  // Etiquetas para búsqueda y categorización
  etiquetas: [{
    type: String,
    trim: true
  }],

  // Visibilidad de la plantilla
  visibilidad: {
    type: String,
    enum: ['privada', 'publica', 'equipo'],
    default: 'privada'
  },

  // Indicador de si es una plantilla del sistema
  esPlantillaSistema: {
    type: Boolean,
    default: false
  },

  // Imagen de la plantilla
  imagen: {
    type: String,
    default: ''
  },

  // Estado
  estado: {
    type: String,
    enum: ['activa', 'borrador', 'archivada'],
    default: 'activa'
  },

  // Métricas de uso
  vecesUtilizada: {
    type: Number,
    default: 0
  },

  ultimoUso: {
    type: Date,
    default: null
  },

  // Favorito
  esFavorita: {
    type: Boolean,
    default: false
  },

  // Calificación y reviews
  calificacion: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  numeroCalificaciones: {
    type: Number,
    default: 0
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
plantillaEntrenamientoSchema.index({ trainerId: 1, nombre: 1 });
plantillaEntrenamientoSchema.index({ trainerId: 1, objetivo: 1 });
plantillaEntrenamientoSchema.index({ trainerId: 1, nivel: 1 });
plantillaEntrenamientoSchema.index({ trainerId: 1, modalidad: 1 });
plantillaEntrenamientoSchema.index({ trainerId: 1, visibilidad: 1 });
plantillaEntrenamientoSchema.index({ trainerId: 1, estado: 1 });
plantillaEntrenamientoSchema.index({ trainerId: 1, esFavorita: 1 });
plantillaEntrenamientoSchema.index({ trainerId: 1, isDeleted: 1 });
plantillaEntrenamientoSchema.index({ visibilidad: 1, isDeleted: 1 }); // Para plantillas públicas
plantillaEntrenamientoSchema.index({ trainerId: 1, vecesUtilizada: -1 });

// Texto completo para búsquedas
plantillaEntrenamientoSchema.index({
  nombre: 'text',
  descripcion: 'text',
  etiquetas: 'text'
});

// Métodos de instancia
plantillaEntrenamientoSchema.methods.incrementarUso = function() {
  this.vecesUtilizada += 1;
  this.ultimoUso = new Date();
  return this.save();
};

plantillaEntrenamientoSchema.methods.toggleFavorita = function() {
  this.esFavorita = !this.esFavorita;
  return this.save();
};

plantillaEntrenamientoSchema.methods.agregarCalificacion = function(puntos) {
  const totalPuntos = (this.calificacion * this.numeroCalificaciones) + puntos;
  this.numeroCalificaciones += 1;
  this.calificacion = totalPuntos / this.numeroCalificaciones;
  return this.save();
};

plantillaEntrenamientoSchema.methods.cambiarEstado = function(nuevoEstado) {
  this.estado = nuevoEstado;
  return this.save();
};

plantillaEntrenamientoSchema.methods.cambiarVisibilidad = function(nuevaVisibilidad) {
  this.visibilidad = nuevaVisibilidad;
  return this.save();
};

// Métodos estáticos
plantillaEntrenamientoSchema.statics.findByTrainer = function(trainerId, filters = {}) {
  const query = { trainerId, isDeleted: false };

  if (filters.objetivo) {
    query.objetivo = filters.objetivo;
  }

  if (filters.nivel) {
    query.nivel = filters.nivel;
  }

  if (filters.modalidad) {
    query.modalidad = filters.modalidad;
  }

  if (filters.visibilidad) {
    query.visibilidad = filters.visibilidad;
  }

  if (filters.estado) {
    query.estado = filters.estado;
  }

  if (filters.esFavorita !== undefined) {
    query.esFavorita = filters.esFavorita;
  }

  if (filters.etiquetas && filters.etiquetas.length > 0) {
    query.etiquetas = { $all: filters.etiquetas };
  }

  return this.find(query);
};

plantillaEntrenamientoSchema.statics.findPublicas = function(filters = {}) {
  const query = {
    visibilidad: 'publica',
    estado: 'activa',
    isDeleted: false
  };

  if (filters.objetivo) {
    query.objetivo = filters.objetivo;
  }

  if (filters.nivel) {
    query.nivel = filters.nivel;
  }

  if (filters.modalidad) {
    query.modalidad = filters.modalidad;
  }

  return this.find(query).populate('trainerId', 'nombre apellidos');
};

plantillaEntrenamientoSchema.statics.searchByTrainer = function(trainerId, searchText) {
  return this.find({
    trainerId,
    isDeleted: false,
    $or: [
      { nombre: { $regex: searchText, $options: 'i' } },
      { descripcion: { $regex: searchText, $options: 'i' } },
      { etiquetas: { $regex: searchText, $options: 'i' } }
    ]
  });
};

plantillaEntrenamientoSchema.statics.getStatsByTrainer = async function(trainerId) {
  const total = await this.countDocuments({ trainerId, isDeleted: false });
  const activas = await this.countDocuments({ trainerId, estado: 'activa', isDeleted: false });
  const borradores = await this.countDocuments({ trainerId, estado: 'borrador', isDeleted: false });
  const favoritas = await this.countDocuments({ trainerId, esFavorita: true, isDeleted: false });
  const publicas = await this.countDocuments({ trainerId, visibilidad: 'publica', isDeleted: false });

  // Plantillas por objetivo
  const porObjetivo = await this.aggregate([
    { $match: { trainerId: new mongoose.Types.ObjectId(trainerId), isDeleted: false } },
    { $group: { _id: '$objetivo', count: { $sum: 1 } } }
  ]);

  // Plantillas más usadas
  const masUsadas = await this.find({ trainerId, isDeleted: false })
    .sort({ vecesUtilizada: -1 })
    .limit(10)
    .select('nombre vecesUtilizada ultimoUso');

  return {
    total,
    activas,
    borradores,
    favoritas,
    publicas,
    porObjetivo,
    masUsadas
  };
};

// Middleware pre-save
plantillaEntrenamientoSchema.pre('save', function(next) {
  // Asegurar que las etiquetas no tengan duplicados
  this.etiquetas = [...new Set(this.etiquetas)];

  // Asegurar que el equipamiento no tenga duplicados
  this.equipamiento = [...new Set(this.equipamiento)];

  // Asegurar que los grupos musculares no tengan duplicados
  this.gruposMusculares = [...new Set(this.gruposMusculares)];

  // Ordenar ejercicios por día
  this.diasEntrenamiento.forEach(dia => {
    dia.ejercicios.sort((a, b) => (a.orden || 0) - (b.orden || 0));
  });

  next();
});

const PlantillaEntrenamiento = mongoose.model('PlantillaEntrenamiento', plantillaEntrenamientoSchema);

export default PlantillaEntrenamiento;
