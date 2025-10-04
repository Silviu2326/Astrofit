import React, { useEffect, useState } from 'react';

interface RetentionCohort {
  cohort: string;
  initialUsers: number;
  month1: number;
  month3: number;
  month6: number;
  month12: number;
  avgLifetime: number;
  cohortValue: number;
}

interface RetentionFactor {
  factor: string;
  impact: number;
  category: 'positive' | 'negative';
  description: string;
  strength: 'high' | 'medium' | 'low';
}

const RetencionAnalysis: React.FC = () => {
  const [cohorts, setCohorts] = useState<RetentionCohort[]>([]);
  const [factors, setFactors] = useState<RetentionFactor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<'retention' | 'revenue'>('retention');

  useEffect(() => {
    setTimeout(() => {
      const mockCohorts: RetentionCohort[] = [
        {
          cohort: 'Ene 2024',
          initialUsers: 15,
          month1: 86.7,
          month3: 73.3,
          month6: 60.0,
          month12: 46.7,
          avgLifetime: 14.2,
          cohortValue: 1680
        },
        {
          cohort: 'Mar 2024',
          initialUsers: 12,
          month1: 91.7,
          month3: 83.3,
          month6: 75.0,
          month12: 58.3,
          avgLifetime: 16.8,
          cohortValue: 1890
        },
        {
          cohort: 'May 2024',
          initialUsers: 18,
          month1: 88.9,
          month3: 77.8,
          month6: 66.7,
          month12: 50.0,
          avgLifetime: 15.1,
          cohortValue: 2340
        },
        {
          cohort: 'Jul 2024',
          initialUsers: 22,
          month1: 90.9,
          month3: 81.8,
          month6: 72.7,
          month12: 59.1,
          avgLifetime: 17.5,
          cohortValue: 2980
        },
        {
          cohort: 'Sep 2024',
          initialUsers: 20,
          month1: 95.0,
          month3: 85.0,
          month6: 75.0,
          month12: 65.0,
          avgLifetime: 18.9,
          cohortValue: 3120
        },
        {
          cohort: 'Nov 2024',
          initialUsers: 16,
          month1: 93.8,
          month3: 87.5,
          month6: 81.3,
          month12: 68.8,
          avgLifetime: 19.7,
          cohortValue: 2650
        }
      ];

      const mockFactors: RetentionFactor[] = [
        {
          factor: 'Onboarding Personalizado',
          impact: 23,
          category: 'positive',
          description: 'Seguimiento en primeras 2 semanas',
          strength: 'high'
        },
        {
          factor: 'Entrenador Asignado',
          impact: 18,
          category: 'positive',
          description: 'Relación personal con entrenador',
          strength: 'high'
        },
        {
          factor: 'Programa Estructurado',
          impact: 15,
          category: 'positive',
          description: 'Plan de entrenamiento definido',
          strength: 'medium'
        },
        {
          factor: 'Comunidad Activa',
          impact: 12,
          category: 'positive',
          description: 'Eventos y actividades grupales',
          strength: 'medium'
        },
        {
          factor: 'Flexibilidad Horarios',
          impact: -8,
          category: 'negative',
          description: 'Dificultad para reservar horarios',
          strength: 'medium'
        },
        {
          factor: 'Precio Competitivo',
          impact: -12,
          category: 'negative',
          description: 'Ofertas de competencia',
          strength: 'medium'
        },
        {
          factor: 'Falta de Resultados',
          impact: -20,
          category: 'negative',
          description: 'No ver progreso esperado',
          strength: 'high'
        }
      ];

      setCohorts(mockCohorts);
      setFactors(mockFactors);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-48 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getRetentionColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getFactorColor = (factor: RetentionFactor) => {
    if (factor.category === 'positive') {
      return factor.strength === 'high' ? 'text-green-700' : 'text-green-600';
    } else {
      return factor.strength === 'high' ? 'text-red-700' : 'text-red-600';
    }
  };

  const averageRetention = {
    month1: cohorts.reduce((acc, c) => acc + c.month1, 0) / cohorts.length,
    month3: cohorts.reduce((acc, c) => acc + c.month3, 0) / cohorts.length,
    month6: cohorts.reduce((acc, c) => acc + c.month6, 0) / cohorts.length,
    month12: cohorts.reduce((acc, c) => acc + c.month12, 0) / cohorts.length
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Análisis de Retención</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMetric('retention')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedMetric === 'retention'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Retención
          </button>
          <button
            onClick={() => setSelectedMetric('revenue')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              selectedMetric === 'revenue'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Valor
          </button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Retención 1 mes</div>
          <div className="text-2xl font-bold text-green-700">{averageRetention.month1.toFixed(1)}%</div>
          <div className="text-xs text-green-600">Promedio general</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Retención 6 meses</div>
          <div className="text-2xl font-bold text-blue-700">{averageRetention.month6.toFixed(1)}%</div>
          <div className="text-xs text-blue-600">Meta: >70%</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">Retención 12 meses</div>
          <div className="text-2xl font-bold text-purple-700">{averageRetention.month12.toFixed(1)}%</div>
          <div className="text-xs text-purple-600">Excelente: >60%</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="text-sm text-orange-600 font-medium">Vida Promedio</div>
          <div className="text-2xl font-bold text-orange-700">
            {(cohorts.reduce((acc, c) => acc + c.avgLifetime, 0) / cohorts.length).toFixed(1)}
          </div>
          <div className="text-xs text-orange-600">meses</div>
        </div>
      </div>

      {/* Cohort analysis table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-600">Cohorte</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">Usuarios</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">1 mes</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">3 meses</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">6 meses</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">12 meses</th>
              {selectedMetric === 'revenue' && (
                <th className="text-right py-3 px-2 font-medium text-gray-600">Valor Total</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cohorts.map((cohort, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">{cohort.cohort}</td>
                <td className="py-3 px-2 text-center">{cohort.initialUsers}</td>
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getRetentionColor(cohort.month1)}`}></div>
                    <span className="font-medium">{cohort.month1}%</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getRetentionColor(cohort.month3)}`}></div>
                    <span className="font-medium">{cohort.month3}%</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getRetentionColor(cohort.month6)}`}></div>
                    <span className="font-medium">{cohort.month6}%</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getRetentionColor(cohort.month12)}`}></div>
                    <span className="font-medium">{cohort.month12}%</span>
                  </div>
                </td>
                {selectedMetric === 'revenue' && (
                  <td className="py-3 px-2 text-right font-bold text-green-600">
                    {cohort.cohortValue.toLocaleString()}€
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Retention factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-green-500 mr-2">📈</span>
            Factores Positivos
          </h4>
          <div className="space-y-3">
            {factors
              .filter(f => f.category === 'positive')
              .sort((a, b) => b.impact - a.impact)
              .map((factor, index) => (
                <div key={index} className="border border-green-200 rounded-lg p-3 bg-green-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-green-800">{factor.factor}</span>
                    <span className="text-green-700 font-bold">+{factor.impact}%</span>
                  </div>
                  <div className="text-sm text-green-700">{factor.description}</div>
                  <div className="mt-2">
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(factor.impact / 25) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-red-500 mr-2">📉</span>
            Factores de Riesgo
          </h4>
          <div className="space-y-3">
            {factors
              .filter(f => f.category === 'negative')
              .sort((a, b) => a.impact - b.impact)
              .map((factor, index) => (
                <div key={index} className="border border-red-200 rounded-lg p-3 bg-red-50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-red-800">{factor.factor}</span>
                    <span className="text-red-700 font-bold">{factor.impact}%</span>
                  </div>
                  <div className="text-sm text-red-700">{factor.description}</div>
                  <div className="mt-2">
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(Math.abs(factor.impact) / 25) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Retention trends chart */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-4">Tendencia de Retención por Periodo</h4>
        <div className="relative h-48">
          <div className="flex items-end justify-between h-40 border-b border-gray-200">
            {cohorts.map((cohort, index) => {
              const retention6m = cohort.month6;
              const height = (retention6m / 100) * 80 + 10;

              return (
                <div key={index} className="flex flex-col items-center flex-1 relative group">
                  <div className="relative">
                    <div
                      className={`rounded-t-md w-8 transition-all duration-300 ${
                        retention6m >= 70 ? 'bg-gradient-to-t from-green-500 to-green-400' :
                        retention6m >= 50 ? 'bg-gradient-to-t from-yellow-500 to-yellow-400' :
                        'bg-gradient-to-t from-red-500 to-red-400'
                      } hover:opacity-80 cursor-pointer`}
                      style={{ height: `${height}%` }}
                    ></div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        <div>{cohort.cohort}</div>
                        <div>6m: {cohort.month6}%</div>
                        <div>12m: {cohort.month12}%</div>
                        <div>Valor: {cohort.cohortValue.toLocaleString()}€</div>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-gray-500 mt-2 text-center">{cohort.cohort}</span>
                </div>
              );
            })}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-40 flex flex-col justify-between text-xs text-gray-500 -ml-12">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
        </div>
      </div>

      {/* Action recommendations */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 text-sm mb-3">🎯 Recomendaciones de Mejora</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium text-blue-700">Corto plazo (1-3 meses):</div>
            <ul className="space-y-1 text-blue-600">
              <li>• Mejorar proceso de onboarding inicial</li>
              <li>• Implementar check-ins mensuales personalizados</li>
              <li>• Crear programa de seguimiento en primeras semanas</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-blue-700">Largo plazo (6+ meses):</div>
            <ul className="space-y-1 text-blue-600">
              <li>• Desarrollar comunidad de miembros activa</li>
              <li>• Implementar sistema de recompensas por lealtad</li>
              <li>• Crear programas de entrenamiento avanzados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetencionAnalysis;