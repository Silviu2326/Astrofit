import React, { useEffect, useState } from 'react';

interface ChurnPrediction {
  clientId: string;
  clientName: string;
  churnProbability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  predictedChurnDate: string;
  keyFactors: {
    factor: string;
    impact: number;
    description: string;
  }[];
  lastActivity: string;
  engagementScore: number;
  revenueAtRisk: number;
  tier: string;
  recommendedActions: string[];
}

const PredictorChurn: React.FC = () => {
  const [predictions, setPredictions] = useState<ChurnPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'high' | 'critical'>('all');
  const [timeframe, setTimeframe] = useState<30 | 60 | 90>(30);

  useEffect(() => {
    setTimeout(() => {
      const mockPredictions: ChurnPrediction[] = [
        {
          clientId: 'c1',
          clientName: 'María López',
          churnProbability: 85,
          riskLevel: 'critical',
          predictedChurnDate: '2025-02-15',
          keyFactors: [
            { factor: 'Baja frecuencia asistencia', impact: 35, description: 'Solo 1 visita en últimas 2 semanas' },
            { factor: 'Quejas por horarios', impact: 25, description: 'Dificultad para reservar clases' },
            { factor: 'Reducción gasto mensual', impact: 15, description: 'Canceló servicios adicionales' },
            { factor: 'Competencia cercana', impact: 10, description: 'Nuevo gimnasio a 2 cuadras' }
          ],
          lastActivity: '2025-01-20',
          engagementScore: 25,
          revenueAtRisk: 400,
          tier: 'basic',
          recommendedActions: [
            'Contacto inmediato personal',
            'Ofrecer sesión gratuita con entrenador',
            'Descuento en renovación',
            'Horarios preferenciales'
          ]
        },
        {
          clientId: 'c2',
          clientName: 'Pedro Martín',
          churnProbability: 72,
          riskLevel: 'high',
          predictedChurnDate: '2025-02-28',
          keyFactors: [
            { factor: 'Estancamiento progreso', impact: 30, description: 'Sin mejoras últimos 2 meses' },
            { factor: 'Baja satisfacción', impact: 25, description: 'Puntuación NPS: 4/10' },
            { factor: 'Precio sensibilidad', impact: 12, description: 'Comparando precios' },
            { factor: 'Cambio rutina', impact: 5, description: 'Horario laboral diferente' }
          ],
          lastActivity: '2025-01-25',
          engagementScore: 42,
          revenueAtRisk: 800,
          tier: 'standard',
          recommendedActions: [
            'Evaluación progreso personalizada',
            'Cambio plan entrenamiento',
            'Sesión motivacional',
            'Descuento leal cliente'
          ]
        },
        {
          clientId: 'c3',
          clientName: 'Laura Sánchez',
          churnProbability: 68,
          riskLevel: 'high',
          predictedChurnDate: '2025-03-10',
          keyFactors: [
            { factor: 'Uso servicios declining', impact: 28, description: 'De 4 a 2 veces por semana' },
            { factor: 'Cambio personal', impact: 20, description: 'Nuevo trabajo más demandante' },
            { factor: 'Falta motivación', impact: 15, description: 'No participa en actividades grupales' },
            { factor: 'Sin objetivos claros', impact: 5, description: 'Plan sin metas específicas' }
          ],
          lastActivity: '2025-01-26',
          engagementScore: 55,
          revenueAtRisk: 320,
          tier: 'basic',
          recommendedActions: [
            'Flexibilidad horarios',
            'Plan objetivos corto plazo',
            'Integración comunidad',
            'Check-in semanal'
          ]
        },
        {
          clientId: 'c4',
          clientName: 'Carlos Ruiz',
          churnProbability: 45,
          riskLevel: 'medium',
          predictedChurnDate: '2025-03-20',
          keyFactors: [
            { factor: 'Actividad irregular', impact: 20, description: 'Patrón inconsistente últimas semanas' },
            { factor: 'Feedback neutro', impact: 15, description: 'Encuestas sin entusiasmo' },
            { factor: 'Uso mínimo servicios', impact: 8, description: 'Solo servicios básicos' },
            { factor: 'Comunicación mínima', impact: 2, description: 'Responde tarde mensajes' }
          ],
          lastActivity: '2025-01-27',
          engagementScore: 68,
          revenueAtRisk: 600,
          tier: 'standard',
          recommendedActions: [
            'Encuesta satisfacción',
            'Propuesta servicios adicionales',
            'Invitación eventos especiales',
            'Follow-up proactivo'
          ]
        },
        {
          clientId: 'c5',
          clientName: 'Ana García',
          churnProbability: 25,
          riskLevel: 'low',
          predictedChurnDate: '2025-04-15',
          keyFactors: [
            { factor: 'Alta satisfacción', impact: -15, description: 'NPS 9/10 constantemente' },
            { factor: 'Progreso visible', impact: -10, description: 'Objetivos cumplidos' },
            { factor: 'Engagement alto', impact: -8, description: 'Participa en todas las actividades' },
            { factor: 'Referidos activos', impact: -5, description: 'Ha traído 3 nuevos clientes' }
          ],
          lastActivity: '2025-01-27',
          engagementScore: 92,
          revenueAtRisk: 1200,
          tier: 'premium',
          recommendedActions: [
            'Programa lealtad',
            'Servicios VIP exclusivos',
            'Rol de embajador',
            'Descuentos familia/amigos'
          ]
        }
      ];

      setPredictions(mockPredictions);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: '🚨' };
      case 'high': return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: '⚠️' };
      case 'medium': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', icon: '⚡' };
      case 'low': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: '✅' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: 'ℹ️' };
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredPredictions = predictions.filter(pred => {
    if (filter === 'all') return true;
    if (filter === 'high') return pred.riskLevel === 'high';
    if (filter === 'critical') return pred.riskLevel === 'critical';
    return true;
  });

  const totalRevenueAtRisk = predictions
    .filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical')
    .reduce((acc, p) => acc + p.revenueAtRisk, 0);

  const criticalCount = predictions.filter(p => p.riskLevel === 'critical').length;
  const highRiskCount = predictions.filter(p => p.riskLevel === 'high').length;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Predicción de Cancelaciones</h3>
        <div className="flex space-x-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(Number(e.target.value) as any)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value={30}>Próximos 30 días</option>
            <option value={60}>Próximos 60 días</option>
            <option value={90}>Próximos 90 días</option>
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">Todos los riesgos</option>
            <option value="high">Alto riesgo</option>
            <option value="critical">Crítico</option>
          </select>
        </div>
      </div>

      {/* Risk summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
          <div className="text-sm text-red-600 font-medium">Riesgo Crítico</div>
          <div className="text-2xl font-bold text-red-700">{criticalCount}</div>
          <div className="text-xs text-red-600">Clientes</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="text-sm text-orange-600 font-medium">Alto Riesgo</div>
          <div className="text-2xl font-bold text-orange-700">{highRiskCount}</div>
          <div className="text-xs text-orange-600">Clientes</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">Revenue en Riesgo</div>
          <div className="text-2xl font-bold text-purple-700">{totalRevenueAtRisk.toLocaleString()}€</div>
          <div className="text-xs text-purple-600">Mensual</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Tasa Predicha</div>
          <div className="text-2xl font-bold text-blue-700">
            {((criticalCount + highRiskCount) / predictions.length * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-blue-600">Churn rate</div>
        </div>
      </div>

      {/* Prediction timeline */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-4">Timeline de Riesgo</h4>
        <div className="relative h-32">
          <div className="flex items-end justify-between h-24 border-b border-gray-200">
            {filteredPredictions.slice(0, 6).map((pred, index) => {
              const height = pred.churnProbability;
              const colors = getRiskColor(pred.riskLevel);

              return (
                <div key={index} className="flex flex-col items-center flex-1 relative group">
                  <div className="relative">
                    <div
                      className={`rounded-t-md w-6 transition-all duration-300 cursor-pointer ${
                        pred.riskLevel === 'critical' ? 'bg-gradient-to-t from-red-500 to-red-400' :
                        pred.riskLevel === 'high' ? 'bg-gradient-to-t from-orange-500 to-orange-400' :
                        pred.riskLevel === 'medium' ? 'bg-gradient-to-t from-yellow-500 to-yellow-400' :
                        'bg-gradient-to-t from-green-500 to-green-400'
                      } hover:opacity-80`}
                      style={{ height: `${height}%` }}
                    ></div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        <div className="font-medium">{pred.clientName}</div>
                        <div>Riesgo: {pred.churnProbability}%</div>
                        <div>Engagement: {pred.engagementScore}</div>
                        <div>Revenue: {pred.revenueAtRisk}€</div>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-gray-500 mt-2 text-center max-w-16 truncate">
                    {pred.clientName.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed predictions */}
      <div className="space-y-4">
        {filteredPredictions.map((pred) => {
          const colors = getRiskColor(pred.riskLevel);
          const daysUntilChurn = Math.ceil((new Date(pred.predictedChurnDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

          return (
            <div key={pred.clientId} className={`border rounded-lg p-4 ${colors.border} ${colors.bg}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{colors.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{pred.clientName}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.text} bg-white bg-opacity-70`}>
                        {pred.tier.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Probabilidad de cancelación: <span className="font-medium">{pred.churnProbability}%</span>
                      <span className="mx-2">•</span>
                      Predicción: <span className="font-medium">{daysUntilChurn} días</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">{pred.revenueAtRisk}€</div>
                  <div className="text-sm text-gray-600">Revenue en riesgo</div>
                </div>
              </div>

              {/* Engagement and activity */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Engagement Score</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          pred.engagementScore >= 80 ? 'bg-green-500' :
                          pred.engagementScore >= 60 ? 'bg-yellow-500' :
                          pred.engagementScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${pred.engagementScore}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getEngagementColor(pred.engagementScore)}`}>
                      {pred.engagementScore}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Última Actividad</div>
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(pred.lastActivity).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Risk factors */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Factores de Riesgo Principales:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pred.keyFactors.slice(0, 4).map((factor, index) => (
                    <div key={index} className="flex items-center justify-between bg-white bg-opacity-50 rounded p-2">
                      <div>
                        <div className="text-xs font-medium text-gray-800">{factor.factor}</div>
                        <div className="text-xs text-gray-600">{factor.description}</div>
                      </div>
                      <div className={`text-xs font-bold ${factor.impact > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {factor.impact > 0 ? '+' : ''}{factor.impact}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended actions */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Acciones Recomendadas:</div>
                <div className="flex flex-wrap gap-2">
                  {pred.recommendedActions.map((action, index) => (
                    <span key={index} className="px-2 py-1 bg-white bg-opacity-70 rounded text-xs text-gray-700">
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  📞 Contactar Cliente
                </button>
                <button className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  🎯 Crear Plan Retención
                </button>
                <button className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                  📝 Registrar Interacción
                </button>
                {pred.riskLevel === 'critical' && (
                  <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                    🚨 Acción Urgente
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prevention strategies */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 text-sm mb-3">🛡️ Estrategias de Prevención</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium text-blue-700">Detección Temprana:</div>
            <ul className="space-y-1 text-blue-600">
              <li>• Monitoreo automático de patrones</li>
              <li>• Alertas por cambios de comportamiento</li>
              <li>• Encuestas de satisfacción regulares</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-blue-700">Intervención Proactiva:</div>
            <ul className="space-y-1 text-blue-600">
              <li>• Check-ins personalizados</li>
              <li>• Ofertas dirigidas</li>
              <li>• Programas de re-engagement</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-blue-700">Retención Avanzada:</div>
            <ul className="space-y-1 text-blue-600">
              <li>• Planes de recuperación</li>
              <li>• Incentivos de lealtad</li>
              <li>• Experiencias personalizadas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictorChurn;