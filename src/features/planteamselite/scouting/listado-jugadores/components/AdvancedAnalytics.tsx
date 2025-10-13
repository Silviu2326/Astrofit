import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown, Users, Target, Award, Star, 
  Activity, Zap, Shield, Heart, Flag, DollarSign, Clock, Globe, Phone, MessageSquare, 
  Camera, Video, Music, Bookmark, Tag, Layers, Grid, List, Maximize, Minimize, 
  RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SortAsc, 
  SortDesc, ArrowUpDown, FilterX, CheckCircle, XCircle, AlertTriangle, ThumbsUp, 
  ThumbsDown, MessageCircle, Send, Archive, Unarchive, Lock, Unlock, EyeOff, 
  Edit3, Trash, MoreHorizontal, UserPlus, UserMinus, UserCheck, UserX, StarOff, 
  StarHalf, Database, Server, Cloud, Wifi, WifiOff, Signal, Battery, Power, 
  Volume2, VolumeX, Mic, Headphones, Speaker, Radio, Tv, Monitor, Laptop, 
  Smartphone, Tablet, Watch, Gamepad2, Controller, Joystick, Mouse, Keyboard, 
  Printer, Scanner, Fax, Copier, HardDrive, SdCard, Usb, Cable, Plug, Outlet, 
  Lightbulb, Lamp, Flashlight, Candle, Fire, Flame, Sparkles, Magic, Wand, 
  Hat, Crown, Gem, Diamond, Ruby, Emerald, Sapphire, Topaz, Amethyst, Pearl, 
  Opal, Jade, Coral, Amber, Ivory, Bone, Horn, Antler, Feather, Wing, Angel, 
  Devil, Ghost, Skull, Cross, StarOfDavid, Crescent, Sun, Moon, Planet, Comet, 
  Meteor, Asteroid, Satellite, Rocket, Spaceship, Ufo, Alien, Robot, Cyborg, 
  Android, Ios, Windows, Linux, Mac, Chrome, Firefox, Safari, Edge, Opera, 
  Brave, Tor, Vpn, Proxy, Firewall, ShieldCheck, ShieldAlert, ShieldX, ShieldPlus, 
  ShieldMinus, ShieldQuestion, ShieldExclamation, ShieldInfo, ShieldBan, ShieldOff, 
  ShieldOn, Key, LockKeyhole, UnlockKeyhole, KeyRound, KeySquare, KeyTriangle, 
  KeyDiamond, KeyHexagon, KeyOctagon, KeyCircle, KeyOval, KeyRectangle
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface AdvancedAnalyticsProps {
  jugadores: Prospecto[];
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ jugadores }) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');
  const [timeRange, setTimeRange] = useState<string>('30d');

  // Calculate statistics
  const stats = {
    total: jugadores.length,
    seguimientoActivo: jugadores.filter(j => j.estado === 'seguimiento activo').length,
    enEvaluacion: jugadores.filter(j => j.estado === 'en evaluación').length,
    fichados: jugadores.filter(j => j.estado === 'fichado').length,
    descartados: jugadores.filter(j => j.estado === 'descartado').length,
    estrellas: jugadores.filter(j => j.potencial === 'Estrella').length,
    altoNivel: jugadores.filter(j => j.nivel === 'Alto').length,
    promedioEdad: Math.round(jugadores.reduce((acc, j) => acc + j.edad, 0) / jugadores.length),
  };

  const posiciones = jugadores.reduce((acc, j) => {
    acc[j.posicion] = (acc[j.posicion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const nacionalidades = jugadores.reduce((acc, j) => {
    acc[j.nacionalidad] = (acc[j.nacionalidad] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const clubs = jugadores.reduce((acc, j) => {
    acc[j.clubActual] = (acc[j.clubActual] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const metricCards = [
    {
      title: 'Total Jugadores',
      value: stats.total,
      icon: Users,
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'En Seguimiento',
      value: stats.seguimientoActivo,
      icon: Activity,
      color: 'green',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Estrellas',
      value: stats.estrellas,
      icon: Star,
      color: 'yellow',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Fichados',
      value: stats.fichados,
      icon: Award,
      color: 'purple',
      change: '+5%',
      trend: 'up'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800',
      red: 'bg-red-100 text-red-800',
      indigo: 'bg-indigo-100 text-indigo-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-blue-500" />
              Analytics Avanzados
            </h2>
            <p className="text-gray-600 mt-1">Análisis detallado del rendimiento y tendencias</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="1y">Último año</option>
            </select>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(card.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    {card.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${
                      card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
                <p className="text-gray-600 text-sm">{card.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Position Distribution */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-500" />
            Distribución por Posición
          </h3>
          <div className="space-y-4">
            {Object.entries(posiciones).map(([posicion, count], index) => {
              const percentage = (count / jugadores.length) * 100;
              return (
                <motion.div
                  key={posicion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">{posicion}</span>
                    <span className="text-sm text-gray-600">{count} jugadores</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Nationality Distribution */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-green-500" />
            Distribución por Nacionalidad
          </h3>
          <div className="space-y-4">
            {Object.entries(nacionalidades)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([nacionalidad, count], index) => {
                const percentage = (count / jugadores.length) * 100;
                return (
                  <motion.div
                    key={nacionalidad}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">{nacionalidad}</span>
                      <span className="text-sm text-gray-600">{count} jugadores</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Age Distribution */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-purple-500" />
          Distribución por Edad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { range: '16-20', min: 16, max: 20, color: 'blue' },
            { range: '21-25', min: 21, max: 25, color: 'green' },
            { range: '26-30', min: 26, max: 30, color: 'yellow' },
            { range: '31+', min: 31, max: 50, color: 'red' }
          ].map((ageGroup, index) => {
            const count = jugadores.filter(j => j.edad >= ageGroup.min && j.edad <= ageGroup.max).length;
            const percentage = (count / jugadores.length) * 100;
            return (
              <motion.div
                key={ageGroup.range}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center"
              >
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  ageGroup.color === 'blue' ? 'bg-blue-100' :
                  ageGroup.color === 'green' ? 'bg-green-100' :
                  ageGroup.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <Users className={`w-8 h-8 ${
                    ageGroup.color === 'blue' ? 'text-blue-600' :
                    ageGroup.color === 'green' ? 'text-green-600' :
                    ageGroup.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-1">{count}</h4>
                <p className="text-gray-600 text-sm mb-2">{ageGroup.range} años</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className={`h-2 rounded-full ${
                      ageGroup.color === 'blue' ? 'bg-blue-500' :
                      ageGroup.color === 'green' ? 'bg-green-500' :
                      ageGroup.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{percentage.toFixed(1)}%</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-indigo-500" />
          Métricas de Rendimiento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{stats.promedioEdad}</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Edad Promedio</h4>
            <p className="text-gray-600 text-sm">Años</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {((stats.seguimientoActivo / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Tasa de Seguimiento</h4>
            <p className="text-gray-600 text-sm">Jugadores activos</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {((stats.estrellas / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Tasa de Estrellas</h4>
            <p className="text-gray-600 text-sm">Potencial estrella</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;



