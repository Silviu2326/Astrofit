// src/features/cuestionario-diario/components/AnalisisCorrelaciones.tsx
import React from 'react';
import { TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AnalisisCorrelaciones: React.FC = () => {
  const correlaciones = [
    { factor1: 'Calidad del sueño', factor2: 'Rendimiento', correlacion: '+85%', tendencia: 'up', color: 'from-green-500 to-emerald-500' },
    { factor1: 'Nivel de estrés', factor2: 'Energía', correlacion: '-72%', tendencia: 'down', color: 'from-orange-500 to-red-500' },
    { factor1: 'Estado de ánimo', factor2: 'Productividad', correlacion: '+68%', tendencia: 'up', color: 'from-blue-500 to-cyan-500' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Análisis de Correlaciones</h2>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Análisis de correlaciones entre métricas de wellness y rendimiento deportivo
        </p>

        {/* Lista de correlaciones */}
        <div className="space-y-4">
          {correlaciones.map((corr, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-1">
                    <span>{corr.factor1}</span>
                    <span className="text-gray-400">↔</span>
                    <span>{corr.factor2}</span>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${corr.color} text-white rounded-full font-bold text-sm shadow-lg`}>
                  {corr.tendencia === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{corr.correlacion}</span>
                </div>
              </div>

              {/* Barra visual de correlación */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${corr.color} rounded-full transition-all duration-500`}
                  style={{ width: corr.correlacion.replace(/[+-]/g, '') }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Insights Automáticos</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                El sistema analiza automáticamente patrones y correlaciones para ayudarte a optimizar tu rendimiento
              </p>
            </div>
          </div>
        </div>

        {/* Badge de estado */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-lg">
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm font-bold">Análisis actualizado</span>
        </div>
      </div>
    </div>
  );
};

export default AnalisisCorrelaciones;
