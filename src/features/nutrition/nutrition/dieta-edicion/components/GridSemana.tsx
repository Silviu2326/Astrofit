import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  GripVertical,
  Edit3,
  Trash2,
  MoreVertical,
  AlertTriangle,
  Clock,
  DollarSign,
  Flame,
  ChevronDown,
  History,
  Layers,
  Zap,
  PackageOpen
} from 'lucide-react';
import { SlotReceta, Comida, Receta } from '../types';

interface GridSemanaProps {
  onSlotClick: (dia: number, comida: Comida) => void;
  onRecetaAdd: (dia: number, comida: Comida, receta: Receta) => void;
  onRecetaEdit: (slotId: string) => void;
  onRecetaDelete: (slotId: string) => void;
  recetaSeleccionada?: Receta;
}

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const COMIDAS: { id: Comida; label: string }[] = [
  { id: 'desayuno', label: 'Desayuno' },
  { id: 'media_manana', label: 'Media Mañana' },
  { id: 'comida', label: 'Comida' },
  { id: 'merienda', label: 'Merienda' },
  { id: 'cena', label: 'Cena' },
  { id: 'snacks', label: 'Snacks' }
];

export const GridSemana: React.FC<GridSemanaProps> = ({
  onSlotClick,
  onRecetaAdd,
  onRecetaEdit,
  onRecetaDelete,
  recetaSeleccionada
}) => {
  const [slotsData, setSlotsData] = useState<Map<string, SlotReceta[]>>(new Map());
  const [draggedSlot, setDraggedSlot] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [showContextMenu, setShowContextMenu] = useState<{ dia: number; comida: Comida } | null>(null);
  const [showPlanB, setShowPlanB] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Mock totales por día
  const totalesDia = [
    { calorias: 1850, objetivo: 2000, proteinas: 145, carbohidratos: 185, grasas: 65 },
    { calorias: 1920, objetivo: 2000, proteinas: 150, carbohidratos: 190, grasas: 68 },
    { calorias: 1780, objetivo: 2000, proteinas: 138, carbohidratos: 180, grasas: 62 },
    { calorias: 2050, objetivo: 2000, proteinas: 155, carbohidratos: 200, grasas: 72 },
    { calorias: 1900, objetivo: 2000, proteinas: 148, carbohidratos: 188, grasas: 66 },
    { calorias: 1850, objetivo: 2000, proteinas: 142, carbohidratos: 182, grasas: 64 },
    { calorias: 2100, objetivo: 2000, proteinas: 160, carbohidratos: 205, grasas: 75 }
  ];

  // Mock sobras por día
  const sobrasPorDia = [0, 2, 1, 0, 3, 1, 0];

  // Mock alertas por día: null (sin alertas), 'warn' (ámbar), 'error' (rojo)
  const alertasPorDia: ('warn' | 'error' | null)[] = [
    null,      // Lunes: sin alertas
    'warn',    // Martes: alerta leve (fibra baja, etc)
    null,      // Miércoles: sin alertas
    'error',   // Jueves: alerta bloqueante (alergeno, sodio alto)
    'warn',    // Viernes: alerta leve
    null,      // Sábado: sin alertas
    'error'    // Domingo: alerta bloqueante
  ];

  const getSlotKey = (dia: number, comida: Comida) => `${dia}-${comida}`;

  const getSlots = (dia: number, comida: Comida): SlotReceta[] => {
    return slotsData.get(getSlotKey(dia, comida)) || [];
  };

  const handleDragStart = (e: React.DragEvent, slotId: string) => {
    setDraggedSlot(slotId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, dia: number, comida: Comida) => {
    e.preventDefault();
    const isAltPressed = e.altKey;
    const isShiftPressed = e.shiftKey;

    if (isAltPressed) {
      e.dataTransfer.dropEffect = 'copy';
    } else {
      e.dataTransfer.dropEffect = 'move';
    }

    setDropTarget(getSlotKey(dia, comida));
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e: React.DragEvent, dia: number, comida: Comida) => {
    e.preventDefault();
    setDropTarget(null);

    const isAltPressed = e.altKey;
    const isShiftPressed = e.shiftKey;

    if (isAltPressed) {
      console.log('Alt+Drag: Duplicar receta');
    } else if (isShiftPressed) {
      console.log('Shift+Drag: Mover toda la fila');
    } else {
      console.log('Drag normal: Mover receta');
    }
  };

  const handleAddReceta = (dia: number, comida: Comida) => {
    if (recetaSeleccionada) {
      onRecetaAdd(dia, comida, recetaSeleccionada);
    } else {
      setShowContextMenu({ dia, comida });
    }
  };

  const getProgressColor = (porcentaje: number) => {
    const diff = Math.abs(porcentaje - 100);
    if (diff <= 5) return 'bg-green-500';
    if (diff <= 10) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="min-w-max">
        {/* Grid Header - Días con resumen */}
        <div className="grid grid-cols-8 gap-3 mb-3">
          <div className="w-32"></div>
          {DIAS.map((dia, idx) => {
            const total = totalesDia[idx];
            const porcentaje = Math.round((total.calorias / total.objetivo) * 100);
            const sobras = sobrasPorDia[idx];
            const alerta = alertasPorDia[idx];

            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => setHoveredDay(idx)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <div className="bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl p-3 shadow-md relative">
                  {/* Punto de alerta en esquina superior derecha */}
                  {alerta && (
                    <div
                      className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                        alerta === 'error'
                          ? 'bg-red-500 animate-pulse'
                          : 'bg-amber-500'
                      }`}
                      title={alerta === 'error' ? 'Alerta bloqueante en este día' : 'Alerta informativa en este día'}
                    />
                  )}
                  <div className="text-sm font-bold mb-1">{dia}</div>
                  <div className="text-xs opacity-90">
                    {new Date(Date.now() + idx * 86400000).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short'
                    })}
                  </div>

                  {/* Mini barra de progreso */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="opacity-90">{total.calorias} kcal</span>
                      <span className="opacity-75">{porcentaje}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(porcentaje)} transition-all`}
                        style={{ width: `${Math.min(porcentaje, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Sobras counter */}
                  {sobras > 0 && (
                    <button
                      className="mt-2 w-full px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      title="Click para sugerir recolocación"
                    >
                      <PackageOpen className="w-3 h-3" />
                      Sobras: {sobras}
                    </button>
                  )}
                </div>

                {/* Tooltip con macros al hover */}
                <AnimatePresence>
                  {hoveredDay === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap z-50"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <span className="text-blue-400">P:</span> {total.proteinas}g
                        </div>
                        <div>
                          <span className="text-amber-400">C:</span> {total.carbohidratos}g
                        </div>
                        <div>
                          <span className="text-purple-400">G:</span> {total.grasas}g
                        </div>
                      </div>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Grid Body - Comidas × Días */}
        {COMIDAS.map((comida) => (
          <div key={comida.id} className="grid grid-cols-8 gap-3 mb-3">
            {/* Etiqueta de comida */}
            <div className="w-32 bg-white rounded-xl p-3 border border-gray-200 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">{comida.label}</span>
            </div>

            {/* Slots por día */}
            {DIAS.map((_, diaIdx) => {
              const slots = getSlots(diaIdx, comida.id);
              const slotKey = getSlotKey(diaIdx, comida.id);
              const isDropTarget = dropTarget === slotKey;
              const isFirstSlot = comida.id === 'desayuno' && diaIdx === 0;

              return (
                <div
                  key={diaIdx}
                  onDragOver={(e) => handleDragOver(e, diaIdx, comida.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, diaIdx, comida.id)}
                  className={`min-h-[120px] bg-white rounded-xl border-2 transition-all relative ${
                    isDropTarget
                      ? 'border-lime-500 bg-lime-50 shadow-lg'
                      : 'border-gray-200 hover:border-lime-300'
                  }`}
                >
                  {/* Ghost preview al arrastrar */}
                  {isDropTarget && recetaSeleccionada && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <div className="bg-lime-100 border-2 border-lime-500 border-dashed rounded-lg p-3 text-center">
                        <div className="text-sm font-bold text-lime-900 mb-1">
                          {recetaSeleccionada.nombre}
                        </div>
                        <div className="text-xs text-lime-700">
                          +{recetaSeleccionada.macros.proteinas}g P, +{recetaSeleccionada.macros.calorias} kcal
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 space-y-2">
                    {slots.length === 0 ? (
                      // Estado vacío mejorado
                      <div className="relative">
                        <button
                          onClick={() => handleAddReceta(diaIdx, comida.id)}
                          className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-lime-500 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-lime-600 transition-all group"
                        >
                          <Plus className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                          {isFirstSlot ? (
                            <span className="text-xs font-semibold text-center px-2">
                              Arrastra una receta<br/>o pulsa +
                            </span>
                          ) : (
                            <span className="text-xs font-semibold">Añadir</span>
                          )}
                        </button>

                        {/* Menú contextual */}
                        <AnimatePresence>
                          {showContextMenu?.dia === diaIdx && showContextMenu?.comida === comida.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-50 min-w-[220px]"
                            >
                              <button className="w-full px-3 py-2 hover:bg-gray-50 rounded-lg text-left text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <History className="w-4 h-4 text-blue-500" />
                                Receta reciente
                              </button>
                              <button className="w-full px-3 py-2 hover:bg-gray-50 rounded-lg text-left text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Layers className="w-4 h-4 text-purple-500" />
                                Bloque reutilizable
                              </button>
                              <button className="w-full px-3 py-2 hover:bg-gray-50 rounded-lg text-left text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                                Plantilla (Desayuno proteico)
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Recetas en el slot
                      slots.map((slot) => (
                        <motion.div
                          key={slot.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, slot.id)}
                          whileHover={{ scale: 1.02 }}
                          className={`bg-gradient-to-br from-white to-gray-50 rounded-lg p-2 border cursor-move shadow-sm hover:shadow-md transition-all relative ${
                            slot.esSobra
                              ? 'border-orange-300 bg-orange-50'
                              : 'border-gray-200'
                          }`}
                        >
                          {/* Plan B inline */}
                          <button
                            onClick={() => setShowPlanB(showPlanB === slot.id ? null : slot.id)}
                            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded z-10"
                            title="Ver alternativas"
                          >
                            <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showPlanB === slot.id ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Header */}
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center gap-1 flex-1 min-w-0 pr-6">
                              <GripVertical className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="text-xs font-bold text-gray-900 truncate">
                                {slot.receta.nombre}
                              </span>
                            </div>
                          </div>

                          {/* Raciones */}
                          <div className="flex items-center gap-2 mb-2">
                            <button className="px-1 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">
                              -
                            </button>
                            <span className="text-xs font-bold text-gray-700">
                              {slot.raciones} ración{slot.raciones > 1 ? 'es' : ''}
                            </span>
                            <button className="px-1 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold">
                              +
                            </button>
                          </div>

                          {/* Macros */}
                          <div className="grid grid-cols-4 gap-1 mb-2">
                            <div className="text-center bg-orange-50 rounded p-1">
                              <div className="text-xs font-bold text-orange-600">
                                {slot.macrosTotales.calorias}
                              </div>
                              <div className="text-xs text-gray-500">kcal</div>
                            </div>
                            <div className="text-center bg-blue-50 rounded p-1">
                              <div className="text-xs font-bold text-blue-600">
                                {slot.macrosTotales.proteinas}
                              </div>
                              <div className="text-xs text-gray-500">P</div>
                            </div>
                            <div className="text-center bg-amber-50 rounded p-1">
                              <div className="text-xs font-bold text-amber-600">
                                {slot.macrosTotales.carbohidratos}
                              </div>
                              <div className="text-xs text-gray-500">C</div>
                            </div>
                            <div className="text-center bg-purple-50 rounded p-1">
                              <div className="text-xs font-bold text-purple-600">
                                {slot.macrosTotales.grasas}
                              </div>
                              <div className="text-xs text-gray-500">G</div>
                            </div>
                          </div>

                          {/* Info adicional */}
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {slot.receta.tiempo}'
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {slot.receta.coste.toFixed(1)}€
                            </span>
                          </div>

                          {/* Badges */}
                          <div className="flex items-center gap-1 mt-2">
                            {slot.esSobra && (
                              <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                                Sobra
                              </span>
                            )}
                            {slot.receta.batchFriendly && (
                              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5" />
                                Batch
                              </span>
                            )}
                            {slot.receta.alergenos.length > 0 && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-0.5">
                                <AlertTriangle className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>

                          {/* Plan B inline expandido */}
                          <AnimatePresence>
                            {showPlanB === slot.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-2 pt-2 border-t border-gray-200 space-y-1 overflow-hidden"
                              >
                                <div className="text-xs font-semibold text-gray-600 mb-1">Alternativas:</div>
                                {[1, 2].map((alt) => (
                                  <button
                                    key={alt}
                                    className="w-full px-2 py-1.5 bg-blue-50 hover:bg-blue-100 rounded text-left text-xs transition-colors"
                                  >
                                    <div className="font-semibold text-gray-900">Opción {alt}</div>
                                    <div className="text-blue-600 text-xs">
                                      Δ +5g P, -20 kcal
                                    </div>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
