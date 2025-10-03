import React, { useEffect, useState } from 'react';
import { getTornos, updateTornoStatus, Torno } from '../gestionTornosApi';

const PanelTornos: React.FC = () => {
  const [tornos, setTornos] = useState<Torno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTornos();
  }, []);

  const fetchTornos = async () => {
    try {
      setLoading(true);
      const data = await getTornos();
      setTornos(data);
    } catch (err) {
      setError('Error al cargar los tornos.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, currentStatus: Torno['status']) => {
    const newStatus = currentStatus === 'activo' ? 'inactivo' : 'activo';
    try {
      const updatedTorno = await updateTornoStatus(id, newStatus);
      setTornos((prevTornos) =>
        prevTornos.map((torno) => (torno.id === id ? updatedTorno : torno))
      );
    } catch (err) {
      setError('Error al actualizar el estado del torno.');
    }
  };

  if (loading) return <div className="text-center">Cargando tornos...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tornos.map((torno) => (
        <div key={torno.id} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">{torno.name}</h3>
          <p className="text-gray-600 mb-2">Estado: <span className={`font-medium ${torno.status === 'activo' ? 'text-green-600' : torno.status === 'inactivo' ? 'text-red-600' : 'text-yellow-600'}`}>{torno.status}</span></p>
          <button
            onClick={() => handleStatusChange(torno.id, torno.status)}
            disabled={torno.status === 'mantenimiento'}
            className={`px-4 py-2 rounded-md text-white ${torno.status === 'activo' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} ${torno.status === 'mantenimiento' && 'opacity-50 cursor-not-allowed'}`}
          >
            {torno.status === 'activo' ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PanelTornos;
