import React from 'react';
import FormularioAsignacion from './components/FormularioAsignacion';
import ValidadorConflictos from './components/ValidadorConflictos';
import SugerenciasInteligentes from './components/SugerenciasInteligentes';
import VisualizadorRoles from './components/VisualizadorRoles';
import GestionTemporal from './components/GestionTemporal';
import RotacionAutomatica from './components/RotacionAutomatica';
import AnalisisCarga from './components/AnalisisCarga';
import AlertasBurnout from './components/AlertasBurnout';
import HistoriaAsignaciones from './components/HistoriaAsignaciones';

const AsignacionRolesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Asignación de Roles - Gestión Flexible</h1>
      <FormularioAsignacion />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ValidadorConflictos />
        <SugerenciasInteligentes />
        <VisualizadorRoles />
        <GestionTemporal />
        <RotacionAutomatica />
        <AnalisisCarga />
        <AlertasBurnout />
        <HistoriaAsignaciones />
      </div>
    </div>
  );
};

export default AsignacionRolesPage;
