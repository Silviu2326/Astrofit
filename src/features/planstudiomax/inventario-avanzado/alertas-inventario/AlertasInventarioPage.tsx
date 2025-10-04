import React from 'react';
import PanelAlertas from './components/PanelAlertas';
import ConfiguradorUmbrales from './components/ConfiguradorUmbrales';
import HistorialNotificaciones from './components/HistorialNotificaciones';
import PriorizadorAlertas from './components/PriorizadorAlertas';
import NotificacionesAutomaticas from './components/NotificacionesAutomaticas';
import SistemaConfirmacion from './components/SistemaConfirmacion';
import NotificacionesPushEmail from './components/NotificacionesPushEmail';
import DashboardResumen from './components/DashboardResumen';
import EscalamientoAutomatico from './components/EscalamientoAutomatico';

const AlertasInventarioPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Alertas de Inventario</h1>
      <PanelAlertas />
      <ConfiguradorUmbrales />
      <HistorialNotificaciones />
      <PriorizadorAlertas />
      <NotificacionesAutomaticas />
      <SistemaConfirmacion />
      <NotificacionesPushEmail />
      <DashboardResumen />
      <EscalamientoAutomatico />
    </div>
  );
};

export default AlertasInventarioPage;
