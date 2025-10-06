import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Clock, 
  Smartphone, 
  Mail, 
  MessageSquare,
  Settings,
  CheckCircle,
  AlertCircle,
  Info,
  Sun,
  Moon,
  Zap
} from 'lucide-react';

interface HabitoData {
  nombre: string;
  descripcion: string;
  categoria: string;
  frecuencia: string;
  diasSemana: number[];
  horaRecordatorio: string;
  duracion: number;
  objetivo: number;
  tipoObjetivo: 'veces' | 'minutos' | 'dias';
  dificultad: 'facil' | 'medio' | 'dificil';
  recompensa: string;
  recordatorios: boolean;
  notificaciones: boolean;
}

interface ConfiguracionRecordatoriosProps {
  habitoData: HabitoData;
  onFormChange: (data: Partial<HabitoData>) => void;
}

const ConfiguracionRecordatorios: React.FC<ConfiguracionRecordatoriosProps> = ({ habitoData, onFormChange }) => {
  const horariosSugeridos = [
    { hora: '07:00', nombre: 'Mañana', icono: Sun, descripcion: 'Ideal para hábitos matutinos' },
    { hora: '12:00', nombre: 'Mediodía', icono: Zap, descripcion: 'Recordatorio del mediodía' },
    { hora: '18:00', nombre: 'Tarde', icono: Sun, descripcion: 'Final del día laboral' },
    { hora: '21:00', nombre: 'Noche', icono: Moon, descripcion: 'Antes de dormir' },
  ];

  const tiposNotificacion = [
    { id: 'push', nombre: 'Notificación Push', icono: Smartphone, descripcion: 'En la app móvil' },
    { id: 'email', nombre: 'Email', icono: Mail, descripcion: 'Correo electrónico' },
    { id: 'sms', nombre: 'SMS', icono: MessageSquare, descripcion: 'Mensaje de texto' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      onFormChange({ [name]: checked });
    } else {
      onFormChange({ [name]: value });
    }
  };

  const aplicarHorario = (hora: string) => {
    onFormChange({ horaRecordatorio: hora });
  };

  const getHoraSugerida = () => {
    const hora = habitoData.horaRecordatorio;
    const sugerida = horariosSugeridos.find(h => h.hora === hora);
    return sugerida;
  };

  const horaSugerida = getHoraSugerida();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
          <Bell className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Configuración de Recordatorios</h2>
      </div>

      <div className="space-y-6">
        {/* Habilitar Recordatorios */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recordatorios</h3>
              <p className="text-sm text-gray-600">Configura cuándo y cómo recordar al cliente</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="recordatorios"
                checked={habitoData.recordatorios}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {habitoData.recordatorios && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              {/* Hora del Recordatorio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Hora del Recordatorio
                </label>
                
                {/* Horarios Sugeridos */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {horariosSugeridos.map((horario) => {
                    const Icon = horario.icono;
                    const isSelected = habitoData.horaRecordatorio === horario.hora;
                    return (
                      <button
                        key={horario.hora}
                        type="button"
                        onClick={() => aplicarHorario(horario.hora)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium">{horario.nombre}</h4>
                            <p className="text-sm text-gray-600">{horario.hora}</p>
                            <p className="text-xs text-gray-500">{horario.descripcion}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selector de Hora Personalizada */}
                <div className="relative">
                  <input
                    type="time"
                    name="horaRecordatorio"
                    value={habitoData.horaRecordatorio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Tipo de Notificación */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tipo de Notificación
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {tiposNotificacion.map((tipo) => {
                    const Icon = tipo.icono;
                    return (
                      <div
                        key={tipo.id}
                        className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{tipo.nombre}</h4>
                            <p className="text-sm text-gray-600">{tipo.descripcion}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Configuración Avanzada */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Configuración Avanzada</h3>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="notificaciones"
                      checked={habitoData.notificaciones}
                      onChange={handleChange}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Habilitar notificaciones de progreso</span>
                  </label>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-800">Notificaciones Inteligentes</p>
                        <p className="text-xs text-blue-700 mt-1">
                          El sistema enviará recordatorios más frecuentes si el cliente no completa el hábito
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Resumen de Configuración */}
        {habitoData.recordatorios && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Resumen de Recordatorios</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-gray-600">Hora:</span>
                <span className="font-medium">{habitoData.horaRecordatorio}</span>
                {horaSugerida && (
                  <span className="text-xs text-gray-500">({horaSugerida.nombre})</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Estado:</span>
                <span className="font-medium text-green-600">Activo</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">Notificaciones:</span>
                <span className="font-medium">
                  {habitoData.notificaciones ? 'Habilitadas' : 'Deshabilitadas'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Recomendaciones */}
        <div className="space-y-3">
          {habitoData.recordatorios && habitoData.horaRecordatorio && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Recordatorios Configurados</p>
                  <p className="text-xs text-green-700 mt-1">
                    El cliente recibirá recordatorios a las {habitoData.horaRecordatorio} según la frecuencia del hábito.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!habitoData.recordatorios && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Sin Recordatorios</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Sin recordatorios, el cliente dependerá de su propia motivación para completar el hábito.
                  </p>
                </div>
              </div>
            </div>
          )}

          {habitoData.recordatorios && habitoData.horaRecordatorio === '21:00' && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Moon className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">Recordatorio Nocturno</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Ideal para hábitos de reflexión, lectura o preparación del día siguiente.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ConfiguracionRecordatorios;
