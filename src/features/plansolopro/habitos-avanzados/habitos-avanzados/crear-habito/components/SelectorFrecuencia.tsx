import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Repeat, 
  CheckCircle,
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

interface SelectorFrecuenciaProps {
  habitoData: HabitoData;
  onFormChange: (data: Partial<HabitoData>) => void;
}

const SelectorFrecuencia: React.FC<SelectorFrecuenciaProps> = ({ habitoData, onFormChange }) => {
  const diasSemana = [
    { id: 0, nombre: 'Dom', label: 'Domingo', icon: Sun },
    { id: 1, nombre: 'Lun', label: 'Lunes', icon: Zap },
    { id: 2, nombre: 'Mar', label: 'Martes', icon: Zap },
    { id: 3, nombre: 'Mié', label: 'Miércoles', icon: Zap },
    { id: 4, nombre: 'Jue', label: 'Jueves', icon: Zap },
    { id: 5, nombre: 'Vie', label: 'Viernes', icon: Zap },
    { id: 6, nombre: 'Sáb', label: 'Sábado', icon: Moon },
  ];

  const frecuencias = [
    { id: 'diario', nombre: 'Diario', descripcion: 'Todos los días', icon: Sun, color: 'green' },
    { id: 'semanal', nombre: 'Semanal', descripcion: 'Días específicos', icon: Calendar, color: 'blue' },
    { id: 'alterno', nombre: 'Día por medio', descripcion: 'Cada dos días', icon: Repeat, color: 'purple' },
    { id: 'fin_semana', nombre: 'Fin de semana', descripcion: 'Sábados y domingos', icon: Moon, color: 'indigo' },
  ];

  const handleFrecuenciaChange = (frecuencia: string) => {
    onFormChange({ frecuencia });
    
    // Auto-seleccionar días para frecuencias específicas
    if (frecuencia === 'diario') {
      onFormChange({ diasSemana: [1, 2, 3, 4, 5, 6, 0] }); // Todos los días
    } else if (frecuencia === 'fin_semana') {
      onFormChange({ diasSemana: [6, 0] }); // Sábado y domingo
    } else if (frecuencia === 'alterno') {
      onFormChange({ diasSemana: [] }); // Se manejará diferente
    }
  };

  const toggleDiaSemana = (diaId: number) => {
    const diasActuales = habitoData.diasSemana || [];
    const nuevosDias = diasActuales.includes(diaId)
      ? diasActuales.filter(dia => dia !== diaId)
      : [...diasActuales, diaId];
    
    onFormChange({ diasSemana: nuevosDias });
  };

  const getFrecuenciaIcon = (frecuencia: string) => {
    const frec = frecuencias.find(f => f.id === frecuencia);
    return frec ? frec.icon : Calendar;
  };

  const getFrecuenciaColor = (frecuencia: string) => {
    const frec = frecuencias.find(f => f.id === frecuencia);
    return frec ? frec.color : 'gray';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Frecuencia del Hábito</h2>
      </div>

      <div className="space-y-6">
        {/* Selector de Frecuencia */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tipo de Frecuencia
          </label>
          <div className="grid grid-cols-2 gap-3">
            {frecuencias.map((frecuencia) => {
              const Icon = frecuencia.icon;
              const isSelected = habitoData.frecuencia === frecuencia.id;
              return (
                <button
                  key={frecuencia.id}
                  type="button"
                  onClick={() => handleFrecuenciaChange(frecuencia.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? `border-${frecuencia.color}-500 bg-${frecuencia.color}-50 text-${frecuencia.color}-700`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? `bg-${frecuencia.color}-100` : 'bg-gray-100'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium">{frecuencia.nombre}</h4>
                      <p className="text-sm text-gray-600">{frecuencia.descripcion}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selector de Días (solo para frecuencia semanal) */}
        {habitoData.frecuencia === 'semanal' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Días de la Semana
            </label>
            <div className="grid grid-cols-7 gap-2">
              {diasSemana.map((dia) => {
                const Icon = dia.icon;
                const isSelected = habitoData.diasSemana?.includes(dia.id) || false;
                return (
                  <button
                    key={dia.id}
                    type="button"
                    onClick={() => toggleDiaSemana(dia.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <Icon className="w-4 h-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">{dia.nombre}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Selecciona los días en los que el cliente debe realizar este hábito
            </p>
          </motion.div>
        )}

        {/* Configuración de Día por Medio */}
        {habitoData.frecuencia === 'alterno' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Repeat className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-purple-800">Día por Medio</p>
                  <p className="text-xs text-purple-700 mt-1">
                    El hábito se alternará automáticamente cada dos días
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Resumen de Frecuencia */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Resumen de Frecuencia</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              {React.createElement(getFrecuenciaIcon(habitoData.frecuencia), {
                className: `w-4 h-4 text-${getFrecuenciaColor(habitoData.frecuencia)}-600`
              })}
              <span className="text-gray-600">Frecuencia:</span>
              <span className="font-medium capitalize">{habitoData.frecuencia}</span>
            </div>
            
            {habitoData.frecuencia === 'semanal' && habitoData.diasSemana && habitoData.diasSemana.length > 0 && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">Días:</span>
                <span className="font-medium">
                  {habitoData.diasSemana.map(dia => diasSemana.find(d => d.id === dia)?.nombre).join(', ')}
                </span>
              </div>
            )}
            
            {habitoData.frecuencia === 'diario' && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Días:</span>
                <span className="font-medium text-green-600">Todos los días</span>
              </div>
            )}
            
            {habitoData.frecuencia === 'fin_semana' && (
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="text-gray-600">Días:</span>
                <span className="font-medium text-indigo-600">Sábados y domingos</span>
              </div>
            )}
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="space-y-3">
          {habitoData.frecuencia === 'diario' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Frecuencia Diaria</p>
                  <p className="text-xs text-green-700 mt-1">
                    Ideal para hábitos que requieren consistencia diaria como hidratación o ejercicio.
                  </p>
                </div>
              </div>
            </div>
          )}

          {habitoData.frecuencia === 'semanal' && habitoData.diasSemana && habitoData.diasSemana.length > 3 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">Frecuencia Alta</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Con {habitoData.diasSemana.length} días por semana, este hábito tendrá un gran impacto.
                  </p>
                </div>
              </div>
            </div>
          )}

          {habitoData.frecuencia === 'semanal' && habitoData.diasSemana && habitoData.diasSemana.length < 3 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Frecuencia Baja</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Con solo {habitoData.diasSemana.length} día(s) por semana, considera aumentar la frecuencia para mejores resultados.
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

export default SelectorFrecuencia;
