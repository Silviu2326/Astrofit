import React, { useEffect, useState } from 'react';
import { fetchProtocolos, Protocolo } from '../agenteCientificoApi';

const ProtocolosSugeridos: React.FC = () => {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProtocolos = async () => {
      const data = await fetchProtocolos();
      setProtocolos(data);
      setLoading(false);
    };
    getProtocolos();
  }, []);

  if (loading) {
    return <div className="text-gray-600">Cargando protocolos sugeridos...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Protocolos Sugeridos</h2>
      <p className="text-gray-600 mb-4">Rutinas basadas en evidencia con explicación simple.</p>
      <div className="space-y-4">
        {protocolos.map((protocolo) => (
          <div key={protocolo.id} className="border border-gray-200 rounded-md p-4">
            <h3 className="text-xl font-semibold text-gray-700">{protocolo.nombre}</h3>
            <p className="text-gray-600 mt-1">{protocolo.descripcion}</p>
            <p className="text-sm text-gray-500 mt-2">Explicación: {protocolo.explicacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolosSugeridos;
