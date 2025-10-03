// src/features/cuestionario-diario/components/RecomendacionesPersonalizadas.tsx
import React from 'react';
import { Lightbulb, Coffee, Moon, Activity } from 'lucide-react';

const RecomendacionesPersonalizadas: React.FC = () => {
  const recomendaciones = [
    { titulo: 'Mejorar calidad del sueño', descripcion: 'Intenta acostarte 30 minutos más temprano', icono: Moon, color: 'from-indigo-500 to-purple-500' },
    { titulo: 'Pausas activas', descripcion: 'Toma descansos cada 2 horas', icono: Activity, color: 'from-emerald-500 to-teal-500' },
    { titulo: 'Hidratación', descripcion: 'Aumenta tu consumo de agua', icono: Coffee, color: 'from-blue-500 to-cyan-500' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Recomendaciones Personalizadas</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Recomendaciones basadas en patrones individuales y tus métricas de bienestar
        </p>

        {/* Lista de recomendaciones */}
        <div className="space-y-4">
          {recomendaciones.map((rec, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-gradient-to-br ${rec.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <rec.icono className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-800 mb-1">{rec.titulo}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{rec.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badge de info */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-200">
          <Lightbulb className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-700">Actualizadas diariamente</span>
        </div>
      </div>
    </div>
  );
};

export default RecomendacionesPersonalizadas;
