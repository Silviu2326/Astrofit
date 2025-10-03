import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  User,
  Clock,
  Star,
  Calendar,
  CheckCircle,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { getProductosByType, Producto } from '../productosServiciosApi';

const SesionesIndividuales: React.FC = () => {
  const [sesiones, setSesiones] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        const data = await getProductosByType('individual');
        setSesiones(data);
      } catch (error) {
        toast.error('Error al cargar las sesiones individuales');
      }
    };
    fetchSesiones();
  }, []);

  const handleReserveSession = (sesion: Producto) => {
    if (!sesion.disponibilidad) {
      toast.error('Esta sesión no está disponible actualmente');
      return;
    }
    toast.success(`Sesión "${sesion.nombre}" reservada exitosamente`);
  };

  const handleContactTrainer = (sesion: Producto) => {
    toast.success(`Te hemos conectado con el entrenador de "${sesion.nombre}". Te contactará pronto.`);
  };

  // Mock data para entrenadores
  const entrenadoresMock = [
    { nombre: 'Carlos Ruiz', avatar: '👨‍🏫', especialidad: 'Fuerza', rating: 4.9 },
    { nombre: 'María García', avatar: '👩‍🏫', especialidad: 'Cardio', rating: 4.8 },
    { nombre: 'Pedro López', avatar: '👨‍💼', especialidad: 'Funcional', rating: 5.0 },
  ];

  // Mock: disponibilidad por horario
  const horariosDisponibles = ['09:00', '11:00', '14:00', '16:00', '18:00', '20:00'];

  const getDuracionMinutos = (duracion: string): string => {
    const match = duracion.match(/\d+/);
    return match ? `${match[0]} min` : duracion;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full mb-4"
        >
          <User className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-bold text-blue-900">Sesiones Individuales</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Entrenamiento Personalizado
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Sesiones uno a uno con nuestros entrenadores certificados
        </motion.p>
      </div>

      {/* Sesiones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sesiones.map((sesion, index) => {
          // Asignar entrenador aleatorio
          const entrenador = entrenadoresMock[index % entrenadoresMock.length];

          // Mock: número de sesiones realizadas
          const sesionesRealizadas = Math.floor(Math.random() * 100) + 20;

          return (
            <motion.div
              key={sesion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Contenido principal */}
              <div className="p-8 relative z-10">
                {/* Header con avatar del entrenador */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{sesion.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-4">{sesion.descripcion}</p>

                    {/* Precio destacado */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        €{sesion.precio}
                      </span>
                      <span className="text-lg text-gray-500">/ sesión</span>
                    </div>
                  </div>

                  {/* Avatar y rating del entrenador */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl mb-2 shadow-xl">
                      {entrenador.avatar}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-xs font-bold text-yellow-700">{entrenador.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Información del entrenador */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-1">Entrenador</p>
                      <p className="text-sm font-bold text-gray-900">{entrenador.nombre}</p>
                      <p className="text-xs text-gray-600">Especialidad: {entrenador.especialidad}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Sesiones</p>
                      <p className="text-lg font-bold text-blue-600">{sesionesRealizadas}+</p>
                    </div>
                  </div>
                </div>

                {/* Detalles de la sesión */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Duración</p>
                      <p className="text-sm font-bold text-gray-900">{getDuracionMinutos(sesion.duracion)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Modalidad</p>
                      <p className="text-sm font-bold text-gray-900 capitalize">{sesion.modalidad}</p>
                    </div>
                  </div>
                </div>

                {/* Características */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Incluye:</p>
                  {sesion.caracteristicas.map((caracteristica, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{caracteristica}</span>
                    </div>
                  ))}
                </div>

                {/* Disponibilidad de horarios */}
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Horarios disponibles hoy:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {horariosDisponibles.slice(0, 4).map((horario, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 bg-white border-2 border-blue-200 rounded-lg text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        {horario}
                      </div>
                    ))}
                    <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-semibold text-gray-600">
                      +2 más
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReserveSession(sesion)}
                    disabled={!sesion.disponibilidad}
                    className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                      sesion.disponibilidad
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    } flex items-center justify-center gap-2`}
                  >
                    <Calendar className="w-5 h-5" />
                    {sesion.disponibilidad ? 'Reservar Ahora' : 'No Disponible'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleContactTrainer(sesion)}
                    className="px-4 py-3 border-2 border-blue-500 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Decorative blur orb */}
              <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-3xl opacity-20"></div>
            </motion.div>
          );
        })}
      </div>

      {/* Beneficios de las sesiones individuales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        {/* Pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <User className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-white mb-4">¿Por qué elegir sesiones individuales?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <CheckCircle className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">100% Personalizado</h4>
              <p className="text-white/90 text-sm">
                Entrenamientos adaptados a tus objetivos y nivel
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3 fill-current" />
              <h4 className="text-lg font-bold text-white mb-2">Atención Exclusiva</h4>
              <p className="text-white/90 text-sm">
                Corrección de técnica y motivación constante
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <Clock className="w-8 h-8 text-blue-300 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">Horarios Flexibles</h4>
              <p className="text-white/90 text-sm">
                Elige el horario que mejor se adapte a ti
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SesionesIndividuales;
