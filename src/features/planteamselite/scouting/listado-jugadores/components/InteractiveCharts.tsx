import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown, 
  Target, Users, Star, MapPin, Calendar, Globe, Award,
  Activity, Zap, Shield, Heart, DollarSign, Clock,
  ChevronLeft, ChevronRight, Maximize, Minimize, RotateCcw
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface InteractiveChartsProps {
  jugadores: Prospecto[];
}

interface ChartData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

const InteractiveCharts: React.FC<InteractiveChartsProps> = ({ jugadores }) => {
  const [activeChart, setActiveChart] = useState<string>('positions');
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Calculate chart data
  const chartData = useMemo(() => {
    const positions = jugadores.reduce((acc, j) => {
      acc[j.posicion] = (acc[j.posicion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const nacionalidades = jugadores.reduce((acc, j) => {
      acc[j.nacionalidad] = (acc[j.nacionalidad] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const niveles = jugadores.reduce((acc, j) => {
      acc[j.nivel] = (acc[j.nivel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const estados = jugadores.reduce((acc, j) => {
      acc[j.estado] = (acc[j.estado] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const edades = jugadores.reduce((acc, j) => {
      const range = j.edad <= 20 ? '16-20' : j.edad <= 25 ? '21-25' : j.edad <= 30 ? '26-30' : '31+';
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      positions: Object.entries(positions).map(([label, value], index) => ({
        label,
        value,
        color: `hsl(${index * 60}, 70%, 50%)`,
        percentage: (value / jugadores.length) * 100
      })),
      nacionalidades: Object.entries(nacionalidades).map(([label, value], index) => ({
        label,
        value,
        color: `hsl(${index * 45}, 70%, 50%)`,
        percentage: (value / jugadores.length) * 100
      })),
      niveles: Object.entries(niveles).map(([label, value], index) => ({
        label,
        value,
        color: `hsl(${index * 120}, 70%, 50%)`,
        percentage: (value / jugadores.length) * 100
      })),
      estados: Object.entries(estados).map(([label, value], index) => ({
        label,
        value,
        color: `hsl(${index * 90}, 70%, 50%)`,
        percentage: (value / jugadores.length) * 100
      })),
      edades: Object.entries(edades).map(([label, value], index) => ({
        label,
        value,
        color: `hsl(${index * 30}, 70%, 50%)`,
        percentage: (value / jugadores.length) * 100
      }))
    };
  }, [jugadores]);

  const currentData = chartData[activeChart as keyof typeof chartData] || [];

  const renderBarChart = (data: ChartData[]) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{item.value} jugadores</span>
                <span className="text-sm font-semibold text-gray-900">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className="h-full rounded-full relative"
                style={{ backgroundColor: item.color }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderPieChart = (data: ChartData[]) => {
    let cumulativePercentage = 0;
    
    return (
      <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {data.map((item, index) => {
            const startAngle = cumulativePercentage * 3.6;
            const endAngle = (cumulativePercentage + item.percentage) * 3.6;
            cumulativePercentage += item.percentage;
            
            const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArcFlag = item.percentage > 50 ? 1 : 0;
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            return (
              <motion.path
                key={item.label}
                d={pathData}
                fill={item.color}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="hover:opacity-80 cursor-pointer transition-opacity"
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{jugadores.length}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
      </div>
    );
  };

  const renderLineChart = (data: ChartData[]) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((item, index) => ({
      x: (index / (data.length - 1)) * 100,
      y: 100 - (item.value / maxValue) * 100
    }));
    
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
    
    return (
      <div className="w-full h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d={pathData}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#3B82F6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="hover:r-4 cursor-pointer transition-all"
            />
          ))}
        </svg>
      </div>
    );
  };

  const chartTypes = [
    { id: 'positions', label: 'Posiciones', icon: Target },
    { id: 'nacionalidades', label: 'Nacionalidades', icon: Globe },
    { id: 'niveles', label: 'Niveles', icon: Star },
    { id: 'estados', label: 'Estados', icon: Activity },
    { id: 'edades', label: 'Edades', icon: Calendar }
  ];

  return (
    <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50' : ''
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Visualización Interactiva</h2>
              <p className="text-blue-100">Análisis visual de datos de jugadores</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Chart Type Selector */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded-lg transition-all ${
                chartType === 'bar' ? 'bg-white shadow-md' : 'text-gray-600'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`px-4 py-2 rounded-lg transition-all ${
                chartType === 'pie' ? 'bg-white shadow-md' : 'text-gray-600'
              }`}
            >
              <PieChart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded-lg transition-all ${
                chartType === 'line' ? 'bg-white shadow-md' : 'text-gray-600'
              }`}
            >
              <LineChart className="w-5 h-5" />
            </button>
          </div>

          {/* Data Type Selector */}
          <div className="flex items-center gap-2">
            {chartTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveChart(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    activeChart === type.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {type.label}
                </button>
              );
            })}
          </div>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
            <option value="1y">Último año</option>
          </select>
        </div>

        {/* Chart Content */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {chartTypes.find(t => t.id === activeChart)?.label} - {chartType.toUpperCase()}
            </h3>
            <div className="text-sm text-gray-600">
              {currentData.length} categorías • {jugadores.length} total
            </div>
          </div>

          <div className="min-h-[400px] flex items-center justify-center">
            {chartType === 'bar' && renderBarChart(currentData)}
            {chartType === 'pie' && renderPieChart(currentData)}
            {chartType === 'line' && renderLineChart(currentData)}
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {currentData.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.value} ({item.percentage.toFixed(1)}%)</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{jugadores.length}</div>
                <div className="text-sm text-gray-600">Total Jugadores</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(jugadores.reduce((acc, j) => acc + j.edad, 0) / jugadores.length)}
                </div>
                <div className="text-sm text-gray-600">Edad Promedio</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {jugadores.filter(j => j.potencial === 'Estrella').length}
                </div>
                <div className="text-sm text-gray-600">Estrellas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCharts;



