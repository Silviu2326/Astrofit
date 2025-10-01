
import React, { useEffect, useState } from 'react';
import { historialFlujosApi } from '../historialFlujosApi';
import IconosEstado from './IconosEstado';
import DetalleEjecucion from './DetalleEjecucion';

interface EjecucionFlujo {
  id: string;
  fechaHora: string;
  resultado: 'exito' | 'error';
  detalles: string;
  clienteAfectado: string;
  nombreFlujo: string;
}

const ListadoEjecuciones: React.FC = () => {
  const [ejecuciones, setEjecuciones] = useState<EjecucionFlujo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEjecucion, setSelectedEjecucion] = useState<EjecucionFlujo | null>(null);

  useEffect(() => {
    const fetchEjecuciones = async () => {
      setLoading(true);
      const data = await historialFlujosApi.getEjecuciones({});
      setEjecuciones(data);
      setLoading(false);
    };
    fetchEjecuciones();
  }, []);

  if (loading) return <p>Cargando ejecuciones...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Listado de Ejecuciones</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flujo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente Afectado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ejecuciones.map((ejecucion) => (
            <tr key={ejecucion.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ejecucion.fechaHora}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ejecucion.nombreFlujo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ejecucion.clienteAfectado}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <IconosEstado estado={ejecucion.resultado} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setSelectedEjecucion(ejecucion)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación iría aquí */}

      {selectedEjecucion && (
        <DetalleEjecucion
          ejecucion={selectedEjecucion}
          onClose={() => setSelectedEjecucion(null)}
        />
      )}
    </div>
  );
};

export default ListadoEjecuciones;
