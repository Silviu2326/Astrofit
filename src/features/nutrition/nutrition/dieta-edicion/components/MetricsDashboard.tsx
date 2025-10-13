import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  Clock, 
  Users, 
  Heart, 
  Flame,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { AnimatedProgress } from './MicroInteractions';

interface MetricsData {
  adherence: {
    current: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
  macros: {
    protein: { current: number; target: number; color: string };
    carbs: { current: number; target: number; color: string };
    fats: { current: number; target: number; color: string };
  };
  calories: {
    current: number;
    target: number;
    deficit: number;
    trend: 'up' | 'down' | 'stable';
  };
  weeklyProgress: Array<{
    day: string;
    adherence: number;
    calories: number;
    protein: number;
  }>;
  goals: {
    weightLoss: { target: number; current: number; progress: number };
    muscleGain: { target: number; current: number; progress: number };
    energy: { level: number; trend: 'up' | 'down' | 'stable' };
  };
}

interface MetricsDashboardProps {
  data: MetricsData;
  onMetricClick?: (metric: string) => void;
  className?: string;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  data,
  onMetricClick,
  className = ''
}) => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
    }
  };

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: 'up' | 'down' | 'stable';
    change?: number;
    icon: React.ReactNode;
    color: string;
    onClick?: () => void;
    children?: React.ReactNode;
  }> = ({ title, value, subtitle, trend, change, icon, color, onClick, children }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-6 shadow-lg border border-gray-100
        ${onClick ? 'cursor-pointer hover:shadow-xl transition-all duration-300' : ''}
        ${activeMetric === title ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <div className={`${color.replace('bg-', 'text-')}`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            {getTrendIcon(trend)}
            {change !== undefined && (
              <span className={`text-sm font-semibold ${getTrendColor(trend)}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>

      {children}
    </motion.div>
  );

  const MacroRing: React.FC<{
    current: number;
    target: number;
    color: string;
    label: string;
    unit: string;
  }> = ({ current, target, color, label, unit }) => {
    const percentage = Math.min((current / target) * 100, 100);
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center space-y-2">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={color}
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{Math.round(percentage)}%</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-900">
            {current}/{target} {unit}
          </div>
          <div className="text-xs text-gray-500">
            {current > target ? `+${current - target}` : target - current} {unit} {current > target ? 'extra' : 'restante'}
          </div>
        </div>
      </div>
    );
  };

  const WeeklyChart: React.FC<{ data: MetricsData['weeklyProgress'] }> = ({ data }) => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">Progreso Semanal</h4>
      <div className="grid grid-cols-7 gap-2">
        {data.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center space-y-2"
          >
            <div className="text-xs font-medium text-gray-600">{day.day}</div>
            <div className="space-y-1">
              {/* Adherence bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${day.adherence}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${
                    day.adherence >= 80 ? 'bg-green-500' :
                    day.adherence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>
              {/* Calories indicator */}
              <div className="text-xs text-gray-500">{day.calories} kcal</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Métricas de Seguimiento</h2>
          <p className="text-gray-600">Análisis detallado del progreso nutricional</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'overview'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'detailed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Detallado
          </button>
        </div>
      </div>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <MetricCard
            title="Adherencia"
            value={`${data.adherence.current}%`}
            subtitle={`Objetivo: ${data.adherence.target}%`}
            trend={data.adherence.trend}
            change={data.adherence.change}
            icon={<Target className="w-6 h-6" />}
            color="text-blue-500"
            onClick={() => setActiveMetric(activeMetric === 'Adherencia' ? null : 'Adherencia')}
          >
            <AnimatedProgress
              value={data.adherence.current}
              max={100}
              color="blue"
              className="mt-4"
            />
          </MetricCard>

          <MetricCard
            title="Calorías"
            value={data.calories.current}
            subtitle={`Objetivo: ${data.calories.target} kcal`}
            trend={data.calories.trend}
            icon={<Flame className="w-6 h-6" />}
            color="text-orange-500"
          />

          <MetricCard
            title="Déficit Calórico"
            value={`${data.calories.deficit} kcal`}
            subtitle="Déficit diario promedio"
            icon={<TrendingDown className="w-6 h-6" />}
            color="text-green-500"
          />

          <MetricCard
            title="Energía"
            value={`${data.goals.energy.level}%`}
            subtitle="Nivel de energía"
            trend={data.goals.energy.trend}
            icon={<Zap className="w-6 h-6" />}
            color="text-yellow-500"
          />
        </motion.div>
      )}

      {/* Detailed Mode */}
      {viewMode === 'detailed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Macros Ring Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribución de Macros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MacroRing
                current={data.macros.protein.current}
                target={data.macros.protein.target}
                color="text-red-500"
                label="Proteína"
                unit="g"
              />
              <MacroRing
                current={data.macros.carbs.current}
                target={data.macros.carbs.target}
                color="text-amber-500"
                label="Carbohidratos"
                unit="g"
              />
              <MacroRing
                current={data.macros.fats.current}
                target={data.macros.fats.target}
                color="text-purple-500"
                label="Grasas"
                unit="g"
              />
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <WeeklyChart data={data.weeklyProgress} />
          </div>

          {/* Goals Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Objetivos de Peso</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Pérdida de Peso</span>
                    <span className="text-sm font-bold text-gray-900">
                      {data.goals.weightLoss.current}kg / {data.goals.weightLoss.target}kg
                    </span>
                  </div>
                  <AnimatedProgress
                    value={data.goals.weightLoss.progress}
                    max={100}
                    color="green"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Ganancia Muscular</span>
                    <span className="text-sm font-bold text-gray-900">
                      {data.goals.muscleGain.current}kg / {data.goals.muscleGain.target}kg
                    </span>
                  </div>
                  <AnimatedProgress
                    value={data.goals.muscleGain.progress}
                    max={100}
                    color="blue"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Insights</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm font-medium text-green-800">Excelente adherencia</div>
                    <div className="text-xs text-green-600">Mantén el ritmo actual</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="text-sm font-medium text-yellow-800">Proteína baja</div>
                    <div className="text-xs text-yellow-600">Considera añadir más proteína</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-blue-800">Energía estable</div>
                    <div className="text-xs text-blue-600">Tu plan está funcionando bien</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Hook para datos mock
export const useMetricsData = (): MetricsData => {
  return {
    adherence: {
      current: 87,
      target: 85,
      trend: 'up',
      change: 5.2
    },
    macros: {
      protein: { current: 145, target: 150, color: 'text-red-500' },
      carbs: { current: 180, target: 200, color: 'text-amber-500' },
      fats: { current: 65, target: 70, color: 'text-purple-500' }
    },
    calories: {
      current: 1850,
      target: 2000,
      deficit: 150,
      trend: 'stable'
    },
    weeklyProgress: [
      { day: 'L', adherence: 90, calories: 1950, protein: 150 },
      { day: 'M', adherence: 85, calories: 1800, protein: 140 },
      { day: 'X', adherence: 95, calories: 2000, protein: 160 },
      { day: 'J', adherence: 80, calories: 1750, protein: 135 },
      { day: 'V', adherence: 88, calories: 1900, protein: 145 },
      { day: 'S', adherence: 92, calories: 2050, protein: 155 },
      { day: 'D', adherence: 85, calories: 1850, protein: 140 }
    ],
    goals: {
      weightLoss: { target: 5, current: 3.2, progress: 64 },
      muscleGain: { target: 2, current: 1.1, progress: 55 },
      energy: { level: 78, trend: 'stable' }
    }
  };
};


