import { useState, useEffect, useMemo } from 'react';

export interface Cliente {
  id: string;
  foto: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo';
  etiquetas: string[];
  fechaAlta: string; // ISO YYYY-MM-DD
  ultimaActividad: string; // ISO YYYY-MM-DD
}

export type SortBy = 'nombre' | 'estado' | 'fechaAlta' | 'ultimaActividad';
export type SortDir = 'asc' | 'desc';

export interface ClientesFilters {
  q?: string;
  estado?: 'activo' | 'inactivo' | '';
  etiquetas?: string[];
  fechaAltaDesde?: string; // ISO
  fechaAltaHasta?: string; // ISO
  sinActividadDias?: number;
  sortBy?: SortBy;
  sortDir?: SortDir;
  page?: number;
  pageSize?: number;
}

export interface ClientesResult {
  data: Cliente[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  stats: {
    total: number;
    activos: number;
    inactivos: number;
    premium: number;
    online: number;
  };
}

const nombres = [
  'Juan Pérez',
  'María García',
  'Carlos Sánchez',
  'Ana López',
  'Pedro Martínez',
  'Lucía Fernández',
  'Diego Rodríguez',
  'Sofía Torres',
  'Miguel Romero',
  'Elena Navarro',
  'Andrés Castillo',
  'Paula Ruiz',
  'Javier Ortega',
  'Laura Ramos',
  'Hugo Morales',
  'Valentina Vega',
  'Daniela Castro',
  'Santiago Silva',
  'Gabriela Flores',
  'Manuel Herrera',
  'Isabella Soto',
  'Emilio Vargas',
  'Natalia Cruz',
  'Ricardo León'
];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function fmt(d: Date) {
  return d.toISOString().slice(0, 10);
}

const mockClientes: Cliente[] = nombres.map((n, idx) => {
  const activo = Math.random() > 0.25; // ~75% activos
  const etiquetasBase = [
    ...(Math.random() > 0.6 ? ['premium'] : []),
    ...(Math.random() > 0.5 ? ['online'] : []),
    ...(Math.random() > 0.7 ? ['rehabilitación'] : []),
  ];
  const alta = addDays(new Date('2023-01-01'), Math.floor(Math.random() * 600));
  const ultima = addDays(new Date(), -Math.floor(Math.random() * 120));
  return {
    id: String(idx + 1),
    foto: `https://i.pravatar.cc/100?img=${(idx % 70) + 1}`,
    nombre: n,
    email: `${n.toLowerCase().replace(/[^a-záéíóúñ\s]/gi, '').replace(/\s+/g, '.')}@ejemplo.com`,
    telefono: `+34 6${Math.floor(10000000 + Math.random() * 89999999)}`,
    estado: activo ? 'activo' : 'inactivo',
    etiquetas: etiquetasBase.length ? etiquetasBase : [randomChoice(['nuevo', 'regular'])],
    fechaAlta: fmt(alta),
    ultimaActividad: fmt(ultima),
  };
});

function dateDiffInDays(a: string, b: string) {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  const diff = Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
  return diff;
}

export const useClientes = (inputFilters: Partial<ClientesFilters> = {}) => {
  const [result, setResult] = useState<ClientesResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const defaults: Required<Pick<ClientesFilters, 'sortBy' | 'sortDir' | 'page' | 'pageSize'>> = {
    sortBy: 'ultimaActividad',
    sortDir: 'desc',
    page: 1,
    pageSize: 10,
  };

  const filters = useMemo(
    () => ({ ...defaults, ...inputFilters }),
    [
      inputFilters.q,
      inputFilters.estado,
      JSON.stringify(inputFilters.etiquetas),
      inputFilters.fechaAltaDesde,
      inputFilters.fechaAltaHasta,
      inputFilters.sinActividadDias,
      inputFilters.sortBy,
      inputFilters.sortDir,
      inputFilters.page,
      inputFilters.pageSize,
    ]
  );

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Simula llamada API
    const timer = setTimeout(() => {
      try {
        const todayISO = fmt(new Date());
        let list = mockClientes.slice();

        // Texto libre
        if (filters.q && filters.q.trim()) {
          const q = filters.q.trim().toLowerCase();
          list = list.filter(c =>
            c.nombre.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.telefono.toLowerCase().includes(q)
          );
        }
        // Estado
        if (filters.estado) {
          list = list.filter(c => c.estado === filters.estado);
        }
        // Etiquetas (todas)
        if (filters.etiquetas && filters.etiquetas.length) {
          list = list.filter(c => filters.etiquetas!.every(t => c.etiquetas.includes(t)));
        }
        // Fecha alta rango
        if (filters.fechaAltaDesde) {
          list = list.filter(c => c.fechaAlta >= filters.fechaAltaDesde!);
        }
        if (filters.fechaAltaHasta) {
          list = list.filter(c => c.fechaAlta <= filters.fechaAltaHasta!);
        }
        // Sin actividad en X días
        if (typeof filters.sinActividadDias === 'number' && filters.sinActividadDias > 0) {
          list = list.filter(c => dateDiffInDays(todayISO, c.ultimaActividad) >= filters.sinActividadDias!);
        }

        // Stats sobre el conjunto filtrado
        const stats = {
          total: list.length,
          activos: list.filter(c => c.estado === 'activo').length,
          inactivos: list.filter(c => c.estado === 'inactivo').length,
          premium: list.filter(c => c.etiquetas.includes('premium')).length,
          online: list.filter(c => c.etiquetas.includes('online')).length,
        };

        // Orden
        const dir = filters.sortDir === 'asc' ? 1 : -1;
        list.sort((a, b) => {
          const key = filters.sortBy!;
          const va = (a as any)[key] as string;
          const vb = (b as any)[key] as string;
          if (key === 'nombre' || key === 'estado') {
            return va.localeCompare(vb) * dir;
          }
          // fechas ISO comparables
          return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
        });

        // Paginación
        const total = list.length;
        const pageSize = filters.pageSize!;
        const pages = Math.max(1, Math.ceil(total / pageSize));
        const page = Math.min(Math.max(1, filters.page!), pages);
        const start = (page - 1) * pageSize;
        const data = list.slice(start, start + pageSize);

        setResult({ data, total, page, pageSize, pages, stats });
        setIsLoading(false);
      } catch (e: any) {
        setError(e);
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  return {
    data: result?.data || [],
    total: result?.total || 0,
    page: result?.page || 1,
    pageSize: result?.pageSize || 10,
    pages: result?.pages || 1,
    stats: result?.stats || { total: 0, activos: 0, inactivos: 0, premium: 0, online: 0 },
    isLoading,
    error
  };
};

