import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, User, FileText, RotateCcw, GitBranch, Plus, Minus, Eye
} from 'lucide-react';

interface VersionHistorial {
  version: number;
  fecha: string;
  usuario: string;
  tiposCambios: string[];
  cambios: string;
  notas: string;
}

interface HistorialVersionesProps {
  historial: VersionHistorial[];
}

const HistorialVersiones: React.FC<HistorialVersionesProps> = ({ historial }) => {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);
  const [showDiff, setShowDiff] = useState(false);

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getColorTipoCambio = (tipo: string) => {
    const colores: Record<string, string> = {
      'Creación': 'from-green-500 to-emerald-500',
      'Ingredientes': 'from-blue-500 to-indigo-500',
      'Pasos': 'from-purple-500 to-pink-500',
      'Nutrición': 'from-orange-500 to-red-500',
      'Descripción': 'from-cyan-500 to-teal-500',
      'Tags': 'from-yellow-500 to-orange-500',
    };
    return colores[tipo] || 'from-gray-500 to-gray-600';
  };

  const handleRestaurar = (version: number) => {
    if (confirm(`¿Estás seguro de que quieres restaurar la versión ${version}?`)) {
      alert(`Versión ${version} restaurada (simulación)`);
    }
  };

  // Simulación de diff
  const getDiffData = () => {
    return [
      { tipo: 'removed', texto: 'Limón (cantidad: 0.5 unidad)' },
      { tipo: 'added', texto: 'Limón (cantidad: 1 unidad)' },
      { tipo: 'removed', texto: 'Aceite de Oliva (cantidad: 1.5 cucharadas)' },
      { tipo: 'added', texto: 'Aceite de Oliva (cantidad: 2 cucharadas)' },
      { tipo: 'unchanged', texto: 'Quinoa (cantidad: 1 taza)' },
      { tipo: 'unchanged', texto: 'Aguacate (cantidad: 1 unidad)' },
    ];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Historial de Versiones</h3>
              <p className="text-sm text-gray-600">{historial.length} versiones registradas</p>
            </div>
          </div>
        </div>

        {/* Timeline de versiones */}
        <div className="relative">
          {/* Línea vertical conectora */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-300 to-pink-200"></div>

          <div className="space-y-6">
            {historial.map((version, index) => (
              <motion.div
                key={version.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative pl-16"
              >
                {/* Punto en la timeline */}
                <div className="absolute left-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                  v{version.version}
                </div>

                {/* Card de versión */}
                <div
                  className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    selectedVersion === version.version
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedVersion(selectedVersion === version.version ? null : version.version)}
                >
                  {/* Header de la versión */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{formatearFecha(version.fecha)}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-700">{version.usuario}</span>
                      </div>
                    </div>

                    {/* Badges de tipos de cambios */}
                    <div className="flex flex-wrap gap-2 justify-end">
                      {version.tiposCambios.map((tipo, idx) => (
                        <div
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md bg-gradient-to-r ${getColorTipoCambio(tipo)}`}
                        >
                          {tipo}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Descripción del cambio */}
                  <p className="text-sm text-gray-700 mb-3">{version.cambios}</p>

                  {/* Notas */}
                  {version.notas && (
                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 mb-3">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-600">{version.notas}</p>
                      </div>
                    </div>
                  )}

                  {/* Botones de acción */}
                  {selectedVersion === version.version && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex gap-2 mt-4 pt-4 border-t border-gray-200"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDiff(!showDiff);
                        }}
                        className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        {showDiff ? 'Ocultar' : 'Ver'} Diferencias
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestaurar(version.version);
                        }}
                        className="px-3 py-2 border-2 border-indigo-500 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2 text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Restaurar Versión
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Vista de diferencias (diff) */}
                {selectedVersion === version.version && showDiff && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-gray-50 border-2 border-gray-200"
                  >
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Comparación con Versión Anterior
                    </h4>
                    <div className="space-y-2 font-mono text-xs">
                      {getDiffData().map((line, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded ${
                            line.tipo === 'added'
                              ? 'bg-green-50 border-l-4 border-green-500 text-green-900'
                              : line.tipo === 'removed'
                              ? 'bg-red-50 border-l-4 border-red-500 text-red-900'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {line.tipo === 'added' && <Plus className="w-3 h-3 text-green-600" />}
                            {line.tipo === 'removed' && <Minus className="w-3 h-3 text-red-600" />}
                            <span>{line.texto}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mensaje si no hay historial */}
        {historial.length === 0 && (
          <div className="text-center py-12">
            <GitBranch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay historial de versiones disponible</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HistorialVersiones;
