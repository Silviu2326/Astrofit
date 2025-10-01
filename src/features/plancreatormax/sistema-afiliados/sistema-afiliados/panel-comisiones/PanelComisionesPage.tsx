import React from 'react';
import DashboardComisiones from './components/DashboardComisiones';
import CalculadoraComisiones from './components/CalculadoraComisiones';
import ListaTransacciones from './components/ListaTransacciones';

const PanelComisionesPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Comisiones de Afiliados</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Dashboard con tarjetas grandes de resumen */}
        <DashboardComisiones />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista detallada de transacciones */}
        <ListaTransacciones />
        {/* Calculadora automática de comisiones */}
        <CalculadoraComisiones />
      </div>
    </div>
  );
};

export default PanelComisionesPage;
