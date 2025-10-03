import React from 'react';
import MatrizPermisos from './components/MatrizPermisos';
import GestorRoles from './components/GestorRoles';
import AuditoriaAccesos from './components/AuditoriaAccesos';
import PlantillasPermisos from './components/PlantillasPermisos';
import PermisosGranulares from './components/PermisosGranulares';
import HerenciaPermisos from './components/HerenciaPermisos';
import AlertasSeguridad from './components/AlertasSeguridad';
import AprobacionMultinivel from './components/AprobacionMultinivel';
import LogsAcceso from './components/LogsAcceso';

const PermisosEntrenadoresPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Control de Accesos - Permisos de Entrenadores</h1>
      <p className="text-gray-600 mb-8">Gestiona los permisos de cada entrenador para las diferentes funcionalidades del sistema.</p>
      <MatrizPermisos />
      <div className="mt-8 space-y-8">
        <GestorRoles />
        <AuditoriaAccesos />
        <PlantillasPermisos />
        <PermisosGranulares />
        <HerenciaPermisos />
        <AlertasSeguridad />
        <AprobacionMultinivel />
        <LogsAcceso />
      </div>
    </div>
  );
};

export default PermisosEntrenadoresPage;
