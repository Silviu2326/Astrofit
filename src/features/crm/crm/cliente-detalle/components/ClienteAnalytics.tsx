import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Calendar, 
  Activity,
  Heart,
  Zap,
  Award,
  Clock,
  PieChart,
  LineChart,
  Download,
  RefreshCw,
  Settings,
  Eye,
  Filter,
  Search,
  Bell,
  Mail,
  MessageCircle,
  Star,
  ThumbsUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface ClienteAnalyticsProps {
  clienteId: string;
  clienteNombre: string;
}

interface KPIMetric {
  id: string;
  nombre: string;
  valor: number;
  unidad: string;
  cambio: number;
  tendencia: 'up' | 'down' | 'stable';
  objetivo?: number;
  descripcion: string;
  categoria: 'rendimiento' | 'financiero' | 'satisfaccion' | 'retencion';
  prioridad: 'alta' | 'media' | 'baja';
}

interface AnalisisCohorte {
  id: string;
  nombre: string;
  fechaInicio: string;
  clientesIniciales: number;
  clientesRetenidos: number;
  tasaRetencion: number;
  ingresosGenerados: number;
  ltv: number;
}

interface PrediccionIngresos {
  mes: string;
  ingresosActuales: number;
  ingresosPredichos: number;
  confianza: number;
  factores: string[];
}

interface SegmentoCliente {
  id: string;
  nombre: string;
  descripcion: string;
  criterios: string[];
  clientes: number;
  valorPromedio: number;
  satisfaccion: number;
  retencion: number;
}

