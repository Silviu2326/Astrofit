import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Users, Calendar, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { PLAN_TEMPLATES, PlanTemplate, searchTemplates } from '../../constants/planTemplates';
import { TrainingGoal, Level } from '../../types/training.types';

interface TemplateSelectorProps {
  show: boolean;
  onClose: () => void;
  onSelect: (template: PlanTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  show,
  onClose,
  onSelect,
}) => {
  const [filterGoal, setFilterGoal] = useState<TrainingGoal | ''>('');
  const [filterLevel, setFilterLevel] = useState<Level | ''>('');
  const [filterDays, setFilterDays] = useState<number | ''>('');

  const filteredTemplates = searchTemplates({
    goal: filterGoal || undefined,
    level: filterLevel || undefined,
    daysPerWeek: filterDays || undefined,
  });

  const getGoalIcon = (goal: TrainingGoal) => {
    const icons = {
      muscle: '💪',
      'fat-loss': '🔥',
      strength: '⚡',
      endurance: '🏃',
      performance: '🎯',
      rehab: '🩺',
      maintenance: '🔄',
    };
    return icons[goal] || '🎯';
  };

  const getLevelColor = (level: Level) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800 border-green-300',
      intermediate: 'bg-blue-100 text-blue-800 border-blue-300',
      advanced: 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return colors[level];
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Plantillas Pre-diseñadas</h3>
                <p className="text-gray-600">Crea un plan completo en segundos</p>
              </div>
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Objetivo</label>
                <select
                  value={filterGoal}
                  onChange={(e) => setFilterGoal(e.target.value as TrainingGoal | '')}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Todos</option>
                  <option value="muscle">Hipertrofia</option>
                  <option value="strength">Fuerza</option>
                  <option value="fat-loss">Pérdida de Grasa</option>
                  <option value="endurance">Resistencia</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Nivel</label>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value as Level | '')}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Todos</option>
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Días/Semana</label>
                <select
                  value={filterDays}
                  onChange={(e) => setFilterDays(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Todos</option>
                  <option value="3">3 días</option>
                  <option value="4">4 días</option>
                  <option value="5">5 días</option>
                  <option value="6">6 días</option>
                </select>
              </div>
            </div>

            {/* Templates Grid */}
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron plantillas con estos filtros</p>
                <button
                  onClick={() => {
                    setFilterGoal('');
                    setFilterLevel('');
                    setFilterDays('');
                  }}
                  className="mt-4 text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Limpiar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => {
                      onSelect(template);
                      onClose();
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{getGoalIcon(template.goal)}</div>
                        <div>
                          <h4 className="font-black text-gray-900">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold border ${getLevelColor(template.level)}`}>
                        {template.level === 'beginner' ? 'Principiante' : template.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                      </span>
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full font-semibold bg-orange-100 text-orange-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                        </div>
                        <div className="text-lg font-black text-blue-600">{template.daysPerWeek.length}</div>
                        <div className="text-xs text-gray-600">días/sem</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        </div>
                        <div className="text-lg font-black text-green-600">{template.duration}</div>
                        <div className="text-xs text-gray-600">semanas</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Target className="w-3 h-3 text-purple-600" />
                        </div>
                        <div className="text-lg font-black text-purple-600">
                          {template.trainingDays.reduce((sum, day) => sum + day.exercises.length, 0)}
                        </div>
                        <div className="text-xs text-gray-600">ejercicios</div>
                      </div>
                    </div>

                    {/* Days Preview */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-600 mb-2 font-semibold">Días de entrenamiento:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.trainingDays.map((day, idx) => (
                          <div
                            key={idx}
                            className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded font-semibold"
                            title={day.name}
                          >
                            {day.day}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="mt-3 flex items-center justify-center gap-2 text-orange-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle className="w-4 h-4" />
                      Click para seleccionar
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Info */}
            <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200 mb-6">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Las plantillas son 100% personalizables. Después de seleccionar una,
                podrás ajustar ejercicios, pesos, series y todo lo que necesites.
              </p>
            </div>

            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplateSelector;
