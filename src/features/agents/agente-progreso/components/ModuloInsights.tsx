import React, { useEffect, useState } from 'react';
import { agenteProgresoApi, Cliente, Insight } from '../agenteProgresoApi';

const ModuloInsights: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    agenteProgresoApi.getClientes().then(setClientes);
  }, []);

  useEffect(() => {
    if (clientes.length > 0 && !selectedClienteId) {
      setSelectedClienteId(clientes[0].id);
    }
  }, [clientes, selectedClienteId]);

  useEffect(() => {
    if (selectedClienteId) {
      agenteProgresoApi.getInsightsCliente(selectedClienteId).then(setInsights);
    }
  }, [selectedClienteId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">M??dulo de Insights y Recomendaciones</h2>
      <div className="mb-4">
        <label htmlFor="cliente-select-insights" className="block text-sm font-medium text-gray-700">Seleccionar Cliente:</label>
        <select
          id="cliente-select-insights"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(e) => setSelectedClienteId(e.target.value)}
          value={selectedClienteId || ''}
        >
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>

      {selectedClienteId ? (
        insights.length > 0 ? (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-md">
                <p className="text-sm text-indigo-700 font-medium">Tipo: <span className="font-bold">{insight.tipo.charAt(0).toUpperCase() + insight.tipo.slice(1)}</span></p>
                <p className="text-sm text-indigo-700">Recomendaci??n: {insight.recomendacion}</p>
                <p className="text-xs text-indigo-500 mt-1">Generado el: {insight.fechaGeneracion}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay insights disponibles para este cliente.</p>
        )
      ) : (
        <p className="text-gray-500">Selecciona un cliente para ver los insights.</p>
      )}
    </div>
  );
};

export default ModuloInsights;
