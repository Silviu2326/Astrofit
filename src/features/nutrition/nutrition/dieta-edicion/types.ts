// ============================================================================
// TYPES FOR PROFESSIONAL DIET EDITOR
// ============================================================================

export interface Macros {
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  calorias: number;
  fibra?: number;
  azucar?: number;
  sal?: number;
}

export interface Alergeno {
  id: string;
  nombre: string;
  icono: string;
}

export interface Receta {
  id: string;
  nombre: string;
  imagen?: string;
  macros: Macros;
  tiempo: number; // minutos
  coste: number; // €
  alergenos: Alergeno[];
  saciedad: 1 | 2 | 3 | 4 | 5;
  sabor: string[]; // ['dulce', 'salado', 'umami']
  textura: string[]; // ['crujiente', 'cremoso', 'jugoso']
  equipo: string[]; // ['horno', 'airfryer', 'microondas']
  batchFriendly: boolean;
  congelable: boolean;
  requiereFrio: boolean;
  ingredientes: Ingrediente[];
  pasos?: string[];
}

export interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  alergenos: string[];
}

export interface Alimento {
  id: string;
  nombre: string;
  macrosPor100g: Macros;
  alergenos: Alergeno[];
  coste: number;
}

export interface SlotReceta {
  id: string;
  recetaId: string;
  receta: Receta;
  raciones: number;
  macrosTotales: Macros;
  esFlexible: boolean;
  esSobra: boolean;
  fechaSobra?: string;
  notas?: string;
}

export type Comida = 'desayuno' | 'media_manana' | 'comida' | 'merienda' | 'cena' | 'snacks';

export interface DiaComida {
  dia: number; // 0-6 (lunes-domingo)
  comida: Comida;
  slots: SlotReceta[];
  totales: Macros;
}

export interface SemanaDieta {
  id: string;
  dietaId: string;
  semanaNumero: number;
  fechaInicio: string;
  fechaFin: string;
  dias: Map<number, Map<Comida, DiaComida>>;
  totalesSemana: Macros;
}

export interface ObjetivosDieta {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  fibra: number;
  presupuesto: number; // € por día
  tiempoMaximo: number; // minutos por día
}

export interface ClienteDieta {
  id: string;
  nombre: string;
  avatar: string;
  restricciones: string[];
  alergenos: Alergeno[];
  preferencias: string[];
}

// ============================================================================
// LINTER & VALIDATION
// ============================================================================

export type SeveridadLinter = 'info' | 'warn' | 'blocker';

export interface AlertaLinter {
  id: string;
  tipo: 'fibra_baja' | 'sodio_alto' | 'monotonia' | 'presupuesto' | 'tiempo' | 'alergeno' | 'cadena_frio';
  severidad: SeveridadLinter;
  mensaje: string;
  diaComida?: { dia: number; comida: Comida };
  fix?: {
    label: string;
    action: () => void;
  };
}

// ============================================================================
// MACRO BRUSH
// ============================================================================

export interface MacroBrushConfig {
  ambito: 'dia' | 'semana' | 'seleccion';
  diaSeleccionado?: number;
  slotsSeleccionados?: string[];
  objetivos: Partial<Macros>;
  tolerancia: 5 | 10; // porcentaje
}

export interface CambioMacroBrush {
  slotId: string;
  recetaActual: string;
  recetaNueva: string;
  racionesActuales: number;
  racionesNuevas: number;
  macrosAntes: Macros;
  macrosDespues: Macros;
}

// ============================================================================
// PLAN B (SUSTITUCIONES)
// ============================================================================

export interface Sustitucion {
  receta: Receta;
  similitudMacros: number; // 0-100
  similitudCoste: number; // 0-100
  similitudIntencion: number; // 0-100 (sabor/textura)
  razon: string;
}

// ============================================================================
// BATCH COOKING
// ============================================================================

export interface SesionBatch {
  id: string;
  fecha: string;
  duracion: number; // minutos
  equipoDisponible: string[];
  recetas: RecetaBatch[];
}

export interface RecetaBatch {
  recetaId: string;
  receta: Receta;
  racionesTotales: number;
  distribucion: DistribucionBatch[];
}

export interface DistribucionBatch {
  dia: number;
  comida: Comida;
  raciones: number;
}

// ============================================================================
// FILTERS & SEARCH
// ============================================================================

export interface FiltrosCatalogo {
  tiempo?: { min: number; max: number };
  coste?: { min: number; max: number };
  equipo?: string[];
  preferencias?: string[];
  alergenos?: string[]; // excluir
  sabor?: string[];
  textura?: string[];
  saciedad?: number[];
  batchFriendly?: boolean;
  congelable?: boolean;
}

export interface ResultadoBusqueda {
  recetas: Receta[];
  alimentos: Alimento[];
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
