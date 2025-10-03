import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Monitor,
  Play,
  FileText,
  Users,
  Clock,
  TrendingUp,
  Award,
  CheckCircle,
  Download,
  Video,
  BookOpen,
  Zap,
  Target,
} from 'lucide-react';
import { getProductosByType, Producto } from '../productosServiciosApi';

const ProgramasOnline: React.FC = () => {
  const [programas, setProgramas] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const data = await getProductosByType('programa');
        setProgramas(data);
      } catch (error) {
        toast.error('Error al cargar los programas online');
      }
    };
    fetchProgramas();
  }, []);

  const handleStartProgram = (programa: Producto) => {
    if (!programa.disponibilidad) {
      toast.error('Este programa no está disponible actualmente');
      return;
    }
    toast.success(`Te has inscrito al programa "${programa.nombre}" exitosamente`);
  };

  const handleViewAllPrograms = () => {
    toast.success('Redirigiendo a todos los programas disponibles...');
  };

  // Mock: contenido del programa
  const generarContenido = (index: number) => {
    const contenidos = [
      { videos: 24, pdfs: 8, semanas: 8 },
      { videos: 36, pdfs: 12, semanas: 12 },
      { videos: 20, pdfs: 6, semanas: 6 },
    ];
    return contenidos[index % contenidos.length];
  };

  // Obtener gradiente según el programa
  const getProgramaGradient = (index: number) => {
    const gradients = [
      { primary: 'from-orange-500 to-red-600', bg: 'from-orange-500/10 to-red-500/10' },
      { primary: 'from-purple-500 to-pink-600', bg: 'from-purple-500/10 to-pink-500/10' },
      { primary: 'from-cyan-500 to-blue-600', bg: 'from-cyan-500/10 to-blue-500/10' },
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-4"
        >
          <Monitor className="w-5 h-5 text-orange-600" />
          <span className="text-sm font-bold text-orange-900">Programas Online</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Transforma tu cuerpo desde casa
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Programas completos de entrenamiento y nutrición 100% digitales
        </motion.p>
      </div>

      {/* Programas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {programas.map((programa, index) => {
          const contenido = generarContenido(index);
          const gradient = getProgramaGradient(index);
          const inscritos = Math.floor(Math.random() * 150) + 50;

          return (
            <motion.div
              key={programa.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Header con gradiente */}
              <div className={`relative p-8 bg-gradient-to-br ${gradient.primary} overflow-hidden`}>
                {/* Dots pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  ></div>
                </div>

                {/* Badge Digital */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/30">
                    <Monitor className="w-3 h-3 inline mr-1" />
                    100% Digital
                  </div>
                </div>

                <div className="relative z-10">
                  {/* Icono */}
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>

                  {/* Nombre */}
                  <h3 className="text-2xl font-bold text-white mb-2">{programa.nombre}</h3>

                  {/* Duración destacada */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-white">{contenido.semanas}</span>
                    <span className="text-white/80 text-lg">semanas</span>
                  </div>

                  <p className="text-white/90 text-sm">{programa.descripcion}</p>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8 relative z-10">
                {/* Precio */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradient.primary}`}>
                      €{programa.precio}
                    </span>
                    <span className="text-lg text-gray-500">pago único</span>
                  </div>
                  <p className="text-sm text-gray-600">Acceso de por vida al contenido</p>
                </div>

                {/* Estadísticas del programa */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                    <Video className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{contenido.videos}</p>
                    <p className="text-xs text-gray-600">Videos</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                    <FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">{contenido.pdfs}</p>
                    <p className="text-xs text-gray-600">PDFs</p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-emerald-600">{inscritos}</p>
                    <p className="text-xs text-gray-600">Inscritos</p>
                  </div>
                </div>

                {/* Características */}
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Contenido incluido:</p>
                  {programa.caracteristicas.map((caracteristica, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + idx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${gradient.primary} flex items-center justify-center`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{caracteristica}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Extras del programa */}
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Download className="w-4 h-4 text-emerald-600" />
                      <span>Descargables</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>Certificado</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Comunidad privada</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Zap className="w-4 h-4 text-orange-600" />
                      <span>Actualizaciones gratis</span>
                    </div>
                  </div>
                </div>

                {/* Detalles adicionales */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">Modalidad:</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700">
                      {programa.modalidad}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">Duración:</span>
                    <span className="text-xs font-bold text-gray-900">{programa.duracion}</span>
                  </div>

                  {programa.cupos && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">Cupos restantes:</span>
                      <span className={`text-xs font-bold ${programa.cupos > 20 ? 'text-green-600' : 'text-orange-600'}`}>
                        {programa.cupos}
                      </span>
                    </div>
                  )}
                </div>

                {/* Botón CTA */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStartProgram(programa)}
                  disabled={!programa.disponibilidad}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                    programa.disponibilidad
                      ? `bg-gradient-to-r ${gradient.primary}`
                      : 'bg-gray-400 cursor-not-allowed'
                  } flex items-center justify-center gap-2`}
                >
                  <Play className="w-5 h-5" />
                  {programa.disponibilidad ? 'Comenzar Programa' : 'Cupos Agotados'}
                </motion.button>
              </div>

              {/* Decorative blur orb */}
              <div className={`absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${gradient.bg} rounded-full blur-3xl`}></div>
            </motion.div>
          );
        })}
      </div>

      {/* Ventajas de programas online */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">A tu ritmo</h3>
          <p className="text-sm text-gray-600">
            Entrena cuando y donde quieras, sin horarios fijos
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
            <Download className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Acceso de por vida</h3>
          <p className="text-sm text-gray-600">
            Revisa el contenido cuantas veces necesites
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Guías completas</h3>
          <p className="text-sm text-gray-600">
            PDFs descargables con toda la información
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Comunidad</h3>
          <p className="text-sm text-gray-600">
            Conecta con otros usuarios en grupo privado
          </p>
        </div>
      </motion.div>

      {/* CTA Final */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-center relative overflow-hidden"
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
          <TrendingUp className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">¿No estás seguro cuál elegir?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Todos nuestros programas incluyen garantía de 30 días. Si no estás satisfecho, te devolvemos tu dinero.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAllPrograms}
            className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Ver Todos los Programas
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgramasOnline;
