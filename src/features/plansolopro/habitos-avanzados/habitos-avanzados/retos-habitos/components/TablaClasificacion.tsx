import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Users } from 'lucide-react';

interface Participante {
  id: number;
  nombre: string;
  avatar: string;
  puntos: number;
  posicion: number;
  habitos_completados: number;
  racha_actual: number;
  nivel: 'Bronce' | 'Plata' | 'Oro' | 'Diamante';
}

const TablaClasificacion: React.FC = () => {
  const participantes: Participante[] = [
    {
      id: 1,
      nombre: 'Ana García',
      avatar: 'AG',
      puntos: 2450,
      posicion: 1,
      habitos_completados: 28,
      racha_actual: 14,
      nivel: 'Diamante'
    },
    {
      id: 2,
      nombre: 'Carlos Ruiz',
      avatar: 'CR',
      puntos: 2180,
      posicion: 2,
      habitos_completados: 24,
      racha_actual: 8,
      nivel: 'Oro'
    },
    {
      id: 3,
      nombre: 'María López',
      avatar: 'ML',
      puntos: 1950,
      posicion: 3,
      habitos_completados: 22,
      racha_actual: 12,
      nivel: 'Oro'
    },
    {
      id: 4,
      nombre: 'David González',
      avatar: 'DG',
      puntos: 1720,
      posicion: 4,
      habitos_completados: 19,
      racha_actual: 5,
      nivel: 'Plata'
    },
    {
      id: 5,
      nombre: 'Laura Martín',
      avatar: 'LM',
      puntos: 1480,
      posicion: 5,
      habitos_completados: 16,
      racha_actual: 7,
      nivel: 'Plata'
    },
    {
      id: 6,
      nombre: 'Pablo Rodríguez',
      avatar: 'PR',
      puntos: 1250,
      posicion: 6,
      habitos_completados: 14,
      racha_actual: 3,
      nivel: 'Bronce'
    }
  ];

  const getPosicionIcon = (posicion: number) => {
    switch (posicion) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{posicion}</div>;
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Diamante':
        return 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white';
      case 'Oro':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
      case 'Plata':
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
      case 'Bronce':
        return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getPosicionStyle = (posicion: number) => {
    switch (posicion) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      {/* Dots pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(251,191,36,0.3) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Tabla de Clasificación</h3>
              <p className="text-sm text-gray-600">Ranking de participantes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-4 py-2 border border-indigo-200">
            <Users className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-700">{participantes.length} participantes</span>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="hidden md:grid grid-cols-7 gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 pb-3 mb-4">
          <div>Posición</div>
          <div className="col-span-2">Participante</div>
          <div className="text-center">Puntos</div>
          <div className="text-center">Hábitos</div>
          <div className="text-center">Racha</div>
          <div className="text-center">Nivel</div>
        </div>

        {/* Lista de participantes */}
        <div className="space-y-3">
          {participantes.map((participante, index) => (
            <motion.div
              key={participante.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`rounded-2xl p-4 transition-all duration-200 ${getPosicionStyle(participante.posicion)} backdrop-blur-sm border border-white/50 shadow-md hover:shadow-xl group`}
            >
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
              {/* Posición */}
              <div className="flex items-center justify-center md:justify-start">
                {getPosicionIcon(participante.posicion)}
              </div>

              {/* Participante */}
              <div className="col-span-1 md:col-span-2 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {participante.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{participante.nombre}</p>
                  <p className="text-sm text-gray-500">Participante #{participante.id}</p>
                </div>
              </div>

              {/* Puntos */}
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{participante.puntos.toLocaleString()}</p>
                <p className="text-xs text-gray-500">puntos</p>
              </div>

              {/* Hábitos completados */}
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{participante.habitos_completados}</p>
                <p className="text-xs text-gray-500">completados</p>
              </div>

              {/* Racha actual */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-orange-400" />
                  <p className="text-lg font-bold text-orange-600">{participante.racha_actual}</p>
                </div>
                <p className="text-xs text-gray-500">días</p>
              </div>

              {/* Nivel */}
              <div className="text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getNivelColor(participante.nivel)}`}>
                  {participante.nivel}
                </span>
              </div>
            </div>

            {/* Vista móvil - información adicional */}
            <div className="md:hidden mt-3 grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-3">
              <div>
                <p className="text-lg font-bold text-gray-900">{participante.puntos.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Puntos</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{participante.habitos_completados}</p>
                <p className="text-xs text-gray-500">Hábitos</p>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-orange-400" />
                  <p className="text-lg font-bold text-orange-600">{participante.racha_actual}</p>
                </div>
                <p className="text-xs text-gray-500">Racha</p>
              </div>
            </div>
          </motion.div>
        ))}
        </div>

        {/* Estadísticas generales */}
        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
            >
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {participantes.reduce((acc, p) => acc + p.puntos, 0).toLocaleString()}
              </p>
              <p className="text-sm font-semibold text-gray-600 mt-1">Puntos totales</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200"
            >
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                {participantes.reduce((acc, p) => acc + p.habitos_completados, 0)}
              </p>
              <p className="text-sm font-semibold text-gray-600 mt-1">Hábitos completados</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200"
            >
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                {Math.round(participantes.reduce((acc, p) => acc + p.racha_actual, 0) / participantes.length)}
              </p>
              <p className="text-sm font-semibold text-gray-600 mt-1">Racha promedio</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaClasificacion;