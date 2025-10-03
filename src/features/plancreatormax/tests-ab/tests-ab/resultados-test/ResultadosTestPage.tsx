import React from 'react';
import DashboardResultados from './components/DashboardResultados';
import GraficosComparativos from './components/GraficosComparativos';
import AnalisisEstadistico from './components/AnalisisEstadistico';
import RecomendacionesIA from './components/RecomendacionesIA';

const ResultadosTestPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Resultados de Tests A/B</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardResultados />
        <GraficosComparativos />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AnalisisEstadistico />
        <RecomendacionesIA />
      </div>
      <div className="mt-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Exportación de Reportes</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Exportar Reporte Completo
        </button>
      </div>
    </div>
  );
};

export default ResultadosTestPage;
