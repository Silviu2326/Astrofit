import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Flame, Plus, Coffee, Dumbbell, Book, Droplets, Moon, Apple, Clock } from 'lucide-react';
import { fetchHabits, updateHabitCompletion, Habit } from '../agenteBienestarApi';

const TableroHabitos: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const getHabits = async () => {
      const data = await fetchHabits();
      setHabits(data);
    };
    getHabits();
  }, []);

  const handleToggleCompletion = async (id: string, completed: boolean) => {
    const updatedHabits = await updateHabitCompletion(id, completed);
    setHabits(updatedHabits);
  };

  // Iconos por tipo de hábito
  const getHabitIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('agua') || lowerName.includes('hidrat')) return Droplets;
    if (lowerName.includes('ejercicio') || lowerName.includes('gym')) return Dumbbell;
    if (lowerName.includes('leer') || lowerName.includes('libro')) return Book;
    if (lowerName.includes('dormir') || lowerName.includes('sueño')) return Moon;
    if (lowerName.includes('desayun') || lowerName.includes('comer')) return Apple;
    if (lowerName.includes('medit') || lowerName.includes('yoga')) return Coffee;
    return Circle;
  };

  // Mock data para heatmap (últimos 30 días)
  const generateHeatmapData = () => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const adherence = Math.floor(Math.random() * 100);
      days.push({
        date: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
        adherence,
        color: adherence >= 85 ? 'bg-green-500' : adherence >= 60 ? 'bg-yellow-500' : adherence >= 30 ? 'bg-orange-400' : 'bg-gray-300'
      });
    }
    return days;
  };

  const heatmapData = generateHeatmapData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Tablero de Hábitos</h3>
              <p className="text-sm text-gray-600">Rastrea tu progreso diario</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">Nuevo Hábito</span>
          </motion.button>
        </div>

        {/* Lista de Hábitos */}
        <div className="space-y-3 mb-8">
          {habits.map((habit, index) => {
            const Icon = getHabitIcon(habit.name);
            const streakDays = Math.floor(Math.random() * 15) + 1; // Mock streak

            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                  habit.completed
                    ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-300 shadow-md'
                    : 'bg-white/50 border-gray-200 hover:border-teal-200 hover:shadow-md'
                }`}
              >
                {/* Checkbox y contenido */}
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => handleToggleCompletion(habit.id, !habit.completed)}
                    className="flex-shrink-0"
                  >
                    {habit.completed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <div className="w-7 h-7 rounded-xl border-2 border-gray-300 group-hover:border-teal-400 transition-colors duration-300 flex items-center justify-center">
                        <Circle className="w-4 h-4 text-gray-400 group-hover:text-teal-400" />
                      </div>
                    )}
                  </button>

                  {/* Icono del hábito */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    habit.completed
                      ? 'bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Nombre y detalles */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-base md:text-lg font-semibold ${
                      habit.completed ? 'text-teal-900 line-through' : 'text-gray-900'
                    }`}>
                      {habit.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{['8:00 AM', '12:00 PM', '6:00 PM', '10:00 PM'][index % 4]}</span>
                      </div>
                      {streakDays > 3 && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 rounded-full">
                          <Flame className="w-3 h-3 text-orange-600" />
                          <span className="text-xs font-bold text-orange-700">{streakDays} días</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progreso */}
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-gray-700">
                      {habit.current} / {habit.target}
                    </span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(habit.current / habit.target) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Heatmap Calendar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Calendario de Adherencia (últimos 30 días)</h4>
          <div className="grid grid-cols-10 md:grid-cols-15 lg:grid-cols-30 gap-1.5 md:gap-2">
            {heatmapData.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01, duration: 0.2 }}
                whileHover={{ scale: 1.2 }}
                className={`aspect-square rounded-lg ${day.color} cursor-pointer relative group`}
                title={`${day.date}: ${day.adherence}%`}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                  {day.date}: {day.adherence}%
                </div>
              </motion.div>
            ))}
          </div>

          {/* Leyenda */}
          <div className="flex items-center justify-end gap-4 mt-4 text-xs text-gray-600">
            <span>Menos</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-gray-300"></div>
              <div className="w-4 h-4 rounded bg-orange-400"></div>
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <div className="w-4 h-4 rounded bg-green-500"></div>
            </div>
            <span>Más</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TableroHabitos;
