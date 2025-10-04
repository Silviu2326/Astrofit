import { useState, useEffect } from 'react';

export interface Resultado {
  id: string;
  posicion: number;
  atleta: string;
  tiempo?: string;
  puntos?: number;
  rondas?: number;
  reps?: number;
  notas?: string;
}

export interface Medalla {
  tipo: 'oro' | 'plata' | 'bronce' | 'participacion';
  titulo: string;
  fecha: string;
  categoria?: string;
}

export interface Filtros {
  division?: string;
  genero?: string;
  fecha?: string;
  categoria?: string;
}

// Mock data
const mockResultados: Resultado[] = [
  {
    id: '1',
    posicion: 1,
    atleta: 'Juan Pérez',
    tiempo: '12:34',
    puntos: 450,
    notas: 'RX'
  },
  {
    id: '2',
    posicion: 2,
    atleta: 'María González',
    tiempo: '13:15',
    puntos: 425,
    notas: 'RX'
  },
  {
    id: '3',
    posicion: 3,
    atleta: 'Carlos Ruiz',
    tiempo: '14:02',
    puntos: 400,
    notas: 'RX'
  },
  {
    id: '4',
    posicion: 4,
    atleta: 'Ana Martínez',
    tiempo: '14:45',
    puntos: 375,
    notas: 'Scaled'
  },
  {
    id: '5',
    posicion: 5,
    atleta: 'Luis Hernández',
    tiempo: '15:20',
    puntos: 350,
    notas: 'RX'
  },
];

const mockMedallas: Medalla[] = [
  {
    tipo: 'oro',
    titulo: 'WOD del Día - Fran',
    fecha: '2024-01-20',
    categoria: 'RX Masculino'
  },
  {
    tipo: 'plata',
    titulo: 'Open Workout 24.1',
    fecha: '2024-01-15',
    categoria: 'RX Masculino'
  },
  {
    tipo: 'bronce',
    titulo: 'Hero WOD - Murph',
    fecha: '2024-01-10',
    categoria: 'Scaled'
  },
  {
    tipo: 'oro',
    titulo: 'Partner WOD',
    fecha: '2024-01-05',
    categoria: 'Parejas Mixto'
  },
  {
    tipo: 'participacion',
    titulo: 'Desafío 100 Burpees',
    fecha: '2024-01-01',
    categoria: 'Todos'
  },
];

const fetchResultados = async (filtros?: Filtros): Promise<Resultado[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  let resultados = [...mockResultados];

  // Apply filters (simplified version)
  if (filtros) {
    if (filtros.division) {
      resultados = resultados.filter(r =>
        r.notas?.toLowerCase().includes(filtros.division!.toLowerCase())
      );
    }
  }

  return resultados;
};

const fetchMedallas = async (atleta?: string): Promise<Medalla[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return [...mockMedallas];
};

const addResultado = async (resultado: Omit<Resultado, 'id' | 'posicion'>): Promise<Resultado> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const newResultado: Resultado = {
    ...resultado,
    id: String(Date.now()),
    posicion: mockResultados.length + 1
  };

  mockResultados.push(newResultado);

  // Recalculate positions based on points/time
  mockResultados.sort((a, b) => (b.puntos || 0) - (a.puntos || 0));
  mockResultados.forEach((r, index) => {
    r.posicion = index + 1;
  });

  return newResultado;
};

export const useLeaderboardData = (filtros?: Filtros) => {
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [medallas, setMedallas] = useState<Medalla[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [resultadosData, medallasData] = await Promise.all([
          fetchResultados(filtros),
          fetchMedallas()
        ]);
        setResultados(resultadosData);
        setMedallas(medallasData);
      } catch (err) {
        setError('Error al cargar los datos del leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filtros?.division, filtros?.genero, filtros?.fecha, filtros?.categoria]);

  const agregarResultado = async (resultado: Omit<Resultado, 'id' | 'posicion'>) => {
    try {
      const newResultado = await addResultado(resultado);
      setResultados(prev => {
        const updated = [...prev, newResultado];
        updated.sort((a, b) => (b.puntos || 0) - (a.puntos || 0));
        return updated.map((r, index) => ({ ...r, posicion: index + 1 }));
      });
      return newResultado;
    } catch (err) {
      setError('Error al agregar resultado');
      console.error(err);
      throw err;
    }
  };

  return {
    resultados,
    medallas,
    loading,
    error,
    agregarResultado
  };
};

// Additional helper functions
export const getEstadisticasLeaderboard = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    totalParticipantes: mockResultados.length,
    promedioTiempo: '14:15',
    mejorTiempo: mockResultados[0]?.tiempo || '-',
    totalMedallas: mockMedallas.length
  };
};

export const getTopAtletas = async (limite: number = 3) => {
  await new Promise(resolve => setTimeout(resolve, 200));

  return mockResultados.slice(0, limite);
};
