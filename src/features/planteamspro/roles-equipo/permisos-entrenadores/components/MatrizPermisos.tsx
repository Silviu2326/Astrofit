import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Save, CheckCircle, XCircle } from 'lucide-react';
import { getEntrenadores, getPermisos, getPermisosPorEntrenador, updatePermisoEntrenador, Entrenador, Permiso, PermisoEntrenador } from '../permisosEntrenadoresApi';

const MatrizPermisos: React.FC = () => {
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [permisosEntrenador, setPermisosEntrenador] = useState<PermisoEntrenador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

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
      setHasChanges(true);
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

  const handleSaveChanges = () => {
    setHasChanges(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-pulse flex items-center gap-3">
        <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
        <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
      <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
      <p className="text-red-600 font-semibold">Error: {error}</p>
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Shield className="w-6 h-6" />
          </div>
          Matriz de Permisos
        </h3>
      </div>

      {/* Tabla con scroll horizontal */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
              <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 uppercase tracking-wider sticky left-0 bg-indigo-50 z-10">
                Entrenador
              </th>
              {permisos.map((permiso) => (
                <th key={permiso.id} className="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                  {permiso.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {entrenadores.map((entrenador, index) => (
              <motion.tr
                key={entrenador.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-white/60 backdrop-blur-sm hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 sticky left-0 bg-white/60 group-hover:bg-indigo-50/50 z-10">
                  {entrenador.nombre}
                </td>
                {permisos.map((permiso) => {
                  const isPermitted = getPermisoStatus(entrenador.id, permiso.id);
                  return (
                    <td key={permiso.id} className="px-6 py-4 whitespace-nowrap">
                      <label className="flex items-center cursor-pointer group/switch">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isPermitted}
                            onChange={() => handleTogglePermiso(entrenador.id, permiso.id, isPermitted)}
                          />
                          <div className={`block w-14 h-7 rounded-full shadow-inner transition-all duration-300 ${
                            isPermitted
                              ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                              : 'bg-gradient-to-r from-gray-300 to-gray-400'
                          }`}></div>
                          <div
                            className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                              isPermitted ? 'translate-x-7' : ''
                            }`}
                          >
                            {isPermitted ? (
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <XCircle className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="ml-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            isPermitted
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {isPermitted ? 'Activo' : 'Bloqueado'}
                          </span>
                        </div>
                      </label>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón de guardar cambios */}
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-indigo-100"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveChanges}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Save className="w-5 h-5" />
            <span className="relative z-10">Guardar Cambios</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default MatrizPermisos;
