import React from 'react';
import HistorialCampanas from './components/HistorialCampanas';
import TablaCampanas from './components/TablaCampanas';
import MetricasRapidas from './components/MetricasRapidas';

const ListadoEmailsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Campañas de Email</h1>
      <MetricasRapidas />
      <HistorialCampanas />
      <TablaCampanas />
    </div>
  );
};

export default ListadoEmailsPage;
