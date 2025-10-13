import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle, CalendarDays, BarChart, Target as TargetIcon, Minimize2
} from 'lucide-react';

interface Macros {
  sesiones: number;
  ejercicios: number;
  duracion: number;
  calorias: number;
  peso: number;
  series: number;
  repeticiones: number;
}

interface Objetivos {
  sesionesPorSemana: number;
  duracionSesion: number;
  intensidad: string;
  objetivo: string;
  nivel: string;
}

interface AlertaLinter {
  id: string;
  tipo: string;
  severidad: 'error' | 'warn' | 'info';
  mensaje: string;
  sesion: { dia: number; sesion: string };
  fix?: {
    label: string;
    action: () => void;
  };
}

interface TotalesPanelProps {
  totalesDia: Macros;
  totalesSemana: Macros;
  objetivosDia: Objetivos;
  objetivosSemana: Objetivos;
  alertas: AlertaLinter[];
  tiempoTotal: number;
  tiempoDia: number;
  costeTotal: number;
  costeDia: number;
  objetivoCoste: number;
  objetivoTiempo: number;
  onFixAlerta: (alerta: AlertaLinter) => void;
  onSugerirAjuste: (tipo: 'intensidad' | 'duracion') => void;
  notasCoach: string;
  onNotasChange: (notas: string) => void;
  onMinimize?: () => void;
}

export const TotalesPanel: React.FC<TotalesPanelProps> = ({
  totalesDia,
  totalesSemana,
  objetivosDia,
  objetivosSemana,
  alertas,
  tiempoTotal,
  tiempoDia,
  costeTotal,
  costeDia,
  objetivoCoste,
  objetivoTiempo,
  onFixAlerta,
  onSugerirAjuste,
  notasCoach,
  onNotasChange,
  onMinimize
}) => {
  const getProgresoColor = (actual: number, objetivo: number) => {
    const porcentaje = (actual / objetivo) * 100;
    if (porcentaje >= 100) return 'text-green-600';
    if (porcentaje >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgresoBarra = (actual: number, objetivo: number) => {
    const porcentaje = Math.min((actual / objetivo) * 100, 100);
    return {
      width: `${porcentaje}%`,
      backgroundColor: porcentaje >= 100 ? '#10b981' : porcentaje >= 80 ? '#f59e0b' : '#ef4444'
    };
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col max-h-screen overflow-y-auto">
      {/* Header fijo */}
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Resumen</h3>
          {onMinimize && (
            <motion.button
              onClick={onMinimize}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Minimizar panel"
            >
              <Minimize2 className="w-4 h-4 text-gray-600" />
            </motion.button>
          )}
        </div>
        
        {/* Totales del día */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-700">Hoy</h4>
          {totalesDia.sesiones === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <div className="flex justify-center mb-2">
                <CalendarDays className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm">No hay sesiones programadas para hoy</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sesiones:</span>
                <span className="font-semibold text-orange-600">{totalesDia.sesiones}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ejercicios:</span>
                <span className="font-semibold text-orange-600">{totalesDia.ejercicios}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Duración:</span>
                <span className="font-semibold text-orange-600">{totalesDia.duracion} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Calorías:</span>
                <span className="font-semibold text-orange-600">{totalesDia.calorias}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Totales de la semana */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-700">Esta Semana</h4>
          {totalesSemana.sesiones === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <div className="flex justify-center mb-2">
                <BarChart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm">No hay sesiones programadas esta semana</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sesiones:</span>
                <span className="font-semibold text-blue-600">{totalesSemana.sesiones}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ejercicios:</span>
                <span className="font-semibold text-blue-600">{totalesSemana.ejercicios}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Duración:</span>
                <span className="font-semibold text-blue-600">{totalesSemana.duracion} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Calorías:</span>
                <span className="font-semibold text-blue-600">{totalesSemana.calorias}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Progreso hacia objetivos */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-4">Progreso</h4>
        
        {totalesSemana.sesiones === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <div className="flex justify-center mb-2">
              <TargetIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm">Añade sesiones para ver tu progreso</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Sesiones */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Sesiones</span>
                <span className={`text-sm font-semibold ${getProgresoColor(totalesSemana.sesiones, objetivosSemana.sesionesPorSemana)}`}>
                  {totalesSemana.sesiones}/{objetivosSemana.sesionesPorSemana}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={getProgresoBarra(totalesSemana.sesiones, objetivosSemana.sesionesPorSemana)}
                />
              </div>
            </div>
            
            {/* Duración */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Duración</span>
                <span className={`text-sm font-semibold ${getProgresoColor(totalesSemana.duracion, objetivosSemana.duracionSesion * objetivosSemana.sesionesPorSemana)}`}>
                  {totalesSemana.duracion}/{objetivosSemana.duracionSesion * objetivosSemana.sesionesPorSemana} min
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={getProgresoBarra(totalesSemana.duracion, objetivosSemana.duracionSesion * objetivosSemana.sesionesPorSemana)}
                />
              </div>
            </div>
            
            {/* Calorías */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Calorías</span>
                <span className={`text-sm font-semibold ${getProgresoColor(totalesSemana.calorias, 2000 * objetivosSemana.sesionesPorSemana)}`}>
                  {totalesSemana.calorias}/{2000 * objetivosSemana.sesionesPorSemana}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={getProgresoBarra(totalesSemana.calorias, 2000 * objetivosSemana.sesionesPorSemana)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Alertas */}
      <div className="flex-1 p-4">
        <h4 className="font-semibold text-gray-700 mb-3">Alertas</h4>
        <div className="space-y-2">
          {alertas.map((alerta) => (
            <motion.div
              key={alerta.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg border ${
                alerta.severidad === 'error' ? 'bg-red-50 border-red-200' :
                alerta.severidad === 'warn' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className={`w-4 h-4 ${
                  alerta.severidad === 'error' ? 'text-red-600' :
                  alerta.severidad === 'warn' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
                <span className="text-sm font-semibold text-gray-900">{alerta.mensaje}</span>
              </div>
              {alerta.fix && (
                <button
                  onClick={() => onFixAlerta(alerta)}
                  className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
                >
                  {alerta.fix.label}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Notas del coach */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-3">Notas del Coach</h4>
        <textarea
          value={notasCoach}
          onChange={(e) => onNotasChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          rows={3}
          placeholder="Observaciones, recomendaciones, ajustes..."
        />
      </div>
    </div>
  );
};




