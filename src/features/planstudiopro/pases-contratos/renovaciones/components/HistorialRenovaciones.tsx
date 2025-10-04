import React, { useEffect, useState } from 'react';
import { Contrato, getHistorialRenovaciones } from '../renovacionesApi';

const HistorialRenovaciones: React.FC = () => {
  const [historial, setHistorial] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      const data = await getHistorialRenovaciones();
      setHistorial(data);
      setLoading(false);
    };
    fetchHistorial();
  }, []);

  if (loading) {
    return <div className="p-4 bg-white rounded-lg shadow">Cargando historial...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Historial de Renovaciones</h2>
      {
        historial.length === 0 ? (
          <p className="text-gray-600">No hay historial de renovaciones.</p>
        ) : (
          <ul className="space-y-3">
            {historial.map((contrato) => (
              <li key={contrato.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium">{contrato.cliente} - {contrato.servicio}</p>
                  <p className="text-sm text-gray-500">Vencimiento: {contrato.fechaVencimiento}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${contrato.estado === 'renovado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {contrato.estado}
                </span>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default HistorialRenovaciones;
