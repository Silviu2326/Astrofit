import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Carrot, Plus, X, GripVertical, Trash2 } from 'lucide-react';

interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface IngredientesEditorProps {
  initialIngredientes: Ingrediente[];
  onIngredientesChange: (ingredientes: Ingrediente[]) => void;
}

const IngredientesEditor: React.FC<IngredientesEditorProps> = ({
  initialIngredientes,
  onIngredientesChange,
}) => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(initialIngredientes);
  const [newIngredienteNombre, setNewIngredienteNombre] = useState('');
  const [newIngredienteCantidad, setNewIngredienteCantidad] = useState(1);
  const [newIngredienteUnidad, setNewIngredienteUnidad] = useState('g');

  const unidadesMedida = ['g', 'kg', 'ml', 'L', 'taza', 'cda', 'cdita', 'ud', 'pizca', 'al gusto'];

  const handleAddIngrediente = () => {
    if (newIngredienteNombre.trim()) {
      const newIng: Ingrediente = {
        id: uuidv4(),
        nombre: newIngredienteNombre.trim(),
        cantidad: newIngredienteCantidad,
        unidad: newIngredienteUnidad,
      };
      const updatedIngredientes = [...ingredientes, newIng];
      setIngredientes(updatedIngredientes);
      onIngredientesChange(updatedIngredientes);
      setNewIngredienteNombre('');
      setNewIngredienteCantidad(1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngrediente();
    }
  };

  const handleRemoveIngrediente = (id: string) => {
    const updatedIngredientes = ingredientes.filter((ing) => ing.id !== id);
    setIngredientes(updatedIngredientes);
    onIngredientesChange(updatedIngredientes);
  };

  const handleUpdateIngrediente = (id: string, field: keyof Ingrediente, value: any) => {
    const updatedIngredientes = ingredientes.map((ing) =>
      ing.id === id ? { ...ing, [field]: value } : ing
    );
    setIngredientes(updatedIngredientes);
    onIngredientesChange(updatedIngredientes);
  };

  const handleReorder = (newOrder: Ingrediente[]) => {
    setIngredientes(newOrder);
    onIngredientesChange(newOrder);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
              <Carrot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Ingredientes</h3>
              <p className="text-sm text-gray-600">Arrastra para reordenar</p>
            </div>
          </div>
          {ingredientes.length > 0 && (
            <div className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
              {ingredientes.length}
            </div>
          )}
        </div>

        {/* Lista de ingredientes con drag & drop */}
        <div className="space-y-3 mb-6">
          <AnimatePresence mode="popLayout">
            {ingredientes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 text-gray-500"
              >
                <Carrot className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm font-medium">No hay ingredientes aún</p>
                <p className="text-xs">Añade el primer ingrediente abajo</p>
              </motion.div>
            ) : (
              <Reorder.Group axis="y" values={ingredientes} onReorder={handleReorder} className="space-y-3">
                {ingredientes.map((ing, index) => (
                  <Reorder.Item
                    key={ing.id}
                    value={ing}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border-2 border-gray-200 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md">
                      {/* Drag handle */}
                      <div className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <GripVertical className="w-5 h-5" />
                      </div>

                      {/* Número */}
                      <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>

                      {/* Nombre */}
                      <input
                        type="text"
                        value={ing.nombre}
                        onChange={(e) => handleUpdateIngrediente(ing.id, 'nombre', e.target.value)}
                        placeholder="Nombre"
                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none bg-gray-50 font-medium"
                      />

                      {/* Cantidad */}
                      <input
                        type="number"
                        value={ing.cantidad}
                        onChange={(e) => handleUpdateIngrediente(ing.id, 'cantidad', parseFloat(e.target.value) || 0)}
                        placeholder="Cant"
                        min="0"
                        step="0.1"
                        className="w-20 px-3 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none bg-gray-50 text-center font-semibold"
                      />

                      {/* Unidad */}
                      <select
                        value={ing.unidad}
                        onChange={(e) => handleUpdateIngrediente(ing.id, 'unidad', e.target.value)}
                        className="w-24 px-2 py-2 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none bg-gray-50 font-medium text-sm"
                      >
                        {unidadesMedida.map(unidad => (
                          <option key={unidad} value={unidad}>{unidad}</option>
                        ))}
                      </select>

                      {/* Botón eliminar */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => handleRemoveIngrediente(ing.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </AnimatePresence>
        </div>

        {/* Agregar nuevo ingrediente */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
          <div className="flex flex-wrap md:flex-nowrap items-end gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Ingrediente
              </label>
              <input
                type="text"
                placeholder="Ej: Tomate cherry"
                value={newIngredienteNombre}
                onChange={(e) => setNewIngredienteNombre(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none bg-white font-medium"
              />
            </div>

            <div className="w-24">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Cantidad
              </label>
              <input
                type="number"
                placeholder="0"
                value={newIngredienteCantidad}
                onChange={(e) => setNewIngredienteCantidad(parseFloat(e.target.value) || 0)}
                onKeyPress={handleKeyPress}
                min="0"
                step="0.1"
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none bg-white text-center font-semibold"
              />
            </div>

            <div className="w-28">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Unidad
              </label>
              <select
                value={newIngredienteUnidad}
                onChange={(e) => setNewIngredienteUnidad(e.target.value)}
                className="w-full px-2 py-2 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all outline-none bg-white font-medium"
              >
                {unidadesMedida.map(unidad => (
                  <option key={unidad} value={unidad}>{unidad}</option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleAddIngrediente}
              disabled={!newIngredienteNombre.trim()}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Añadir
            </motion.button>
          </div>

          <p className="text-xs text-gray-600 mt-2">
            💡 Presiona Enter para añadir rápidamente
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IngredientesEditor;
