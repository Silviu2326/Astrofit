const API_BASE_URL = '/api/habitos-avanzados/retos';

// Función helper para manejar respuestas HTTP
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

// Tipos de datos (ejemplos)
interface Reto {
  id: string;
  nombre: string;
  descripcion: string;
  reglas: string[];
  fechaInicio: string;
  fechaFin: string;
  creadorId: string;
}

interface Participante {
  id: string;
  retoId: string;
  usuarioId: string;
  progreso: number; // Porcentaje o valor específico del reto
  ultimaActualizacion: string;
}

interface ClasificacionEntry {
  usuarioId: string;
  nombreUsuario: string;
  puntuacion: number;
  posicion: number;
}

interface Insignia {
  id: string;
  nombre: string;
  descripcion: string;
  iconoUrl: string;
  fechaObtencion?: string;
}

// Funciones de la API

export const crearReto = async (retoData: Omit<Reto, 'id' | 'creadorId'>): Promise<Reto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(retoData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al crear reto:', error);
    throw error;
  }
};

export const getRetos = async (): Promise<Reto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener retos:', error);
    throw error;
  }
};

export const inscribirseReto = async (retoId: string, usuarioId: string): Promise<Participante> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${retoId}/participantes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuarioId }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al inscribirse en el reto:', error);
    throw error;
  }
};

export const getParticipantesReto = async (retoId: string): Promise<Participante[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${retoId}/participantes`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener participantes del reto:', error);
    throw error;
  }
};

export const getTablaClasificacion = async (retoId: string): Promise<ClasificacionEntry[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${retoId}/clasificacion`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener tabla de clasificación:', error);
    throw error;
  }
};

export const getInsigniasUsuario = async (usuarioId: string): Promise<Insignia[]> => {
  try {
    const response = await fetch(`/api/usuarios/${usuarioId}/insignias`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al obtener insignias del usuario:', error);
    throw error;
  }
};

export const actualizarProgresoReto = async (participanteId: string, progreso: number): Promise<Participante> => {
  try {
    const response = await fetch(`${API_BASE_URL}/participantes/${participanteId}/progreso`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ progreso }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar progreso del participante:', error);
    throw error;
  }
};
