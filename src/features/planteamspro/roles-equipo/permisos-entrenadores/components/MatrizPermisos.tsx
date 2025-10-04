import React, { useState, useEffect } from 'react';
import { getEntrenadores, getPermisos, getPermisosPorEntrenador, updatePermisoEntrenador, Entrenador, Permiso, PermisoEntrenador } from '../permisosEntrenadoresApi';

const MatrizPermisos: React.FC = () => {
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [permisosEntrenador, setPermisosEntrenador] = useState<PermisoEntrenador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entrenadoresData, permisosData, permisosEntrenadorData] = await Promise.all([
          getEntrenadores(),
          getPermisos(),
          getPermisosPorEntrenador(),
        ]);
        setEntrenadores(entrenadoresData);
        setPermisos(permisosData);
        setPermisosEntrenador(permisosEntrenadorData);
      } catch (err) {
        setError('Error al cargar los datos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTogglePermiso = async (entrenadorId: string, permisoId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const updatedPermiso: PermisoEntrenador = { entrenadorId, permisoId, permitido: newStatus };

    try {
      await updatePermisoEntrenador(updatedPermiso);
      setPermisosEntrenador((prev) =>
        prev.map((p) =>
          p.entrenadorId === entrenadorId && p.permisoId === permisoId
            ? { ...p, permitido: newStatus }
            : p
        )
      );
    } catch (err) {
      setError('Error al actualizar el permiso.');
      console.error(err);
    }
  };

  const getPermisoStatus = (entrenadorId: string, permisoId: string): boolean => {
    const permiso = permisosEntrenador.find(
      (p) => p.entrenadorId === entrenadorId && p.permisoId === permisoId
    );
    return permiso?.permitido || false;
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-200' : 'bg-red-200';
  };

  if (loading) return <div className="text-center py-4">Cargando permisos...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error: {error}</div>;

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrenador</th>
            {permisos.map((permiso) => (
              <th key={permiso.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {permiso.nombre}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entrenadores.map((entrenador) => (
            <tr key={entrenador.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entrenador.nombre}</td>
              {permisos.map((permiso) => {
                const isPermitted = getPermisoStatus(entrenador.id, permiso.id);
                return (
                  <td key={permiso.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isPermitted}
                          onChange={() => handleTogglePermiso(entrenador.id, permiso.id, isPermitted)}
                        />
                        <div className={`block ${getStatusColor(isPermitted)} w-14 h-8 rounded-full shadow-inner`}></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow transition-transform
                            ${isPermitted ? 'translate-x-full border-green-600' : 'border-red-600'}`}
                        ></div>
                      </div>
                      <div className="ml-3 text-gray-700 font-medium">
                        {isPermitted ? 'Permitido' : 'Denegado'}
                      </div>
                    </label>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrizPermisos;
