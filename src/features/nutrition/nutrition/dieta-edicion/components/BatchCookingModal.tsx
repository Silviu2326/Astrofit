import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChefHat,
  Calendar,
  Clock,
  Thermometer,
  ShoppingCart,
  AlertTriangle,
  Package,
  Snowflake,
  Flame as Fire,
  Wind,
  CheckCircle2,
  Download,
  Printer
} from 'lucide-react';
import { Receta, SesionBatch } from '../types';

interface RecetaBatch extends Receta {
  racionesProducir: number;
  congelable: boolean;
  requiereFrio: boolean;
  duracionSegura: number; // horas
}

interface DistribucionRacion {
  dia: number;
  comida: string;
  raciones: number;
  fechaConsumo: Date;
  alertaCaducidad?: boolean;
}

interface IngredienteCompra {
  nombre: string;
  cantidad: number;
  unidad: string;
  pasillo: string;
  coste: number;
}

interface BatchCookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recetasDisponibles: Receta[];
  onConfirmar: (sesion: SesionBatch, distribuciones: DistribucionRacion[]) => void;
}

const PASILLOS = [
  'Frutas y Verduras',
  'Carnes y Pescados',
  'Lácteos',
  'Panadería',
  'Congelados',
  'Conservas',
  'Cereales y Legumbres',
  'Condimentos'
];

const EQUIPOS = [
  { id: 'horno', nombre: 'Horno', icono: Fire },
  { id: 'microondas', nombre: 'Microondas', icono: Wind },
  { id: 'airfryer', nombre: 'Air Fryer', icono: Wind },
  { id: 'olla_express', nombre: 'Olla Express', icono: Fire }
];

