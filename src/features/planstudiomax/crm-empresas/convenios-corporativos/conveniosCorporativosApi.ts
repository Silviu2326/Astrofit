import { useState, useEffect } from 'react';
import { PlaceholderImages } from '../../../../utils/placeholderImages';

export interface Empresa {
  id: string;
  nombre: string;
  logo: string;
  sector: string;
  numeroEmpleados: number;
  contactoPrincipal: string;
  estado: 'activo' | 'inactivo' | 'en negociacion';
}

export interface ContratoB2B {
  id: string;
  empresaId: string;
  fechaInicio: string;
  fechaFin: string;
  terminos: string;
  estado: 'activo' | 'expirado' | 'pendiente';
}

export interface MetricasB2B {
  id: string;
  empresaId: string;
  empleadosActivos: number;
  empleadosTotales: number;
  usoPlataforma: number; // Percentage
  fechaRegistro: string;
}

const mockEmpresas: Empresa[] = [
  {
    id: '1',
    nombre: 'Tech Solutions Inc.',
    logo: PlaceholderImages.companyLogo('TS'),
    sector: 'Tecnología',
    numeroEmpleados: 500,
    contactoPrincipal: 'Ana García',
    estado: 'activo',
  },
  {
    id: '2',
    nombre: 'Global Retail Co.',
    logo: PlaceholderImages.companyLogo('GR'),
    sector: 'Retail',
    numeroEmpleados: 1200,
    contactoPrincipal: 'Carlos Ruiz',
    estado: 'activo',
  },
  {
    id: '3',
    nombre: 'Health Innovations Ltd.',
    logo: PlaceholderImages.companyLogo('HI'),
    sector: 'Salud',
    numeroEmpleados: 300,
    contactoPrincipal: 'María López',
    estado: 'en negociacion',
  },
  {
    id: '4',
    nombre: 'Creative Marketing Agency',
    logo: PlaceholderImages.companyLogo('CM'),
    sector: 'Marketing',
    numeroEmpleados: 150,
    contactoPrincipal: 'David Martínez',
    estado: 'activo',
  },
  {
    id: '5',
    nombre: 'Financial Services Group',
    logo: PlaceholderImages.companyLogo('FS'),
    sector: 'Finanzas',
    numeroEmpleados: 800,
    contactoPrincipal: 'Laura Sánchez',
    estado: 'activo',
  },
];

export const fetchEmpresas = async (): Promise<Empresa[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmpresas);
    }, 500);
  });
};

export const fetchContratosB2B = async (empresaId?: string): Promise<ContratoB2B[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockContratos: ContratoB2B[] = [
        {
          id: '1',
          empresaId: '1',
          fechaInicio: '2023-01-01',
          fechaFin: '2024-12-31',
          terminos: 'Contrato anual con descuento del 20%',
          estado: 'activo',
        },
        {
          id: '2',
          empresaId: '2',
          fechaInicio: '2023-06-01',
          fechaFin: '2024-05-31',
          terminos: 'Contrato semestral con beneficios premium',
          estado: 'activo',
        },
      ];
      
      const filteredContratos = empresaId 
        ? mockContratos.filter(contrato => contrato.empresaId === empresaId)
        : mockContratos;
        
      resolve(filteredContratos);
    }, 500);
  });
};

export const fetchMetricasB2B = async (empresaId?: string): Promise<MetricasB2B[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockMetricas: MetricasB2B[] = [
        {
          id: '1',
          empresaId: '1',
          empleadosActivos: 450,
          empleadosTotales: 500,
          usoPlataforma: 90,
          fechaRegistro: '2023-01-15',
        },
        {
          id: '2',
          empresaId: '2',
          empleadosActivos: 1000,
          empleadosTotales: 1200,
          usoPlataforma: 83,
          fechaRegistro: '2023-06-10',
        },
      ];
      
      const filteredMetricas = empresaId 
        ? mockMetricas.filter(metrica => metrica.empresaId === empresaId)
        : mockMetricas;
        
      resolve(filteredMetricas);
    }, 500);
  });
};

export const createEmpresa = async (empresa: Omit<Empresa, 'id'>): Promise<Empresa> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEmpresa: Empresa = {
        ...empresa,
        id: Date.now().toString(),
      };
      resolve(newEmpresa);
    }, 500);
  });
};

export const updateEmpresa = async (id: string, empresa: Partial<Empresa>): Promise<Empresa> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingEmpresa = mockEmpresas.find(e => e.id === id);
      if (existingEmpresa) {
        const updatedEmpresa = { ...existingEmpresa, ...empresa };
        resolve(updatedEmpresa);
      } else {
        reject(new Error('Empresa not found'));
      }
    }, 500);
  });
};

export const deleteEmpresa = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockEmpresas.findIndex(e => e.id === id);
      if (index !== -1) {
        mockEmpresas.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Empresa not found'));
      }
    }, 500);
  });
};

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEmpresas();
        setEmpresas(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar empresas'));
      } finally {
        setLoading(false);
      }
    };

    loadEmpresas();
  }, []);

  return { empresas, loading, error };
};