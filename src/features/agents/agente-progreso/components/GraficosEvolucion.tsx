import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { agenteProgresoApi, Cliente, Metrica, ProgresoData } from '../agenteProgresoApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficosEvolucion: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(null);
  const [pesoData, setPesoData] = useState<ProgresoData | null>(null);
  const [cinturaData, setCinturaData] = useState<ProgresoData | null>(null);

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
      agenteProgresoApi.getProgresoCliente(selectedClienteId).then(progreso => {
        if (progreso) {
          // Preparar datos para peso
          const pesoLabels = progreso.peso.map(m => m.date);
          const pesoValues = progreso.peso.map(m => m.value);
          setPesoData({
            labels: pesoLabels,
            datasets: [
              {
                label: 'Peso (kg)',
                data: pesoValues,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
              },
            ],
          });

          // Preparar datos para per??metro de cintura
          const cinturaLabels = progreso.perimetroCintura.map(m => m.date);
          const cinturaValues = progreso.perimetroCintura.map(m => m.value);
          setCinturaData({
            labels: cinturaLabels,
            datasets: [
              {
                label: 'Per??metro Cintura (cm)',
                data: cinturaValues,
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
              },
            ],
          });
        }
      });
    }
  }, [selectedClienteId]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evoluci??n de M??tricas',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gr??ficos de Evoluci??n</h2>
      <div className="mb-4">
        <label htmlFor="cliente-select-grafico" className="block text-sm font-medium text-gray-700">Seleccionar Cliente:</label>
        <select
          id="cliente-select-grafico"
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

      {selectedClienteId && (pesoData && cinturaData) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">Evoluci??n de Peso</h3>
            <Line options={{...options, plugins: {...options.plugins, title: { ...options.plugins.title, text: 'Evoluci??n de Peso'}}}} data={pesoData} />
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">Evoluci??n de Per??metro de Cintura</h3>
            <Line options={{...options, plugins: {...options.plugins, title: { ...options.plugins.title, text: 'Evoluci??n de Per??metro de Cintura'}}}} data={cinturaData} />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Selecciona un cliente para ver sus gr??ficos de evoluci??n.</p>
      )}
    </div>
  );
};

export default GraficosEvolucion;
