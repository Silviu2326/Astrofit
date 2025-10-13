import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2, Circle } from 'lucide-react';

interface DuplicateWeekModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (options: DuplicateOptions) => void;
  semanaActual: number;
}

export interface DuplicateOptions {
  includeNotas: boolean;
  includePlanB: boolean;
  includeSobras: boolean;
  semanasADuplicar: number[];
}

export const DuplicateWeekModal: React.FC<DuplicateWeekModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  semanaActual
}) => {
  const [includeNotas, setIncludeNotas] = useState(true);
  const [includePlanB, setIncludePlanB] = useState(false);
  const [includeSobras, setIncludeSobras] = useState(false);
  const [targetWeek, setTargetWeek] = useState<number | null>(null);

  const handleConfirm = () => {
    if (targetWeek) {
      onConfirm({
        includeNotas,
        includePlanB,
        includeSobras,
        semanasADuplicar: [targetWeek]
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-lime-600 to-green-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Copy className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Duplicar Semana {semanaActual}</h2>
                  <p className="text-sm text-green-100">Selecciona qué duplicar</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Semana destino */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Duplicar a la semana:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((week) => (
                  week !== semanaActual && (
                    <button
                      key={week}
                      onClick={() => setTargetWeek(week)}
                      className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                        targetWeek === week
                          ? 'bg-lime-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {week}
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* Checklist */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Opciones de duplicación:
              </label>
              <div className="space-y-2">
                {/* Recetas y macros (siempre incluido) */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Recetas y macros</div>
                    <div className="text-xs text-gray-600">Siempre se duplica</div>
                  </div>
                </div>

                {/* Notas del coach */}
                <button
                  onClick={() => setIncludeNotas(!includeNotas)}
                  className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-lime-300 transition-colors"
                >
                  {includeNotas ? (
                    <CheckCircle2 className="w-5 h-5 text-lime-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Notas del coach</div>
                    <div className="text-xs text-gray-600">Incluir anotaciones y recordatorios</div>
                  </div>
                </button>

                {/* Alternativas Plan B */}
                <button
                  onClick={() => setIncludePlanB(!includePlanB)}
                  className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-lime-300 transition-colors"
                >
                  {includePlanB ? (
                    <CheckCircle2 className="w-5 h-5 text-lime-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Alternativas Plan B</div>
                    <div className="text-xs text-gray-600">Sustituciones guardadas para cada receta</div>
                  </div>
                </button>

                {/* Marcas de sobras */}
                <button
                  onClick={() => setIncludeSobras(!includeSobras)}
                  className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-lime-300 transition-colors"
                >
                  {includeSobras ? (
                    <CheckCircle2 className="w-5 h-5 text-lime-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Marcas de sobras</div>
                    <div className="text-xs text-gray-600">Mantener indicadores de batch cooking</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Info adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="text-sm text-blue-900">
                <div className="font-semibold mb-1">ℹ️ Información</div>
                <div className="text-xs text-blue-700">
                  La semana duplicada sobrescribirá completamente la semana destino.
                  Esta acción se puede deshacer con Ctrl+Z.
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!targetWeek}
              className="px-6 py-3 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Copy className="w-5 h-5" />
              Duplicar semana
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
