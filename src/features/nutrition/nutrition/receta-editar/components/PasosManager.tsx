import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import {
  ListOrdered, Plus, X, GripVertical, Clock, Image as ImageIcon, Edit3
} from 'lucide-react';

interface Paso {
  id: string;
  orden: number;
  descripcion: string;
  tiempo?: number;
  fotoUrl?: string | null;
}

interface PasosManagerProps {
  pasos: Paso[];
}

const PasosManager: React.FC<PasosManagerProps> = ({ pasos: initialPasos }) => {
  const [pasos, setPasos] = useState(initialPasos);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleUpdate = (id: string, field: keyof Paso, value: any) => {
    setPasos(pasos.map(paso =>
      paso.id === id ? { ...paso, [field]: value } : paso
    ));
  };

  const handleRemove = (id: string) => {
    setPasos(pasos.filter(paso => paso.id !== id));
  };

  const handleAdd = () => {
    const newPaso: Paso = {
      id: `paso-${Date.now()}`,
      orden: pasos.length + 1,
      descripcion: 'Describe este paso de la preparación...',
      tiempo: 5,
      fotoUrl: null,
    };
    setPasos([...pasos, newPaso]);
    setEditingId(newPaso.id);
  };

  const handleReorder = (newOrder: Paso[]) => {
    // Actualizar orden después del drag & drop
    const reordered = newOrder.map((paso, index) => ({
      ...paso,
      orden: index + 1,
    }));
    setPasos(reordered);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <ListOrdered className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Pasos de Preparación</h3>
              <p className="text-sm text-gray-600">{pasos.length} pasos • Arrastra para reordenar</p>
            </div>
          </div>
        </div>

        {/* Lista reordenable con Framer Motion */}
        <Reorder.Group axis="y" values={pasos} onReorder={handleReorder} className="space-y-3">
          {pasos.map((paso, index) => (
            <Reorder.Item key={paso.id} value={paso}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-md transition-all duration-300 cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-start gap-3">
                  {/* Grip handle para drag */}
                  <div className="flex-shrink-0 mt-2">
                    <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>

                  {/* Número del paso */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {paso.orden}
                    </div>
                  </div>

                  {/* Contenido del paso */}
                  <div className="flex-1 space-y-3">
                    {/* Descripción */}
                    <textarea
                      value={paso.descripcion}
                      onChange={(e) => handleUpdate(paso.id, 'descripcion', e.target.value)}
                      onFocus={() => setEditingId(paso.id)}
                      onBlur={() => setEditingId(null)}
                      rows={2}
                      className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 outline-none bg-white/80 resize-none ${
                        editingId === paso.id
                          ? 'border-blue-500 ring-4 ring-blue-100'
                          : 'border-transparent hover:border-blue-300'
                      }`}
                      placeholder="Describe este paso..."
                    />

                    {/* Grid de campos adicionales */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Tiempo */}
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <input
                          type="number"
                          value={paso.tiempo || 0}
                          onChange={(e) => handleUpdate(paso.id, 'tiempo', parseInt(e.target.value))}
                          className="flex-1 px-3 py-2 rounded-lg border-2 border-transparent hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80"
                          placeholder="Tiempo"
                          min="0"
                        />
                        <span className="text-sm text-gray-600">min</span>
                      </div>

                      {/* Foto URL */}
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          value={paso.fotoUrl || ''}
                          onChange={(e) => handleUpdate(paso.id, 'fotoUrl', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border-2 border-transparent hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80"
                          placeholder="URL foto (opcional)"
                        />
                      </div>
                    </div>

                    {/* Preview de foto si existe */}
                    {paso.fotoUrl && (
                      <div className="mt-2 rounded-lg overflow-hidden border-2 border-blue-200">
                        <img
                          src={paso.fotoUrl}
                          alt={`Paso ${paso.orden}`}
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Botón eliminar */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleRemove(paso.id)}
                      className="p-2 rounded-lg bg-white/80 hover:bg-red-50 border border-red-200 transition-all duration-300"
                      title="Eliminar paso"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Botón agregar paso */}
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full p-4 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 text-blue-700 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Agregar Paso
        </motion.button>

        {/* Info de tiempo total */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-700">Tiempo Total de Preparación</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {pasos.reduce((sum, paso) => sum + (paso.tiempo || 0), 0)}
              </p>
              <p className="text-xs text-gray-500">minutos</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PasosManager;
