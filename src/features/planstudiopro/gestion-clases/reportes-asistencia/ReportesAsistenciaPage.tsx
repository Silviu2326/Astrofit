import React from 'react';
import DashboardAsistencia from './components/DashboardAsistencia';
import GraficoClases from './components/GraficoClases';
import RankingClientes from './components/RankingClientes';
import DashboardInteractivo from './components/DashboardInteractivo';
import AnalisisPredictivo from './components/AnalisisPredictivo';
import SegmentacionClientes from './components/SegmentacionClientes';
import ComparativaCompetencia from './components/ComparativaCompetencia';
import ROIMarketing from './components/ROIMarketing';
import LifetimeValue from './components/LifetimeValue';
import MapasCalor from './components/MapasCalor';
import ForecastingDemanda from './components/ForecastingDemanda';
import AlertasInteligentes from './components/AlertasInteligentes';
import IntegracionAnalytics from './components/IntegracionAnalytics';
import { useGetDashboardDataQuery } from './reportesAsistenciaApi';

const ReportesAsistenciaPage: React.FC = () => {
  const { data, isLoading, error } = useGetDashboardDataQuery();

  if (isLoading) return <div className="text-center py-8">Cargando reportes...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error al cargar los datos: {error.message}</div>;
  if (!data) return <div className="text-center py-8">No hay datos de asistencia disponibles.</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reportes de Asistencia</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardAsistencia
          totalAsistencias={data.totalAsistencias}
          porcentajePromedio={data.porcentajePromedio}
          clasesPopulares={data.clasesPopulares}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Asistencia por Clase</h2>
          <GraficoClases datosClases={data.asistenciaPorClase} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Ranking de Clientes Frecuentes</h2>
          <RankingClientes clientes={data.rankingClientes} />
        </div>
      </div>

      {/* Nuevos Dashboards BI */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboards de Business Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow"><DashboardInteractivo /></div>
          <div className="bg-white p-6 rounded-lg shadow"><AnalisisPredictivo /></div>
          <div className="bg-white p-6 rounded-lg shadow"><SegmentacionClientes /></div>
          <div className="bg-white p-6 rounded-lg shadow"><ComparativaCompetencia /></div>
          <div className="bg-white p-6 rounded-lg shadow"><ROIMarketing /></div>
          <div className="bg-white p-6 rounded-lg shadow"><LifetimeValue /></div>
          <div className="bg-white p-6 rounded-lg shadow"><MapasCalor /></div>
          <div className="bg-white p-6 rounded-lg shadow"><ForecastingDemanda /></div>
          <div className="bg-white p-6 rounded-lg shadow"><AlertasInteligentes /></div>
          <div className="bg-white p-6 rounded-lg shadow"><IntegracionAnalytics /></div>
        </div>
      </div>
    </div>
  );
};

export default ReportesAsistenciaPage;