const ClienteAnalytics: React.FC<ClienteAnalyticsProps> = ({ clienteId, clienteNombre }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'cohortes' | 'predicciones' | 'segmentos'>('dashboard');
  const [periodo, setPeriodo] = useState<'semana' | 'mes' | 'trimestre' | 'año'>('mes');
  const [filtroCategoria, setFiltroCategoria] = useState<'todos' | 'rendimiento' | 'financiero' | 'satisfaccion' | 'retencion'>('todos');

  // Datos mock para demostración
  const kpis: KPIMetric[] = [
    {
      id: '1',
      nombre: 'Retención de Cliente',
      valor: 85,
      unidad: '%',
      cambio: 5.2,
      tendencia: 'up',
      objetivo: 90,
      descripcion: 'Porcentaje de clientes que continúan después del primer mes',
      categoria: 'retencion',
      prioridad: 'alta'
    },
    {
      id: '2',
      nombre: 'Lifetime Value (LTV)',
      valor: 2400,
      unidad: '€',
      cambio: 12.5,
      tendencia: 'up',
      objetivo: 3000,
      descripcion: 'Valor total generado por el cliente durante su relación',
      categoria: 'financiero',
      prioridad: 'alta'
    },
    {
      id: '3',
      nombre: 'Satisfacción del Cliente',
      valor: 4.7,
      unidad: '/5',
      cambio: 0.3,
      tendencia: 'up',
      objetivo: 4.8,
      descripcion: 'Puntuación promedio en encuestas de satisfacción',
      categoria: 'satisfaccion',
      prioridad: 'media'
    },
    {
      id: '4',
      nombre: 'Frecuencia de Sesiones',
      valor: 3.2,
      unidad: '/semana',
      cambio: -0.1,
      tendencia: 'down',
      objetivo: 4,
      descripcion: 'Promedio de sesiones por semana',
      categoria: 'rendimiento',
      prioridad: 'media'
    },
    {
      id: '5',
      nombre: 'Tiempo de Respuesta',
      valor: 2.5,
      unidad: 'horas',
      cambio: -0.8,
      tendencia: 'up',
      objetivo: 2,
      descripcion: 'Tiempo promedio de respuesta a consultas',
      categoria: 'rendimiento',
      prioridad: 'alta'
    },
    {
      id: '6',
      nombre: 'Adherencia al Plan',
      valor: 78,
      unidad: '%',
      cambio: 3.2,
      tendencia: 'up',
      objetivo: 85,
      descripcion: 'Porcentaje de cumplimiento del plan de entrenamiento',
      categoria: 'rendimiento',
      prioridad: 'alta'
    }
  ];

  const cohortes: AnalisisCohorte[] = [
    {
      id: '1',
      nombre: 'Enero 2024',
      fechaInicio: '2024-01-01',
      clientesIniciales: 25,
      clientesRetenidos: 22,
      tasaRetencion: 88,
      ingresosGenerados: 52800,
      ltv: 2400
    },
    {
      id: '2',
      nombre: 'Diciembre 2023',
      fechaInicio: '2023-12-01',
      clientesIniciales: 30,
      clientesRetenidos: 24,
      tasaRetencion: 80,
      ingresosGenerados: 57600,
      ltv: 2400
    },
    {
      id: '3',
      nombre: 'Noviembre 2023',
      fechaInicio: '2023-11-01',
      clientesIniciales: 28,
      clientesRetenidos: 20,
      tasaRetencion: 71,
      ingresosGenerados: 48000,
      ltv: 2400
    }
  ];

  const predicciones: PrediccionIngresos[] = [
    {
      mes: 'Febrero 2024',
      ingresosActuales: 18000,
      ingresosPredichos: 19500,
      confianza: 85,
      factores: ['Aumento en retención', 'Nuevos clientes', 'Mejora en LTV']
    },
    {
      mes: 'Marzo 2024',
      ingresosActuales: 0,
      ingresosPredichos: 21000,
      confianza: 78,
      factores: ['Crecimiento estacional', 'Expansión de servicios', 'Marketing mejorado']
    },
    {
      mes: 'Abril 2024',
      ingresosActuales: 0,
      ingresosPredichos: 22500,
      confianza: 72,
      factores: ['Tendencias históricas', 'Plan de crecimiento', 'Optimización de precios']
    }
  ];

  const segmentos: SegmentoCliente[] = [
    {
      id: '1',
      nombre: 'Clientes Premium',
      descripcion: 'Clientes con plan premium y alta satisfacción',
      criterios: ['Plan premium', 'Satisfacción > 4.5', 'LTV > 2000€'],
      clientes: 15,
      valorPromedio: 3200,
      satisfaccion: 4.8,
      retencion: 92
    },
    {
      id: '2',
      nombre: 'Clientes Regulares',
      descripcion: 'Clientes con plan estándar y buena adherencia',
      criterios: ['Plan estándar', 'Adherencia > 70%', 'LTV 1000-2000€'],
      clientes: 35,
      valorPromedio: 1800,
      satisfaccion: 4.2,
      retencion: 78
    },
    {
      id: '3',
      nombre: 'Clientes en Riesgo',
      descripcion: 'Clientes con baja adherencia o satisfacción',
      criterios: ['Adherencia < 50%', 'Satisfacción < 3.5', 'Faltas frecuentes'],
      clientes: 8,
      valorPromedio: 800,
      satisfaccion: 3.1,
      retencion: 45
    }
  ];

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
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

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'rendimiento': return 'bg-blue-100 text-blue-800';
      case 'financiero': return 'bg-green-100 text-green-800';
      case 'satisfaccion': return 'bg-purple-100 text-purple-800';
      case 'retencion': return 'bg-orange-100 text-orange-800';
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

  const DashboardView = () => (
    <div className="space-y-6">
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis
          .filter(kpi => filtroCategoria === 'todos' || kpi.categoria === filtroCategoria)
          .map((kpi, index) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    kpi.categoria === 'rendimiento' ? 'bg-blue-100' :
                    kpi.categoria === 'financiero' ? 'bg-green-100' :
                    kpi.categoria === 'satisfaccion' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    {kpi.categoria === 'rendimiento' ? <Activity className="w-5 h-5 text-blue-600" /> :
                     kpi.categoria === 'financiero' ? <DollarSign className="w-5 h-5 text-green-600" /> :
                     kpi.categoria === 'satisfaccion' ? <Heart className="w-5 h-5 text-purple-600" /> :
                     <Users className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{kpi.nombre}</h4>
                    <p className="text-xs text-gray-600">{kpi.descripcion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTendenciaIcon(kpi.tendencia)}
                  <span className={`text-sm font-medium ${getTendenciaColor(kpi.tendencia)}`}>
                    {kpi.cambio > 0 ? '+' : ''}{kpi.cambio}%
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{kpi.valor}</span>
                  <span className="text-sm text-gray-600">{kpi.unidad}</span>
                </div>
                {kpi.objetivo && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progreso hacia objetivo</span>
                      <span>{Math.round((kpi.valor / kpi.objetivo) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          kpi.categoria === 'rendimiento' ? 'bg-blue-500' :
                          kpi.categoria === 'financiero' ? 'bg-indigo-500' :
                          kpi.categoria === 'satisfaccion' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${Math.min((kpi.valor / kpi.objetivo) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(kpi.categoria)}`}>
                  {kpi.categoria}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(kpi.prioridad)}`}>
                  {kpi.prioridad}
                </span>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Gráficos de tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Tendencias de KPIs</h3>
            <LineChart className="w-5 h-5 text-gray-600" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 overflow-hidden">
            {kpis.slice(0, 5).map((kpi, index) => {
              // Normalizar los valores para que la barra más alta sea 200px
              const kpiValues = kpis.slice(0, 5).map(k => k.valor);
              const maxValue = Math.max(...kpiValues);
              const minValue = Math.min(...kpiValues);
              
              // Usar escala logarítmica si hay mucha diferencia entre valores
              const range = maxValue - minValue;
              const isLargeRange = range > maxValue * 0.5;
              
              let normalizedHeight;
              if (isLargeRange) {
                // Escala logarítmica para valores muy diferentes
                normalizedHeight = (Math.log(kpi.valor + 1) / Math.log(maxValue + 1)) * 200;
              } else {
                // Escala lineal normal
                normalizedHeight = (kpi.valor / maxValue) * 200;
              }
              
              const clampedHeight = Math.min(Math.max(normalizedHeight, 20), 200);
              
              return (
                <div key={kpi.id} className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 rounded-t-lg transition-all duration-500 ${
                      kpi.categoria === 'rendimiento' ? 'bg-blue-500' :
                      kpi.categoria === 'financiero' ? 'bg-indigo-500' :
                      kpi.categoria === 'satisfaccion' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}
                    style={{ 
                      height: `${clampedHeight}px`,
                      maxHeight: '200px'
                    }}
                  />
                  <span className="text-xs text-gray-600">{kpi.valor}</span>
                  <span className="text-xs text-gray-500">{kpi.nombre.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Distribución por Categoría</h3>
            <PieChart className="w-5 h-5 text-gray-600" />
          </div>
          <div className="space-y-3">
            {['rendimiento', 'financiero', 'satisfaccion', 'retencion'].map((categoria, index) => {
              const count = kpis.filter(kpi => kpi.categoria === categoria).length;
              const percentage = (count / kpis.length) * 100;
              return (
                <div key={categoria} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      categoria === 'rendimiento' ? 'bg-blue-500' :
                      categoria === 'financiero' ? 'bg-indigo-500' :
                      categoria === 'satisfaccion' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-700 capitalize">{categoria}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{count} KPIs</span>
                    <span className="text-sm font-bold text-gray-900">{percentage.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const CohortesView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Análisis de Cohortes</h3>
      
      <div className="space-y-4">
        {cohortes.map((cohorte) => (
          <motion.div
            key={cohorte.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{cohorte.nombre}</h4>
                  <p className="text-sm text-gray-600">
                    Inicio: {new Date(cohorte.fechaInicio).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{cohorte.tasaRetencion}%</p>
                <p className="text-sm text-gray-600">Tasa de Retención</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Clientes Iniciales</p>
                <p className="text-lg font-bold text-gray-900">{cohorte.clientesIniciales}</p>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm font-medium text-indigo-600">Clientes Retenidos</p>
                <p className="text-lg font-bold text-indigo-900">{cohorte.clientesRetenidos}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Ingresos Generados</p>
                <p className="text-lg font-bold text-blue-900">€{cohorte.ingresosGenerados.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-600">LTV Promedio</p>
                <p className="text-lg font-bold text-purple-900">€{cohorte.ltv}</p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                style={{ width: `${cohorte.tasaRetencion}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const PrediccionesView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Predicciones de Ingresos</h3>
      
      <div className="space-y-4">
        {predicciones.map((prediccion) => (
          <motion.div
            key={prediccion.mes}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{prediccion.mes}</h4>
                  <p className="text-sm text-gray-600">
                    Confianza: {prediccion.confianza}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  €{prediccion.ingresosPredichos.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Ingresos Predichos</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Ingresos Actuales</h5>
                <p className="text-2xl font-bold text-blue-900">
                  €{prediccion.ingresosActuales.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h5 className="font-medium text-indigo-900 mb-2">Ingresos Predichos</h5>
                <p className="text-2xl font-bold text-indigo-900">
                  €{prediccion.ingresosPredichos.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Factores de Predicción</h5>
              <div className="flex flex-wrap gap-2">
                {prediccion.factores.map((factor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const SegmentosView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Segmentación de Clientes</h3>
      
      <div className="space-y-4">
        {segmentos.map((segmento) => (
          <motion.div
            key={segmento.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{segmento.nombre}</h4>
                  <p className="text-sm text-gray-600">{segmento.descripcion}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{segmento.clientes}</p>
                <p className="text-sm text-gray-600">Clientes</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Valor Promedio</p>
                <p className="text-lg font-bold text-gray-900">€{segmento.valorPromedio}</p>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm font-medium text-indigo-600">Satisfacción</p>
                <p className="text-lg font-bold text-indigo-900">{segmento.satisfaccion}/5</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Retención</p>
                <p className="text-lg font-bold text-blue-900">{segmento.retencion}%</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-600">Criterios</p>
                <p className="text-lg font-bold text-purple-900">{segmento.criterios.length}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Criterios de Segmentación</h5>
              <div className="flex flex-wrap gap-2">
                {segmento.criterios.map((criterio, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                  >
                    {criterio}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Analytics Avanzados</h2>
            <p className="text-sm text-gray-600">KPIs y análisis predictivo para {clienteNombre}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mes</option>
            <option value="trimestre">Este Trimestre</option>
            <option value="año">Este Año</option>
          </select>
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="todos">Todas las categorías</option>
          <option value="rendimiento">Rendimiento</option>
          <option value="financiero">Financiero</option>
          <option value="satisfaccion">Satisfacción</option>
          <option value="retencion">Retención</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Filter className="w-4 h-4" />
          Filtros Avanzados
        </button>
      </div>

      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'cohortes', label: 'Cohortes', icon: Users },
          { id: 'predicciones', label: 'Predicciones', icon: TrendingUp },
          { id: 'segmentos', label: 'Segmentos', icon: Target },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === view.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon className="w-4 h-4" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Contenido de la vista activa */}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'cohortes' && <CohortesView />}
      {activeView === 'predicciones' && <PrediccionesView />}
      {activeView === 'segmentos' && <SegmentosView />}
    </div>
  );
};

export default ClienteAnalytics;
