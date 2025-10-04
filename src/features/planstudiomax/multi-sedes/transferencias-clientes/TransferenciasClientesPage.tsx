import React from 'react';
import HistorialMovimientos from './components/HistorialMovimientos';
import ValidadorCapacidad from './components/ValidadorCapacidad';
import WorkflowAprobacion from './components/WorkflowAprobacion';
import NotificacionesSedes from './components/NotificacionesSedes';
import EstadisticasMovilidad from './components/EstadisticasMovilidad';
import SistemaNivelesAprobacion from './components/SistemaNivelesAprobacion';
import DashboardTransferencias from './components/DashboardTransferencias';
import AlertasAtencionEspecial from './components/AlertasAtencionEspecial';

const TransferenciasClientesPage: React.FC = () => {
  return (
    <div>
      <h1>Gestión de Transferencias de Clientes</h1>
      <DashboardTransferencias />
      <WorkflowAprobacion />
      <SistemaNivelesAprobacion />
      <ValidadorCapacidad />
      <NotificacionesSedes />
      <AlertasAtencionEspecial />
      <HistorialMovimientos />
      <EstadisticasMovilidad />
    </div>
  );
};

export default TransferenciasClientesPage;
