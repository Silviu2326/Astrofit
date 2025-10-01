import React from 'react';
import DashboardVentas from './components/DashboardVentas';
import TopProductos from './components/TopProductos';
import AnalisisMargen from './components/AnalisisMargen';
import TendenciasVenta from './components/TendenciasVenta';

const InformesVentasPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Informes de Ventas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardVentas />
        <TopProductos />
        <AnalisisMargen />
        <TendenciasVenta />
      </div>
    </div>
  );
};

export default InformesVentasPage;
