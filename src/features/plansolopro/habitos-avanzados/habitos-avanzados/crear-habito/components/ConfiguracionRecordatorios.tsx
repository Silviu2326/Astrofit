import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Plus, X } from 'lucide-react';

interface ConfiguracionRecordatoriosProps {
  data: {
    horarios: string[];
  };
  onUpdate: (data: any) => void;
}

const ConfiguracionRecordatorios: React.FC<ConfiguracionRecordatoriosProps> = ({ data, onUpdate }) => {
  const [newHorario, setNewHorario] = React.useState('09:00');

  const agregarHorario = () => {
    if (!data.horarios.includes(newHorario)) {
      onUpdate({ horarios: [...data.horarios, newHorario].sort() });
    }
  };

  const eliminarHorario = (horario: string) => {
    onUpdate({ horarios: data.horarios.filter(h => h !== horario) });
  };

  const horariosPreset = [
    { label: 'Mañana', hora: '08:00', icon: '🌅' },
    { label: 'Mediodía', hora: '12:00', icon: '☀️' },
    { label: 'Tarde', hora: '16:00', icon: '🌤️' },
    { label: 'Noche', hora: '20:00', icon: '🌙' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Bell className="w-8 h-8 text-cyan-600" />
          Recordatorios
        </h2>

        <div className="space-y-6">
          {/* Descripción */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200">
            <p className="text-sm text-cyan-900">
              <span className="font-bold">💡 Tip:</span> Configura recordatorios en momentos clave del día para no olvidar tu hábito.
            </p>
          </div>

          {/* Horarios Preset */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Horarios sugeridos
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {horariosPreset.map((preset) => {
                const yaAgregado = data.horarios.includes(preset.hora);

                return (
                  <motion.button
                    key={preset.hora}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      if (yaAgregado) {
                        eliminarHorario(preset.hora);
                      } else {
                        onUpdate({ horarios: [...data.horarios, preset.hora].sort() });
                      }
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      yaAgregado
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-transparent shadow-lg'
                        : 'bg-white border-gray-200 hover:border-cyan-400 hover:bg-cyan-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{preset.icon}</div>
                    <div className={`text-xs font-semibold ${yaAgregado ? 'text-white' : 'text-gray-900'}`}>
                      {preset.label}
                    </div>
                    <div className={`text-sm font-bold ${yaAgregado ? 'text-white' : 'text-gray-700'}`}>
                      {preset.hora}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Agregar horario personalizado */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Agregar horario personalizado
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={newHorario}
                  onChange={(e) => setNewHorario(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={agregarHorario}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Agregar
              </motion.button>
            </div>
          </div>

          {/* Lista de horarios configurados */}
          {data.horarios.length > 0 && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Horarios configurados ({data.horarios.length})
              </label>
              <div className="space-y-2">
                {data.horarios.map((horario, index) => (
                  <motion.div
                    key={horario}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{horario}</p>
                        <p className="text-xs text-gray-600">Recordatorio diario</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => eliminarHorario(horario)}
                      className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors duration-300"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {data.horarios.length === 0 && (
            <div className="text-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-600">
                No hay recordatorios configurados
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Agrega al menos un horario para recibir notificaciones
              </p>
            </div>
          )}

          {/* Opciones adicionales */}
          <div className="pt-4 border-t border-gray-200">
            <label className="flex items-center gap-3 p-4 rounded-xl bg-white border-2 border-gray-200 hover:border-cyan-400 transition-all duration-300 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded text-cyan-600 focus:ring-cyan-500"
                defaultChecked
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">Notificaciones push</p>
                <p className="text-xs text-gray-600">Recibe alertas en tu dispositivo</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionRecordatorios;
