import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  Activity, 
  Heart,
  Zap,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  PieChart,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react';

interface ClienteResumenEjecutivoProps {
  cliente: any;
}

interface Metrica {
  id: string;
  nombre: string;
  valor: number;
  unidad: string;
  cambio: number;
  tendencia: 'up' | 'down' | 'stable';
  objetivo?: number;
  color: string;
  icono: React.ComponentType<any>;
}

interface Objetivo {
  id: string;
  nombre: string;
  progreso: number;
  fechaObjetivo: string;
  estado: 'en_progreso' | 'completado' | 'atrasado';
  prioridad: 'alta' | 'media' | 'baja';
}

interface Alert {
  id: string;
  tipo: 'info' | 'warning' | 'success' | 'error';
  titulo: string;
  descripcion: string;
  fecha: string;
  accion?: string;
}

const ClienteResumenEjecutivo: React.FC<ClienteResumenEjecutivoProps> = ({ cliente }) => {
  const [periodo, setPeriodo] = useState<'semana' | 'mes' | 'trimestre'>('mes');
  const [vista, setVista] = useState<'general' | 'detallado' | 'tendencias'>('general');

  // Datos mock para demostración
  const metricas: Metrica[] = [
    {
      id: '1',
      nombre: 'Peso Actual',
      valor: 75.5,
      unidad: 'kg',
      cambio: -2.3,
      tendencia: 'down',
      objetivo: 70,
      color: 'from-blue-500 to-blue-600',
      icono: Activity
    },
    {
      id: '2',
      nombre: 'Sesiones Completadas',
      valor: 12,
      unidad: 'sesiones',
      cambio: 3,
      tendencia: 'up',
      objetivo: 16,
      color: 'from-green-500 to-green-600',
      icono: CheckCircle
    },
    {
      id: '3',
      nombre: 'Adherencia Nutricional',
      valor: 85,
      unidad: '%',
      cambio: 5,
      tendencia: 'up',
      objetivo: 90,
      color: 'from-purple-500 to-purple-600',
      icono: Heart
    },
    {
      id: '4',
      nombre: 'Gasto Mensual',
      valor: 180,
      unidad: '€',
      cambio: 0,
      tendencia: 'stable',
      color: 'from-yellow-500 to-yellow-600',
      icono: DollarSign
    }
  ];

  const objetivos: Objetivo[] = [
    {
      id: '1',
      nombre: 'Perder 5kg',
      progreso: 60,
      fechaObjetivo: '2024-03-15',
      estado: 'en_progreso',
      prioridad: 'alta'
    },
    {
      id: '2',
      nombre: 'Aumentar masa muscular',
      progreso: 40,
      fechaObjetivo: '2024-04-01',
      estado: 'en_progreso',
      prioridad: 'media'
    },
    {
      id: '3',
      nombre: 'Mejorar resistencia',
      progreso: 100,
      fechaObjetivo: '2024-01-31',
      estado: 'completado',
      prioridad: 'baja'
    }
  ];

  const alertas: Alert[] = [
    {
      id: '1',
      tipo: 'warning',
      titulo: 'Sesión pendiente',
      descripcion: 'Tiene una sesión programada para mañana a las 10:00',
      fecha: '2024-01-16',
      accion: 'Ver detalles'
    },
    {
      id: '2',
      tipo: 'success',
      titulo: 'Objetivo alcanzado',
      descripcion: 'Ha completado su objetivo de resistencia',
      fecha: '2024-01-15',
      accion: 'Celebrar'
    },
    {
      id: '3',
      tipo: 'info',
      titulo: 'Pago pendiente',
      descripcion: 'Factura de febrero vence en 3 días',
      fecha: '2024-01-14',
      accion: 'Pagar'
    }
  ];

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
      default: return null;
    }
  };

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getObjetivoColor = (estado: string) => {
    switch (estado) {
      case 'completado': return 'bg-green-100 text-green-800';
      case 'en_progreso': return 'bg-blue-100 text-blue-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertaColor = (tipo: string) => {
    switch (tipo) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const VistaGeneral = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricas.map((metrica) => (
          <motion.div
            key={metrica.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${metrica.color} rounded-xl text-white`}>
                <metrica.icono className="w-6 h-6" />
              </div>
              {getTendenciaIcon(metrica.tendencia)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{metrica.nombre}</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrica.valor}{metrica.unidad}
              </p>
              <p className={`text-sm ${getTendenciaColor(metrica.tendencia)}`}>
                {metrica.cambio > 0 ? '+' : ''}{metrica.cambio}{metrica.unidad} vs período anterior
              </p>
              {metrica.objetivo && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progreso</span>
                    <span>{Math.round((metrica.valor / metrica.objetivo) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${metrica.color} transition-all duration-500`}
                      style={{ width: `${Math.min((metrica.valor / metrica.objetivo) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Objetivos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Objetivos Activos</h3>
          <Target className="w-5 h-5 text-gray-600" />
        </div>
        <div className="space-y-4">
          {objetivos.map((objetivo) => (
            <div key={objetivo.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{objetivo.nombre}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getObjetivoColor(objetivo.estado)}`}>
                    {objetivo.estado.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(objetivo.prioridad)}`}>
                    {objetivo.prioridad}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Objetivo: {new Date(objetivo.fechaObjetivo).toLocaleDateString()}
                </span>
                <span className="text-sm font-bold text-gray-900">{objetivo.progreso}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    objetivo.estado === 'completado' ? 'bg-green-500' :
                    objetivo.estado === 'atrasado' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${objetivo.progreso}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Alertas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Alertas y Notificaciones</h3>
          <AlertCircle className="w-5 h-5 text-gray-600" />
        </div>
        <div className="space-y-3">
          {alertas.map((alerta) => (
            <div key={alerta.id} className={`p-4 rounded-lg border ${getAlertaColor(alerta.tipo)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{alerta.titulo}</h4>
                  <p className="text-sm mt-1">{alerta.descripcion}</p>
                  <p className="text-xs mt-2 opacity-75">
                    {new Date(alerta.fecha).toLocaleDateString()}
                  </p>
                </div>
                {alerta.accion && (
                  <button className="text-sm font-medium hover:underline">
                    {alerta.accion}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const VistaDetallada = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis Detallado</h3>
        <p className="text-gray-600">Vista detallada en desarrollo</p>
      </div>
    </div>
  );

  const VistaTendencias = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis de Tendencias</h3>
        <p className="text-gray-600">Gráficos de tendencias en desarrollo</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'general', label: 'General', icon: BarChart3 },
            { id: 'detallado', label: 'Detallado', icon: PieChart },
            { id: 'tendencias', label: 'Tendencias', icon: TrendingUp },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setVista(v.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                vista === v.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <v.icono className="w-4 h-4" />
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mes</option>
            <option value="trimestre">Este Trimestre</option>
          </select>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido de la vista activa */}
      {vista === 'general' && <VistaGeneral />}
      {vista === 'detallado' && <VistaDetallada />}
      {vista === 'tendencias' && <VistaTendencias />}
    </div>
  );
};

export default ClienteResumenEjecutivo;

