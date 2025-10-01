import React from 'react';
import DashboardAnalytics from './components/DashboardAnalytics';
import GraficoAdherencia from './components/GraficoAdherencia';
import RankingHabitos from './components/RankingHabitos';
import MetricasCliente from './components/MetricasCliente';

const EstadisticasHabitosPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas de Hábitos Avanzados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardAnalytics />
        <GraficoAdherencia />
        <RankingHabitos />
        <MetricasCliente />
      </div>
    </div>
  );
};

export default EstadisticasHabitosPage;
