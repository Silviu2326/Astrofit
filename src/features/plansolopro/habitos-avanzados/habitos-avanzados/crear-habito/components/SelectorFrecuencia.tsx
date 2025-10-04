import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Repeat, Clock } from 'lucide-react';

interface SelectorFrecuenciaProps {
  data: {
    frecuencia: 'diario' | 'semanal' | 'mensual' | 'personalizado';
    diasSemana: number[];
    vecesAlDia: number;
  };
  onUpdate: (data: any) => void;
}

const SelectorFrecuencia: React.FC<SelectorFrecuenciaProps> = ({ data, onUpdate }) => {
  const diasSemanaLabels = [
    { label: 'L', value: 1, name: 'Lunes' },
    { label: 'M', value: 2, name: 'Martes' },
    { label: 'X', value: 3, name: 'Miércoles' },
    { label: 'J', value: 4, name: 'Jueves' },
    { label: 'V', value: 5, name: 'Viernes' },
    { label: 'S', value: 6, name: 'Sábado' },
    { label: 'D', value: 0, name: 'Domingo' }
  ];

  const frecuencias = [
    {
      value: 'diario',
      label: 'Diario',
      description: 'Todos los días',
      icon: Calendar,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      value: 'semanal',
      label: 'Semanal',
      description: 'Días específicos',
      icon: Repeat,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      value: 'personalizado',
      label: 'Personalizado',
      description: 'Tú decides',
      icon: Clock,
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  const toggleDia = (dia: number) => {
    const newDias = data.diasSemana.includes(dia)
      ? data.diasSemana.filter(d => d !== dia)
      : [...data.diasSemana, dia];
    onUpdate({ diasSemana: newDias });
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Repeat className="w-8 h-8 text-purple-600" />
          Frecuencia y Horarios
        </h2>

        <div className="space-y-6">
          {/* Selector de Frecuencia */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              ¿Con qué frecuencia realizarás este hábito?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {frecuencias.map((frec) => {
                const Icon = frec.icon;
                const isSelected = data.frecuencia === frec.value;

                return (
                  <motion.button
                    key={frec.value}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onUpdate({ frecuencia: frec.value })}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden ${
                      isSelected
                        ? `bg-gradient-to-br ${frec.gradient} text-white border-transparent shadow-xl`
                        : 'bg-white border-gray-200 hover:border-purple-400 hover:shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
                    )}

                    <div className="relative z-10">
                      <Icon className={`w-8 h-8 mb-3 ${isSelected ? 'text-white' : 'text-purple-600'}`} />
                      <p className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {frec.label}
                      </p>
                      <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                        {frec.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Selector de Días de la Semana */}
          {(data.frecuencia === 'semanal' || data.frecuencia === 'personalizado') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Selecciona los días
              </label>
              <div className="flex gap-2 flex-wrap">
                {diasSemanaLabels.map((dia) => {
                  const isSelected = data.diasSemana.includes(dia.value);

                  return (
                    <motion.button
                      key={dia.value}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => toggleDia(dia.value)}
                      className={`w-14 h-14 rounded-xl font-bold text-lg transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={dia.name}
                    >
                      {dia.label}
                    </motion.button>
                  );
                })}
              </div>
              {data.diasSemana.length === 0 && (
                <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
                  <span>⚠️</span> Selecciona al menos un día
                </p>
              )}
            </motion.div>
          )}

          {/* Veces al día */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              ¿Cuántas veces al día?
            </label>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => onUpdate({ vecesAlDia: Math.max(1, data.vecesAlDia - 1) })}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-purple-100 hover:to-pink-100 font-bold text-xl text-gray-700 hover:text-purple-600 transition-all duration-300 shadow-md"
              >
                -
              </motion.button>

              <div className="flex-1">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
                  <div className="text-center">
                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                      {data.vecesAlDia}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold mt-1">
                      {data.vecesAlDia === 1 ? 'vez al día' : 'veces al día'}
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => onUpdate({ vecesAlDia: Math.min(10, data.vecesAlDia + 1) })}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 font-bold text-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Sugerencias rápidas */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
            <p className="text-sm font-bold text-blue-900 mb-2">💡 Sugerencia</p>
            <p className="text-sm text-blue-700">
              {data.frecuencia === 'diario' && 'Los hábitos diarios son más fáciles de mantener al principio.'}
              {data.frecuencia === 'semanal' && 'Empieza con 3-4 días por semana y ve aumentando gradualmente.'}
              {data.frecuencia === 'personalizado' && 'Personaliza tu rutina según tu estilo de vida.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectorFrecuencia;
