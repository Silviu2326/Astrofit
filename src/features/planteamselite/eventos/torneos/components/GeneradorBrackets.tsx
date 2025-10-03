import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Users, Zap, Settings, CheckCircle } from 'lucide-react';

const GeneradorBrackets: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>('');

  const bracketFormats = [
    {
      id: 'eliminacion',
      name: 'Eliminación Directa',
      icon: GitBranch,
      description: 'Sistema de eliminación simple o doble',
      color: 'from-red-500 to-orange-500',
      teams: '4-64 equipos'
    },
    {
      id: 'liga',
      name: 'Liga/Round Robin',
      icon: Users,
      description: 'Todos contra todos en formato liga',
      color: 'from-blue-500 to-indigo-500',
      teams: '4-16 equipos'
    },
    {
      id: 'suizo',
      name: 'Sistema Suizo',
      icon: Zap,
      description: 'Emparejamientos basados en rendimiento',
      color: 'from-purple-500 to-pink-500',
      teams: '8-128 equipos'
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Generador de Brackets</h2>
        </div>

        <p className="relative z-10 mt-3 text-purple-100">
          Selecciona el formato ideal para tu torneo y genera brackets profesionales
        </p>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bracketFormats.map((format, index) => (
            <motion.div
              key={format.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -8 }}
              onClick={() => setSelectedFormat(format.id)}
              className={`cursor-pointer relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border-2 ${
                selectedFormat === format.id
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                  : 'border-white/50 bg-white/80 hover:border-purple-300'
              } group`}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${format.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${format.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <format.icon className="w-8 h-8" />
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {format.name}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {format.description}
                </p>

                {/* Badge de equipos */}
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-purple-50 rounded-lg">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-xs font-semibold text-purple-700">{format.teams}</span>
                </div>

                {/* Check si seleccionado */}
                {selectedFormat === format.id && (
                  <div className="absolute top-4 right-4">
                    <div className="p-2 bg-green-500 rounded-full shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Configuración adicional */}
        {selectedFormat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500 rounded-xl">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Configuración del Torneo</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Número de equipos */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Número de Equipos
                </label>
                <input
                  type="number"
                  min="4"
                  max="64"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white"
                  placeholder="Ej: 16"
                />
              </div>

              {/* Nombre del torneo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Torneo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white"
                  placeholder="Ej: Copa de Primavera 2024"
                />
              </div>
            </div>

            {/* Botón generar */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group border border-white/20"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Generar Brackets</span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GeneradorBrackets;
