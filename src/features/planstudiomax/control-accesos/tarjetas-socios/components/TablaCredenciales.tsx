import React, { useEffect, useState } from 'react';
import { Credencial, getCredenciales } from '../tarjetasSociosApi';

interface TablaCredencialesProps {
  searchTerm: string;
}

const TablaCredenciales: React.FC<TablaCredencialesProps> = ({ searchTerm }) => {
  const [credenciales, setCredenciales] = useState<Credencial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredenciales = async () => {
      setLoading(true);
      const data = await getCredenciales(searchTerm);
      setCredenciales(data);
      setLoading(false);
    };
    fetchCredenciales();
  }, [searchTerm]);

  if (loading) {
    return <div className="text-center">Cargando credenciales...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Foto</th>
            <th className="py-3 px-4 text-left">Nombre Cliente</th>
            <th className="py-3 px-4 text-left">Número de Tarjeta</th>
            <th className="py-3 px-4 text-left">Estado</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {credenciales.map((credencial) => (
            <tr key={credencial.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">
                <img src={credencial.fotoCliente} alt={credencial.clienteNombre} className="w-10 h-10 rounded-full object-cover" />
              </td>
              <td className="py-3 px-4">{credencial.clienteNombre}</td>
              <td className="py-3 px-4">{credencial.numeroTarjeta}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${credencial.estado === 'activo' ? 'bg-green-200 text-green-800' : ''}
                    ${credencial.estado === 'bloqueado' ? 'bg-red-200 text-red-800' : ''}
                    ${credencial.estado === 'inactivo' ? 'bg-gray-200 text-gray-800' : ''}
                  `}
                >
                  {credencial.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaCredenciales;
