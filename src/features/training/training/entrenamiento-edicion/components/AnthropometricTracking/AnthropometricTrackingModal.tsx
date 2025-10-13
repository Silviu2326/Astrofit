import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, TrendingUp, TrendingDown, Ruler, Scale, User, Calendar, Upload, Image as ImageIcon } from 'lucide-react';

interface Measurement {
  date: string;
  weight: number;
  bodyFat?: number;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
    thigh: number;
    arm: number;
    calf: number;
  };
  photos?: {
    front: string;
    side: string;
    back: string;
  };
}

interface AnthropometricTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  clientId: string;
}

const AnthropometricTrackingModal: React.FC<AnthropometricTrackingModalProps> = ({
  isOpen,
  onClose,
  clientName,
  clientId
}) => {
  const [view, setView] = useState<'chart' | 'photos' | 'add'>('chart');

  // Mock data - en producción vendría de la BD
  const measurements: Measurement[] = [
    {
      date: '2024-01-01',
      weight: 80,
      bodyFat: 18,
      measurements: { chest: 100, waist: 85, hips: 95, thigh: 58, arm: 38, calf: 37 },
      photos: { front: 'https://via.placeholder.com/300x400', side: 'https://via.placeholder.com/300x400', back: 'https://via.placeholder.com/300x400' }
    },
    {
      date: '2024-01-15',
      weight: 79,
      bodyFat: 17,
      measurements: { chest: 101, waist: 84, hips: 95, thigh: 59, arm: 39, calf: 37 },
    },
    {
      date: '2024-02-01',
      weight: 78.5,
      bodyFat: 16,
      measurements: { chest: 102, waist: 83, hips: 95, thigh: 60, arm: 40, calf: 38 },
      photos: { front: 'https://via.placeholder.com/300x400', side: 'https://via.placeholder.com/300x400', back: 'https://via.placeholder.com/300x400' }
    },
    {
      date: '2024-02-15',
      weight: 79,
      bodyFat: 15.5,
      measurements: { chest: 103, waist: 82, hips: 96, thigh: 61, arm: 41, calf: 38 },
    },
    {
      date: '2024-03-01',
      weight: 80,
      bodyFat: 15,
      measurements: { chest: 104, waist: 81, hips: 96, thigh: 62, arm: 42, calf: 39 },
      photos: { front: 'https://via.placeholder.com/300x400', side: 'https://via.placeholder.com/300x400', back: 'https://via.placeholder.com/300x400' }
    },
  ];

  const latestMeasurement = measurements[measurements.length - 1];
  const firstMeasurement = measurements[0];

  // Calcular cambios
  const changes = useMemo(() => {
    return {
      weight: latestMeasurement.weight - firstMeasurement.weight,
      bodyFat: (latestMeasurement.bodyFat || 0) - (firstMeasurement.bodyFat || 0),
      chest: latestMeasurement.measurements.chest - firstMeasurement.measurements.chest,
      waist: latestMeasurement.measurements.waist - firstMeasurement.measurements.waist,
      arm: latestMeasurement.measurements.arm - firstMeasurement.measurements.arm,
    };
  }, [latestMeasurement, firstMeasurement]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-green-500/20"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-blue-600 p-6 flex items-center justify-between border-b border-green-400/30">
          <div className="flex items-center gap-3">
            <Ruler className="w-8 h-8 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">Tracking Antropométrico</h2>
              <p className="text-green-100 text-sm">{clientName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* View Selector */}
        <div className="p-4 bg-gray-800/50 border-b border-gray-700 flex gap-2">
          <button
            onClick={() => setView('chart')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              view === 'chart'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            📊 Gráficos
          </button>
          <button
            onClick={() => setView('photos')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              view === 'photos'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            📸 Fotos de Progreso
          </button>
          <button
            onClick={() => setView('add')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              view === 'add'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            ➕ Añadir Medición
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Vista de Gráficos */}
            {view === 'chart' && (
              <motion.div
                key="chart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* KPIs Principales */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-300 text-sm font-semibold">Peso</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{latestMeasurement.weight} kg</div>
                    <div className={`text-sm flex items-center gap-1 mt-1 ${changes.weight >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {changes.weight >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {changes.weight >= 0 ? '+' : ''}{changes.weight.toFixed(1)} kg
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-300 text-sm font-semibold">% Grasa</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{latestMeasurement.bodyFat}%</div>
                    <div className={`text-sm flex items-center gap-1 mt-1 ${changes.bodyFat <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {changes.bodyFat <= 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                      {changes.bodyFat.toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="w-5 h-5 text-green-400" />
                      <span className="text-green-300 text-sm font-semibold">Pecho</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{latestMeasurement.measurements.chest} cm</div>
                    <div className={`text-sm flex items-center gap-1 mt-1 ${changes.chest >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {changes.chest >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {changes.chest >= 0 ? '+' : ''}{changes.chest} cm
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-300 text-sm font-semibold">Brazo</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{latestMeasurement.measurements.arm} cm</div>
                    <div className={`text-sm flex items-center gap-1 mt-1 ${changes.arm >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {changes.arm >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {changes.arm >= 0 ? '+' : ''}{changes.arm} cm
                    </div>
                  </div>
                </div>

                {/* Gráfico de Peso */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-blue-400" />
                    Evolución de Peso
                  </h3>
                  <div className="space-y-2">
                    {measurements.map((m, i) => {
                      const maxWeight = Math.max(...measurements.map(m => m.weight));
                      const minWeight = Math.min(...measurements.map(m => m.weight));
                      const range = maxWeight - minWeight;
                      const percentage = range > 0 ? ((m.weight - minWeight) / range) * 100 : 50;

                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{new Date(m.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                            <span className="text-white font-semibold">{m.weight} kg</span>
                          </div>
                          <div className="h-3 bg-gray-700 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className="absolute left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Perímetros Musculares */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-green-400" />
                    Perímetros Musculares (Última Medición)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(latestMeasurement.measurements).map(([part, value]) => {
                      const previous = firstMeasurement.measurements[part as keyof typeof firstMeasurement.measurements];
                      const change = value - previous;

                      return (
                        <div key={part} className="bg-gray-700/50 rounded-lg p-4">
                          <div className="text-sm text-gray-400 mb-1 capitalize">{part}</div>
                          <div className="text-xl font-bold text-white">{value} cm</div>
                          <div className={`text-xs flex items-center gap-1 mt-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {change >= 0 ? '+' : ''}{change} cm total
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Correlación con Volumen */}
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">📈 Correlación con Entrenamiento</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Masa muscular ganada (estimado)</span>
                      <span className="text-white font-bold">+2.1 kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Grasa perdida (estimado)</span>
                      <span className="text-white font-bold">-3.1 kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Volumen total promedio/semana</span>
                      <span className="text-white font-bold">18,500 kg</span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                      <p className="text-sm text-blue-300">
                        💡 <strong>Insight:</strong> El incremento de {changes.chest} cm en pecho coincide con un aumento del 15% en volumen de empuje. ¡Excelente correlación!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Vista de Fotos */}
            {view === 'photos' && (
              <motion.div
                key="photos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {measurements.filter(m => m.photos).reverse().map((m, idx) => (
                  <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-400" />
                        {new Date(m.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </h3>
                      <div className="text-sm text-gray-400">
                        {m.weight} kg • {m.bodyFat}% grasa
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {m.photos && (
                        <>
                          <div className="relative group">
                            <img
                              src={m.photos.front}
                              alt="Frente"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold">Vista Frontal</span>
                            </div>
                          </div>
                          <div className="relative group">
                            <img
                              src={m.photos.side}
                              alt="Lateral"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold">Vista Lateral</span>
                            </div>
                          </div>
                          <div className="relative group">
                            <img
                              src={m.photos.back}
                              alt="Espalda"
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold">Vista Posterior</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Vista de Añadir */}
            {view === 'add' && (
              <motion.div
                key="add"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6">Nueva Medición</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Fecha</label>
                    <input
                      type="date"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="75.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">% Grasa Corporal</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="15.5"
                    />
                  </div>

                  {/* Perímetros */}
                  {['Pecho', 'Cintura', 'Cadera', 'Muslo', 'Brazo', 'Gemelo'].map((part) => (
                    <div key={part}>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">{part} (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>

                {/* Upload de Fotos */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Fotos de Progreso</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Frontal', 'Lateral', 'Posterior'].map((view) => (
                      <div key={view} className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-400">Vista {view}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-bold">
                  Guardar Medición
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AnthropometricTrackingModal;
