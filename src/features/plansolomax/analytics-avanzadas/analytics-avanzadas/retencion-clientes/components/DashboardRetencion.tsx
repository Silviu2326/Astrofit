import React from 'react';
import KPIsDestacados from './KPIsDestacados';
import GraficoTendencia from './GraficoTendencia';
import AlertasPerdida from './AlertasPerdida';
import { fetchMonthlyActiveClients, fetchRetentionTrend, fetchIndustryBenchmarks } from '../retencionClientesApi';
import { useQuery } from '@tanstack/react-query';

const DashboardRetencion: React.FC = () => {
  const { data: monthlyActiveClients, isLoading: isLoadingMonthlyActiveClients } = useQuery({
    queryKey: ['monthlyActiveClients'],
    queryFn: fetchMonthlyActiveClients,
  });

  const { data: retentionTrend, isLoading: isLoadingRetentionTrend } = useQuery({
    queryKey: ['retentionTrend'],
    queryFn: fetchRetentionTrend,
  });

  const { data: industryBenchmarks, isLoading: isLoadingIndustryBenchmarks } = useQuery({
    queryKey: ['industryBenchmarks'],
    queryFn: fetchIndustryBenchmarks,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <KPIsDestacados />
      </div>

      <div className="md:col-span-2 lg:col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Clientes Activos Mes a Mes</h2>
        {isLoadingMonthlyActiveClients ? (
          <div>Cargando...</div>
        ) : (
          <GraficoTendencia data={monthlyActiveClients || []} dataKey="percentage" title="Clientes Activos (%)" />
        )}
      </div>

      <div className="md:col-span-2 lg:col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Gráfico de Tendencia de Retención</h2>
        {isLoadingRetentionTrend ? (
          <div>Cargando...</div>
        ) : (
          <GraficoTendencia data={retentionTrend || []} dataKey="percentage" title="Tasa de Retención (%)" />
        )}
      </div>

      <div className="md:col-span-2 lg:col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Alertas de Posible Pérdida de Clientes</h2>
        <AlertasPerdida />
      </div>

      <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Comparativas con Benchmarks del Sector</h2>
        {isLoadingIndustryBenchmarks ? (
          <div>Cargando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industryBenchmarks?.map((kpi) => (
              <div key={kpi.name} className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">{kpi.name}</p>
                <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Placeholder for Churn Predictor */}
      <div className="lg:col-span-3 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Predictor de Churn</h2>
        <p>Aquí se integraría la funcionalidad del predictor de churn.</p>
        {/* Example: <ChurnPredictor /> */}
      </div>
    </div>
  );
};

export default DashboardRetencion;
