import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Clock,
  Trophy,
  DollarSign
} from 'lucide-react';
import { TestResultsCard } from './TestResultsCard';
import { StatisticalSignificance } from './StatisticalSignificance';
import { ImplementationRecommendations } from './ImplementationRecommendations';
import { useTestResults } from '../hooks/useTestResults';
import { TestResults } from '../types/testResults';

interface TestResultsDashboardProps {
  testId?: string;
}

export function TestResultsDashboard({ testId = 'test-1' }: TestResultsDashboardProps) {
  const { fetchTestResults, loading } = useTestResults();
  const [results, setResults] = useState<TestResults | null>(null);

  useEffect(() => {
    loadResults();
  }, [testId]);

  const loadResults = async () => {
    const data = await fetchTestResults(testId);
    setResults(data);
  };

  const exportResults = () => {
    if (!results) return;

    const data = {
      test: results.name,
      startDate: results.startDate,
      endDate: results.endDate,
      status: results.status,
      control: results.control,
      variants: results.variants,
      winner: results.winner,
      confidence: results.confidence,
      improvement: results.improvement,
      estimatedRevenueLift: results.estimatedRevenueLift,
      recommendations: results.recommendations
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-results-${results.id}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading || !results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse mb-4" />
              <p className="text-lg font-medium text-gray-900">Cargando resultados...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTestDuration = () => {
    if (!results.endDate) return 'En curso';
    const start = new Date(results.startDate);
    const end = new Date(results.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} días`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {results.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Resultados de Test A/B
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(results.startDate)}
                    {results.endDate && ` - ${formatDate(results.endDate)}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{getTestDuration()}</span>
                </div>
                <div className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${results.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : results.status === 'running'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                  }
                `}>
                  {results.status === 'completed' ? 'Completado' :
                   results.status === 'running' ? 'En Curso' : 'Pausado'}
                </div>
              </div>
            </div>

            <button
              onClick={exportResults}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Resultados
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6">
            {/* Winner */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Ganador</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {results.winner?.name || 'N/A'}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {results.significance.isSignificant
                  ? 'Estadísticamente significativo'
                  : 'Recolectando datos'
                }
              </p>
            </div>

            {/* Improvement */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">Mejora</span>
              </div>
              <div className={`text-2xl font-bold ${
                results.improvement > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {results.improvement > 0 ? '+' : ''}{results.improvement.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-600 mt-1">
                vs. control
              </p>
            </div>

            {/* Revenue Lift */}
            <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-gray-700">Incremento Proyectado</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${results.estimatedRevenueLift.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Revenue adicional estimado
              </p>
            </div>
          </div>
        </div>

        {/* Statistical Significance */}
        <StatisticalSignificance
          significance={results.significance}
          improvement={results.improvement}
        />

        {/* Variant Comparison */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Comparación de Variantes
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Control */}
            <TestResultsCard
              variant={results.control}
              control={results.control}
              isWinner={false}
            />

            {/* Variants */}
            {results.variants.map((variant) => (
              <TestResultsCard
                key={variant.id}
                variant={variant}
                control={results.control}
                isWinner={results.winner?.id === variant.id}
              />
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {results.recommendations.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Próximos Pasos
            </h2>
            <ImplementationRecommendations recommendations={results.recommendations} />
          </div>
        )}

        {/* Additional Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Insights Adicionales
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Métricas de Engagement
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Click-Through Rate</span>
                    <span className="font-semibold text-gray-900">
                      {results.winner?.ctr.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                      style={{ width: `${Math.min(results.winner?.ctr || 0, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-semibold text-gray-900">
                      {results.winner?.conversionRate.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                      style={{ width: `${Math.min(results.winner?.conversionRate || 0, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Métricas de Revenue
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Average Order Value</span>
                    <span className="font-semibold text-gray-900">
                      ${results.winner?.avgOrderValue.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                      style={{ width: `${Math.min((results.winner?.avgOrderValue || 0) / 2, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Revenue per Visitor</span>
                    <span className="font-semibold text-gray-900">
                      ${results.winner?.revenuePerVisitor.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                      style={{ width: `${Math.min((results.winner?.revenuePerVisitor || 0) * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
