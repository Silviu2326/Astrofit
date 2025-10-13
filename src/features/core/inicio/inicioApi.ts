import { useState, useEffect } from 'react';
import api from '../../../services/api';

// Tipos de datos del dashboard
export interface DashboardStats {
  totalClientes: number;
  clientesActivos: number;
  clientesActivosHoy: number;
  entrenamientosProgramadosHoy: number;
  ingresosTotales: number;
  facturasDelMes: number;
  tasaRetencion: number;
  sesionesCompletadasMes: number;
  nuevosLeadsMes: number;
  citasPendientesHoy: number;
}

export interface ActividadReciente {
  tipo: 'nuevo_cliente' | 'nuevo_lead' | 'sesion_completada' | 'factura_emitida' | 'evento_proximo';
  titulo: string;
  descripcion: string;
  fecha: string;
  icono: string;
  color: 'success' | 'info' | 'primary' | 'warning' | 'secondary';
}

export interface Alerta {
  tipo: 'factura_vencida' | 'factura_por_vencer' | 'tarea_pendiente' | 'evento_hoy' | 'cliente_inactivo';
  prioridad: 'alta' | 'media' | 'baja';
  titulo: string;
  descripcion: string;
  fecha?: string;
  monto?: number;
  icono: string;
  color: 'danger' | 'warning' | 'info' | 'secondary';
}

export interface AlertasResponse {
  data: Alerta[];
  total: number;
  resumen: {
    alta: number;
    media: number;
    baja: number;
  };
}

export interface DiaIngresos {
  fecha: string;
  dia: string;
  ingresos: number;
  facturas: number;
}

export interface IngresosSemana {
  dias: DiaIngresos[];
  totalSemanaActual: number;
  totalSemanaAnterior: number;
  cambioporcentual: number;
  tendencia: 'subida' | 'bajada' | 'estable';
}

// Hook para obtener estadísticas del dashboard
export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/dashboard/stats');

        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};

// Hook para obtener actividad reciente
export const useActividadReciente = (limit: number = 20) => {
  const [actividades, setActividades] = useState<ActividadReciente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActividad = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(`/dashboard/actividad-reciente?limit=${limit}`);

        if (response.data.success) {
          setActividades(response.data.data);
        }
      } catch (err: any) {
        console.error('Error fetching actividad reciente:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActividad();
  }, [limit]);

  return { actividades, isLoading, error };
};

// Hook para obtener alertas
export const useAlertas = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [resumen, setResumen] = useState({ alta: 0, media: 0, baja: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAlertas = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/dashboard/alertas');

        if (response.data.success) {
          setAlertas(response.data.data);
          setResumen(response.data.resumen);
        }
      } catch (err: any) {
        console.error('Error fetching alertas:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlertas();
  }, []);

  return { alertas, resumen, isLoading, error };
};

// Hook para obtener ingresos de la semana
export const useIngresosSemana = () => {
  const [ingresos, setIngresos] = useState<IngresosSemana | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchIngresos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/dashboard/ingresos-semana');

        if (response.data.success) {
          setIngresos(response.data.data);
        }
      } catch (err: any) {
        console.error('Error fetching ingresos semana:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngresos();
  }, []);

  return { ingresos, isLoading, error };
};

// Tipos para eventos
export interface ProximoEvento {
  _id?: string;
  id?: string;
  titulo: string;
  fechaInicio: string;
  fechaFin?: string;
  tipo: string;
  completado?: boolean;
  cancelado?: boolean;
  cliente?: {
    _id?: string;
    id?: string;
    nombre: string;
  };
}

// Hook para obtener próximos eventos
export const useProximosEventos = () => {
  const [eventos, setEventos] = useState<ProximoEvento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/eventos/proximos');

        if (response.data.success) {
          setEventos(response.data.data);
        }
      } catch (err: any) {
        console.error('Error fetching próximos eventos:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventos();
  }, []);

  return { eventos, isLoading, error };
};

// Tipos para leads
export interface Lead {
  _id: string;
  nombre: string;
  email: string;
  telefono?: string;
  estado: 'nuevo' | 'contactado' | 'interesado' | 'no-interesado' | 'convertido' | 'perdido';
  prioridad: 'baja' | 'media' | 'alta';
  fuente?: string;
  fechaRegistro: string;
  proximoSeguimiento?: string;
}

// Hook para obtener leads
export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/leads?limit=100');

        if (response.data.success) {
          setLeads(response.data.data);
        }
      } catch (err: any) {
        console.error('Error fetching leads:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return { leads, isLoading, error };
};

// Hook consolidado que obtiene todos los datos del dashboard
export const useDashboard = () => {
  const stats = useDashboardStats();
  const actividades = useActividadReciente(10);
  const alertas = useAlertas();
  const ingresos = useIngresosSemana();
  const eventos = useProximosEventos();
  const leads = useLeads();

  const isLoading = stats.isLoading || actividades.isLoading || alertas.isLoading || ingresos.isLoading || eventos.isLoading || leads.isLoading;
  const error = stats.error || actividades.error || alertas.error || ingresos.error || eventos.error || leads.error;

  return {
    stats: stats.stats,
    actividades: actividades.actividades,
    alertas: alertas.alertas,
    alertasResumen: alertas.resumen,
    ingresos: ingresos.ingresos,
    eventos: eventos.eventos,
    leads: leads.leads,
    isLoading,
    error
  };
};
