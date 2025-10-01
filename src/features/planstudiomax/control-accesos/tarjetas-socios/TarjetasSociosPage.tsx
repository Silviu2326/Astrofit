import React, { useState } from 'react';
import TablaCredenciales from './components/TablaCredenciales';
import GestorEstados from './components/GestorEstados';
import AsignadorTarjetas from './components/AsignadorTarjetas';
import HistorialCambios from './components/HistorialCambios';
import BotonesAccionRapida from './components/BotonesAccionRapida';
import TarjetasTemporales from './components/TarjetasTemporales';
import ValidadorCodigos from './components/ValidadorCodigos';
import PanelAlertas from './components/PanelAlertas';
import ExportadorReportes from './components/ExportadorReportes';

const TarjetasSociosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Control de Accesos - Tarjetas de Socios</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o número de tarjeta..."
          className="p-2 border border-gray-300 rounded w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <TablaCredenciales searchTerm={searchTerm} />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <GestorEstados />
        <AsignadorTarjetas />
        <HistorialCambios />
        <BotonesAccionRapida />
        <TarjetasTemporales />
        <ValidadorCodigos />
        <PanelAlertas />
        <ExportadorReportes />
      </div>
    </div>
  );
};

export default TarjetasSociosPage;
