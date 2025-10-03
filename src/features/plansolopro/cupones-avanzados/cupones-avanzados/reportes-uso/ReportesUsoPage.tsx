import React from 'react';
import DashboardCupones from './components/DashboardCupones';

const ReportesUsoPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reportes de Uso de Cupones</h1>
      <DashboardCupones />
    </div>
  );
};

export default ReportesUsoPage;
