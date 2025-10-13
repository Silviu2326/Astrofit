import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, TrendingUp, Calendar, Target, Dumbbell, 
  Heart, Flame, Zap, Award, Star, Bell, Settings 
} from 'lucide-react';
import { ClienteEntrenamiento, EstadoLiveSync } from '../types';

interface HeaderMejoradoProps {
  cliente: ClienteEntrenamiento;
  semanaActual: number;
  fechaInicio: string;
  fechaFin: string;
  progreso: number;
  liveSyncState: EstadoLiveSync;
  onOpenPlantillas: () => void;
  onOpenMacroBrush: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicateWeek: () => void;
  onBatchToggle: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onGoToToday: () => void;
  batchModeActive: boolean;
}

export const HeaderMejorado: React.FC<HeaderMejoradoProps> = ({
  cliente,
  semanaActual,
  fechaInicio,
  fechaFin,
  progreso,
  liveSyncState,
  onOpenPlantillas,
  onOpenMacroBrush,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onDuplicateWeek,
  onBatchToggle,
  onPrevWeek,
  onNextWeek,
  onGoToToday,
  batchModeActive
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getProgresoColor = (progreso: number) => {
    if (progreso >= 80) return 'from-green-500 to-emerald-500';
    if (progreso >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getSyncStatus = () => {
    switch (liveSyncState.estado) {
      case 'guardando':
        return { text: 'Guardando...', color: 'text-yellow-600', icon: '⏳' };
      case 'guardado':
        return { text: 'Guardado', color: 'text-green-600', icon: '✅' };
      case 'error':
        return { text: 'Error', color: 'text-red-600', icon: '❌' };
      default:
        return { text: 'Sin cambios', color: 'text-gray-600', icon: '💤' };
    }
  };

  const syncStatus = getSyncStatus();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 shadow-2xl"
    >
      <div className="p-6">
        {/* Información del cliente con avatar y progreso */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.img 
                src={cliente.avatar || '/default-avatar.png'} 
                className="w-20 h-20 rounded-2xl border-4 border-white/30 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.div 
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            <div>
              <motion.h1 
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {cliente.nombre}
              </motion.h1>
              <div className="flex gap-3 mb-2">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white border border-white/30">
                  {cliente.nivel?.charAt(0).toUpperCase() + cliente.nivel?.slice(1)}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white border border-white/30">
                  Semana {semanaActual}
                </span>
                {batchModeActive && (
                  <span className="px-4 py-2 bg-yellow-500/80 backdrop-blur-sm rounded-full text-sm font-semibold text-white border border-yellow-300/50">
                    Modo Batch
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(fechaInicio)} - {formatDate(fechaFin)}</span>
              </div>
            </div>
          </div>
          
          {/* Progreso visual mejorado */}
          <div className="text-right text-white">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-6 h-6" />
              <span className="text-lg font-semibold">Progreso Semanal</span>
            </div>
            <div className="w-40 bg-white/20 rounded-full h-4 mb-3 shadow-inner">
              <motion.div 
                className={`h-4 rounded-full bg-gradient-to-r ${getProgresoColor(progreso)} shadow-lg`}
                initial={{ width: 0 }}
                animate={{ width: `${progreso}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <motion.p 
              className="text-3xl font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progreso}%
            </motion.p>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className={syncStatus.color}>{syncStatus.icon}</span>
              <span className={syncStatus.color}>{syncStatus.text}</span>
            </div>
          </div>
        </div>

        {/* Barra de navegación y acciones */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            {/* Navegación de semanas */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPrevWeek}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all text-white"
              >
                <TrendingUp className="w-5 h-5 rotate-90" />
              </motion.button>
              
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((semana) => (
                  <motion.button
                    key={semana}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => semana !== semanaActual && (semana < semanaActual ? onPrevWeek() : onNextWeek())}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                      semana === semanaActual
                        ? 'bg-white text-orange-600 shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    S{semana}
                  </motion.button>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNextWeek}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all text-white"
              >
                <TrendingUp className="w-5 h-5 -rotate-90" />
              </motion.button>
            </div>

            {/* Acciones principales */}
            <div className="flex items-center gap-3">
              {/* Undo/Redo */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onUndo}
                  disabled={!canUndo}
                  className={`p-2 rounded-lg transition-all ${
                    canUndo 
                      ? 'bg-white/20 hover:bg-white/30 text-white' 
                      : 'bg-white/10 text-white/50 cursor-not-allowed'
                  }`}
                >
                  ↶
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRedo}
                  disabled={!canRedo}
                  className={`p-2 rounded-lg transition-all ${
                    canRedo 
                      ? 'bg-white/20 hover:bg-white/30 text-white' 
                      : 'bg-white/10 text-white/50 cursor-not-allowed'
                  }`}
                >
                  ↷
                </motion.button>
              </div>

              {/* Acciones rápidas */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenPlantillas}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                Plantillas IA
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenMacroBrush}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                Ajuste Rápido
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBatchToggle}
                className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  batchModeActive
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                Batch
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderMejorado;

