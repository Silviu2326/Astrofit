import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, DollarSign, Target } from 'lucide-react';
import { mockAffiliates, getTierInfo } from '../data/mockData';

type Period = 'month' | 'quarter' | 'year' | 'alltime';

export const Leaderboard: React.FC = () => {
  const [period, setPeriod] = useState<Period>('month');

  // Ordenar afiliados por ventas (solo activos)
  const topAffiliates = [...mockAffiliates]
    .filter(a => a.status === 'Activo')
    .sort((a, b) => b.salesGenerated - a.salesGenerated)
    .slice(0, 10);

  const getPodiumGradient = (position: number) => {
    switch (position) {
      case 1:
        return 'from-yellow-400 via-yellow-500 to-yellow-600';
      case 2:
        return 'from-gray-300 via-gray-400 to-gray-500';
      case 3:
        return 'from-orange-400 via-orange-500 to-orange-600';
      default:
        return 'from-indigo-500 to-purple-600';
    }
  };

  const getPodiumIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6" />;
      case 2:
        return <Medal className="w-6 h-6" />;
      case 3:
        return <Award className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Leaderboard de Afiliados</h3>
                <p className="text-sm text-orange-100">Top performers del período</p>
              </div>
            </div>

            {/* Selector de período */}
            <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
              {(['month', 'quarter', 'year', 'alltime'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    period === p
                      ? 'bg-white text-orange-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {p === 'month' && 'Mes'}
                  {p === 'quarter' && 'Trimestre'}
                  {p === 'year' && 'Año'}
                  {p === 'alltime' && 'Histórico'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Podio (Top 3) */}
      <div className="p-8 bg-gradient-to-br from-slate-50 to-orange-50/30">
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* Segundo lugar */}
          {topAffiliates[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getPodiumGradient(2)} flex items-center justify-center text-white font-bold text-2xl shadow-xl mb-3 relative`}>
                {topAffiliates[1].avatar}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  {getPodiumIcon(2)}
                </div>
              </div>
              <div className={`w-28 bg-gradient-to-br ${getPodiumGradient(2)} rounded-t-2xl p-4 text-center shadow-xl`}>
                <p className="text-white font-bold text-sm mb-1">{topAffiliates[1].name.split(' ')[0]}</p>
                <p className="text-white/90 text-xs font-semibold">${(topAffiliates[1].salesGenerated / 1000).toFixed(0)}k</p>
              </div>
              <div className={`w-28 bg-gradient-to-br ${getPodiumGradient(2)} opacity-50 h-20`}></div>
            </motion.div>
          )}

          {/* Primer lugar */}
          {topAffiliates[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${getPodiumGradient(1)} flex items-center justify-center text-white font-bold text-3xl shadow-2xl mb-3 relative`}>
                {topAffiliates[0].avatar}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white animate-pulse">
                  {getPodiumIcon(1)}
                </div>
              </div>
              <div className={`w-32 bg-gradient-to-br ${getPodiumGradient(1)} rounded-t-3xl p-4 text-center shadow-2xl`}>
                <p className="text-white font-bold mb-1">{topAffiliates[0].name.split(' ')[0]}</p>
                <p className="text-white/90 text-sm font-bold">${(topAffiliates[0].salesGenerated / 1000).toFixed(0)}k</p>
              </div>
              <div className={`w-32 bg-gradient-to-br ${getPodiumGradient(1)} opacity-50 h-32`}></div>
            </motion.div>
          )}

          {/* Tercer lugar */}
          {topAffiliates[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getPodiumGradient(3)} flex items-center justify-center text-white font-bold text-2xl shadow-xl mb-3 relative`}>
                {topAffiliates[2].avatar}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  {getPodiumIcon(3)}
                </div>
              </div>
              <div className={`w-28 bg-gradient-to-br ${getPodiumGradient(3)} rounded-t-2xl p-4 text-center shadow-xl`}>
                <p className="text-white font-bold text-sm mb-1">{topAffiliates[2].name.split(' ')[0]}</p>
                <p className="text-white/90 text-xs font-semibold">${(topAffiliates[2].salesGenerated / 1000).toFixed(0)}k</p>
              </div>
              <div className={`w-28 bg-gradient-to-br ${getPodiumGradient(3)} opacity-50 h-16`}></div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Lista del 4to al 10mo */}
      <div className="p-6 space-y-2">
        {topAffiliates.slice(3).map((affiliate, index) => {
          const position = index + 4;
          const tierInfo = getTierInfo(affiliate.tier);

          return (
            <motion.div
              key={affiliate.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-indigo-50/30 hover:from-indigo-50 hover:to-purple-50 transition-all border border-gray-200 hover:border-indigo-200 group"
            >
              {/* Posición */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                {position}
              </div>

              {/* Avatar */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tierInfo.color} flex items-center justify-center text-white font-bold shadow-md`}>
                {affiliate.avatar}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900">{affiliate.name}</p>
                  <span className={`px-2 py-0.5 ${tierInfo.bgColor} ${tierInfo.textColor} text-xs font-bold rounded-full`}>
                    {affiliate.tier}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">${(affiliate.salesGenerated / 1000).toFixed(0)}k ventas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span className="font-semibold">{affiliate.conversions} conversiones</span>
                  </div>
                </div>
              </div>

              {/* Trending */}
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-600">+{Math.floor(Math.random() * 30 + 10)}%</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer con premios */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-t border-yellow-200">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-orange-600" />
          <div>
            <p className="font-bold text-gray-900">Premios por Posición</p>
            <p className="text-sm text-gray-600">
              🥇 $500 bonus · 🥈 $300 bonus · 🥉 $150 bonus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
