import React, { useState, useEffect } from 'react';
import { agenteProgresoApi, Cliente } from '../agenteProgresoApi';

const InformeAutomatico: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(null);
  const [informe, setInforme] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    agenteProgresoApi.getClientes().then(setClientes);
  }, []);

  useEffect(() => {
    if (clientes.length > 0 && !selectedClienteId) {
      setSelectedClienteId(clientes[0].id);
    }
  }, [clientes, selectedClienteId]);

  const handleGenerarInforme = async () => {
    if (selectedClienteId) {
      setLoading(true);
      const generatedInforme = await agenteProgresoApi.generarInformeCliente(selectedClienteId);
      setInforme(generatedInforme);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informe Autom??tico</h2>
      <div className="mb-4">
        <label htmlFor="cliente-select-informe" className="block text-sm font-medium text-gray-700">Seleccionar Cliente:</label>
        <select
          id="cliente-select-informe"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(e) => {
            setSelectedClienteId(e.target.value);
            setInforme(null); // Clear previous report when client changes
          }}
          value={selectedClienteId || ''}
        >
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleGenerarInforme}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        disabled={loading || !selectedClienteId}
      >
        {loading ? 'Generando...' : 'Generar Resumen para Cliente'}
      </button>

      {informe && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-wrap">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Resumen Generado:</h3>
          <p className="text-gray-600">{informe}</p>
        </div>
      )}
    </div>
  );
};

export default InformeAutomatico;
