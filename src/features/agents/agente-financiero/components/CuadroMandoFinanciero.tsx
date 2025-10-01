
import React, { useEffect, useState } from 'react';
import { fetchFinancialSummary, fetchAdvancedMetrics, FinancialSummary, AdvancedMetrics } from '../agenteFinancieroApi';
import GraficosIngresosTrend from './GraficosIngresosTrend';
import ChartMRRvsChurn from './ChartMRRvsChurn';
import DistribucionIngresos from './DistribucionIngresos';
import FunnelConversion from './FunnelConversion';

const CuadroMandoFinanciero: React.FC = () => {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [metrics, setMetrics] = useState<AdvancedMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchFinancialSummary(),
      fetchAdvancedMetrics()
    ]).then(([summaryData, metricsData]) => {
      setSummary(summaryData);
      setMetrics(metricsData);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (growth: number) => {
    if (growth > 0) return '↗️';
    if (growth < 0) return '↘️';
    return '➡️';
  };

  if (loading) {
    return <div className="p-6 bg-white rounded-lg shadow">Cargando cuadro de mando...</div>;
  }

  if (!summary || !metrics) {
    return <div className="p-6 bg-white rounded-lg shadow text-red-600">Error al cargar datos financieros</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard Financiero</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Última actualización</div>
              <div className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metrics.cashFlowStatus)}`}>
              {metrics.cashFlowStatus === 'positive' ? '🟢 Saludable' :
               metrics.cashFlowStatus === 'negative' ? '🟡 Atención' : '🔴 Crítico'}
            </div>
          </div>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Ingresos Mes</div>
              <div className="text-3xl font-bold text-green-600">{summary.ingresos.toLocaleString()}€</div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-green-600">{getTrendIcon(summary.revenueGrowth)} {summary.revenueGrowth}%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">MRR</div>
              <div className="text-3xl font-bold text-purple-600">{summary.mrr.toLocaleString()}€</div>
              <div className="text-sm text-purple-600 mt-1">Recurrente mensual</div>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">LTV/CAC</div>
              <div className="text-3xl font-bold text-blue-600">{(metrics.ltv / metrics.cac).toFixed(1)}x</div>
              <div className="text-sm text-blue-600 mt-1">Salud comercial</div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Margen Neto</div>
              <div className="text-3xl font-bold text-orange-600">{summary.margen.toLocaleString()}€</div>
              <div className="text-sm text-orange-600 mt-1">{summary.profitMargin.toFixed(1)}% margen</div>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficosIngresosTrend />
        <ChartMRRvsChurn />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistribucionIngresos />
        <FunnelConversion />
      </div>

      {/* Métricas detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Métricas de Crecimiento
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ARR</span>
              <span className="font-bold text-lg">{metrics.arr.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Churn Rate</span>
              <span className={`font-bold text-lg ${metrics.churnRate < 5 ? 'text-green-600' : 'text-orange-600'}`}>
                {metrics.churnRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Crecimiento</span>
              <span className="font-bold text-lg text-green-600">+{summary.revenueGrowth}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Métricas de Cliente
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">LTV</span>
              <span className="font-bold text-lg">{metrics.ltv.toLocaleString()}€</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">CAC</span>
              <span className="font-bold text-lg">{metrics.cac}€</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payback</span>
              <span className="font-bold text-lg">{metrics.paybackPeriod} meses</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Salud Financiera
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cash Flow</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metrics.cashFlowStatus)}`}>
                {metrics.cashFlowStatus === 'positive' ? 'Positivo' :
                 metrics.cashFlowStatus === 'negative' ? 'Negativo' : 'Crítico'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Burn Rate</span>
              <span className="font-bold text-lg">{metrics.burnRate.toLocaleString()}€/mes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Runway</span>
              <span className="font-bold text-lg text-blue-600">{metrics.runwayMonths} meses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights inteligentes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-xl mr-2">💡</span>
          Insights Inteligentes
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✅</span>
              <div className="text-sm">
                <span className="font-medium">Ratio LTV/CAC de {(metrics.ltv / metrics.cac).toFixed(1)}x</span>
                <span className="text-gray-600"> indica salud comercial {metrics.ltv / metrics.cac > 3 ? 'excelente' : 'buena'}</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className={metrics.paybackPeriod < 6 ? 'text-green-500' : 'text-yellow-500'}>
                {metrics.paybackPeriod < 6 ? '✅' : '⚠️'}
              </span>
              <div className="text-sm">
                <span className="font-medium">Payback de {metrics.paybackPeriod} meses</span>
                <span className="text-gray-600"> {metrics.paybackPeriod < 6 ? 'está dentro del rango óptimo' : 'podría optimizarse'}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className={metrics.churnRate < 5 ? 'text-green-500' : metrics.churnRate < 10 ? 'text-green-500' : 'text-yellow-500'}>
                {metrics.churnRate < 10 ? '✅' : '⚠️'}
              </span>
              <div className="text-sm">
                <span className="font-medium">Churn rate del {metrics.churnRate}%</span>
                <span className="text-gray-600"> {metrics.churnRate < 5 ? 'es excelente' : metrics.churnRate < 10 ? 'está bien' : 'requiere atención'}</span>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500">📊</span>
              <div className="text-sm">
                <span className="font-medium">Runway de {metrics.runwayMonths} meses</span>
                <span className="text-gray-600"> proporciona {metrics.runwayMonths > 12 ? 'excelente' : 'buena'} seguridad financiera</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuadroMandoFinanciero;
