import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  TrendingUp,
  TrendingDown,
  Award,
  Calendar,
  Target,
  BarChart3,
  FileText,
  Download,
  Filter,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

interface ExperimentResult {
  id: string;
  name: string;
  type: 'ab_test' | 'multivariate' | 'content' | 'timing';
  startDate: string;
  endDate: string;
  status: 'completed' | 'failed' | 'inconclusive';
  winner?: 'A' | 'B' | 'C';
  variants: {
    name: string;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
    revenue: number;
  }[];
  insights: string[];
  confidence: number;
  uplift: number;
  roi: number;
}

export default function HistorialExperimentos() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const experiments: ExperimentResult[] = [
    {
      id: 'exp-001',
      name: 'Título CTA - "Empieza Gratis" vs "Prueba Ahora"',
      type: 'ab_test',
      startDate: '2025-02-01',
      endDate: '2025-02-15',
      status: 'completed',
      winner: 'B',
      variants: [
        {
          name: 'A: Empieza Gratis',
          impressions: 15420,
          clicks: 1234,
          conversions: 234,
          ctr: 8.0,
          conversionRate: 18.96,
          revenue: 23400,
        },
        {
          name: 'B: Prueba Ahora',
          impressions: 15180,
          clicks: 1456,
          conversions: 312,
          ctr: 9.6,
          conversionRate: 21.43,
          revenue: 31200,
        },
      ],
      insights: [
        'El CTA "Prueba Ahora" genera +20% más clicks',
        'Tasa de conversión superior en 2.47 puntos porcentuales',
        'Mejor rendimiento en móvil (+28%)',
        'Mayor engagement en horario 14:00-18:00',
      ],
      confidence: 95,
      uplift: 33.3,
      roi: 148,
    },
    {
      id: 'exp-002',
      name: 'Horario Publicación - Mañana vs Tarde vs Noche',
      type: 'multivariate',
      startDate: '2025-02-10',
      endDate: '2025-02-24',
      status: 'completed',
      winner: 'B',
      variants: [
        {
          name: 'A: Mañana (8-12h)',
          impressions: 8420,
          clicks: 673,
          conversions: 101,
          ctr: 7.99,
          conversionRate: 15.01,
          revenue: 10100,
        },
        {
          name: 'B: Tarde (14-18h)',
          impressions: 9180,
          clicks: 1102,
          conversions: 198,
          ctr: 12.01,
          conversionRate: 17.97,
          revenue: 19800,
        },
        {
          name: 'C: Noche (20-23h)',
          impressions: 7650,
          clicks: 688,
          conversions: 110,
          ctr: 8.99,
          conversionRate: 15.99,
          revenue: 11000,
        },
      ],
      insights: [
        'La franja 14-18h obtiene +50% más engagement',
        'Usuarios más propensos a comprar en tarde',
        'Mañana tiene mayor alcance pero menor conversión',
        'Noche funciona bien para contenido informativo',
      ],
      confidence: 92,
      uplift: 96.0,
      roi: 165,
    },
    {
      id: 'exp-003',
      name: 'Formato Imagen - Producto Solo vs Lifestyle',
      type: 'content',
      startDate: '2025-02-05',
      endDate: '2025-02-12',
      status: 'completed',
      winner: 'A',
      variants: [
        {
          name: 'A: Producto Solo',
          impressions: 12300,
          clicks: 1107,
          conversions: 221,
          ctr: 9.0,
          conversionRate: 19.96,
          revenue: 22100,
        },
        {
          name: 'B: Lifestyle',
          impressions: 12100,
          clicks: 968,
          conversions: 174,
          ctr: 8.0,
          conversionRate: 17.98,
          revenue: 17400,
        },
      ],
      insights: [
        'Producto solo genera +27% más conversiones',
        'Mejor para anuncios de catálogo',
        'Lifestyle funciona mejor en awareness',
        'Producto solo tiene mejor CTR en móvil',
      ],
      confidence: 89,
      uplift: 27.0,
      roi: 127,
    },
    {
      id: 'exp-004',
      name: 'Longitud Copy - Corto vs Largo',
      type: 'content',
      startDate: '2025-01-28',
      endDate: '2025-02-08',
      status: 'failed',
      variants: [
        {
          name: 'A: Corto (<50 palabras)',
          impressions: 6200,
          clicks: 434,
          conversions: 52,
          ctr: 7.0,
          conversionRate: 11.98,
          revenue: 5200,
        },
        {
          name: 'B: Largo (>150 palabras)',
          impressions: 6100,
          clicks: 427,
          conversions: 49,
          ctr: 7.0,
          conversionRate: 11.48,
          revenue: 4900,
        },
      ],
      insights: [
        'No se encontró diferencia significativa',
        'Muestra insuficiente para conclusiones',
        'Requiere segmentación por audiencia',
        'Extender test 2 semanas más',
      ],
      confidence: 45,
      uplift: 6.1,
      roi: 6,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'inconclusive':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    const types = {
      ab_test: 'A/B Test',
      multivariate: 'Multivariante',
      content: 'Contenido',
      timing: 'Timing',
    };
    return types[type as keyof typeof types] || type;
  };

  const filteredExperiments = experiments.filter((exp) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      exp.status === selectedFilter ||
      exp.type === selectedFilter;
    const matchesSearch =
      exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.insights.some((insight) =>
        insight.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: experiments.length,
    completed: experiments.filter((e) => e.status === 'completed').length,
    avgUplift:
      experiments
        .filter((e) => e.status === 'completed')
        .reduce((acc, e) => acc + e.uplift, 0) /
      experiments.filter((e) => e.status === 'completed').length,
    avgROI:
      experiments
        .filter((e) => e.status === 'completed')
        .reduce((acc, e) => acc + e.roi, 0) /
      experiments.filter((e) => e.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-lime-500/10 rounded-2xl p-6 border border-amber-500/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-amber-500 via-yellow-500 to-lime-500 rounded-xl">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Historial de Experimentos
            </h2>
            <p className="text-amber-200">
              Resultados y aprendizajes de tests A/B
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-200 text-sm">Total Experimentos</span>
              <FlaskConical className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
            <p className="text-xs text-lime-300 mt-1">
              {stats.completed} completados
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-200 text-sm">Avg. Mejora</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              +{stats.avgUplift.toFixed(1)}%
            </p>
            <p className="text-xs text-lime-300 mt-1">En conversiones</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-200 text-sm">ROI Promedio</span>
              <Award className="w-4 h-4 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {stats.avgROI.toFixed(0)}%
            </p>
            <p className="text-xs text-lime-300 mt-1">Retorno inversión</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-amber-200 text-sm">Insights</span>
              <Lightbulb className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-white">
              {experiments.reduce((acc, e) => acc + e.insights.length, 0)}
            </p>
            <p className="text-xs text-lime-300 mt-1">Aprendizajes clave</p>
          </motion.div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar experimentos..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-lime-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'completed'
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-lime-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Completados
            </button>
            <button
              onClick={() => setSelectedFilter('ab_test')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'ab_test'
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-lime-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              A/B Tests
            </button>
            <button
              onClick={() => setSelectedFilter('multivariate')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'multivariate'
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-lime-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Multivariante
            </button>
          </div>
        </div>
      </div>

      {/* Lista de experimentos */}
      <div className="space-y-4">
        {filteredExperiments.map((experiment) => (
          <motion.div
            key={experiment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-amber-500/50 transition-colors"
          >
            {/* Header del experimento */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(experiment.status)}
                    <h3 className="text-xl font-bold text-white">
                      {experiment.name}
                    </h3>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium">
                      {getTypeLabel(experiment.type)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {experiment.startDate} → {experiment.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Confianza: {experiment.confidence}%
                    </span>
                  </div>
                </div>

                {experiment.status === 'completed' && (
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-2xl font-bold text-green-400">
                        +{experiment.uplift.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">Mejora total</p>
                  </div>
                )}
              </div>

              {/* Resultados de variantes */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {experiment.variants.map((variant, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${
                      experiment.winner &&
                      variant.name.startsWith(experiment.winner)
                        ? 'bg-gradient-to-br from-amber-500/20 to-lime-500/20 border-yellow-500'
                        : 'bg-slate-700/30 border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white">
                        {variant.name}
                      </h4>
                      {experiment.winner &&
                        variant.name.startsWith(experiment.winner) && (
                          <Award className="w-5 h-5 text-yellow-400" />
                        )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Impresiones:</span>
                        <span className="text-white font-medium">
                          {variant.impressions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Clicks:</span>
                        <span className="text-white font-medium">
                          {variant.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">CTR:</span>
                        <span className="text-amber-300 font-medium">
                          {variant.ctr.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Conv. Rate:</span>
                        <span className="text-lime-300 font-medium">
                          {variant.conversionRate.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-600">
                        <span className="text-slate-400">Revenue:</span>
                        <span className="text-green-400 font-bold">
                          ${variant.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights y aprendizajes */}
            <div className="p-6 bg-gradient-to-br from-amber-500/5 to-lime-500/5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h4 className="font-semibold text-white">
                  Insights y Aprendizajes
                </h4>
              </div>
              <ul className="space-y-2">
                {experiment.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{insight}</span>
                  </li>
                ))}
              </ul>

              {experiment.status === 'completed' && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-slate-400">
                          ROI: <strong className="text-lime-300">{experiment.roi}%</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-slate-400">
                          Confianza: <strong className="text-white">{experiment.confidence}%</strong>
                        </span>
                      </div>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-lime-500 text-white rounded-lg hover:from-amber-600 hover:to-lime-600 transition-all">
                      <Download className="w-4 h-4" />
                      Exportar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredExperiments.length === 0 && (
        <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
          <FlaskConical className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">
            No se encontraron experimentos
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Ajusta los filtros o realiza una nueva búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
