import React, { useEffect, useState } from 'react';
import { getSuscripciones, Suscripcion } from '../cobrosFacturacionApi';

const SuscripcionesActivas: React.FC = () => {
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuscripciones = async () => {
      try {
        const data = await getSuscripciones();
        setSuscripciones(data);
      } catch (err) {
        setError('Error al cargar las suscripciones.');
      } finally {
        setLoading(false);
      }
    };
    fetchSuscripciones();
  }, []);

  if (loading) return <div className="text-center p-4">Cargando suscripciones activas...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Suscripciones Activas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inicio</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fin</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renovación Auto.</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suscripciones.map((suscripcion) => (
              <tr key={suscripcion.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{suscripcion.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suscripcion.cliente}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suscripcion.plan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suscripcion.fechaInicio}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suscripcion.fechaFin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    suscripcion.estado === 'Activa' ? 'bg-green-100 text-green-800' :
                    suscripcion.estado === 'Pendiente Renovacion' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {suscripcion.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{suscripcion.renovacionAutomatica ? 'Sí' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{suscripcion.monto.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuscripcionesActivas;
