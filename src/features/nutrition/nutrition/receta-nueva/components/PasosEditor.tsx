import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { ClipboardList, Plus, GripVertical, Trash2, Timer, Camera } from 'lucide-react';

interface Paso {
  id: string;
  descripcion: string;
  tiempoEstimado?: number;
}

interface PasosEditorProps {
  initialPasos: Paso[];
  onPasosChange: (pasos: Paso[]) => void;
}

const PasosEditor: React.FC<PasosEditorProps> = ({
  initialPasos,
  onPasosChange,
}) => {
  const [pasos, setPasos] = useState<Paso[]>(initialPasos);
  const [newPasoDescripcion, setNewPasoDescripcion] = useState('');
  const [newPasoTiempo, setNewPasoTiempo] = useState<number | undefined>(undefined);

  const handleAddPaso = () => {
    if (newPasoDescripcion.trim()) {
      const newPaso: Paso = {
        id: uuidv4(),
        descripcion: newPasoDescripcion.trim(),
        tiempoEstimado: newPasoTiempo,
      };
      const updatedPasos = [...pasos, newPaso];
      setPasos(updatedPasos);
      onPasosChange(updatedPasos);
      setNewPasoDescripcion('');
      setNewPasoTiempo(undefined);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleAddPaso();
    }
  };

  const handleRemovePaso = (id: string) => {
    const updatedPasos = pasos.filter((paso) => paso.id !== id);
    setPasos(updatedPasos);
    onPasosChange(updatedPasos);
  };

  const handleUpdatePaso = (id: string, field: keyof Paso, value: any) => {
    const updatedPasos = pasos.map((paso) =>
      paso.id === id ? { ...paso, [field]: value } : paso
    );
    setPasos(updatedPasos);
    onPasosChange(updatedPasos);
  };

  const handleReorder = (newOrder: Paso[]) => {
    setPasos(newOrder);
    onPasosChange(newOrder);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Pasos de Preparación</h3>
              <p className="text-sm text-gray-600">Arrastra para reordenar los pasos</p>
            </div>
          </div>
          {pasos.length > 0 && (
            <div className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">
              {pasos.length}
            </div>
          )}
        </div>

        {/* Lista de pasos con drag & drop */}
        <div className="space-y-4 mb-6">
          <AnimatePresence mode="popLayout">
            {pasos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 text-gray-500"
              >
                <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-sm font-medium">No hay pasos aún</p>
                <p className="text-xs">Añade el primer paso abajo</p>
              </motion.div>
            ) : (
              <Reorder.Group axis="y" values={pasos} onReorder={handleReorder} className="space-y-4">
                {pasos.map((paso, index) => (
                  <Reorder.Item
                    key={paso.id}
                    value={paso}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md p-4">
                      <div className="flex items-start gap-3">
                        {/* Drag handle */}
                        <div className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <GripVertical className="w-5 h-5" />
                        </div>

                        {/* Número */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
                          {index + 1}
                        </div>

                        {/* Contenido del paso */}
                        <div className="flex-1 space-y-3">
                          <textarea
                            value={paso.descripcion}
                            onChange={(e) => handleUpdatePaso(paso.id, 'descripcion', e.target.value)}
                            placeholder="Describe este paso..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-gray-50 resize-none font-medium"
                          />

                          {/* Tiempo estimado (opcional) */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 flex-1">
                              <Timer className="w-4 h-4 text-blue-600" />
                              <input
                                type="number"
                                value={paso.tiempoEstimado || ''}
                                onChange={(e) => handleUpdatePaso(paso.id, 'tiempoEstimado', e.target.value ? parseInt(e.target.value) : undefined)}
                                placeholder="Tiempo (min)"
                                min="0"
                                className="w-28 px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-white text-sm font-medium"
                              />
                              <span className="text-xs text-gray-500">minutos (opcional)</span>
                            </div>

                            {/* Badge de foto (decorativo) */}
                            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 flex items-center gap-1.5 opacity-60">
                              <Camera className="w-3.5 h-3.5 text-blue-600" />
                              <span className="text-xs font-semibold text-blue-700">Foto</span>
                            </div>
                          </div>
                        </div>

                        {/* Botón eliminar */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => handleRemovePaso(paso.id)}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </AnimatePresence>
        </div>

        {/* Agregar nuevo paso */}
        <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Nuevo Paso
              </label>
              <textarea
                placeholder="Describe el siguiente paso de la preparación..."
                value={newPasoDescripcion}
                onChange={(e) => setNewPasoDescripcion(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-white resize-none font-medium"
              />
            </div>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  <div className="flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-blue-600" />
                    Tiempo Estimado (opcional)
                  </div>
                </label>
                <input
                  type="number"
                  placeholder="5"
                  value={newPasoTiempo || ''}
                  onChange={(e) => setNewPasoTiempo(e.target.value ? parseInt(e.target.value) : undefined)}
                  onKeyPress={handleKeyPress}
                  min="0"
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-white font-medium"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleAddPaso}
                disabled={!newPasoDescripcion.trim()}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                Añadir Paso
              </motion.button>
            </div>

            <p className="text-xs text-gray-600">
              💡 Presiona Ctrl + Enter para añadir rápidamente
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PasosEditor;