export const BatchCookingModal: React.FC<BatchCookingModalProps> = ({
  isOpen,
  onClose,
  recetasDisponibles,
  onConfirmar
}) => {
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [fechaSesion, setFechaSesion] = useState(new Date().toISOString().split('T')[0]);
  const [duracion, setDuracion] = useState(180); // minutos
  const [equiposSeleccionados, setEquiposSeleccionados] = useState<string[]>(['horno']);
  const [recetasSeleccionadas, setRecetasSeleccionadas] = useState<RecetaBatch[]>([]);
  const [distribucionesAuto, setDistribucionesAuto] = useState<DistribucionRacion[]>([]);

  // Mock: convertir recetas a batch-friendly
  const recetasBatchFriendly = useMemo(() => {
    return recetasDisponibles.map((receta) => ({
      ...receta,
      racionesProducir: 4,
      congelable: ['guiso', 'salsa', 'crema'].some(tipo => receta.nombre.toLowerCase().includes(tipo)),
      requiereFrio: !['ensalada', 'tostada'].some(tipo => receta.nombre.toLowerCase().includes(tipo)),
      duracionSegura: 72 // 3 días por defecto
    }));
  }, [recetasDisponibles]);

  const toggleEquipo = (equipoId: string) => {
    setEquiposSeleccionados(prev =>
      prev.includes(equipoId)
        ? prev.filter(e => e !== equipoId)
        : [...prev, equipoId]
    );
  };

  const toggleReceta = (receta: Receta) => {
    const recetaBatch: RecetaBatch = {
      ...receta,
      racionesProducir: 4,
      congelable: ['guiso', 'salsa', 'crema'].some(tipo => receta.nombre.toLowerCase().includes(tipo)),
      requiereFrio: !['ensalada', 'tostada'].some(tipo => receta.nombre.toLowerCase().includes(tipo)),
      duracionSegura: 72
    };

    setRecetasSeleccionadas(prev => {
      const existe = prev.find(r => r.id === receta.id);
      if (existe) {
        return prev.filter(r => r.id !== receta.id);
      }
      return [...prev, recetaBatch];
    });
  };

  const actualizarRaciones = (recetaId: string, raciones: number) => {
    setRecetasSeleccionadas(prev =>
      prev.map(r => r.id === recetaId ? { ...r, racionesProducir: raciones } : r)
    );
  };

  const generarDistribucionAutomatica = () => {
    const distribuciones: DistribucionRacion[] = [];
    const fechaBase = new Date(fechaSesion);

    recetasSeleccionadas.forEach((receta) => {
      const racionesPorDia = Math.ceil(receta.racionesProducir / 3);
      let racionesRestantes = receta.racionesProducir;
      let diaActual = 0;

      while (racionesRestantes > 0 && diaActual < 7) {
        const racionesHoy = Math.min(racionesPorDia, racionesRestantes);
        const fechaConsumo = new Date(fechaBase);
        fechaConsumo.setDate(fechaBase.getDate() + diaActual + 1); // +1 día después de cocinar

        const horasHastaConsumo = (diaActual + 1) * 24;
        const alertaCaducidad = horasHastaConsumo > (receta.duracionSegura - 12);

        distribuciones.push({
          dia: diaActual + 1,
          comida: 'comida',
          raciones: racionesHoy,
          fechaConsumo,
          alertaCaducidad
        });

        racionesRestantes -= racionesHoy;
        diaActual++;
      }
    });

    setDistribucionesAuto(distribuciones);
  };

  const calcularListaCompra = (): IngredienteCompra[] => {
    // Mock: consolidar ingredientes
    const ingredientes: IngredienteCompra[] = [];

    recetasSeleccionadas.forEach((receta) => {
      // Simulación: cada receta tiene ingredientes base
      ingredientes.push({
        nombre: `Ingredientes para ${receta.nombre}`,
        cantidad: receta.racionesProducir,
        unidad: 'raciones',
        pasillo: 'Frutas y Verduras',
        coste: (receta.coste || 5) * receta.racionesProducir
      });
    });

    // Consolidar por pasillo
    return ingredientes.sort((a, b) => {
      const pasilloA = PASILLOS.indexOf(a.pasillo);
      const pasilloB = PASILLOS.indexOf(b.pasillo);
      return pasilloA - pasilloB;
    });
  };

  const listaCompra = useMemo(() => calcularListaCompra(), [recetasSeleccionadas]);

  const handleConfirmar = () => {
    const sesion: SesionBatch = {
      id: Date.now().toString(),
      fecha: new Date(fechaSesion),
      duracion,
      equipos: equiposSeleccionados,
      recetas: recetasSeleccionadas.map(r => ({
        recetaId: r.id,
        raciones: r.racionesProducir
      }))
    };

    onConfirmar(sesion, distribucionesAuto);
    onClose();
  };

  const exportarListaCompra = (formato: 'csv' | 'pdf') => {
    const contenido = listaCompra
      .map(item => `${item.pasillo},${item.nombre},${item.cantidad} ${item.unidad},${item.coste.toFixed(2)}€`)
      .join('\n');

    const blob = new Blob([`Pasillo,Producto,Cantidad,Coste\n${contenido}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lista-compra-${fechaSesion}.csv`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Planificador Batch Cooking</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Stepper */}
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { num: 1, label: 'Sesión' },
                { num: 2, label: 'Recetas' },
                { num: 3, label: 'Distribución' }
              ].map((step, idx) => (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      paso >= step.num
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {paso > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                    </div>
                    <span className={`text-sm font-semibold ${
                      paso >= step.num ? 'text-purple-700' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${
                      paso > step.num ? 'bg-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Paso 1: Configurar sesión */}
            {paso === 1 && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Fecha de la sesión
                  </label>
                  <input
                    type="date"
                    value={fechaSesion}
                    onChange={(e) => setFechaSesion(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Duración estimada: {duracion} min ({(duracion / 60).toFixed(1)} horas)
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="360"
                    step="30"
                    value={duracion}
                    onChange={(e) => setDuracion(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Thermometer className="w-4 h-4 inline mr-1" />
                    Equipos disponibles
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {EQUIPOS.map((equipo) => {
                      const Icono = equipo.icono;
                      const seleccionado = equiposSeleccionados.includes(equipo.id);
                      return (
                        <button
                          key={equipo.id}
                          onClick={() => toggleEquipo(equipo.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            seleccionado
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icono className="w-6 h-6 mx-auto mb-2" />
                          <p className="text-sm font-semibold">{equipo.nombre}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Paso 2: Seleccionar recetas */}
            {paso === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Selecciona recetas batch-friendly
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-full">
                    {recetasSeleccionadas.length} seleccionadas
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {recetasBatchFriendly.map((receta) => {
                    const seleccionada = recetasSeleccionadas.find(r => r.id === receta.id);
                    return (
                      <div
                        key={receta.id}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          seleccionada
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleReceta(receta)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-900 mb-1">{receta.nombre}</h4>
                            <div className="flex items-center gap-2">
                              {receta.congelable && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                  <Snowflake className="w-3 h-3" />
                                  Congelable
                                </span>
                              )}
                              {receta.requiereFrio && (
                                <span className="px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                  <Thermometer className="w-3 h-3" />
                                  Frío
                                </span>
                              )}
                            </div>
                          </div>
                          {seleccionada && (
                            <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                          )}
                        </div>

                        {seleccionada && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <label className="block text-xs font-bold text-gray-700 mb-2">
                              Raciones a producir
                            </label>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  actualizarRaciones(receta.id, Math.max(1, seleccionada.racionesProducir - 1));
                                }}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
                              >
                                -
                              </button>
                              <span className="flex-1 text-center font-bold text-gray-900">
                                {seleccionada.racionesProducir}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  actualizarRaciones(receta.id, seleccionada.racionesProducir + 1);
                                }}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Paso 3: Distribución y lista de compra */}
            {paso === 3 && (
              <div className="grid grid-cols-2 gap-6">
                {/* Distribución automática */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Distribución semanal</h3>
                    <button
                      onClick={generarDistribucionAutomatica}
                      className="px-3 py-1.5 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Generar automática
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {distribucionesAuto.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8">
                        Genera la distribución automática para ver cómo repartir las raciones
                      </p>
                    ) : (
                      distribucionesAuto.map((dist, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border ${
                            dist.alertaCaducidad
                              ? 'border-orange-300 bg-orange-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-900">
                              Día {dist.dia} • {dist.comida}
                            </span>
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                              {dist.raciones} raciones
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {dist.fechaConsumo.toLocaleDateString('es-ES', {
                              weekday: 'short',
                              day: '2-digit',
                              month: 'short'
                            })}
                          </p>
                          {dist.alertaCaducidad && (
                            <div className="flex items-center gap-1 mt-2 text-orange-700">
                              <AlertTriangle className="w-3 h-3" />
                              <span className="text-xs font-semibold">Cerca de caducidad</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Lista de compra */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-bold text-gray-900">Lista de compra</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => exportarListaCompra('csv')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Descargar CSV"
                      >
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Imprimir"
                      >
                        <Printer className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {PASILLOS.map((pasillo) => {
                      const items = listaCompra.filter(item => item.pasillo === pasillo);
                      if (items.length === 0) return null;

                      return (
                        <div key={pasillo} className="border border-gray-200 rounded-xl overflow-hidden">
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 border-b border-gray-200">
                            <h4 className="text-sm font-bold text-green-900">{pasillo}</h4>
                          </div>
                          <div className="p-3 space-y-2">
                            {items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900">{item.nombre}</p>
                                  <p className="text-xs text-gray-600">
                                    {item.cantidad} {item.unidad}
                                  </p>
                                </div>
                                <span className="font-bold text-gray-900">{item.coste.toFixed(2)}€</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-green-900">Total estimado</span>
                      <span className="text-xl font-bold text-green-900">
                        {listaCompra.reduce((sum, item) => sum + item.coste, 0).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
            <button
              onClick={() => paso > 1 ? setPaso((paso - 1) as 1 | 2 | 3) : onClose()}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
            >
              {paso === 1 ? 'Cancelar' : 'Anterior'}
            </button>

            <div className="flex gap-2">
              {paso < 3 ? (
                <button
                  onClick={() => setPaso((paso + 1) as 1 | 2 | 3)}
                  disabled={paso === 2 && recetasSeleccionadas.length === 0}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  onClick={handleConfirmar}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Confirmar planificación
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
