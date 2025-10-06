import { useState, useEffect } from 'react';

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
    logo: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=TS',
    sector: 'Tecnología',
    numeroEmpleados: 500,
    contactoPrincipal: 'Ana García',
    estado: 'activo',
  },
  {
    id: '2',
    nombre: 'Global Retail Co.',
    logo: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=GR',
    sector: 'Comercio',
    numeroEmpleados: 1200,
    contactoPrincipal: 'Juan Pérez',
    estado: 'en negociacion',
  },
  {
    id: '3',
    nombre: 'Health Innovations Ltd.',
    logo: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=HI',
    sector: 'Salud',
    numeroEmpleados: 250,
    contactoPrincipal: 'María López',
    estado: 'activo',
  },
  {
    id: '4',
    nombre: 'Creative Marketing Agency',
    logo: 'https://via.placeholder.com/150/FFFF33/000000?text=CM',
    sector: 'Marketing',
    numeroEmpleados: 80,
    contactoPrincipal: 'Carlos Ruiz',
    estado: 'inactivo',
  },
  {
    id: '5',
    nombre: 'Financial Services Group',
    logo: 'https://via.placeholder.com/150/FF33FF/FFFFFF?text=FS',
    sector: 'Finanzas',
    numeroEmpleados: 700,
    contactoPrincipal: 'Laura Torres',
    estado: 'activo',
  },
];

const mockContratosB2B: ContratoB2B[] = [
  {
    id: 'C001',
    empresaId: '1',
    fechaInicio: '2023-01-01',
    fechaFin: '2024-01-01',
    terminos: 'Contrato anual con renovación automática.',
    estado: 'activo',
  },
  {
    id: 'C002',
    empresaId: '2',
    fechaInicio: '2023-03-15',
    fechaFin: '2024-03-15',
    terminos: 'Contrato de prueba de 1 año.',
    estado: 'pendiente',
  },
  {
    id: 'C003',
    empresaId: '3',
    fechaInicio: '2022-06-01',
    fechaFin: '2023-06-01',
    terminos: 'Contrato de servicio de 1 año.',
    estado: 'expirado',
  },
];

const mockMetricasB2B: MetricasB2B[] = [
  {
    id: 'M001',
    empresaId: '1',
    empleadosActivos: 450,
    empleadosTotales: 500,
    usoPlataforma: 90,
    fechaRegistro: '2023-09-20',
  },
  {
    id: 'M002',
    empresaId: '2',
    empleadosActivos: 800,
    empleadosTotales: 1200,
    usoPlataforma: 66,
    fechaRegistro: '2023-09-20',
  },
  {
    id: 'M003',
    empresaId: '3',
    empleadosActivos: 200,
    empleadosTotales: 250,
    usoPlataforma: 80,
    fechaRegistro: '2023-09-20',
  },
];

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setEmpresas(mockEmpresas);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  return { empresas, loading, error };
};

export const useContratosB2B = () => {
  const [contratos, setContratos] = useState<ContratoB2B[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setContratos(mockContratosB2B);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, []);

  return { contratos, loading, error };
};

export const useMetricasB2B = () => {
  const [metricas, setMetricas] = useState<MetricasB2B[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        setMetricas(mockMetricasB2B);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetricas();
  }, []);

  return { metricas, loading, error };
};
