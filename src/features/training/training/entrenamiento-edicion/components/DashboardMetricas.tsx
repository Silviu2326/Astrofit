import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, Heart, Target, Flame, TrendingUp, TrendingDown, 
  Calendar, Clock, Zap, Award, Activity, BarChart3, 
  ChevronUp, ChevronDown, Eye, EyeOff 
} from 'lucide-react';
import { MetricasEntrenamiento } from '../types';

interface DashboardMetricasProps {
  totalesDia: MetricasEntrenamiento;
  totalesSemana: MetricasEntrenamiento;
  objetivosDia: any;
  objetivosSemana: any;
  onMetricaClick?: (metrica: string) => void;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

interface MetricaCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: string;
  bgColor: string;
  onClick?: () => void;
  isClickable?: boolean;
}

const MetricaCard: React.FC<MetricaCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  trend,
  trendValue,
  color,
  bgColor,
  onClick,
  isClickable = false
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
      case 'down':
        return trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 ${
        isClickable ? 'cursor-pointer hover:shadow-xl' : ''
      }`}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        {isClickable && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-400" />
          </motion.button>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <motion.p 
          className="text-3xl font-bold text-gray-900"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.p>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const DashboardMetricas: React.FC<DashboardMetricasProps> = ({
  totalesDia,
  totalesSemana,
  objetivosDia,
  objetivosSemana,
  onMetricaClick,
  showDetails = false,
  onToggleDetails
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const metricas = [
    {
      id: 'volumen',
      icon: <Dumbbell className="w-6 h-6 text-orange-600" />,
      title: 'Volumen Total',
      value: `${totalesDia.volumenTotal.toLocaleString()}kg`,
      subtitle: `Objetivo: ${objetivosDia.volumen}kg`,
      trend: totalesDia.volumenTotal > objetivosDia.volumen ? 'up' : 'down',
      trendValue: `+${((totalesDia.volumenTotal / objetivosDia.volumen - 1) * 100).toFixed(1)}%`,
      color: '#f97316',
      bgColor: 'bg-orange-100'
    },
    {
      id: 'intensidad',
      icon: <Heart className="w-6 h-6 text-red-600" />,
      title: 'Intensidad Promedio',
      value: `${totalesDia.intensidadPromedio}/10`,
      subtitle: `Objetivo: ${objetivosDia.intensidad}/10`,
      trend: totalesDia.intensidadPromedio > objetivosDia.intensidad ? 'up' : 'down',
      trendValue: `${totalesDia.intensidadPromedio > objetivosDia.intensidad ? '+' : ''}${(totalesDia.intensidadPromedio - objetivosDia.intensidad).toFixed(1)}`,
      color: '#dc2626',
      bgColor: 'bg-red-100'
    },
    {
      id: 'adherencia',
      icon: <Target className="w-6 h-6 text-green-600" />,
      title: 'Adherencia',
      value: `${totalesDia.adherencia}%`,
      subtitle: `Objetivo: ${objetivosDia.adherencia}%`,
      trend: totalesDia.adherencia > objetivosDia.adherencia ? 'up' : 'down',
      trendValue: `${totalesDia.adherencia > objetivosDia.adherencia ? '+' : ''}${totalesDia.adherencia - objetivosDia.adherencia}%`,
      color: '#16a34a',
      bgColor: 'bg-green-100'
    },
    {
      id: 'calorias',
      icon: <Flame className="w-6 h-6 text-purple-600" />,
      title: 'Calorías Quemadas',
      value: `${totalesDia.caloriasQuemadas}`,
      subtitle: `Objetivo: ${objetivosDia.calorias}`,
      trend: totalesDia.caloriasQuemadas > objetivosDia.calorias ? 'up' : 'down',
      trendValue: `${totalesDia.caloriasQuemadas > objetivosDia.calorias ? '+' : ''}${totalesDia.caloriasQuemadas - objetivosDia.calorias}`,
      color: '#9333ea',
      bgColor: 'bg-purple-100'
    }
  ];

  const metricasSemana = [
    {
      id: 'volumen-semana',
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: 'Volumen Semanal',
      value: `${totalesSemana.volumenTotal.toLocaleString()}kg`,
      subtitle: `Objetivo: ${objetivosSemana.volumen}kg`,
      trend: totalesSemana.volumenTotal > objetivosSemana.volumen ? 'up' : 'down',
      trendValue: `+${((totalesSemana.volumenTotal / objetivosSemana.volumen - 1) * 100).toFixed(1)}%`,
      color: '#2563eb',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'frecuencia',
      icon: <Calendar className="w-6 h-6 text-indigo-600" />,
      title: 'Frecuencia',
      value: `${totalesSemana.frecuencia} sesiones`,
      subtitle: `Objetivo: ${objetivosSemana.frecuencia} sesiones`,
      trend: totalesSemana.frecuencia > objetivosSemana.frecuencia ? 'up' : 'down',
      trendValue: `${totalesSemana.frecuencia > objetivosSemana.frecuencia ? '+' : ''}${totalesSemana.frecuencia - objetivosSemana.frecuencia}`,
      color: '#4f46e5',
      bgColor: 'bg-indigo-100'
    },
    {
      id: 'tiempo',
      icon: <Clock className="w-6 h-6 text-cyan-600" />,
      title: 'Tiempo Total',
      value: `${Math.floor(totalesSemana.tiempoTotal / 60)}h ${totalesSemana.tiempoTotal % 60}m`,
      subtitle: `Objetivo: ${objetivosSemana.duracion}h`,
      trend: totalesSemana.tiempoTotal > objetivosSemana.duracion * 60 ? 'up' : 'down',
      trendValue: `${totalesSemana.tiempoTotal > objetivosSemana.duracion * 60 ? '+' : ''}${Math.floor((totalesSemana.tiempoTotal - objetivosSemana.duracion * 60) / 60)}h`,
      color: '#0891b2',
      bgColor: 'bg-cyan-100'
    },
    {
      id: 'progreso',
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      title: 'Progreso General',
      value: `${totalesSemana.progreso}%`,
      subtitle: 'Cumplimiento de objetivos',
      trend: totalesSemana.progreso > 80 ? 'up' : totalesSemana.progreso > 60 ? 'neutral' : 'down',
      trendValue: totalesSemana.progreso > 80 ? 'Excelente' : totalesSemana.progreso > 60 ? 'Bueno' : 'Mejorable',
      color: '#ca8a04',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Métricas de Entrenamiento</h3>
            <p className="text-sm text-gray-600">Seguimiento en tiempo real</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-all flex items-center gap-2"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {isExpanded ? 'Contraer' : 'Expandir'}
          </motion.button>
          
          {onToggleDetails && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleDetails}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-xl font-semibold text-blue-700 transition-all flex items-center gap-2"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showDetails ? 'Ocultar' : 'Detalles'}
            </motion.button>
          )}
        </div>
      </div>

      {/* Métricas del día */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Hoy
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricas.map((metrica) => (
            <MetricaCard
              key={metrica.id}
              {...metrica}
              onClick={() => onMetricaClick?.(metrica.id)}
              isClickable={!!onMetricaClick}
            />
          ))}
        </div>
      </div>

      {/* Métricas de la semana (expandible) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Esta Semana
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metricasSemana.map((metrica) => (
                <MetricaCard
                  key={metrica.id}
                  {...metrica}
                  onClick={() => onMetricaClick?.(metrica.id)}
                  isClickable={!!onMetricaClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resumen de rendimiento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">Resumen de Rendimiento</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {totalesSemana.progreso}%
            </div>
            <div className="text-sm text-gray-600">Cumplimiento General</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {totalesSemana.frecuencia}
            </div>
            <div className="text-sm text-gray-600">Sesiones Completadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {totalesSemana.caloriasQuemadas}
            </div>
            <div className="text-sm text-gray-600">Calorías Quemadas</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardMetricas;

