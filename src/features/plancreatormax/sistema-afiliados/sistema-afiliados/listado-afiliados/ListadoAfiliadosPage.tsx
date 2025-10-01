
import React from 'react';
import { TablaAfiliados } from './components/TablaAfiliados';
import { IndicadoresRendimiento } from './components/IndicadoresRendimiento';
import { AccionesRapidas } from './components/AccionesRapidas';

const ListadoAfiliadosPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestor de Afiliados</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <IndicadoresRendimiento />
        <AccionesRapidas />
      </div>
      <TablaAfiliados />
    </div>
  );
};

export default ListadoAfiliadosPage;
