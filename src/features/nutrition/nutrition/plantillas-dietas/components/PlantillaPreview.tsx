
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, Share2, Copy, Star, Users, Flame, ChevronDown, ChevronUp,
  Coffee, Sun, Moon, Apple, Clock, ChefHat, AlertCircle, Play
} from 'lucide-react';
import { PlantillaDieta } from '../PlantillasDietasPage';

interface PlantillaPreviewProps {
  plantilla: PlantillaDieta;
  onClose: () => void;
}

const PlantillaPreview: React.FC<PlantillaPreviewProps> = ({ plantilla, onClose }) => {
  const [expandedDay, setExpandedDay] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<'estructura' | 'nutricion' | 'estadisticas'>('estructura');

  // Mapeo de objetivos
  const objectiveConfig = {
    perdida_peso: { label: 'Pérdida de Peso', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-700' },
    ganancia_muscular: { label: 'Ganancia Muscular', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', text: 'text-green-700' },
    mantenimiento: { label: 'Mantenimiento', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    definicion: { label: 'Definición', color: 'from-red-500 to-pink-500', bg: 'bg-red-50', text: 'text-red-700' },
    volumen_limpio: { label: 'Volumen Limpio', color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50', text: 'text-purple-700' },
    rendimiento: { label: 'Rendimiento', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50', text: 'text-orange-700' },
    salud_general: { label: 'Salud General', color: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50', text: 'text-teal-700' },
    recomposicion: { label: 'Recomposición', color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-50', text: 'text-indigo-700' },
  };

  const dietTypeConfig = {
    mediterranea: { label: 'Mediterránea', icon: '🫒' },
    keto: { label: 'Keto', icon: '🥑' },
    vegana: { label: 'Vegana', icon: '🌱' },
    vegetariana: { label: 'Vegetariana', icon: '🥕' },
    paleo: { label: 'Paleo', icon: '🦴' },
    flexible: { label: 'Flexible', icon: '⚖️' },
    intermitente: { label: 'Ayuno Intermitente', icon: '⏰' },
    baja_carbos: { label: 'Baja en Carbos', icon: '🍖' },
    alta_proteina: { label: 'Alta Proteína', icon: '💪' },
  };

  const objective = objectiveConfig[plantilla.objective];
  const dietType = dietTypeConfig[plantilla.dietType];

  // Calcular porcentajes de macros
  const totalMacros = plantilla.macros.protein * 4 + plantilla.macros.carbs * 4 + plantilla.macros.fat * 9;
  const proteinPercent = Math.round((plantilla.macros.protein * 4 / totalMacros) * 100);
  const carbsPercent = Math.round((plantilla.macros.carbs * 4 / totalMacros) * 100);
  const fatPercent = Math.round((plantilla.macros.fat * 9 / totalMacros) * 100);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className={`relative overflow-hidden bg-gradient-to-r ${objective.color} p-8`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shadow-xl">
                    {plantilla.author.avatar}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{plantilla.name}</h2>
                    <p className="text-emerald-100 text-sm">Por {plantilla.author.name}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <p className="text-white/90 text-lg mb-4">{plantilla.description}</p>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span className="text-white font-bold">{plantilla.rating}</span>
                  <span className="text-white/80 text-sm">({plantilla.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-white font-bold">{plantilla.uses.toLocaleString()} usos</span>
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
                  <span className="text-white font-bold">{dietType.icon} {dietType.label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navegación de secciones */}
          <div className="flex border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm px-8">
            {[
              { id: 'estructura', label: 'Estructura del Plan', icon: Coffee },
              { id: 'nutricion', label: 'Información Nutricional', icon: Flame },
              { id: 'estadisticas', label: 'Estadísticas', icon: Star },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${
                  activeSection === section.id
                    ? 'text-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="hidden md:inline">{section.label}</span>
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* SECCIÓN: Estructura del Plan */}
            {activeSection === 'estructura' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Plan Semanal de Comidas</h3>
                {plantilla.weekly_menu.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedDay(expandedDay === index ? -1 : index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${objective.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg font-bold text-gray-900">Día {index + 1}</h4>
                          <p className="text-sm text-gray-600">
                            {day.breakfast.calories + day.lunch.calories + day.dinner.calories + (day.snacks?.reduce((acc, s) => acc + s.calories, 0) || 0)} kcal totales
                          </p>
                        </div>
                      </div>
                      {expandedDay === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                      {expandedDay === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-200"
                        >
                          <div className="p-4 space-y-4">
                            {/* Desayuno */}
                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Coffee className="w-5 h-5 text-orange-600" />
                                <h5 className="font-bold text-gray-900">Desayuno</h5>
                                <span className="ml-auto text-sm font-bold text-orange-600">{day.breakfast.calories} kcal</span>
                              </div>
                              <p className="font-semibold text-gray-800">{day.breakfast.name}</p>
                              <p className="text-sm text-gray-600">{day.breakfast.description}</p>
                              <div className="flex gap-3 mt-2 text-xs">
                                <span className="text-blue-600 font-medium">P: {day.breakfast.macros.protein}g</span>
                                <span className="text-yellow-600 font-medium">C: {day.breakfast.macros.carbs}g</span>
                                <span className="text-red-600 font-medium">G: {day.breakfast.macros.fat}g</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs font-semibold text-gray-700 mb-1">Ingredientes:</p>
                                <div className="flex flex-wrap gap-1">
                                  {day.breakfast.foods.map((food, i) => (
                                    <span key={i} className="px-2 py-1 bg-white rounded-lg text-xs text-gray-700">{food}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Almuerzo */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Sun className="w-5 h-5 text-green-600" />
                                <h5 className="font-bold text-gray-900">Almuerzo</h5>
                                <span className="ml-auto text-sm font-bold text-green-600">{day.lunch.calories} kcal</span>
                              </div>
                              <p className="font-semibold text-gray-800">{day.lunch.name}</p>
                              <p className="text-sm text-gray-600">{day.lunch.description}</p>
                              <div className="flex gap-3 mt-2 text-xs">
                                <span className="text-blue-600 font-medium">P: {day.lunch.macros.protein}g</span>
                                <span className="text-yellow-600 font-medium">C: {day.lunch.macros.carbs}g</span>
                                <span className="text-red-600 font-medium">G: {day.lunch.macros.fat}g</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs font-semibold text-gray-700 mb-1">Ingredientes:</p>
                                <div className="flex flex-wrap gap-1">
                                  {day.lunch.foods.map((food, i) => (
                                    <span key={i} className="px-2 py-1 bg-white rounded-lg text-xs text-gray-700">{food}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Cena */}
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Moon className="w-5 h-5 text-purple-600" />
                                <h5 className="font-bold text-gray-900">Cena</h5>
                                <span className="ml-auto text-sm font-bold text-purple-600">{day.dinner.calories} kcal</span>
                              </div>
                              <p className="font-semibold text-gray-800">{day.dinner.name}</p>
                              <p className="text-sm text-gray-600">{day.dinner.description}</p>
                              <div className="flex gap-3 mt-2 text-xs">
                                <span className="text-blue-600 font-medium">P: {day.dinner.macros.protein}g</span>
                                <span className="text-yellow-600 font-medium">C: {day.dinner.macros.carbs}g</span>
                                <span className="text-red-600 font-medium">G: {day.dinner.macros.fat}g</span>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs font-semibold text-gray-700 mb-1">Ingredientes:</p>
                                <div className="flex flex-wrap gap-1">
                                  {day.dinner.foods.map((food, i) => (
                                    <span key={i} className="px-2 py-1 bg-white rounded-lg text-xs text-gray-700">{food}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Snacks (si existen) */}
                            {day.snacks && day.snacks.length > 0 && (
                              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Apple className="w-5 h-5 text-pink-600" />
                                  <h5 className="font-bold text-gray-900">Snacks</h5>
                                  <span className="ml-auto text-sm font-bold text-pink-600">{day.snacks[0].calories} kcal</span>
                                </div>
                                <p className="font-semibold text-gray-800">{day.snacks[0].name}</p>
                                <p className="text-sm text-gray-600">{day.snacks[0].description}</p>
                                <div className="flex gap-3 mt-2 text-xs">
                                  <span className="text-blue-600 font-medium">P: {day.snacks[0].macros.protein}g</span>
                                  <span className="text-yellow-600 font-medium">C: {day.snacks[0].macros.carbs}g</span>
                                  <span className="text-red-600 font-medium">G: {day.snacks[0].macros.fat}g</span>
                                </div>
                                <div className="mt-2">
                                  <p className="text-xs font-semibold text-gray-700 mb-1">Ingredientes:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {day.snacks[0].foods.map((food, i) => (
                                      <span key={i} className="px-2 py-1 bg-white rounded-lg text-xs text-gray-700">{food}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}

            {/* SECCIÓN: Información Nutricional */}
            {activeSection === 'nutricion' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Información Nutricional</h3>

                {/* Calorías */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <Flame className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Calorías Totales Diarias</h4>
                      <p className="text-3xl font-bold text-orange-600">{plantilla.calories} <span className="text-lg text-gray-600">kcal</span></p>
                    </div>
                  </div>
                </div>

                {/* Distribución de Macros */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Distribución de Macronutrientes</h4>

                  {/* Gráfico de barras */}
                  <div className="flex gap-2 h-8 rounded-full overflow-hidden mb-6">
                    <div className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: `${proteinPercent}%` }}>
                      {proteinPercent}%
                    </div>
                    <div className="bg-yellow-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: `${carbsPercent}%` }}>
                      {carbsPercent}%
                    </div>
                    <div className="bg-red-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: `${fatPercent}%` }}>
                      {fatPercent}%
                    </div>
                  </div>

                  {/* Detalles */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-blue-600 mb-1">Proteínas</p>
                      <p className="text-2xl font-bold text-blue-700">{plantilla.macros.protein}g</p>
                      <p className="text-xs text-blue-600">{proteinPercent}% del total</p>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-yellow-600 mb-1">Carbohidratos</p>
                      <p className="text-2xl font-bold text-yellow-700">{plantilla.macros.carbs}g</p>
                      <p className="text-xs text-yellow-600">{carbsPercent}% del total</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-red-600 mb-1">Grasas</p>
                      <p className="text-2xl font-bold text-red-700">{plantilla.macros.fat}g</p>
                      <p className="text-xs text-red-600">{fatPercent}% del total</p>
                    </div>
                  </div>
                </div>

                {/* Restricciones y Alergenos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-gray-900">Restricciones</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plantilla.restrictions.length > 0 ? (
                        plantilla.restrictions.map((restriction, i) => (
                          <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                            {restriction}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">Sin restricciones</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h4 className="font-bold text-gray-900">Alérgenos</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plantilla.allergens.length > 0 ? (
                        plantilla.allergens.map((allergen, i) => (
                          <span key={i} className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full">
                            {allergen}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">Sin alérgenos conocidos</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN: Estadísticas */}
            {activeSection === 'estadisticas' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Estadísticas y Valoraciones</h3>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <Star className="w-10 h-10 text-yellow-500 mb-3 fill-yellow-500" />
                    <p className="text-sm font-semibold text-gray-600 mb-1">Rating Promedio</p>
                    <p className="text-4xl font-bold text-gray-900">{plantilla.rating}</p>
                    <p className="text-sm text-gray-600">{plantilla.reviews} valoraciones</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <Users className="w-10 h-10 text-blue-500 mb-3" />
                    <p className="text-sm font-semibold text-gray-600 mb-1">Veces Usada</p>
                    <p className="text-4xl font-bold text-gray-900">{plantilla.uses.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">usuarios totales</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <Clock className="w-10 h-10 text-green-500 mb-3" />
                    <p className="text-sm font-semibold text-gray-600 mb-1">Duración</p>
                    <p className="text-4xl font-bold text-gray-900">{plantilla.duration_weeks}</p>
                    <p className="text-sm text-gray-600">semanas totales</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer con botones de acción */}
          <div className="border-t border-gray-200 p-6 bg-gray-50/80 backdrop-blur-sm flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-4 px-6 bg-gradient-to-r ${objective.color} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <Play className="w-5 h-5" />
              Usar Ahora
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-4 px-6 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Copy className="w-5 h-5" />
              Duplicar y Editar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                plantilla.is_favorite
                  ? 'bg-red-50 text-red-600 border-2 border-red-200'
                  : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${plantilla.is_favorite ? 'fill-red-500' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="py-4 px-6 bg-gray-100 text-gray-600 rounded-2xl border-2 border-gray-200 font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlantillaPreview;
