import React, { useEffect, useState } from 'react';

interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  conversionRate?: number;
  avgValue?: number;
}

const FunnelConversion: React.FC = () => {
  const [funnelData, setFunnelData] = useState<FunnelStage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = [
        { stage: 'Visitantes Web', count: 1200, percentage: 100, avgValue: 0 },
        { stage: 'Leads Generados', count: 240, percentage: 20, conversionRate: 20.0, avgValue: 0 },
        { stage: 'Consultas Agendadas', count: 120, percentage: 10, conversionRate: 50.0, avgValue: 0 },
        { stage: 'Pruebas Completadas', count: 84, percentage: 7, conversionRate: 70.0, avgValue: 25 },
        { stage: 'Suscripciones Activas', count: 60, percentage: 5, conversionRate: 71.4, avgValue: 85 },
        { stage: 'Clientes Premium', count: 24, percentage: 2, conversionRate: 40.0, avgValue: 150 }
      ];
      setFunnelData(data);
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
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStageColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-blue-600',
      'bg-gradient-to-r from-green-500 to-green-600',
      'bg-gradient-to-r from-yellow-500 to-yellow-600',
      'bg-gradient-to-r from-orange-500 to-orange-600',
      'bg-gradient-to-r from-purple-500 to-purple-600',
      'bg-gradient-to-r from-pink-500 to-pink-600'
    ];
    return colors[index % colors.length];
  };

  const getBorderColor = (index: number) => {
    const colors = [
      'border-blue-300',
      'border-green-300',
      'border-yellow-300',
      'border-orange-300',
      'border-purple-300',
      'border-pink-300'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Embudo de Conversión Comercial</h3>
        <div className="text-sm text-gray-500">
          Último mes
        </div>
      </div>

      {/* Funnel visualization */}
      <div className="space-y-3 mb-6">
        {funnelData.map((stage, index) => {
          const width = stage.percentage;
          const maxWidth = 100;

          return (
            <div key={index} className="relative">
              {/* Stage container */}
              <div className="flex items-center space-x-4">
                {/* Funnel bar */}
                <div className="flex-1 relative">
                  <div className="w-full bg-gray-100 rounded-lg h-12 relative overflow-hidden">
                    <div
                      className={`h-full rounded-lg transition-all duration-700 ease-out ${getStageColor(index)} relative`}
                      style={{ width: `${width}%` }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                    </div>

                    {/* Stage label and count */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <span className="text-sm font-medium text-gray-800">{stage.stage}</span>
                      <span className="text-sm font-bold text-gray-900">{stage.count}</span>
                    </div>
                  </div>

                  {/* Conversion rate indicator */}
                  {stage.conversionRate && (
                    <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getBorderColor(index)} ${
                        stage.conversionRate >= 70 ? 'bg-green-50 text-green-700' :
                        stage.conversionRate >= 50 ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {stage.conversionRate}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Stage metrics */}
                <div className="w-24 text-right">
                  <div className="text-sm font-bold text-gray-900">{stage.percentage}%</div>
                  {stage.avgValue > 0 && (
                    <div className="text-xs text-gray-500">{stage.avgValue}€/mes</div>
                  )}
                </div>
              </div>

              {/* Connection arrow */}
              {index < funnelData.length - 1 && (
                <div className="flex justify-center my-1">
                  <div className="text-gray-400 text-xs">↓</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {((funnelData[funnelData.length - 1]?.count || 0) / (funnelData[0]?.count || 1) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">Conversión Global</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {funnelData.reduce((acc, stage) => acc + (stage.avgValue || 0) * stage.count, 0).toLocaleString()}€
          </div>
          <div className="text-xs text-gray-500">Valor Total Generado</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {(funnelData.reduce((acc, stage) => acc + (stage.avgValue || 0) * stage.count, 0) / funnelData[0].count).toFixed(0)}€
          </div>
          <div className="text-xs text-gray-500">Valor por Lead</div>
        </div>
      </div>

      {/* Detailed conversion rates */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700 text-sm">📊 Análisis de Conversión</h4>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600">MEJORES CONVERSIONES</div>
            {funnelData
              .filter(stage => stage.conversionRate && stage.conversionRate >= 60)
              .map((stage, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700 truncate">{stage.stage}</span>
                  <span className="text-green-600 font-medium">{stage.conversionRate}%</span>
                </div>
              ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600">OPORTUNIDADES DE MEJORA</div>
            {funnelData
              .filter(stage => stage.conversionRate && stage.conversionRate < 50)
              .map((stage, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700 truncate">{stage.stage}</span>
                  <span className="text-red-600 font-medium">{stage.conversionRate}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Optimization suggestions */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <h4 className="font-semibold text-purple-800 text-sm mb-2">🎯 Sugerencias de Optimización</h4>
        <div className="space-y-1 text-xs text-purple-700">
          <p>• Mejorar landing page para incrementar generación de leads (+5% potencial)</p>
          <p>• Optimizar proceso de agendado con recordatorios automáticos</p>
          <p>• Implementar follow-up personalizado post-prueba gratuita</p>
          <p>• Crear programa de referidos para clientes premium existentes</p>
        </div>
      </div>
    </div>
  );
};

export default FunnelConversion;