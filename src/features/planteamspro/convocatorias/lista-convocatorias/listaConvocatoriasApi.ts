export interface Atleta {
  id: string;
  nombre: string;
  estado: 'convocado' | 'suplente' | 'no disponible' | 'lesionado';
}

export interface Evento {
  id: string;
  fecha: string;
  lugar: string;
  rival: string;
  tipo: 'partido' | 'entrenamiento' | 'otro';
}

export interface Convocatoria {
  id: string;
  evento: Evento;
  atletas: Atleta[];
}

export interface SeleccionAlgoritmoParams {
  criterios: string[];
  eventoId: string;
}

export interface ComunicacionParams {
  convocatoriaId: string;
  mensaje: string;
  canales: string[];
}

// Simula una API call para obtener datos de convocatorias
export const fetchConvocatorias = async (): Promise<Convocatoria[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'conv1',
          evento: {
            id: 'ev1',
            fecha: '2025-10-05',
            lugar: 'Estadio Municipal',
            rival: 'Equipo A',
            tipo: 'partido',
          },
          atletas: [
            { id: 'atl1', nombre: 'Juan Pérez', estado: 'convocado' },
            { id: 'atl2', nombre: 'María García', estado: 'suplente' },
            { id: 'atl3', nombre: 'Pedro López', estado: 'lesionado' },
            { id: 'atl4', nombre: 'Ana Martínez', estado: 'no disponible' },
          ],
        },
        {
          id: 'conv2',
          evento: {
            id: 'ev2',
            fecha: '2025-10-12',
            lugar: 'Centro de Entrenamiento',
            rival: 'N/A',
            tipo: 'entrenamiento',
          },
          atletas: [
            { id: 'atl1', nombre: 'Juan Pérez', estado: 'convocado' },
            { id: 'atl2', nombre: 'María García', estado: 'convocado' },
            { id: 'atl5', nombre: 'Carlos Ruiz', estado: 'convocado' },
          ],
        },
      ]);
    }, 500);
  });
};

// Simula un endpoint para algoritmos de selección de atletas
export const seleccionarAtletasPorAlgoritmo = async (params: SeleccionAlgoritmoParams): Promise<Atleta[]> => {
  console.log('Ejecutando algoritmo de selección con criterios:', params.criterios, 'para evento:', params.eventoId);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lógica simulada de selección de atletas
      resolve([
        { id: 'atl1', nombre: 'Juan Pérez', estado: 'convocado' },
        { id: 'atl2', nombre: 'María García', estado: 'convocado' },
      ]);
    }, 500);
  });
};

// Simula un endpoint para el sistema de comunicación multicanal
export const enviarComunicacionMulticanal = async (params: ComunicacionParams): Promise<{ success: boolean }> => {
  console.log('Enviando comunicación para convocatoria:', params.convocatoriaId, 'mensaje:', params.mensaje, 'por canales:', params.canales);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lógica simulada de envío de comunicación
      resolve({ success: true });
    }, 500);
  });
};
