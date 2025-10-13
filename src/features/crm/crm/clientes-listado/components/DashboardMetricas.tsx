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
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface DashboardMetricasProps {
  onMetricaSelect: (metrica: Metrica) => void;
  onReporteGenerar: (tipo: string) => void;
}

interface Metrica {
  id: string;
  nombre: string;
  valor: number;
  unidad: string;
  cambio: number;
  tendencia: 'up' | 'down' | 'stable';
  objetivo?: number;
  descripcion: string;
  categoria: 'rendimiento' | 'financiero' | 'satisfaccion' | 'retencion' | 'crecimiento';
  prioridad: 'alta' | 'media' | 'baja';
  historial: PuntoHistorial[];
}

interface PuntoHistorial {
  fecha: string;
  valor: number;
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

const DashboardMetricas: React.FC<DashboardMetricasProps> = ({ onMetricaSelect, onReporteGenerar }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'cohortes' | 'predicciones' | 'tendencias'>('dashboard');
  const [periodo, setPeriodo] = useState<'semana' | 'mes' | 'trimestre' | 'año'>('mes');
  const [filtroCategoria, setFiltroCategoria] = useState<'todos' | 'rendimiento' | 'financiero' | 'satisfaccion' | 'retencion' | 'crecimiento'>('todos');

  // Datos mock para demostración
  const metricas: Metrica[] = [
    {
      id: '1',
      nombre: 'Total Clientes',
      valor: 1247,
      unidad: '',
      cambio: 12.5,
      tendencia: 'up',
      objetivo: 1500,
      descripcion: 'Número total de clientes registrados',
      categoria: 'crecimiento',
      prioridad: 'alta',
      historial: [
        { fecha: '2024-01-01', valor: 1100 },
        { fecha: '2024-01-08', valor: 1150 },
        { fecha: '2024-01-15', valor: 1247 }
      ]
    },
    {
      id: '2',
      nombre: 'Retención de Clientes',
      valor: 85,
      unidad: '%',
      cambio: 5.2,
      tendencia: 'up',
      objetivo: 90,
      descripcion: 'Porcentaje de clientes que continúan después del primer mes',
      categoria: 'retencion',
      prioridad: 'alta',
      historial: [
        { fecha: '2024-01-01', valor: 78 },
        { fecha: '2024-01-08', valor: 82 },
        { fecha: '2024-01-15', valor: 85 }
      ]
    },
    {
      id: '3',
      nombre: 'Lifetime Value (LTV)',
      valor: 2400,
      unidad: '€',
      cambio: 8.3,
      tendencia: 'up',
      objetivo: 3000,
      descripcion: 'Valor total generado por el cliente durante su relación',
      categoria: 'financiero',
      prioridad: 'alta',
      historial: [
        { fecha: '2024-01-01', valor: 2200 },
        { fecha: '2024-01-08', valor: 2300 },
        { fecha: '2024-01-15', valor: 2400 }
      ]
    },
    {
      id: '4',
      nombre: 'Satisfacción del Cliente',
      valor: 4.7,
      unidad: '/5',
      cambio: 0.3,
      tendencia: 'up',
      objetivo: 4.8,
      descripcion: 'Puntuación promedio en encuestas de satisfacción',
      categoria: 'satisfaccion',
      prioridad: 'media',
      historial: [
        { fecha: '2024-01-01', valor: 4.4 },
        { fecha: '2024-01-08', valor: 4.6 },
        { fecha: '2024-01-15', valor: 4.7 }
      ]
    },
    {
      id: '5',
      nombre: 'Tasa de Conversión',
      valor: 23.5,
      unidad: '%',
      cambio: -2.1,
      tendencia: 'down',
      objetivo: 25,
      descripcion: 'Porcentaje de leads que se convierten en clientes',
      categoria: 'rendimiento',
      prioridad: 'media',
      historial: [
        { fecha: '2024-01-01', valor: 25.6 },
        { fecha: '2024-01-08', valor: 24.2 },
        { fecha: '2024-01-15', valor: 23.5 }
      ]
    },
    {
      id: '6',
      nombre: 'Ingresos Mensuales',
      valor: 125000,
      unidad: '€',
      cambio: 15.8,
      tendencia: 'up',
      objetivo: 150000,
      descripcion: 'Ingresos totales generados en el mes actual',
      categoria: 'financiero',
      prioridad: 'alta',
      historial: [
        { fecha: '2024-01-01', valor: 108000 },
        { fecha: '2024-01-08', valor: 116000 },
        { fecha: '2024-01-15', valor: 125000 }
      ]
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
      ingresosActuales: 0,
      ingresosPredichos: 135000,
      confianza: 85,
      factores: ['Aumento en retención', 'Nuevos clientes', 'Mejora en LTV']
    },
    {
      mes: 'Marzo 2024',
      ingresosActuales: 0,
      ingresosPredichos: 145000,
      confianza: 78,
      factores: ['Crecimiento estacional', 'Expansión de servicios', 'Marketing mejorado']
    },
    {
      mes: 'Abril 2024',
      ingresosActuales: 0,
      ingresosPredichos: 155000,
      confianza: 72,
      factores: ['Tendencias históricas', 'Plan de crecimiento', 'Optimización de precios']
    }
  ];

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
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
      case 'crecimiento': return 'bg-indigo-100 text-indigo-800';
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
        {metricas
          .filter(metrica => filtroCategoria === 'todos' || metrica.categoria === filtroCategoria)
          .map((metrica, index) => (
            <motion.div
              key={metrica.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => onMetricaSelect(metrica)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    metrica.categoria === 'rendimiento' ? 'bg-blue-100' :
                    metrica.categoria === 'financiero' ? 'bg-green-100' :
                    metrica.categoria === 'satisfaccion' ? 'bg-purple-100' :
                    metrica.categoria === 'retencion' ? 'bg-orange-100' :
                    'bg-indigo-100'
                  }`}>
                    {metrica.categoria === 'rendimiento' ? <Activity className="w-5 h-5 text-blue-600" /> :
                     metrica.categoria === 'financiero' ? <DollarSign className="w-5 h-5 text-green-600" /> :
                     metrica.categoria === 'satisfaccion' ? <Heart className="w-5 h-5 text-purple-600" /> :
                     metrica.categoria === 'retencion' ? <Users className="w-5 h-5 text-orange-600" /> :
                     <TrendingUp className="w-5 h-5 text-indigo-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{metrica.nombre}</h4>
                    <p className="text-xs text-gray-600">{metrica.descripcion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getTendenciaIcon(metrica.tendencia)}
                  <span className={`text-sm font-medium ${getTendenciaColor(metrica.tendencia)}`}>
                    {metrica.cambio > 0 ? '+' : ''}{metrica.cambio}%
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{metrica.valor.toLocaleString()}</span>
                  <span className="text-sm text-gray-600">{metrica.unidad}</span>
                </div>
                {metrica.objetivo && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progreso hacia objetivo</span>
                      <span>{Math.round((metrica.valor / metrica.objetivo) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          metrica.categoria === 'rendimiento' ? 'bg-blue-500' :
                          metrica.categoria === 'financiero' ? 'bg-green-500' :
                          metrica.categoria === 'satisfaccion' ? 'bg-purple-500' :
                          metrica.categoria === 'retencion' ? 'bg-orange-500' :
                          'bg-indigo-500'
                        }`}
                        style={{ width: `${Math.min((metrica.valor / metrica.objetivo) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(metrica.categoria)}`}>
                  {metrica.categoria}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(metrica.prioridad)}`}>
                  {metrica.prioridad}
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
          <div className="h-64 flex items-end justify-between space-x-2">
            {metricas.slice(0, 5).map((metrica, index) => {
              const maxValue = Math.max(...metricas.slice(0, 5).map(m => m.valor));
              const normalizedHeight = (metrica.valor / maxValue) * 200;
              const clampedHeight = Math.min(Math.max(normalizedHeight, 20), 200);
              
              return (
                <div key={metrica.id} className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 rounded-t-lg transition-all duration-500 ${
                      metrica.categoria === 'rendimiento' ? 'bg-blue-500' :
                      metrica.categoria === 'financiero' ? 'bg-green-500' :
                      metrica.categoria === 'satisfaccion' ? 'bg-purple-500' :
                      metrica.categoria === 'retencion' ? 'bg-orange-500' :
                      'bg-indigo-500'
                    }`}
                    style={{ height: `${clampedHeight}px` }}
                  />
                  <span className="text-xs text-gray-600">{metrica.valor}</span>
                  <span className="text-xs text-gray-500">{metrica.nombre.split(' ')[0]}</span>
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
            {['rendimiento', 'financiero', 'satisfaccion', 'retencion', 'crecimiento'].map((categoria, index) => {
              const count = metricas.filter(m => m.categoria === categoria).length;
              const percentage = (count / metricas.length) * 100;
              return (
                <div key={categoria} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      categoria === 'rendimiento' ? 'bg-blue-500' :
                      categoria === 'financiero' ? 'bg-green-500' :
                      categoria === 'satisfaccion' ? 'bg-purple-500' :
                      categoria === 'retencion' ? 'bg-orange-500' :
                      'bg-indigo-500'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Dashboard de Métricas</h2>
            <p className="text-sm text-gray-600">KPIs y análisis avanzados de clientes</p>
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
          <button 
            onClick={() => onReporteGenerar('dashboard')}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
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
          <option value="crecimiento">Crecimiento</option>
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
          { id: 'tendencias', label: 'Tendencias', icon: LineChart },
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
      {activeView === 'tendencias' && <div>Vista de Tendencias (en desarrollo)</div>}
    </div>
  );
};

export default DashboardMetricas;

