import React, { useEffect, useState } from 'react';

interface LiquidityAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  amount?: number;
  daysAhead: number;
  impact: 'high' | 'medium' | 'low';
  suggestions: string[];
  isActionable: boolean;
  category: 'cash_flow' | 'receivables' | 'payables' | 'forecast';
}

const AlertaLiquidez: React.FC = () => {
  const [alerts, setAlerts] = useState<LiquidityAlert[]>([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'critical' | 'actionable'>('all');

  useEffect(() => {
    setTimeout(() => {
      setCurrentBalance(15750);

      const mockAlerts: LiquidityAlert[] = [
        {
          id: 'LIQ-001',
          type: 'critical',
          title: 'Riesgo de Liquidez Crítico',
          message: 'El balance proyectado caerá por debajo de 2.000€ en los próximos 15 días debido a pagos pendientes.',
          amount: -3200,
          daysAhead: 15,
          impact: 'high',
          suggestions: [
            'Acelerar cobros de facturas vencidas',
            'Postponer pagos no críticos',
            'Negociar facilidades de pago con proveedores',
            'Considerar línea de crédito de emergencia'
          ],
          isActionable: true,
          category: 'forecast'
        },
        {
          id: 'LIQ-002',
          type: 'warning',
          title: 'Facturas Vencidas Elevadas',
          message: 'Tienes 1.450€ en facturas vencidas que afectan tu flujo de caja actual.',
          amount: 1450,
          daysAhead: 0,
          impact: 'medium',
          suggestions: [
            'Contactar clientes con facturas vencidas',
            'Implementar recordatorios automáticos',
            'Ofrecer descuentos por pronto pago',
            'Revisar términos de pago'
          ],
          isActionable: true,
          category: 'receivables'
        },
        {
          id: 'LIQ-003',
          type: 'warning',
          title: 'Pagos Concentrados',
          message: 'Se concentran 2.150€ en pagos durante la primera semana de febrero.',
          amount: 2150,
          daysAhead: 7,
          impact: 'medium',
          suggestions: [
            'Redistribuir fechas de pago si es posible',
            'Asegurar ingresos suficientes para esa semana',
            'Preparar transferencias con anticipación'
          ],
          isActionable: true,
          category: 'payables'
        },
        {
          id: 'LIQ-004',
          type: 'info',
          title: 'Oportunidad de Optimización',
          message: 'Puedes mejorar tu posición de efectivo negociando términos de pago más favorables.',
          daysAhead: 30,
          impact: 'low',
          suggestions: [
            'Solicitar descuentos por pronto pago',
            'Negociar plazos extendidos con proveedores',
            'Evaluar cuentas de alto rendimiento'
          ],
          isActionable: false,
          category: 'cash_flow'
        },
        {
          id: 'LIQ-005',
          type: 'critical',
          title: 'Gastos Fijos Elevados',
          message: 'Los gastos fijos representan el 78% de los ingresos mensuales, reduciendo la flexibilidad financiera.',
          amount: 11700,
          daysAhead: 0,
          impact: 'high',
          suggestions: [
            'Revisar contratos de alquiler y servicios',
            'Evaluar posibilidades de renegociación',
            'Analizar gastos prescindibles',
            'Considerar subcontratación de servicios'
          ],
          isActionable: true,
          category: 'cash_flow'
        }
      ];

      setAlerts(mockAlerts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-800',
        icon: '🚨',
        accent: 'bg-red-500'
      };
      case 'warning': return {
        bg: 'bg-yellow-50 border-yellow-200',
        text: 'text-yellow-800',
        icon: '⚠️',
        accent: 'bg-yellow-500'
      };
      case 'info': return {
        bg: 'bg-blue-50 border-blue-200',
        text: 'text-blue-800',
        icon: '💡',
        accent: 'bg-blue-500'
      };
      default: return {
        bg: 'bg-gray-50 border-gray-200',
        text: 'text-gray-800',
        icon: 'ℹ️',
        accent: 'bg-gray-500'
      };
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'critical') return alert.type === 'critical';
    if (filter === 'actionable') return alert.isActionable;
    return true;
  });

  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const actionableCount = alerts.filter(a => a.isActionable).length;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Alertas de Liquidez</h3>
          <div className="text-sm text-gray-600 mt-1">
            Balance actual: <span className="font-bold text-green-600">{currentBalance.toLocaleString()}€</span>
          </div>
        </div>
        <div className="flex space-x-2">
          {(['all', 'critical', 'actionable'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === filterType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType === 'all' ? 'Todas' :
               filterType === 'critical' ? 'Críticas' : 'Accionables'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
          <div className="text-sm text-red-700">Alertas Críticas</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{alerts.filter(a => a.type === 'warning').length}</div>
          <div className="text-sm text-yellow-700">Advertencias</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{actionableCount}</div>
          <div className="text-sm text-blue-700">Requieren Acción</div>
        </div>
      </div>

      {/* Alerts list */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const colors = getAlertColor(alert.type);

          return (
            <div key={alert.id} className={`border rounded-lg p-4 ${colors.bg}`}>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{colors.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${colors.text}`}>{alert.title}</h4>
                    <div className="flex items-center space-x-2">
                      {alert.amount && (
                        <span className={`text-sm font-medium ${colors.text}`}>
                          {alert.amount > 0 ? '+' : ''}{alert.amount.toLocaleString()}€
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(alert.impact)}`}>
                        {alert.impact.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm ${colors.text} mb-3`}>{alert.message}</p>

                  {alert.daysAhead > 0 && (
                    <div className={`text-xs ${colors.text} mb-3`}>
                      📅 Proyectado para dentro de {alert.daysAhead} días
                    </div>
                  )}

                  {/* Suggestions */}
                  <div className="bg-white bg-opacity-70 rounded-lg p-3">
                    <div className={`text-sm font-medium ${colors.text} mb-2`}>
                      💡 Acciones recomendadas:
                    </div>
                    <ul className="space-y-1">
                      {alert.suggestions.map((suggestion, index) => (
                        <li key={index} className={`text-xs ${colors.text} flex items-start`}>
                          <span className="mr-2">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action buttons */}
                  {alert.isActionable && (
                    <div className="flex space-x-2 mt-3">
                      <button className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        📋 Crear Plan
                      </button>
                      <button className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        ⏰ Recordar Después
                      </button>
                      <button className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        ✓ Marcar Como Leída
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Health score */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Puntuación de Salud Financiera</h4>
            <div className="text-sm text-gray-600">
              Basado en liquidez, flujo de caja y alertas activas
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-600">72</div>
            <div className="text-sm text-orange-700">Bueno (70-85)</div>
            <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '72%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">🎯 Acciones Rápidas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors text-left">
            🚨 Revisar Alertas Críticas ({criticalCount})
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors text-left">
            💰 Generar Reporte de Flujo de Caja
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors text-left">
            📊 Ver Proyecciones Detalladas
          </button>
          <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors text-left">
            ⚙️ Configurar Alertas Personalizadas
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertaLiquidez;