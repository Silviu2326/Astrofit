// components/ComparacionNormativas.tsx - Comparación automática normativas deporte categoría
import React from 'react';
import { BarChart3, Trophy } from 'lucide-react';

const ComparacionNormativas: React.FC = () => {
  // Datos de ejemplo
  const valorAtleta = 78.5;
  const normativas = [
    { nivel: 'Elite', valor: 85, color: 'from-yellow-500 to-amber-600' },
    { nivel: 'Avanzado', valor: 75, color: 'from-blue-500 to-indigo-600' },
    { nivel: 'Intermedio', valor: 65, color: 'from-green-500 to-emerald-600' }
  ];

  const nivelActual = valorAtleta >= 85 ? 'Elite' : valorAtleta >= 75 ? 'Avanzado' : 'Intermedio';

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Comparación de Normativas</h3>
      </div>

      <div className="space-y-3">
        <div className="px-4 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
          <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Nivel Actual</p>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-teal-600" />
            <p className="text-2xl font-bold text-teal-600">{nivelActual}</p>
          </div>
          <p className="text-sm text-teal-600 mt-1">Valor: {valorAtleta} cm</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-700">Normativas por Nivel</p>
          {normativas.map((norm, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{norm.nivel}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-600">{norm.valor} cm</span>
                  {valorAtleta >= norm.valor && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>
              {/* Barra indicadora */}
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-full bg-gradient-to-r ${norm.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min((valorAtleta / norm.valor) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          Comparación con estándares del deporte y categoría.
        </p>
      </div>
    </div>
  );
};

export default ComparacionNormativas;
