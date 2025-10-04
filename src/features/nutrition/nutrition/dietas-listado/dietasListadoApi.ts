import api from '../../../../services/api';

// Interfaces del backend
interface ClienteData {
  _id: string;
  nombre: string;
  email: string;
  foto?: string;
}

interface PlantillaDietaData {
  _id: string;
  name: string;
  objective?: string;
  dietType?: string;
}

interface MacrosObjetivo {
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

interface MacrosConsumidos {
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

interface Seguimiento {
  _id: string;
  fecha: string;
  peso?: number;
  calorias_consumidas: number;
  macros_consumidos: MacrosConsumidos;
  adherencia_dia: number;
  notas?: string;
}

interface DietaBackend {
  _id: string;
  trainerId: string;
  clienteId: ClienteData;
  plantillaDietaId?: PlantillaDietaData;
  nombre: string;
  descripcion?: string;
  objetivo: string;
  tipoDieta: string;
  fechaInicio: string;
  fechaFin?: string;
  duracion: number;
  estado: 'activo' | 'pausado' | 'completado' | 'en pausa' | 'cancelado';
  calorias_objetivo: number;
  macros_objetivo: MacrosObjetivo;
  restricciones: string[];
  alergenos: string[];
  peso_inicial?: number;
  peso_actual?: number;
  peso_objetivo?: number;
  adherencia: number;
  progreso: number;
  nutricionista?: {
    nombre: string;
    trainerId?: string;
  };
  seguimientos: Seguimiento[];
  notas?: string;
  ultimaActualizacion: string;
  createdAt: string;
  updatedAt: string;
}

interface DietasResponse {
  success: boolean;
  data: DietaBackend[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  stats?: {
    total: number;
    activas: number;
    pausadas: number;
    completadas: number;
    adherenciaPromedio: number;
  };
}

// Interface para el frontend (formato antiguo para compatibilidad)
export interface Dieta {
  id: string;
  cliente: {
    nombre: string;
    avatar: string;
    iniciales: string;
  };
  plan: string;
  objetivo: string;
  calorias: {
    objetivo: number;
    consumidas: number;
  };
  macros: {
    proteinas: { objetivo: number; actual: number };
    carbohidratos: { objetivo: number; actual: number };
    grasas: { objetivo: number; actual: number };
  };
  fechaInicio: string;
  duracion: number; // días
  progreso: number; // porcentaje
  estado: 'activo' | 'pausado' | 'completado' | 'en pausa';
  adherencia: number;
  nutricionista: string;
  ultimaActualizacion: string;
  pesoInicial: number;
  pesoActual: number;
  restricciones: string[];
}

// Función helper para generar iniciales
const getIniciales = (nombre: string): string => {
  const palabras = nombre.trim().split(' ');
  if (palabras.length >= 2) {
    return `${palabras[0][0]}${palabras[1][0]}`.toUpperCase();
  }
  return nombre.substring(0, 2).toUpperCase();
};

// Función helper para obtener avatar basado en el nombre o foto
const getAvatar = (nombre: string, foto?: string): string => {
  if (foto) return foto;

  // Avatares por defecto basados en la primera letra
  const primeraLetra = nombre[0].toUpperCase();
  const avatares: Record<string, string> = {
    'A': '👨', 'B': '👩', 'C': '👨‍💼', 'D': '👩‍💻', 'E': '👨‍🔬',
    'F': '👩‍🎨', 'G': '👨‍🏫', 'H': '👩‍⚕️', 'I': '👨‍🚀', 'J': '👩‍🔧',
    'K': '👨‍🌾', 'L': '👩‍🍳', 'M': '👨‍⚕️', 'N': '👩‍🎤', 'O': '👨‍🎓',
    'P': '👩‍🏭', 'Q': '👨‍💼', 'R': '👩‍🚒', 'S': '👨‍✈️', 'T': '👩‍🎨',
    'U': '👨‍🦱', 'V': '👩‍🦰', 'W': '👨‍🦳', 'X': '👩‍🦲', 'Y': '👨‍🎤',
    'Z': '👩‍🚀'
  };

  return avatares[primeraLetra] || '👤';
};

// Función para calcular macros consumidos promedio del último seguimiento
const calcularMacrosConsumidos = (seguimientos: Seguimiento[], macros_objetivo: MacrosObjetivo) => {
  if (!seguimientos || seguimientos.length === 0) {
    return {
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0
    };
  }

  // Tomar los últimos 7 días de seguimiento
  const ultimosSeguimientos = seguimientos.slice(-7);

  const totalProteinas = ultimosSeguimientos.reduce((sum, seg) => sum + (seg.macros_consumidos?.proteinas || 0), 0);
  const totalCarbohidratos = ultimosSeguimientos.reduce((sum, seg) => sum + (seg.macros_consumidos?.carbohidratos || 0), 0);
  const totalGrasas = ultimosSeguimientos.reduce((sum, seg) => sum + (seg.macros_consumidos?.grasas || 0), 0);

  const diasConDatos = ultimosSeguimientos.length;

  return {
    proteinas: Math.round(totalProteinas / diasConDatos),
    carbohidratos: Math.round(totalCarbohidratos / diasConDatos),
    grasas: Math.round(totalGrasas / diasConDatos)
  };
};

// Función para calcular calorías consumidas promedio
const calcularCaloriasConsumidas = (seguimientos: Seguimiento[]): number => {
  if (!seguimientos || seguimientos.length === 0) return 0;

  // Tomar los últimos 7 días de seguimiento
  const ultimosSeguimientos = seguimientos.slice(-7);
  const totalCalorias = ultimosSeguimientos.reduce((sum, seg) => sum + (seg.calorias_consumidas || 0), 0);

  return Math.round(totalCalorias / ultimosSeguimientos.length);
};

// Mapear objetivo del backend al formato del frontend
const mapearObjetivo = (objetivo: string): string => {
  const mapeo: Record<string, string> = {
    'perdida_peso': 'Pérdida de peso',
    'ganancia_muscular': 'Ganancia muscular',
    'mantenimiento': 'Mantenimiento',
    'definicion': 'Definición muscular',
    'volumen_limpio': 'Volumen limpio',
    'rendimiento': 'Rendimiento atlético',
    'salud_general': 'Salud general',
    'recomposicion': 'Recomposición corporal'
  };

  return mapeo[objetivo] || objetivo;
};

// Mapear tipo de dieta a nombre de plan
const mapearTipoDieta = (tipoDieta: string): string => {
  const mapeo: Record<string, string> = {
    'mediterranea': 'Dieta Mediterránea',
    'keto': 'Dieta Keto',
    'vegana': 'Dieta Vegana',
    'vegetariana': 'Dieta Vegetariana',
    'paleo': 'Dieta Paleo',
    'flexible': 'Dieta Flexible',
    'intermitente': 'Ayuno Intermitente',
    'baja_carbos': 'Dieta Low Carb',
    'alta_proteina': 'Dieta Alta en Proteínas',
    'dash': 'Dieta DASH',
    'cetogenica': 'Dieta Cetogénica',
    'sin_gluten': 'Dieta Sin Gluten',
    'antiinflamatoria': 'Dieta Antiinflamatoria',
    'deportiva': 'Dieta Deportiva',
    'hipercalorica': 'Dieta Hipercalórica'
  };

  return mapeo[tipoDieta] || tipoDieta;
};

// Transformar datos del backend al formato del frontend
const transformarDieta = (dietaBackend: DietaBackend): Dieta => {
  const macrosConsumidos = calcularMacrosConsumidos(dietaBackend.seguimientos, dietaBackend.macros_objetivo);
  const caloriasConsumidas = calcularCaloriasConsumidas(dietaBackend.seguimientos);

  return {
    id: dietaBackend._id,
    cliente: {
      nombre: dietaBackend.clienteId.nombre,
      avatar: getAvatar(dietaBackend.clienteId.nombre, dietaBackend.clienteId.foto),
      iniciales: getIniciales(dietaBackend.clienteId.nombre)
    },
    plan: dietaBackend.nombre || mapearTipoDieta(dietaBackend.tipoDieta),
    objetivo: mapearObjetivo(dietaBackend.objetivo),
    calorias: {
      objetivo: dietaBackend.calorias_objetivo,
      consumidas: caloriasConsumidas
    },
    macros: {
      proteinas: {
        objetivo: dietaBackend.macros_objetivo.proteinas,
        actual: macrosConsumidos.proteinas
      },
      carbohidratos: {
        objetivo: dietaBackend.macros_objetivo.carbohidratos,
        actual: macrosConsumidos.carbohidratos
      },
      grasas: {
        objetivo: dietaBackend.macros_objetivo.grasas,
        actual: macrosConsumidos.grasas
      }
    },
    fechaInicio: dietaBackend.fechaInicio.split('T')[0], // Solo la fecha
    duracion: dietaBackend.duracion,
    progreso: dietaBackend.progreso,
    estado: dietaBackend.estado as 'activo' | 'pausado' | 'completado' | 'en pausa',
    adherencia: dietaBackend.adherencia,
    nutricionista: dietaBackend.nutricionista?.nombre || 'No asignado',
    ultimaActualizacion: dietaBackend.ultimaActualizacion.split('T')[0],
    pesoInicial: dietaBackend.peso_inicial || 0,
    pesoActual: dietaBackend.peso_actual || 0,
    restricciones: dietaBackend.restricciones || []
  };
};

// Función principal para obtener dietas
export const getDietas = async (filters: {
  estado?: string;
  search?: string;
  objetivo?: string;
  nutricionista?: string;
  fechaInicio?: string;
}): Promise<Dieta[]> => {
  try {
    // Construir parámetros de query
    const params: Record<string, string> = {};

    if (filters.estado) params.estado = filters.estado;
    if (filters.search) params.q = filters.search;
    if (filters.objetivo) {
      // Mapear objetivo del frontend al backend
      const objetivoBackend: Record<string, string> = {
        'Pérdida de peso': 'perdida_peso',
        'Ganancia muscular': 'ganancia_muscular',
        'Mantenimiento': 'mantenimiento',
        'Definición muscular': 'definicion',
        'Volumen limpio': 'volumen_limpio',
        'Rendimiento atlético': 'rendimiento',
        'Salud general': 'salud_general',
        'Recomposición corporal': 'recomposicion'
      };
      params.objetivo = objetivoBackend[filters.objetivo] || filters.objetivo;
    }
    if (filters.nutricionista) params.nutricionista = filters.nutricionista;
    if (filters.fechaInicio) params.fechaInicio = filters.fechaInicio;

    // Realizar petición al backend
    const response = await api.get<DietasResponse>('/dietas', { params });

    // Transformar datos al formato del frontend
    const dietasTransformadas = response.data.data.map(transformarDieta);

    return dietasTransformadas;
  } catch (error) {
    console.error('Error al obtener dietas:', error);

    // En caso de error, devolver array vacío
    return [];
  }
};

// Función para obtener una dieta específica
export const getDieta = async (id: string): Promise<Dieta | null> => {
  try {
    const response = await api.get<{ success: boolean; data: DietaBackend }>(`/dietas/${id}`);
    return transformarDieta(response.data.data);
  } catch (error) {
    console.error('Error al obtener dieta:', error);
    return null;
  }
};

// Función para crear una nueva dieta
export const createDieta = async (dietaData: {
  clienteId: string;
  plantillaDietaId?: string;
  nombre?: string;
  objetivo?: string;
  tipoDieta?: string;
  fechaInicio?: string;
  duracion?: number;
  calorias_objetivo?: number;
  macros_objetivo?: MacrosObjetivo;
  restricciones?: string[];
  peso_inicial?: number;
  peso_objetivo?: number;
  nutricionista?: { nombre: string };
}): Promise<Dieta | null> => {
  try {
    const response = await api.post<{ success: boolean; data: DietaBackend }>('/dietas', dietaData);
    return transformarDieta(response.data.data);
  } catch (error) {
    console.error('Error al crear dieta:', error);
    throw error;
  }
};

// Función para actualizar una dieta
export const updateDieta = async (id: string, dietaData: Partial<{
  nombre: string;
  objetivo: string;
  tipoDieta: string;
  duracion: number;
  calorias_objetivo: number;
  macros_objetivo: MacrosObjetivo;
  restricciones: string[];
  peso_objetivo: number;
  estado: string;
}>): Promise<Dieta | null> => {
  try {
    const response = await api.put<{ success: boolean; data: DietaBackend }>(`/dietas/${id}`, dietaData);
    return transformarDieta(response.data.data);
  } catch (error) {
    console.error('Error al actualizar dieta:', error);
    throw error;
  }
};

// Función para eliminar una dieta
export const deleteDieta = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/dietas/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar dieta:', error);
    return false;
  }
};

// Función para cambiar estado de una dieta
export const cambiarEstadoDieta = async (id: string, estado: string): Promise<Dieta | null> => {
  try {
    const response = await api.patch<{ success: boolean; data: DietaBackend }>(`/dietas/${id}/estado`, { estado });
    return transformarDieta(response.data.data);
  } catch (error) {
    console.error('Error al cambiar estado de dieta:', error);
    throw error;
  }
};
