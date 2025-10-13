import React from 'react';
import { Plus, Copy, Download, Trash2 } from 'lucide-react';
import { TrainingDay } from '../../types/training.types';

interface DaySelectorProps {
  trainingDays: TrainingDay[];
  selectedDayIndex: number;
  isEditMode: boolean;
  onSelectDay: (index: number) => void;
  onDuplicateSession: (index: number) => void;
  onSaveAsTemplate: (index: number) => void;
  onRemoveDay: (index: number) => void;
  onShowTemplates: () => void;
  onShowBlocks: () => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  trainingDays,
  selectedDayIndex,
  isEditMode,
  onSelectDay,
  onDuplicateSession,
  onSaveAsTemplate,
  onRemoveDay,
  onShowTemplates,
  onShowBlocks,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Sesiones</h3>
        {isEditMode && (
          <div className="flex gap-1">
            <button
              onClick={onShowTemplates}
              className="text-orange-600 hover:text-orange-700"
              title="Ver plantillas"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onShowBlocks}
              className="text-blue-600 hover:text-blue-700"
              title="Bloques de ejercicios"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-2">
        {trainingDays.map((day, index) => (
          <div key={index} className="relative group">
            <button
              onClick={() => onSelectDay(index)}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selectedDayIndex === index
                  ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="font-bold">{day.name}</div>
              <div className="text-sm opacity-80">
                {day.exercises.length} ejercicios · {day.duration} min
              </div>
            </button>
            {isEditMode && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateSession(index);
                  }}
                  className="p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  title="Duplicar sesión"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSaveAsTemplate(index);
                  }}
                  className="p-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  title="Guardar como plantilla"
                >
                  <Download className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveDay(index);
                  }}
                  className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  title="Eliminar"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
