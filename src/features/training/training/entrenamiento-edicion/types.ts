// ============================================================================
// TYPES FOR PROFESSIONAL TRAINING EDITOR
// ============================================================================

export interface Ejercicio {
  id: string;
  nombre: string;
  categoria: string;
  musculos: string[];
  dificultad: 'principiante' | 'intermedio' | 'avanzado';
  equipamiento: string[];
  imagen?: string;
  video?: string;
  descripcion?: string;
  instrucciones?: string[];
  variaciones?: Ejercicio[];
  metrica: 'repeticiones' | 'tiempo' | 'distancia' | 'peso';
}

export interface Serie {
  id: string;
  numero: number;
  repeticiones?: number;
  peso?: number;
  tiempo?: number;
  distancia?: number;
  descanso: number; // segundos
  rpe?: number; // Rate of Perceived Exertion 1-10
  completada: boolean;
  notas?: string;
}

export interface EjercicioSesion {
  id: string;
  ejercicio: Ejercicio;
  series: Serie[];
  orden: number;
  notas?: string;
  variacion?: string;
  objetivo?: string;
}

export interface SesionEntrenamiento {
  id: string;
  nombre: string;
  fecha: string;
  hora: string;
  duracion: number; // minutos
  estado: 'pendiente' | 'en-progreso' | 'completado' | 'cancelado';
  ejercicios: EjercicioSesion[];
  notasEntrenador?: string;
  notasCliente?: string;
  ubicacion?: string;
  entrenador?: string;
  objetivo?: string;
  nivel?: string;
  equipamientoDisponible?: string[];
  restricciones?: string[];
  calentamiento?: string;
  enfriamiento?: string;
  cliente?: {
    id: string;
    nombre: string;
    avatar: string;
  };
  metricas?: {
    duracionReal: number;
    caloriasQuemadas: number;
    intensidadPromedio: number;
    satisfaccion: number;
    fatiga: number;
  };
}

export interface Entrenamiento {
  id: string;
  titulo: string;
  descripcion?: string;
  tipo: string;
  objetivo: string;
  nivel: string;
  estado: string;
  fechaInicio: string;
  fechaFin?: string;
  totalSemanas: number;
  semanaActual: number;
  diasPorSemana: number;
  progreso: number;
  adherencia: number;
  sesionesCompletadas: number;
  sesionesProgramadas: number;
  sesiones: SesionEntrenamiento[];
  plantillaId?: string;
  tieneComentarios?: boolean;
  requiereRevision?: boolean;
  conSeguimiento?: boolean;
  notasEntrenador?: string;
  notasCliente?: string;
  ultimaActividad?: string;
  entrenador?: string;
  cliente?: {
    id: string;
    nombre: string;
    avatar: string;
  };
}

export interface ClienteEntrenamiento {
  id: string;
  nombre: string;
  avatar: string;
  restricciones: string[];
  lesiones: string[];
  preferencias: string[];
  nivel: string;
  objetivos: string[];
}

// ============================================================================
// LINTER & VALIDATION
// ============================================================================

export type SeveridadLinter = 'info' | 'warn' | 'blocker';

export interface AlertaLinter {
  id: string;
  tipo: 'volumen_alto' | 'intensidad_baja' | 'descanso_insuficiente' | 'progresion' | 'equipamiento' | 'lesion';
  severidad: SeveridadLinter;
  mensaje: string;
  sesionId?: string;
  ejercicioId?: string;
  fix?: {
    label: string;
    action: () => void;
  };
}

// ============================================================================
// MACRO BRUSH PARA ENTRENAMIENTOS
// ============================================================================

export interface MacroBrushConfig {
  ambito: 'sesion' | 'semana' | 'seleccion';
  sesionSeleccionada?: string;
  ejerciciosSeleccionados?: string[];
  objetivos: {
    volumen?: number;
    intensidad?: number;
    frecuencia?: number;
  };
  tolerancia: 5 | 10; // porcentaje
}

export interface CambioMacroBrush {
  ejercicioId: string;
  seriesAntes: Serie[];
  seriesDespues: Serie[];
  volumenAntes: number;
  volumenDespues: number;
  intensidadAntes: number;
  intensidadDespues: number;
}

// ============================================================================
// PLAN B (SUSTITUCIONES)
// ============================================================================

export interface Sustitucion {
  ejercicio: Ejercicio;
  similitudMuscular: number; // 0-100
  similitudEquipamiento: number; // 0-100
  similitudDificultad: number; // 0-100
  razon: string;
}

// ============================================================================
// BATCH TRAINING
// ============================================================================

export interface SesionBatch {
  id: string;
  fecha: string;
  duracion: number; // minutos
  equipamientoDisponible: string[];
  ejercicios: EjercicioBatch[];
}

export interface EjercicioBatch {
  ejercicioId: string;
  ejercicio: Ejercicio;
  seriesTotales: number;
  distribucion: DistribucionBatch[];
}

export interface DistribucionBatch {
  sesionId: string;
  series: number;
}

// ============================================================================
// FILTERS & SEARCH
// ============================================================================

export interface FiltrosCatalogo {
  categoria?: string[];
  musculos?: string[];
  equipamiento?: string[];
  dificultad?: string[];
  tiempo?: { min: number; max: number };
  preferencias?: string[];
  restricciones?: string[]; // excluir
}

export interface ResultadoBusqueda {
  ejercicios: Ejercicio[];
  total: number;
}

// ============================================================================
// UNDO/REDO
// ============================================================================

export interface AccionHistorial {
  id: string;
  tipo: 'añadir' | 'eliminar' | 'editar' | 'mover' | 'macro_brush' | 'batch';
  timestamp: number;
  descripcion: string;
  estadoAntes: any;
  estadoDespues: any;
  deshacer: () => void;
  rehacer: () => void;
}

// ============================================================================
// LIVE SYNC
// ============================================================================

export type EstadoSync = 'guardando' | 'guardado' | 'error' | 'sincronizando';

export interface EstadoLiveSync {
  estado: EstadoSync;
  ultimoCambio?: Date;
  mensajeError?: string;
  visibleEnApp: boolean;
}

// ============================================================================
// METRICS & ANALYTICS
// ============================================================================

export interface MetricasEntrenamiento {
  volumenTotal: number;
  intensidadPromedio: number;
  frecuencia: number;
  adherencia: number;
  progreso: number;
  caloriasQuemadas: number;
  tiempoTotal: number;
}

export interface ProgresionSemanal {
  semana: number;
  volumen: number;
  intensidad: number;
  frecuencia: number;
  adherencia: number;
}

// ============================================================================
// OBJETIVOS DE ENTRENAMIENTO
// ============================================================================

export interface ObjetivosEntrenamiento {
  volumen: number;
  intensidad: number;
  frecuencia: number;
  duracion: number;
  calorias: number;
  adherencia: number;
}

// ============================================================================
// PLANTILLAS
// ============================================================================

export interface PlantillaEntrenamiento {
  id: string;
  nombre: string;
  descripcion: string;
  objetivo: string;
  nivel: string;
  duracion: number; // semanas
  sesiones: SesionPlantilla[];
  tags: string[];
  creador: string;
  fechaCreacion: string;
  usos: number;
  rating: number;
}

export interface SesionPlantilla {
  id: string;
  nombre: string;
  dia: number; // 1-7
  ejercicios: EjercicioPlantilla[];
  duracion: number;
  objetivo: string;
}

export interface EjercicioPlantilla {
  ejercicioId: string;
  series: number;
  repeticiones?: number;
  peso?: number;
  tiempo?: number;
  descanso: number;
  orden: number;
  notas?: string;
}
