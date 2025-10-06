// src/features/cuestionario-diario/components/CuestionariosAdaptativos.tsx
import React from 'react';
import { GitBranch, CheckCircle, Circle } from 'lucide-react';

const CuestionariosAdaptativos: React.FC = () => {
  const preguntas = [
    { texto: '¿Cómo te sientes hoy?', completada: true },
    { texto: '¿Experimentaste estrés?', completada: true },
    { texto: 'Pregunta adaptativa basada en respuesta anterior...', completada: false }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Cuestionarios Adaptativos</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Cuestionarios inteligentes que cambian según tus respuestas previas
        </p>

        {/* Timeline de preguntas */}
        <div className="space-y-3">
          {preguntas.map((pregunta, index) => (
            <div key={index} className="relative pl-8">
              {/* Línea vertical */}
              {index < preguntas.length - 1 && (
                <div className="absolute left-[11px] top-8 w-0.5 h-full bg-gradient-to-b from-teal-300 to-cyan-300"></div>
              )}

              <div className="flex items-start gap-3">
                {/* Indicador */}
                <div className="absolute left-0 top-1">
                  {pregunta.completada ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                {/* Contenido */}
                <div className={`flex-1 p-4 rounded-2xl border transition-all duration-300 ${
                  pregunta.completada
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                    : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    pregunta.completada ? 'text-gray-800' : 'text-gray-600'
                  }`}>
                    {pregunta.texto}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info badge */}
        <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
          <div className="flex items-start gap-3">
            <GitBranch className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              Las preguntas se adaptan automáticamente según tus respuestas para obtener información más relevante
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuestionariosAdaptativos;
