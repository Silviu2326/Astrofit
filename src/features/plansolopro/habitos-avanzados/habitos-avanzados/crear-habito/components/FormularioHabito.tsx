import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dumbbell, Coffee, Book, Droplet, Moon, Heart,
  Brain, Target, Edit3, Palette
} from 'lucide-react';

interface FormularioHabitoProps {
  data: {
    nombre: string;
    descripcion: string;
    icono: string;
    color: string;
    categoria: string;
  };
  onUpdate: (data: any) => void;
}

const FormularioHabito: React.FC<FormularioHabitoProps> = ({ data, onUpdate }) => {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const iconos = [
    { emoji: '💪', name: 'Ejercicio', Icon: Dumbbell },
    { emoji: '☕', name: 'Bebida', Icon: Coffee },
    { emoji: '📚', name: 'Lectura', Icon: Book },
    { emoji: '💧', name: 'Hidratación', Icon: Droplet },
    { emoji: '🌙', name: 'Sueño', Icon: Moon },
    { emoji: '❤️', name: 'Salud', Icon: Heart },
    { emoji: '🧠', name: 'Mental', Icon: Brain },
    { emoji: '🎯', name: 'Meta', Icon: Target },
    { emoji: '✏️', name: 'Escribir', Icon: Edit3 },
    { emoji: '🎨', name: 'Arte', Icon: Palette }
  ];

  const colores = [
    { value: '#3b82f6', name: 'Azul', gradient: 'from-blue-400 to-blue-600' },
    { value: '#8b5cf6', name: 'Morado', gradient: 'from-purple-400 to-purple-600' },
    { value: '#ec4899', name: 'Rosa', gradient: 'from-pink-400 to-pink-600' },
    { value: '#10b981', name: 'Verde', gradient: 'from-emerald-400 to-emerald-600' },
    { value: '#f59e0b', name: 'Naranja', gradient: 'from-amber-400 to-amber-600' },
    { value: '#06b6d4', name: 'Cyan', gradient: 'from-cyan-400 to-cyan-600' },
    { value: '#ef4444', name: 'Rojo', gradient: 'from-red-400 to-red-600' },
    { value: '#6366f1', name: 'Indigo', gradient: 'from-indigo-400 to-indigo-600' }
  ];

  const categorias = [
    'Salud y Fitness',
    'Nutrición',
    'Productividad',
    'Desarrollo Personal',
    'Bienestar Mental',
    'Relaciones',
    'Finanzas',
    'Aprendizaje'
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Información Básica
        </h2>

        <div className="space-y-6">
          {/* Icono y Color */}
          <div className="grid grid-cols-2 gap-4">
            {/* Selector de Icono */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Icono del Hábito
              </label>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setShowIconPicker(!showIconPicker)}
                  className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm flex items-center justify-center text-4xl"
                >
                  {data.icono}
                </motion.button>

                {showIconPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-20 mt-2 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-gray-200"
                  >
                    <div className="grid grid-cols-5 gap-2">
                      {iconos.map((icono) => (
                        <motion.button
                          key={icono.emoji}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => {
                            onUpdate({ icono: icono.emoji });
                            setShowIconPicker(false);
                          }}
                          className={`p-3 rounded-xl transition-all duration-300 text-2xl ${
                            data.icono === icono.emoji
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {icono.emoji}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Selector de Color */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Color de Categoría
              </label>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                >
                  <div
                    className="w-full h-8 rounded-xl shadow-inner"
                    style={{ backgroundColor: data.color }}
                  ></div>
                </motion.button>

                {showColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-20 mt-2 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-gray-200"
                  >
                    <div className="grid grid-cols-4 gap-2">
                      {colores.map((color) => (
                        <motion.button
                          key={color.value}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => {
                            onUpdate({ color: color.value });
                            setShowColorPicker(false);
                          }}
                          className={`h-12 rounded-xl bg-gradient-to-br ${color.gradient} shadow-md ${
                            data.color === color.value ? 'ring-4 ring-gray-400 ring-offset-2' : ''
                          }`}
                        ></motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Nombre del Hábito */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nombre del Hábito *
            </label>
            <input
              type="text"
              value={data.nombre}
              onChange={(e) => onUpdate({ nombre: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              placeholder="Ej: Beber 2L de agua al día"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={data.categoria}
              onChange={(e) => onUpdate({ categoria: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              value={data.descripcion}
              onChange={(e) => onUpdate({ descripcion: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
              placeholder="Describe tu hábito en detalle..."
              rows={4}
            />
          </div>

          {/* Plantillas Rápidas */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-bold text-gray-700 mb-3">
              O elige una plantilla rápida:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { nombre: 'Ejercicio Diario', icono: '💪', categoria: 'Salud y Fitness', color: '#10b981' },
                { nombre: 'Meditar 10 min', icono: '🧠', categoria: 'Bienestar Mental', color: '#8b5cf6' },
                { nombre: 'Leer 30 min', icono: '📚', categoria: 'Aprendizaje', color: '#3b82f6' },
                { nombre: 'Beber 2L agua', icono: '💧', categoria: 'Salud y Fitness', color: '#06b6d4' }
              ].map((template, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => onUpdate(template)}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{template.icono}</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {template.nombre}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioHabito;
