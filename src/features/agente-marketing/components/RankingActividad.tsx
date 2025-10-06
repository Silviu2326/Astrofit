import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus, Crown, Star, Zap, Target, Users, Flame } from 'lucide-react';
import { UsuarioRanking, ConfiguracionRanking, Badge, Premio } from '../types/ranking';

const badgesDisponibles: Badge[] = [
  { id: '1', nombre: 'Creador Novato', descripcion: '10 publicaciones', icono: '📝', nivel: 'bronce', criterio: { tipo: 'publicaciones', valor: 10 } },
  { id: '2', nombre: 'Creador Experto', descripcion: '50 publicaciones', icono: '✍️', nivel: 'plata', criterio: { tipo: 'publicaciones', valor: 50 } },
  { id: '3', nombre: 'Creador Maestro', descripcion: '100 publicaciones', icono: '🎨', nivel: 'oro', criterio: { tipo: 'publicaciones', valor: 100 } },
  { id: '4', nombre: 'Influencer', descripcion: '10K seguidores', icono: '🌟', nivel: 'oro', criterio: { tipo: 'seguidores', valor: 10000 } },
  { id: '5', nombre: 'Viral Star', descripcion: '100K engagement', icono: '🚀', nivel: 'platino', criterio: { tipo: 'engagement', valor: 100000 } },
  { id: '6', nombre: 'Racha de Fuego', descripcion: '30 días consecutivos', icono: '🔥', nivel: 'diamante', criterio: { tipo: 'racha', valor: 30 } },
];

const premiosEjemplo: Premio[] = [
  { id: '1', titulo: 'Mejor Contenido del Mes', descripcion: 'Mayor engagement promedio', icono: '🏆', tipo: 'mensual', categoria: 'contenido' },
  { id: '2', titulo: 'Crecimiento Destacado', descripcion: 'Mayor incremento de seguidores', icono: '📈', tipo: 'mensual', categoria: 'crecimiento' },
  { id: '3', titulo: 'Comunidad Activa', descripcion: 'Mayor interacción con seguidores', icono: '👥', tipo: 'mensual', categoria: 'comunidad' },
];

