import React from 'react';
import TarjetasEmpresas from './components/TarjetasEmpresas';
import GestorContratos from './components/GestorContratos';
import MetricasB2B from './components/MetricasB2B';
import AlertasRenovaciones from './components/AlertasRenovaciones';
import DashboardPenetracion from './components/DashboardPenetracion';
import { useEmpresas } from './conveniosCorporativosApi';

const ConveniosCorporativosPage: React.FC = () => {
  const { empresas, loading, error } = useEmpresas();

  if (loading) return <div className="text-center py-4">Cargando empresas...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error al cargar empresas: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Convenios Corporativos - CRM Empresarial</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {empresas.map((empresa) => (
          <TarjetasEmpresas key={empresa.id} empresa={empresa} />
        ))}
      </div>
      <div className="space-y-8">
        <GestorContratos />
        <MetricasB2B />
        <AlertasRenovaciones />
        <DashboardPenetracion />
      </div>
    </div>
  );
};

export default ConveniosCorporativosPage;
