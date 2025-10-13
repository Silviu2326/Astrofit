import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, TrendingUp, Award } from 'lucide-react';
import { Prospecto } from '../listadoJugadoresApi';

interface TarjetasProspectosProps {
  jugador?: Prospecto; // Hacerlo opcional para el placeholder inicial
}

const TarjetasProspectos: React.FC<TarjetasProspectosProps> = ({ jugador }) => {
  // Datos de ejemplo si no se proporciona un prospecto (para el placeholder)
  const defaultProspecto: Prospecto = {
    id: '0',
    nombre: 'Nombre del Jugador',
    edad: 19,
    posicion: 'Posición',
    clubActual: 'Club Ejemplo',
    nacionalidad: 'Nacionalidad',
    fotoUrl: 'https://via.placeholder.com/150',
    nivel: 'Medio',
    potencial: 'Alto',
    estado: 'en evaluación',
    caracteristicas: ['Característica 1', 'Característica 2'],
  };

  const currentProspecto = jugador || defaultProspecto;

  const getEstadoConfig = (estado: Prospecto['estado']) => {
    switch (estado) {
      case 'seguimiento activo':
        return { bg: 'bg-gradient-to-r from-green-500 to-emerald-500', text: 'text-white' };
      case 'en evaluación':
        return { bg: 'bg-gradient-to-r from-yellow-500 to-orange-500', text: 'text-white' };
      case 'descartado':
        return { bg: 'bg-gradient-to-r from-red-500 to-pink-500', text: 'text-white' };
      case 'fichado':
        return { bg: 'bg-gradient-to-r from-blue-500 to-indigo-500', text: 'text-white' };
      default:
        return { bg: 'bg-gradient-to-r from-gray-500 to-gray-600', text: 'text-white' };
    }
  };

  const getNivelPotencialConfig = (value: Prospecto['nivel'] | Prospecto['potencial']) => {
    switch (value) {
      case 'Bajo': return { bg: 'from-red-400 to-red-600', stars: 2 };
      case 'Medio': return { bg: 'from-yellow-400 to-orange-500', stars: 3 };
      case 'Alto': return { bg: 'from-green-400 to-emerald-500', stars: 4 };
      case 'Estrella': return { bg: 'from-purple-400 to-pink-500', stars: 5 };
      default: return { bg: 'from-gray-400 to-gray-500', stars: 1 };
    }
  };

  const estadoConfig = getEstadoConfig(currentProspecto.estado);
  const nivelConfig = getNivelPotencialConfig(currentProspecto.nivel);
  const potencialConfig = getNivelPotencialConfig(currentProspecto.potencial);

  // Función para renderizar estrellas de rating
  const renderStars = (count: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Imagen de fondo con overlay gradiente */}
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={currentProspecto.fotoUrl}
          alt={currentProspecto.nombre}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Badge de estado flotante */}
        <div className="absolute top-3 right-3">
          <div className={`${estadoConfig.bg} ${estadoConfig.text} px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-white/20`}>
            {currentProspecto.estado}
          </div>
        </div>

        {/* Avatar con border gradiente */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${potencialConfig.bg} rounded-full blur-md opacity-70`}></div>
            <div className="relative w-24 h-24 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={currentProspecto.fotoUrl}
                alt={currentProspecto.nombre}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 p-6 pt-16">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-1">{currentProspecto.nombre}</h3>

        {/* Badge de posición y edad */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold rounded-full">
            {currentProspecto.posicion}
          </div>
          <span className="text-gray-600 text-sm font-semibold">{currentProspecto.edad} años</span>
        </div>

        {/* Información del club y nacionalidad */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <Award className="w-4 h-4 text-blue-500" />
            <span className="font-medium">{currentProspecto.clubActual}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-purple-500" />
            <span className="font-medium">{currentProspecto.nacionalidad}</span>
          </div>
        </div>

        {/* Rating section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 mb-4 space-y-3">
          {/* Nivel */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Nivel</span>
              <span className={`text-xs font-bold bg-gradient-to-r ${nivelConfig.bg} bg-clip-text text-transparent`}>
                {currentProspecto.nivel}
              </span>
            </div>
            <div className="flex justify-center">
              {renderStars(nivelConfig.stars)}
            </div>
          </div>

          {/* Potencial */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Potencial</span>
              <span className={`text-xs font-bold bg-gradient-to-r ${potencialConfig.bg} bg-clip-text text-transparent`}>
                {currentProspecto.potencial}
              </span>
            </div>
            <div className="flex justify-center">
              {renderStars(potencialConfig.stars)}
            </div>
          </div>

          {/* Progress bar decorativa */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(potencialConfig.stars / 5) * 100}%` }}
              transition={{ delay: 0.3, duration: 1 }}
              className={`h-full bg-gradient-to-r ${potencialConfig.bg} rounded-full relative`}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Características */}
        <div className="flex flex-wrap gap-2 justify-center">
          {currentProspecto.caracteristicas.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Botón de acción */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Ver Detalles
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TarjetasProspectos;
