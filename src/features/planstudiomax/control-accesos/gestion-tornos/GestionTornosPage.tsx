import React from 'react';
import PanelTornos from './components/PanelTornos';
import ConfiguradorHorarios from './components/ConfiguradorHorarios';
import MonitorTiempoReal from './components/MonitorTiempoReal';
import AlertasSeguridad from './components/AlertasSeguridad';
import ControlRemoto from './components/ControlRemoto';
import RegistroEventos from './components/RegistroEventos';
import AccesosEspeciales from './components/AccesosEspeciales';
import DashboardEstadisticas from './components/DashboardEstadisticas';
import WebSocketSimulator from './components/WebSocketSimulator';

const GestionTornosPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tornos - Control Físico de Accesos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PanelTornos />
        <ConfiguradorHorarios />
        <MonitorTiempoReal />
        <AlertasSeguridad />
        <ControlRemoto />
        <RegistroEventos />
        <AccesosEspeciales />
        <DashboardEstadisticas />
        <WebSocketSimulator />
      </div>
    </div>
  );
};

export default GestionTornosPage;
