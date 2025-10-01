import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Clock, User, GitBranch, ArrowRight, X, RotateCcw } from 'lucide-react';
import { DietVersion, dietaEditarApi } from '../dietaEditarApi';

interface VersionHistoryProps {
  dietId: string;
  currentVersion: number;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({ dietId, currentVersion }) => {
  const [versions, setVersions] = useState<DietVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<DietVersion | null>(null);

  useEffect(() => {
    const fetchVersions = async () => {
      const fetchedVersions = await dietaEditarApi.fetchVersionHistory(dietId);
      setVersions(fetchedVersions);
    };
    fetchVersions();
  }, [dietId]);

  const handleRestoreVersion = (version: DietVersion) => {
    if (confirm(`¿Restaurar la versión ${version.version}? Esto creará una nueva versión con los valores anteriores.`)) {
      alert('Versión restaurada (funcionalidad mock)');
      setSelectedVersion(null);
    }
  };

  const calculateDiff = (oldValue: number, newValue: number) => {
    const diff = newValue - oldValue;
    const percentage = oldValue > 0 ? ((diff / oldValue) * 100).toFixed(1) : '0';
    return { diff, percentage };
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Historial de Versiones</h2>
              <p className="text-sm text-indigo-100">Seguimiento completo de cambios</p>
            </div>
          </div>
        </div>

        {/* Timeline de versiones */}
        <div className="relative">
          {versions.length === 0 && (
            <p className="text-center text-gray-500 py-8">No hay versiones anteriores.</p>
          )}

          {/* Línea vertical del timeline */}
          {versions.length > 0 && (
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200"></div>
          )}

          <div className="space-y-4">
            {versions.map((version, index) => {
              const isCurrentVersion = version.version === currentVersion;
              const typeColors = {
                macros: 'from-blue-500 to-indigo-600',
                comidas: 'from-green-500 to-emerald-600',
                general: 'from-purple-500 to-pink-600',
              };
              const typeColor = typeColors.macros; // Mock: todos son cambios de macros

              return (
                <motion.div
                  key={version.version}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative pl-16"
                >
                  {/* Punto en el timeline */}
                  <div className={`absolute left-3 w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                    isCurrentVersion
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                      : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  }`}></div>

                  {/* Card de versión */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    onClick={() => setSelectedVersion(version)}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition-all duration-300 ${
                      isCurrentVersion
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-300 shadow-lg'
                        : selectedVersion?.version === version.version
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-lg'
                        : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 bg-gradient-to-r ${typeColor} rounded-full`}>
                          <span className="text-xs font-bold text-white">V{version.version}</span>
                        </div>
                        {isCurrentVersion && (
                          <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                            <span className="text-xs font-bold text-white">ACTUAL</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{version.date}</span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-gray-800 mb-2">{version.changes}</p>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-600">
                        <User className="w-3 h-3" />
                        <span>Nutricionista</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <GitBranch className="w-3 h-3" />
                        <span>Macros</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de detalles y diff */}
      <AnimatePresence>
        {selectedVersion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedVersion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-2xl w-full mx-4 overflow-hidden"
            >
              {/* Header del modal */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <GitBranch className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Versión {selectedVersion.version}</h3>
                      <p className="text-sm text-indigo-100">{selectedVersion.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVersion(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Descripción del cambio */}
                <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                  <h4 className="text-sm font-bold text-indigo-700 mb-2">Descripción del Cambio</h4>
                  <p className="text-gray-700">{selectedVersion.changes}</p>
                </div>

                {/* Comparación de macros */}
                {versions[versions.indexOf(selectedVersion) + 1] && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-indigo-600" />
                      Diferencias con versión anterior
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Versión anterior */}
                      <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
                        <p className="text-center text-sm font-bold text-red-700 mb-3">Anterior (V{versions[versions.indexOf(selectedVersion) + 1].version})</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                            <span className="text-sm text-gray-600">Proteínas:</span>
                            <span className="text-sm font-bold text-gray-800">{versions[versions.indexOf(selectedVersion) + 1].dietData.macros.protein}g</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                            <span className="text-sm text-gray-600">Carbohidratos:</span>
                            <span className="text-sm font-bold text-gray-800">{versions[versions.indexOf(selectedVersion) + 1].dietData.macros.carbs}g</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                            <span className="text-sm text-gray-600">Grasas:</span>
                            <span className="text-sm font-bold text-gray-800">{versions[versions.indexOf(selectedVersion) + 1].dietData.macros.fats}g</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                            <span className="text-sm text-gray-600">Calorías:</span>
                            <span className="text-sm font-bold text-gray-800">{versions[versions.indexOf(selectedVersion) + 1].dietData.macros.calories}</span>
                          </div>
                        </div>
                      </div>

                      {/* Versión seleccionada */}
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                        <p className="text-center text-sm font-bold text-green-700 mb-3">Esta Versión (V{selectedVersion.version})</p>
                        <div className="space-y-2">
                          {(() => {
                            const prevVersion = versions[versions.indexOf(selectedVersion) + 1];
                            const proteinDiff = calculateDiff(prevVersion.dietData.macros.protein, selectedVersion.dietData.macros.protein);
                            const carbsDiff = calculateDiff(prevVersion.dietData.macros.carbs, selectedVersion.dietData.macros.carbs);
                            const fatsDiff = calculateDiff(prevVersion.dietData.macros.fats, selectedVersion.dietData.macros.fats);
                            const caloriesDiff = calculateDiff(prevVersion.dietData.macros.calories, selectedVersion.dietData.macros.calories);

                            return (
                              <>
                                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                                  <span className="text-sm text-gray-600">Proteínas:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-800">{selectedVersion.dietData.macros.protein}g</span>
                                    {proteinDiff.diff !== 0 && (
                                      <span className={`text-xs font-semibold ${proteinDiff.diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ({proteinDiff.diff > 0 ? '+' : ''}{proteinDiff.diff}g)
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                                  <span className="text-sm text-gray-600">Carbohidratos:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-800">{selectedVersion.dietData.macros.carbs}g</span>
                                    {carbsDiff.diff !== 0 && (
                                      <span className={`text-xs font-semibold ${carbsDiff.diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ({carbsDiff.diff > 0 ? '+' : ''}{carbsDiff.diff}g)
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                                  <span className="text-sm text-gray-600">Grasas:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-800">{selectedVersion.dietData.macros.fats}g</span>
                                    {fatsDiff.diff !== 0 && (
                                      <span className={`text-xs font-semibold ${fatsDiff.diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ({fatsDiff.diff > 0 ? '+' : ''}{fatsDiff.diff}g)
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                                  <span className="text-sm text-gray-600">Calorías:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-800">{selectedVersion.dietData.macros.calories}</span>
                                    {caloriesDiff.diff !== 0 && (
                                      <span className={`text-xs font-semibold ${caloriesDiff.diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ({caloriesDiff.diff > 0 ? '+' : ''}{caloriesDiff.diff})
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Macros actuales si no hay versión anterior */}
                {!versions[versions.indexOf(selectedVersion) + 1] && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Valores de esta versión</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-xs text-blue-600 font-semibold">Proteínas</p>
                        <p className="text-xl font-bold text-blue-700">{selectedVersion.dietData.macros.protein}g</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-xs text-green-600 font-semibold">Carbohidratos</p>
                        <p className="text-xl font-bold text-green-700">{selectedVersion.dietData.macros.carbs}g</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <p className="text-xs text-purple-600 font-semibold">Grasas</p>
                        <p className="text-xl font-bold text-purple-700">{selectedVersion.dietData.macros.fats}g</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                        <p className="text-xs text-orange-600 font-semibold">Calorías</p>
                        <p className="text-xl font-bold text-orange-700">{selectedVersion.dietData.macros.calories}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botón de restaurar */}
                {selectedVersion.version !== currentVersion && (
                  <button
                    onClick={() => handleRestoreVersion(selectedVersion)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Restaurar Esta Versión
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VersionHistory;
