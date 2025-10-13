import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Target, TrendingUp, Award, Users, MapPin, Calendar, Zap, Shield, Heart, Flag, BarChart3, PieChart, LineChart, Activity, DollarSign, Clock, Globe, Phone, MessageSquare, Camera, Video, Music, Bookmark, Tag, Layers, Grid, List, Maximize, Minimize, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SortAsc, SortDesc, ArrowUpDown, FilterX, CheckCircle, XCircle, AlertTriangle, ThumbsUp, ThumbsDown, MessageCircle, Send, Archive, Unarchive, Lock, Unlock, EyeOff, Edit3, Trash, MoreHorizontal, UserPlus, UserMinus, UserCheck, UserX, StarOff, StarHalf, TrendingDown, Database, Server, Cloud, Wifi, WifiOff, Signal, Battery, Power, Volume2, VolumeX, Mic, Headphones, Speaker, Radio, Tv, Monitor, Laptop, Smartphone, Tablet, Watch, Gamepad2, Controller, Joystick, Mouse, Keyboard, Printer, Scanner, Fax, Copier, HardDrive, SdCard, Usb, Cable, Plug, Outlet, Lightbulb, Lamp, Flashlight, Candle, Fire, Flame, Sparkles, Magic, Wand, Hat, Crown, Gem, Diamond, Ruby, Emerald, Sapphire, Topaz, Amethyst, Pearl, Opal, Jade, Coral, Amber, Ivory, Bone, Horn, Antler, Feather, Wing, Angel, Devil, Ghost, Skull, Cross, StarOfDavid, Crescent, Sun, Moon, Planet, Comet, Meteor, Asteroid, Satellite, Rocket, Spaceship, Ufo, Alien, Robot, Cyborg, Android, Ios, Windows, Linux, Mac, Chrome, Firefox, Safari, Edge, Opera, Brave, Tor, Vpn, Proxy, Firewall, ShieldCheck, ShieldAlert, ShieldX, ShieldPlus, ShieldMinus, ShieldQuestion, ShieldExclamation, ShieldInfo, ShieldBan, ShieldOff, ShieldOn, Key, LockKeyhole, UnlockKeyhole, KeyRound, KeySquare, KeyTriangle, KeyDiamond, KeyHexagon, KeyOctagon, KeyCircle, KeyOval, KeyRectangle } from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface JugadoresComparisonProps {
  jugadores: Prospecto[];
  selected: Set<string>;
  onClose: () => void;
}

const JugadoresComparison: React.FC<JugadoresComparisonProps> = ({
  jugadores,
  selected,
  onClose
}) => {
  const [comparisonMode, setComparisonMode] = useState<'detailed' | 'compact'>('detailed');
  const [selectedMetric, setSelectedMetric] = useState<string>('overall');

  const selectedJugadores = jugadores.filter(j => selected.has(j.id));

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Alto': return 'bg-green-100 text-green-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPotencialColor = (potencial: string) => {
    switch (potencial) {
      case 'Estrella': return 'bg-purple-100 text-purple-800';
      case 'Alto': return 'bg-blue-100 text-blue-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Bajo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'fichado': return 'bg-green-100 text-green-800';
      case 'seguimiento activo': return 'bg-blue-100 text-blue-800';
      case 'en evaluación': return 'bg-yellow-100 text-yellow-800';
      case 'descartado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (count: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getNivelStars = (nivel: string) => {
    switch (nivel) {
      case 'Bajo': return 2;
      case 'Medio': return 3;
      case 'Alto': return 4;
      default: return 1;
    }
  };

  const getPotencialStars = (potencial: string) => {
    switch (potencial) {
      case 'Bajo': return 2;
      case 'Medio': return 3;
      case 'Alto': return 4;
      case 'Estrella': return 5;
      default: return 1;
    }
  };

  if (selectedJugadores.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Comparación de Jugadores</h2>
              <p className="text-blue-100 mt-1">Comparando {selectedJugadores.length} jugadores</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setComparisonMode('compact')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    comparisonMode === 'compact' ? 'bg-white/20' : 'bg-white/10'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setComparisonMode('detailed')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    comparisonMode === 'detailed' ? 'bg-white/20' : 'bg-white/10'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {comparisonMode === 'detailed' ? (
            <div className="space-y-6">
              {/* Basic Info Comparison */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-500" />
                  Información Básica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {selectedJugadores.map((jugador) => (
                    <motion.div
                      key={jugador.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4">
                          {jugador.fotoUrl ? (
                            <img 
                              src={jugador.fotoUrl} 
                              alt={jugador.nombre}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Users className="w-10 h-10 text-gray-400 mx-auto mt-5" />
                          )}
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{jugador.nombre}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{jugador.edad} años</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600">{jugador.posicion}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{jugador.clubActual}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{jugador.nacionalidad}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Ratings Comparison */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-green-500" />
                  Evaluación y Potencial
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {selectedJugadores.map((jugador) => (
                    <motion.div
                      key={jugador.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900 mb-4 text-center">{jugador.nombre}</h4>
                      
                      {/* Nivel */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-600">Nivel</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getNivelColor(jugador.nivel)}`}>
                            {jugador.nivel}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          {renderStars(getNivelStars(jugador.nivel))}
                        </div>
                      </div>

                      {/* Potencial */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-600">Potencial</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPotencialColor(jugador.potencial)}`}>
                            {jugador.potencial}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          {renderStars(getPotencialStars(jugador.potencial))}
                        </div>
                      </div>

                      {/* Estado */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-600">Estado</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEstadoColor(jugador.estado)}`}>
                            {jugador.estado}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Characteristics Comparison */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-6 h-6 text-purple-500" />
                  Características Destacadas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {selectedJugadores.map((jugador) => (
                    <motion.div
                      key={jugador.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                    >
                      <h4 className="font-bold text-gray-900 mb-3 text-center">{jugador.nombre}</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {jugador.caracteristicas.map((char, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200"
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Jugador</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Edad</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Posición</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Club</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Nacionalidad</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Nivel</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Potencial</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedJugadores.map((jugador) => (
                    <tr key={jugador.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            {jugador.fotoUrl ? (
                              <img 
                                src={jugador.fotoUrl} 
                                alt={jugador.nombre}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Users className="w-6 h-6 text-gray-400 mx-auto mt-2" />
                            )}
                          </div>
                          <span className="font-semibold text-gray-900">{jugador.nombre}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{jugador.edad} años</td>
                      <td className="py-4 px-4 text-gray-700">{jugador.posicion}</td>
                      <td className="py-4 px-4 text-gray-700">{jugador.clubActual}</td>
                      <td className="py-4 px-4 text-gray-700">{jugador.nacionalidad}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getNivelColor(jugador.nivel)}`}>
                          {jugador.nivel}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPotencialColor(jugador.potencial)}`}>
                          {jugador.potencial}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEstadoColor(jugador.estado)}`}>
                          {jugador.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JugadoresComparison;



