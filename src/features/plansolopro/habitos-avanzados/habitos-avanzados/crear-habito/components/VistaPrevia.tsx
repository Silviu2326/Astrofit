import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Target, 
  Calendar, 
  Clock, 
  Star, 
  Trophy,
  CheckCircle,
  Bell,
  Users,
  TrendingUp,
  Zap,
  Heart,
  Dumbbell,
  Apple,
  Brain,
  Moon
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

interface VistaPreviaProps {
  habitoData: HabitoData;
}

const VistaPrevia: React.FC<VistaPreviaProps> = ({ habitoData }) => {
  const getCategoriaIcon = (categoria: string) => {
    const iconos: Record<string, React.ComponentType<any>> = {
      salud: Heart,
      fitness: Dumbbell,
      nutricion: Apple,
      mental: Brain,
      productividad: Zap,
      sueño: Moon,
    };
    return iconos[categoria] || Target;
  };

  const getDificultadColor = (dificultad: string) => {
    const colores: Record<string, string> = {
      facil: 'green',
      medio: 'yellow',
      dificil: 'red',
    };
    return colores[dificultad] || 'gray';
  };

  const getDiasSemana = (dias: number[]) => {
    const diasNombres = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return dias.map(dia => diasNombres[dia]).join(', ');
  };

  const CategoriaIcon = getCategoriaIcon(habitoData.categoria);
  const dificultadColor = getDificultadColor(habitoData.dificultad);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
          <Eye className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Vista Previa del Hábito</h2>
      </div>

      {/* Tarjeta del Hábito */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6 rounded-xl text-white relative overflow-hidden mb-6">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CategoriaIcon className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">Hábito de {habitoData.categoria}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-${dificultadColor}-100 text-${dificultadColor}-700`}>
              {habitoData.dificultad.toUpperCase()}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-2">
            {habitoData.nombre || 'Nombre del Hábito'}
          </h3>

          <p className="text-sm opacity-90 mb-4">
            {habitoData.descripcion || 'Descripción del hábito'}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 opacity-75" />
              <span className="opacity-90">
                {habitoData.objetivo} {habitoData.tipoObjetivo}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-75" />
              <span className="opacity-90">
                {habitoData.duracion} días
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalles del Hábito */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración del Hábito</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Frecuencia</span>
            </div>
            <p className="text-sm text-gray-600 capitalize">
              {habitoData.frecuencia === 'semanal' && habitoData.diasSemana.length > 0
                ? `${habitoData.frecuencia} (${getDiasSemana(habitoData.diasSemana)})`
                : habitoData.frecuencia
              }
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">Recordatorio</span>
            </div>
            <p className="text-sm text-gray-600">
              {habitoData.recordatorios ? habitoData.horaRecordatorio : 'Sin recordatorio'}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-700">Recompensa</span>
          </div>
          <p className="text-sm text-gray-600">
            {habitoData.recompensa || 'Sin recompensa definida'}
          </p>
        </div>

        {/* Progreso Simulado */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-3">Progreso del Cliente</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Día actual:</span>
              <span className="text-sm font-semibold">Día 7 de {habitoData.duracion}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(7 / habitoData.duracion) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completado hoy:</span>
              <span className="text-sm font-semibold text-green-600">✓ {habitoData.objetivo} {habitoData.tipoObjetivo}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Racha actual:</span>
              <span className="text-sm font-semibold text-blue-600">5 días consecutivos</span>
            </div>
          </div>
        </div>

        {/* Estadísticas del Hábito */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">Tasa de Éxito</span>
            </div>
            <p className="text-2xl font-bold text-green-600">85%</p>
            <p className="text-xs text-gray-600">Últimos 30 días</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">Participantes</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">24</p>
            <p className="text-xs text-gray-600">Clientes activos</p>
          </div>
        </div>

        {/* Notificaciones */}
        {habitoData.notificaciones && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Bell className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-800">Notificaciones Habilitadas</p>
                <p className="text-xs text-yellow-700 mt-1">
                  El cliente recibirá recordatorios y notificaciones de progreso
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800 text-center">
          <strong>Vista del Cliente:</strong> Así es como aparecerá este hábito en la app de tus clientes.
        </p>
      </div>
    </motion.div>
  );
};

export default VistaPrevia;
