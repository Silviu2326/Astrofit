import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, BarChart3, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProgresoMedioProps {
  progreso: number;
}

const ProgresoMedio: React.FC<ProgresoMedioProps> = ({ progreso }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast.loading('Actualizando estadísticas...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Estadísticas actualizadas');
    } catch (error) {
      toast.error('Error al actualizar estadísticas');
    } finally {
      setIsRefreshing(false);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-emerald-600';
    if (progress >= 60) return 'from-blue-500 to-indigo-600';
    if (progress >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getProgressStatus = (progress: number) => {
    if (progress >= 80) return 'Excelente';
    if (progress >= 60) return 'Bueno';
    if (progress >= 40) return 'Regular';
    return 'Necesita mejorar';
  };

  const mockStats = {
    totalLessons: 24,
    completedLessons: Math.floor((progreso / 100) * 24),
    averageTime: '2.5 horas',
    completionRate: progreso,
    engagement: Math.floor(Math.random() * 30) + 70,
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Progreso del Curso</h2>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-gray-800">Progreso General</span>
          <span className="text-lg font-bold text-gray-800">{progreso}%</span>
        </div>
        
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-6 rounded-full bg-gradient-to-r ${getProgressColor(progreso)} relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
            </motion.div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">
              {mockStats.completedLessons} de {mockStats.totalLessons} lecciones
            </span>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              progreso >= 80 ? 'bg-green-100 text-green-800' :
              progreso >= 60 ? 'bg-blue-100 text-blue-800' :
              progreso >= 40 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getProgressStatus(progreso)}
            </span>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Tiempo Promedio</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{mockStats.averageTime}</div>
          <div className="text-xs text-blue-600">por sesión</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800">Engagement</span>
          </div>
          <div className="text-2xl font-bold text-emerald-900">{mockStats.engagement}%</div>
          <div className="text-xs text-emerald-600">participación</div>
        </motion.div>
      </div>

      {/* Achievement Badge */}
      {progreso >= 50 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-yellow-800">¡Logro Desbloqueado!</div>
              <div className="text-sm text-yellow-600">
                {progreso >= 80 ? 'Curso Completado' : 
                 progreso >= 60 ? 'Progreso Avanzado' : 
                 'Progreso Intermedio'}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgresoMedio;
