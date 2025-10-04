import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Target, Zap, Calendar, Crown, Shield, Flame } from 'lucide-react';

interface Insignia {
  id: number;
  nombre: string;
  descripcion: string;
  icon: React.ComponentType<any>;
  categoria: 'Constancia' | 'Logro' | 'Especial' | 'Nivel';
  desbloqueada: boolean;
  fecha_obtencion?: string;
  progreso?: number;
  objetivo?: number;
  rareza: 'Común' | 'Raro' | 'Épico' | 'Legendario';
}

const InsigniasLogros: React.FC = () => {
  const insignias: Insignia[] = [
    {
      id: 1,
      nombre: 'Primer Paso',
      descripcion: 'Completa tu primer hábito',
      icon: Star,
      categoria: 'Logro',
      desbloqueada: true,
      fecha_obtencion: '2024-01-15',
      rareza: 'Común'
    },
    {
      id: 2,
      nombre: 'Racha de Fuego',
      descripcion: 'Mantén una racha de 7 días consecutivos',
      icon: Flame,
      categoria: 'Constancia',
      desbloqueada: true,
      fecha_obtencion: '2024-01-22',
      rareza: 'Raro'
    },
    {
      id: 3,
      nombre: 'Campeón Mensual',
      descripcion: 'Completa todos los hábitos durante un mes',
      icon: Crown,
      categoria: 'Logro',
      desbloqueada: true,
      fecha_obtencion: '2024-02-01',
      rareza: 'Épico'
    },
    {
      id: 4,
      nombre: 'Guardián de Hábitos',
      descripcion: 'Alcanza 100 hábitos completados',
      icon: Shield,
      categoria: 'Nivel',
      desbloqueada: false,
      progreso: 76,
      objetivo: 100,
      rareza: 'Épico'
    },
    {
      id: 5,
      nombre: 'Maestro del Tiempo',
      descripcion: 'Completa hábitos durante 30 días seguidos',
      icon: Calendar,
      categoria: 'Constancia',
      desbloqueada: false,
      progreso: 18,
      objetivo: 30,
      rareza: 'Raro'
    },
    {
      id: 6,
      nombre: 'Velocidad Luz',
      descripcion: 'Completa 5 hábitos en un día',
      icon: Zap,
      categoria: 'Especial',
      desbloqueada: true,
      fecha_obtencion: '2024-01-28',
      rareza: 'Raro'
    },
    {
      id: 7,
      nombre: 'Precisión Perfecta',
      descripcion: 'Alcanza el 95% de adherencia en un mes',
      icon: Target,
      categoria: 'Logro',
      desbloqueada: false,
      progreso: 87,
      objetivo: 95,
      rareza: 'Épico'
    },
    {
      id: 8,
      nombre: 'Leyenda Viviente',
      descripcion: 'Mantén una racha de 100 días',
      icon: Trophy,
      categoria: 'Constancia',
      desbloqueada: false,
      progreso: 23,
      objetivo: 100,
      rareza: 'Legendario'
    },
    {
      id: 9,
      nombre: 'Medallista de Oro',
      descripcion: 'Gana 3 retos consecutivos',
      icon: Medal,
      categoria: 'Especial',
      desbloqueada: false,
      progreso: 1,
      objetivo: 3,
      rareza: 'Épico'
    },
    {
      id: 10,
      nombre: 'Premio de Honor',
      descripcion: 'Alcanza el primer lugar en un reto',
      icon: Award,
      categoria: 'Especial',
      desbloqueada: true,
      fecha_obtencion: '2024-02-10',
      rareza: 'Raro'
    }
  ];

  const getRarezaColor = (rareza: string) => {
    switch (rareza) {
      case 'Común':
        return 'bg-gray-100 border-gray-300 text-gray-700';
      case 'Raro':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'Épico':
        return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'Legendario':
        return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'Constancia':
        return 'bg-green-500';
      case 'Logro':
        return 'bg-blue-500';
      case 'Especial':
        return 'bg-purple-500';
      case 'Nivel':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const insigniasDesbloqueadas = insignias.filter(i => i.desbloqueada);
  const insigniasPendientes = insignias.filter(i => !i.desbloqueada);

  return (
    <div className="space-y-6">
      {/* Estadísticas generales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 border border-white/20"
      >
        {/* Efectos de fondo */}
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-white">{insigniasDesbloqueadas.length}</p>
              <p className="text-blue-100 font-medium mt-1">Insignias obtenidas</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-white">{insignias.length}</p>
              <p className="text-blue-100 font-medium mt-1">Total disponibles</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-yellow-300">{Math.round((insigniasDesbloqueadas.length / insignias.length) * 100)}%</p>
              <p className="text-blue-100 font-medium mt-1">Progreso total</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-yellow-300">{insigniasDesbloqueadas.filter(i => i.rareza === 'Legendario').length}</p>
              <p className="text-blue-100 font-medium mt-1">Legendarias</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Insignias desbloqueadas */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Mis Insignias ({insigniasDesbloqueadas.length})</h3>
              <p className="text-sm text-gray-600">Logros desbloqueados</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insigniasDesbloqueadas.map((insignia, index) => {
              const IconComponent = insignia.icon;
              return (
                <motion.div
                  key={insignia.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`relative border-2 rounded-2xl p-4 transition-all duration-200 shadow-md hover:shadow-xl ${getRarezaColor(insignia.rareza)}`}
                >
                {/* Etiqueta de categoría */}
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getCategoriaColor(insignia.categoria)}`}></div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{insignia.nombre}</h4>
                    <p className="text-xs text-gray-600 mt-1">{insignia.descripcion}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRarezaColor(insignia.rareza)}`}>
                        {insignia.rareza}
                      </span>
                      {insignia.fecha_obtencion && (
                        <span className="text-xs text-gray-500">
                          {new Date(insignia.fecha_obtencion).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </div>

      {/* Insignias por obtener */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Por Desbloquear ({insigniasPendientes.length})</h3>
              <p className="text-sm text-gray-600">Próximos objetivos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insigniasPendientes.map((insignia, index) => {
              const IconComponent = insignia.icon;
              const progreso = insignia.progreso || 0;
              const objetivo = insignia.objetivo || 100;
              const porcentaje = (progreso / objetivo) * 100;

              return (
                <motion.div
                  key={insignia.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="relative border-2 border-gray-200 rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-200 hover:shadow-lg"
                >
                {/* Etiqueta de categoría */}
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getCategoriaColor(insignia.categoria)} opacity-50`}></div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-700 truncate">{insignia.nombre}</h4>
                    <p className="text-xs text-gray-500 mt-1">{insignia.descripcion}</p>

                    {/* Barra de progreso */}
                    {insignia.progreso !== undefined && insignia.objetivo && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>{progreso} / {objetivo}</span>
                          <span>{Math.round(porcentaje)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(porcentaje, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                        {insignia.rareza}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </div>

      {/* Leyenda de categorías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Award className="w-4 h-4 text-white" />
            </div>
            Categorías de Insignias
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Constancia', 'Logro', 'Especial', 'Nivel'].map((categoria, index) => (
              <motion.div
                key={categoria}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                className="flex items-center space-x-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
              >
                <div className={`w-4 h-4 rounded-full ${getCategoriaColor(categoria)} shadow-md`}></div>
                <span className="text-sm font-semibold text-gray-700">{categoria}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsigniasLogros;