import React, { useState } from 'react';
import { TablaFacturas } from './components/TablaFacturas';
import { useFacturas } from './facturacionEmpresasApi';
import SumarioEconomico from './components/SumarioEconomico';
import GeneradorFacturas from './components/GeneradorFacturas';
import ReportesEjecutivos from './components/ReportesEjecutivos';
import HistorialPagos from './components/HistorialPagos';
import RecordatoriosAutomaticos from './components/RecordatoriosAutomaticos';
import IntegracionContable from './components/IntegracionContable';
import DashboardCobranza from './components/DashboardCobranza';
import ProyeccionesIngresos from './components/ProyeccionesIngresos';

const FacturacionEmpresasPage: React.FC = () => {
  const [filtroEstado, setFiltroEstado] = useState<string>('all');
  const [filtroEmpresa, setFiltroEmpresa] = useState<string>('');
  const { data: facturas, isLoading, error } = useFacturas();

  const facturasFiltradas = facturas?.filter(factura => {
    const matchesEstado = filtroEstado === 'all' || factura.estado === filtroEstado;
    const matchesEmpresa = factura.empresa.toLowerCase().includes(filtroEmpresa.toLowerCase());
    return matchesEstado && matchesEmpresa;
  }) || [];

  if (isLoading) return <div className="p-4">Cargando facturas...</div>;
  if (error) return <div className="p-4 text-red-500">Error al cargar facturas: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Facturación Empresas - Gestión de Cobros B2B</h1>

      <div className="mb-4 flex space-x-4">
        <select
          className="p-2 border rounded"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="all">Todos los estados</option>
          <option value="pagada">Pagada</option>
          <option value="pendiente">Pendiente</option>
          <option value="vencida">Vencida</option>
        </select>
        <input
          type="text"
          placeholder="Filtrar por empresa"
          className="p-2 border rounded flex-grow"
          value={filtroEmpresa}
          onChange={(e) => setFiltroEmpresa(e.target.value)}
        />
      </div>

      <TablaFacturas facturas={facturasFiltradas} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SumarioEconomico />
        <GeneradorFacturas />
        <ReportesEjecutivos />
        <HistorialPagos />
        <RecordatoriosAutomaticos />
        <IntegracionContable />
        <DashboardCobranza />
        <ProyeccionesIngresos />
      </div>
    </div>
  );
};

export default FacturacionEmpresasPage;
