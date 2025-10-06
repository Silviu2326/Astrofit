import React, { useState } from 'react';
import { Clock, TrendingUp, Award, CheckCircle, XCircle, AlertCircle, BarChart3, Lightbulb, Filter, Download } from 'lucide-react';

interface ExperimentResult {
  id: string;
  name: string;
  type: 'email' | 'landing' | 'ad' | 'content';
  startDate: string;
  endDate: string;
  status: 'winner_a' | 'winner_b' | 'no_difference' | 'running';
  variantA: {
    name: string;
    conversions: number;
    clicks: number;
    impressions: number;
    conversionRate: number;
  };
  variantB: {
    name: string;
    conversions: number;
    clicks: number;
    impressions: number;
    conversionRate: number;
  };
  improvement: number;
  confidence: number;
  insights: string[];
}

const ExperimentHistory: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Datos de ejemplo
  const experiments: ExperimentResult[] = [
    {
      id: '1',
      name: 'Asunto con Emoji vs Sin Emoji',
      type: 'email',
      startDate: '2024-01-15',
      endDate: '2024-01-22',
      status: 'winner_a',
      variantA: {
        name: 'Con Emoji 🎉',
        conversions: 245,
        clicks: 1850,
        impressions: 5000,
        conversionRate: 4.9
      },
      variantB: {
        name: 'Sin Emoji',
        conversions: 198,
        clicks: 1620,
        impressions: 5000,
        conversionRate: 3.96
      },
      improvement: 23.7,
      confidence: 95,
      insights: [
        'Los emojis incrementaron la apertura en un 23.7%',
        'Mayor engagement en usuarios menores de 35 años',
        'Mejor rendimiento en horario de 9-11am'
      ]
    },
    {
      id: '2',
      name: 'CTA: "Comprar Ahora" vs "Ver Oferta"',
      type: 'landing',
      startDate: '2024-01-20',
      endDate: '2024-01-27',
      status: 'winner_b',
      variantA: {
        name: 'Comprar Ahora',
        conversions: 312,
        clicks: 2100,
        impressions: 8000,
        conversionRate: 3.9
      },
      variantB: {
        name: 'Ver Oferta',
        conversions: 398,
        clicks: 2450,
        impressions: 8000,
        conversionRate: 4.98
      },
      improvement: 27.6,
      confidence: 98,
      insights: [
        'CTAs menos agresivos generan más confianza',
        'Incremento del 27.6% en conversiones',
        'Menor tasa de rebote (-15%)'
      ]
    },
    {
      id: '3',
      name: 'Imagen Producto vs Lifestyle',
      type: 'ad',
      startDate: '2024-01-25',
      endDate: '2024-02-01',
      status: 'no_difference',
      variantA: {
        name: 'Producto',
        conversions: 156,
        clicks: 1200,
        impressions: 10000,
        conversionRate: 1.56
      },
      variantB: {
        name: 'Lifestyle',
        conversions: 162,
        clicks: 1250,
        impressions: 10000,
        conversionRate: 1.62
      },
      improvement: 3.8,
      confidence: 72,
      insights: [
        'Diferencia no estadísticamente significativa',
        'Ambas variantes tuvieron rendimiento similar',
        'Recomendación: Probar con segmentos específicos'
      ]
    }
  ];

  const getStatusBadge = (status: ExperimentResult['status']) => {
    const styles = {
      winner_a: 'bg-green-500/20 text-green-400 border-green-500/30',
      winner_b: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      no_difference: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      running: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };

    const labels = {
      winner_a: 'Ganó Variante A',
      winner_b: 'Ganó Variante B',
      no_difference: 'Sin Diferencia',
      running: 'En Curso'
    };

    const icons = {
      winner_a: <CheckCircle className="w-3 h-3" />,
      winner_b: <CheckCircle className="w-3 h-3" />,
      no_difference: <AlertCircle className="w-3 h-3" />,
      running: <Clock className="w-3 h-3" />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </span>
    );
  };

  const getTypeBadge = (type: ExperimentResult['type']) => {
    const labels = {
      email: 'Email',
      landing: 'Landing',
      ad: 'Anuncio',
      content: 'Contenido'
    };

    return (
      <span className="px-2 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-gray-300">
        {labels[type]}
      </span>
    );
  };

  const filteredExperiments = experiments.filter(exp => {
    const typeMatch = filterType === 'all' || exp.type === filterType;
    const statusMatch = filterStatus === 'all' || exp.status === filterStatus;
    return typeMatch && statusMatch;
  });

  // Calcular estadísticas generales
  const totalTests = experiments.length;
  const avgImprovement = experiments.reduce((acc, exp) => acc + exp.improvement, 0) / totalTests;
  const successRate = (experiments.filter(exp => exp.status === 'winner_a' || exp.status === 'winner_b').length / totalTests) * 100;

  return (
    <div className="space-y-6">
      {/* Header con gradiente amber-yellow-lime */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-500 to-lime-500 p-8">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Historial de Experimentos</h2>
                <p className="text-white/80">Análisis de tests A/B y aprendizajes</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white border border-white/30 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Tests Realizados</span>
            <BarChart3 className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-bold text-white">{totalTests}</p>
          <p className="text-sm text-green-400 mt-1">+3 este mes</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Mejora Promedio</span>
            <TrendingUp className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">+{avgImprovement.toFixed(1)}%</p>
          <p className="text-sm text-gray-400 mt-1">En conversiones</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Tasa de Éxito</span>
            <Award className="w-5 h-5 text-lime-400" />
          </div>
          <p className="text-3xl font-bold text-white">{successRate.toFixed(0)}%</p>
          <p className="text-sm text-gray-400 mt-1">Con resultados claros</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Todos los tipos</option>
            <option value="email">Email</option>
            <option value="landing">Landing</option>
            <option value="ad">Anuncio</option>
            <option value="content">Contenido</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Todos los estados</option>
            <option value="winner_a">Ganó A</option>
            <option value="winner_b">Ganó B</option>
            <option value="no_difference">Sin Diferencia</option>
            <option value="running">En Curso</option>
          </select>

          <span className="text-sm text-gray-400 ml-auto">
            {filteredExperiments.length} experimentos
          </span>
        </div>
      </div>

      {/* Lista de Experimentos */}
      <div className="space-y-4">
        {filteredExperiments.map((experiment) => (
          <div
            key={experiment.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
          >
            {/* Header del experimento */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{experiment.name}</h3>
                  {getTypeBadge(experiment.type)}
                  {getStatusBadge(experiment.status)}
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(experiment.startDate).toLocaleDateString()} - {new Date(experiment.endDate).toLocaleDateString()}
                </p>
              </div>

              {experiment.status !== 'running' && experiment.status !== 'no_difference' && (
                <div className="text-right">
                  <p className="text-sm text-gray-400">Mejora</p>
                  <p className="text-2xl font-bold text-green-400">+{experiment.improvement}%</p>
                  <p className="text-xs text-gray-500">{experiment.confidence}% confianza</p>
                </div>
              )}
            </div>

            {/* Resultados de las variantes */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Variante A */}
              <div className={`p-4 rounded-lg border ${
                experiment.status === 'winner_a'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{experiment.variantA.name}</h4>
                  {experiment.status === 'winner_a' && (
                    <Award className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Conversiones:</span>
                    <span className="text-white font-medium">{experiment.variantA.conversions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Clicks:</span>
                    <span className="text-white font-medium">{experiment.variantA.clicks}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tasa Conv.:</span>
                    <span className="text-white font-medium">{experiment.variantA.conversionRate}%</span>
                  </div>
                </div>
              </div>

              {/* Variante B */}
              <div className={`p-4 rounded-lg border ${
                experiment.status === 'winner_b'
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{experiment.variantB.name}</h4>
                  {experiment.status === 'winner_b' && (
                    <Award className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Conversiones:</span>
                    <span className="text-white font-medium">{experiment.variantB.conversions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Clicks:</span>
                    <span className="text-white font-medium">{experiment.variantB.clicks}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tasa Conv.:</span>
                    <span className="text-white font-medium">{experiment.variantB.conversionRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-lime-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h5 className="font-semibold text-white mb-2">Insights y Aprendizajes</h5>
                  <ul className="space-y-1">
                    {experiment.insights.map((insight, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Aprendizajes Clave */}
      <div className="bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-lime-500/20 border border-amber-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Aprendizajes Clave del Historial</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">🎯 Elementos más efectivos</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• CTAs con lenguaje suave (+27.6%)</li>
              <li>• Emojis en asuntos (+23.7%)</li>
              <li>• Personalización por edad</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">📊 Mejores horarios</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• 9-11am: Mayor apertura</li>
              <li>• Martes-Jueves: Más conversiones</li>
              <li>• Evitar fines de semana</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">👥 Segmentos ganadores</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• &lt;35 años: Prefieren emojis</li>
              <li>• &gt;45 años: Prefieren formal</li>
              <li>• Mobile: Textos cortos</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">⚠️ Áreas de mejora</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Probar más variantes de imagen</li>
              <li>• Segmentar mejor audiencias</li>
              <li>• Aumentar tamaño de muestra</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentHistory;
