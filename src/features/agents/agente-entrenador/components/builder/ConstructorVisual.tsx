import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Search, Filter, GripVertical,
  Trash2, Sparkles
} from 'lucide-react';
import { agenteEntrenadorApi, Exercise } from '../../agenteEntrenadorApi';

interface DayExercises {
  day: string;
  dayLetter: string;
  exercises: Exercise[];
}

const ConstructorVisual: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [weekSchedule, setWeekSchedule] = useState<DayExercises[]>([
    { day: 'Lunes', dayLetter: 'L', exercises: [] },
    { day: 'Martes', dayLetter: 'M', exercises: [] },
    { day: 'Miércoles', dayLetter: 'X', exercises: [] },
    { day: 'Jueves', dayLetter: 'J', exercises: [] },
    { day: 'Viernes', dayLetter: 'V', exercises: [] },
    { day: 'Sábado', dayLetter: 'S', exercises: [] },
    { day: 'Domingo', dayLetter: 'D', exercises: [] },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const exercisesData = agenteEntrenadorApi.getExercises();
      setExercises(exercisesData);
      setIsLoading(false);
    }, 300);
  }, []);

  const handleDragStart = (e: React.DragEvent, exercise: Exercise) => {
    e.dataTransfer.setData('application/json', JSON.stringify(exercise));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dayIndex: number) => {
    e.preventDefault();
    const droppedExercise: Exercise = JSON.parse(e.dataTransfer.getData('application/json'));

    setWeekSchedule((prevSchedule) =>
      prevSchedule.map((dayData, index) =>
        index === dayIndex
          ? { ...dayData, exercises: [...dayData.exercises, droppedExercise] }
          : dayData
      )
    );
  };

  const removeExercise = (dayIndex: number, exerciseId: string) => {
    setWeekSchedule((prevSchedule) =>
      prevSchedule.map((dayData, index) =>
        index === dayIndex
          ? { ...dayData, exercises: dayData.exercises.filter(ex => ex.id !== exerciseId) }
          : dayData
      )
    );
  };

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || ex.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categoryColors: Record<string, string> = {
    fuerza: 'from-orange-500 to-red-500',
    cardio: 'from-blue-500 to-cyan-500',
    movilidad: 'from-green-500 to-teal-500',
    correctivo: 'from-purple-500 to-pink-500'
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="flex items-center justify-center h-40">
          <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
          <span className="ml-3 text-gray-600">Cargando constructor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calendar className="w-6 h-6" />
          </div>
          Constructor Visual - Timeline Semanal
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de Ejercicios */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar ejercicio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Filtrar por categoría</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    categoryFilter === 'all'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setCategoryFilter('fuerza')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    categoryFilter === 'fuerza'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Fuerza
                </button>
                <button
                  onClick={() => setCategoryFilter('cardio')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    categoryFilter === 'cardio'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Cardio
                </button>
                <button
                  onClick={() => setCategoryFilter('movilidad')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    categoryFilter === 'movilidad'
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Movilidad
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {filteredExercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, exercise)}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-gradient-to-r ${categoryColors[exercise.category] || 'from-gray-500 to-gray-600'} text-white px-3 py-2 rounded-xl cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center gap-2">
                    <GripVertical className="w-4 h-4 opacity-70" />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{exercise.name}</p>
                      <p className="text-xs opacity-80">{exercise.muscleGroup}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline Semanal */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-7 gap-3">
              {weekSchedule.map((dayData, dayIndex) => (
                <div key={dayIndex} className="flex flex-col">
                  {/* Día header */}
                  <div className="text-center mb-2">
                    <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg mb-1">
                      {dayData.dayLetter}
                    </div>
                    <p className="text-xs font-semibold text-gray-600">{dayData.day}</p>
                  </div>

                  {/* Drop zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, dayIndex)}
                    className={`flex-1 border-2 border-dashed rounded-2xl p-2 min-h-[400px] transition-all duration-300 ${
                      dayData.exercises.length > 0
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-300 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/30'
                    }`}
                  >
                    <div className="space-y-2">
                      {dayData.exercises.map((exercise, exIndex) => (
                        <motion.div
                          key={`${exercise.id}-${exIndex}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white rounded-lg p-2 shadow-md border border-gray-200 group relative"
                        >
                          <button
                            onClick={() => removeExercise(dayIndex, exercise.id)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                          >
                            <Trash2 className="w-3 h-3 text-white" />
                          </button>
                          <p className="text-xs font-bold text-gray-800 truncate">{exercise.name}</p>
                          <div className={`w-full h-1 mt-1 rounded-full bg-gradient-to-r ${categoryColors[exercise.category]}`}></div>
                        </motion.div>
                      ))}
                      {dayData.exercises.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-xs text-gray-400 text-center">
                            Arrastra ejercicios aquí
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructorVisual;
