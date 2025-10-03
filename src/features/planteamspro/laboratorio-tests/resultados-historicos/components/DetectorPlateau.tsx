// components/DetectorPlateau.tsx - Detector automático plateaus recomendaciones intervención
import React from 'react';
import { AlertTriangle, Lightbulb } from 'lucide-react';

const DetectorPlateau: React.FC = () => {
  // Datos de ejemplo
  const plateauDetectado = true;
  const diasEnPlateau = 21;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Detector de Plateau</h3>
      </div>

      <div className="space-y-3">
        {plateauDetectado ? (
          <>
            <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Estado</p>
              <p className="text-xl font-bold text-orange-600">Plateau Detectado</p>
              <p className="text-sm text-orange-600 mt-1">{diasEnPlateau} días sin mejora significativa</p>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-bold text-blue-900">Recomendaciones</p>
              </div>
              <ul className="space-y-1 text-sm text-blue-800">
                <li className="flex items-start gap-1">
                  <span className="text-blue-500">•</span>
                  <span>Variar el protocolo de entrenamiento</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-500">•</span>
                  <span>Aumentar volumen o intensidad</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-blue-500">•</span>
                  <span>Considerar período de recuperación</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Estado</p>
            <p className="text-xl font-bold text-green-600">Progreso Normal</p>
            <p className="text-sm text-green-600 mt-1">Sin plateau detectado</p>
          </div>
        )}

        <p className="text-sm text-gray-600 leading-relaxed">
          Análisis automático de estancamiento en el progreso del atleta.
        </p>
      </div>
    </div>
  );
};

export default DetectorPlateau;
