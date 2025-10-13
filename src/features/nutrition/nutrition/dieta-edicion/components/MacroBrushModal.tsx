import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Paintbrush, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MacroBrushConfig, CambioMacroBrush, Macros } from '../types';

interface MacroBrushModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (cambios: CambioMacroBrush[]) => void;
  objetivos: Macros;
  totalesActuales: Macros;
}

type Ambito = 'dia' | 'semana' | 'seleccion';

export const MacroBrushModal: React.FC<MacroBrushModalProps> = ({
  isOpen,
  onClose,
  onApply,
  objetivos,
  totalesActuales
}) => {
  const [ambito, setAmbito] = useState<Ambito>('dia');
  const [proteinasObjetivo, setProteinasObjetivo] = useState(objetivos.proteinas);
  const [carbohidratosObjetivo, setCarbohidratosObjetivo] = useState(objetivos.carbohidratos);
  const [grasasObjetivo, setGrasasObjetivo] = useState(objetivos.grasas);
  const [caloriasObjetivo, setCaloriasObjetivo] = useState(objetivos.calorias);
  const [tolerancia, setTolerancia] = useState<5 | 10>(5);
  
  // Ajustes rápidos
  const [ajusteRapido, setAjusteRapido] = useState<string | null>(null);

  // Mock de cambios propuestos
  const cambiosPropuestos: CambioMacroBrush[] = [
    {
      slotId: '1-desayuno-1',
      recetaActual: 'Tostadas aguacate',
      recetaNueva: 'Tostadas aguacate + huevo extra',
      racionesActuales: 1,
      racionesNuevas: 1,
      macrosAntes: { proteinas: 18, carbohidratos: 35, grasas: 22, calorias: 420 },
      macrosDespues: { proteinas: 25, carbohidratos: 35, grasas: 27, calorias: 475 }
    },
    {
      slotId: '1-comida-1',
      recetaActual: 'Bowl quinoa',
      recetaNueva: 'Bowl quinoa (1.2 raciones)',
      racionesActuales: 1,
      racionesNuevas: 1.2,
      macrosAntes: { proteinas: 35, carbohidratos: 45, grasas: 12, calorias: 450 },
      macrosDespues: { proteinas: 42, carbohidratos: 54, grasas: 14, calorias: 540 }
    }
  ];

  const totalesNuevos = {
    proteinas: totalesActuales.proteinas +
      cambiosPropuestos.reduce((sum, c) => sum + (c.macrosDespues.proteinas - c.macrosAntes.proteinas), 0),
    carbohidratos: totalesActuales.carbohidratos +
      cambiosPropuestos.reduce((sum, c) => sum + (c.macrosDespues.carbohidratos - c.macrosAntes.carbohidratos), 0),
    grasas: totalesActuales.grasas +
      cambiosPropuestos.reduce((sum, c) => sum + (c.macrosDespues.grasas - c.macrosAntes.grasas), 0),
    calorias: totalesActuales.calorias +
      cambiosPropuestos.reduce((sum, c) => sum + (c.macrosDespues.calorias - c.macrosAntes.calorias), 0)
  };

  const getDelta = (actual: number, objetivo: number) => {
    const delta = actual - objetivo;
    const deltaStr = delta > 0 ? `+${delta}` : `${delta}`;
    return { delta, deltaStr };
  };

  const getDeltaColor = (actual: number, objetivo: number) => {
    const diff = Math.abs(((actual - objetivo) / objetivo) * 100);
    if (diff <= 5) return 'text-green-600';
    if (diff <= 10) return 'text-amber-600';
    return 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Paintbrush className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Pincel de Macros</h2>
                  <p className="text-sm text-purple-100">Ajusta proteínas/CH/grasas con mínimo cambio</p>
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
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Panel izquierdo: Configuración */}
              <div className="space-y-6">
                {/* Ámbito */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Ámbito</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                      <input
                        type="radio"
                        name="ambito"
                        value="dia"
                        checked={ambito === 'dia'}
                        onChange={() => setAmbito('dia')}
                        className="w-4 h-4 text-purple-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Día actual</div>
                        <div className="text-xs text-gray-600">Ajusta solo el día seleccionado</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                      <input
                        type="radio"
                        name="ambito"
                        value="semana"
                        checked={ambito === 'semana'}
                        onChange={() => setAmbito('semana')}
                        className="w-4 h-4 text-purple-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Semana completa</div>
                        <div className="text-xs text-gray-600">Distribuye cambios en 7 días</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                      <input
                        type="radio"
                        name="ambito"
                        value="seleccion"
                        checked={ambito === 'seleccion'}
                        onChange={() => setAmbito('seleccion')}
                        className="w-4 h-4 text-purple-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Selección múltiple</div>
                        <div className="text-xs text-gray-600">Solo slots marcados (0 seleccionados)</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Tolerancia */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Tolerancia</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTolerancia(5)}
                      className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                        tolerancia === 5
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ±5%
                    </button>
                    <button
                      onClick={() => setTolerancia(10)}
                      className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                        tolerancia === 10
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ±10%
                    </button>
                  </div>
                </div>

                {/* Ajustes Rápidos */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Ajustes Rápidos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setCaloriasObjetivo(caloriasObjetivo + 200);
                        setAjusteRapido('+200 kcal');
                      }}
                      className="py-2 px-3 text-xs font-semibold bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      +200 kcal
                    </button>
                    <button
                      onClick={() => {
                        setCaloriasObjetivo(Math.max(1200, caloriasObjetivo - 200));
                        setAjusteRapido('-200 kcal');
                      }}
                      className="py-2 px-3 text-xs font-semibold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      -200 kcal
                    </button>
                    <button
                      onClick={() => {
                        setProteinasObjetivo(proteinasObjetivo + 20);
                        setAjusteRapido('+20g proteína');
                      }}
                      className="py-2 px-3 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      +20g proteína
                    </button>
                    <button
                      onClick={() => {
                        setCarbohidratosObjetivo(Math.max(50, carbohidratosObjetivo - 30));
                        setAjusteRapido('-30g carbos');
                      }}
                      className="py-2 px-3 text-xs font-semibold bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
                    >
                      -30g carbos
                    </button>
                    <button
                      onClick={() => {
                        // Distribución alta proteína
                        const totalCals = caloriasObjetivo;
                        setProteinasObjetivo(Math.round(totalCals * 0.35 / 4));
                        setCarbohidratosObjetivo(Math.round(totalCals * 0.35 / 4));
                        setGrasasObjetivo(Math.round(totalCals * 0.30 / 9));
                        setAjusteRapido('Alta proteína');
                      }}
                      className="py-2 px-3 text-xs font-semibold bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      Alta proteína
                    </button>
                    <button
                      onClick={() => {
                        // Distribución keto
                        const totalCals = caloriasObjetivo;
                        setProteinasObjetivo(Math.round(totalCals * 0.25 / 4));
                        setCarbohidratosObjetivo(Math.round(totalCals * 0.10 / 4));
                        setGrasasObjetivo(Math.round(totalCals * 0.65 / 9));
                        setAjusteRapido('Keto');
                      }}
                      className="py-2 px-3 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                    >
                      Keto (65/25/10)
                    </button>
                  </div>
                  {ajusteRapido && (
                    <div className="mt-2 text-xs text-green-600 font-semibold">
                      ✓ Aplicado: {ajusteRapido}
                    </div>
                  )}
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Objetivos Personalizados</h3>

                  {/* Proteínas */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Proteínas</label>
                      <span className="text-lg font-bold text-blue-600">{proteinasObjetivo}g</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={250}
                      value={proteinasObjetivo}
                      onChange={(e) => setProteinasObjetivo(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Carbohidratos */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Carbohidratos</label>
                      <span className="text-lg font-bold text-amber-600">{carbohidratosObjetivo}g</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={350}
                      value={carbohidratosObjetivo}
                      onChange={(e) => setCarbohidratosObjetivo(Number(e.target.value))}
                      className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>

                  {/* Grasas */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Grasas</label>
                      <span className="text-lg font-bold text-purple-600">{grasasObjetivo}g</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={150}
                      value={grasasObjetivo}
                      onChange={(e) => setGrasasObjetivo(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  {/* Calorías */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Calorías</label>
                      <span className="text-lg font-bold text-orange-600">{caloriasObjetivo} kcal</span>
                    </div>
                    <input
                      type="range"
                      min={1200}
                      max={3500}
                      step={50}
                      value={caloriasObjetivo}
                      onChange={(e) => setCaloriasObjetivo(Number(e.target.value))}
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>
                </div>
              </div>

              {/* Panel derecho: Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Vista previa (≤3 cambios/día)</h3>

                {/* Antes/Después */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Antes */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="text-sm font-semibold text-gray-600 mb-3">Antes</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Proteínas</span>
                        <span className="text-sm font-bold text-gray-900">{totalesActuales.proteinas}g</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Carbohidratos</span>
                        <span className="text-sm font-bold text-gray-900">{totalesActuales.carbohidratos}g</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Grasas</span>
                        <span className="text-sm font-bold text-gray-900">{totalesActuales.grasas}g</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                        <span className="text-xs text-gray-600">Calorías</span>
                        <span className="text-sm font-bold text-gray-900">{totalesActuales.calorias} kcal</span>
                      </div>
                    </div>
                  </div>

                  {/* Después */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="text-sm font-semibold text-green-700 mb-3">Después</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Proteínas</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{totalesNuevos.proteinas}g</span>
                          <span className={`text-xs font-semibold ${getDeltaColor(totalesNuevos.proteinas, proteinasObjetivo)}`}>
                            {getDelta(totalesNuevos.proteinas, proteinasObjetivo).deltaStr}g
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Carbohidratos</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{totalesNuevos.carbohidratos}g</span>
                          <span className={`text-xs font-semibold ${getDeltaColor(totalesNuevos.carbohidratos, carbohidratosObjetivo)}`}>
                            {getDelta(totalesNuevos.carbohidratos, carbohidratosObjetivo).deltaStr}g
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Grasas</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{totalesNuevos.grasas}g</span>
                          <span className={`text-xs font-semibold ${getDeltaColor(totalesNuevos.grasas, grasasObjetivo)}`}>
                            {getDelta(totalesNuevos.grasas, grasasObjetivo).deltaStr}g
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-green-300">
                        <span className="text-xs text-gray-600">Calorías</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{totalesNuevos.calorias} kcal</span>
                          <span className={`text-xs font-semibold ${getDeltaColor(totalesNuevos.calorias, caloriasObjetivo)}`}>
                            {getDelta(totalesNuevos.calorias, caloriasObjetivo).deltaStr}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lista de cambios */}
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    Cambios propuestos ({cambiosPropuestos.length})
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {cambiosPropuestos.map((cambio, idx) => (
                      <div key={idx} className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm font-bold text-gray-900">{cambio.recetaActual}</div>
                            <div className="text-xs text-blue-700">→ {cambio.recetaNueva}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-xs">
                          <div className="text-center">
                            <div className="text-blue-600 font-semibold">
                              +{cambio.macrosDespues.proteinas - cambio.macrosAntes.proteinas}g
                            </div>
                            <div className="text-gray-600">P</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-600 font-semibold">
                              +{cambio.macrosDespues.carbohidratos - cambio.macrosAntes.carbohidratos}g
                            </div>
                            <div className="text-gray-600">C</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-600 font-semibold">
                              +{cambio.macrosDespues.grasas - cambio.macrosAntes.grasas}g
                            </div>
                            <div className="text-gray-600">G</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-600 font-semibold">
                              +{cambio.macrosDespues.calorias - cambio.macrosAntes.calorias}
                            </div>
                            <div className="text-gray-600">kcal</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advertencia si hay más de 3 cambios */}
                {cambiosPropuestos.length > 3 && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800">
                      <div className="font-semibold">Máximo 3 cambios por día</div>
                      <div>Para preservar variedad, solo se aplicarán los 3 cambios de menor impacto</div>
                    </div>
                  </div>
                )}
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
              onClick={() => {
                onApply(cambiosPropuestos);
                onClose();
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Aplicar cambios
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
