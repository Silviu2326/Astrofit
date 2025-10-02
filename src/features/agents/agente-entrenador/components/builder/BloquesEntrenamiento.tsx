import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Dumbbell, Heart, Snowflake,
  Clock, Target, Plus, Settings, GripVertical
} from 'lucide-react';

interface TrainingModule {
  id: string;
  type: 'warmup' | 'main' | 'auxiliary' | 'cooldown';
  name: string;
  duration: number; // en minutos
  intensity: 'baja' | 'media' | 'alta';
  exercises: string[];
}

const BloquesEntrenamiento: React.FC = () => {
  const [modules, setModules] = useState<TrainingModule[]>([
    {
      id: 'mod1',
      type: 'warmup',
      name: 'Calentamiento',
      duration: 10,
      intensity: 'baja',
      exercises: ['Movilidad articular', 'Activación muscular']
    },
    {
      id: 'mod2',
      type: 'main',
      name: 'Bloque Principal',
      duration: 40,
      intensity: 'alta',
      exercises: ['Sentadilla', 'Press Banca', 'Peso Muerto']
    },
    {
      id: 'mod3',
      type: 'auxiliary',
      name: 'Trabajo Auxiliar',
      duration: 15,
      intensity: 'media',
      exercises: ['Curl de Bíceps', 'Extensión de Tríceps']
    },
    {
      id: 'mod4',
      type: 'cooldown',
      name: 'Enfriamiento',
      duration: 10,
      intensity: 'baja',
      exercises: ['Estiramientos', 'Respiración']
    }
  ]);

  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const moduleConfig = {
    warmup: {
      icon: Flame,
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300'
    },
    main: {
      icon: Dumbbell,
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300'
    },
    auxiliary: {
      icon: Target,
      gradient: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300'
    },
    cooldown: {
      icon: Snowflake,
      gradient: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-300'
    }
  };

  const intensityColors = {
    baja: 'bg-green-500',
    media: 'bg-yellow-500',
    alta: 'bg-red-500'
  };

  const handleDragStart = (e: React.DragEvent, moduleId: string) => {
    e.dataTransfer.setData('moduleId', moduleId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const moduleId = e.dataTransfer.getData('moduleId');
    const sourceIndex = modules.findIndex(m => m.id === moduleId);

    if (sourceIndex !== -1 && sourceIndex !== targetIndex) {
      const newModules = [...modules];
      const [movedModule] = newModules.splice(sourceIndex, 1);
      newModules.splice(targetIndex, 0, movedModule);
      setModules(newModules);
    }
  };

  const updateDuration = (moduleId: string, duration: number) => {
    setModules(modules.map(m =>
      m.id === moduleId ? { ...m, duration } : m
    ));
  };

  const updateIntensity = (moduleId: string, intensity: 'baja' | 'media' | 'alta') => {
    setModules(modules.map(m =>
      m.id === moduleId ? { ...m, intensity } : m
    ));
  };

  const totalDuration = modules.reduce((sum, mod) => sum + mod.duration, 0);

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

        <div className="relative z-10 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Dumbbell className="w-6 h-6" />
            </div>
            Bloques de Entrenamiento
          </h3>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <Clock className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-semibold text-white">{totalDuration} min total</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Módulos arrastrables */}
        <div className="space-y-4 mb-6">
          {modules.map((module, index) => {
            const config = moduleConfig[module.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={module.id}
                draggable
                onDragStart={(e) => handleDragStart(e as any, module.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e as any, index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`${config.bgColor} rounded-2xl p-4 border-2 ${config.borderColor} cursor-move relative overflow-hidden group`}
              >
                {/* Decoración */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-2xl`}></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    {/* Icono y grip */}
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-800">{module.name}</h4>
                        <div className={`px-3 py-1 ${intensityColors[module.intensity]} text-white text-xs font-bold rounded-full`}>
                          {module.intensity.toUpperCase()}
                        </div>
                      </div>

                      {/* Ejercicios */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {module.exercises.map((ex, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">
                            {ex}
                          </span>
                        ))}
                      </div>

                      {/* Controles */}
                      {selectedModule === module.id ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 p-3 bg-white rounded-xl border border-gray-200"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {/* Duración */}
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                Duración (min)
                              </label>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateDuration(module.id, Math.max(5, module.duration - 5))}
                                  className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                                >
                                  -
                                </button>
                                <span className="flex-1 text-center font-bold text-gray-800">{module.duration}</span>
                                <button
                                  onClick={() => updateDuration(module.id, module.duration + 5)}
                                  className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Intensidad */}
                            <div>
                              <label className="text-xs font-semibold text-gray-600 mb-1 block">
                                Intensidad
                              </label>
                              <select
                                value={module.intensity}
                                onChange={(e) => updateIntensity(module.id, e.target.value as any)}
                                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 outline-none text-sm font-medium"
                              >
                                <option value="baja">Baja</option>
                                <option value="media">Media</option>
                                <option value="alta">Alta</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{module.duration} min</span>
                          </div>
                          <button
                            onClick={() => setSelectedModule(module.id)}
                            className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold"
                          >
                            <Settings className="w-4 h-4" />
                            Configurar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline visual */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <h4 className="text-sm font-bold text-gray-700 mb-3">Timeline del Entrenamiento</h4>
          <div className="flex gap-1 h-8 rounded-full overflow-hidden">
            {modules.map((module) => {
              const config = moduleConfig[module.type];
              const widthPercent = (module.duration / totalDuration) * 100;

              return (
                <div
                  key={module.id}
                  className={`bg-gradient-to-r ${config.gradient} flex items-center justify-center relative group cursor-pointer`}
                  style={{ width: `${widthPercent}%` }}
                >
                  <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {module.duration}m
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloquesEntrenamiento;
