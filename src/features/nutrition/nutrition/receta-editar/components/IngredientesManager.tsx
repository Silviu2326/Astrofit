import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Apple, Plus, X, Edit3, AlertCircle, RefreshCw, Sparkles
} from 'lucide-react';

interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  calorias?: number;
  proteinas?: number;
}

interface IngredientesManagerProps {
  ingredientes: Ingrediente[];
}

const IngredientesManager: React.FC<IngredientesManagerProps> = ({ ingredientes: initialIngredientes }) => {
  const [ingredientes, setIngredientes] = useState(initialIngredientes);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [caloriasDiff, setCaloriasDiff] = useState(0);

  const calcularCaloriasTotales = (ings: Ingrediente[]) => {
    return ings.reduce((sum, ing) => sum + (ing.calorias || 0), 0);
  };

  const handleUpdate = (id: string, field: keyof Ingrediente, value: any) => {
    const updated = ingredientes.map(ing =>
      ing.id === id ? { ...ing, [field]: value } : ing
    );

    const caloriasAntes = calcularCaloriasTotales(ingredientes);
    const caloriasDespues = calcularCaloriasTotales(updated);
    const diff = caloriasDespues - caloriasAntes;

    if (Math.abs(diff) > 50) {
      setCaloriasDiff(diff);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }

    setIngredientes(updated);
  };

  const handleRemove = (id: string) => {
    const updated = ingredientes.filter(ing => ing.id !== id);
    setIngredientes(updated);
  };

  const handleAdd = () => {
    const newIng: Ingrediente = {
      id: `ing-${Date.now()}`,
      nombre: 'Nuevo ingrediente',
      cantidad: 1,
      unidad: 'unidad',
      calorias: 0,
      proteinas: 0,
    };
    setIngredientes([...ingredientes, newIng]);
    setEditingId(newIng.id);
  };

  const recalcularNutricion = () => {
    // Simular recálculo automático
    const totalCalorias = calcularCaloriasTotales(ingredientes);
    alert(`Nutrición recalculada:\n\nCalorías totales: ${totalCalorias} kcal\nProteínas totales: ${ingredientes.reduce((sum, ing) => sum + (ing.proteinas || 0), 0)}g`);
  };

  const sugerirSustitucion = (ingrediente: Ingrediente) => {
    const sustituciones = [
      { original: 'Aguacate', alternativa: 'Hummus', razon: 'Menor en calorías' },
      { original: 'Aceite de Oliva', alternativa: 'Aceite en spray', razon: 'Control de porciones' },
      { original: 'Quinoa', alternativa: 'Arroz integral', razon: 'Más económico' },
    ];

    const sugerencia = sustituciones.find(s => ingrediente.nombre.includes(s.original));
    if (sugerencia) {
      alert(`💡 Sugerencia: Puedes sustituir ${sugerencia.original} por ${sugerencia.alternativa}\nRazón: ${sugerencia.razon}`);
    } else {
      alert('No hay sustituciones disponibles para este ingrediente');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
              <Apple className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Manager de Ingredientes</h3>
              <p className="text-sm text-gray-600">{ingredientes.length} ingredientes</p>
            </div>
          </div>
          <button
            onClick={recalcularNutricion}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Recalcular Nutrición</span>
          </button>
        </div>

        {/* Alerta de cambios significativos */}
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-900">Cambio significativo detectado</p>
              <p className="text-xs text-orange-700 mt-1">
                Las calorías han cambiado en {caloriasDiff > 0 ? '+' : ''}{caloriasDiff} kcal
              </p>
            </div>
          </motion.div>
        )}

        {/* Lista de ingredientes */}
        <div className="space-y-3">
          {ingredientes.map((ing, index) => (
            <motion.div
              key={ing.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {/* Nombre */}
                <div className="flex-1">
                  <input
                    type="text"
                    value={ing.nombre}
                    onChange={(e) => handleUpdate(ing.id, 'nombre', e.target.value)}
                    onFocus={() => setEditingId(ing.id)}
                    onBlur={() => setEditingId(null)}
                    className={`w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 outline-none bg-white/80 ${
                      editingId === ing.id
                        ? 'border-green-500 ring-4 ring-green-100'
                        : 'border-transparent hover:border-green-300'
                    }`}
                  />
                </div>

                {/* Cantidad */}
                <div className="w-24">
                  <input
                    type="number"
                    value={ing.cantidad}
                    onChange={(e) => handleUpdate(ing.id, 'cantidad', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border-2 border-transparent hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80"
                    step="0.1"
                    min="0"
                  />
                </div>

                {/* Unidad */}
                <div className="w-32">
                  <select
                    value={ing.unidad}
                    onChange={(e) => handleUpdate(ing.id, 'unidad', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border-2 border-transparent hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80"
                  >
                    <option>taza</option>
                    <option>unidad</option>
                    <option>unidades</option>
                    <option>cucharadas</option>
                    <option>pizca</option>
                    <option>gramos</option>
                    <option>ml</option>
                  </select>
                </div>

                {/* Calorías */}
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">{ing.calorias || 0}</span>
                  <span className="text-xs">kcal</span>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => sugerirSustitucion(ing)}
                    className="p-2 rounded-lg bg-white/80 hover:bg-indigo-50 border border-indigo-200 transition-all duration-300"
                    title="Sugerir sustitución"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </button>
                  <button
                    onClick={() => handleRemove(ing.id)}
                    className="p-2 rounded-lg bg-white/80 hover:bg-red-50 border border-red-200 transition-all duration-300"
                    title="Eliminar"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Info nutricional expandida en mobile */}
              <div className="md:hidden mt-3 pt-3 border-t border-green-200 flex justify-between text-xs text-gray-600">
                <span>Cal: {ing.calorias || 0} kcal</span>
                <span>Prot: {ing.proteinas || 0}g</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón agregar */}
        <motion.button
          onClick={handleAdd}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full p-4 rounded-xl border-2 border-dashed border-green-300 hover:border-green-500 hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 text-green-700 font-semibold"
        >
          <Plus className="w-5 h-5" />
          Agregar Ingrediente
        </motion.button>

        {/* Resumen nutricional */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Resumen Nutricional Total</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Calorías Totales</p>
              <p className="text-2xl font-bold text-gray-900">{calcularCaloriasTotales(ingredientes)}</p>
              <p className="text-xs text-gray-500">kcal</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Proteínas Totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {ingredientes.reduce((sum, ing) => sum + (ing.proteinas || 0), 0)}
              </p>
              <p className="text-xs text-gray-500">gramos</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IngredientesManager;
