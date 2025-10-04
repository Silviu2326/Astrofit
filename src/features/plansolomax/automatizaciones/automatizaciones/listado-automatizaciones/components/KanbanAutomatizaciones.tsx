import React from 'react';
import { FlujoAutomatizacion } from '../listadoAutomatizacionesApi';
import { EstadoFlujo } from './EstadoFlujo';
import { ContadorEjecuciones } from './ContadorEjecuciones';

interface KanbanAutomatizacionesProps {
  flujos: FlujoAutomatizacion[];
}

export const KanbanAutomatizaciones: React.FC<KanbanAutomatizacionesProps> = ({ flujos }) => {
  const flujosActivos = flujos.filter(flujo => flujo.estado === 'activo');
  const flujosPausados = flujos.filter(flujo => flujo.estado === 'pausado');

  const renderCard = (flujo: FlujoAutomatizacion) => (
    <div key={flujo.id} className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{flujo.nombre}</h3>
      <p className="text-sm text-gray-600 mb-1">Tipo: <span className="font-medium">{flujo.tipo}</span></p>
      <div className="flex items-center mb-2">
        <span className="text-sm text-gray-600 mr-2">Estado:</span>
        <EstadoFlujo estado={flujo.estado} />
      </div>
      <div className="flex items-center mb-3">
        <span className="text-sm text-gray-600 mr-2">Ejecuciones:</span>
        <ContadorEjecuciones count={flujo.ejecuciones} />
      </div>
      <div className="flex justify-end space-x-2">
        <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
        <button className="text-yellow-600 hover:text-yellow-900 text-sm">{flujo.estado === 'activo' ? 'Pausar' : 'Activar'}</button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Activos</h2>
        {flujosActivos.length > 0 ? (
          flujosActivos.map(renderCard)
        ) : (
          <p className="text-gray-500">No hay flujos activos.</p>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Pausados</h2>
        {flujosPausados.length > 0 ? (
          flujosPausados.map(renderCard)
        ) : (
          <p className="text-gray-500">No hay flujos pausados.</p>
        )}
      </div>
    </div>
  );
};
