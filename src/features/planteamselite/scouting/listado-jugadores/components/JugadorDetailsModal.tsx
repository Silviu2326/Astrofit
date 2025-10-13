import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Target, TrendingUp, Award, Users, MapPin, Calendar, Zap, Shield, Heart, Flag, BarChart3, PieChart, LineChart, Activity, DollarSign, Clock, Globe, Phone, MessageSquare, Camera, Video, Music, Bookmark, Tag, Layers, Grid, List, Maximize, Minimize, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, SortAsc, SortDesc, ArrowUpDown, FilterX, CheckCircle, XCircle, AlertTriangle, ThumbsUp, ThumbsDown, MessageCircle, Send, Archive, Unarchive, Lock, Unlock, EyeOff, Edit3, Trash, MoreHorizontal, UserPlus, UserMinus, UserCheck, UserX, StarOff, StarHalf, TrendingDown, Database, Server, Cloud, Wifi, WifiOff, Signal, Battery, Power, Volume2, VolumeX, Mic, Headphones, Speaker, Radio, Tv, Monitor, Laptop, Smartphone, Tablet, Watch, Gamepad2, Controller, Joystick, Mouse, Keyboard, Printer, Scanner, Fax, Copier, HardDrive, SdCard, Usb, Cable, Plug, Outlet, Lightbulb, Lamp, Flashlight, Candle, Fire, Flame, Sparkles, Magic, Wand, Hat, Crown, Gem, Diamond, Ruby, Emerald, Sapphire, Topaz, Amethyst, Pearl, Opal, Jade, Coral, Amber, Ivory, Bone, Horn, Antler, Feather, Wing, Angel, Devil, Ghost, Skull, Cross, StarOfDavid, Crescent, Sun, Moon, Planet, Comet, Meteor, Asteroid, Satellite, Rocket, Spaceship, Ufo, Alien, Robot, Cyborg, Android, Ios, Windows, Linux, Mac, Chrome, Firefox, Safari, Edge, Opera, Brave, Tor, Vpn, Proxy, Firewall, ShieldCheck, ShieldAlert, ShieldX, ShieldPlus, ShieldMinus, ShieldQuestion, ShieldExclamation, ShieldInfo, ShieldBan, ShieldOff, ShieldOn, Key, LockKeyhole, UnlockKeyhole, KeyRound, KeySquare, KeyTriangle, KeyDiamond, KeyHexagon, KeyOctagon, KeyCircle, KeyOval, KeyRectangle } from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface JugadorDetailsModalProps {
  jugador: Prospecto | null;
  onClose: () => void;
  onEdit: (id: string) => void;
}

const JugadorDetailsModal: React.FC<JugadorDetailsModalProps> = ({
  jugador,
  onClose,
  onEdit
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'reports' | 'history'>('overview');

  if (!jugador) return null;

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

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Users },
    { id: 'stats', label: 'Estadísticas', icon: BarChart3 },
    { id: 'reports', label: 'Reportes', icon: FileText },
    { id: 'history', label: 'Historial', icon: Clock }
  ];

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
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20">
                {jugador.fotoUrl ? (
                  <img 
                    src={jugador.fotoUrl} 
                    alt={jugador.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-8 h-8 text-white mx-auto mt-4" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{jugador.nombre}</h2>
                <p className="text-blue-100">{jugador.posicion} • {jugador.clubActual}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(jugador.id)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                <Edit3 className="w-5 h-5" />
                Editar
              </motion.button>
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

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-blue-500" />
                      Información Personal
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700"><strong>Edad:</strong> {jugador.edad} años</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700"><strong>Posición:</strong> {jugador.posicion}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700"><strong>Club:</strong> {jugador.clubActual}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700"><strong>Nacionalidad:</strong> {jugador.nacionalidad}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-green-500" />
                      Evaluación
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-600">Nivel</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getNivelColor(jugador.nivel)}`}>
                            {jugador.nivel}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          {renderStars(getNivelStars(jugador.nivel))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-600">Potencial</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPotencialColor(jugador.potencial)}`}>
                            {jugador.potencial}
                          </span>
                        </div>
                        <div className="flex justify-center">
                          {renderStars(getPotencialStars(jugador.potencial))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-600">Estado</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(jugador.estado)}`}>
                            {jugador.estado}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Characteristics */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-6 h-6 text-purple-500" />
                    Características Destacadas
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {jugador.caracteristicas.map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 font-semibold rounded-full border border-purple-200"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-blue-500" />
                      Estadísticas Técnicas
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Control de balón</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">85%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pase</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">78%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Regate</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-green-500" />
                      Estadísticas Físicas
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Velocidad</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">88%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Resistencia</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">75%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Fuerza</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">82%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Brain className="w-6 h-6 text-purple-500" />
                      Estadísticas Mentales
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Liderazgo</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">70%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Concentración</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">85%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Comunicación</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                          <span className="text-sm font-semibold">90%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-500" />
                    Reportes de Scouting
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">Reporte de Seguimiento - Partido vs Real Madrid</h4>
                        <span className="text-sm text-gray-500">15/09/2025</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Excelente rendimiento en el partido. Demostró gran velocidad y técnica. 
                        Necesita mejorar en el juego aéreo. Recomendado para seguimiento continuo.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">Scout: Juan Pérez</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Positivo</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">Evaluación Técnica</h4>
                        <span className="text-sm text-gray-500">10/09/2025</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Evaluación técnica completa realizada. Jugador con gran potencial. 
                        Áreas de mejora identificadas en el juego defensivo.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">Scout: María García</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Neutro</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-blue-500" />
                    Historial de Actividad
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Estado cambiado a "Seguimiento Activo"</h4>
                          <span className="text-sm text-gray-500">20/09/2025</span>
                        </div>
                        <p className="text-gray-600 text-sm">Jugador añadido a la lista de seguimiento activo</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Reporte de scouting añadido</h4>
                          <span className="text-sm text-gray-500">15/09/2025</span>
                        </div>
                        <p className="text-gray-600 text-sm">Nuevo reporte de seguimiento del partido vs Real Madrid</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Jugador añadido al sistema</h4>
                          <span className="text-sm text-gray-500">10/09/2025</span>
                        </div>
                        <p className="text-gray-600 text-sm">Jugador registrado en la base de datos de scouting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JugadorDetailsModal;



