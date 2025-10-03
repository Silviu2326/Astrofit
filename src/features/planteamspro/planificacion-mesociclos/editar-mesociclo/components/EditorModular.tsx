import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Edit2 } from 'lucide-react';

interface BloqueEntrenamientoProps {
  id: string;
  nombre: string;
  initialVolumen: number;
  initialIntensidad: number;
  onVolumenChange: (id: string, value: number) => void;
  onIntensidadChange: (id: string, value: number) => void;
}

const BloqueEntrenamiento: React.FC<BloqueEntrenamientoProps> = ({
  id,
  nombre,
  initialVolumen,
  initialIntensidad,
  onVolumenChange,
  onIntensidadChange,
}) => {
  const [volumen, setVolumen] = useState<number>(initialVolumen);
  const [intensidad, setIntensidad] = useState<number>(initialIntensidad);

  const handleVolumenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolumen(value);
    onVolumenChange(id, value);
  };

  const handleIntensidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setIntensidad(value);
    onIntensidadChange(id, value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-4 border border-gray-200 hover:border-indigo-300 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

      {/* Header del bloque */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
          <Edit2 className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">{nombre}</h3>
      </div>

      {/* Volumen */}
      <div className="mb-4 relative z-10">
        <label htmlFor={`volumen-${id}`} className="block text-gray-700 text-sm font-bold mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            Volumen
          </span>
          <span className="text-emerald-600 text-base">{volumen}%</span>
        </label>
        <input
          type="range"
          id={`volumen-${id}`}
          min="0"
          max="100"
          value={volumen}
          onChange={handleVolumenChange}
          className="w-full h-3 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #10b981 0%, #10b981 ${volumen}%, #d1fae5 ${volumen}%, #d1fae5 100%)`
          }}
        />
        {/* Barra de progreso visual */}
        <div className="mt-2 w-full bg-emerald-100 rounded-full h-2 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${volumen}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          ></motion.div>
        </div>
      </div>

      {/* Intensidad */}
      <div className="relative z-10">
        <label htmlFor={`intensidad-${id}`} className="block text-gray-700 text-sm font-bold mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-600" />
            Intensidad
          </span>
          <span className="text-orange-600 text-base">{intensidad}%</span>
        </label>
        <input
          type="range"
          id={`intensidad-${id}`}
          min="0"
          max="100"
          value={intensidad}
          onChange={handleIntensidadChange}
          className="w-full h-3 bg-gradient-to-r from-orange-200 to-red-200 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${intensidad}%, #fed7aa ${intensidad}%, #fed7aa 100%)`
          }}
        />
        {/* Barra de progreso visual */}
        <div className="mt-2 w-full bg-orange-100 rounded-full h-2 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${intensidad}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const EditorModular: React.FC = () => {
  const [bloques, setBloques] = useState([
    { id: 'b1', nombre: 'Bloque de Fuerza', volumen: 50, intensidad: 70 },
    { id: 'b2', nombre: 'Bloque de Resistencia', volumen: 60, intensidad: 50 },
  ]);

  const handleVolumenChange = (id: string, value: number) => {
    setBloques((prev) =>
      prev.map((bloque) => (bloque.id === id ? { ...bloque, volumen: value } : bloque))
    );
  };

  const handleIntensidadChange = (id: string, value: number) => {
    setBloques((prev) =>
      prev.map((bloque) => (bloque.id === id ? { ...bloque, intensidad: value } : bloque))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-6 relative"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Edit2 className="w-6 h-6" />
          </div>
          Editor Modular de Bloques de Entrenamiento
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        {bloques.map((bloque, index) => (
          <motion.div
            key={bloque.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
          >
            <BloqueEntrenamiento
              {...bloque}
              initialVolumen={bloque.volumen}
              initialIntensidad={bloque.intensidad}
              onVolumenChange={handleVolumenChange}
              onIntensidadChange={handleIntensidadChange}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EditorModular;
