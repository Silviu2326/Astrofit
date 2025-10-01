import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Activity, Repeat, Target, Clock, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { objetivosPresets, nivelesActividad, velocidadesProgreso } from '../mockData';

interface ObjetivoConfigProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData: any;
}

const ObjetivoConfig: React.FC<ObjetivoConfigProps> = ({ onNext, onBack, initialData }) => {
  const [objetivoId, setObjetivoId] = useState<string>(initialData.objetivoId || '');
  const [nivelActividad, setNivelActividad] = useState<string>(initialData.nivelActividad || '');
  const [velocidadProgreso, setVelocidadProgreso] = useState<string>(initialData.velocidadProgreso || '');
  const [tipoDieta, setTipoDieta] = useState<string>(initialData.tipoDieta || 'flexible');

  const handleSubmit = () => {
    if (!objetivoId || !nivelActividad || !velocidadProgreso) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const objetivoSelected = objetivosPresets.find(o => o.id === objetivoId);
    onNext({
      objetivoId,
      objetivo: objetivoSelected,
      nivelActividad,
      velocidadProgreso,
      tipoDieta
    });
  };

  const getObjetivoIcon = (icono: string) => {
    const icons: any = {
      '📉': TrendingDown,
      '💪': TrendingUp,
      '⚖️': Activity,
      '🔄': Repeat
    };
    const IconComponent = icons[icono] || Target;
    return <IconComponent className="w-8 h-8" />;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurar Objetivo</h2>

        {/* Objetivos principales */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-600" />
            Selecciona tu objetivo principal *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objetivosPresets.map((objetivo, index) => (
              <motion.div
                key={objetivo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setObjetivoId(objetivo.id)}
                className={`
                  relative overflow-hidden p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2
                  ${objetivoId === objetivo.id
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 border-orange-500 shadow-xl scale-105'
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-amber-300 hover:shadow-lg'
                  }
                `}
              >
                {/* Decoración de fondo */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-20
                  ${objetivoId === objetivo.id ? 'bg-white' : 'bg-amber-500'}
                `}></div>

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-colors
                    ${objetivoId === objetivo.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                    }
                  `}>
                    <span className="text-3xl">{objetivo.icono}</span>
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${objetivoId === objetivo.id ? 'text-white' : 'text-gray-900'}`}>
                    {objetivo.nombre}
                  </h3>
                  <p className={`text-sm mb-3 ${objetivoId === objetivo.id ? 'text-white/90' : 'text-gray-600'}`}>
                    {objetivo.descripcion}
                  </p>

                  <div className={`text-xs font-semibold ${objetivoId === objetivo.id ? 'text-white' : 'text-gray-700'}`}>
                    Macros: {objetivo.distribucionMacros.proteinas}% P / {objetivo.distribucionMacros.carbohidratos}% C / {objetivo.distribucionMacros.grasas}% G
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nivel de actividad */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-600" />
            Nivel de actividad física *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {nivelesActividad.map((nivel, index) => (
              <motion.div
                key={nivel.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setNivelActividad(nivel.id)}
                className={`
                  p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 text-center
                  ${nivelActividad === nivel.id
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500 shadow-lg text-white'
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                <p className={`font-bold text-sm mb-1 ${nivelActividad === nivel.id ? 'text-white' : 'text-gray-900'}`}>
                  {nivel.label}
                </p>
                <p className={`text-xs ${nivelActividad === nivel.id ? 'text-white/90' : 'text-gray-600'}`}>
                  {nivel.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Velocidad de progreso */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Velocidad de progreso *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {velocidadesProgreso.map((velocidad, index) => (
              <motion.div
                key={velocidad.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setVelocidadProgreso(velocidad.id)}
                className={`
                  p-5 rounded-xl cursor-pointer transition-all duration-300 border-2
                  ${velocidadProgreso === velocidad.id
                    ? 'bg-gradient-to-br from-purple-500 to-pink-600 border-purple-500 shadow-lg'
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-purple-300'
                  }
                `}
              >
                <h4 className={`font-bold text-lg mb-2 ${velocidadProgreso === velocidad.id ? 'text-white' : 'text-gray-900'}`}>
                  {velocidad.label}
                </h4>
                <p className={`text-sm ${velocidadProgreso === velocidad.id ? 'text-white/90' : 'text-gray-600'}`}>
                  {velocidad.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tipo de dieta preferida */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-600" />
            Tipo de dieta preferida
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'flexible', label: 'Flexible', emoji: '🍽️' },
              { id: 'vegetariana', label: 'Vegetariana', emoji: '🥗' },
              { id: 'vegana', label: 'Vegana', emoji: '🌱' },
              { id: 'cetogenica', label: 'Cetogénica', emoji: '🥓' },
              { id: 'paleo', label: 'Paleo', emoji: '🍖' },
              { id: 'mediterranea', label: 'Mediterránea', emoji: '🫒' },
              { id: 'sin-gluten', label: 'Sin Gluten', emoji: '🌾' },
              { id: 'sin-lactosa', label: 'Sin Lactosa', emoji: '🥛' }
            ].map((tipo) => (
              <div
                key={tipo.id}
                onClick={() => setTipoDieta(tipo.id)}
                className={`
                  p-3 rounded-xl cursor-pointer transition-all duration-300 border-2 text-center
                  ${tipoDieta === tipo.id
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-500 shadow-lg'
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-emerald-300'
                  }
                `}
              >
                <div className="text-2xl mb-1">{tipo.emoji}</div>
                <p className={`text-xs font-semibold ${tipoDieta === tipo.id ? 'text-white' : 'text-gray-900'}`}>
                  {tipo.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Botones de navegación */}
      <div className="flex gap-4">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onBack}
          className="px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleSubmit}
          disabled={!objetivoId || !nivelActividad || !velocidadProgreso}
          className={`
            flex-1 py-4 rounded-2xl font-bold text-white text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-2
            ${objetivoId && nivelActividad && velocidadProgreso
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:shadow-2xl hover:scale-[1.02]'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          Continuar al Calculador de Macros
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ObjetivoConfig;
