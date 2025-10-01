import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, MapPin, Award, Users, Clock, DollarSign,
  X, CheckCircle, Filter, ChevronDown, Send, Mail, Phone
} from 'lucide-react';
import { getNutricionistas, NutricionistaExtendido } from '../derivacionesNutricionApi';

const NutricionistasDirectorio: React.FC = () => {
  const [nutricionistas, setNutricionistas] = useState<NutricionistaExtendido[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNutricionista, setSelectedNutricionista] = useState<NutricionistaExtendido | null>(null);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState<string>('todas');
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState<string>('todas');

  useEffect(() => {
    const fetchNutricionistas = async () => {
      try {
        const data = await getNutricionistas();
        setNutricionistas(data);
      } catch (err) {
        console.error('Error al cargar nutricionistas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNutricionistas();
  }, []);

  const especialidadesUnicas = Array.from(
    new Set(nutricionistas.flatMap(n => n.especialidades))
  );

  const nutricionistasFiltrados = nutricionistas.filter(n => {
    const cumpleEspecialidad = filtroEspecialidad === 'todas' || n.especialidades.includes(filtroEspecialidad);
    const cumpleDisponibilidad = filtroDisponibilidad === 'todas' || n.disponibilidad === filtroDisponibilidad;
    return cumpleEspecialidad && cumpleDisponibilidad;
  });

  const getDisponibilidadColor = (disponibilidad: string) => {
    switch (disponibilidad) {
      case 'Disponible':
        return 'bg-green-500 text-white';
      case 'Limitada':
        return 'bg-orange-500 text-white';
      case 'No Disponible':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getEspecialidadColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-indigo-500 to-purple-500',
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-emerald-500 to-teal-500',
      'bg-gradient-to-r from-blue-500 to-indigo-500',
      'bg-gradient-to-r from-orange-500 to-red-500',
      'bg-gradient-to-r from-cyan-500 to-blue-500'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
              <Users className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Cargando nutricionistas...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Users className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Directorio de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Nutricionistas</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Encuentra al <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">profesional perfecto</span> para tus clientes
          </p>

          {/* Stats Pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{nutricionistas.length} Especialistas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Certificados</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filtro Especialidad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Especialidad</label>
            <div className="relative">
              <select
                value={filtroEspecialidad}
                onChange={(e) => setFiltroEspecialidad(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none pr-10"
              >
                <option value="todas">Todas las especialidades</option>
                {especialidadesUnicas.map((esp) => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filtro Disponibilidad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Disponibilidad</label>
            <div className="relative">
              <select
                value={filtroDisponibilidad}
                onChange={(e) => setFiltroDisponibilidad(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none pr-10"
              >
                <option value="todas">Todas</option>
                <option value="Disponible">Disponible</option>
                <option value="Limitada">Limitada</option>
                <option value="No Disponible">No Disponible</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Contador resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando <span className="font-bold text-indigo-600">{nutricionistasFiltrados.length}</span> de {nutricionistas.length} nutricionistas
        </div>
      </motion.div>

      {/* Grid de Nutricionistas */}
      {nutricionistasFiltrados.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No hay nutricionistas disponibles</h3>
          <p className="text-gray-600">Intenta ajustar los filtros para ver más resultados</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutricionistasFiltrados.map((nutricionista, index) => (
            <motion.div
              key={nutricionista.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* Avatar y Badge de Disponibilidad */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                      {nutricionista.avatar}
                    </div>
                  </div>
                  <div className={`px-3 py-1 ${getDisponibilidadColor(nutricionista.disponibilidad)} text-xs font-bold rounded-full`}>
                    {nutricionista.disponibilidad}
                  </div>
                </div>

                {/* Nombre y Credenciales */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{nutricionista.nombre}</h3>
                <p className="text-sm text-gray-600 mb-3">{nutricionista.credenciales}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(nutricionista.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{nutricionista.rating}</span>
                  <span className="text-xs text-gray-500">({nutricionista.totalReviews} reviews)</span>
                </div>

                {/* Especialidades */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Especialidades</p>
                  <div className="flex flex-wrap gap-2">
                    {nutricionista.especialidades.slice(0, 3).map((esp, i) => (
                      <div key={i} className={`px-3 py-1 ${getEspecialidadColor(i)} text-white text-xs font-bold rounded-full`}>
                        {esp}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info adicional */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span>{nutricionista.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>{nutricionista.experiencia} años de experiencia</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-pink-500" />
                    <span>{nutricionista.clientesExitosos} clientes exitosos</span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedNutricionista(nutricionista)}
                    className="px-4 py-2 border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300"
                  >
                    Ver perfil
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Derivar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal de Perfil Completo */}
      <AnimatePresence>
        {selectedNutricionista && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedNutricionista(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal con Gradiente */}
              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl shadow-xl">
                      {selectedNutricionista.avatar}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1">{selectedNutricionista.nombre}</h2>
                      <p className="text-blue-100">{selectedNutricionista.credenciales}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(selectedNutricionista.rating) ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`}
                            />
                          ))}
                        </div>
                        <span className="text-white font-bold">{selectedNutricionista.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNutricionista(null)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors duration-300"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Contenido del Modal */}
              <div className="p-8 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    Biografía
                  </h3>
                  <p className="text-gray-700 leading-relaxed bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4">
                    {selectedNutricionista.bio}
                  </p>
                </div>

                {/* Especialidades */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    Especialidades
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedNutricionista.especialidades.map((esp, i) => (
                      <div key={i} className={`px-4 py-2 ${getEspecialidadColor(i)} text-white font-semibold rounded-xl`}>
                        {esp}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificaciones */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Award className="w-5 h-5 text-pink-600" />
                    </div>
                    Certificaciones
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedNutricionista.certificaciones.map((cert, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white rounded-xl p-3 border border-gray-200">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700 font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información de Contacto y Tarifas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contacto</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{selectedNutricionista.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{selectedNutricionista.telefono}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{selectedNutricionista.ubicacion}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Información Práctica</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span className="text-gray-700">{selectedNutricionista.tarifas || 'Consultar'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-emerald-600" />
                        <span className="text-gray-700">{selectedNutricionista.horarios}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-emerald-600" />
                        <span className="text-gray-700">{selectedNutricionista.clientesExitosos} clientes exitosos</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de Acción Principal */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Derivar Cliente a {selectedNutricionista.nombre}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NutricionistasDirectorio;
