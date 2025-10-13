import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, MoreVertical, Eye, Edit, Star, 
  MapPin, Calendar, Target, Users, Heart, Share2, Download,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, MousePointer, Hand
} from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface MobileOptimizedTableProps {
  jugadores: Prospecto[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onSelect: (id: string) => void;
  selected: Set<string>;
}

const MobileOptimizedTable: React.FC<MobileOptimizedTableProps> = ({
  jugadores,
  onView,
  onEdit,
  onSelect,
  selected
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'list' | 'swipe'>('cards');
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const isLeftSwipe = deltaX > 50;
    const isRightSwipe = deltaX < -50;
    const isUpSwipe = deltaY > 50;
    const isDownSwipe = deltaY < -50;

    if (isLeftSwipe && Math.abs(deltaY) < 100) {
      handleSwipeLeft();
    } else if (isRightSwipe && Math.abs(deltaY) < 100) {
      handleSwipeRight();
    } else if (isUpSwipe && Math.abs(deltaX) < 100) {
      handleSwipeUp();
    } else if (isDownSwipe && Math.abs(deltaX) < 100) {
      handleSwipeDown();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleSwipeLeft = () => {
    if (currentIndex < jugadores.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSwipeDirection('left');
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSwipeDirection('right');
    }
  };

  const handleSwipeUp = () => {
    setShowActions(jugadores[currentIndex].id);
  };

  const handleSwipeDown = () => {
    setShowActions(null);
  };

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

  const renderSwipeCard = () => {
    const jugador = jugadores[currentIndex];
    if (!jugador) return null;

    return (
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20">
                {jugador.fotoUrl ? (
                  <img 
                    src={jugador.fotoUrl} 
                    alt={jugador.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-6 h-6 text-white mx-auto mt-3" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold">{jugador.nombre}</h2>
                <p className="text-blue-100">{jugador.posicion} • {jugador.edad} años</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">
                {currentIndex + 1} de {jugadores.length}
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex-1 bg-gray-50 p-4">
          <motion.div
            key={jugador.id}
            initial={{ 
              opacity: 0, 
              x: swipeDirection === 'left' ? 300 : swipeDirection === 'right' ? -300 : 0,
              scale: 0.9 
            }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-6 h-full flex flex-col"
          >
            {/* Player Image */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4">
                {jugador.fotoUrl ? (
                  <img 
                    src={jugador.fotoUrl} 
                    alt={jugador.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-16 h-16 text-gray-400 mx-auto mt-8" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{jugador.nombre}</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {jugador.posicion}
                </span>
                <span className="text-gray-600">{jugador.edad} años</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{jugador.edad}</div>
                  <div className="text-sm text-gray-600">Edad</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{jugador.clubActual}</div>
                  <div className="text-sm text-gray-600">Club</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nivel</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getNivelColor(jugador.nivel)}`}>
                    {jugador.nivel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Potencial</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPotencialColor(jugador.potencial)}`}>
                    {jugador.potencial}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estado</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(jugador.estado)}`}>
                    {jugador.estado}
                  </span>
                </div>
              </div>
            </div>

            {/* Characteristics */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Características</h4>
              <div className="flex flex-wrap gap-2">
                {jugador.caracteristicas.map((char, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-sm font-semibold rounded-full border border-purple-200"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto">
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onView(jugador.id)}
                  className="flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  Ver
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(jugador.id)}
                  className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                  Editar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Swipe Instructions */}
        <div className="bg-white p-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Siguiente</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowRight className="w-4 h-4" />
              <span>Anterior</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowUp className="w-4 h-4" />
              <span>Acciones</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCardGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {jugadores.map((jugador, index) => (
        <motion.div
          key={jugador.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                {jugador.fotoUrl ? (
                  <img 
                    src={jugador.fotoUrl} 
                    alt={jugador.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-6 h-6 text-gray-400 mx-auto mt-3" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{jugador.nombre}</h3>
                <p className="text-sm text-gray-600">{jugador.posicion} • {jugador.edad} años</p>
              </div>
              <button
                onClick={() => setShowActions(showActions === jugador.id ? null : jugador.id)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Club</span>
                <span className="text-sm font-semibold text-gray-900">{jugador.clubActual}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Nivel</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getNivelColor(jugador.nivel)}`}>
                  {jugador.nivel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Potencial</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPotencialColor(jugador.potencial)}`}>
                  {jugador.potencial}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onView(jugador.id)}
                className="flex-1 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
              >
                Ver
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(jugador.id)}
                className="flex-1 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                Editar
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-2 p-4">
      {jugadores.map((jugador, index) => (
        <motion.div
          key={jugador.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl shadow-sm p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              {jugador.fotoUrl ? (
                <img 
                  src={jugador.fotoUrl} 
                  alt={jugador.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users className="w-6 h-6 text-gray-400 mx-auto mt-3" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{jugador.nombre}</h3>
              <p className="text-sm text-gray-600">{jugador.posicion} • {jugador.clubActual}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getNivelColor(jugador.nivel)}`}>
                {jugador.nivel}
              </span>
              <button
                onClick={() => onView(jugador.id)}
                className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Jugadores</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg ${viewMode === 'cards' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <Users className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <Target className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('swipe')}
              className={`p-2 rounded-lg ${viewMode === 'swipe' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <MousePointer className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'swipe' && (
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="h-full"
          >
            {renderSwipeCard()}
          </div>
        )}
        
        {viewMode === 'cards' && (
          <div className="h-full overflow-y-auto">
            {renderCardGrid()}
          </div>
        )}
        
        {viewMode === 'list' && (
          <div className="h-full overflow-y-auto">
            {renderListView()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileOptimizedTable;
