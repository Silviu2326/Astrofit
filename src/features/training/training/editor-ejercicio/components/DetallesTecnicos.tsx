import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Repeat, Timer, Target, Tag, AlertCircle, Sparkles, TrendingUp, Activity } from 'lucide-react';

interface DetallesTecnicosProps {
  initialTempo: string;
  onTempoChange: (value: string) => void;
  initialRangoRepeticiones: string;
  onRangoRepeticionesChange: (value: string) => void;
  initialMaterialNecesario: string;
  onMaterialNecesarioChange: (value: string) => void;
  initialIndicacionesTecnicas: string;
  onIndicacionesTecnicasChange: (value: string) => void;
  initialErroresComunes: string;
  onErroresComunesChange: (value: string) => void;
  initialEtiquetas: string;
  onEtiquetasChange: (value: string) => void;
}

interface Preset {
  name: string;
  series: string;
  reps: string;
  rest: string;
  icon: React.ReactNode;
  color: string;
}

const DetallesTecnicos: React.FC<DetallesTecnicosProps> = ({
  initialTempo,
  onTempoChange,
  initialRangoRepeticiones,
  onRangoRepeticionesChange,
  initialMaterialNecesario,
  onMaterialNecesarioChange,
  initialIndicacionesTecnicas,
  onIndicacionesTecnicasChange,
  initialErroresComunes,
  onErroresComunesChange,
  initialEtiquetas,
  onEtiquetasChange,
}) => {
  const [tempo, setTempo] = useState(initialTempo);
  const [rangoRepeticiones, setRangoRepeticiones] = useState(initialRangoRepeticiones);
  const [series, setSeries] = useState('3');
  const [descanso, setDescanso] = useState('60');
  const [materialNecesario, setMaterialNecesario] = useState(initialMaterialNecesario);
  const [indicacionesTecnicas, setIndicacionesTecnicas] = useState(initialIndicacionesTecnicas);
  const [erroresComunes, setErroresComunes] = useState(initialErroresComunes);
  const [etiquetas, setEtiquetas] = useState(initialEtiquetas);

  useEffect(() => {
    setTempo(initialTempo);
  }, [initialTempo]);

  useEffect(() => {
    setRangoRepeticiones(initialRangoRepeticiones);
  }, [initialRangoRepeticiones]);

  useEffect(() => {
    setMaterialNecesario(initialMaterialNecesario);
  }, [initialMaterialNecesario]);

  useEffect(() => {
    setIndicacionesTecnicas(initialIndicacionesTecnicas);
  }, [initialIndicacionesTecnicas]);

  useEffect(() => {
    setErroresComunes(initialErroresComunes);
  }, [initialErroresComunes]);

  useEffect(() => {
    setEtiquetas(initialEtiquetas);
  }, [initialEtiquetas]);

  const presets: Preset[] = [
    {
      name: 'Fuerza',
      series: '3-5',
      reps: '3-5',
      rest: '180',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'Hipertrofia',
      series: '4',
      reps: '8-12',
      rest: '90',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Resistencia',
      series: '3',
      reps: '15-20',
      rest: '60',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const applyPreset = (preset: Preset) => {
    setSeries(preset.series);
    setRangoRepeticiones(preset.reps);
    onRangoRepeticionesChange(preset.reps);
    setDescanso(preset.rest);
  };

  return (
    <div className="space-y-8">
      {/* Presets Rápidos */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          Presets de Entrenamiento Rápidos
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <motion.button
              key={preset.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => applyPreset(preset)}
              className={`relative overflow-hidden bg-gradient-to-br ${preset.color} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 text-white text-left group`}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    {preset.icon}
                  </div>
                  <h3 className="text-lg font-bold">{preset.name}</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <Repeat className="w-4 h-4" />
                    <span className="font-semibold">{preset.series}</span> series
                  </p>
                  <p className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span className="font-semibold">{preset.reps}</span> reps
                  </p>
                  <p className="flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    <span className="font-semibold">{preset.rest}s</span> descanso
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Configuración Detallada */}
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl border-2 border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600" />
          Configuración Avanzada
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Series */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Repeat className="w-4 h-4 text-emerald-600" />
              Series Recomendadas
            </label>
            <input
              type="text"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white font-semibold"
              placeholder="Ej: 3-5"
            />
          </div>

          {/* Repeticiones */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              Rango de Repeticiones
            </label>
            <input
              type="text"
              value={rangoRepeticiones}
              onChange={(e) => { setRangoRepeticiones(e.target.value); onRangoRepeticionesChange(e.target.value); }}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white font-semibold"
              placeholder="Ej: 8-12"
            />
          </div>

          {/* Descanso */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Timer className="w-4 h-4 text-emerald-600" />
              Descanso entre Series (segundos)
            </label>
            <input
              type="number"
              value={descanso}
              onChange={(e) => setDescanso(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white font-semibold"
              placeholder="60"
            />
          </div>

          {/* Tempo */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              Tempo/Cadencia
            </label>
            <input
              type="text"
              value={tempo}
              onChange={(e) => { setTempo(e.target.value); onTempoChange(e.target.value); }}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white font-semibold"
              placeholder="Ej: 2-0-1-0"
            />
            <p className="mt-1 text-xs text-slate-500">Excéntrica-Pausa-Concéntrica-Pausa</p>
          </div>
        </div>
      </div>

      {/* Notas Técnicas */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          Notas Técnicas
        </label>
        <textarea
          value={indicacionesTecnicas}
          onChange={(e) => { setIndicacionesTecnicas(e.target.value); onIndicacionesTecnicasChange(e.target.value); }}
          rows={4}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white resize-none"
          placeholder="Consejos sobre la forma, postura, respiración, etc..."
        />
      </div>

      {/* Tags/Etiquetas */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
          <Tag className="w-5 h-5 text-emerald-600" />
          Etiquetas
        </label>
        <input
          type="text"
          value={etiquetas}
          onChange={(e) => { setEtiquetas(e.target.value); onEtiquetasChange(e.target.value); }}
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-300 outline-none bg-white"
          placeholder="Ej: Fuerza, Pecho, Compuesto, Principiante"
        />
        <p className="mt-1 text-xs text-slate-500">Separa las etiquetas con comas</p>
      </div>
    </div>
  );
};

export default DetallesTecnicos;
