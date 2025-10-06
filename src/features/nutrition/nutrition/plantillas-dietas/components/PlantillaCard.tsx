
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, User, Flame, Activity, Coffee, Sun, Moon, Users } from 'lucide-react';
import { PlantillaDieta } from '../PlantillasDietasPage';

interface PlantillaCardProps {
  plantilla: PlantillaDieta;
  onSelectPlantilla: (plantilla: PlantillaDieta) => void;
}

const PlantillaCard: React.FC<PlantillaCardProps> = ({ plantilla, onSelectPlantilla }) => {
  // Mapeo de objetivos a colores y etiquetas
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

  // Mapeo de tipos de dieta
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onSelectPlantilla(plantilla)}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group cursor-pointer"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className={`absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br ${objective.color} opacity-5 rounded-full blur-3xl`}></div>

      <div className="relative z-10 p-6">
        {/* Header: Avatar + Favorito */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl shadow-lg">
              {plantilla.author.avatar}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Creado por</p>
              <p className="text-sm font-bold text-gray-700">{plantilla.author.name}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Toggle favorito
            }}
            className={`p-2 rounded-xl ${plantilla.is_favorite ? 'bg-red-50' : 'bg-gray-50'} hover:bg-red-100 transition-colors`}
          >
            <Heart className={`w-5 h-5 ${plantilla.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </motion.button>
        </div>

        {/* Nombre de la plantilla */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {plantilla.name}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {plantilla.description}
        </p>

        {/* Badges: Objetivo + Tipo Dieta */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 ${objective.bg} ${objective.text} text-xs font-bold rounded-full`}>
            {objective.label}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full flex items-center gap-1">
            <span>{dietType.icon}</span>
            {dietType.label}
          </span>
        </div>

        {/* Calorías destacadas */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium">Calorías diarias</p>
            <p className="text-lg font-bold text-gray-900">{plantilla.calories} <span className="text-sm text-gray-600">kcal</span></p>
          </div>
        </div>

        {/* Mini gráfico de macros */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-600">Distribución de Macros</p>
          </div>
          <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-blue-500" style={{ width: `${proteinPercent}%` }} title="Proteínas"></div>
            <div className="bg-yellow-500" style={{ width: `${carbsPercent}%` }} title="Carbohidratos"></div>
            <div className="bg-red-500" style={{ width: `${fatPercent}%` }} title="Grasas"></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-gray-600">P: {plantilla.macros.protein}g</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-600">C: {plantilla.macros.carbs}g</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-gray-600">G: {plantilla.macros.fat}g</span>
            </span>
          </div>
        </div>

        {/* Preview de comidas principales (iconos) */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-2xl">
          <Coffee className="w-4 h-4 text-gray-500" title="Desayuno" />
          <Sun className="w-4 h-4 text-gray-500" title="Almuerzo" />
          <Moon className="w-4 h-4 text-gray-500" title="Cena" />
          <span className="text-xs text-gray-600 ml-auto font-medium">{plantilla.duration_weeks} semanas</span>
        </div>

        {/* Footer: Rating + Usos */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-gray-700">{plantilla.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({plantilla.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold">{plantilla.uses.toLocaleString()}</span>
            <span className="text-xs text-gray-500">usos</span>
          </div>
        </div>

        {/* Botón Usar plantilla */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPlantilla(plantilla);
          }}
          className={`w-full mt-4 py-3 px-4 bg-gradient-to-r ${objective.color} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          Ver Plantilla
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PlantillaCard;
