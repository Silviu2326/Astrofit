import React, { useEffect, useState } from 'react';

interface ClientSegment {
  segment: string;
  count: number;
  percentage: number;
  avgRevenue: number;
  avgLTV: number;
  churnRate: number;
  profitMargin: number;
  characteristics: string[];
  color: string;
  growth: number;
}

const SegmentacionClientes: React.FC = () => {
  const [segments, setSegments] = useState<ClientSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const mockSegments: ClientSegment[] = [
        {
          segment: 'VIP Premium',
          count: 12,
          percentage: 15,
          avgRevenue: 250,
          avgLTV: 3600,
          churnRate: 2.1,
          profitMargin: 78,
          characteristics: [
            'Entrenamiento personal regular',
            'Servicios adicionales frecuentes',
            'Pago anual anticipado',
            'Referencias activas'
          ],
          color: 'purple',
          growth: 25
        },
        {
          segment: 'Regulares Comprometidos',
          count: 28,
          percentage: 35,
          avgRevenue: 120,
          avgLTV: 2200,
          churnRate: 4.8,
          profitMargin: 65,
          characteristics: [
            'Asistencia consistente (>3 veces/semana)',
            'Duración membresía >6 meses',
            'Uso de servicios complementarios',
            'Renovación automática'
          ],
          color: 'green',
          growth: 12
        },
        {
          segment: 'Ocasionales Estables',
          count: 25,
          percentage: 31,
          avgRevenue: 80,
          avgLTV: 960,
          churnRate: 8.5,
          profitMargin: 45,
          characteristics: [
            'Asistencia irregular (1-2 veces/semana)',
            'Servicios básicos únicamente',
            'Sensibles al precio',
            'Renovación manual'
          ],
          color: 'yellow',
          growth: -3
        },
        {
          segment: 'Nuevos en Prueba',
          count: 10,
          percentage: 12.5,
          avgRevenue: 45,
          avgLTV: 180,
          churnRate: 35,
          profitMargin: 25,
          characteristics: [
            'Membresía <3 meses',
            'Explorando servicios',
            'Necesitan seguimiento activo',
            'Alto potencial de conversión'
          ],
          color: 'blue',
          growth: 45
        },
        {
          segment: 'En Riesgo',
          count: 5,
          percentage: 6.5,
          avgRevenue: 35,
          avgLTV: 210,
          churnRate: 65,
          profitMargin: 15,
          characteristics: [
            'Asistencia declining',
            'Quejas o insatisfacción',
            'Retrasos en pagos',
            'Requieren intervención urgente'
          ],
          color: 'red',
          growth: -15
        }
      ];
      setSegments(mockSegments);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
      green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', border: 'border-yellow-200' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
      red: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-200' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.purple;
  };

  const totalClients = segments.reduce((acc, seg) => acc + seg.count, 0);
  const totalRevenue = segments.reduce((acc, seg) => acc + (seg.count * seg.avgRevenue), 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Segmentación de Clientes</h3>
        <div className="text-sm text-gray-500">
          Total: <span className="font-bold text-gray-800">{totalClients} clientes</span>
        </div>
      </div>

      {/* Overview metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">Segmento Top</div>
          <div className="text-xl font-bold text-purple-700">VIP Premium</div>
          <div className="text-xs text-purple-600">Mayor LTV</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Más Rentable</div>
          <div className="text-xl font-bold text-green-700">78% margen</div>
          <div className="text-xs text-green-600">VIP Premium</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
          <div className="text-sm text-yellow-600 font-medium">Mayor Volumen</div>
          <div className="text-xl font-bold text-yellow-700">35%</div>
          <div className="text-xs text-yellow-600">Regulares</div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
          <div className="text-sm text-red-600 font-medium">Riesgo Alto</div>
          <div className="text-xl font-bold text-red-700">5 clientes</div>
          <div className="text-xs text-red-600">Requieren atención</div>
        </div>
      </div>

      {/* Segments visualization */}
      <div className="space-y-4 mb-6">
        {segments.map((segment) => {
          const colors = getColorClasses(segment.color);
          const isSelected = selectedSegment === segment.segment;

          return (
            <div
              key={segment.segment}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected ? `${colors.border} ${colors.light}` : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedSegment(isSelected ? null : segment.segment)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${colors.bg}`}></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{segment.segment}</h4>
                    <div className="text-sm text-gray-600">
                      {segment.count} clientes ({segment.percentage}% del total)
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">
                    {segment.avgRevenue}€/mes
                  </div>
                  <div className={`text-sm flex items-center justify-end ${
                    segment.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {segment.growth > 0 ? '↗️' : '↘️'} {Math.abs(segment.growth)}%
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${colors.bg}`}
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                <div className="text-center">
                  <div className="font-bold text-gray-900">{segment.avgLTV.toLocaleString()}€</div>
                  <div className="text-gray-500">LTV</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold ${segment.churnRate < 5 ? 'text-green-600' : segment.churnRate < 15 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {segment.churnRate}%
                  </div>
                  <div className="text-gray-500">Churn</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{segment.profitMargin}%</div>
                  <div className="text-gray-500">Margen</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">
                    {(segment.count * segment.avgRevenue).toLocaleString()}€
                  </div>
                  <div className="text-gray-500">Revenue</div>
                </div>
              </div>

              {/* Expanded details */}
              {isSelected && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-2">Características del Segmento</h5>
                  <ul className="space-y-1">
                    {segment.characteristics.map((char, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2 text-green-500">•</span>
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <button className={`px-4 py-2 ${colors.light} ${colors.text} rounded-lg text-sm font-medium hover:opacity-80 transition-opacity`}>
                      📊 Ver Análisis Detallado
                    </button>
                    <button className={`px-4 py-2 ${colors.light} ${colors.text} rounded-lg text-sm font-medium hover:opacity-80 transition-opacity`}>
                      🎯 Crear Campaña Dirigida
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Revenue distribution pie chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Distribución de Ingresos</h4>
          <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 42 42" className="w-48 h-48 transform -rotate-90">
              <circle
                cx="21"
                cy="21"
                r="15.91549430918954"
                fill="transparent"
                stroke="#f3f4f6"
                strokeWidth="3"
              />
              {segments.map((segment, index) => {
                const segmentRevenue = segment.count * segment.avgRevenue;
                const percentage = (segmentRevenue / totalRevenue) * 100;
                const previousPercentage = segments
                  .slice(0, index)
                  .reduce((acc, prev) => acc + ((prev.count * prev.avgRevenue) / totalRevenue) * 100, 0);

                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = 100 - previousPercentage;
                const colors = getColorClasses(segment.color);

                const strokeColor = {
                  purple: '#8b5cf6',
                  green: '#10b981',
                  yellow: '#f59e0b',
                  blue: '#3b82f6',
                  red: '#ef4444'
                }[segment.color] || '#8b5cf6';

                return (
                  <circle
                    key={index}
                    cx="21"
                    cy="21"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{totalRevenue.toLocaleString()}€</div>
                <div className="text-xs text-gray-500">Total mensual</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Estrategias Recomendadas</h4>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium text-purple-800 text-sm">VIP Premium</div>
              <div className="text-purple-700 text-xs">Mantener exclusividad y servicios personalizados</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-800 text-sm">Regulares</div>
              <div className="text-green-700 text-xs">Programas de fidelización y referencias</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 text-sm">Ocasionales</div>
              <div className="text-yellow-700 text-xs">Incentivos para aumentar frecuencia</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-800 text-sm">Nuevos</div>
              <div className="text-blue-700 text-xs">Onboarding personalizado y seguimiento</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="font-medium text-red-800 text-sm">En Riesgo</div>
              <div className="text-red-700 text-xs">Intervención inmediata y recuperación</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentacionClientes;