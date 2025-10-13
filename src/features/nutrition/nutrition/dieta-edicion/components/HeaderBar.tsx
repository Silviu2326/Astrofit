import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Undo2,
  Redo2,
  Copy,
  ChefHat,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  ChevronDown,
  Sparkles,
  Paintbrush
} from 'lucide-react';
import { ClienteDieta, EstadoLiveSync } from '../types';

interface HeaderBarProps {
  cliente: ClienteDieta;
  semanaActual: number;
  fechaInicio: string;
  fechaFin: string;
  canUndo: boolean;
  canRedo: boolean;
  liveSyncState: EstadoLiveSync;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicateWeek: () => void;
  onBatchToggle: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onGoToToday: () => void;
  batchModeActive: boolean;
  onOpenPlantillas?: () => void;
  onOpenMacroBrush?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  cliente,
  semanaActual,
  fechaInicio,
  fechaFin,
  canUndo,
  canRedo,
  liveSyncState,
  onUndo,
  onRedo,
  onDuplicateWeek,
  onBatchToggle,
  onPrevWeek,
  onNextWeek,
  onGoToToday,
  batchModeActive,
  onOpenPlantillas,
  onOpenMacroBrush
}) => {
  const [showWeekDropdown, setShowWeekDropdown] = useState(false);

  const getSyncIcon = () => {
    switch (liveSyncState.estado) {
      case 'guardando':
        return <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />;
      case 'guardado':
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-3.5 h-3.5 text-red-600" />;
      case 'sincronizando':
        return <Loader2 className="w-3.5 h-3.5 animate-pulse text-blue-600" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getSyncText = () => {
    switch (liveSyncState.estado) {
      case 'guardando':
        return 'Guardando...';
      case 'guardado':
        return 'Guardado • Visible en app';
      case 'error':
        return 'Error al guardar';
      case 'sincronizando':
        return 'Sincronizando...';
      default:
        return 'Sin cambios';
    }
  };

  const getSyncBgColor = () => {
    switch (liveSyncState.estado) {
      case 'guardado':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  };

  const formatTimestamp = () => {
    if (!liveSyncState.ultimoCambio) return 'Sin cambios recientes';
    const now = new Date();
    const diff = Math.floor((now.getTime() - liveSyncState.ultimoCambio.getTime()) / 1000);

    const hoy = now.toDateString();
    const fecha = liveSyncState.ultimoCambio.toDateString();
    const esHoy = hoy === fecha;

    const hora = liveSyncState.ultimoCambio.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return esHoy ? `Última sincronización: hoy ${hora}` : `Última sincronización: ${hora}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Cliente y restricciones */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-lime-500 to-green-500 flex items-center justify-center text-2xl border-2 border-white shadow-md">
            {cliente.avatar}
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 leading-tight">{cliente.nombre}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              {cliente.restricciones.slice(0, 3).map((rest, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full"
                >
                  {rest}
                </span>
              ))}
              {cliente.alergenos.slice(0, 2).map((alergeno, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-0.5"
                  title={alergeno.nombre}
                >
                  {alergeno.icono}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Selector de semana mejorado */}
        <div className="flex items-center gap-2">
          <button
            onClick={onGoToToday}
            className="p-2 hover:bg-lime-50 rounded-lg transition-colors group"
            title="Ir a semana actual"
          >
            <Home className="w-4 h-4 text-gray-600 group-hover:text-lime-600" />
          </button>

          <div className="h-6 w-px bg-gray-200"></div>

          <button
            onClick={onPrevWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Semana anterior (←)"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowWeekDropdown(!showWeekDropdown)}
              className="bg-gradient-to-r from-lime-50 to-green-50 px-4 py-2 rounded-xl border border-lime-200 hover:border-lime-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-lime-700" />
                <span className="text-sm font-bold text-lime-900">
                  Semana {semanaActual}
                </span>
                <span className="text-xs text-lime-600">
                  {formatFecha(fechaInicio)} - {formatFecha(fechaFin)}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-lime-700" />
              </div>
            </button>

            {/* Dropdown de semanas */}
            <AnimatePresence>
              {showWeekDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 min-w-[200px]"
                >
                  {[1, 2, 3, 4].map((semana) => (
                    <button
                      key={semana}
                      onClick={() => {
                        // Aquí iría la lógica para cambiar de semana
                        setShowWeekDropdown(false);
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-left text-sm font-semibold transition-colors ${
                        semana === semanaActual
                          ? 'bg-lime-100 text-lime-900'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      Semana {semana}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={onNextWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Semana siguiente (→)"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Acciones agrupadas con divisores */}
        <div className="flex items-center gap-3">
          {/* Grupo Undo/Redo */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-2 hover:bg-white rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Deshacer (⌘Z)"
            >
              <Undo2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-2 hover:bg-white rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Rehacer (⇧⌘Z)"
            >
              <Redo2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Divisor */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Duplicar semana */}
          <button
            onClick={onDuplicateWeek}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
            title="Duplicar esta semana (W)"
          >
            <Copy className="w-4 h-4" />
            <span>Duplicar semana</span>
          </button>

          {/* Plantillas Inteligentes */}
          {onOpenPlantillas && (
            <motion.button
              onClick={onOpenPlantillas}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md"
              title="Plantillas por Objetivo (T)"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden xl:inline">Plantillas</span>
            </motion.button>
          )}

          {/* Ajuste de Macros */}
          {onOpenMacroBrush && (
            <motion.button
              onClick={onOpenMacroBrush}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md"
              title="Ajuste Rápido de Macros (M)"
            >
              <Paintbrush className="w-4 h-4" />
              <span className="hidden xl:inline">Ajuste Macros</span>
            </motion.button>
          )}

          {/* Divisor */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Modo Batch */}
          <motion.button
            onClick={onBatchToggle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
              batchModeActive
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
            title="Activar modo Batch Cooking (B para Pincel)"
          >
            <ChefHat className="w-4 h-4" />
            <span className="hidden xl:inline">{batchModeActive ? 'Batch Activo' : 'Batch'}</span>
          </motion.button>

          {/* Divisor */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Estado de guardado - chip persistente */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-medium text-xs transition-colors cursor-default ${getSyncBgColor()}`}
            title={formatTimestamp()}
          >
            {getSyncIcon()}
            <span>{getSyncText()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
