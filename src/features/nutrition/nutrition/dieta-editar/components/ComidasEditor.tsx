import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, X, Copy, GripVertical, RefreshCw, Calendar } from 'lucide-react';
import { Diet, Meal, Recipe, dietaEditarApi } from '../dietaEditarApi';
import { v4 as uuidv4 } from 'uuid';

interface ComidasEditorProps {
  diet: Diet;
  onDietChange: (diet: Diet) => void;
}

const DAYS_OF_WEEK = [
  { id: 'lunes', label: 'Lunes', color: 'from-blue-500 to-indigo-600' },
  { id: 'martes', label: 'Martes', color: 'from-purple-500 to-pink-600' },
  { id: 'miercoles', label: 'Miércoles', color: 'from-green-500 to-emerald-600' },
  { id: 'jueves', label: 'Jueves', color: 'from-yellow-500 to-orange-600' },
  { id: 'viernes', label: 'Viernes', color: 'from-red-500 to-pink-600' },
  { id: 'sabado', label: 'Sábado', color: 'from-indigo-500 to-purple-600' },
  { id: 'domingo', label: 'Domingo', color: 'from-orange-500 to-red-600' },
];

const ComidasEditor: React.FC<ComidasEditorProps> = ({ diet, onDietChange }) => {
  const [editedMeals, setEditedMeals] = useState<Meal[]>(diet.meals);
  const [newMealName, setNewMealName] = useState<string>('');
  const [substitutingRecipeId, setSubstitutingRecipeId] = useState<string | null>(null);
  const [targetMacros, setTargetMacros] = useState<{ protein: number; carbs: number; fats: number; calories: number } | null>(null);
  const [expandedDays, setExpandedDays] = useState<{ [key: string]: boolean }>({ lunes: true });

  const handleMealNameChange = (mealId: string, newName: string) => {
    setEditedMeals(editedMeals.map(meal =>
      meal.id === mealId ? { ...meal, name: newName } : meal
    ));
  };

  const handleRecipeQuantityChange = (mealId: string, recipeId: string, newQuantity: string) => {
    setEditedMeals(editedMeals.map(meal =>
      meal.id === mealId
        ? { ...meal, recipes: meal.recipes.map(recipe =>
            recipe.id === recipeId ? { ...recipe, quantity: newQuantity } : recipe
          ) }
        : meal
    ));
  };

  const handleAddMeal = () => {
    if (newMealName.trim()) {
      const newMeal: Meal = { id: uuidv4(), name: newMealName.trim(), recipes: [] };
      setEditedMeals([...editedMeals, newMeal]);
      setNewMealName('');
    }
  };

  const handleRemoveMeal = (mealId: string) => {
    setEditedMeals(editedMeals.filter(meal => meal.id !== mealId));
  };

  const handleAddRecipe = (mealId: string) => {
    const newRecipe: Recipe = { id: uuidv4(), name: 'Nueva Receta', quantity: '0g' };
    setEditedMeals(editedMeals.map(meal =>
      meal.id === mealId ? { ...meal, recipes: [...meal.recipes, newRecipe] } : meal
    ));
  };

  const handleRemoveRecipe = (mealId: string, recipeId: string) => {
    setEditedMeals(editedMeals.map(meal =>
      meal.id === mealId ? { ...meal, recipes: meal.recipes.filter(rec => rec.id !== recipeId) } : meal
    ));
  };

  const handleSubstituteFood = (mealId: string, recipe: Recipe) => {
    setSubstitutingRecipeId(recipe.id);
    // For mock, let's assume target macros are the current recipe's macros
    setTargetMacros(recipe.macros || { protein: 0, carbs: 0, fats: 0, calories: 0 });
  };

  const confirmSubstitute = async () => {
    if (substitutingRecipeId && targetMacros) {
      const mealIndex = editedMeals.findIndex(meal => meal.recipes.some(rec => rec.id === substitutingRecipeId));
      if (mealIndex !== -1) {
        const recipeToSubstitute = editedMeals[mealIndex].recipes.find(rec => rec.id === substitutingRecipeId);
        if (recipeToSubstitute) {
          const substitutedRecipe = await dietaEditarApi.substituteFood(recipeToSubstitute, targetMacros);
          setEditedMeals(editedMeals.map(meal =>
            meal.id === editedMeals[mealIndex].id
              ? { ...meal, recipes: meal.recipes.map(rec =>
                  rec.id === substitutingRecipeId ? substitutedRecipe : rec
                ) }
              : meal
          ));
        }
      }
    }
    setSubstitutingRecipeId(null);
    setTargetMacros(null);
  };

  const toggleDay = (dayId: string) => {
    setExpandedDays({ ...expandedDays, [dayId]: !expandedDays[dayId] });
  };

  const copyDayToOthers = (fromDay: string) => {
    alert(`Copiar comidas de ${fromDay} a otros días (funcionalidad mock)`);
  };

  const calculateMealMacros = (meal: Meal) => {
    let total = { protein: 0, carbs: 0, fats: 0, calories: 0 };
    meal.recipes.forEach(recipe => {
      if (recipe.macros) {
        total.protein += recipe.macros.protein;
        total.carbs += recipe.macros.carbs;
        total.fats += recipe.macros.fats;
        total.calories += recipe.macros.calories;
      }
    });
    return total;
  };

  const handleSave = () => {
    onDietChange({ ...diet, meals: editedMeals });
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Editor de Comidas por Día</h2>
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white font-semibold hover:bg-white/30 transition-all duration-300"
            >
              Guardar Todo
            </button>
          </div>
        </div>

        {/* Accordion por día de la semana */}
        <div className="space-y-4">
          {DAYS_OF_WEEK.map((day, dayIndex) => {
            const isExpanded = expandedDays[day.id];
            const dayMeals = editedMeals.slice(0, 3); // Mock: usar las mismas comidas para cada día

            return (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.05, duration: 0.4 }}
                className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
              >
                {/* Header del día */}
                <button
                  onClick={() => toggleDay(day.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${day.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                      {day.label.charAt(0)}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-800">{day.label}</h3>
                      <p className="text-sm text-gray-600">{dayMeals.length} comidas configuradas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); copyDayToOthers(day.label); }}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-300"
                      title="Copiar a otros días"
                    >
                      <Copy className="w-5 h-5 text-blue-600" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </button>

                {/* Contenido del día (expandible) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-4 space-y-4">
                        {dayMeals.map((meal, mealIndex) => {
                          const mealMacros = calculateMealMacros(meal);

                          return (
                            <div
                              key={meal.id}
                              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
                            >
                              {/* Header de comida */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3 flex-1">
                                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                                  <input
                                    type="text"
                                    className="text-lg font-bold text-gray-800 bg-transparent border-b-2 border-transparent hover:border-orange-300 focus:border-orange-500 focus:outline-none transition-colors duration-300 flex-1"
                                    value={meal.name}
                                    onChange={(e) => handleMealNameChange(meal.id, e.target.value)}
                                  />
                                </div>
                                <button
                                  onClick={() => handleRemoveMeal(meal.id)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-300"
                                >
                                  <X className="w-5 h-5 text-red-600" />
                                </button>
                              </div>

                              {/* Macros de la comida */}
                              <div className="grid grid-cols-4 gap-2 mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg text-center">
                                  <p className="text-xs text-blue-600 font-semibold">Proteínas</p>
                                  <p className="text-sm font-bold text-blue-700">{mealMacros.protein}g</p>
                                </div>
                                <div className="p-2 bg-green-50 rounded-lg text-center">
                                  <p className="text-xs text-green-600 font-semibold">Carbos</p>
                                  <p className="text-sm font-bold text-green-700">{mealMacros.carbs}g</p>
                                </div>
                                <div className="p-2 bg-purple-50 rounded-lg text-center">
                                  <p className="text-xs text-purple-600 font-semibold">Grasas</p>
                                  <p className="text-sm font-bold text-purple-700">{mealMacros.fats}g</p>
                                </div>
                                <div className="p-2 bg-orange-50 rounded-lg text-center">
                                  <p className="text-xs text-orange-600 font-semibold">Calorías</p>
                                  <p className="text-sm font-bold text-orange-700">{mealMacros.calories}</p>
                                </div>
                              </div>

                              {/* Lista de recetas/alimentos */}
                              <div className="space-y-2">
                                {meal.recipes.map((recipe, recipeIndex) => (
                                  <div
                                    key={recipe.id}
                                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                                  >
                                    <span className="text-xs text-gray-500 font-bold w-6">{recipeIndex + 1}</span>
                                    <input
                                      type="text"
                                      className="flex-1 px-2 py-1 text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-orange-500 focus:outline-none"
                                      value={recipe.name}
                                      onChange={(e) => {
                                        const updated = editedMeals.map(m =>
                                          m.id === meal.id
                                            ? { ...m, recipes: m.recipes.map(r => r.id === recipe.id ? { ...r, name: e.target.value } : r) }
                                            : m
                                        );
                                        setEditedMeals(updated);
                                      }}
                                    />
                                    <input
                                      type="text"
                                      className="w-20 px-2 py-1 text-sm text-center bg-white border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                      value={recipe.quantity}
                                      onChange={(e) => handleRecipeQuantityChange(meal.id, recipe.id, e.target.value)}
                                    />
                                    <button
                                      onClick={() => handleSubstituteFood(meal.id, recipe)}
                                      className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors duration-300"
                                      title="Sustituir alimento"
                                    >
                                      <RefreshCw className="w-4 h-4 text-blue-600" />
                                    </button>
                                    <button
                                      onClick={() => handleRemoveRecipe(meal.id, recipe.id)}
                                      className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-300"
                                    >
                                      <X className="w-4 h-4 text-red-600" />
                                    </button>
                                  </div>
                                ))}

                                <button
                                  onClick={() => handleAddRecipe(meal.id)}
                                  className="w-full mt-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                  <Plus className="w-4 h-4" />
                                  Añadir Alimento
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        {/* Añadir nueva comida al día */}
                        <button
                          onClick={() => {
                            const newMeal: Meal = { id: uuidv4(), name: 'Nueva Comida', recipes: [] };
                            setEditedMeals([...editedMeals, newMeal]);
                          }}
                          className="w-full px-4 py-3 border-2 border-dashed border-orange-300 rounded-xl text-sm font-bold text-orange-600 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Plus className="w-5 h-5" />
                          Añadir Comida a {day.label}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal de sustitución */}
      <AnimatePresence>
        {substitutingRecipeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center z-50"
            onClick={() => { setSubstitutingRecipeId(null); setTargetMacros(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 max-w-md w-full mx-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Sustituir Alimento</h3>
              </div>

              <p className="text-gray-700 mb-6">
                Se buscará un alimento alternativo con macros similares.
              </p>

              {targetMacros && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <p className="text-sm font-bold text-blue-700 mb-2">Macros objetivo:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-blue-600">Proteínas:</span> <span className="font-bold">{targetMacros.protein}g</span></div>
                    <div><span className="text-blue-600">Carbos:</span> <span className="font-bold">{targetMacros.carbs}g</span></div>
                    <div><span className="text-blue-600">Grasas:</span> <span className="font-bold">{targetMacros.fats}g</span></div>
                    <div><span className="text-blue-600">Calorías:</span> <span className="font-bold">{targetMacros.calories}</span></div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => { setSubstitutingRecipeId(null); setTargetMacros(null); }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmSubstitute}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-bold hover:shadow-lg transition-all duration-300"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComidasEditor;
