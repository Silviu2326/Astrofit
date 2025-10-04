import React from 'react';
import DashboardMetricas from './components/DashboardMetricas';
import EmbudoConversion from './components/EmbudoConversion';
import AnalisisIngresos from './components/AnalisisIngresos';
import ComparativaCampanas from './components/ComparativaCampanas';

const ReportesEnvioPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reportes de Envío de Email</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardMetricas />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EmbudoConversion />
        <AnalisisIngresos />
      </div>

      <div className="mb-6">
        <ComparativaCampanas />
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Opciones de Exportación</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Exportar Reporte Completo
        </button>
      </div>
    </div>
  );
};

export default ReportesEnvioPage;