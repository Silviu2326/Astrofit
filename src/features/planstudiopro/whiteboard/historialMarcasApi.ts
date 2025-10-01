import { useState, useEffect } from 'react';

export interface Marca {
  id: string;
  atletaId: string;
  atletaNombre: string;
  ejercicio: string;
  valor: number;
  unidad: string;
  fecha: string;
  notas?: string;
  esPR?: boolean;
}

export interface EvolucionData {
  fecha: string;
  valor: number;
}

// Mock data
const mockMarcas: Marca[] = [
  {
    id: '1',
    atletaId: 'A001',
    atletaNombre: 'Juan Pérez',
    ejercicio: 'Back Squat',
    valor: 150,
    unidad: 'kg',
    fecha: '2024-01-15',
    esPR: true
  },
  {
    id: '2',
    atletaId: 'A001',
    atletaNombre: 'Juan Pérez',
    ejercicio: 'Back Squat',
    valor: 145,
    unidad: 'kg',
    fecha: '2024-01-08',
    esPR: false
  },
  {
    id: '3',
    atletaId: 'A001',
    atletaNombre: 'Juan Pérez',
    ejercicio: 'Back Squat',
    valor: 140,
    unidad: 'kg',
    fecha: '2024-01-01',
    esPR: false
  },
  {
    id: '4',
    atletaId: 'A002',
    atletaNombre: 'María González',
    ejercicio: 'Deadlift',
    valor: 120,
    unidad: 'kg',
    fecha: '2024-01-16',
    esPR: true
  },
  {
    id: '5',
    atletaId: 'A002',
    atletaNombre: 'María González',
    ejercicio: 'Deadlift',
    valor: 115,
    unidad: 'kg',
    fecha: '2024-01-10',
    esPR: false
  },
  {
    id: '6',
    atletaId: 'A003',
    atletaNombre: 'Carlos Ruiz',
    ejercicio: 'Bench Press',
    valor: 100,
    unidad: 'kg',
    fecha: '2024-01-17',
    esPR: true
  },
];

const fetchMarcas = async (): Promise<Marca[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mockMarcas];
};

const addMarca = async (marca: Omit<Marca, 'id' | 'atletaId' | 'esPR'>): Promise<Marca> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const newMarca: Marca = {
    ...marca,
    id: String(Date.now()),
    atletaId: 'A' + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
    fecha: new Date().toISOString().split('T')[0],
    esPR: false // This would be calculated on the backend
  };

  mockMarcas.push(newMarca);
  return newMarca;
};

const getEvolucion = async (atletaId: string, ejercicio: string): Promise<EvolucionData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return mockMarcas
    .filter(m => m.atletaId === atletaId && m.ejercicio === ejercicio)
    .map(m => ({
      fecha: m.fecha,
      valor: m.valor
    }))
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
};

const getPRs = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Get unique combinations of atleta + ejercicio and find max value for each
  const prsMap = new Map<string, Marca>();

  mockMarcas.forEach(marca => {
    const key = `${marca.atletaId}-${marca.ejercicio}`;
    const existing = prsMap.get(key);

    if (!existing || marca.valor > existing.valor) {
      prsMap.set(key, marca);
    }
  });

  return Array.from(prsMap.values()).map(pr => {
    // Calculate improvement from previous PR
    const prevPRs = mockMarcas
      .filter(m =>
        m.atletaId === pr.atletaId &&
        m.ejercicio === pr.ejercicio &&
        m.fecha < pr.fecha
      )
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    const prevPR = prevPRs[0];
    const mejoraPrevio = prevPR ? ((pr.valor - prevPR.valor) / prevPR.valor) * 100 : undefined;

    return {
      id: pr.id,
      ejercicio: pr.ejercicio,
      valor: pr.valor,
      unidad: pr.unidad,
      fecha: pr.fecha,
      atleta: pr.atletaNombre,
      mejoraPrevio
    };
  });
};

export const useHistorialMarcas = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [prs, setPrs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [marcasData, prsData] = await Promise.all([
          fetchMarcas(),
          getPRs()
        ]);
        setMarcas(marcasData);
        setPrs(prsData);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const registrarMarca = async (marca: Omit<Marca, 'id' | 'atletaId' | 'esPR'>) => {
    try {
      const newMarca = await addMarca(marca);
      setMarcas(prev => [...prev, newMarca]);

      // Reload PRs to check if this is a new PR
      const updatedPRs = await getPRs();
      setPrs(updatedPRs);

      return newMarca;
    } catch (err) {
      setError('Error al registrar la marca');
      console.error(err);
      throw err;
    }
  };

  const obtenerEvolucion = async (atletaId: string, ejercicio: string) => {
    try {
      return await getEvolucion(atletaId, ejercicio);
    } catch (err) {
      setError('Error al obtener la evolución');
      console.error(err);
      return [];
    }
  };

  return {
    marcas,
    prs,
    loading,
    error,
    registrarMarca,
    obtenerEvolucion
  };
};
