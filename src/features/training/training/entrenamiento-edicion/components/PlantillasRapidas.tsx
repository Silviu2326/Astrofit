import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Target, Dumbbell, TrendingUp, Star, Copy, Check, Search } from 'lucide-react';

interface ExerciseConfig {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: number;
  tempo?: string;
  rpe?: number;
  weight?: number;
}

interface PlantillaPrograma {
  id: string;
  name: string;
  description: string;
  goal: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  daysPerWeek: number;
  duration: string;
  icon: string;
  color: string;
  popularity: number;
  sessions: {
    name: string;
    focus: string;
    exercises: ExerciseConfig[];
  }[];
}

interface PlantillasRapidasProps {
  onSelectTemplate: (template: PlantillaPrograma) => void;
  onClose: () => void;
}

const PLANTILLAS: PlantillaPrograma[] = [
  {
    id: 'ppl',
    name: 'Push/Pull/Legs',
    description: 'Rutina clásica dividida en 3 días: empuje, tirón y piernas',
    goal: 'Hipertrofia',
    level: 'intermediate',
    daysPerWeek: 6,
    duration: '8-12 semanas',
    icon: '💪',
    color: 'from-blue-500 to-cyan-500',
    popularity: 95,
    sessions: [
      {
        name: 'Push (Empuje)',
        focus: 'Pecho, Hombros, Tríceps',
        exercises: [
          { exerciseId: 'e2', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
          { exerciseId: 'e11', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
          { exerciseId: 'e4', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
          { exerciseId: 'e10', sets: 3, reps: '12-15', rest: 60, rpe: 7 },
          { exerciseId: 'e9', sets: 3, reps: '12-15', rest: 60, rpe: 7 },
        ]
      },
      {
        name: 'Pull (Tirón)',
        focus: 'Espalda, Bíceps',
        exercises: [
          { exerciseId: 'e3', sets: 4, reps: '6-8', rest: 150, rpe: 8 },
          { exerciseId: 'e5', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
          { exerciseId: 'e6', sets: 3, reps: '8-12', rest: 120, rpe: 7 },
          { exerciseId: 'e8', sets: 3, reps: '10-12', rest: 60, rpe: 7 },
        ]
      },
      {
        name: 'Legs (Piernas)',
        focus: 'Cuádriceps, Isquios, Glúteos',
        exercises: [
          { exerciseId: 'e1', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
          { exerciseId: 'e3', sets: 3, reps: '10-12', rest: 120, rpe: 8 },
          { exerciseId: 'e12', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
        ]
      }
    ]
  },
  {
    id: 'upper-lower',
    name: 'Upper/Lower Split',
    description: 'Dividido en tren superior e inferior, 4 días por semana',
    goal: 'Fuerza e Hipertrofia',
    level: 'beginner',
    daysPerWeek: 4,
    duration: '8-12 semanas',
    icon: '⚡',
    color: 'from-purple-500 to-pink-500',
    popularity: 88,
    sessions: [
      {
        name: 'Upper A (Superior)',
        focus: 'Pecho, Espalda, Hombros',
        exercises: [
          { exerciseId: 'e2', sets: 4, reps: '6-8', rest: 150, rpe: 8 },
          { exerciseId: 'e5', sets: 4, reps: '6-8', rest: 150, rpe: 8 },
          { exerciseId: 'e4', sets: 3, reps: '8-10', rest: 120, rpe: 7 },
          { exerciseId: 'e8', sets: 3, reps: '10-12', rest: 60, rpe: 7 },
        ]
      },
      {
        name: 'Lower A (Inferior)',
        focus: 'Piernas completo',
        exercises: [
          { exerciseId: 'e1', sets: 4, reps: '6-8', rest: 180, rpe: 8 },
          { exerciseId: 'e3', sets: 3, reps: '8-10', rest: 150, rpe: 8 },
          { exerciseId: 'e12', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
        ]
      },
      {
        name: 'Upper B (Superior)',
        focus: 'Variantes y accesorios',
        exercises: [
          { exerciseId: 'e11', sets: 4, reps: '8-10', rest: 120, rpe: 7 },
          { exerciseId: 'e6', sets: 4, reps: '8-10', rest: 120, rpe: 7 },
          { exerciseId: 'e10', sets: 3, reps: '12-15', rest: 60, rpe: 7 },
          { exerciseId: 'e9', sets: 3, reps: '12-15', rest: 60, rpe: 7 },
        ]
      },
      {
        name: 'Lower B (Inferior)',
        focus: 'Énfasis en isquios',
        exercises: [
          { exerciseId: 'e3', sets: 4, reps: '6-8', rest: 180, rpe: 8 },
          { exerciseId: 'e1', sets: 3, reps: '8-10', rest: 150, rpe: 7 },
          { exerciseId: 'e12', sets: 3, reps: '12-15', rest: 90, rpe: 7 },
        ]
      }
    ]
  },
  {
    id: 'full-body',
    name: 'Full Body 3x',
    description: 'Cuerpo completo 3 veces por semana, ideal para principiantes',
    goal: 'Fuerza General',
    level: 'beginner',
    daysPerWeek: 3,
    duration: '8-16 semanas',
    icon: '🔥',
    color: 'from-orange-500 to-red-500',
    popularity: 82,
    sessions: [
      {
        name: 'Full Body A',
        focus: 'Básicos principales',
        exercises: [
          { exerciseId: 'e1', sets: 3, reps: '8-10', rest: 150, rpe: 7 },
          { exerciseId: 'e2', sets: 3, reps: '8-10', rest: 150, rpe: 7 },
          { exerciseId: 'e5', sets: 3, reps: '8-10', rest: 120, rpe: 7 },
        ]
      },
      {
        name: 'Full Body B',
        focus: 'Variantes',
        exercises: [
          { exerciseId: 'e3', sets: 3, reps: '8-10', rest: 150, rpe: 7 },
          { exerciseId: 'e11', sets: 3, reps: '8-10', rest: 120, rpe: 7 },
          { exerciseId: 'e6', sets: 3, reps: '8-10', rest: 120, rpe: 7 },
        ]
      },
      {
        name: 'Full Body C',
        focus: 'Mixto',
        exercises: [
          { exerciseId: 'e1', sets: 3, reps: '10-12', rest: 120, rpe: 7 },
          { exerciseId: 'e4', sets: 3, reps: '8-10', rest: 120, rpe: 7 },
          { exerciseId: 'e3', sets: 3, reps: '8-10', rest: 150, rpe: 7 },
        ]
      }
    ]
  },
  {
    id: '531',
    name: '5/3/1 Wendler',
    description: 'Programa de fuerza progresiva con 4 levantamientos principales',
    goal: 'Fuerza Máxima',
    level: 'intermediate',
    daysPerWeek: 4,
    duration: '4 semanas (1 ciclo)',
    icon: '⚔️',
    color: 'from-red-600 to-orange-600',
    popularity: 90,
    sessions: [
      {
        name: 'Sentadilla 5/3/1',
        focus: 'Sentadilla + accesorios',
        exercises: [
          { exerciseId: 'e1', sets: 3, reps: '5/3/1', rest: 180, rpe: 9 },
          { exerciseId: 'e12', sets: 5, reps: '10', rest: 90, rpe: 7 },
        ]
      },
      {
        name: 'Press Banca 5/3/1',
        focus: 'Press Banca + accesorios',
        exercises: [
          { exerciseId: 'e2', sets: 3, reps: '5/3/1', rest: 180, rpe: 9 },
          { exerciseId: 'e7', sets: 5, reps: '10', rest: 90, rpe: 7 },
          { exerciseId: 'e9', sets: 5, reps: '12', rest: 60, rpe: 7 },
        ]
      },
      {
        name: 'Peso Muerto 5/3/1',
        focus: 'Peso Muerto + accesorios',
        exercises: [
          { exerciseId: 'e3', sets: 3, reps: '5/3/1', rest: 180, rpe: 9 },
          { exerciseId: 'e5', sets: 5, reps: '10', rest: 90, rpe: 7 },
        ]
      },
      {
        name: 'Press Militar 5/3/1',
        focus: 'Press Militar + accesorios',
        exercises: [
          { exerciseId: 'e4', sets: 3, reps: '5/3/1', rest: 180, rpe: 9 },
          { exerciseId: 'e10', sets: 5, reps: '12', rest: 60, rpe: 7 },
          { exerciseId: 'e8', sets: 5, reps: '12', rest: 60, rpe: 7 },
        ]
      }
    ]
  },
  {
    id: 'starting-strength',
    name: 'Starting Strength',
    description: 'Programa lineal clásico para principiantes en fuerza',
    goal: 'Fuerza Base',
    level: 'beginner',
    daysPerWeek: 3,
    duration: '12-24 semanas',
    icon: '🏋️',
    color: 'from-green-600 to-teal-600',
    popularity: 85,
    sessions: [
      {
        name: 'Día A',
        focus: 'Sentadilla, Press, Peso Muerto',
        exercises: [
          { exerciseId: 'e1', sets: 3, reps: '5', rest: 180, rpe: 8 },
          { exerciseId: 'e2', sets: 3, reps: '5', rest: 180, rpe: 8 },
          { exerciseId: 'e3', sets: 1, reps: '5', rest: 180, rpe: 8 },
        ]
      },
      {
        name: 'Día B',
        focus: 'Sentadilla, Press Militar, Power Clean',
        exercises: [
          { exerciseId: 'e1', sets: 3, reps: '5', rest: 180, rpe: 8 },
          { exerciseId: 'e4', sets: 3, reps: '5', rest: 180, rpe: 8 },
          { exerciseId: 'e5', sets: 5, reps: '3', rest: 150, rpe: 7 },
        ]
      }
    ]
  },
  {
    id: 'bro-split',
    name: 'Bro Split 5 días',
    description: 'Un grupo muscular por día, alto volumen',
    goal: 'Hipertrofia',
    level: 'intermediate',
    daysPerWeek: 5,
    duration: '8-12 semanas',
    icon: '💎',
    color: 'from-indigo-600 to-purple-600',
    popularity: 78,
    sessions: [
      {
        name: 'Día Pecho',
        focus: 'Pecho completo',
        exercises: [
          { exerciseId: 'e2', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
          { exerciseId: 'e11', sets: 4, reps: '10-12', rest: 90, rpe: 7 },
          { exerciseId: 'e7', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
        ]
      },
      {
        name: 'Día Espalda',
        focus: 'Espalda completa',
        exercises: [
          { exerciseId: 'e3', sets: 4, reps: '6-8', rest: 150, rpe: 8 },
          { exerciseId: 'e5', sets: 4, reps: '8-10', rest: 120, rpe: 7 },
          { exerciseId: 'e6', sets: 3, reps: '8-12', rest: 120, rpe: 7 },
        ]
      },
      {
        name: 'Día Hombros',
        focus: 'Hombros y trapecios',
        exercises: [
          { exerciseId: 'e4', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
          { exerciseId: 'e10', sets: 4, reps: '12-15', rest: 60, rpe: 7 },
        ]
      },
      {
        name: 'Día Brazos',
        focus: 'Bíceps y Tríceps',
        exercises: [
          { exerciseId: 'e8', sets: 4, reps: '10-12', rest: 60, rpe: 7 },
          { exerciseId: 'e9', sets: 4, reps: '10-12', rest: 60, rpe: 7 },
        ]
      },
      {
        name: 'Día Piernas',
        focus: 'Pierna completa',
        exercises: [
          { exerciseId: 'e1', sets: 4, reps: '8-10', rest: 150, rpe: 8 },
          { exerciseId: 'e3', sets: 3, reps: '10-12', rest: 120, rpe: 7 },
          { exerciseId: 'e12', sets: 3, reps: '12-15', rest: 90, rpe: 7 },
        ]
      }
    ]
  }
];

const PlantillasRapidas: React.FC<PlantillasRapidasProps> = ({ onSelectTemplate, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<PlantillaPrograma | null>(null);

  const filteredTemplates = PLANTILLAS.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || template.level === filterLevel;
    return matchesSearch && matchesLevel;
  }).sort((a, b) => b.popularity - a.popularity);

  const handleSelect = (template: PlantillaPrograma) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Plantillas Rápidas</h2>
                <p className="text-orange-100 text-sm">Programas probados y efectivos</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar plantilla..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as any)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="all">Todos los niveles</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {filteredTemplates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white border-2 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
                  selectedTemplate?.id === template.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className={`bg-gradient-to-r ${template.color} p-4`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                        {template.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{template.name}</h3>
                        <p className="text-white/90 text-xs">{template.goal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg">
                      <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                      <span className="text-xs font-bold text-white">{template.popularity}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-600 mb-1">Nivel</p>
                      <p className="text-sm font-bold text-gray-900 capitalize">
                        {template.level === 'beginner' ? 'Principiante' : template.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-600 mb-1">Frecuencia</p>
                      <p className="text-sm font-bold text-gray-900">{template.daysPerWeek} días/semana</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 col-span-2">
                      <p className="text-xs text-gray-600 mb-1">Duración</p>
                      <p className="text-sm font-bold text-gray-900">{template.duration}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Sesiones incluidas:</p>
                    <div className="space-y-1">
                      {template.sessions.slice(0, 3).map((session, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <Dumbbell className="w-3 h-3" />
                          <span>{session.name}</span>
                        </div>
                      ))}
                      {template.sessions.length > 3 && (
                        <p className="text-xs text-gray-500 pl-5">+{template.sessions.length - 3} más...</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(template);
                    }}
                    className={`w-full py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${template.color} text-white hover:shadow-lg`}
                  >
                    <Check className="w-4 h-4" />
                    Usar esta plantilla
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preview Panel */}
        {selectedTemplate && (
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {selectedTemplate.icon} {selectedTemplate.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{selectedTemplate.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">
                    {selectedTemplate.sessions.length} sesiones
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg font-medium">
                    {selectedTemplate.daysPerWeek} días/semana
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-lg font-medium capitalize">
                    {selectedTemplate.level === 'beginner' ? 'Principiante' : selectedTemplate.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleSelect(selectedTemplate)}
                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all bg-gradient-to-r ${selectedTemplate.color} flex items-center gap-2`}
              >
                <Copy className="w-5 h-5" />
                Aplicar Plantilla
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PlantillasRapidas;