export const RankingActividad: React.FC = () => {
  const [config, setConfig] = useState<ConfiguracionRanking>({
    periodoActual: 'mensual',
    categoriaActiva: 'general',
    topN: 10
  });

  // Datos de ejemplo
  const usuariosRanking: UsuarioRanking[] = [
    {
      id: '1',
      nombre: 'Ana García',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      posicion: 1,
      puntos: 15420,
      nivel: 15,
      badges: [badgesDisponibles[2], badgesDisponibles[3], badgesDisponibles[5]],
      estadisticas: {
        publicaciones: 142,
        engagement: 125000,
        seguidores: 15200,
        rachaActual: 45,
        mejorRacha: 60
      },
      tendencia: 'subiendo',
      cambiosPosicion: 2,
      premios: [premiosEjemplo[0], premiosEjemplo[2]]
    },
    {
      id: '2',
      nombre: 'Carlos Ruiz',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      posicion: 2,
      puntos: 14850,
      nivel: 14,
      badges: [badgesDisponibles[2], badgesDisponibles[4]],
      estadisticas: {
        publicaciones: 128,
        engagement: 118000,
        seguidores: 12800,
        rachaActual: 32,
        mejorRacha: 50
      },
      tendencia: 'estable',
      cambiosPosicion: 0,
      premios: [premiosEjemplo[1]]
    },
    {
      id: '3',
      nombre: 'María López',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      posicion: 3,
      puntos: 13900,
      nivel: 13,
      badges: [badgesDisponibles[1], badgesDisponibles[3]],
      estadisticas: {
        publicaciones: 98,
        engagement: 95000,
        seguidores: 11500,
        rachaActual: 28,
        mejorRacha: 40
      },
      tendencia: 'subiendo',
      cambiosPosicion: 1,
      premios: []
    },
    {
      id: '4',
      nombre: 'Pedro Sánchez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
      posicion: 4,
      puntos: 12700,
      nivel: 12,
      badges: [badgesDisponibles[1], badgesDisponibles[2]],
      estadisticas: {
        publicaciones: 115,
        engagement: 88000,
        seguidores: 9800,
        rachaActual: 21,
        mejorRacha: 35
      },
      tendencia: 'bajando',
      cambiosPosicion: -2,
      premios: []
    },
    {
      id: '5',
      nombre: 'Laura Martínez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
      posicion: 5,
      puntos: 11500,
      nivel: 11,
      badges: [badgesDisponibles[1]],
      estadisticas: {
        publicaciones: 87,
        engagement: 72000,
        seguidores: 8500,
        rachaActual: 18,
        mejorRacha: 25
      },
      tendencia: 'subiendo',
      cambiosPosicion: 3,
      premios: []
    }
  ];

  const getTendenciaIcon = (tendencia: string, cambios: number) => {
    if (tendencia === 'subiendo') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (tendencia === 'bajando') {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getMedallaIcon = (posicion: number) => {
    switch (posicion) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return <div className="w-8 h-8 flex items-center justify-center text-gray-500 font-bold">{posicion}</div>;
    }
  };

  const getBadgeColor = (nivel: string) => {
    const colores = {
      bronce: 'from-amber-700 to-amber-900',
      plata: 'from-gray-300 to-gray-500',
      oro: 'from-yellow-400 to-yellow-600',
      platino: 'from-cyan-400 to-blue-500',
      diamante: 'from-purple-400 to-pink-500'
    };
    return colores[nivel as keyof typeof colores] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 via-amber-600 to-orange-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-300" />
            <h1 className="text-4xl font-bold text-white">Ranking de Actividad</h1>
          </div>
          <p className="text-yellow-100 text-lg">Compite, mejora y destaca en la comunidad</p>
        </div>

        {/* Filtros */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Periodo</label>
              <select
                value={config.periodoActual}
                onChange={(e) => setConfig({ ...config, periodoActual: e.target.value as any })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <option value="semanal" className="text-gray-900">Semanal</option>
                <option value="mensual" className="text-gray-900">Mensual</option>
                <option value="trimestral" className="text-gray-900">Trimestral</option>
                <option value="anual" className="text-gray-900">Anual</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Categoría</label>
              <select
                value={config.categoriaActiva}
                onChange={(e) => setConfig({ ...config, categoriaActiva: e.target.value as any })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <option value="general" className="text-gray-900">General</option>
                <option value="contenido" className="text-gray-900">Contenido</option>
                <option value="engagement" className="text-gray-900">Engagement</option>
                <option value="crecimiento" className="text-gray-900">Crecimiento</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Mostrar Top</label>
              <select
                value={config.topN}
                onChange={(e) => setConfig({ ...config, topN: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <option value="10" className="text-gray-900">Top 10</option>
                <option value="25" className="text-gray-900">Top 25</option>
                <option value="50" className="text-gray-900">Top 50</option>
                <option value="100" className="text-gray-900">Top 100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard Principal */}
          <div className="lg:col-span-2 space-y-4">
            {usuariosRanking.slice(0, config.topN).map((usuario, index) => (
              <div
                key={usuario.id}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  usuario.posicion <= 3 ? 'border-yellow-400/50 shadow-xl' : 'border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Posición y Medalla */}
                  <div className="flex flex-col items-center">
                    {getMedallaIcon(usuario.posicion)}
                    <div className="flex items-center gap-1 mt-2">
                      {getTendenciaIcon(usuario.tendencia, usuario.cambiosPosicion)}
                      {usuario.cambiosPosicion !== 0 && (
                        <span className={`text-xs font-bold ${
                          usuario.tendencia === 'subiendo' ? 'text-green-300' : 'text-red-300'
                        }`}>
                          {Math.abs(usuario.cambiosPosicion)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Avatar y Nombre */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={usuario.avatar}
                        alt={usuario.nombre}
                        className="w-12 h-12 rounded-full border-2 border-white/50"
                      />
                      <div>
                        <h3 className="text-white font-bold text-lg">{usuario.nombre}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-300" />
                          <span className="text-yellow-300 font-semibold">Nivel {usuario.nivel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-300" />
                        <div>
                          <p className="text-xs text-yellow-200">Puntos</p>
                          <p className="text-white font-bold">{usuario.puntos.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-300" />
                        <div>
                          <p className="text-xs text-yellow-200">Posts</p>
                          <p className="text-white font-bold">{usuario.estadisticas.publicaciones}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-300" />
                        <div>
                          <p className="text-xs text-yellow-200">Seguidores</p>
                          <p className="text-white font-bold">{(usuario.estadisticas.seguidores / 1000).toFixed(1)}K</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-300" />
                        <div>
                          <p className="text-xs text-yellow-200">Racha</p>
                          <p className="text-white font-bold">{usuario.estadisticas.rachaActual} días</p>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {usuario.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className={`px-3 py-1 rounded-full bg-gradient-to-r ${getBadgeColor(badge.nivel)} text-white text-xs font-semibold flex items-center gap-1`}
                          title={badge.descripcion}
                        >
                          <span>{badge.icono}</span>
                          <span>{badge.nombre}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Premios y Reconocimientos */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-300" />
                Premios del Mes
              </h3>
              <div className="space-y-3">
                {premiosEjemplo.map((premio) => (
                  <div
                    key={premio.id}
                    className="bg-white/10 rounded-lg p-4 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{premio.icono}</span>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{premio.titulo}</h4>
                        <p className="text-yellow-200 text-xs">{premio.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges Disponibles */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-300" />
                Badges Disponibles
              </h3>
              <div className="space-y-2">
                {badgesDisponibles.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-lg bg-gradient-to-r ${getBadgeColor(badge.nivel)} bg-opacity-50 border border-white/20`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{badge.icono}</span>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm">{badge.nombre}</h4>
                        <p className="text-white/80 text-xs">{badge.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tu Progreso */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-300" />
                Tu Progreso
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span className="text-sm">Nivel 15</span>
                    <span className="text-sm">78% al nivel 16</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-yellow-300 font-bold text-2xl">15,420</p>
                    <p className="text-white/80 text-xs">Puntos Totales</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-yellow-300 font-bold text-2xl">#1</p>
                    <p className="text-white/80 text-xs">Posición</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingActividad;
