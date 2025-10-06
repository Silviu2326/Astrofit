import React from 'react';
import { Brain, Lightbulb, CheckCircle } from 'lucide-react';

const CoachingAutomatico: React.FC = () => {
  const suggestions = [
    { id: 1, text: 'Reducir intensidad 10% - FC elevada', priority: 'high' },
    { id: 2, text: 'Incrementar hidratación', priority: 'medium' },
    { id: 3, text: 'Mantener ritmo actual', priority: 'low' },
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50';
      case 'medium':
        return 'border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50';
      default:
        return 'border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50';
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Coaching Automático</h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Sugerencias basadas en datos en vivo</p>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`p-3 border-2 ${getPriorityStyle(suggestion.priority)} rounded-xl transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{suggestion.text}</p>
              </div>
              <button className="p-1 hover:bg-white/50 rounded-lg transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* IA Badge */}
      <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-600" />
          <p className="text-xs font-semibold text-indigo-700">ANÁLISIS IA EN TIEMPO REAL</p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-indigo-600">Generando recomendaciones...</span>
        </div>
      </div>
    </div>
  );
};

export default CoachingAutomatico;
