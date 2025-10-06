// components/AlertasRegresiones.tsx - Sistema alertas regresiones significativas
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const AlertasRegresiones: React.FC = () => {
  // Datos de ejemplo
  const hayRegresion = true;
  const porcentajeRegresion = -8.5;
  const diasRegresion = 7;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-xl ${
          hayRegresion
            ? 'bg-gradient-to-br from-red-500 to-rose-600'
            : 'bg-gradient-to-br from-green-500 to-emerald-600'
        }`}>
          {hayRegresion ? (
            <AlertCircle className="w-5 h-5 text-white" />
          ) : (
            <CheckCircle className="w-5 h-5 text-white" />
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900">Alertas de Regresiones</h3>
      </div>

      <div className="space-y-3">
        {hayRegresion ? (
          <>
            <div className="px-4 py-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
              <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Regresión Detectada</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-red-600">{Math.abs(porcentajeRegresion)}%</p>
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  Crítico
                </span>
              </div>
              <p className="text-sm text-red-600 mt-1">Últimos {diasRegresion} días</p>
            </div>

            <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
              <p className="text-sm font-bold text-orange-900 mb-2">Acciones Recomendadas</p>
              <ul className="space-y-1 text-sm text-orange-800">
                <li className="flex items-start gap-1">
                  <span className="text-orange-500">•</span>
                  <span>Revisar carga de entrenamiento</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-orange-500">•</span>
                  <span>Evaluar estado de fatiga</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-orange-500">•</span>
                  <span>Consultar con especialista</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <p className="text-sm font-bold uppercase tracking-wide text-gray-600 mb-1">Estado Normal</p>
            <p className="text-xl font-bold text-green-600">Sin Regresiones</p>
            <p className="text-sm text-green-600 mt-1">Rendimiento estable</p>
          </div>
        )}

        <p className="text-sm text-gray-600 leading-relaxed">
          Sistema de alertas automático para detectar caídas significativas en rendimiento.
        </p>
      </div>
    </div>
  );
};

export default AlertasRegresiones;
