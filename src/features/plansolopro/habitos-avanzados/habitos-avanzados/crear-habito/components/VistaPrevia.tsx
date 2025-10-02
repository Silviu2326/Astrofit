import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Calendar, Clock, Bell, Target, Sparkles } from 'lucide-react';

interface VistaPreviaProps {
  data: {
    nombre: string;
    descripcion: string;
    icono: string;
    color: string;
    categoria: string;
    frecuencia: 'diario' | 'semanal' | 'mensual' | 'personalizado';
    diasSemana: number[];
    vecesAlDia: number;
    horarios: string[];
    meta: string;
    motivacion: string;
  };
}

const VistaPrevia: React.FC<VistaPreviaProps> = ({ data }) => {
  const getDiasSemanaText = () => {
    if (data.frecuencia === 'diario') return 'Todos los días';
    if (data.diasSemana.length === 0) return 'No especificado';

    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return data.diasSemana
      .map(d => dias[d])
      .sort()
      .join(', ');
  };

  const getFrecuenciaText = () => {
    switch (data.frecuencia) {
      case 'diario':
        return 'Diario';
      case 'semanal':
        return 'Semanal';
      case 'mensual':
        return 'Mensual';
      case 'personalizado':
        return 'Personalizado';
      default:
        return 'No definido';
    }
  };

  return (
    <div className="sticky top-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">Vista Previa</h3>
          </div>

          {/* Card del hábito como se verá */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden mb-4"
          >
            {/* Header con color del hábito */}
            <div
              className="p-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${data.color} 0%, ${data.color}dd 100%)`
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  {data.icono || '💪'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">
                    {data.nombre || 'Nombre del Hábito'}
                  </h4>
                  {data.categoria && (
                    <p className="text-xs text-white/80 font-semibold">
                      {data.categoria}
                    </p>
                  )}
                </div>
              </div>

              {/* Pattern decorativo */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              {/* Descripción */}
              {data.descripcion && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {data.descripcion}
                </p>
              )}

              {/* Frecuencia */}
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-600">Frecuencia</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {getFrecuenciaText()} - {getDiasSemanaText()}
                  </p>
                </div>
              </div>

              {/* Veces al día */}
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-600">Repeticiones</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {data.vecesAlDia} {data.vecesAlDia === 1 ? 'vez' : 'veces'} al día
                  </p>
                </div>
              </div>

              {/* Recordatorios */}
              <div className="flex items-start gap-2">
                <Bell className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-600">Recordatorios</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {data.horarios.length > 0
                      ? data.horarios.join(', ')
                      : 'Sin recordatorios'}
                  </p>
                </div>
              </div>

              {/* Meta */}
              {data.meta && (
                <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                  <Target className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-600">Meta</p>
                    <p className="text-sm text-gray-700">{data.meta}</p>
                  </div>
                </div>
              )}

              {/* Motivación */}
              {data.motivacion && (
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-600">Motivación</p>
                    <p className="text-sm text-gray-700">{data.motivacion}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Nota informativa */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
            <p className="text-xs text-indigo-900 text-center">
              <span className="font-bold">ℹ️ Preview:</span> Así verá tu cliente este hábito
            </p>
          </div>

          {/* Progreso de completitud */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-600">Completitud del formulario</p>
              <p className="text-xs font-bold text-indigo-600">
                {Math.round(
                  ((data.nombre ? 20 : 0) +
                    (data.categoria ? 15 : 0) +
                    (data.descripcion ? 10 : 0) +
                    (data.frecuencia !== 'diario' && data.diasSemana.length > 0 ? 15 : data.frecuencia === 'diario' ? 15 : 0) +
                    (data.horarios.length > 0 ? 20 : 0) +
                    (data.meta ? 10 : 0) +
                    (data.motivacion ? 10 : 0))
                )}
                %
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (data.nombre ? 20 : 0) +
                    (data.categoria ? 15 : 0) +
                    (data.descripcion ? 10 : 0) +
                    (data.frecuencia !== 'diario' && data.diasSemana.length > 0 ? 15 : data.frecuencia === 'diario' ? 15 : 0) +
                    (data.horarios.length > 0 ? 20 : 0) +
                    (data.meta ? 10 : 0) +
                    (data.motivacion ? 10 : 0)
                  }%`
                }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VistaPrevia;
