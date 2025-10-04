import React, { useEffect, useState } from 'react';
import { agenteProgresoApi, Cliente } from '../agenteProgresoApi';

const DashboardMetricas: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    agenteProgresoApi.getClientes().then(setClientes);
  }, []);

  useEffect(() => {
    if (clientes.length > 0 && !selectedCliente) {
      setSelectedCliente(clientes[0]);
    }
  }, [clientes, selectedCliente]);

  const getLatestValue = (metricas: { date: string; value: number }[]) => {
    return metricas.length > 0 ? metricas[metricas.length - 1].value : 'N/A';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Dashboard de M??tricas</h2>
      <div className="mb-4">
        <label htmlFor="cliente-select" className="block text-sm font-medium text-gray-700">Seleccionar Cliente:</label>
        <select
          id="cliente-select"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(e) => setSelectedCliente(clientes.find(c => c.id === e.target.value) || null)}
          value={selectedCliente?.id || ''}
        >
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>

      {selectedCliente ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Peso</h3>
            <p className="text-3xl font-bold text-blue-600">{getLatestValue(selectedCliente.progreso.peso)} kg</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Per??metro Cintura</h3>
            <p className="text-3xl font-bold text-green-600">{getLatestValue(selectedCliente.progreso.perimetroCintura)} cm</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Entrenos Completados</h3>
            <p className="text-3xl font-bold text-yellow-600">{getLatestValue(selectedCliente.progreso.entrenosCompletados)}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Adherencia Nutricional</h3>
            <p className="text-3xl font-bold text-red-600">{getLatestValue(selectedCliente.progreso.adherenciaNutricional)}%</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Selecciona un cliente para ver sus m??tricas.</p>
      )}
    </div>
  );
};

export default DashboardMetricas;
