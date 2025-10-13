import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, Info, CheckCircle, X, Zap, TrendingUp, 
  TrendingDown, Clock, Target, Dumbbell, Heart, Flame,
  ArrowRight, Settings, Bell, BellOff, Filter, Search
} from 'lucide-react';
import { AlertaLinter } from '../types';

interface AlertasInteligentesProps {
  alertas: AlertaLinter[];
  onFixAlerta: (alerta: AlertaLinter) => void;
  onSugerirAjuste: (tipo: 'volumen' | 'intensidad') => void;
  onDismissAlerta?: (alertaId: string) => void;
  onMarkAsRead?: (alertaId: string) => void;
  showFilters?: boolean;
  onToggleFilters?: () => void;
}

interface AlertaCardProps {
  alerta: AlertaLinter;
  onFix: (alerta: AlertaLinter) => void;
  onDismiss?: (alertaId: string) => void;
  onMarkAsRead?: (alertaId: string) => void;
  isRead?: boolean;
}

const AlertaCard: React.FC<AlertaCardProps> = ({
  alerta,
  onFix,
  onDismiss,
  onMarkAsRead,
  isRead = false
}) => {
  const getSeverityConfig = (severidad: string) => {
    switch (severidad) {
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-800',
          textColor: 'text-red-700',
          buttonColor: 'bg-red-600 hover:bg-red-700',
          icon: <AlertTriangle className="w-5 h-5" />
        };
      case 'warn':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-800',
          textColor: 'text-yellow-700',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
          icon: <AlertTriangle className="w-5 h-5" />
        };
      case 'info':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-800',
          textColor: 'text-blue-700',
          buttonColor: 'bg-blue-600 hover:bg-blue-700',
          icon: <Info className="w-5 h-5" />
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          titleColor: 'text-green-800',
          textColor: 'text-green-700',
          buttonColor: 'bg-green-600 hover:bg-green-700',
          icon: <CheckCircle className="w-5 h-5" />
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-800',
          textColor: 'text-gray-700',
          buttonColor: 'bg-gray-600 hover:bg-gray-700',
          icon: <Info className="w-5 h-5" />
        };
    }
  };

  const config = getSeverityConfig(alerta.severidad);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4 transition-all duration-300 ${
        isRead ? 'opacity-60' : 'shadow-lg hover:shadow-xl'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`${config.iconColor} mt-0.5`}>
          {config.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-semibold ${config.titleColor}`}>
              {alerta.mensaje}
            </h4>
            <div className="flex items-center gap-2">
              {!isRead && onMarkAsRead && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onMarkAsRead(alerta.id)}
                  className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                  title="Marcar como leído"
                >
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                </motion.button>
              )}
              {onDismiss && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onDismiss(alerta.id)}
                  className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                  title="Descartar"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </motion.button>
              )}
            </div>
          </div>
          
          <p className={`text-sm ${config.textColor} mb-3`}>
            {getAlertaDescription(alerta.tipo)}
          </p>
          
          {alerta.fix && (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFix(alerta)}
                className={`px-4 py-2 ${config.buttonColor} text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2`}
              >
                <Zap className="w-4 h-4" />
                {alerta.fix.label}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Ver Detalles
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const getAlertaDescription = (tipo: string): string => {
  const descriptions: { [key: string]: string } = {
    volumen_alto: 'El volumen de entrenamiento supera las recomendaciones para tu nivel. Considera reducir las series o el peso para evitar sobreentrenamiento.',
    volumen_bajo: 'El volumen de entrenamiento está por debajo de lo recomendado. Puedes añadir más series o ejercicios para optimizar tu progreso.',
    intensidad_alta: 'La intensidad del entrenamiento es muy alta. Reduce el peso o las repeticiones para mantener una progresión sostenible.',
    intensidad_baja: 'La intensidad del entrenamiento es baja. Considera incrementar el peso o las repeticiones para maximizar el estímulo.',
    descanso_insuficiente: 'El tiempo de descanso entre series es insuficiente. Aumenta los intervalos para permitir una recuperación adecuada.',
    frecuencia_alta: 'La frecuencia de entrenamiento es muy alta. Reduce las sesiones semanales para evitar sobreentrenamiento.',
    frecuencia_baja: 'La frecuencia de entrenamiento es baja. Aumenta las sesiones semanales para optimizar tu progreso.',
    desequilibrio_muscular: 'Hay un desequilibrio entre grupos musculares. Añade ejercicios para los músculos menos trabajados.',
    progresion_agresiva: 'La progresión es demasiado agresiva. Reduce los incrementos para evitar lesiones.',
    progresion_lenta: 'La progresión es muy lenta. Puedes incrementar más rápidamente los pesos o repeticiones.'
  };
  
  return descriptions[tipo] || 'Revisa los parámetros de entrenamiento para optimizar tu progreso.';
};

export const AlertasInteligentes: React.FC<AlertasInteligentesProps> = ({
  alertas,
  onFixAlerta,
  onSugerirAjuste,
  onDismissAlerta,
  onMarkAsRead,
  showFilters = false,
  onToggleFilters
}) => {
  const [filtroSeveridad, setFiltroSeveridad] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [alertasLeidas, setAlertasLeidas] = useState<Set<string>>(new Set());

  const alertasFiltradas = alertas.filter(alerta => {
    const cumpleSeveridad = filtroSeveridad === 'todas' || alerta.severidad === filtroSeveridad;
    const cumpleBusqueda = busqueda === '' || 
      alerta.mensaje.toLowerCase().includes(busqueda.toLowerCase()) ||
      alerta.tipo.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleSeveridad && cumpleBusqueda;
  });

  const handleMarkAsRead = (alertaId: string) => {
    setAlertasLeidas(prev => new Set([...prev, alertaId]));
    onMarkAsRead?.(alertaId);
  };

  const getSeveridadCount = (severidad: string) => {
    return alertas.filter(alerta => alerta.severidad === severidad).length;
  };

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'error': return 'text-red-600 bg-red-100';
      case 'warn': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'success': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header con controles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Alertas Inteligentes</h3>
            <p className="text-sm text-gray-600">
              {alertas.length} alerta{alertas.length !== 1 ? 's' : ''} pendiente{alertas.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {onToggleFilters && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleFilters}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </motion.button>
          )}
        </div>
      </div>

      {/* Filtros y búsqueda */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 rounded-xl p-4 space-y-4"
        >
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar alertas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Filtros de severidad */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFiltroSeveridad('todas')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                filtroSeveridad === 'todas'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Todas ({alertas.length})
            </button>
            {['error', 'warn', 'info', 'success'].map(severidad => {
              const count = getSeveridadCount(severidad);
              if (count === 0) return null;
              
              return (
                <button
                  key={severidad}
                  onClick={() => setFiltroSeveridad(severidad)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                    filtroSeveridad === severidad
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {severidad.charAt(0).toUpperCase() + severidad.slice(1)} ({count})
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Lista de alertas */}
      <div className="space-y-3">
        <AnimatePresence>
          {alertasFiltradas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Todo en orden!</h3>
              <p className="text-gray-600">No hay alertas pendientes en este momento.</p>
            </motion.div>
          ) : (
            alertasFiltradas.map((alerta) => (
              <AlertaCard
                key={alerta.id}
                alerta={alerta}
                onFix={onFixAlerta}
                onDismiss={onDismissAlerta}
                onMarkAsRead={handleMarkAsRead}
                isRead={alertasLeidas.has(alerta.id)}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Acciones Rápidas</h4>
              <p className="text-sm text-gray-600">Optimiza tu entrenamiento</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSugerirAjuste('volumen')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Ajustar Volumen
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSugerirAjuste('intensidad')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              Ajustar Intensidad
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertasInteligentes;

