import React, { useState } from 'react';
import { TablaEquipo } from './components/TablaEquipo';
import { useEquipo } from './listadoRolesApi';
import EditorRoles from './components/EditorRoles';
import HistorialCambios from './components/HistorialCambios';
import JerarquiaVisual from './components/JerarquiaVisual';
import BotonesAccionRapida from './components/BotonesAccionRapida';
import SistemaNotificaciones from './components/SistemaNotificaciones';
import ValidacionesRoles from './components/ValidacionesRoles';
import RolesTemporales from './components/RolesTemporales';
import IntegracionCalendario from './components/IntegracionCalendario';

const ListadoRolesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { equipo, loading, error } = useEquipo();

  const filteredEquipo = equipo.filter(member =>
    member.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.rolPrincipal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-4">Cargando equipo...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error al cargar el equipo: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Equipo y Roles</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o rol..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TablaEquipo equipo={filteredEquipo} />

      {/* Nuevos componentes integrados */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <EditorRoles />
        <HistorialCambios />
        <JerarquiaVisual />
        <BotonesAccionRapida />
        <SistemaNotificaciones />
        <ValidacionesRoles />
        <RolesTemporales />
        <IntegracionCalendario />
      </div>
    </div>
  );
};

export default ListadoRolesPage;
