import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Beaker, TrendingUp, Target, DollarSign, Plus, Filter, Search,
  Activity, Play, Pause, Check, Clock, Calendar, BarChart3,
  Eye, Users, MousePointer, ArrowUpRight, ArrowDownRight,
  Sparkles, AlertCircle, CheckCircle, XCircle, ChevronRight
} from 'lucide-react';
import {
  fetchExperiments,
  fetchExperimentStats,
  Experiment,
  ExperimentStats,
  ExperimentStatus
} from './experimentosApi';

const ExperimentosPage: React.FC = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [stats, setStats] = useState<ExperimentStats | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<ExperimentStatus | 'all'>('all');
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [experimentsData, statsData] = await Promise.all([
        fetchExperiments(),
        fetchExperimentStats()
      ]);
      setExperiments(experimentsData);
      setStats(statsData);
    };
    loadData();
  }, []);

  const filteredExperiments = experiments.filter(exp => {
    const matchesFilter = selectedFilter === 'all' || exp.status === selectedFilter;
    const matchesSearch = exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.hypothesis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: ExperimentStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'draft':
        return 'bg-gray-400';
      case 'scheduled':
        return 'bg-purple-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: ExperimentStatus) => {
    switch (status) {
      case 'active':
        return <Play className="w-3 h-3" />;
      case 'paused':
        return <Pause className="w-3 h-3" />;
      case 'completed':
        return <Check className="w-3 h-3" />;
      case 'draft':
        return <AlertCircle className="w-3 h-3" />;
      case 'scheduled':
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 95) {
      return { text: 'Significancia alcanzada', color: 'bg-green-500', icon: CheckCircle };
    } else if (confidence >= 75) {
      return { text: 'Resultados preliminares', color: 'bg-blue-500', icon: Activity };
    } else if (confidence >= 50) {
      return { text: 'Recolectando datos', color: 'bg-yellow-500', icon: Clock };
    } else {
      return { text: 'Datos insuficientes', color: 'bg-gray-400', icon: AlertCircle };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'landing_page':
        return '🎨';
      case 'email':
        return '📧';
      case 'pricing':
        return '💰';
      case 'cta':
        return '🎯';
      case 'copy':
        return '✍️';
      case 'multivariate':
        return '🧪';
      default:
        return '📊';
    }
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando experimentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Beaker className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Experimentos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">A/B</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Optimiza tus conversiones con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">tests basados en datos</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Tests en tiempo real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Análisis estadístico</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Optimización continua</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Experimentos Activos',
            value: stats.activeExperiments,
            icon: Activity,
            gradient: 'from-green-500 to-emerald-600',
            change: '+12%',
            trend: 'up'
          },
          {
            title: 'Tests Completados',
            value: stats.completedTests,
            icon: CheckCircle,
            gradient: 'from-blue-500 to-indigo-600',
            change: '+8',
            trend: 'up'
          },
          {
            title: 'Mejora Promedio',
            value: `${stats.avgConversionImprovement.toFixed(1)}%`,
            icon: TrendingUp,
            gradient: 'from-orange-500 to-red-600',
            change: '+5.2%',
            trend: 'up'
          },
          {
            title: 'Ganancia Total',
            value: `$${(stats.totalEstimatedGain / 1000).toFixed(1)}K`,
            icon: DollarSign,
            gradient: 'from-purple-500 to-pink-600',
            change: '+18K',
            trend: 'up'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className={`p-1 ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className={`text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Barra de acciones y filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar experimentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Todos', icon: Filter },
              { value: 'active', label: 'Activos', icon: Play },
              { value: 'completed', label: 'Completados', icon: CheckCircle },
              { value: 'draft', label: 'Borradores', icon: AlertCircle },
              { value: 'scheduled', label: 'Programados', icon: Clock }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  selectedFilter === filter.value
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                <span className="text-sm">{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Botón crear */}
          <button
            onClick={() => setShowCreateWizard(true)}
            className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-3 text-white font-semibold flex items-center gap-2 group"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Plus className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Crear Experimento</span>
          </button>
        </div>
      </motion.div>

      {/* Galería de Experimentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredExperiments.map((experiment, index) => {
          const confidenceBadge = getConfidenceBadge(experiment.confidence);
          const Icon = confidenceBadge.icon;

          return (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedExperiment(experiment)}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 overflow-hidden cursor-pointer group"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getTypeIcon(experiment.type)}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`${getStatusColor(experiment.status)} text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1`}>
                          {getStatusIcon(experiment.status)}
                          {experiment.status}
                        </div>
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                        {experiment.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Hipótesis */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  <span className="font-semibold text-gray-700">Hipótesis:</span> {experiment.hypothesis}
                </p>

                {/* Métricas principales */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-600">Visitantes</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {experiment.currentSample.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-600">Progreso</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {((experiment.currentSample / experiment.sampleSize) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                {/* Variantes */}
                <div className="space-y-2 mb-4">
                  {experiment.variants.slice(0, 3).map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {variant.id}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{variant.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{variant.conversionRate}%</p>
                        <p className="text-xs text-gray-500">{variant.conversions} conv.</p>
                      </div>
                    </div>
                  ))}
                  {experiment.variants.length > 3 && (
                    <p className="text-xs text-center text-gray-500">+{experiment.variants.length - 3} variantes más</p>
                  )}
                </div>

                {/* Ganador provisional */}
                {experiment.winningVariant && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs font-semibold text-green-700">Ganador Provisional</p>
                        <p className="text-sm font-bold text-green-900">
                          Variante {experiment.winningVariant} • +{experiment.improvementVsControl}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Significancia estadística */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">Confianza Estadística</span>
                    <span className="text-xs font-bold text-gray-900">{experiment.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${experiment.confidence}%` }}
                      transition={{ delay: index * 0.05 + 0.5, duration: 1 }}
                      className={`h-full rounded-full relative ${
                        experiment.confidence >= 95 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        experiment.confidence >= 75 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                        experiment.confidence >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                        'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                  </div>
                  <div className={`mt-2 flex items-center gap-2 px-3 py-1 rounded-full ${confidenceBadge.color} bg-opacity-10 w-fit`}>
                    <Icon className={`w-3 h-3 ${confidenceBadge.color.replace('bg-', 'text-')}`} />
                    <span className={`text-xs font-semibold ${confidenceBadge.color.replace('bg-', 'text-')}`}>
                      {confidenceBadge.text}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{experiment.duration} días</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Ver detalles</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredExperiments.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center mx-auto mb-6">
            <Beaker className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No hay experimentos</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchQuery
              ? 'No se encontraron experimentos que coincidan con tu búsqueda'
              : 'Crea tu primer experimento A/B para comenzar a optimizar tus conversiones'}
          </p>
          <button
            onClick={() => setShowCreateWizard(true)}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
          >
            Crear primer experimento
          </button>
        </motion.div>
      )}

      {/* Modal placeholder - se implementará en componentes separados */}
      {showCreateWizard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Crear Nuevo Experimento</h2>
            <p className="text-gray-600 mb-6">El wizard de creación estará disponible próximamente</p>
            <button
              onClick={() => setShowCreateWizard(false)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Cerrar
            </button>
          </motion.div>
        </div>
      )}

      {selectedExperiment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedExperiment.name}</h2>
            <p className="text-gray-600 mb-6">Vista detallada disponible próximamente</p>
            <button
              onClick={() => setSelectedExperiment(null)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Cerrar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ExperimentosPage;
