import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Undo2,
  Redo2,
  Copy,
  Dumbbell,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  ChevronDown,
  Sparkles,
  Paintbrush,
  Target,
  Zap,
  StickyNote,
  FileSpreadsheet,
  Bot,
  User,
  X,
  Maximize2
} from 'lucide-react';
import { ClienteEntrenamiento, EstadoLiveSync } from '../types';

interface HeaderBarProps {
  cliente: ClienteEntrenamiento;
  semanaActual: number;
  fechaInicio: string;
  fechaFin: string;
  canUndo: boolean;
  canRedo: boolean;
  liveSyncState: EstadoLiveSync;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicateWeek: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onGoToToday: () => void;
  onOpenPlantillas?: () => void;
  onOpenMacroBrush?: () => void;
  onOpenNotes?: () => void;
  onOpenExcel?: () => void;
  onOpenFitCoach?: () => void;
  isTotalesPanelVisible?: boolean;
  onRestoreTotalesPanel?: () => void;
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
  onPrevWeek,
  onNextWeek,
  onGoToToday,
  onOpenPlantillas,
  onOpenMacroBrush,
  onOpenNotes,
  onOpenExcel,
  onOpenFitCoach,
  isTotalesPanelVisible = true,
  onRestoreTotalesPanel
}) => {
  const [showWeekDropdown, setShowWeekDropdown] = useState(false);
  const [showClientInfo, setShowClientInfo] = useState(false);

  const getSyncIcon = () => {
    switch (liveSyncState.estado) {
      case 'guardando':
        return <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-600" />;
      case 'guardado':
        return <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-3.5 h-3.5 text-red-600" />;
      case 'sincronizando':
        return <Loader2 className="w-3.5 h-3.5 animate-pulse text-orange-600" />;
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
        return 'bg-orange-50 border-orange-200 text-orange-700';
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
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-2xl border-2 border-white shadow-md">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">{cliente.nombre}</h2>
              <div className="flex items-center gap-1.5 mt-1">
              {cliente.restricciones.slice(0, 3).map((rest, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full"
                >
                  {rest}
                </span>
              ))}
              {cliente.lesiones.slice(0, 2).map((lesion, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-0.5"
                  title={lesion}
                >
                  ⚠️
                </span>
              ))}
              </div>
            </div>
            
            {/* Botón de información del cliente */}
            <motion.button
              onClick={() => setShowClientInfo(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
              title="Ver información del cliente"
            >
              <User className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Selector de semana mejorado */}
        <div className="flex items-center gap-2">
          <button
            onClick={onGoToToday}
            className="p-2 hover:bg-orange-50 rounded-lg transition-colors group"
            title="Ir a semana actual"
          >
            <Home className="w-4 h-4 text-gray-600 group-hover:text-orange-600" />
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
              className="bg-gradient-to-r from-orange-50 to-pink-50 px-4 py-2 rounded-xl border border-orange-200 hover:border-orange-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-700" />
                <span className="text-sm font-bold text-orange-900">
                  Semana {semanaActual}
                </span>
                <span className="text-xs text-orange-600">
                  {formatFecha(fechaInicio)} - {formatFecha(fechaFin)}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-orange-700" />
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
                          ? 'bg-orange-100 text-orange-900'
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
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors h-10"
            title="Duplicar esta semana (W)"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden xl:inline">Duplicar semana</span>
          </button>

          {/* Plantillas Inteligentes */}
          {onOpenPlantillas && (
            <motion.button
              onClick={onOpenPlantillas}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md h-10"
              title="Plantillas por Objetivo (T)"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden xl:inline">Plantillas</span>
            </motion.button>
          )}

          {/* Ajuste de Volumen/Intensidad */}
          {onOpenMacroBrush && (
            <motion.button
              onClick={onOpenMacroBrush}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md h-10"
              title="Ajuste Rápido de Volumen/Intensidad (M)"
            >
              <Paintbrush className="w-4 h-4" />
              <span className="hidden xl:inline">Ajuste Volumen</span>
            </motion.button>
          )}

          {/* Sistema de Notas */}
          {onOpenNotes && (
            <motion.button
              onClick={onOpenNotes}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md h-10"
              title="Sistema de Notas (N)"
            >
              <StickyNote className="w-4 h-4" />
              <span className="hidden xl:inline">Notas</span>
            </motion.button>
          )}

          {/* Exportar a Excel */}
          {onOpenExcel && (
            <motion.button
              onClick={onOpenExcel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md h-10"
              title="Exportar a Excel (E)"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span className="hidden xl:inline">Excel</span>
            </motion.button>
          )}

          {/* FitCoach AI */}
          {onOpenFitCoach && (
            <motion.button
              onClick={onOpenFitCoach}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-800 hover:from-purple-700 hover:to-indigo-900 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md h-10"
              title="FitCoach AI Assistant (F)"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden xl:inline">FitCoach</span>
            </motion.button>
          )}

          {/* Restaurar Panel de Totales */}
          {!isTotalesPanelVisible && onRestoreTotalesPanel && (
            <motion.button
              onClick={onRestoreTotalesPanel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-md h-10"
              title="Restaurar Panel de Resumen"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden xl:inline">Restaurar Panel</span>
            </motion.button>
          )}

          {/* Divisor */}
          <div className="h-8 w-px bg-gray-200"></div>


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

      {/* Modal de información del cliente */}
      <AnimatePresence>
        {showClientInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowClientInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-2xl border-2 border-white shadow-md">
                    <Dumbbell className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{cliente.nombre}</h3>
                    <p className="text-sm text-gray-500">Información del cliente</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowClientInfo(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Información del cliente */}
              <div className="space-y-4">
                {/* Objetivos */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    Objetivos
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Nivel:</strong> {cliente.nivel}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-blue-800 font-medium mb-1">Objetivos:</p>
                      <div className="flex flex-wrap gap-1">
                        {cliente.objetivos.map((objetivo, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                          >
                            {objetivo}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Restricciones */}
                {cliente.restricciones.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      Restricciones
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cliente.restricciones.map((rest, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full"
                        >
                          {rest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lesiones */}
                {cliente.lesiones.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      Lesiones
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cliente.lesiones.map((lesion, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full"
                        >
                          {lesion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preferencias */}
                {cliente.preferencias.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-600" />
                      Preferencias
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cliente.preferencias.map((preferencia, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                        >
                          {preferencia}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botón de cerrar */}
              <div className="mt-6 flex justify-end">
                <motion.button
                  onClick={() => setShowClientInfo(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cerrar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};