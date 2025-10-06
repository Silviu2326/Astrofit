import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, MapPin, Clock, CheckCircle, User } from 'lucide-react';

const GestionArbitros: React.FC = () => {
  const referees = [
    { id: 1, name: 'Juan Martínez', matches: 8, rating: 4.8, status: 'available', location: 'Estadio A' },
    { id: 2, name: 'María González', matches: 12, rating: 4.9, status: 'assigned', location: 'Estadio B' },
    { id: 3, name: 'Carlos Ruiz', matches: 5, rating: 4.6, status: 'available', location: 'Estadio C' },
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

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Gestión de Árbitros</h2>
          </div>
          <p className="text-purple-100 ml-12">
            Administra árbitros, horarios y asignaciones de sedes
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {referees.map((referee, index) => (
            <motion.div
              key={referee.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 bg-white/80 group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10 p-6">
                {/* Avatar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                    {referee.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{referee.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i < Math.floor(referee.rating)
                              ? 'bg-yellow-400'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                      <span className="text-xs font-semibold text-gray-600 ml-1">{referee.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-xl">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-700">{referee.matches} partidos</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-xl">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">{referee.location}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {referee.status === 'available' ? (
                    <div className="flex-1 px-3 py-2 bg-green-100 rounded-xl flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-700">Disponible</span>
                    </div>
                  ) : (
                    <div className="flex-1 px-3 py-2 bg-orange-100 rounded-xl flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-bold text-orange-700">Asignado</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group border border-white/20"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center gap-2">
              <User className="w-5 h-5" />
              <span>Agregar Nuevo Árbitro</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default GestionArbitros;
