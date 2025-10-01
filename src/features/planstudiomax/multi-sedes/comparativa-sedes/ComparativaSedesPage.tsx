import React from 'react';
import DashboardComparativo from './components/DashboardComparativo';
import GraficosBarras from './components/GraficosBarras';
import RankingSedes from './components/RankingSedes';
import ProyeccionesCrecimiento from './components/ProyeccionesCrecimiento';
import MetricasEficiencia from './components/MetricasEficiencia';
import AnalisisTendencias from './components/AnalisisTendencias';
import AlertasBajoRendimiento from './components/AlertasBajoRendimiento';
import ComparativasCategorias from './components/ComparativasCategorias';
import AnalisisCorrelacion from './components/AnalisisCorrelacion';

const ComparativaSedesPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Comparativa de Sedes - Analytics Multi-Centro</h1>
      <DashboardComparativo />
      <GraficosBarras />
      <RankingSedes />
      <ProyeccionesCrecimiento />
      <MetricasEficiencia />
      <AnalisisTendencias />
      <AlertasBajoRendimiento />
      <ComparativasCategorias />
      <AnalisisCorrelacion />
    </div>
  );
};

export default ComparativaSedesPage;
