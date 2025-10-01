import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Receta, NutritionalValues } from '../recetasBibliotecaApi';
import {
  X,
  Clock,
  ChefHat,
  Users,
  Heart,
  Star,
  Flame,
  Plus,
  Minus,
  Share2,
  Printer,
  Edit3,
  Check,
  ListChecks,
  Lightbulb,
} from 'lucide-react';

interface RecetaViewerProps {
  receta: Receta;
  onClose: () => void;
}

export const RecetaViewer: React.FC<RecetaViewerProps> = ({ receta, onClose }) => {
  const [portions, setPortions] = useState(receta.portions);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [isFavorite, setIsFavorite] = useState(receta.isFavorite);

  const calculateNutritionalValues = (original: NutritionalValues, currentPortions: number) => {
    const factor = currentPortions / receta.portions;
    return {
      calories: Math.round(original.calories * factor),
      protein: Math.round(original.protein * factor),
      carbs: Math.round(original.carbs * factor),
      fat: Math.round(original.fat * factor),
    };
  };

  const displayedNutritionalValues = calculateNutritionalValues(receta.nutritionalValues, portions);

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const totalMacros = displayedNutritionalValues.protein + displayedNutritionalValues.carbs + displayedNutritionalValues.fat;
  const proteinPercentage = (displayedNutritionalValues.protein / totalMacros) * 100;
  const carbsPercentage = (displayedNutritionalValues.carbs / totalMacros) * 100;
  const fatPercentage = (displayedNutritionalValues.fat / totalMacros) * 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto my-8"
        >
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden rounded-t-3xl">
            {receta.photoUrl && (
              <img src={receta.photoUrl} alt={receta.name} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-300 z-10"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            {/* Info sobre la imagen */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < receta.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`}
                  />
                ))}
                <span className="text-2xl font-bold ml-2">{receta.rating}.0</span>
              </div>
              <h2 className="text-5xl font-bold mb-4">{receta.name}</h2>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{receta.prepTime + receta.cookTime} min</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{receta.portions} porción{receta.portions > 1 ? 'es' : ''}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                  <ChefHat className="w-5 h-5" />
                  <span className="font-semibold">{receta.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8">
            {/* Botones de acción */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                  isFavorite
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Favorito' : 'Agregar a Favoritos'}
              </motion.button>

              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-5 h-5" />
                Agregar a Dieta
              </button>

              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300">
                <Edit3 className="w-5 h-5" />
              </button>

              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>

              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300">
                <Printer className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda: Ingredientes */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 border border-pink-100 sticky top-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <ListChecks className="w-6 h-6 text-pink-600" />
                      Ingredientes
                    </h3>
                  </div>

                  {/* Ajustar porciones */}
                  <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Ajustar Porciones</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setPortions(Math.max(1, portions - 1))}
                        className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-xl flex items-center justify-center text-pink-700 transition-colors duration-300"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <div className="flex-1 text-center">
                        <p className="text-3xl font-bold text-gray-800">{portions}</p>
                        <p className="text-xs text-gray-500">porcion{portions > 1 ? 'es' : ''}</p>
                      </div>
                      <button
                        onClick={() => setPortions(portions + 1)}
                        className="w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-xl flex items-center justify-center text-pink-700 transition-colors duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Lista de ingredientes */}
                  <div className="space-y-2">
                    {receta.ingredients.map((ingredient, index) => (
                      <button
                        key={index}
                        onClick={() => toggleIngredient(index)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                          checkedIngredients.has(index)
                            ? 'bg-pink-100 text-gray-500 line-through'
                            : 'bg-white hover:bg-pink-50 text-gray-800'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          checkedIngredients.has(index)
                            ? 'border-pink-600 bg-pink-600'
                            : 'border-gray-300'
                        }`}>
                          {checkedIngredients.has(index) && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-medium">{ingredient}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Columna derecha: Preparación y Nutrición */}
              <div className="lg:col-span-2 space-y-8">
                {/* Información Nutricional */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Flame className="w-6 h-6 text-orange-600" />
                    Información Nutricional
                    <span className="text-sm font-normal text-gray-500 ml-2">por {portions} porción{portions > 1 ? 'es' : ''}</span>
                  </h3>

                  {/* Calorías destacadas */}
                  <div className="text-center mb-6 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Calorías Totales</p>
                    <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                      {displayedNutritionalValues.calories}
                    </p>
                    <p className="text-gray-500 font-medium">kcal</p>
                  </div>

                  {/* Macros con progress bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">Proteínas</span>
                        <span className="text-xl font-bold text-blue-700">{displayedNutritionalValues.protein}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${proteinPercentage}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">Carbohidratos</span>
                        <span className="text-xl font-bold text-orange-700">{displayedNutritionalValues.carbs}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${carbsPercentage}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">Grasas</span>
                        <span className="text-xl font-bold text-green-700">{displayedNutritionalValues.fat}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${fatPercentage}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pasos de preparación */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <ChefHat className="w-6 h-6 text-pink-600" />
                    Preparación
                  </h3>

                  <div className="space-y-4">
                    {receta.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Etiquetas y Notas */}
                {(receta.restrictions.length > 0 || receta.personalNotes) && (
                  <div className="space-y-6">
                    {receta.restrictions.length > 0 && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-100">
                        <h4 className="font-bold text-gray-800 mb-3">Restricciones Alimentarias</h4>
                        <div className="flex flex-wrap gap-2">
                          {receta.restrictions.map((restriction) => (
                            <span
                              key={restriction}
                              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-full shadow-md"
                            >
                              {restriction}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {receta.personalNotes && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-blue-600" />
                          Notas del Chef
                        </h4>
                        <p className="text-gray-700 italic leading-relaxed">{receta.personalNotes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
