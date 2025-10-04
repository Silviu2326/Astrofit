
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, TrendingUp, Send } from 'lucide-react';

const RecomendadorTiming: React.FC = () => {
  const [fechaEnvio, setFechaEnvio] = useState<string>('');
  const [horaEnvio, setHoraEnvio] = useState<string>('');

  const mejorHorario = {
    hora: '10:00 AM',
    dia: 'Martes',
    razon: 'Mayor tasa de apertura histórica',
    tasaApertura: 78.5
  };

  const horariosOptimos = [
    { dia: 'Lunes', hora: '9:00 AM', apertura: 72.3 },
    { dia: 'Martes', hora: '10:00 AM', apertura: 78.5 },
    { dia: 'Miércoles', hora: '11:00 AM', apertura: 75.1 },
    { dia: 'Jueves', hora: '9:30 AM', apertura: 76.8 },
    { dia: 'Viernes', hora: '8:00 AM', apertura: 68.2 },
    { dia: 'Sábado', hora: '10:00 AM', apertura: 65.4 },
    { dia: 'Domingo', hora: '6:00 PM', apertura: 58.9 }
  ];

  const handleProgramarEnvio = () => {
    if (fechaEnvio && horaEnvio) {
      alert(`Mensaje programado para ${fechaEnvio} a las ${horaEnvio}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Clock className="w-6 h-6" />
          </div>
          Recomendador de Timing
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Mejor momento recomendado */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Mejor Momento para Enviar</p>
              <p className="text-3xl font-bold text-gray-900">{mejorHorario.hora}</p>
              <p className="text-lg font-semibold text-blue-600">{mejorHorario.dia}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-600 mb-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-2xl font-bold">{mejorHorario.tasaApertura}%</span>
              </div>
              <p className="text-xs text-gray-600">Tasa de apertura</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {mejorHorario.razon}
          </p>
        </div>

        {/* Horarios óptimos por día */}
        <div>
          <h4 className="text-sm font-bold text-gray-800 mb-3">Horarios Óptimos por Día</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {horariosOptimos.map((horario, index) => (
              <motion.div
                key={horario.dia}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-white to-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {horario.dia.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{horario.dia}</p>
                    <p className="text-sm text-gray-600">{horario.hora}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{horario.apertura}%</p>
                  <p className="text-xs text-gray-500">apertura</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Programador de envío */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-200">
          <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            Programar Envío
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                value={fechaEnvio}
                onChange={(e) => setFechaEnvio(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Hora</label>
              <input
                type="time"
                value={horaEnvio}
                onChange={(e) => setHoraEnvio(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white text-sm"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProgramarEnvio}
              disabled={!fechaEnvio || !horaEnvio}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Programar Envío Automático
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecomendadorTiming;
